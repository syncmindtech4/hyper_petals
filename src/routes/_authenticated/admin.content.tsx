import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useHero, useContact, useServicesContent } from "@/hooks/useSiteContent";
import type { HeroContent, ContactContent, ServicesContent, ServiceItem } from "@/lib/content-defaults";

export const Route = createFileRoute("/_authenticated/admin/content")({
  component: ContentEditor,
});

type Tab = "hero" | "contact" | "services";

function ContentEditor() {
  const [tab, setTab] = useState<Tab>("hero");
  return (
    <div>
      <div className="flex gap-2 border-b border-border/40">
        {(["hero", "contact", "services"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 text-[11px] uppercase tracking-[0.22em] ${
              tab === t ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
            }`}>{t}</button>
        ))}
      </div>
      <div className="mt-8">
        {tab === "hero" && <HeroEditor />}
        {tab === "contact" && <ContactEditor />}
        {tab === "services" && <ServicesEditor />}
      </div>
    </div>
  );
}

async function saveKey(key: string, value: unknown) {
  const { data: sess } = await supabase.auth.getUser();
  const { error } = await (supabase as any)
    .from("site_content")
    .upsert({ key, value, updated_by: sess.user?.id, updated_at: new Date().toISOString() });
  if (error) throw error;
}

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)}
          className="rounded-sm border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)}
          className="rounded-sm border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none" />
      )}
    </label>
  );
}

function SaveBar({ onSave, saving }: { onSave: () => void; saving: boolean }) {
  return (
    <div className="mt-8">
      <button onClick={onSave} disabled={saving}
        className="rounded-sm bg-primary px-8 py-3 text-[11px] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
        {saving ? "Saving…" : "Save changes"}
      </button>
    </div>
  );
}

function HeroEditor() {
  const { data } = useHero();
  const qc = useQueryClient();
  const [form, setForm] = useState<HeroContent>(data);
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (data) setForm(data); }, [data]);

  async function save() {
    setSaving(true);
    try { await saveKey("hero", form); toast.success("Homepage hero updated"); qc.invalidateQueries({ queryKey: ["site_content", "hero"] }); }
    catch (e: any) { toast.error(e?.message ?? "Save failed"); }
    finally { setSaving(false); }
  }
  const upd = (k: keyof HeroContent) => (v: string) => setForm({ ...form, [k]: v });

  return (
    <div className="grid gap-5 max-w-2xl">
      <Field label="Eyebrow" value={form.eyebrow} onChange={upd("eyebrow")} />
      <div className="grid gap-5 md:grid-cols-3">
        <Field label="Title (lead)" value={form.titleLead} onChange={upd("titleLead")} />
        <Field label="Title (italic)" value={form.titleItalic} onChange={upd("titleItalic")} />
        <Field label="Title (tail)" value={form.titleTail ?? ""} onChange={upd("titleTail")} />
      </div>
      <Field label="Subtitle" value={form.subtitle} onChange={upd("subtitle")} textarea />
      <div className="grid gap-5 md:grid-cols-3">
        <Field label="Stat 1 label" value={form.stat1Label} onChange={upd("stat1Label")} />
        <Field label="Stat 2 label" value={form.stat2Label} onChange={upd("stat2Label")} />
        <Field label="Stat 3 label" value={form.stat3Label} onChange={upd("stat3Label")} />
        <Field label="Stat 1 value" value={form.stat1Value} onChange={upd("stat1Value")} />
        <Field label="Stat 2 value" value={form.stat2Value} onChange={upd("stat2Value")} />
        <Field label="Stat 3 value" value={form.stat3Value} onChange={upd("stat3Value")} />
      </div>
      <SaveBar onSave={save} saving={saving} />
    </div>
  );
}

function ContactEditor() {
  const { data } = useContact();
  const qc = useQueryClient();
  const [form, setForm] = useState<ContactContent>(data);
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (data) setForm(data); }, [data]);

  async function save() {
    setSaving(true);
    try {
      await saveKey("contact", form);
      toast.success("Contact info updated");
      qc.invalidateQueries({ queryKey: ["site_content", "contact"] });
    } catch (e: any) { toast.error(e?.message ?? "Save failed"); }
    finally { setSaving(false); }
  }
  const upd = (k: keyof ContactContent) => (v: string) => setForm({ ...form, [k]: v });

  return (
    <div className="grid gap-5 max-w-2xl">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Phone (display)" value={form.phone} onChange={upd("phone")} />
        <Field label="Phone (tel: link)" value={form.phoneHref} onChange={upd("phoneHref")} />
        <Field label="WhatsApp (digits only)" value={form.whatsapp} onChange={upd("whatsapp")} />
        <Field label="Email" value={form.email} onChange={upd("email")} />
        <Field label="Address" value={form.address} onChange={upd("address")} />
        <Field label="Hours" value={form.hours} onChange={upd("hours")} />
      </div>
      <Field label="Instagram URL" value={form.instagram} onChange={upd("instagram")} />
      <SaveBar onSave={save} saving={saving} />
    </div>
  );
}

function ServicesEditor() {
  const { data } = useServicesContent();
  const qc = useQueryClient();
  const [form, setForm] = useState<ServicesContent>(data);
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (data) setForm(data); }, [data]);

  async function save() {
    setSaving(true);
    try { await saveKey("services", form); toast.success("Services updated"); qc.invalidateQueries({ queryKey: ["site_content", "services"] }); }
    catch (e: any) { toast.error(e?.message ?? "Save failed"); }
    finally { setSaving(false); }
  }

  function updItem(i: number, patch: Partial<ServiceItem>) {
    const items = form.items.slice();
    items[i] = { ...items[i], ...patch };
    setForm({ ...form, items });
  }

  return (
    <div className="grid gap-8 max-w-3xl">
      <Field label="Page heading" value={form.heading} onChange={(v) => setForm({ ...form, heading: v })} />
      <Field label="Page subtitle" value={form.subtitle} onChange={(v) => setForm({ ...form, subtitle: v })} textarea />

      {form.items.map((item, i) => (
        <div key={i} className="rounded-sm border border-border/60 bg-card p-6">
          <p className="eyebrow">Service {i + 1}</p>
          <div className="mt-4 grid gap-4">
            <Field label="Title" value={item.title} onChange={(v) => updItem(i, { title: v })} />
            <Field label="Price" value={item.price} onChange={(v) => updItem(i, { price: v })} />
            <Field label="Body" value={item.body} onChange={(v) => updItem(i, { body: v })} textarea />
            <Field label="Includes (one per line)"
              value={item.includes.join("\n")}
              onChange={(v) => updItem(i, { includes: v.split("\n").map((s) => s.trim()).filter(Boolean) })}
              textarea />
          </div>
        </div>
      ))}
      <SaveBar onSave={save} saving={saving} />
    </div>
  );
}
