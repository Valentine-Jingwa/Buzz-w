"use client";
import { supabase } from "@/lib/supabase";
import { createContext, useContext, useEffect, useState } from "react";


type Ctx = { user: any | null; loading: boolean };
const AuthCtx = createContext<Ctx>({ user: null, loading: true });


export function AuthProvider({ children }: { children: React.ReactNode }) {
const [user, setUser] = useState<any | null>(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
let mounted = true;
supabase.auth.getUser().then(({ data }) => {
if (!mounted) return; setUser(data.user ?? null); setLoading(false);
});
const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
setUser(session?.user ?? null);
});
return () => { mounted = false; sub.subscription.unsubscribe(); };
}, []);


return <AuthCtx.Provider value={{ user, loading }}>{children}</AuthCtx.Provider>;
}


export const useAuth = () => useContext(AuthCtx);