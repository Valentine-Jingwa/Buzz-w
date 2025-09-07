import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !/^https?:\/\//.test(url)) {
  throw new Error(
    `Supabase URL is missing/invalid. Check .env.local -> NEXT_PUBLIC_SUPABASE_URL (got: "${url ?? 'undefined'}")`
  )
}
if (!anon) {
  throw new Error(`Supabase anon key missing. Check .env.local -> NEXT_PUBLIC_SUPABASE_ANON_KEY`)
}

export const supabase = createClient(url, anon, {
  auth: { persistSession: true, autoRefreshToken: true },
})
