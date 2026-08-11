import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function RestaurantSection() {
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images — alleen bevestigde sushi foto's */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-3">
              {/* Sushi rolls — chef bereiding sfeer */}
              <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&q=85"
                  alt="Sushi bereiding"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Japanse soep / bijgerecht */}
              <div className="rounded-2xl overflow-hidden aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=85"
                  alt="Japans bijgerecht"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="space-y-3 pt-8">
              {/* Sashimi / nigiri close-up */}
              <div className="rounded-2xl overflow-hidden aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=85"
                  alt="Verse sashimi"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Sushi box */}
              <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src="https://images.unsplash.com/photo-1540648639573-8c848de23f0a?w=600&q=85"
                  alt="Sushi assortiment"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-accent text-sm font-medium uppercase tracking-widest mb-4">Ons verhaal</p>
            <h2 className="text-3xl lg:text-4xl font-light text-charcoal mb-6 leading-tight">
              Passie voor de{' '}
              <span className="font-semibold">Japanse keuken</span>
            </h2>
            <p className="text-gray-warm text-base leading-relaxed mb-6">
              Bij Sushi Dendermonde geloven we dat echte sushi begint met de beste ingrediënten. Elke dag
              selecteren we verse vis van Japanse kwaliteit, verwerkt met traditionele technieken.
            </p>
            <p className="text-gray-warm text-base leading-relaxed mb-8">
              Ons team van ervaren sushi chefs brengt authentieke Japanse smaken naar het hart van
              Dendermonde. Of je nu bij ons eet of thuis geniet — dezelfde toewijding, elke keer.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-border">
              {[
                { getal: '8+', label: 'Jaar ervaring' },
                { getal: '50+', label: 'Gerechten' },
                { getal: '★ 4.8', label: 'Gemiddeld' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-semibold text-charcoal">{stat.getal}</p>
                  <p className="text-xs text-gray-warm mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/over-ons"
              className="inline-flex items-center gap-2 text-sm font-medium text-charcoal hover:text-accent transition-colors group"
            >
              Lees meer over ons
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
