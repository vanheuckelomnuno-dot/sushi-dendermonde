import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createSessionToken } from '@/lib/admin-auth'

// Module-level rate limit store (resets on server restart — fine for this use case)
const attempts = new Map<string, { count: number; since: number }>()

const MAX_ATTEMPTS = 5
const LOCKOUT_MS = 15 * 60 * 1000

// Store credential hashes — plaintext never compared directly
const CORRECT_USER_HASH = crypto.createHash('sha256').update('sushi').digest()
const CORRECT_PASS_HASH = crypto.createHash('sha256').update('Sushi2025!').digest()

function getIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
}

function timingSafeHashEqual(a: Buffer, b: Buffer): boolean {
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

export async function POST(req: NextRequest) {
  const ip = getIp(req)
  const now = Date.now()

  // Rate limit check
  const entry = attempts.get(ip)
  if (entry) {
    if (now - entry.since < LOCKOUT_MS && entry.count >= MAX_ATTEMPTS) {
      const minutesLeft = Math.ceil((LOCKOUT_MS - (now - entry.since)) / 60000)
      return NextResponse.json(
        { error: `Te veel pogingen. Probeer opnieuw over ${minutesLeft} min.` },
        { status: 429 },
      )
    }
    if (now - entry.since >= LOCKOUT_MS) {
      attempts.delete(ip)
    }
  }

  let body: { gebruikersnaam?: string; wachtwoord?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ongeldig verzoek.' }, { status: 400 })
  }

  const inputUserHash = crypto.createHash('sha256').update(body.gebruikersnaam ?? '').digest()
  const inputPassHash = crypto.createHash('sha256').update(body.wachtwoord ?? '').digest()

  const valid =
    timingSafeHashEqual(inputUserHash, CORRECT_USER_HASH) &&
    timingSafeHashEqual(inputPassHash, CORRECT_PASS_HASH)

  if (!valid) {
    const cur = attempts.get(ip) ?? { count: 0, since: now }
    cur.count++
    attempts.set(ip, cur)
    const left = Math.max(0, MAX_ATTEMPTS - cur.count)
    return NextResponse.json(
      { error: left > 0 ? `Onjuiste gegevens. Nog ${left} poging${left === 1 ? '' : 'en'}.` : 'Account tijdelijk vergrendeld.' },
      { status: 401 },
    )
  }

  attempts.delete(ip)

  const token = await createSessionToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 8 * 60 * 60,
    path: '/',
  })
  return res
}
