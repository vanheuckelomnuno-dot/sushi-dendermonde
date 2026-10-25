'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, MapPin } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { formatEuro, generateOrderId } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface AfhaalForm {
  voornaam:   string
  achternaam: string
  email:      string
  telefoon:   string
  opmerking:  string
}

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const [bestellingNummer] = useState(generateOrderId())
  const [geplaatst, setGeplaatst] = useState(false)
  const [bezig,     setBezig]     = useState(false)
  const [fout,      setFout]      = useState<string | null>(null)
  const [errors,    setErrors]    = useState<Partial<AfhaalForm>>({})
  const [form,      setForm]      = useState<AfhaalForm>({
    voornaam:   '',
    achternaam: '',
    email:      '',
    telefoon:   '',
    opmerking:  '',
  })

  if (cart.items.length === 0 && !geplaatst) {
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

  function update(veld: keyof AfhaalForm, waarde: string) {
    setForm((prev) => ({ ...prev, [veld]: waarde }))
    if (errors[veld]) setErrors((prev) => ({ ...prev, [veld]: undefined }))
  }

  function valideer(): boolean {
    const e: Partial<AfhaalForm> = {}
    if (!form.voornaam.trim())   e.voornaam   = 'Verplicht'
    if (!form.achternaam.trim()) e.achternaam = 'Verplicht'
    if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(form.email.trim()))
      e.email = 'Geldig e-mailadres vereist'
    if (!form.telefoon.trim() || form.telefoon.length < 9)
      e.telefoon = 'Geldig telefoonnummer vereist'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function plaatsBestelling() {
    if (!valideer()) return
    setBezig(true)
    setFout(null)

    const items = cart.items.map((item) => {
      const optiesMeerprijs = item.opties?.reduce((s, o) => s + o.meerprijs, 0) ?? 0
      const eenheidsprijs = item.product.promoPercentage
        ? item.product.prijs * (1 - item.product.promoPercentage / 100) + optiesMeerprijs
        : item.product.prijs + optiesMeerprijs
      return {
        productId:    item.product.id,
        naam:         item.product.naam,
        aantal:       item.aantal,
        eenheidsprijs,
        subtotaal:    eenheidsprijs * item.aantal,
        opties:       item.opties?.map((o) => ({ optieNaam: o.optieNaam, keuzeNaam: o.keuzeNaam, meerprijs: o.meerprijs })) ?? [],
      }
    })

    try {
      const res = await fetch('/api/bestellingen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bestellingNummer,
          naam:      `${form.voornaam.trim()} ${form.achternaam.trim()}`,
          telefoon:  form.telefoon.trim(),
          email:     form.email.trim(),
          items,
          totaal:    cart.subtotaal,
          opmerking: form.opmerking.trim() || undefined,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setFout(data.error ?? 'Er ging iets mis. Probeer opnieuw.')
        setBezig(false)
        return
      }

      clearCart()
      setGeplaatst(true)
    } catch {
      setFout('Verbindingsfout. Controleer je internet en probeer opnieuw.')
    }
    setBezig(false)
  }

  if (geplaatst) {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-border p-8 text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-semibold text-charcoal mb-2">Bestelling ontvangen!</h1>
          <p className="text-gray-warm mb-6">
            Je bestelling is geregistreerd. Tot ziens bij Sushi Dendermonde!
          </p>
          <div className="bg-cream rounded-xl p-4 mb-4 text-left space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-warm">Bestelnummer</span>
              <span className="font-mono font-bold text-charcoal">{bestellingNummer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-warm">Naam</span>
              <span className="text-charcoal">{form.voornaam} {form.achternaam}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-warm">Totaal</span>
              <span className="font-semibold text-charcoal">{formatEuro(cart.subtotaal || 0)}</span>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6 text-left">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800">
              <strong>Afhaling</strong> — Statieplein 34, 9200 Dendermonde.<br />
              Wij leveren niet aan huis.
            </p>
          </div>
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

  return (
    <div className="min-h-screen bg-cream pt-20 lg:pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/bestellen" className="flex items-center gap-2 text-gray-warm hover:text-charcoal transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Terug naar menu
          </Link>
        </div>

        {/* Afhaling notice */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-6">
          <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-900">Enkel afhaling — geen levering aan huis</p>
            <p className="text-xs text-amber-700 mt-0.5">Je bestelling kan je ophalen aan <strong>Statieplein 34, 9200 Dendermonde</strong>.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Form */}
          <div className="bg-white rounded-2xl border border-border p-6 lg:p-8">
            <h2 className="font-semibold text-charcoal text-lg mb-1">Jouw gegevens</h2>
            <p className="text-sm text-gray-warm mb-6">Vul je contactgegevens in voor de afhaling.</p>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {([
                  { veld: 'voornaam'   as const, label: 'Voornaam' },
                  { veld: 'achternaam' as const, label: 'Achternaam' },
                ] as const).map(({ veld, label }) => (
                  <div key={veld}>
                    <label className="block text-xs font-medium text-charcoal mb-1.5">{label}</label>
                    <input
                      type="text"
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {([
                  { veld: 'email'    as const, label: 'E-mailadres',   type: 'email' },
                  { veld: 'telefoon' as const, label: 'Telefoonnummer', type: 'tel'   },
                ] as const).map(({ veld, label, type }) => (
                  <div key={veld}>
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
              </div>

              <div>
                <label className="block text-xs font-medium text-charcoal mb-1.5">Opmerking (optioneel)</label>
                <textarea
                  value={form.opmerking}
                  onChange={(e) => update('opmerking', e.target.value)}
                  rows={3}
                  placeholder="Bijv. allergieën, speciale wensen..."
                  className="w-full px-4 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:border-accent resize-none"
                />
              </div>

              {fout && (
                <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{fout}</p>
              )}

              <button
                onClick={plaatsBestelling}
                disabled={bezig}
                className="w-full py-3.5 bg-accent disabled:opacity-60 text-white rounded-xl font-semibold hover:bg-accent-dark transition-colors"
              >
                {bezig ? 'Bestelling wordt geplaatst...' : `Bestelling plaatsen — ${formatEuro(cart.subtotaal)}`}
              </button>
            </div>
          </div>

          {/* Overzicht */}
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
                    <span className="text-gray-warm">{item.aantal}× {item.product.naam}</span>
                    <span className="text-charcoal font-medium">{formatEuro(prijs * item.aantal)}</span>
                  </div>
                )
              })}
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between font-semibold text-charcoal">
                <span>Totaal</span>
                <span>{formatEuro(cart.subtotaal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
