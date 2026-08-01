import { useQuery } from "@tanstack/react-query";
import {
  defaultHero,
  defaultContact,
  defaultServices,
  type HeroContent,
  type ContactContent,
  type ServicesContent,
} from "@/lib/content-defaults";
import {
  getHeroContent,
  getContactContent,
  getServicesContent,
  checkIsAdmin,
} from "@/lib/cms.functions";

export function useHero() {
  return useQuery({
    queryKey: ["site_content", "hero"],
    queryFn: () => getHeroContent(),
    initialData: defaultHero,
    staleTime: 60_000,
  });
}

export function useContact() {
  return useQuery({
    queryKey: ["site_content", "contact"],
    queryFn: () => getContactContent(),
    initialData: defaultContact,
    staleTime: 60_000,
  });
}

export function useServicesContent() {
  return useQuery({
    queryKey: ["site_content", "services"],
    queryFn: () => getServicesContent(),
    initialData: defaultServices,
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

export type { HeroContent, ContactContent, ServicesContent };
