import Link from 'next/link';
import { EventItem } from '@/lib/mock';


export default function EventCard({ e }: { e: EventItem }) {
return (
<Link href={`/event/${e.slug}`} className="card grid grid-cols-3 gap-4 hover:shadow-md">
<img src={e.image || '/icon.png'} alt="" className="col-span-1 h-28 w-full object-cover rounded-xl"/>
<div className="col-span-2">
<h3 className="text-lg font-semibold">{e.title}</h3>
<p className="text-sm text-gray-600 dark:text-gray-400">{new Date(e.date).toLocaleString()} • {e.city}{e.venue?` • ${e.venue}`:''}</p>
<div className="mt-2 flex gap-2 text-xs">
{e.price && <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-900">{e.price}</span>}
{e.tags?.slice(0,2).map(t=> <span key={t} className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-900">{t}</span>)}
</div>
</div>
</Link>
);
}