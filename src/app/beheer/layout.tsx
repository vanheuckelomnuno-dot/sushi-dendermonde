import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
  title: 'Beheer',
}

export default function BeheerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
