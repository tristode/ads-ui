import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export function signIn(redirectTo?: string) {
  supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });
}

export function useAuthSession(): Session | null {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return session;
}
