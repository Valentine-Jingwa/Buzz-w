import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'


export async function POST(req: Request) {
const { handle } = await req.json()
// get current session user via Supabase client-side call isn't available here; in real apps use Service Role.
// For MVP, client already has user; we'll do a client call instead. This endpoint kept for future server logic.
return NextResponse.json({ ok: true, handle })
}