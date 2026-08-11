import { Product } from './product'

export interface CartItem {
  product: Product
  aantal: number
  opties?: { optieId: string; keuzeId: string; optieNaam: string; keuzeNaam: string; meerprijs: number }[]
  itemId: string
}

export interface Cart {
  items: CartItem[]
  subtotaal: number
  korting: number
  bezorgkosten: number
  totaal: number
  promoCode?: string
}
