"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from './AuthProvider'
import LoginModal from './LoginModal'


const tabs = [
{ href: '/', label: 'Discover' },
{ href: '/search', label: 'Search' },
{ href: '/people', label: 'People' },
{ href: '/events', label: 'Events' },
]


export default function Nav(){
const pathname = usePathname();
const { user } = useAuth();
const [loginOpen,setLoginOpen] = useState(false);


return (
<nav className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-950/70 border-b border-gray-200 dark:border-gray-800">
<div className="container flex h-14 items-center justify-between">
<Link href="/" className="text-xl font-bold">Buzz</Link>
<div className="flex gap-2 items-center">
{tabs.map(t => (
<Link key={t.href} href={t.href} className={`btn ${pathname===t.href?'bg-gray-100 dark:bg-gray-900':''}`}>{t.label}</Link>
))}
{user ? (
<Link className="btn" href={`/u/${user.user_metadata?.handle || 'me'}`}>My profile</Link>
) : (
<button className="btn" onClick={()=>setLoginOpen(true)}>Sign in</button>
)}
</div>
</div>
<LoginModal open={loginOpen} onClose={()=>setLoginOpen(false)} />
</nav>
)
}