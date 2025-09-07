"use client";
import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";


export default function LoginPage() {
const r = useRouter();
const [mode, setMode] = useState<'signin' | 'signup'>('signin');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState<string|null>(null);


const submit = async (e: FormEvent) => {
e.preventDefault(); setError(null);
const fn = mode === 'signin' ? supabase.auth.signInWithPassword : supabase.auth.signUp;
const { data, error } = await fn({ email, password });
if (error) return setError(error.message);


// On signup, create profile row if first time
if (mode === 'signup' && data.user) {
const handle = email.split('@')[0].replace(/[^a-z0-9_]/gi, '').toLowerCase();
await fetch('/api/profile/init', { method: 'POST', body: JSON.stringify({ handle }) });
}
r.replace('/');
};


return (
<div className="max-w-md mx-auto grid gap-4">
<h1 className="text-2xl font-bold">{mode === 'signin' ? 'Sign in' : 'Create account'}</h1>
<div className="flex gap-2">
<button className={`btn ${mode==='signin'?'bg-gray-100 dark:bg-gray-900':''}`} onClick={()=>setMode('signin')}>Sign in</button>
<button className={`btn ${mode==='signup'?'bg-gray-100 dark:bg-gray-900':''}`} onClick={()=>setMode('signup')}>Create account</button>
</div>
<form onSubmit={submit} className="grid gap-3">
<input className="input" type="email" placeholder="you@email.com" value={email} onChange={e=>setEmail(e.target.value)} required />
<input className="input" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} required />
{error && <p className="text-sm text-red-600">{error}</p>}
<button className="btn bg-black text-white">{mode==='signin'?'Sign in':'Create account'}</button>
</form>
<p className="text-xs text-gray-500">You can switch to magic links later; passwords are simple for mobile keyboards.</p>
</div>
);
}