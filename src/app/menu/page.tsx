import { categories } from '@/data/categories'
import { products } from '@/data/products'
import { formatEuro } from '@/lib/utils'
import { LabelBadge } from '@/components/ui/LabelBadge'
import Link from 'next/link'

export const metadata = {
  title: 'Menu — Sushi Dendermonde',
  description: 'Ontdek ons volledig sushi menu: maki, uramaki, nigiri, sashimi, poké bowls en meer.',
}

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-cream pt-20 lg:pt-24 pb-16">
      {/* Hero */}
      <div className="relative h-56 lg:h-72 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1540648639573-8c848de23f0a?w=1920&q=80"
          alt="Sushi menu"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Ontdek onze smaken</p>
          <h1 className="text-4xl lg:text-5xl font-light text-white">
            Ons <span className="font-semibold">menu</span>
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <Link
            href="/bestellen"
            className="inline-flex items-center justify-center px-8 py-3 bg-accent text-white rounded-full font-medium hover:bg-accent-dark transition-colors"
          >
            Bestel online
          </Link>
          <Link
            href="/reserveren"
            className="inline-flex items-center justify-center px-8 py-3 border border-border text-charcoal rounded-full font-medium hover:border-charcoal transition-colors"
          >
            Reserveer een tafel
          </Link>
        </div>

        {/* Categories */}
        {categories
          .filter((c) => c.beschikbaar)
          .map((categorie) => {
            const catProducten = products.filter((p) => p.categorie === categorie.id && p.beschikbaar)
            if (catProducten.length === 0) return null
            return (
              <section key={categorie.id} className="mb-16">
                <div className="flex items-end justify-between mb-6 pb-4 border-b border-border">
                  <div>
                    <h2 className="text-2xl font-light text-charcoal">
                      <span className="font-semibold">{categorie.naam}</span>
                    </h2>
                    <p className="text-gray-warm text-sm mt-1">{categorie.beschrijving}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {catProducten.map((product) => {
                    const effectiefPrijs = product.promoPercentage
                      ? product.prijs * (1 - product.promoPercentage / 100)
                      : product.prijs
                    return (
                      <div
                        key={product.id}
                        className="flex gap-4 p-4 bg-white rounded-xl border border-border hover:border-accent/30 transition-colors group"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                          <img
                            src={product.afbeelding}
                            alt={product.naam}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-medium text-charcoal text-sm">{product.naam}</h3>
                                {product.labels.slice(0, 2).map((label) => (
                                  <LabelBadge key={label} label={label} />
                                ))}
                              </div>
                              <p className="text-gray-warm text-xs mt-1 line-clamp-1">{product.beschrijving}</p>
                            </div>
                            <div className="text-right shrink-0">
                              {product.promoPercentage ? (
                                <>
                                  <p className="font-semibold text-charcoal text-sm">{formatEuro(effectiefPrijs)}</p>
                                  <p className="text-gray-warm text-xs line-through">{formatEuro(product.prijs)}</p>
                                </>
                              ) : (
                                <p className="font-semibold text-charcoal text-sm">{formatEuro(product.prijs)}</p>
                              )}
                            </div>
                          </div>
                          {product.allergenen.length > 0 && (
                            <p className="text-[10px] text-gray-warm mt-1.5">
                              Allergenen: {product.allergenen.join(', ')}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )
          })}

        {/* Footer note */}
        <div className="text-center mt-8 p-6 bg-white rounded-2xl border border-border">
          <p className="text-gray-warm text-sm leading-relaxed">
            Alle prijzen zijn inclusief BTW. Wil je online bestellen of een tafel reserveren?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <Link href="/bestellen" className="text-accent font-medium text-sm hover:underline">Bestel online →</Link>
            <Link href="/reserveren" className="text-accent font-medium text-sm hover:underline">Reserveer een tafel →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
