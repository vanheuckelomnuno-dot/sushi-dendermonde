'use client'

import { useState } from 'react'
import { products } from '@/data/products'
import { categories } from '@/data/categories'
import { ProductCard } from '@/components/bestellen/ProductCard'
import { CartSidebar } from '@/components/bestellen/CartSidebar'
import { MobileCartButton } from '@/components/bestellen/MobileCartButton'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BestellenPage() {
  const [actieveCategorie, setActieveCategorie] = useState('voorgerechten')
  const [zoekterm, setZoekterm] = useState('')

  const beschikbareCategorieen = categories.filter((c) => c.beschikbaar)

  const gefilterdeProducten = products.filter((p) => {
    const matchCategorie = p.categorie === actieveCategorie
    const matchZoek =
      zoekterm === '' ||
      p.naam.toLowerCase().includes(zoekterm.toLowerCase()) ||
      p.beschrijving.toLowerCase().includes(zoekterm.toLowerCase())
    return matchCategorie && matchZoek && p.beschikbaar
  })

  return (
    <div className="min-h-screen bg-cream pt-20 lg:pt-24">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-accent text-xs font-medium uppercase tracking-widest mb-2">Online bestellen</p>
              <h1 className="text-2xl lg:text-3xl font-light text-charcoal">
                Kies jouw <span className="font-semibold">sushi</span>
              </h1>
            </div>
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-warm" />
              <input
                type="text"
                placeholder="Zoek een gerecht..."
                value={zoekterm}
                onChange={(e) => setZoekterm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-border rounded-xl bg-cream focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>

        {/* Category tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto pb-0 scrollbar-hide -mb-px">
            {beschikbareCategorieen.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActieveCategorie(cat.id); setZoekterm('') }}
                className={cn(
                  'shrink-0 px-5 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap',
                  actieveCategorie === cat.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-gray-warm hover:text-charcoal hover:border-border'
                )}
              >
                {cat.naam}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Products */}
          <div>
            {zoekterm && (
              <p className="text-sm text-gray-warm mb-4">
                {gefilterdeProducten.length} resultaten voor &ldquo;{zoekterm}&rdquo;
              </p>
            )}
            {!zoekterm && (
              <div className="mb-6">
                <h2 className="font-semibold text-charcoal">{beschikbareCategorieen.find(c => c.id === actieveCategorie)?.naam}</h2>
                <p className="text-sm text-gray-warm">{beschikbareCategorieen.find(c => c.id === actieveCategorie)?.beschrijving}</p>
              </div>
            )}
            {gefilterdeProducten.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-warm">Geen producten gevonden.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {gefilterdeProducten.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

          {/* Cart (desktop) */}
          <div className="hidden lg:block">
            <CartSidebar />
          </div>
        </div>
      </div>

      {/* Mobile cart */}
      <div className="lg:hidden">
        <MobileCartButton />
      </div>
    </div>
  )
}
