import Link from 'next/link'

const categorieenMet = [
  {
    id: 'maki',
    naam: 'Maki',
    beschrijving: 'Klassieke rolletjes',
    foto: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=85',
  },
  {
    id: 'uramaki',
    naam: 'Uramaki',
    beschrijving: 'Inside-out rolls',
    foto: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=600&q=85',
  },
  {
    id: 'nigiri',
    naam: 'Nigiri',
    beschrijving: 'Handgevormd op rijst',
    foto: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=600&q=85',
  },
  {
    id: 'sashimi',
    naam: 'Sashimi',
    beschrijving: 'Puur & vers',
    foto: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=85',
  },
  {
    id: 'poke',
    naam: 'Poké Bowl',
    beschrijving: 'Kleurrijk & voedzaam',
    foto: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=85',
  },
  {
    id: 'combinaties',
    naam: 'Combinaties',
    beschrijving: 'Curated selecties',
    foto: 'https://images.unsplash.com/photo-1540648639573-8c848de23f0a?w=600&q=85',
  },
  {
    id: 'bijgerechten',
    naam: 'Bijgerechten',
    beschrijving: 'Soepen & snacks',
    foto: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=85',
  },
  {
    id: 'dranken',
    naam: 'Dranken',
    beschrijving: 'Thee, sake & meer',
    foto: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=85',
  },
  {
    id: 'desserts',
    naam: 'Desserts',
    beschrijving: 'Mochi & matcha',
    foto: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=85',
  },
]

export function CategorieenGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-medium uppercase tracking-widest mb-3">Ons aanbod</p>
          <h2 className="text-3xl lg:text-4xl font-light text-charcoal">
            Ontdek het <span className="font-semibold">menu</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {categorieenMet.map((cat) => (
            <Link
              key={cat.id}
              href={`/bestellen`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
            >
              <img
                src={cat.foto}
                alt={cat.naam}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm leading-tight">{cat.naam}</p>
                <p className="text-white/60 text-xs mt-0.5">{cat.beschrijving}</p>
              </div>
              {/* Hover CTA */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  Bestel →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/bestellen"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white rounded-full font-medium hover:bg-accent-dark transition-all hover:scale-105"
          >
            Bekijk volledig menu & bestel
          </Link>
        </div>
      </div>
    </section>
  )
}
