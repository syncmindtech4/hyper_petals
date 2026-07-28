import { createFileRoute, Link } from "@tanstack/react-router";
import { SignIn } from "@clerk/tanstack-react-start";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Admin Sign In — Luxe Floral" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function AuthPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 py-16">
      <p className="eyebrow self-start">Admin</p>
      <h1 className="mt-3 self-start font-serif text-4xl text-foreground">
        Sign in
      </h1>
      <p className="mt-2 self-start text-sm text-muted-foreground">
        Access reserved for site administrators.
      </p>
      <div className="mt-8 w-full flex justify-center">
        <SignIn routing="hash" fallbackRedirectUrl="/admin" signUpFallbackRedirectUrl="/admin" />
      </div>
      <Link to="/" className="mt-6 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-primary">
        ← Back to site
      </Link>
    </section>
  );
}
