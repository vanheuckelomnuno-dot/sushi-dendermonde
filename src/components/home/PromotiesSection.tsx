import Link from 'next/link'
import { Tag } from 'lucide-react'
import { promoties } from '@/data/promotions'

export function PromotiesSection() {
  const actief = promoties.filter((p) => p.actief)

  if (actief.length === 0) return null

  return (
    <section className="relative py-20 overflow-hidden">
      <img
        src="/gerechten/scampi-dragon-eye.jpg"
        alt="Sushi achtergrond"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-cream/93" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-medium uppercase tracking-widest mb-3">Aanbiedingen</p>
          <h2 className="text-3xl lg:text-4xl font-light text-charcoal">
            Actuele <span className="font-semibold">promoties</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actief.map((promo) => (
            <Link
              key={promo.id}
              href="/bestellen"
              className="group relative overflow-hidden rounded-2xl bg-white border border-border hover:shadow-xl transition-all duration-300"
            >
              {promo.afbeelding && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={promo.afbeelding}
                    alt={promo.naam}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      <Tag className="w-3 h-3" />
                      {promo.label}
                    </span>
                  </div>
                </div>
              )}
              <div className="p-5">
                <h3 className="font-semibold text-charcoal mb-1 group-hover:text-accent transition-colors">
                  {promo.naam}
                </h3>
                <p className="text-gray-warm text-sm leading-relaxed">{promo.beschrijving}</p>
                {promo.code && (
                  <div className="mt-3 inline-flex items-center gap-2 bg-cream px-3 py-1.5 rounded-lg border border-border">
                    <span className="text-xs text-gray-warm">Code:</span>
                    <span className="text-xs font-bold text-accent tracking-wider">{promo.code}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
