import { MOCK_EVENTS } from '@/lib/mock';
import Link from 'next/link';


type Props = { params: { slug: string } };


export default function EventDetail({ params }: Props) {
const e = MOCK_EVENTS.find(x=>x.slug===params.slug);
if(!e) return <div className="card">Event not found.</div>;
return (
<article className="grid gap-4">
<img src={e.image || '/icon.png'} alt="" className="w-full h-64 object-cover rounded-2xl"/>
<h1 className="text-3xl font-bold">{e.title}</h1>
<p className="text-gray-600 dark:text-gray-400">{new Date(e.date).toLocaleString()} • {e.city}{e.venue?` • ${e.venue}`:''}</p>
<div className="flex gap-2">
<button className="btn" onClick={()=>alert('RSVP saved (demo).')}>RSVP</button>
<button className="btn" onClick={()=>alert('Saved (demo).')}>Save</button>
<Link className="btn" href="/create">Duplicate</Link>
</div>
</article>
);
}