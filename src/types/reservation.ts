export type ReservatieStatus = 'in_behandeling' | 'bevestigd' | 'geannuleerd'

export interface Reservatie {
  id: string
  datum: string
  tijd: string
  aantalPersonen: number
  klant: {
    voornaam: string
    achternaam: string
    email: string
    telefoon: string
    opmerking?: string
  }
  status: ReservatieStatus
  aangemaakt: string
  reservatieNummer: string
}
