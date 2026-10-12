'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UtensilsCrossed, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [gebruikersnaam, setGebruikersnaam] = useState('')
  const [wachtwoord, setWachtwoord] = useState('')
  const [toonWachtwoord, setToonWachtwoord] = useState(false)
  const [fout, setFout] = useState('')
  const [bezig, setBezig] = useState(false)

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setBezig(true)
    setFout('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gebruikersnaam, wachtwoord }),
      })
      const data = await res.json()

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setFout(data.error ?? 'Inloggen mislukt.')
        setWachtwoord('')
      }
    } catch {
      setFout('Verbindingsfout. Probeer opnieuw.')
    } finally {
      setBezig(false)
    }
  }

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <UtensilsCrossed className="w-5 h-5 text-accent" />
          </div>
          <div>
            <span className="font-semibold text-white text-xl leading-none">Sushi</span>
            <span className="font-light text-white/50 text-xl leading-none ml-1.5">Dendermonde</span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-4 h-4 text-accent" />
            <h1 className="text-white font-medium">Admin toegang</h1>
          </div>

          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Gebruikersnaam</label>
              <input
                type="text"
                autoComplete="username"
                value={gebruikersnaam}
                onChange={(e) => { setGebruikersnaam(e.target.value); setFout('') }}
                disabled={bezig}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent text-sm disabled:opacity-50"
                placeholder="Gebruikersnaam"
              />
            </div>
            <div>
              <label className="text-white/50 text-xs mb-1.5 block">Wachtwoord</label>
              <div className="relative">
                <input
                  type={toonWachtwoord ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={wachtwoord}
                  onChange={(e) => { setWachtwoord(e.target.value); setFout('') }}
                  disabled={bezig}
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent text-sm disabled:opacity-50"
                  placeholder="Wachtwoord"
                />
                <button
                  type="button"
                  onClick={() => setToonWachtwoord((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                  tabIndex={-1}
                >
                  {toonWachtwoord ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {fout && (
              <p className="text-red-400 text-xs">{fout}</p>
            )}

            <button
              type="submit"
              disabled={bezig || !gebruikersnaam || !wachtwoord}
              className="w-full py-3 bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium text-sm transition-colors mt-2"
            >
              {bezig ? 'Bezig...' : 'Inloggen'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2 text-white/25 text-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Beveiligd · max. 5 pogingen · 8u sessie</span>
          </div>
        </div>
      </div>
    </div>
  )
}
