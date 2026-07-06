import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Trash2, Pencil, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  component: GalleryAdmin,
});

const MAX_IMAGE = 5 * 1024 * 1024;
const MAX_VIDEO = 50 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VIDEO_TYPES = ["video/mp4", "video/webm"];

type Item = {
  id: string;
  kind: "image" | "video";
  storage_path: string;
  public_url: string;
  title: string | null;
  alt_text: string | null;
  caption: string | null;
  sort_order: number;
  created_at: string;
};

async function listItems(): Promise<Item[]> {
  const { data, error } = await (supabase as any)
    .from("gallery_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

function GalleryAdmin() {
  const qc = useQueryClient();
  const { data: items = [], isLoading } = useQuery({ queryKey: ["gallery"], queryFn: listItems });
  const [editing, setEditing] = useState<Item | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    const isImage = IMAGE_TYPES.includes(file.type);
    const isVideo = VIDEO_TYPES.includes(file.type);
    if (!isImage && !isVideo) return toast.error("Only JPG/PNG/WebP images or MP4/WebM videos are allowed");
    if (isImage && file.size > MAX_IMAGE) return toast.error("Image is over 5 MB");
    if (isVideo && file.size > MAX_VIDEO) return toast.error("Video is over 50 MB");

    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || (isImage ? "jpg" : "mp4");
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const up = await supabase.storage.from("gallery").upload(path, file, { contentType: file.type });
      if (up.error) throw up.error;

      // Long-lived signed URL (1 year)
      const { data: signed, error: sErr } = await supabase.storage.from("gallery").createSignedUrl(path, 60 * 60 * 24 * 365);
      if (sErr) throw sErr;

      const { data: sess } = await supabase.auth.getUser();
      const { error: insErr } = await (supabase as any).from("gallery_items").insert({
        kind: isImage ? "image" : "video",
        storage_path: path,
        public_url: signed.signedUrl,
        title: file.name.replace(/\.[^.]+$/, ""),
        alt_text: "",
        caption: "",
        created_by: sess.user?.id,
      });
      if (insErr) throw insErr;
      toast.success("Uploaded");
      qc.invalidateQueries({ queryKey: ["gallery"] });
      qc.invalidateQueries({ queryKey: ["admin", "gallery_count"] });
      qc.invalidateQueries({ queryKey: ["public_gallery"] });
    } catch (e: any) {
      toast.error(e?.message ?? "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function remove(item: Item) {
    if (!confirm(`Delete "${item.title || "this item"}" permanently?`)) return;
    try {
      await supabase.storage.from("gallery").remove([item.storage_path]);
      const { error } = await (supabase as any).from("gallery_items").delete().eq("id", item.id);
      if (error) throw error;
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["gallery"] });
      qc.invalidateQueries({ queryKey: ["admin", "gallery_count"] });
      qc.invalidateQueries({ queryKey: ["public_gallery"] });
    } catch (e: any) {
      toast.error(e?.message ?? "Delete failed");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Images (JPG, PNG, WebP · ≤5 MB) or video (MP4, WebM · ≤50 MB).
        </p>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-sm bg-primary px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90">
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading…" : "Upload media"}
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
            className="hidden" disabled={uploading}
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        </label>
      </div>

      {isLoading ? (
        <div className="mt-10 text-sm text-muted-foreground">Loading…</div>
      ) : items.length === 0 ? (
        <div className="mt-10 rounded-sm border border-dashed border-border/60 p-14 text-center">
          <p className="font-serif text-2xl text-foreground">No media yet</p>
          <p className="mt-2 text-sm text-muted-foreground">Upload your first image or video to get started.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="group overflow-hidden rounded-sm border border-border/60 bg-card">
              <div className="aspect-[4/5] bg-muted">
                {item.kind === "image" ? (
                  <img src={item.public_url} alt={item.alt_text ?? item.title ?? ""} className="h-full w-full object-cover" />
                ) : (
                  <video src={item.public_url} controls className="h-full w-full object-cover" />
                )}
              </div>
              <div className="p-4">
                <p className="truncate font-serif text-lg text-foreground">{item.title || "Untitled"}</p>
                {item.caption && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.caption}</p>}
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {item.kind} · {new Date(item.created_at).toLocaleDateString()}
                </p>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => setEditing(item)}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-input px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] hover:bg-accent">
                    <Pencil className="h-3 w-3" /> Edit
                  </button>
                  <button onClick={() => remove(item)}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-destructive/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-3 w-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && <EditDialog item={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}

function EditDialog({ item, onClose }: { item: Item; onClose: () => void }) {
  const qc = useQueryClient();
  const [title, setTitle] = useState(item.title ?? "");
  const [alt, setAlt] = useState(item.alt_text ?? "");
  const [caption, setCaption] = useState(item.caption ?? "");
  const [sortOrder, setSortOrder] = useState(item.sort_order);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    try {
      const { error } = await (supabase as any).from("gallery_items")
        .update({ title, alt_text: alt, caption, sort_order: sortOrder })
        .eq("id", item.id);
      if (error) throw error;
      toast.success("Updated");
      qc.invalidateQueries({ queryKey: ["gallery"] });
      qc.invalidateQueries({ queryKey: ["public_gallery"] });
      onClose();
    } catch (e: any) {
      toast.error(e?.message ?? "Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-sm border border-border bg-card p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-foreground">Edit media</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Title</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)}
              className="rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none" />
          </label>
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Alt text (accessibility)</span>
            <input value={alt} onChange={(e) => setAlt(e.target.value)}
              className="rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none" />
          </label>
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Caption</span>
            <textarea rows={3} value={caption} onChange={(e) => setCaption(e.target.value)}
              className="rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none" />
          </label>
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Sort order (lower = first)</span>
            <input type="number" value={sortOrder} onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              className="w-32 rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none" />
          </label>
        </div>
        <div className="mt-8 flex gap-3">
          <button onClick={save} disabled={saving}
            className="rounded-sm bg-primary px-6 py-2.5 text-[11px] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
            {saving ? "Saving…" : "Save"}
          </button>
          <button onClick={onClose}
            className="rounded-sm border border-input px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] hover:bg-accent">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
