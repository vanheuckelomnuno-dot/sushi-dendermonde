import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataDir = process.env.DATA_DIR ?? path.join(process.cwd(), 'data')
const dataFile = path.join(dataDir, 'reservaties.json')

type Res = { id: string; status: string; [key: string]: unknown }

function lees(): Res[] {
  try {
    if (!fs.existsSync(dataFile)) return []
    return JSON.parse(fs.readFileSync(dataFile, 'utf-8'))
  } catch { return [] }
}

function schrijf(data: Res[]) {
  fs.mkdirSync(dataDir, { recursive: true })
  fs.writeFileSync(dataFile, JSON.stringify(data))
}

function checkPin(req: NextRequest) {
  const pin = process.env.BEHEER_PIN ?? 'Sushi2025!'
  return req.headers.get('x-pin') === pin
}

export async function GET(req: NextRequest) {
  if (!checkPin(req)) return NextResponse.json({ error: 'Verboden' }, { status: 403 })
  return NextResponse.json(lees())
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const lijst = lees()
  const entry: Res = {
    ...body,
    id: `R${Date.now()}`,
    tijdStempel: new Date().toISOString(),
    status: 'nieuw',
  }
  lijst.unshift(entry)
  schrijf(lijst.slice(0, 500))
  return NextResponse.json({ ok: true, id: entry.id })
}

export async function PATCH(req: NextRequest) {
  if (!checkPin(req)) return NextResponse.json({ error: 'Verboden' }, { status: 403 })
  const { id, status } = await req.json()
  schrijf(lees().map((r) => (r.id === id ? { ...r, status } : r)))
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  if (!checkPin(req)) return NextResponse.json({ error: 'Verboden' }, { status: 403 })
  const { id } = await req.json()
  schrijf(lees().filter((r) => r.id !== id))
  return NextResponse.json({ ok: true })
}
