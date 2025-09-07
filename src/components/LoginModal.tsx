"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';


export default function LoginModal({ open, onClose }:{ open:boolean; onClose:()=>void }){
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const [isSignup,setIsSignup] = useState(false);
const [error,setError] = useState<string|null>(null);


if(!open) return null;
const submit = async (e:React.FormEvent)=>{
e.preventDefault(); setError(null);
const fn = isSignup ? supabase.auth.signUp : supabase.auth.signInWithPassword;
const { error } = await fn({ email, password });
if (error) setError(error.message); else onClose();
};


return (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50" onClick={onClose}>
<div className="card w-full max-w-md bg-white dark:bg-gray-950" onClick={e=>e.stopPropagation()}>
<h3 className="text-xl font-semibold mb-2">{isSignup? 'Create account' : 'Sign in'}</h3>
<form onSubmit={submit} className="grid gap-3">
<input className="input" type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} required />
<input className="input" type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)} required />
{error && <p className="text-sm text-red-600">{error}</p>}
<button className="btn bg-black text-white">{isSignup? 'Create account' : 'Sign in'}</button>
</form>
<button className="btn mt-3" onClick={()=>setIsSignup(v=>!v)}>
{isSignup? 'Have an account? Sign in' : "New here? Create account"}
</button>
</div>
</div>
);
}