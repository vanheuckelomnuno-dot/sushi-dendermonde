'use client'

import { useState } from 'react'
import { ShoppingBag, X, Phone, Plus, Minus, Trash2 } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { formatEuro } from '@/lib/utils'

export function MobileCartButton() {
  const { cart, aantalItems, removeItem, updateAantal } = useCart()
  const [open, setOpen] = useState(false)

  if (aantalItems === 0 && !open) return null

  return (
    <>
      {/* Floating button */}
      {!open && aantalItems > 0 && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-4 z-40 flex items-center gap-3 bg-accent text-white px-5 py-3.5 rounded-full shadow-xl hover:bg-accent-dark transition-all active:scale-95"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="font-medium text-sm">{formatEuro(cart.subtotaal)}</span>
          {aantalItems > 0 && (
            <span className="bg-white text-accent text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
              {aantalItems}
            </span>
          )}
        </button>
      )}

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-charcoal/50" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-t-3xl max-h-[80vh] flex flex-col">
            <div className="px-5 py-4 flex items-center justify-between border-b border-border shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span className="font-semibold text-charcoal text-sm">
                  Bestelling ({aantalItems} items)
                </span>
              </div>
              <button onClick={() => setOpen(false)}>
                <X className="w-5 h-5 text-gray-warm" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 divide-y divide-border">
              {cart.items.map((item) => {
                const optiesMeerprijs = item.opties?.reduce((s, o) => s + o.meerprijs, 0) ?? 0
                const prijs = item.product.promoPercentage
                  ? item.product.prijs * (1 - item.product.promoPercentage / 100) + optiesMeerprijs
                  : item.product.prijs + optiesMeerprijs

                return (
                  <div key={item.itemId} className="px-5 py-4 flex gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-cream flex items-center justify-center">
                      {item.product.afbeelding
                        ? <img src={item.product.afbeelding} alt={item.product.naam} className="w-full h-full object-cover" />
                        : <ShoppingBag className="w-5 h-5 text-gray-warm" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-charcoal">{item.product.naam}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateAantal(item.itemId, item.aantal - 1)}
                            className="w-7 h-7 rounded-full border border-border flex items-center justify-center">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium">{item.aantal}</span>
                          <button onClick={() => updateAantal(item.itemId, item.aantal + 1)}
                            className="w-7 h-7 rounded-full border border-border flex items-center justify-center">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{formatEuro(prijs * item.aantal)}</span>
                          <button onClick={() => removeItem(item.itemId)} className="text-gray-warm">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="p-5 border-t border-border shrink-0 space-y-3">
              <div className="flex justify-between font-semibold text-charcoal">
                <span>Totaal</span><span>{formatEuro(cart.subtotaal)}</span>
              </div>
              <a
                href="tel:+3252200677"
                onClick={() => setOpen(false)}
                className="w-full py-3.5 bg-accent text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-accent-dark transition-colors"
              >
                <Phone className="w-4 h-4" />
                Bel ons: 052 20 06 77
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
