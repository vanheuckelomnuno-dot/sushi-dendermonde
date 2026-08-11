export type PromoType = 'percentage' | 'vast_bedrag' | 'gratis_product' | 'combinatie'

export interface Promotie {
  id: string
  naam: string
  beschrijving: string
  type: PromoType
  waarde: number
  code?: string
  actief: boolean
  vanDatum?: string
  totDatum?: string
  minBedrag?: number
  productIds?: string[]
  categorieIds?: string[]
  afbeelding?: string
  label: string
  kleur: string
}
