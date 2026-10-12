import Link from 'next/link'

export function CtaBanner() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/gerechten/rainbow.jpg"
          alt="Sushi"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/80" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <p className="text-accent text-sm font-medium uppercase tracking-widest mb-4">Klaar om te bestellen?</p>
        <h2 className="text-3xl lg:text-5xl font-light text-white mb-6">
          Verse sushi,<br />
          <span className="font-semibold">aan huis bezorgd</span>
        </h2>
        <p className="text-white/60 text-base mb-10 leading-relaxed">
          Bestel online en geniet van dezelfde kwaliteit als in het restaurant — thuis, op jouw moment.
          Gratis bezorging vanaf €30.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/bestellen"
            className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent-dark transition-all hover:scale-105"
          >
            Bestel online
          </Link>
          <Link
            href="/reserveren"
            className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all"
          >
            Reserveer een tafel
          </Link>
        </div>
      </div>
    </section>
  )
}
