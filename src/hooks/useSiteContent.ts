import { useQuery } from "@tanstack/react-query";
import {
  defaultHero,
  defaultContact,
  type HeroContent,
  type ContactContent,
} from "@/lib/content-defaults";
import { getHeroContent, getContactContent, checkIsAdmin } from "@/lib/cms.functions";

// initialDataUpdatedAt: 0 marks each hook's initialData as already-stale
// (epoch time), so React Query still fetches real content on mount instead
// of trusting the bundled default as fresh for the full staleTime window —
// same fix as useProducts(). Without this, an admin's edited hero/contact
// content can be masked by the fallback for up to 60s per session.

export function useHero() {
  return useQuery({
    queryKey: ["site_content", "hero"],
    queryFn: () => getHeroContent(),
    initialData: defaultHero,
    initialDataUpdatedAt: 0,
    staleTime: 60_000,
  });
}

export function useContact() {
  return useQuery({
    queryKey: ["site_content", "contact"],
    queryFn: () => getContactContent(),
    initialData: defaultContact,
    initialDataUpdatedAt: 0,
    staleTime: 60_000,
  });
}

export function useIsAdmin() {
  return useQuery({
    queryKey: ["is_admin"],
    queryFn: () => checkIsAdmin(),
    staleTime: 30_000,
  });
}

export type { HeroContent, ContactContent };
