import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("Account created. You can sign in now.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
        navigate({ to: "/admin" });
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <p className="eyebrow">Admin</p>
      <h1 className="mt-3 font-serif text-4xl text-foreground">
        {mode === "signin" ? "Sign in" : "Create account"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Access reserved for site administrators.
      </p>
      <form onSubmit={onSubmit} className="mt-8 grid gap-5">
        <label className="grid gap-2">
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Email</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="rounded-sm border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none" />
        </label>
        <label className="grid gap-2">
          <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Password</span>
          <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
            className="rounded-sm border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none" />
        </label>
        <button type="submit" disabled={loading}
          className="mt-2 rounded-sm bg-primary px-8 py-3.5 text-[11px] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
          {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>
      <button
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        className="mt-6 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-primary"
      >
        {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
      </button>
      <Link to="/" className="mt-4 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-primary">
        ← Back to site
      </Link>
    </section>
  );
}
