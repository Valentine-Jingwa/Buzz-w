import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/AuthProvider'
import Nav from '@/components/Nav'


export const metadata: Metadata = { title: 'Buzz', description: 'Find events & people' }


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en"><body>
<AuthProvider>
<Nav />
<main className="container py-6">{children}</main>
</AuthProvider>
</body></html>
)
}