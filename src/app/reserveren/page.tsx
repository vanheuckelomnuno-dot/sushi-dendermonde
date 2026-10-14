'use client'

import { useState } from 'react'
import { format, addDays, isBefore, startOfToday } from 'date-fns'
import { nl } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Clock, Users, Calendar, CheckCircle2 } from 'lucide-react'
import { generateReservatieNummer } from '@/lib/utils'
import { cn } from '@/lib/utils'

type ReservatieStap = 'datum' | 'personen' | 'tijd' | 'gegevens' | 'bevestiging'

const BESCHIKBARE_TIJDEN = ['16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30']
const MAX_PERSONEN = 12

const stappen: { id: ReservatieStap; label: string }[] = [
  { id: 'datum', label: 'Datum' },
  { id: 'personen', label: 'Personen' },
  { id: 'tijd', label: 'Tijdstip' },
  { id: 'gegevens', label: 'Gegevens' },
]

interface KlantGegevens {
  voornaam: string
  achternaam: string
  email: string
  telefoon: string
  opmerking: string
}

export default function ReserverenPage() {
  const vandaag = startOfToday()
  const [huidigeMaandDag, setHuidigeMaandDag] = useState(vandaag)
  const [stap, setStap] = useState<ReservatieStap>('datum')
  const [geselecteerdeDatum, setGeselecteerdeDatum] = useState<Date | null>(null)
  const [aantalPersonen, setAantalPersonen] = useState(2)
  const [geselecteerdTijdstip, setGeselecteerdTijdstip] = useState<string | null>(null)
  const [reservatieNummer] = useState(generateReservatieNummer())
  const [geplaatst, setGeplaatst] = useState(false)
  const [errors, setErrors] = useState<Partial<KlantGegevens>>({})
  const [klant, setKlant] = useState<KlantGegevens>({
    voornaam: '',
    achternaam: '',
    email: '',
    telefoon: '',
    opmerking: '',
  })

  // Kalender generatie
  const eersteVanMaand = new Date(huidigeMaandDag.getFullYear(), huidigeMaandDag.getMonth(), 1)
  const startDag = eersteVanMaand.getDay() === 0 ? 6 : eersteVanMaand.getDay() - 1
  const dagenInMaand = new Date(huidigeMaandDag.getFullYear(), huidigeMaandDag.getMonth() + 1, 0).getDate()

  const kalenderDagen: (Date | null)[] = [
    ...Array(startDag).fill(null),
    ...Array.from({ length: dagenInMaand }, (_, i) => new Date(huidigeMaandDag.getFullYear(), huidigeMaandDag.getMonth(), i + 1)),
  ]

  function updateKlant(veld: keyof KlantGegevens, waarde: string) {
    setKlant((prev) => ({ ...prev, [veld]: waarde }))
    if (errors[veld]) setErrors((prev) => ({ ...prev, [veld]: undefined }))
  }

  function valideerGegevens(): boolean {
    const nieuwErrors: Partial<KlantGegevens> = {}
    if (!klant.voornaam.trim()) nieuwErrors.voornaam = 'Verplicht'
    if (!klant.achternaam.trim()) nieuwErrors.achternaam = 'Verplicht'
    if (!klant.email.trim() || !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(klant.email.trim())) nieuwErrors.email = 'Geldig e-mailadres vereist'
    if (!klant.telefoon.trim() || klant.telefoon.length < 9) nieuwErrors.telefoon = 'Geldig nummer vereist'
    setErrors(nieuwErrors)
    return Object.keys(nieuwErrors).length === 0
  }

  async function bevestig() {
    if (!valideerGegevens()) return
    try {
      await fetch('/api/reservaties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reservatieNummer,
          naam: `${klant.voornaam} ${klant.achternaam}`,
          telefoon: klant.telefoon,
          email: klant.email,
          datum: geselecteerdeDatum?.toISOString(),
          tijdstip: geselecteerdTijdstip,
          personen: aantalPersonen,
          opmerking: klant.opmerking,
        }),
      })
    } catch {}
    setGeplaatst(true)
    setStap('bevestiging')
  }

  const stapIndex = stappen.findIndex((s) => s.id === stap)

  if (stap === 'bevestiging' && geplaatst) {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center px-4 pb-16">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl border border-border p-8 text-center">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h1 className="text-2xl font-semibold text-charcoal mb-2">Aanvraag ontvangen!</h1>
            <p className="text-gray-warm mb-6">
              Je reservatieaanvraag is geregistreerd. Tot ziens bij Ni Sushi!
            </p>

            <div className="bg-cream rounded-xl p-5 mb-6 text-left space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <span className="text-accent text-sm">#</span>
                </div>
                <div>
                  <p className="text-xs text-gray-warm">Reservatienummer</p>
                  <p className="font-mono font-bold text-charcoal">{reservatieNummer}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-gray-warm">Datum</p>
                  <p className="font-medium text-charcoal">
                    {geselecteerdeDatum && format(geselecteerdeDatum, 'EEEE d MMMM yyyy', { locale: nl })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-gray-warm">Tijdstip</p>
                  <p className="font-medium text-charcoal">{geselecteerdTijdstip}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-gray-warm">Aantal personen</p>
                  <p className="font-medium text-charcoal">{aantalPersonen} {aantalPersonen === 1 ? 'persoon' : 'personen'}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-gray-warm">Naam</p>
                <p className="font-medium text-charcoal">{klant.voornaam} {klant.achternaam}</p>
              </div>
            </div>

            <p className="text-sm text-gray-warm mb-6">
              Sushi Dendermonde, Statieplein 34, 9200 Dendermonde<br />
              <a href="tel:+3252200677" className="text-accent">052 20 06 77</a>
            </p>

            <a
              href="/"
              className="inline-flex items-center justify-center w-full py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark transition-colors"
            >
              Terug naar home
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-20 lg:pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Tafelreservatie</p>
          <h1 className="text-3xl font-light text-charcoal">
            Reserveer een <span className="font-semibold">tafel</span>
          </h1>
          <p className="text-gray-warm text-sm mt-2">In enkele stappen een tafel reserveren bij Sushi Dendermonde</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center mb-10">
          {stappen.map((s, i) => {
            const klaar = i < stapIndex
            const actief = i === stapIndex
            return (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                    klaar ? 'bg-emerald-500 text-white' : actief ? 'bg-accent text-white' : 'bg-gray-light text-gray-warm'
                  )}>
                    {klaar ? '✓' : i + 1}
                  </div>
                  <span className={cn('text-xs hidden sm:block', actief ? 'text-charcoal font-medium' : 'text-gray-warm')}>
                    {s.label}
                  </span>
                </div>
                {i < stappen.length - 1 && (
                  <div className={cn('w-12 sm:w-16 h-px mx-2 mb-4', klaar ? 'bg-emerald-500' : 'bg-border')} />
                )}
              </div>
            )
          })}
        </div>

        {/* Stap 1: Datum */}
        {stap === 'datum' && (
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="font-semibold text-charcoal mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              Kies een datum
            </h2>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setHuidigeMaandDag(new Date(huidigeMaandDag.getFullYear(), huidigeMaandDag.getMonth() - 1, 1))}
                className="p-2 hover:bg-cream rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-warm" />
              </button>
              <p className="font-medium text-charcoal capitalize">
                {format(huidigeMaandDag, 'MMMM yyyy', { locale: nl })}
              </p>
              <button
                onClick={() => setHuidigeMaandDag(new Date(huidigeMaandDag.getFullYear(), huidigeMaandDag.getMonth() + 1, 1))}
                className="p-2 hover:bg-cream rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-warm" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((d) => (
                <div key={d} className="text-center text-xs text-gray-warm py-2 font-medium">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {kalenderDagen.map((dag, i) => {
                if (!dag) return <div key={`empty-${i}`} />
                const verleden = isBefore(dag, vandaag)
                const maandag = dag.getDay() === 1
                const geselecteerd = geselecteerdeDatum?.toDateString() === dag.toDateString()
                return (
                  <button
                    key={dag.toISOString()}
                    disabled={verleden || maandag}
                    onClick={() => setGeselecteerdeDatum(dag)}
                    className={cn(
                      'aspect-square rounded-xl text-sm font-medium transition-all',
                      (verleden || maandag) ? 'text-gray-light cursor-not-allowed' : 'hover:bg-cream',
                      geselecteerd ? 'bg-accent text-white hover:bg-accent-dark' : '',
                      dag.toDateString() === vandaag.toDateString() && !geselecteerd ? 'border border-accent text-accent' : ''
                    )}
                  >
                    {dag.getDate()}
                  </button>
                )
              })}
            </div>

            {geselecteerdeDatum && (
              <div className="mt-4 p-3 bg-cream rounded-xl flex items-center justify-between">
                <p className="text-sm text-charcoal capitalize">
                  {format(geselecteerdeDatum, 'EEEE d MMMM yyyy', { locale: nl })}
                </p>
                <span className="text-xs text-emerald-600 font-medium">Geselecteerd</span>
              </div>
            )}

            <button
              onClick={() => setStap('personen')}
              disabled={!geselecteerdeDatum}
              className={cn(
                'w-full mt-6 py-3.5 rounded-xl font-medium text-sm transition-all',
                geselecteerdeDatum ? 'bg-accent text-white hover:bg-accent-dark' : 'bg-gray-light text-gray-warm cursor-not-allowed'
              )}
            >
              Doorgaan
            </button>
          </div>
        )}

        {/* Stap 2: Personen */}
        {stap === 'personen' && (
          <div className="bg-white rounded-2xl border border-border p-6">
            <button onClick={() => setStap('datum')} className="flex items-center gap-2 text-gray-warm hover:text-charcoal mb-6 text-sm">
              <ChevronLeft className="w-4 h-4" /> Terug
            </button>
            <h2 className="font-semibold text-charcoal mb-2 flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              Hoeveel personen?
            </h2>
            <p className="text-gray-warm text-sm mb-8">Voor grote groepen (12+) neem contact op via telefoon.</p>

            <div className="flex items-center justify-center gap-6 mb-8">
              <button
                onClick={() => setAantalPersonen(Math.max(1, aantalPersonen - 1))}
                className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:border-charcoal transition-colors text-xl"
              >
                −
              </button>
              <div className="text-center">
                <p className="text-5xl font-light text-charcoal">{aantalPersonen}</p>
                <p className="text-gray-warm text-sm mt-1">{aantalPersonen === 1 ? 'persoon' : 'personen'}</p>
              </div>
              <button
                onClick={() => setAantalPersonen(Math.min(MAX_PERSONEN, aantalPersonen + 1))}
                className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:border-charcoal transition-colors text-xl"
              >
                +
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                <button
                  key={n}
                  onClick={() => setAantalPersonen(n)}
                  className={cn(
                    'py-2.5 rounded-xl text-sm font-medium border transition-all',
                    aantalPersonen === n ? 'bg-accent text-white border-accent' : 'border-border text-charcoal hover:border-accent/40'
                  )}
                >
                  {n}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStap('tijd')}
              className="w-full py-3.5 bg-accent text-white rounded-xl font-medium text-sm hover:bg-accent-dark transition-colors"
            >
              Doorgaan — {aantalPersonen} {aantalPersonen === 1 ? 'persoon' : 'personen'}
            </button>
          </div>
        )}

        {/* Stap 3: Tijdstip */}
        {stap === 'tijd' && (
          <div className="bg-white rounded-2xl border border-border p-6">
            <button onClick={() => setStap('personen')} className="flex items-center gap-2 text-gray-warm hover:text-charcoal mb-6 text-sm">
              <ChevronLeft className="w-4 h-4" /> Terug
            </button>
            <h2 className="font-semibold text-charcoal mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              Kies een tijdstip
            </h2>
            <p className="text-gray-warm text-sm mb-6 capitalize">
              {geselecteerdeDatum && format(geselecteerdeDatum, 'EEEE d MMMM', { locale: nl })} · {aantalPersonen} {aantalPersonen === 1 ? 'persoon' : 'personen'}
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-6">
              {BESCHIKBARE_TIJDEN.map((tijd) => (
                <button
                  key={tijd}
                  onClick={() => setGeselecteerdTijdstip(tijd)}
                  className={cn(
                    'py-3 rounded-xl text-sm font-medium border transition-all',
                    geselecteerdTijdstip === tijd
                      ? 'bg-accent text-white border-accent'
                      : 'border-border text-charcoal hover:border-accent/40'
                  )}
                >
                  {tijd}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStap('gegevens')}
              disabled={!geselecteerdTijdstip}
              className={cn(
                'w-full py-3.5 rounded-xl font-medium text-sm transition-all',
                geselecteerdTijdstip ? 'bg-accent text-white hover:bg-accent-dark' : 'bg-gray-light text-gray-warm cursor-not-allowed'
              )}
            >
              {geselecteerdTijdstip ? `Doorgaan — ${geselecteerdTijdstip}` : 'Selecteer een tijdstip'}
            </button>
          </div>
        )}

        {/* Stap 4: Gegevens */}
        {stap === 'gegevens' && (
          <div className="bg-white rounded-2xl border border-border p-6">
            <button onClick={() => setStap('tijd')} className="flex items-center gap-2 text-gray-warm hover:text-charcoal mb-6 text-sm">
              <ChevronLeft className="w-4 h-4" /> Terug
            </button>
            <h2 className="font-semibold text-charcoal mb-6">Jouw contactgegevens</h2>

            {/* Samenvatting */}
            <div className="bg-cream rounded-xl p-4 mb-6 grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xs text-gray-warm mb-1">Datum</p>
                <p className="text-sm font-medium text-charcoal">
                  {geselecteerdeDatum && format(geselecteerdeDatum, 'd MMM', { locale: nl })}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-warm mb-1">Tijdstip</p>
                <p className="text-sm font-medium text-charcoal">{geselecteerdTijdstip}</p>
              </div>
              <div>
                <p className="text-xs text-gray-warm mb-1">Personen</p>
                <p className="text-sm font-medium text-charcoal">{aantalPersonen}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {(['voornaam', 'achternaam'] as const).map((veld) => (
                  <div key={veld}>
                    <label className="block text-xs font-medium text-charcoal mb-1.5 capitalize">{veld}</label>
                    <input
                      type="text"
                      value={klant[veld]}
                      onChange={(e) => updateKlant(veld, e.target.value)}
                      className={cn('w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none transition-colors',
                        errors[veld] ? 'border-red-400 bg-red-50' : 'border-border focus:border-accent'
                      )}
                    />
                    {errors[veld] && <p className="text-red-500 text-xs mt-1">{errors[veld]}</p>}
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal mb-1.5">E-mailadres</label>
                <input
                  type="email"
                  value={klant.email}
                  onChange={(e) => updateKlant('email', e.target.value)}
                  className={cn('w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none transition-colors',
                    errors.email ? 'border-red-400 bg-red-50' : 'border-border focus:border-accent'
                  )}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal mb-1.5">Telefoonnummer</label>
                <input
                  type="tel"
                  value={klant.telefoon}
                  onChange={(e) => updateKlant('telefoon', e.target.value)}
                  className={cn('w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none transition-colors',
                    errors.telefoon ? 'border-red-400 bg-red-50' : 'border-border focus:border-accent'
                  )}
                />
                {errors.telefoon && <p className="text-red-500 text-xs mt-1">{errors.telefoon}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal mb-1.5">Opmerking (optioneel)</label>
                <textarea
                  value={klant.opmerking}
                  onChange={(e) => updateKlant('opmerking', e.target.value)}
                  rows={3}
                  placeholder="Speciale gelegenheid, dieetwensen, kinderstoel..."
                  className="w-full px-4 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:border-accent resize-none"
                />
              </div>
            </div>

            <button
              onClick={bevestig}
              className="w-full mt-6 py-3.5 bg-accent text-white rounded-xl font-semibold text-sm hover:bg-accent-dark transition-colors"
            >
              Reservatie bevestigen
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
