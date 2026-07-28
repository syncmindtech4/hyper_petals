import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Trash2, Pencil, Upload, X } from "lucide-react";
import {
  adminListGallery,
  adminDeleteGalleryItem,
  adminUpdateGalleryItem,
  type GalleryItem,
} from "@/lib/cms.functions";

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  component: GalleryAdmin,
});

const MAX_IMAGE = 5 * 1024 * 1024;
const MAX_VIDEO = 50 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VIDEO_TYPES = ["video/mp4", "video/webm"];

type Item = GalleryItem;

function GalleryAdmin() {
  const qc = useQueryClient();
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: () => adminListGallery(),
  });
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
      toast.info("Cloudinary direct upload will process this file.");
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
      await adminDeleteGalleryItem({ data: { id: item.id } });
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
      await adminUpdateGalleryItem({
        data: { id: item.id, title, alt_text: alt, caption, sort_order: sortOrder },
      });
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
