'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Product } from '@/types/product'
import { formatEuro } from '@/lib/utils'
import { LabelBadge } from '@/components/ui/LabelBadge'
import { ProductModal } from './ProductModal'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const effectiefPrijs = product.promoPercentage
    ? product.prijs * (1 - product.promoPercentage / 100)
    : product.prijs

  return (
    <>
      <div
        className="group flex flex-col bg-white rounded-2xl border border-border overflow-hidden hover:border-accent/30 hover:shadow-md transition-all duration-300 cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
          <img
            src={product.afbeelding}
            alt={product.naam}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
            {product.labels.slice(0, 2).map((label) => (
              <LabelBadge key={label} label={label} />
            ))}
          </div>
          {product.promoPercentage && (
            <div className="absolute top-2.5 right-2.5 bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              −{product.promoPercentage}%
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 p-4">
          <h3 className="font-medium text-charcoal text-sm mb-1 leading-snug">{product.naam}</h3>
          <p className="text-gray-warm text-xs leading-relaxed flex-1 line-clamp-2 mb-3">{product.beschrijving}</p>
          <div className="flex items-center justify-between">
            <div>
              {product.promoPercentage ? (
                <div className="flex items-baseline gap-1.5">
                  <span className="font-semibold text-charcoal text-sm">{formatEuro(effectiefPrijs)}</span>
                  <span className="text-gray-warm text-xs line-through">{formatEuro(product.prijs)}</span>
                </div>
              ) : (
                <span className="font-semibold text-charcoal text-sm">{formatEuro(product.prijs)}</span>
              )}
            </div>
            <button
              className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent-dark transition-colors shrink-0"
              onClick={(e) => {
                e.stopPropagation()
                if (product.opties?.length) {
                  setModalOpen(true)
                } else {
                  setModalOpen(true)
                }
              }}
              aria-label={`${product.naam} toevoegen`}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <ProductModal product={product} open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
