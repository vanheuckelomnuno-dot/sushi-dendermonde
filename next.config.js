/** @type {import('next').NextConfig} */

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "media-src 'none'",
  "object-src 'none'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join('; ')

const securityHeaders = [
  // Voorkom dat de site in een iframe geladen wordt (clickjacking)
  { key: 'X-Frame-Options', value: 'DENY' },
  // Voorkom MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Forceer HTTPS voor 2 jaar
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // Blokkeer XSS-aanvallen
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // Beperk referrer informatie
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Schakel onnodige browser-features uit
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()' },
  // Voorkom cross-origin lekken
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
  // Content Security Policy
  { key: 'Content-Security-Policy', value: csp },
]

const nextConfig = {
  output: 'standalone',
  serverExternalPackages: ['firebase-admin'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = nextConfig
