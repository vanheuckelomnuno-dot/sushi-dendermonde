'use client'

import Link from 'next/link'
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { formatEuro } from '@/lib/utils'

export function CartSidebar() {
  const { cart, removeItem, updateAantal, aantalItems } = useCart()

  return (
    <div className="sticky top-24 flex flex-col bg-white rounded-2xl border border-border overflow-hidden max-h-[calc(100vh-7rem)]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-charcoal" />
          <h2 className="font-semibold text-charcoal text-sm">Jouw bestelling</h2>
        </div>
        {aantalItems > 0 && (
          <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
            {aantalItems} {aantalItems === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto">
        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-5 text-center">
            <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center mb-4">
              <ShoppingBag className="w-5 h-5 text-gray-warm" />
            </div>
            <p className="text-sm font-medium text-charcoal mb-1">Je bestelling is leeg</p>
            <p className="text-xs text-gray-warm">Voeg producten toe om te beginnen</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {cart.items.map((item) => {
              const optiesMeerprijs = item.opties?.reduce((s, o) => s + o.meerprijs, 0) ?? 0
              const effectiefPrijs = item.product.promoPercentage
                ? item.product.prijs * (1 - item.product.promoPercentage / 100) + optiesMeerprijs
                : item.product.prijs + optiesMeerprijs

              return (
                <div key={item.itemId} className="px-5 py-4">
                  <div className="flex gap-3">
                    {item.product.afbeelding ? (
                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                        <img
                          src={item.product.afbeelding}
                          alt={item.product.naam}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-cream shrink-0 flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-gray-warm" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-charcoal truncate">{item.product.naam}</p>
                      {item.opties && item.opties.length > 0 && (
                        <p className="text-xs text-gray-warm mt-0.5">
                          {item.opties.map((o) => o.keuzeNaam).join(', ')}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateAantal(item.itemId, item.aantal - 1)}
                            className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:border-charcoal transition-colors"
                          >
                            <Minus className="w-2.5 h-2.5 text-charcoal" />
                          </button>
                          <span className="text-sm font-medium text-charcoal w-5 text-center">{item.aantal}</span>
                          <button
                            onClick={() => updateAantal(item.itemId, item.aantal + 1)}
                            className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:border-charcoal transition-colors"
                          >
                            <Plus className="w-2.5 h-2.5 text-charcoal" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-charcoal">
                            {formatEuro(effectiefPrijs * item.aantal)}
                          </span>
                          <button
                            onClick={() => removeItem(item.itemId)}
                            className="text-gray-warm hover:text-red-500 transition-colors"
                            aria-label="Verwijder"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Summary */}
      {cart.items.length > 0 && (
        <div className="border-t border-border p-5 space-y-3 shrink-0">
          <div className="flex justify-between font-semibold text-charcoal">
            <span>Totaal</span>
            <span>{formatEuro(cart.subtotaal)}</span>
          </div>

          {cart.subtotaal < 15 ? (
            <div className="w-full py-3 bg-cream border border-border rounded-xl text-center">
              <p className="text-xs text-gray-warm font-medium">Minimum bestelbedrag: <span className="text-accent font-semibold">€15</span></p>
              <p className="text-[10px] text-gray-warm mt-0.5">Nog {formatEuro(15 - cart.subtotaal)} te gaan</p>
            </div>
          ) : (
            <Link
              href="/checkout"
              className="w-full py-3.5 bg-accent text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-accent-dark transition-colors"
            >
              Naar betaling
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
