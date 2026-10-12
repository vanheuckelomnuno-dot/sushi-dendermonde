export type ProductLabel = 'populair' | 'nieuw' | 'promo' | 'bestseller'

export type Allergen =
  | 'gluten'
  | 'schaaldieren'
  | 'eieren'
  | 'vis'
  | 'pinda'
  | 'soja'
  | 'melk'
  | 'noten'
  | 'sesam'

export interface Product {
  id: string
  naam: string
  beschrijving: string
  prijs: number
  afbeelding?: string
  categorie: string
  ingredienten: string[]
  allergenen: Allergen[]
  beschikbaar: boolean
  labels: ProductLabel[]
  promoPercentage?: number
  opties?: ProductOptie[]
  stuks?: number
}

export interface ProductOptie {
  id: string
  naam: string
  keuzes: ProductKeuze[]
  verplicht: boolean
}

export interface ProductKeuze {
  id: string
  naam: string
  meerprijs: number
}

export interface Categorie {
  id: string
  naam: string
  beschrijving: string
  afbeelding: string
  volgorde: number
  beschikbaar: boolean
}
