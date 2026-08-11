'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X, UtensilsCrossed } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/over-ons', label: 'Over ons' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const { aantalItems } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isTransparent = pathname === '/' && !scrolled && !menuOpen

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isTransparent
          ? 'bg-transparent'
          : 'bg-cream/95 backdrop-blur-md border-b border-border'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
              isTransparent ? 'bg-white/20' : 'bg-accent/10'
            )}>
              <UtensilsCrossed className={cn(
                'w-4 h-4 transition-colors',
                isTransparent ? 'text-white' : 'text-accent'
              )} />
            </div>
            <div>
              <span className={cn(
                'font-semibold text-lg tracking-tight leading-none transition-colors',
                isTransparent ? 'text-white' : 'text-charcoal'
              )}>
                Sushi
              </span>
              <span className={cn(
                'font-light text-lg leading-none ml-1.5 transition-colors',
                isTransparent ? 'text-white/80' : 'text-gray-warm'
              )}>
                Dendermonde
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors relative group',
                  isTransparent
                    ? 'text-white/90 hover:text-white'
                    : 'text-gray-warm hover:text-charcoal',
                  pathname === link.href && !isTransparent && 'text-charcoal'
                )}
              >
                {link.label}
                <span className={cn(
                  'absolute -bottom-1 left-0 right-0 h-px bg-accent transition-transform origin-left',
                  pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                )} />
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/reserveren"
              className={cn(
                'text-sm font-medium px-4 py-2 rounded-full border transition-all',
                isTransparent
                  ? 'border-white/40 text-white hover:bg-white/10'
                  : 'border-border text-charcoal hover:border-charcoal'
              )}
            >
              Reserveer tafel
            </Link>
            <Link
              href="/bestellen"
              className="text-sm font-medium px-5 py-2 bg-accent text-white rounded-full hover:bg-accent-dark transition-colors flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Bestel online
              {aantalItems > 0 && (
                <span className="bg-white text-accent text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {aantalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href="/bestellen"
              className="relative p-2 rounded-full"
              aria-label="Winkelmand"
            >
              <ShoppingBag className={cn(
                'w-5 h-5 transition-colors',
                isTransparent ? 'text-white' : 'text-charcoal'
              )} />
              {aantalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {aantalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn(
                'p-2 rounded-full transition-colors',
                isTransparent ? 'text-white' : 'text-charcoal'
              )}
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        'lg:hidden overflow-hidden transition-all duration-300 bg-cream border-b border-border',
        menuOpen ? 'max-h-96' : 'max-h-0'
      )}>
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'block px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'bg-accent/10 text-accent'
                  : 'text-gray-warm hover:bg-cream-dark hover:text-charcoal'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 space-y-2">
            <Link
              href="/reserveren"
              className="block w-full text-center px-4 py-3 border border-border rounded-xl text-sm font-medium text-charcoal hover:border-charcoal transition-colors"
            >
              Reserveer een tafel
            </Link>
            <Link
              href="/bestellen"
              className="block w-full text-center px-4 py-3 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent-dark transition-colors"
            >
              Bestel online
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
