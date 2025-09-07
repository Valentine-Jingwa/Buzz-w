"use client";
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import LoginModal from '@/components/LoginModal';


export default function People(){
const [q,setQ] = useState('');
const [rows,setRows] = useState<any[]>([]);
const { user } = useAuth();
const r = useRouter();
const [loginGate,setLoginGate] = useState(false);


useEffect(()=>{ (async()=>{
if(!q) return setRows([]);
const { data } = await supabase
.from('profiles')
.select('id, handle, display_name, avatar_url')
.or(`handle.ilike.%${q}%,display_name.ilike.%${q}%`)
.limit(20);
setRows(data||[]);
})(); },[q]);


const openUser = (handle:string)=>{
if(!user){ setLoginGate(true); return; }
r.push(`/u/${handle}`);
};


return (
<div className="grid gap-4">
<h1 className="text-2xl font-bold">Search People</h1>
<input className="input" placeholder="Search by handle or name" value={q} onChange={e=>setQ(e.target.value)} />
<div className="grid gap-2">
{rows.map(u=> (
<button key={u.id} className="card flex items-center gap-3 text-left" onClick={()=>openUser(u.handle)}>
<img src={u.avatar_url || '/icon.png'} className="h-10 w-10 rounded-full object-cover" alt=""/>
<div>
<div className="font-medium">@{u.handle}</div>
<div className="text-sm text-gray-600 dark:text-gray-400">{u.display_name}</div>
</div>
</button>
))}
</div>


{/* Gate: show login modal if trying to interact while logged out */}
<LoginModal open={loginGate} onClose={()=>setLoginGate(false)} />
</div>
);
}