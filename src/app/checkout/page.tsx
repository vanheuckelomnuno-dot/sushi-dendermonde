'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Smartphone, Building2, CheckCircle2, AlertCircle } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { formatEuro, generateOrderId } from '@/lib/utils'
import { BetaalMethode } from '@/types/order'
import { cn } from '@/lib/utils'

type CheckoutStap = 'gegevens' | 'betaling' | 'verwerking' | 'succes' | 'mislukt'

interface KlantForm {
  voornaam: string
  achternaam: string
  email: string
  telefoon: string
  adres: string
  stad: string
  postcode: string
  opmerking: string
  bestelType: 'afhalen' | 'levering'
}

const betaalMethoden: { id: BetaalMethode; label: string; icon: React.ReactNode; beschrijving: string }[] = [
  { id: 'bancontact', label: 'Bancontact', icon: <Building2 className="w-5 h-5" />, beschrijving: 'Betaal met je bankkaart' },
  { id: 'kaart', label: 'Kredietkaart', icon: <CreditCard className="w-5 h-5" />, beschrijving: 'Visa, Mastercard, Amex' },
  { id: 'apple_pay', label: 'Apple Pay', icon: <Smartphone className="w-5 h-5" />, beschrijving: 'Snel betalen met je iPhone' },
  { id: 'google_pay', label: 'Google Pay', icon: <Smartphone className="w-5 h-5" />, beschrijving: 'Betaal met Google Pay' },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const [stap, setStap] = useState<CheckoutStap>('gegevens')
  const [geselecteerdeBetaalMethode, setGeselecteerdeBetaalMethode] = useState<BetaalMethode>('bancontact')
  const [orderId] = useState(generateOrderId())
  const [errors, setErrors] = useState<Partial<KlantForm>>({})
  const [form, setForm] = useState<KlantForm>({
    voornaam: '',
    achternaam: '',
    email: '',
    telefoon: '',
    adres: '',
    stad: '',
    postcode: '',
    opmerking: '',
    bestelType: 'afhalen',
  })

  if (cart.items.length === 0 && stap !== 'succes') {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-warm mb-4">Je bestelling is leeg.</p>
          <Link href="/bestellen" className="text-accent hover:underline font-medium">
            Ga terug naar het menu
          </Link>
        </div>
      </div>
    )
  }

  function valideer(): boolean {
    const nieuwErrors: Partial<KlantForm> = {}
    if (!form.voornaam.trim()) nieuwErrors.voornaam = 'Verplicht'
    if (!form.achternaam.trim()) nieuwErrors.achternaam = 'Verplicht'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nieuwErrors.email = 'Geldig e-mailadres vereist'
    if (!form.telefoon.trim() || form.telefoon.length < 9) nieuwErrors.telefoon = 'Geldig telefoonnummer vereist'
    if (form.bestelType === 'levering') {
      if (!form.adres.trim()) nieuwErrors.adres = 'Verplicht bij levering'
      if (!form.stad.trim()) nieuwErrors.stad = 'Verplicht bij levering'
      if (!form.postcode.trim()) nieuwErrors.postcode = 'Verplicht bij levering'
    }
    setErrors(nieuwErrors)
    return Object.keys(nieuwErrors).length === 0
  }

  function naarBetaling() {
    if (valideer()) setStap('betaling')
  }

  async function bevestigBetaling() {
    setStap('verwerking')
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const succes = Math.random() > 0.1
    if (succes) {
      try {
        const bestaande = JSON.parse(localStorage.getItem('sushi-admin-orders') || '[]')
        bestaande.unshift({
          id: orderId,
          tijdstip: new Date().toISOString(),
          klant: `${form.voornaam} ${form.achternaam}`,
          telefoon: form.telefoon,
          email: form.email,
          type: form.bestelType,
          adres: form.bestelType === 'levering' ? `${form.adres}, ${form.postcode} ${form.stad}` : '',
          items: cart.items.map((i) => ({ naam: i.product.naam, aantal: i.aantal, prijs: i.product.prijs })),
          totaal: cart.totaal,
          opmerking: form.opmerking,
          status: 'nieuw',
        })
        localStorage.setItem('sushi-admin-orders', JSON.stringify(bestaande.slice(0, 50)))
      } catch {}
      clearCart()
      setStap('succes')
    } else {
      setStap('mislukt')
    }
  }

  function update(veld: keyof KlantForm, waarde: string) {
    setForm((prev) => ({ ...prev, [veld]: waarde }))
    if (errors[veld]) setErrors((prev) => ({ ...prev, [veld]: undefined }))
  }

  if (stap === 'verwerking') {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-charcoal font-medium">Betaling wordt verwerkt...</p>
          <p className="text-gray-warm text-sm mt-2">Even geduld</p>
        </div>
      </div>
    )
  }

  if (stap === 'succes') {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-border p-8 text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-semibold text-charcoal mb-2">Bestelling geplaatst!</h1>
          <p className="text-gray-warm mb-6">
            Je ontvangt een bevestiging op <strong>{form.email}</strong>
          </p>
          <div className="bg-cream rounded-xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-warm">Bestelnummer</span>
              <span className="font-mono font-bold text-charcoal">{orderId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-warm">Naam</span>
              <span className="text-charcoal">{form.voornaam} {form.achternaam}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-warm">Type</span>
              <span className="text-charcoal capitalize">{form.bestelType}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-warm">Totaal</span>
              <span className="font-semibold text-charcoal">{formatEuro(cart.totaal || 0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-warm">Status</span>
              <span className="text-emerald-600 font-medium">Bevestigd</span>
            </div>
          </div>
          <p className="text-sm text-gray-warm mb-6">Verwachte tijd: <strong className="text-charcoal">20–30 minuten</strong></p>
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark transition-colors"
          >
            Terug naar home
          </Link>
        </div>
      </div>
    )
  }

  if (stap === 'mislukt') {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-border p-8 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-semibold text-charcoal mb-2">Betaling mislukt</h1>
          <p className="text-gray-warm mb-6">Er ging iets mis. Probeer opnieuw of kies een andere betaalmethode.</p>
          <button
            onClick={() => setStap('betaling')}
            className="w-full py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark transition-colors"
          >
            Opnieuw proberen
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pt-20 lg:pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/bestellen" className="flex items-center gap-2 text-gray-warm hover:text-charcoal transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Terug naar menu
          </Link>
          <div className="flex-1 flex items-center gap-3">
            {['Gegevens', 'Betaling'].map((s, i) => {
              const actief = (stap === 'gegevens' && i === 0) || (stap === 'betaling' && i === 1)
              const klaar = (stap === 'betaling' && i === 0)
              return (
                <div key={s} className="flex items-center gap-2">
                  <div className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                    klaar ? 'bg-emerald-500 text-white' : actief ? 'bg-accent text-white' : 'bg-gray-light text-gray-warm'
                  )}>
                    {klaar ? '✓' : i + 1}
                  </div>
                  <span className={cn('text-sm hidden sm:block', actief ? 'text-charcoal font-medium' : 'text-gray-warm')}>{s}</span>
                  {i < 1 && <div className="w-8 h-px bg-border" />}
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Main form */}
          <div>
            {stap === 'gegevens' && (
              <div className="bg-white rounded-2xl border border-border p-6 lg:p-8">
                <h2 className="font-semibold text-charcoal text-lg mb-6">Jouw gegevens</h2>

                {/* Besteltype */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-charcoal mb-3">Hoe wil je je bestelling ontvangen?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['afhalen', 'levering'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => update('bestelType', type)}
                        className={cn(
                          'py-3 px-4 rounded-xl border text-sm font-medium transition-all capitalize',
                          form.bestelType === type
                            ? 'border-accent bg-accent/5 text-accent'
                            : 'border-border text-gray-warm hover:border-charcoal'
                        )}
                      >
                        {type === 'afhalen' ? '🏪 Afhalen' : '🚚 Bezorging'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { veld: 'voornaam' as const, label: 'Voornaam', type: 'text', col: 1 },
                    { veld: 'achternaam' as const, label: 'Achternaam', type: 'text', col: 1 },
                    { veld: 'email' as const, label: 'E-mailadres', type: 'email', col: 2 },
                    { veld: 'telefoon' as const, label: 'Telefoonnummer', type: 'tel', col: 1 },
                  ].map(({ veld, label, type, col }) => (
                    <div key={veld} className={col === 2 ? 'sm:col-span-2' : ''}>
                      <label className="block text-xs font-medium text-charcoal mb-1.5">{label}</label>
                      <input
                        type={type}
                        value={form[veld]}
                        onChange={(e) => update(veld, e.target.value)}
                        className={cn(
                          'w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none transition-colors',
                          errors[veld] ? 'border-red-400 bg-red-50' : 'border-border focus:border-accent'
                        )}
                      />
                      {errors[veld] && <p className="text-red-500 text-xs mt-1">{errors[veld]}</p>}
                    </div>
                  ))}

                  {form.bestelType === 'levering' && (
                    <>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-charcoal mb-1.5">Adres</label>
                        <input
                          type="text"
                          value={form.adres}
                          onChange={(e) => update('adres', e.target.value)}
                          className={cn('w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none transition-colors', errors.adres ? 'border-red-400 bg-red-50' : 'border-border focus:border-accent')}
                        />
                        {errors.adres && <p className="text-red-500 text-xs mt-1">{errors.adres}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-charcoal mb-1.5">Postcode</label>
                        <input type="text" value={form.postcode} onChange={(e) => update('postcode', e.target.value)}
                          className={cn('w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none', errors.postcode ? 'border-red-400 bg-red-50' : 'border-border focus:border-accent')} />
                        {errors.postcode && <p className="text-red-500 text-xs mt-1">{errors.postcode}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-charcoal mb-1.5">Stad</label>
                        <input type="text" value={form.stad} onChange={(e) => update('stad', e.target.value)}
                          className={cn('w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none', errors.stad ? 'border-red-400 bg-red-50' : 'border-border focus:border-accent')} />
                        {errors.stad && <p className="text-red-500 text-xs mt-1">{errors.stad}</p>}
                      </div>
                    </>
                  )}

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-charcoal mb-1.5">Opmerking (optioneel)</label>
                    <textarea
                      value={form.opmerking}
                      onChange={(e) => update('opmerking', e.target.value)}
                      rows={3}
                      placeholder="Bijv. allergieën, speciale wensen..."
                      className="w-full px-4 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:border-accent resize-none"
                    />
                  </div>
                </div>

                <button
                  onClick={naarBetaling}
                  className="w-full mt-6 py-3.5 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark transition-colors"
                >
                  Doorgaan naar betaling
                </button>
              </div>
            )}

            {stap === 'betaling' && (
              <div className="bg-white rounded-2xl border border-border p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <button onClick={() => setStap('gegevens')} className="text-gray-warm hover:text-charcoal">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h2 className="font-semibold text-charcoal text-lg">Betaalmethode</h2>
                </div>

                <div className="space-y-3 mb-6">
                  {betaalMethoden.map((methode) => (
                    <label
                      key={methode.id}
                      className={cn(
                        'flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all',
                        geselecteerdeBetaalMethode === methode.id
                          ? 'border-accent bg-accent/5'
                          : 'border-border hover:border-accent/40'
                      )}
                    >
                      <input
                        type="radio"
                        name="betaalmethode"
                        value={methode.id}
                        checked={geselecteerdeBetaalMethode === methode.id}
                        onChange={() => setGeselecteerdeBetaalMethode(methode.id)}
                        className="sr-only"
                      />
                      <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
                        geselecteerdeBetaalMethode === methode.id ? 'border-accent' : 'border-gray-light'
                      )}>
                        {geselecteerdeBetaalMethode === methode.id && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                      </div>
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-gray-warm">{methode.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-charcoal">{methode.label}</p>
                          <p className="text-xs text-gray-warm">{methode.beschrijving}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="bg-cream rounded-xl p-4 mb-6 text-xs text-gray-warm flex items-start gap-2">
                  <span>🔒</span>
                  <span>
                    Je betaling wordt veilig verwerkt. Dit is een demo-omgeving — er worden geen echte betalingen uitgevoerd.
                    In productie wordt dit gekoppeld aan een gecertificeerde payment provider.
                  </span>
                </div>

                <button
                  onClick={bevestigBetaling}
                  className="w-full py-3.5 bg-accent text-white rounded-xl font-semibold hover:bg-accent-dark transition-colors"
                >
                  Betaal {formatEuro(cart.totaal)} via {betaalMethoden.find(m => m.id === geselecteerdeBetaalMethode)?.label}
                </button>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-2xl border border-border p-5 h-fit">
            <h3 className="font-semibold text-charcoal text-sm mb-4">Overzicht bestelling</h3>
            <div className="space-y-3 mb-4">
              {cart.items.map((item) => {
                const optiesMeerprijs = item.opties?.reduce((s, o) => s + o.meerprijs, 0) ?? 0
                const prijs = item.product.promoPercentage
                  ? item.product.prijs * (1 - item.product.promoPercentage / 100) + optiesMeerprijs
                  : item.product.prijs + optiesMeerprijs
                return (
                  <div key={item.itemId} className="flex justify-between text-sm">
                    <span className="text-gray-warm">
                      {item.aantal}× {item.product.naam}
                    </span>
                    <span className="text-charcoal font-medium">{formatEuro(prijs * item.aantal)}</span>
                  </div>
                )
              })}
            </div>
            <div className="border-t border-border pt-3 space-y-2">
              <div className="flex justify-between text-sm text-gray-warm">
                <span>Subtotaal</span><span>{formatEuro(cart.subtotaal)}</span>
              </div>
              {cart.korting > 0 && (
                <div className="flex justify-between text-sm text-emerald-600">
                  <span>Korting</span><span>−{formatEuro(cart.korting)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-warm">
                <span>Bezorgkosten</span>
                <span>{cart.bezorgkosten === 0 ? <span className="text-emerald-600">Gratis</span> : formatEuro(cart.bezorgkosten)}</span>
              </div>
              <div className="flex justify-between font-semibold text-charcoal pt-1">
                <span>Totaal</span><span>{formatEuro(cart.totaal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
