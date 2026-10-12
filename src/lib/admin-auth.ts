const SECRET = process.env.ADMIN_SESSION_SECRET ?? 'sushi-dendermonde-2025-fallback-secret-key-change-in-prod'
const SESSION_HOURS = 8

async function getKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  )
}

export async function createSessionToken(): Promise<string> {
  const exp = Date.now() + SESSION_HOURS * 60 * 60 * 1000
  const payload = String(exp)
  const key = await getKey()
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  const sigHex = Buffer.from(sig).toString('hex')
  return `${payload}.${sigHex}`
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const dot = token.lastIndexOf('.')
    if (dot === -1) return false
    const payload = token.slice(0, dot)
    const sigHex = token.slice(dot + 1)

    const exp = Number(payload)
    if (isNaN(exp) || exp < Date.now()) return false

    const key = await getKey()
    const expected = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
    const expectedHex = Buffer.from(expected).toString('hex')

    // Constant-time string comparison
    if (sigHex.length !== expectedHex.length) return false
    let diff = 0
    for (let i = 0; i < sigHex.length; i++) {
      diff |= sigHex.charCodeAt(i) ^ expectedHex.charCodeAt(i)
    }
    return diff === 0
  } catch {
    return false
  }
}
