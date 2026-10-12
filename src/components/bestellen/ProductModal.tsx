'use client'

import { useState, useEffect } from 'react'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { Product, ProductKeuze } from '@/types/product'
import { formatEuro } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import { LabelBadge } from '@/components/ui/LabelBadge'
import { CartItem } from '@/types/cart'

interface ProductModalProps {
  product: Product
  open: boolean
  onClose: () => void
}

export function ProductModal({ product, open, onClose }: ProductModalProps) {
  const { addItem } = useCart()
  const [aantal, setAantal] = useState(1)
  const [geselecteerdeOpties, setGeselecteerdeOpties] = useState<Record<string, ProductKeuze>>({})
  const [toegevoegd, setToegevoegd] = useState(false)

  useEffect(() => {
    if (open) {
      setAantal(1)
      setGeselecteerdeOpties({})
      setToegevoegd(false)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const optiesMeerprijs = Object.values(geselecteerdeOpties).reduce((sum, k) => sum + k.meerprijs, 0)
  const basisPrijs = product.promoPercentage
    ? product.prijs * (1 - product.promoPercentage / 100)
    : product.prijs
  const totaalPrijs = (basisPrijs + optiesMeerprijs) * aantal

  const alleVerplichtGeselecteerd = product.opties
    ?.filter((o) => o.verplicht)
    .every((o) => geselecteerdeOpties[o.id]) ?? true

  function handleToevoegen() {
    if (!alleVerplichtGeselecteerd) return

    const opties: CartItem['opties'] = Object.entries(geselecteerdeOpties).map(([optieId, keuze]) => {
      const optie = product.opties!.find((o) => o.id === optieId)!
      return {
        optieId,
        keuzeId: keuze.id,
        optieNaam: optie.naam,
        keuzeNaam: keuze.naam,
        meerprijs: keuze.meerprijs,
      }
    })

    addItem(product, aantal, opties.length > 0 ? opties : undefined)
    setToegevoegd(true)
    setTimeout(() => {
      onClose()
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Image */}
        {product.afbeelding ? (
          <div className="relative aspect-[16/7] shrink-0">
            <img
              src={product.afbeelding}
              alt={product.naam}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-4 left-4 flex gap-1.5">
              {product.labels.map((label) => (
                <LabelBadge key={label} label={label} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between px-5 pt-5 shrink-0">
            <div className="flex gap-1.5">
              {product.labels.map((label) => (
                <LabelBadge key={label} label={label} />
              ))}
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 bg-cream rounded-full flex items-center justify-center text-charcoal hover:bg-cream-dark transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto flex-1">
          <div className="p-5 pb-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h2 className="text-xl font-semibold text-charcoal">{product.naam}</h2>
              <div className="text-right shrink-0">
                {product.promoPercentage ? (
                  <>
                    <p className="font-bold text-charcoal">{formatEuro(basisPrijs)}</p>
                    <p className="text-xs text-gray-warm line-through">{formatEuro(product.prijs)}</p>
                  </>
                ) : (
                  <p className="font-bold text-charcoal">{formatEuro(product.prijs)}</p>
                )}
              </div>
            </div>
            <p className="text-gray-warm text-sm leading-relaxed mb-4">{product.beschrijving}</p>

            {/* Ingrediënten */}
            {product.ingredienten.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-medium text-charcoal uppercase tracking-wider mb-2">Ingrediënten</p>
                <p className="text-gray-warm text-xs">{product.ingredienten.join(', ')}</p>
              </div>
            )}

            {/* Allergenen */}
            {product.allergenen.length > 0 && (
              <div className="mb-5 p-3 bg-cream rounded-xl">
                <p className="text-xs text-gray-warm">
                  <span className="font-medium text-charcoal">Allergenen: </span>
                  {product.allergenen.join(', ')}
                </p>
              </div>
            )}

            {/* Opties */}
            {product.opties?.map((optie) => (
              <div key={optie.id} className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-sm font-medium text-charcoal">{optie.naam}</p>
                  {optie.verplicht && (
                    <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
                      Verplicht
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  {optie.keuzes.map((keuze) => {
                    const geselecteerd = geselecteerdeOpties[optie.id]?.id === keuze.id
                    return (
                      <label
                        key={keuze.id}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                          geselecteerd
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-accent/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            geselecteerd ? 'border-accent' : 'border-gray-light'
                          }`}>
                            {geselecteerd && <div className="w-2 h-2 rounded-full bg-accent" />}
                          </div>
                          <input
                            type="radio"
                            name={`optie-${optie.id}`}
                            value={keuze.id}
                            className="sr-only"
                            checked={geselecteerd}
                            onChange={() => setGeselecteerdeOpties((prev) => ({ ...prev, [optie.id]: keuze }))}
                          />
                          <span className="text-sm text-charcoal">{keuze.naam}</span>
                        </div>
                        {keuze.meerprijs > 0 && (
                          <span className="text-xs text-gray-warm">+{formatEuro(keuze.meerprijs)}</span>
                        )}
                      </label>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-border bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAantal(Math.max(1, aantal - 1))}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-charcoal transition-colors"
              >
                <Minus className="w-3.5 h-3.5 text-charcoal" />
              </button>
              <span className="w-6 text-center font-semibold text-charcoal">{aantal}</span>
              <button
                onClick={() => setAantal(aantal + 1)}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-charcoal transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-charcoal" />
              </button>
            </div>
            <p className="text-gray-warm text-sm">
              Totaal: <span className="font-bold text-charcoal">{formatEuro(totaalPrijs)}</span>
            </p>
          </div>
          <button
            onClick={handleToevoegen}
            disabled={!alleVerplichtGeselecteerd}
            className={`w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
              toegevoegd
                ? 'bg-emerald-500 text-white'
                : alleVerplichtGeselecteerd
                ? 'bg-accent text-white hover:bg-accent-dark'
                : 'bg-gray-light text-gray-warm cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {toegevoegd ? 'Toegevoegd!' : `Voeg toe — ${formatEuro(totaalPrijs)}`}
          </button>
        </div>
      </div>
    </div>
  )
}
