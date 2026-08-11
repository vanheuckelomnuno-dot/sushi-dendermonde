import Link from 'next/link'

export function GalerieSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-accent text-sm font-medium uppercase tracking-widest mb-3">Onze gerechten</p>
            <h2 className="text-3xl lg:text-4xl font-light text-charcoal">
              Sushi als <span className="font-semibold">kunst</span>
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-gray-warm hover:text-accent transition-colors group"
          >
            Bekijk menu
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Link>
        </div>

        {/* Photo grid — alleen bevestigde sushi foto's */}
        <div className="grid grid-cols-2 sm:grid-cols-3 grid-rows-2 gap-3 h-[480px] sm:h-[560px]">
          {/* Groot verticaal beeld links — sushi rolls close-up */}
          <div className="row-span-2 rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=600&q=85"
              alt="Sushi rolls"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Poké bowl */}
          <div className="rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=85"
              alt="Poké bowl"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Nigiri / sashimi */}
          <div className="rounded-2xl overflow-hidden hidden sm:block">
            <img
              src="https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&q=85"
              alt="Nigiri sushi"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Breed onderste beeld — sushi platter met hover CTA */}
          <div className="col-span-1 sm:col-span-2 rounded-2xl overflow-hidden relative group">
            <img
              src="https://images.unsplash.com/photo-1540648639573-8c848de23f0a?w=900&q=85"
              alt="Premium sushi assortiment"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300 flex items-center justify-center">
              <Link
                href="/bestellen"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-6 py-2.5 bg-white text-charcoal rounded-full text-sm font-medium hover:bg-accent hover:text-white transition-colors"
              >
                Bestel nu →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/menu" className="text-accent font-medium text-sm hover:underline">
            Bekijk het volledige menu →
          </Link>
        </div>
      </div>
    </section>
  )
}
