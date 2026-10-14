import { NextRequest, NextResponse } from 'next/server'
import type { RowDataPacket } from 'mysql2'
import { getPool } from '@/lib/db'

// ── Rate limiting ──────────────────────────────────────────────────────────────
declare global {
  // eslint-disable-next-line no-var
  var _rateMap: Map<string, { count: number; reset: number }> | undefined
}
function getRateMap() {
  if (!global._rateMap) global._rateMap = new Map()
  return global._rateMap
}
function checkRateLimit(ip: string): boolean {
  const map   = getRateMap()
  const now   = Date.now()
  const entry = map.get(ip)
  if (!entry || now > entry.reset) {
    map.set(ip, { count: 1, reset: now + 60 * 60 * 1000 })
    return true
  }
  if (entry.count >= 5) return false
  entry.count++
  return true
}

// ── Admin PIN ──────────────────────────────────────────────────────────────────
function checkPin(req: NextRequest): boolean {
  const pin = process.env.BEHEER_PIN ?? 'Sushi2025!'
  return req.headers.get('x-pin') === pin
}

// ── Geldige tijdslots ──────────────────────────────────────────────────────────
const TIJDEN = new Set(['16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30'])
const STATUSSEN = new Set(['nieuw','bevestigd','aanwezig','afgerond','geannuleerd'])

// ── Input-validatie ────────────────────────────────────────────────────────────
function valideer(b: Record<string, unknown>): string | null {
  const naam = typeof b.naam === 'string' ? b.naam.trim() : ''
  if (naam.length < 2 || naam.length > 100)
    return 'Naam ontbreekt of is te lang (max 100 tekens)'

  const tel = typeof b.telefoon === 'string' ? b.telefoon.trim() : ''
  if (!/^[\d\s\-+]{9,20}$/.test(tel))
    return 'Ongeldig telefoonnummer'

  const email = typeof b.email === 'string' ? b.email.trim() : ''
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255)
    return 'Ongeldig e-mailadres'

  if (!b.datum || isNaN(new Date(b.datum as string).getTime()))
    return 'Ongeldige datum'

  if (!TIJDEN.has(b.tijdstip as string))
    return 'Ongeldig tijdstip'

  const p = Number(b.personen)
  if (!Number.isInteger(p) || p < 1 || p > 12)
    return 'Aantal personen moet tussen 1 en 12 liggen'

  const opm = typeof b.opmerking === 'string' ? b.opmerking : ''
  if (opm.length > 500)
    return 'Opmerking te lang (max 500 tekens)'

  return null
}

// ── MySQL-rij → admin-interface ────────────────────────────────────────────────
function mapRij(r: RowDataPacket) {
  const datum = r.datum instanceof Date
    ? r.datum.toISOString().slice(0, 10)
    : String(r.datum ?? '')
  const tijdStempel = r.aangemaakt_op instanceof Date
    ? r.aangemaakt_op.toISOString()
    : String(r.aangemaakt_op ?? '')
  return {
    id:                 String(r.id),
    reservatieNummer:   r.reservatie_nummer ?? '',
    naam:               r.naam,
    telefoon:           r.telefoon,
    email:              r.email,
    datum,
    tijdstip:           r.tijdstip,
    personen:           r.personen,
    opmerking:          r.opmerking ?? '',
    status:             r.status,
    tijdStempel,
  }
}

// ── GET — admin haalt alle reservaties op ─────────────────────────────────────
export async function GET(req: NextRequest) {
  if (!checkPin(req))
    return NextResponse.json({ error: 'Verboden' }, { status: 403 })

  try {
    const [rows] = await getPool().query<RowDataPacket[]>(
      'SELECT * FROM reservaties ORDER BY aangemaakt_op DESC LIMIT 500'
    )
    return NextResponse.json((rows).map(mapRij))
  } catch (e) {
    console.error('[GET /api/reservaties]', e)
    return NextResponse.json({ error: 'Databasefout' }, { status: 500 })
  }
}

// ── POST — klant maakt een reservatie ─────────────────────────────────────────
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

  const reservatieNummer = String(
    body.reservatieNummer ?? body.reservatie_nummer ?? `RES-${Date.now()}`
  ).slice(0, 30)
  const datum = new Date(body.datum as string).toISOString().slice(0, 10)

  try {
    await getPool().execute(
      `INSERT INTO reservaties
         (reservatie_nummer, naam, telefoon, email, datum, tijdstip, personen, opmerking)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        reservatieNummer,
        (body.naam as string).trim().slice(0, 100),
        (body.telefoon as string).trim().slice(0, 20),
        (body.email as string).trim().toLowerCase().slice(0, 255),
        datum,
        String(body.tijdstip),
        Number(body.personen),
        body.opmerking ? (body.opmerking as string).trim().slice(0, 500) : null,
      ] as (string | number | null)[]
    )
    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    // Dubbel reservatienummer (UNIQUE constraint)
    if ((e as NodeJS.ErrnoException & { code?: string }).code === 'ER_DUP_ENTRY')
      return NextResponse.json({ error: 'Dubbele reservatie' }, { status: 409 })
    console.error('[POST /api/reservaties]', e)
    return NextResponse.json({ error: 'Databasefout' }, { status: 500 })
  }
}

// ── PATCH — admin wijzigt status ──────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  if (!checkPin(req))
    return NextResponse.json({ error: 'Verboden' }, { status: 403 })

  let body: { id?: unknown; status?: unknown }
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Ongeldige aanvraag' }, { status: 400 }) }

  if (!body.id || !STATUSSEN.has(body.status as string))
    return NextResponse.json({ error: 'Ongeldige status of ID' }, { status: 400 })

  try {
    const statusVal = String(body.status)
    const idVal     = Number(body.id)
    await getPool().execute(
      'UPDATE reservaties SET status = ? WHERE id = ?',
      [statusVal, idVal]
    )
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[PATCH /api/reservaties]', e)
    return NextResponse.json({ error: 'Databasefout' }, { status: 500 })
  }
}

// ── DELETE — admin verwijdert een reservatie ──────────────────────────────────
export async function DELETE(req: NextRequest) {
  if (!checkPin(req))
    return NextResponse.json({ error: 'Verboden' }, { status: 403 })

  let body: { id?: unknown }
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Ongeldige aanvraag' }, { status: 400 }) }

  if (!body.id)
    return NextResponse.json({ error: 'ID ontbreekt' }, { status: 400 })

  try {
    const idVal = Number(body.id)
    await getPool().execute('DELETE FROM reservaties WHERE id = ?', [idVal])
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[DELETE /api/reservaties]', e)
    return NextResponse.json({ error: 'Databasefout' }, { status: 500 })
  }
}
