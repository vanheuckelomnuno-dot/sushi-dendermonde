import type { Firestore } from 'firebase-admin/firestore'

let _db: Firestore | null = null

export async function getAdminDb(): Promise<Firestore> {
  if (_db) return _db

  const { getApps, initializeApp, cert } = await import('firebase-admin/app')
  const { getFirestore } = await import('firebase-admin/firestore')

  const app = getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      })

  _db = getFirestore(app)
  return _db
}
