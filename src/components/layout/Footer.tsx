import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Share2, UtensilsCrossed } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-accent" />
              </div>
              <div>
                <span className="font-semibold text-white text-lg leading-none">Sushi</span>
                <span className="font-light text-white/60 text-lg leading-none ml-1.5">Dendermonde</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/50 mb-6">
              Vers, authentiek en met passie bereid. Elke dag de beste sushi van Dendermonde.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent/20 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent/20 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Navigatie</h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/menu', label: 'Ons menu' },
                { href: '/bestellen', label: 'Online bestellen' },
                { href: '/reserveren', label: 'Tafel reserveren' },
                { href: '/over-ons', label: 'Over ons' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Openingstijden */}
          <div>
            <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Openingstijden</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between gap-4">
                <span>Ma–Do</span>
                <span className="text-white/40">11:30 – 21:30</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Vrijdag</span>
                <span className="text-white/40">11:30 – 22:30</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Zaterdag</span>
                <span className="text-white/40">12:00 – 22:30</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Zondag</span>
                <span className="text-white/40">12:00 – 21:00</span>
              </li>
              <li className="pt-2 text-accent text-xs flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Keuken sluit 30 min eerder</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span>Grote Markt 42<br />9200 Dendermonde</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:+3252123456" className="hover:text-white transition-colors">
                  +32 52 12 34 56
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href="mailto:info@sushidendermonde.be" className="hover:text-white transition-colors">
                  info@sushidendermonde.be
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Sushi Dendermonde. Alle rechten voorbehouden.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white/60 transition-colors">Privacybeleid</Link>
            <Link href="#" className="hover:text-white/60 transition-colors">Algemene voorwaarden</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
