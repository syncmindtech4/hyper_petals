import { ClerkProvider } from "@clerk/tanstack-react-start";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CartProvider } from "@/hooks/use-cart";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 font-serif text-5xl text-foreground">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for has wilted away.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3 text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-foreground">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Please refresh or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-sm bg-primary px-5 py-2.5 text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-sm border border-input bg-background px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Hyper Petals Decor — Premium Bouquets & Event Florals" },
      {
        name: "description",
        content:
          "Hyper Petals Decor crafts romantic, luxury bouquets and full-service event florals for weddings, celebrations, and everyday moments.",
      },
      { property: "og:title", content: "Hyper Petals Decor — Premium Bouquets & Event Florals" },
      {
        property: "og:description",
        content:
          "Hyper Petals Decor crafts romantic, luxury bouquets and full-service event florals for weddings, celebrations, and everyday moments.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Hyper Petals Decor" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Hyper Petals Decor — Premium Bouquets & Event Florals" },
      {
        name: "twitter:description",
        content:
          "Hyper Petals Decor crafts romantic, luxury bouquets and full-service event florals for weddings, celebrations, and everyday moments.",
      },
      { property: "og:image", content: "https://hyper-petals.vercel.app/og-image.png" },
      { name: "twitter:image", content: "https://hyper-petals.vercel.app/og-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ClerkProvider>{children}</ClerkProvider>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const loc = useLocation();
  const isAdminArea = loc.pathname.startsWith("/admin") || loc.pathname === "/auth";
  const isCheckout = loc.pathname === "/checkout";
  const hideHeaderFooter = isAdminArea || isCheckout;

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          {!hideHeaderFooter && <SiteHeader />}
          <main className="flex-1">
            <Outlet />
          </main>
          {!hideHeaderFooter && <SiteFooter />}
          {!hideHeaderFooter && <WhatsAppButton />}
          <Toaster position="top-right" richColors />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}
