'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const tabs = [
{ href: '/', label: 'Discover' },
{ href: '/search', label: 'Search' },
{ href: '/create', label: 'Create' },
{ href: '/saved', label: 'Saved' },
];


export default function Nav() {
const pathname = usePathname();
return (
<nav className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-950/70 border-b border-gray-200 dark:border-gray-800">
<div className="container flex h-14 items-center justify-between">
<Link href="/" className="text-xl font-bold">Buzz</Link>
<div className="flex gap-2">
{tabs.map(t => (
<Link key={t.href} href={t.href} className={`btn ${pathname===t.href ? 'bg-gray-100 dark:bg-gray-900' : ''}`}>{t.label}</Link>
))}
</div>
</div>
</nav>
);
}