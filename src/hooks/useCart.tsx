'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { CartItem, Cart } from '@/types/cart'
import { Product } from '@/types/product'

interface CartState extends Cart {}

type CartAction =
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; itemId: string }
  | { type: 'UPDATE_AANTAL'; itemId: string; aantal: number }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_PROMO'; code: string; korting: number }

function berekenTotalen(items: CartItem[], korting: number) {
  const subtotaal = items.reduce((acc, item) => {
    const optiesMeerprijs = item.opties?.reduce((sum, o) => sum + o.meerprijs, 0) ?? 0
    return acc + (item.product.prijs + optiesMeerprijs) * item.aantal
  }, 0)

  const bezorgkosten = 0
  const totaal = Math.max(0, subtotaal - korting)

  return { subtotaal, bezorgkosten, totaal }
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const bestaand = state.items.find((i) => i.itemId === action.item.itemId)
      const nieuwItems = bestaand
        ? state.items.map((i) =>
            i.itemId === action.item.itemId ? { ...i, aantal: i.aantal + action.item.aantal } : i
          )
        : [...state.items, action.item]
      const totalen = berekenTotalen(nieuwItems, state.korting)
      return { ...state, items: nieuwItems, ...totalen }
    }
    case 'REMOVE_ITEM': {
      const nieuwItems = state.items.filter((i) => i.itemId !== action.itemId)
      const totalen = berekenTotalen(nieuwItems, state.korting)
      return { ...state, items: nieuwItems, ...totalen }
    }
    case 'UPDATE_AANTAL': {
      const nieuwItems =
        action.aantal <= 0
          ? state.items.filter((i) => i.itemId !== action.itemId)
          : state.items.map((i) => (i.itemId === action.itemId ? { ...i, aantal: action.aantal } : i))
      const totalen = berekenTotalen(nieuwItems, state.korting)
      return { ...state, items: nieuwItems, ...totalen }
    }
    case 'CLEAR_CART':
      return initialState
    case 'SET_PROMO': {
      const totalen = berekenTotalen(state.items, action.korting)
      return { ...state, promoCode: action.code, korting: action.korting, ...totalen }
    }
    default:
      return state
  }
}

const initialState: CartState = {
  items: [],
  subtotaal: 0,
  korting: 0,
  bezorgkosten: 0,
  totaal: 0,
}

interface CartContextType {
  cart: CartState
  addItem: (product: Product, aantal?: number, opties?: CartItem['opties']) => void
  removeItem: (itemId: string) => void
  updateAantal: (itemId: string, aantal: number) => void
  clearCart: () => void
  setPromo: (code: string, korting: number) => void
  aantalItems: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState, () => {
    if (typeof window === 'undefined') return initialState
    try {
      const opgeslagen = localStorage.getItem('sushi-cart')
      return opgeslagen ? JSON.parse(opgeslagen) : initialState
    } catch {
      return initialState
    }
  })

  useEffect(() => {
    localStorage.setItem('sushi-cart', JSON.stringify(cart))
  }, [cart])

  function addItem(product: Product, aantal = 1, opties?: CartItem['opties']) {
    const optieString = opties?.map((o) => o.keuzeId).join('-') ?? ''
    const itemId = `${product.id}-${optieString}`
    dispatch({ type: 'ADD_ITEM', item: { product, aantal, opties, itemId } })
  }

  function removeItem(itemId: string) {
    dispatch({ type: 'REMOVE_ITEM', itemId })
  }

  function updateAantal(itemId: string, aantal: number) {
    dispatch({ type: 'UPDATE_AANTAL', itemId, aantal })
  }

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' })
  }

  function setPromo(code: string, korting: number) {
    dispatch({ type: 'SET_PROMO', code, korting })
  }

  const aantalItems = cart.items.reduce((acc, i) => acc + i.aantal, 0)

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateAantal, clearCart, setPromo, aantalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart moet binnen CartProvider gebruikt worden')
  return context
}
