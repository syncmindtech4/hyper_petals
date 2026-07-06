import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  defaultHero, defaultContact, defaultServices,
  type HeroContent, type ContactContent, type ServicesContent,
} from "@/lib/content-defaults";

async function fetchKey<T>(key: string, fallback: T): Promise<T> {
  const { data, error } = await (supabase as any)
    .from("site_content")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  if (error || !data) return fallback;
  return { ...fallback, ...(data.value as any) } as T;
}

export function useHero() {
  return useQuery({
    queryKey: ["site_content", "hero"],
    queryFn: () => fetchKey<HeroContent>("hero", defaultHero),
    initialData: defaultHero,
    staleTime: 60_000,
  });
}

export function useContact() {
  return useQuery({
    queryKey: ["site_content", "contact"],
    queryFn: () => fetchKey<ContactContent>("contact", defaultContact),
    initialData: defaultContact,
    staleTime: 60_000,
  });
}

export function useServicesContent() {
  return useQuery({
    queryKey: ["site_content", "services"],
    queryFn: () => fetchKey<ServicesContent>("services", defaultServices),
    initialData: defaultServices,
    staleTime: 60_000,
  });
}

export function useIsAdmin() {
  return useQuery({
    queryKey: ["is_admin"],
    queryFn: async () => {
      const { data: sess } = await supabase.auth.getUser();
      if (!sess.user) return false;
      const { data } = await (supabase as any)
        .from("user_roles")
        .select("role")
        .eq("user_id", sess.user.id)
        .eq("role", "admin")
        .maybeSingle();
      return !!data;
    },
    staleTime: 30_000,
  });
}
