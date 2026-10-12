import Link from 'next/link'

export const metadata = {
  title: 'Over ons — Sushi Dendermonde',
  description: 'Ontdek het verhaal achter Sushi Dendermonde — passie voor Japanse keuken in het hart van Dendermonde.',
}

const waarden = [
  { titel: 'Versheid boven alles', tekst: 'Elke dag verse vis, direct van onze leveranciers. Geen compromissen.' },
  { titel: 'Traditionele technieken', tekst: 'Onze chefs zijn opgeleid in Japanse sushi-tradities met jarenlange ervaring.' },
  { titel: 'Lokale betrokkenheid', tekst: 'We werken graag samen met lokale producenten voor verse groenten en kruiden.' },
  { titel: 'Duurzaamheid', tekst: 'Bewuste keuzes voor vis en verpakkingen. Goed voor jou én de planeet.' },
]

export default function OverOnsPage() {
  return (
    <div className="min-h-screen bg-cream pt-20 lg:pt-24 pb-16">
      {/* Hero */}
      <div className="relative h-64 lg:h-80 overflow-hidden">
        <img
          src="/gerechten/boot-2p.jpg"
          alt="Sushi Dendermonde"
          className="w-full h-full object-cover brightness-40"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="text-accent text-xs font-medium uppercase tracking-widest mb-3">Ons verhaal</p>
          <h1 className="text-4xl lg:text-5xl font-light text-white">
            Over <span className="font-semibold">ons</span>
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Verhaal */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <p className="text-accent text-sm font-medium uppercase tracking-widest mb-4">Het begin</p>
            <h2 className="text-3xl font-light text-charcoal mb-6">
              Passie voor <span className="font-semibold">Japanse keuken</span>
            </h2>
            <p className="text-gray-warm leading-relaxed mb-4">
              Sushi Dendermonde ontstond vanuit een eenvoudige droom: de beste sushi van de regio brengen
              naar het hart van Dendermonde. Niet als franchise of fast food, maar als een plek waar kwaliteit
              en ambacht centraal staan.
            </p>
            <p className="text-gray-warm leading-relaxed mb-4">
              Onze chef, die zijn opleiding in Japan en later in Brussel volgde, brengt meer dan 8 jaar
              ervaring mee. Van de selectie van de vis tot het vormen van elk sushi-stuk — elke handeling
              wordt met zorg en precisie uitgevoerd.
            </p>
            <p className="text-gray-warm leading-relaxed">
              Bij ons komt sushi tot leven zoals het bedoeld is: eenvoudig, vers en eerlijk.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-[3/4]">
              <img
                src="/gerechten/pink-lady.jpg"
                alt="Pink lady roll"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-2xl overflow-hidden aspect-square">
                <img
                  src="/gerechten/nigiri-tonijn.jpg"
                  alt="Nigiri tonijn"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src="/gerechten/tokyo-roll.jpg"
                  alt="Tokyo roll"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20 p-8 bg-white rounded-2xl border border-border">
          {[
            { getal: '8+', label: 'Jaar ervaring' },
            { getal: '50+', label: 'Gerechten op het menu' },
            { getal: '★ 4.8', label: 'Gemiddelde beoordeling' },
            { getal: '100%', label: 'Dagvers bereid' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl lg:text-3xl font-semibold text-charcoal mb-1">{stat.getal}</p>
              <p className="text-xs text-gray-warm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Waarden */}
        <div className="mb-20">
          <p className="text-accent text-sm font-medium uppercase tracking-widest mb-3 text-center">Waar we voor staan</p>
          <h2 className="text-3xl font-light text-charcoal mb-10 text-center">
            Onze <span className="font-semibold">waarden</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {waarden.map((w) => (
              <div key={w.titel} className="p-6 bg-white rounded-2xl border border-border">
                <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <span className="text-accent text-sm">✦</span>
                </div>
                <h3 className="font-semibold text-charcoal mb-2">{w.titel}</h3>
                <p className="text-gray-warm text-sm leading-relaxed">{w.tekst}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-charcoal rounded-2xl p-10">
          <h2 className="text-2xl font-light text-white mb-3">
            Klaar om te <span className="font-semibold">proeven</span>?
          </h2>
          <p className="text-white/60 mb-6 text-sm">Bestel thuis of kom gezellig langs in ons restaurant.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/bestellen"
              className="inline-flex items-center justify-center px-8 py-3 bg-accent text-white rounded-full font-medium hover:bg-accent-dark transition-colors"
            >
              Bestel online
            </Link>
            <Link
              href="/reserveren"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              Reserveer een tafel
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
