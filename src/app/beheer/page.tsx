'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { format, isToday, parseISO } from 'date-fns'
import { nl } from 'date-fns/locale'
import { RefreshCw, Trash2, Phone, Mail, Users, Clock, Calendar, Bell, Truck, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatEuro } from '@/lib/utils'

// ── Types ─────────────────────────────────────────────────────────────────────

type ReservatieStatus = 'nieuw' | 'bevestigd' | 'aanwezig' | 'afgerond'
type BestellingStatus = 'nieuw' | 'bevestigd' | 'onderweg' | 'afgeleverd'

interface Reservatie {
  id: string
  naam: string
  telefoon: string
  email: string
  datum: string
  tijdstip: string
  personen: number
  opmerking?: string
  status: ReservatieStatus
  tijdStempel: string
  reservatieNummer?: string
}

interface BestellingItem {
  naam:         string
  aantal:       number
  subtotaal:    number
  eenheidsprijs?: number
}

interface Bestelling {
  id:               string
  bestellingNummer: string
  naam:             string
  telefoon:         string
  email:            string
  items:            BestellingItem[]
  totaal:           number
  opmerking?:       string
  status:           BestellingStatus
  tijdStempel:      string
}

// ── Status-configs ─────────────────────────────────────────────────────────────

const RES_STATUS: Record<ReservatieStatus, { label: string; kleur: string; volgende?: ReservatieStatus; volgendeLabel?: string }> = {
  nieuw:     { label: 'Nieuw',     kleur: 'bg-amber-100 text-amber-700 border-amber-200',       volgende: 'bevestigd', volgendeLabel: 'Bevestigen' },
  bevestigd: { label: 'Bevestigd', kleur: 'bg-blue-100 text-blue-700 border-blue-200',          volgende: 'aanwezig',  volgendeLabel: 'Aanwezig' },
  aanwezig:  { label: 'Aanwezig',  kleur: 'bg-emerald-100 text-emerald-700 border-emerald-200', volgende: 'afgerond',  volgendeLabel: 'Afronden' },
  afgerond:  { label: 'Afgerond',  kleur: 'bg-gray-100 text-gray-500 border-gray-200' },
}

const BEST_STATUS: Record<BestellingStatus, { label: string; kleur: string; volgende?: BestellingStatus; volgendeLabel?: string }> = {
  nieuw:      { label: 'Nieuw',      kleur: 'bg-amber-100 text-amber-700 border-amber-200',       volgende: 'bevestigd', volgendeLabel: 'Bevestigen' },
  bevestigd:  { label: 'Bevestigd',  kleur: 'bg-blue-100 text-blue-700 border-blue-200',          volgende: 'onderweg',  volgendeLabel: 'Onderweg' },
  onderweg:   { label: 'Onderweg',   kleur: 'bg-purple-100 text-purple-700 border-purple-200',    volgende: 'afgeleverd', volgendeLabel: 'Afgeleverd' },
  afgeleverd: { label: 'Afgeleverd', kleur: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
}

const PIN_KEY = 'beheer_pin'

type ResFilter  = 'vandaag' | 'alle' | ReservatieStatus
type BestFilter = 'vandaag' | 'alle' | BestellingStatus
type Weergave   = 'reservaties' | 'bestellingen'

// ── Component ─────────────────────────────────────────────────────────────────

export default function BeheerPage() {
  const [pin, setPin]           = useState('')
  const [ingelogd, setIngelogd] = useState(false)

  // reservaties
  const [reservaties, setReservaties] = useState<Reservatie[]>([])
  const [resFilter,   setResFilter]   = useState<ResFilter>('vandaag')

  // bestellingen
  const [bestellingen, setBestellingen] = useState<Bestelling[]>([])
  const [bestFilter,   setBestFilter]   = useState<BestFilter>('vandaag')

  const [weergave,  setWeergave]  = useState<Weergave>('reservaties')
  const [bezig,     setBezig]     = useState(false)
  const [countdown, setCountdown] = useState(30)

  const intervalRef   = useRef<ReturnType<typeof setInterval> | null>(null)
  const countdownRef  = useRef<ReturnType<typeof setInterval> | null>(null)

  // ── Ophalen ──────────────────────────────────────────────────────────────────

  const haalOp = useCallback(async (p?: string) => {
    const gebruiktePin = p ?? sessionStorage.getItem(PIN_KEY) ?? ''
    if (!gebruiktePin) return
    setBezig(true)
    try {
      const [resRes, bestRes] = await Promise.all([
        fetch('/api/reservaties',  { headers: { 'x-pin': gebruiktePin } }),
        fetch('/api/bestellingen', { headers: { 'x-pin': gebruiktePin } }),
      ])
      if (resRes.ok)   setReservaties(await resRes.json())
      if (bestRes.ok)  setBestellingen(await bestRes.json())
      if (resRes.status === 403 || bestRes.status === 403) {
        sessionStorage.removeItem(PIN_KEY)
        setIngelogd(false)
      }
      setCountdown(30)
    } catch {}
    setBezig(false)
  }, [])

  useEffect(() => {
    const opgeslagen = sessionStorage.getItem(PIN_KEY)
    if (opgeslagen) { setIngelogd(true); haalOp(opgeslagen) }
  }, [haalOp])

  useEffect(() => {
    if (!ingelogd) return
    intervalRef.current  = setInterval(() => haalOp(), 30_000)
    countdownRef.current = setInterval(() => setCountdown((c) => (c > 0 ? c - 1 : 30)), 1000)
    return () => {
      if (intervalRef.current)  clearInterval(intervalRef.current)
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [ingelogd, haalOp])

  // ── Login ─────────────────────────────────────────────────────────────────────

  function login(e: React.FormEvent) {
    e.preventDefault()
    sessionStorage.setItem(PIN_KEY, pin)
    setIngelogd(true)
    haalOp(pin)
  }

  // ── Reservatie-acties ─────────────────────────────────────────────────────────

  async function updateResStatus(id: string, status: ReservatieStatus) {
    const p = sessionStorage.getItem(PIN_KEY) ?? ''
    setReservaties((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    await fetch('/api/reservaties', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-pin': p },
      body: JSON.stringify({ id, status }),
    })
  }

  async function verwijderRes(id: string) {
    if (!confirm('Reservatie verwijderen?')) return
    const p = sessionStorage.getItem(PIN_KEY) ?? ''
    setReservaties((prev) => prev.filter((r) => r.id !== id))
    await fetch('/api/reservaties', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-pin': p },
      body: JSON.stringify({ id }),
    })
  }

  // ── Bestelling-acties ─────────────────────────────────────────────────────────

  async function updateBestStatus(id: string, status: BestellingStatus) {
    const p = sessionStorage.getItem(PIN_KEY) ?? ''
    setBestellingen((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
    await fetch('/api/bestellingen', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-pin': p },
      body: JSON.stringify({ id, status }),
    })
  }

  async function verwijderBest(id: string) {
    if (!confirm('Bestelling verwijderen?')) return
    const p = sessionStorage.getItem(PIN_KEY) ?? ''
    setBestellingen((prev) => prev.filter((b) => b.id !== id))
    await fetch('/api/bestellingen', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'x-pin': p },
      body: JSON.stringify({ id }),
    })
  }

  // ── Filter-logica ─────────────────────────────────────────────────────────────

  const vandaagRes  = reservaties.filter((r)  => { try { return isToday(parseISO(r.datum)) } catch { return false } })
  const vandaagBest = bestellingen.filter((b) => { try { return isToday(parseISO(b.tijdStempel)) } catch { return false } })

  const nieuweRes   = reservaties.filter((r)  => r.status === 'nieuw').length
  const nieuweBest  = bestellingen.filter((b) => b.status === 'nieuw').length

  const gefilterdeRes: Reservatie[] =
    resFilter === 'vandaag' ? vandaagRes :
    resFilter === 'alle'    ? reservaties :
    reservaties.filter((r) => r.status === resFilter)

  const gefilterdeBest: Bestelling[] =
    bestFilter === 'vandaag' ? vandaagBest :
    bestFilter === 'alle'    ? bestellingen :
    bestellingen.filter((b) => b.status === bestFilter)

  // ── Login-scherm ──────────────────────────────────────────────────────────────

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

  // ── Dashboard ─────────────────────────────────────────────────────────────────

  const resTabs: { id: ResFilter; label: string }[] = [
    { id: 'vandaag',   label: `Vandaag (${vandaagRes.length})` },
    { id: 'alle',      label: `Alle (${reservaties.length})` },
    { id: 'nieuw',     label: 'Nieuw' },
    { id: 'bevestigd', label: 'Bevestigd' },
    { id: 'afgerond',  label: 'Afgerond' },
  ]

  const bestTabs: { id: BestFilter; label: string }[] = [
    { id: 'vandaag',    label: `Vandaag (${vandaagBest.length})` },
    { id: 'alle',       label: `Alle (${bestellingen.length})` },
    { id: 'nieuw',      label: 'Nieuw' },
    { id: 'onderweg',   label: 'Onderweg' },
    { id: 'afgeleverd', label: 'Afgeleverd' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <div className="bg-charcoal text-white px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <p className="text-xs text-white/40">Sushi Dendermonde</p>
          <h1 className="font-semibold text-sm">Beheer</h1>
        </div>
        <div className="flex items-center gap-3">
          {(nieuweRes > 0 || nieuweBest > 0) && (
            <span className="flex items-center gap-1 bg-amber-500/20 text-amber-400 text-xs px-2.5 py-1 rounded-full font-medium">
              <Bell className="w-3 h-3" />
              {nieuweRes + nieuweBest} nieuw
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

      {/* Weergave toggle */}
      <div className="bg-white border-b border-border flex">
        <button
          onClick={() => setWeergave('reservaties')}
          className={cn(
            'flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors',
            weergave === 'reservaties' ? 'border-accent text-accent' : 'border-transparent text-gray-warm hover:text-charcoal'
          )}
        >
          <Calendar className="w-3.5 h-3.5" />
          Reservaties
          {nieuweRes > 0 && (
            <span className="bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{nieuweRes}</span>
          )}
        </button>
        <button
          onClick={() => setWeergave('bestellingen')}
          className={cn(
            'flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors',
            weergave === 'bestellingen' ? 'border-accent text-accent' : 'border-transparent text-gray-warm hover:text-charcoal'
          )}
        >
          <Truck className="w-3.5 h-3.5" />
          Bestellingen
          {nieuweBest > 0 && (
            <span className="bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{nieuweBest}</span>
          )}
        </button>
      </div>

      {/* ── Reservaties ──────────────────────────────────────────────────────────── */}
      {weergave === 'reservaties' && (
        <>
          <div className="bg-white border-b border-border flex gap-0 overflow-x-auto">
            {resTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setResFilter(t.id)}
                className={cn(
                  'py-3 px-4 text-xs font-medium whitespace-nowrap border-b-2 transition-colors shrink-0',
                  resFilter === t.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-gray-warm hover:text-charcoal'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="max-w-2xl mx-auto px-4 py-4 space-y-3 pb-12">
            {gefilterdeRes.length === 0 ? (
              <p className="text-center text-gray-warm text-sm py-16">Geen reservaties</p>
            ) : (
              gefilterdeRes.map((res) => {
                const s = RES_STATUS[res.status] ?? RES_STATUS.nieuw
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
                          onClick={() => updateResStatus(res.id, s.volgende!)}
                          className="flex-1 py-2 bg-accent text-white rounded-xl text-xs font-semibold hover:bg-accent-dark transition-colors"
                        >
                          {s.volgendeLabel}
                        </button>
                      )}
                      <button
                        onClick={() => verwijderRes(res.id)}
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
        </>
      )}

      {/* ── Bestellingen ─────────────────────────────────────────────────────────── */}
      {weergave === 'bestellingen' && (
        <>
          <div className="bg-white border-b border-border flex gap-0 overflow-x-auto">
            {bestTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setBestFilter(t.id)}
                className={cn(
                  'py-3 px-4 text-xs font-medium whitespace-nowrap border-b-2 transition-colors shrink-0',
                  bestFilter === t.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-gray-warm hover:text-charcoal'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="max-w-2xl mx-auto px-4 py-4 space-y-3 pb-12">
            {gefilterdeBest.length === 0 ? (
              <p className="text-center text-gray-warm text-sm py-16">Geen bestellingen</p>
            ) : (
              gefilterdeBest.map((best) => {
                const s = BEST_STATUS[best.status] ?? BEST_STATUS.nieuw
                return (
                  <div
                    key={best.id}
                    className={cn(
                      'bg-white rounded-2xl border p-4 space-y-3',
                      best.status === 'nieuw' ? 'border-amber-200 shadow-md shadow-amber-50' : 'border-border'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-charcoal text-sm">{best.naam}</p>
                        <p className="text-xs text-gray-warm font-mono">{best.bestellingNummer}</p>
                      </div>
                      <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full border shrink-0', s.kleur)}>
                        {s.label}
                      </span>
                    </div>

                    {/* Items */}
                    <div className="bg-cream rounded-xl px-3 py-2.5 space-y-1">
                      {best.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-xs">
                          <span className="text-charcoal flex items-center gap-1">
                            <ShoppingBag className="w-3 h-3 text-gray-warm shrink-0" />
                            {item.aantal}× {item.naam}
                          </span>
                          <span className="text-gray-warm font-medium">{formatEuro(item.subtotaal)}</span>
                        </div>
                      ))}
                      <div className="border-t border-border/50 pt-1.5 mt-1.5 flex justify-between text-xs font-semibold text-charcoal">
                        <span>Totaal</span>
                        <span>{formatEuro(best.totaal)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                      <a href={`tel:${best.telefoon}`} className="flex items-center gap-1 text-gray-warm hover:text-accent transition-colors">
                        <Phone className="w-3 h-3" />{best.telefoon}
                      </a>
                      <a href={`mailto:${best.email}`} className="flex items-center gap-1 text-gray-warm hover:text-accent transition-colors">
                        <Mail className="w-3 h-3" />{best.email}
                      </a>
                    </div>

                    {best.opmerking && (
                      <p className="text-xs text-gray-warm bg-cream rounded-lg px-3 py-2 italic">
                        &ldquo;{best.opmerking}&rdquo;
                      </p>
                    )}

                    <div className="flex items-center gap-2 pt-1">
                      {s.volgende && (
                        <button
                          onClick={() => updateBestStatus(best.id, s.volgende!)}
                          className="flex-1 py-2 bg-accent text-white rounded-xl text-xs font-semibold hover:bg-accent-dark transition-colors"
                        >
                          {s.volgendeLabel}
                        </button>
                      )}
                      <button
                        onClick={() => verwijderBest(best.id)}
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
        </>
      )}
    </div>
  )
}
