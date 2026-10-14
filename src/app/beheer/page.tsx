'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { format, isToday, parseISO } from 'date-fns'
import { nl } from 'date-fns/locale'
import { RefreshCw, Trash2, Phone, Mail, Users, Clock, Calendar, Bell } from 'lucide-react'
import { cn } from '@/lib/utils'

type Status = 'nieuw' | 'bevestigd' | 'aanwezig' | 'afgerond'

interface Reservatie {
  id: string
  naam: string
  telefoon: string
  email: string
  datum: string
  tijdstip: string
  personen: number
  opmerking?: string
  status: Status
  tijdStempel: string
  reservatieNummer?: string
}

const STATUS: Record<Status, { label: string; kleur: string; volgende?: Status; volgendeLabel?: string }> = {
  nieuw:     { label: 'Nieuw',     kleur: 'bg-amber-100 text-amber-700 border-amber-200',         volgende: 'bevestigd', volgendeLabel: 'Bevestigen' },
  bevestigd: { label: 'Bevestigd', kleur: 'bg-blue-100 text-blue-700 border-blue-200',            volgende: 'aanwezig',  volgendeLabel: 'Aanwezig' },
  aanwezig:  { label: 'Aanwezig',  kleur: 'bg-emerald-100 text-emerald-700 border-emerald-200',   volgende: 'afgerond',  volgendeLabel: 'Afronden' },
  afgerond:  { label: 'Afgerond',  kleur: 'bg-gray-100 text-gray-500 border-gray-200' },
}

const PIN_KEY = 'beheer_pin'

type FilterType = 'vandaag' | 'alle' | Status

export default function BeheerPage() {
  const [pin, setPin] = useState('')
  const [ingelogd, setIngelogd] = useState(false)
  const [reservaties, setReservaties] = useState<Reservatie[]>([])
  const [bezig, setBezig] = useState(false)
  const [countdown, setCountdown] = useState(30)
  const [filter, setFilter] = useState<FilterType>('vandaag')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const haalOp = useCallback(async (p?: string) => {
    const gebruiktePin = p ?? sessionStorage.getItem(PIN_KEY) ?? ''
    if (!gebruiktePin) return
    setBezig(true)
    try {
      const res = await fetch('/api/reservaties', { headers: { 'x-pin': gebruiktePin } })
      if (res.ok) {
        setReservaties(await res.json())
        setCountdown(30)
      } else if (res.status === 403) {
        sessionStorage.removeItem(PIN_KEY)
        setIngelogd(false)
      }
    } catch {}
    setBezig(false)
  }, [])

  useEffect(() => {
    const opgeslagen = sessionStorage.getItem(PIN_KEY)
    if (opgeslagen) { setIngelogd(true); haalOp(opgeslagen) }
  }, [haalOp])

  useEffect(() => {
    if (!ingelogd) return
    intervalRef.current = setInterval(() => haalOp(), 30_000)
    countdownRef.current = setInterval(() => setCountdown((c) => (c > 0 ? c - 1 : 30)), 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [ingelogd, haalOp])

  function login(e: React.FormEvent) {
    e.preventDefault()
    sessionStorage.setItem(PIN_KEY, pin)
    setIngelogd(true)
    haalOp(pin)
  }

  async function updateStatus(id: string, status: Status) {
    const p = sessionStorage.getItem(PIN_KEY) ?? ''
    setReservaties((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    await fetch('/api/reservaties', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-pin': p },
      body: JSON.stringify({ id, status }),
    })
  }

  async function verwijder(id: string) {
    if (!confirm('Reservatie verwijderen?')) return
    const p = sessionStorage.getItem(PIN_KEY) ?? ''
    setReservaties((prev) => prev.filter((r) => r.id !== id))
    await fetch('/api/reservaties', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-pin': p },
      body: JSON.stringify({ id }),
    })
  }

  const vandaagLijst = reservaties.filter((r) => {
    try { return isToday(parseISO(r.datum)) } catch { return false }
  })
  const nieuwAantal = reservaties.filter((r) => r.status === 'nieuw').length

  const gefilterd: Reservatie[] =
    filter === 'vandaag' ? vandaagLijst :
    filter === 'alle'    ? reservaties :
    reservaties.filter((r) => r.status === filter)

  if (!ingelogd) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
        <div className="w-full max-w-xs">
          <div className="flex justify-center mb-8">
            <div className="bg-white/95 px-3 py-2 rounded-xl">
              <img src="/logo.png" alt="Sushi Dendermonde" className="h-9 w-auto object-contain" />
            </div>
          </div>
          <form onSubmit={login} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <h1 className="text-white font-medium text-sm">Reservatiebeheer</h1>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="PIN-code"
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent text-sm"
            />
            <button
              type="submit"
              disabled={!pin}
              className="w-full py-3 bg-accent disabled:opacity-50 text-white rounded-xl font-medium text-sm hover:bg-accent-dark transition-colors"
            >
              Inloggen
            </button>
          </form>
        </div>
      </div>
    )
  }

  const tabs: { id: FilterType; label: string }[] = [
    { id: 'vandaag',   label: `Vandaag (${vandaagLijst.length})` },
    { id: 'alle',      label: `Alle (${reservaties.length})` },
    { id: 'nieuw',     label: 'Nieuw' },
    { id: 'bevestigd', label: 'Bevestigd' },
    { id: 'afgerond',  label: 'Afgerond' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-charcoal text-white px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <p className="text-xs text-white/40">Sushi Dendermonde</p>
          <h1 className="font-semibold text-sm">Reservaties</h1>
        </div>
        <div className="flex items-center gap-3">
          {nieuwAantal > 0 && (
            <span className="flex items-center gap-1 bg-amber-500/20 text-amber-400 text-xs px-2.5 py-1 rounded-full font-medium">
              <Bell className="w-3 h-3" />
              {nieuwAantal} nieuw
            </span>
          )}
          <button
            onClick={() => haalOp()}
            className="flex items-center gap-1.5 text-white/50 text-xs hover:text-white transition-colors"
          >
            <RefreshCw className={cn('w-3.5 h-3.5', bezig && 'animate-spin')} />
            {bezig ? '...' : `${countdown}s`}
          </button>
        </div>
      </div>

      <div className="bg-white border-b border-border flex gap-0 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            className={cn(
              'py-3 px-4 text-xs font-medium whitespace-nowrap border-b-2 transition-colors shrink-0',
              filter === t.id
                ? 'border-accent text-accent'
                : 'border-transparent text-gray-warm hover:text-charcoal'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-3 pb-12">
        {gefilterd.length === 0 ? (
          <p className="text-center text-gray-warm text-sm py-16">Geen reservaties</p>
        ) : (
          gefilterd.map((res) => {
            const s = STATUS[res.status] ?? STATUS.nieuw
            return (
              <div
                key={res.id}
                className={cn(
                  'bg-white rounded-2xl border p-4 space-y-3',
                  res.status === 'nieuw' ? 'border-amber-200 shadow-md shadow-amber-50' : 'border-border'
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-charcoal text-sm">{res.naam}</p>
                    {res.reservatieNummer && (
                      <p className="text-xs text-gray-warm font-mono">{res.reservatieNummer}</p>
                    )}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 text-xs text-gray-warm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {res.datum ? format(parseISO(res.datum), 'EEE d MMM', { locale: nl }) : '—'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {res.tijdstip}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {res.personen} {res.personen === 1 ? 'persoon' : 'personen'}
                      </span>
                    </div>
                  </div>
                  <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full border shrink-0', s.kleur)}>
                    {s.label}
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                  <a href={`tel:${res.telefoon}`} className="flex items-center gap-1 text-gray-warm hover:text-accent transition-colors">
                    <Phone className="w-3 h-3" />{res.telefoon}
                  </a>
                  <a href={`mailto:${res.email}`} className="flex items-center gap-1 text-gray-warm hover:text-accent transition-colors">
                    <Mail className="w-3 h-3" />{res.email}
                  </a>
                </div>

                {res.opmerking && (
                  <p className="text-xs text-gray-warm bg-cream rounded-lg px-3 py-2 italic">
                    &ldquo;{res.opmerking}&rdquo;
                  </p>
                )}

                <div className="flex items-center gap-2 pt-1">
                  {s.volgende && (
                    <button
                      onClick={() => updateStatus(res.id, s.volgende!)}
                      className="flex-1 py-2 bg-accent text-white rounded-xl text-xs font-semibold hover:bg-accent-dark transition-colors"
                    >
                      {s.volgendeLabel}
                    </button>
                  )}
                  <button
                    onClick={() => verwijder(res.id)}
                    className="p-2 text-gray-warm hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
