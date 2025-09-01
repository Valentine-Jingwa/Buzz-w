'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';




export default function Create() {
const r = useRouter();
const [form,setForm] = useState({
title:'', date:'', city:'', venue:'', price:'', image:''
});
const onSubmit=(e:React.FormEvent)=>{
e.preventDefault();
// Demo: stash in localStorage so you can see it in /saved
const saved = JSON.parse(localStorage.getItem('buzz_saved')||'[]');
const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
saved.push({ id:Date.now().toString(), slug, ...form });
localStorage.setItem('buzz_saved', JSON.stringify(saved));
r.push('/saved');
};
return (
<form onSubmit={onSubmit} className="grid gap-3 max-w-xl">
<h1 className="text-2xl font-bold">Create an event</h1>
<input className="input" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required/>
<input className="input" type="datetime-local" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} required/>
<input className="input" placeholder="City" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} required/>
<input className="input" placeholder="Venue" value={form.venue} onChange={e=>setForm({...form,venue:e.target.value})} />
<input className="input" placeholder="Price (e.g. Free or $15)" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
<input className="input" placeholder="Image URL (optional)" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} />
<button className="btn bg-black text-white">Save (demo)</button>
</form>
);
}