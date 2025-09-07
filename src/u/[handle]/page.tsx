import { supabase } from '@/lib/supabase'


export default async function Profile({ params:{ handle } }:{ params:{ handle:string } }){
const { data } = await supabase.from('profiles').select('*').eq('handle', handle).single();
if(!data) return <div className="card">User not found</div>
return (
<div className="grid gap-4">
<div className="flex items-center gap-3">
<img src={data.avatar_url || '/icon.png'} className="h-16 w-16 rounded-full" alt=""/>
<div>
<h1 className="text-2xl font-bold">@{data.handle}</h1>
<p className="text-gray-600 dark:text-gray-400">{data.display_name}</p>
</div>
</div>
<p className="card whitespace-pre-wrap">{data.bio || 'No bio yet.'}</p>
</div>
)
}