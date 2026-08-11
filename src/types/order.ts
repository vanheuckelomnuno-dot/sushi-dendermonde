export type OrderStatus = 'nieuw' | 'bevestigd' | 'in_voorbereiding' | 'klaar' | 'afgerond' | 'geannuleerd'
export type BetaalStatus = 'open' | 'betaald' | 'mislukt' | 'terugbetaald'
export type BetaalMethode = 'bancontact' | 'kaart' | 'apple_pay' | 'google_pay' | 'cash'
export type BestelType = 'afhalen' | 'levering'

export interface OrderProduct {
  productId: string
  naam: string
  prijs: number
  aantal: number
  opties?: { optieNaam: string; keuzeNaam: string; meerprijs: number }[]
  subtotaal: number
}

export interface KlantGegevens {
  voornaam: string
  achternaam: string
  email: string
  telefoon: string
  adres?: string
  stad?: string
  postcode?: string
  opmerking?: string
}

export interface Order {
  id: string
  producten: OrderProduct[]
  klant: KlantGegevens
  subtotaal: number
  korting: number
  bezorgkosten: number
  totaal: number
  betaalMethode: BetaalMethode
  betaalStatus: BetaalStatus
  orderStatus: OrderStatus
  bestelType: BestelType
  aangemaakt: string
  bijgewerkt: string
  promoCode?: string
}
