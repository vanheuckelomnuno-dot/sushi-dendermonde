import { NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = await getAdminDb()
    const testRef = db.collection('_test').doc('verbinding')
    await testRef.set({ getest: true, tijdstip: new Date().toISOString() })
    const snap = await testRef.get()
    await testRef.delete()

    return NextResponse.json({
      status: 'ok',
      bericht: 'Firebase Firestore verbinding werkt',
      data: snap.data(),
    })
  } catch (err) {
    return NextResponse.json(
      { status: 'fout', bericht: String(err) },
      { status: 500 }
    )
  }
}
