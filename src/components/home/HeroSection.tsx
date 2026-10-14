'use client'

import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/hero.jpg"
          alt="Premium sushi platter"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-charcoal/50" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-white/80 text-xs font-medium tracking-wider uppercase">
            Vers bereid · Premium kwaliteit · Dendermonde
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-white mb-6 leading-tight">
          <span className="text-accent font-semibold">Sushi Dendermonde</span>
          <br />
          <span className="font-semibold">elke dag vers</span>
        </h1>

        <p className="text-white/70 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed font-light">
          Verse ingrediënten en traditionele bereiding. Bestel online voor afhaling of kom gezellig langs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/bestellen"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white rounded-full font-medium text-base hover:bg-accent-dark transition-all hover:scale-105 active:scale-95"
          >
            Bestel online
          </Link>
          <Link
            href="/reserveren"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-full font-medium text-base border border-white/30 hover:bg-white/20 transition-all backdrop-blur-sm"
          >
            Reserveer een tafel
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
        <span className="text-xs uppercase tracking-widest">Ontdek meer</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  )
}
