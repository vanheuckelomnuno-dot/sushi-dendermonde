'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  const [verstuurd, setVerstuurd] = useState(false)
  const [form, setForm] = useState({ naam: '', email: '', bericht: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // In productie: koppelen aan e-mail API
    setVerstuurd(true)
  }

  return (
    <div className="min-h-screen bg-cream pt-20 lg:pt-24 pb-16">
      {/* Hero */}
      <div className="relative h-48 lg:h-56 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1534482421-64566f976cfa?w=1920&q=80"
          alt="Contact"
          className="w-full h-full object-cover brightness-40"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Neem contact op</p>
          <h1 className="text-4xl font-light text-white">
            <span className="font-semibold">Contact</span>
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-light text-charcoal mb-8">
              Vind ons <span className="font-semibold">terug</span>
            </h2>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-charcoal mb-1">Adres</p>
                  <p className="text-gray-warm text-sm">Grote Markt 42<br />9200 Dendermonde</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-charcoal mb-1">Telefoon</p>
                  <a href="tel:+3252123456" className="text-gray-warm text-sm hover:text-accent transition-colors">
                    +32 52 12 34 56
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-charcoal mb-1">E-mail</p>
                  <a href="mailto:info@sushidendermonde.be" className="text-gray-warm text-sm hover:text-accent transition-colors">
                    info@sushidendermonde.be
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-charcoal mb-2">Openingstijden</p>
                  <div className="space-y-1 text-sm text-gray-warm">
                    <div className="flex justify-between gap-8">
                      <span>Maandag – Donderdag</span><span>11:30 – 21:30</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Vrijdag</span><span>11:30 – 22:30</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Zaterdag</span><span>12:00 – 22:30</span>
                    </div>
                    <div className="flex justify-between gap-8">
                      <span>Zondag</span><span>12:00 – 21:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/reserveren" className="inline-flex items-center justify-center px-6 py-3 bg-accent text-white rounded-full font-medium text-sm hover:bg-accent-dark transition-colors">
                Reserveer een tafel
              </Link>
              <Link href="/bestellen" className="inline-flex items-center justify-center px-6 py-3 border border-border text-charcoal rounded-full font-medium text-sm hover:border-charcoal transition-colors">
                Bestel online
              </Link>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-2xl border border-border p-6 lg:p-8">
            {verstuurd ? (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                </div>
                <h3 className="font-semibold text-charcoal text-lg mb-2">Bericht verstuurd!</h3>
                <p className="text-gray-warm text-sm">We contacteren je zo snel mogelijk.</p>
              </div>
            ) : (
              <>
                <h2 className="font-semibold text-charcoal text-lg mb-6">Stuur ons een bericht</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-charcoal mb-1.5">Naam</label>
                    <input
                      type="text"
                      required
                      value={form.naam}
                      onChange={(e) => setForm((p) => ({ ...p, naam: e.target.value }))}
                      className="w-full px-4 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-charcoal mb-1.5">E-mailadres</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-charcoal mb-1.5">Bericht</label>
                    <textarea
                      required
                      rows={5}
                      value={form.bericht}
                      onChange={(e) => setForm((p) => ({ ...p, bericht: e.target.value }))}
                      className="w-full px-4 py-2.5 text-sm border border-border rounded-xl focus:outline-none focus:border-accent resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark transition-colors"
                  >
                    Verstuur bericht
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
