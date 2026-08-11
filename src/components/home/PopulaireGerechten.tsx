'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPopulaire } from '@/data/products'
import { formatEuro } from '@/lib/utils'
import { LabelBadge } from '@/components/ui/LabelBadge'

export function PopulaireGerechten() {
  const populaire = getPopulaire()

  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-accent text-sm font-medium uppercase tracking-widest mb-3">Onze favorieten</p>
            <h2 className="text-3xl lg:text-4xl font-light text-charcoal">
              Populaire <span className="font-semibold">gerechten</span>
            </h2>
          </div>
          <Link
            href="/bestellen"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-warm hover:text-accent transition-colors group"
          >
            Bekijk alles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {populaire.map((product) => (
            <Link
              key={product.id}
              href="/bestellen"
              className="group bg-white rounded-2xl overflow-hidden border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.afbeelding}
                  alt={product.naam}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {product.labels.map((label) => (
                    <LabelBadge key={label} label={label} />
                  ))}
                </div>
                {product.promoPercentage && (
                  <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    −{product.promoPercentage}%
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-medium text-charcoal mb-1 group-hover:text-accent transition-colors">
                  {product.naam}
                </h3>
                <p className="text-gray-warm text-sm mb-4 line-clamp-2">{product.beschrijving}</p>
                <div className="flex items-center justify-between">
                  <div>
                    {product.promoPercentage ? (
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-charcoal">
                          {formatEuro(product.prijs * (1 - product.promoPercentage / 100))}
                        </span>
                        <span className="text-gray-warm text-sm line-through">{formatEuro(product.prijs)}</span>
                      </div>
                    ) : (
                      <span className="font-semibold text-charcoal">{formatEuro(product.prijs)}</span>
                    )}
                  </div>
                  <span className="text-xs text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Bestel nu →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/bestellen"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-dark transition-colors"
          >
            Bekijk alle gerechten
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
