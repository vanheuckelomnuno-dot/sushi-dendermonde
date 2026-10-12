import { Leaf, Clock, Star, MapPin } from 'lucide-react'

const features = [
  {
    icon: Leaf,
    titel: 'Dagvers',
    tekst: 'Elke dag verse vis en ingrediënten',
  },
  {
    icon: Star,
    titel: 'Premium kwaliteit',
    tekst: 'Sashimi-grade producten van de beste leveranciers',
  },
  {
    icon: Clock,
    titel: 'Klaar in 20 min',
    tekst: 'Bestellen & afhalen op het restaurant',
  },
  {
    icon: MapPin,
    titel: 'Dendermonde',
    tekst: 'Centraal gelegen, makkelijk bereikbaar',
  },
]

export function FeatureStrip() {
  return (
    <section className="relative py-10 overflow-hidden">
      <img
        src="/gerechten/dynamite-roll.jpg"
        alt="Sushi achtergrond"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-charcoal/80" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.titel} className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-white text-sm mb-0.5">{f.titel}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{f.tekst}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
