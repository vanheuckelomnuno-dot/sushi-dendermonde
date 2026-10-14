import Link from 'next/link'
import { MapPin, Phone, Mail, Share2 } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 inline-block bg-white/95 px-3 py-2 rounded-xl">
              <img src="/logo.png" alt="Sushi Dendermonde" className="h-10 w-auto object-contain" />
            </div>
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
                <span>Maandag</span>
                <span className="text-white/40">Gesloten</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Di – Zo</span>
                <span className="text-white/40">16:00 – 21:00</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                <span>Statieplein 34<br />9200 Dendermonde</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:+3252200677" className="hover:text-white transition-colors">
                  052 20 06 77
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
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white/60 transition-colors">Privacybeleid</Link>
            <Link href="#" className="hover:text-white/60 transition-colors">Algemene voorwaarden</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
