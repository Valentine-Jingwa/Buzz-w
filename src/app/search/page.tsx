'use client';
import { useMemo, useState } from 'react';
import EventCard from '@/components/EventCard';
import { MOCK_EVENTS } from '@/lib/mock';


export default function Search() {
const [q,setQ] = useState('');
const results = useMemo(()=>MOCK_EVENTS.filter(e=>
e.title.toLowerCase().includes(q.toLowerCase()) ||
e.city.toLowerCase().includes(q.toLowerCase())
),[q]);
return (
<div className="grid gap-4">
<h1 className="text-2xl font-bold">Search</h1>
<input className="input" placeholder="Try 'Calgary' or 'music'" value={q} onChange={e=>setQ(e.target.value)} />
<div className="grid gap-4 md:grid-cols-2">
{results.map(e => <EventCard key={e.id} e={e} />)}
</div>
</div>
);
}