import { NextRequest, NextResponse } from 'next/server'
import type { RowDataPacket } from 'mysql2'
import { getPool } from '@/lib/db'

// ── Rate limiting: publieke POST (bestellingen) ───────────────────────────────
declare global {
  // eslint-disable-next-line no-var
  var _rateMapBest: Map<string, { count: number; reset: number }> | undefined
}
function getRateMap() {
  if (!global._rateMapBest) global._rateMapBest = new Map()
  return global._rateMapBest
}
function checkRateLimit(ip: string): boolean {
  const map   = getRateMap()
  const now   = Date.now()
  const entry = map.get(ip)
  if (!entry || now > entry.reset) {
    map.set(ip, { count: 1, reset: now + 60 * 60 * 1000 })
    return true
  }
  if (entry.count >= 10) return false
  entry.count++
  return true
}

// ── PIN-beveiliging (hergebruikt patroon van reservaties) ─────────────────────
declare global {
  // eslint-disable-next-line no-var
  var _pinFailMapBest: Map<string, { count: number; blockedUntil: number }> | undefined
}
function getPinFailMap() {
  if (!global._pinFailMapBest) global._pinFailMapBest = new Map()
  return global._pinFailMapBest
}

function checkPin(req: NextRequest): NextResponse | null {
  const pin = process.env.BEHEER_PIN
  if (!pin) {
    console.error('[BEVEILIGING] BEHEER_PIN is niet ingesteld.')
    return NextResponse.json({ error: 'Beheerpaneel niet beschikbaar' }, { status: 503 })
  }

  const ip    = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const map   = getPinFailMap()
  const now   = Date.now()
  const entry = map.get(ip)

  if (entry && now < entry.blockedUntil) {
    const resterend = Math.ceil((entry.blockedUntil - now) / 60_000)
    return NextResponse.json(
      { error: `Te veel pogingen. Probeer over ${resterend} minuten opnieuw.` },
      { status: 429 }
    )
  }

  const correct = req.headers.get('x-pin') === pin
  if (!correct) {
    const huidig = (!entry || now >= entry.blockedUntil) ? 1 : entry.count + 1
    map.set(ip, { count: huidig, blockedUntil: huidig >= 10 ? now + 15 * 60_000 : 0 })
    return NextResponse.json({ error: 'Verboden' }, { status: 403 })
  }

  map.delete(ip)
  return null
}

// ── Geldige statussen ─────────────────────────────────────────────────────────
const STATUSSEN = new Set(['nieuw', 'bevestigd', 'onderweg', 'afgeleverd', 'geannuleerd'])

// ── Input-validatie ────────────────────────────────────────────────────────────
function valideer(b: Record<string, unknown>): string | null {
  const naam = typeof b.naam === 'string' ? b.naam.trim() : ''
  if (naam.length < 2 || naam.length > 100)
    return 'Naam ontbreekt of is te lang (max 100 tekens)'

  const tel = typeof b.telefoon === 'string' ? b.telefoon.trim() : ''
  if (!/^[\d\s\-+]{9,20}$/.test(tel))
    return 'Ongeldig telefoonnummer'

  const email = typeof b.email === 'string' ? b.email.trim() : ''
  if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email) || email.length > 255)
    return 'Ongeldig e-mailadres'

  if (!Array.isArray(b.items) || b.items.length === 0)
    return 'Bestelling bevat geen items'

  const totaal = Number(b.totaal)
  if (isNaN(totaal) || totaal <= 0)
    return 'Ongeldig totaalbedrag'

  const opm = typeof b.opmerking === 'string' ? b.opmerking : ''
  if (opm.length > 500)
    return 'Opmerking te lang (max 500 tekens)'

  return null
}

// ── MySQL-rij → admin-interface ────────────────────────────────────────────────
function mapRij(r: RowDataPacket) {
  const tijdStempel = r.aangemaakt_op instanceof Date
    ? r.aangemaakt_op.toISOString()
    : String(r.aangemaakt_op ?? '')
  let items: unknown[]
  try {
    items = typeof r.items === 'string' ? JSON.parse(r.items) : (r.items ?? [])
  } catch {
    items = []
  }
  return {
    id:               String(r.id),
    bestellingNummer: r.bestelling_nummer ?? '',
    naam:             r.naam,
    telefoon:         r.telefoon,
    email:            r.email,
    items,
    totaal:           Number(r.totaal),
    opmerking:        r.opmerking ?? '',
    status:           r.status,
    tijdStempel,
  }
}

// ── GET — admin haalt alle bestellingen op ────────────────────────────────────
export async function GET(req: NextRequest) {
  const pinFout = checkPin(req)
  if (pinFout) return pinFout

  try {
    const [rows] = await getPool().query<RowDataPacket[]>(
      'SELECT * FROM bestellingen ORDER BY aangemaakt_op DESC LIMIT 500'
    )
    return NextResponse.json((rows as RowDataPacket[]).map(mapRij))
  } catch (e) {
    console.error('[GET /api/bestellingen]', e instanceof Error ? e.message : 'onbekende fout')
    return NextResponse.json({ error: 'Databasefout' }, { status: 500 })
  }
}

// ── POST — klant plaatst een bestelling ───────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip))
    return NextResponse.json(
      { error: 'Te veel aanvragen. Probeer over een uur opnieuw.' },
      { status: 429 }
    )

  let body: Record<string, unknown>
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Ongeldige aanvraag' }, { status: 400 }) }

  const fout = valideer(body)
  if (fout) return NextResponse.json({ error: fout }, { status: 400 })

  const bestellingNummer = String(
    body.bestellingNummer ?? `ORD-${Date.now()}`
  ).slice(0, 30)

  try {
    await getPool().execute(
      `INSERT INTO bestellingen
         (bestelling_nummer, naam, telefoon, email, items, totaal, opmerking)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        bestellingNummer,
        (body.naam as string).trim().slice(0, 100),
        (body.telefoon as string).trim().slice(0, 20),
        (body.email as string).trim().toLowerCase().slice(0, 255),
        JSON.stringify(body.items),
        Number(body.totaal),
        body.opmerking ? (body.opmerking as string).trim().slice(0, 500) : null,
      ] as (string | number | null)[]
    )
    return NextResponse.json({ ok: true, bestellingNummer })
  } catch (e: unknown) {
    if ((e as NodeJS.ErrnoException & { code?: string }).code === 'ER_DUP_ENTRY')
      return NextResponse.json({ error: 'Dubbele bestelling' }, { status: 409 })
    console.error('[POST /api/bestellingen]', e instanceof Error ? e.message : 'onbekende fout')
    return NextResponse.json({ error: 'Databasefout' }, { status: 500 })
  }
}

// ── PATCH — admin wijzigt status ──────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  const pinFout = checkPin(req)
  if (pinFout) return pinFout

  let body: { id?: unknown; status?: unknown }
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Ongeldige aanvraag' }, { status: 400 }) }

  if (!body.id || !STATUSSEN.has(body.status as string))
    return NextResponse.json({ error: 'Ongeldige status of ID' }, { status: 400 })

  try {
    await getPool().execute(
      'UPDATE bestellingen SET status = ? WHERE id = ?',
      [String(body.status), Number(body.id)]
    )
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[PATCH /api/bestellingen]', e instanceof Error ? e.message : 'onbekende fout')
    return NextResponse.json({ error: 'Databasefout' }, { status: 500 })
  }
}

// ── DELETE — admin verwijdert een bestelling ──────────────────────────────────
export async function DELETE(req: NextRequest) {
  const pinFout = checkPin(req)
  if (pinFout) return pinFout

  let body: { id?: unknown }
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Ongeldige aanvraag' }, { status: 400 }) }

  if (!body.id)
    return NextResponse.json({ error: 'ID ontbreekt' }, { status: 400 })

  try {
    await getPool().execute('DELETE FROM bestellingen WHERE id = ?', [Number(body.id)])
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[DELETE /api/bestellingen]', e instanceof Error ? e.message : 'onbekende fout')
    return NextResponse.json({ error: 'Databasefout' }, { status: 500 })
  }
}
