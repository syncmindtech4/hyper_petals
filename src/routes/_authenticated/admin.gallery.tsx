import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Trash2, Pencil, Upload, X, ChevronDown, ChevronUp } from "lucide-react";
import {
  adminListGallery,
  adminDeleteGalleryItem,
  adminUpdateGalleryItem,
  adminUploadGalleryMedia,
  type GalleryItem,
} from "@/lib/cms.functions";
import { MediaUploader } from "@/components/media-uploader";
import { OCCASION_SLUGS, OCCASION_LABELS, type OccasionSlug } from "@/lib/occasions";

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  component: GalleryAdmin,
});

type Item = GalleryItem;
const UNSORTED = "unsorted";

function GalleryAdmin() {
  const qc = useQueryClient();
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: () => adminListGallery(),
  });
  const [editing, setEditing] = useState<Item | null>(null);
  const [showUploader, setShowUploader] = useState(true);
  // Occasion applied to every file in the CURRENT upload batch — a simple
  // batch-level tag rather than a per-file field, since in practice you
  // upload a set of photos from one event/shoot at a time.
  const [uploadOccasion, setUploadOccasion] = useState<OccasionSlug | "">("");
  const [filterOccasion, setFilterOccasion] = useState<OccasionSlug | typeof UNSORTED | "all">(
    "all",
  );

  const filteredItems = useMemo(() => {
    if (filterOccasion === "all") return items;
    if (filterOccasion === UNSORTED) return items.filter((i) => !i.occasion);
    return items.filter((i) => i.occasion === filterOccasion);
  }, [items, filterOccasion]);

  const handleUploadSingleFile = async (
    file: File,
    meta: { title: string; altText: string; caption: string },
    onProgress: (percent: number) => void,
  ) => {
    onProgress(30);
    const formData = new FormData();
    formData.append("file", file);
    if (meta.title) formData.append("title", meta.title);
    if (meta.altText) formData.append("alt_text", meta.altText);
    if (meta.caption) formData.append("caption", meta.caption);
    if (uploadOccasion) formData.append("occasion", uploadOccasion);

    onProgress(60);
    const result = await adminUploadGalleryMedia({ data: formData });
    onProgress(100);

    qc.invalidateQueries({ queryKey: ["gallery"] });
    qc.invalidateQueries({ queryKey: ["admin", "gallery_count"] });
    qc.invalidateQueries({ queryKey: ["public_gallery"] });
    return result;
  };

  const handleAllCompleted = () => {
    qc.invalidateQueries({ queryKey: ["gallery"] });
    qc.invalidateQueries({ queryKey: ["admin", "gallery_count"] });
    qc.invalidateQueries({ queryKey: ["public_gallery"] });
  };

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
    <div className="space-y-8">
      {/* Header & Toggle Uploader */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <h2 className="font-serif text-2xl text-foreground">Media Gallery</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Upload and manage photos and video showcases for Hyper Petals & Decor.
          </p>
        </div>
        <button
          onClick={() => setShowUploader((v) => !v)}
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-[11px] uppercase tracking-[0.24em] font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Upload className="h-4 w-4" />
          {showUploader ? "Hide Uploader" : "Batch Upload Media"}
          {showUploader ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {/* Multi-Media Uploader Section */}
      {showUploader && (
        <div className="rounded-lg border border-border/80 bg-card/50 p-6 shadow-sm space-y-4">
          <label className="grid gap-2 max-w-sm">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Occasion for this batch
            </span>
            <select
              value={uploadOccasion}
              onChange={(e) => setUploadOccasion(e.target.value as OccasionSlug | "")}
              className="rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
            >
              <option value="">General / unsorted (no occasion page)</option>
              {OCCASION_SLUGS.map((slug) => (
                <option key={slug} value={slug}>
                  {OCCASION_LABELS[slug]}
                </option>
              ))}
            </select>
            <span className="text-[11px] text-muted-foreground">
              Applied to every file you upload below. Everything in this batch will show on the{" "}
              {uploadOccasion ? OCCASION_LABELS[uploadOccasion] : "general"} gallery.
            </span>
          </label>
          <MediaUploader
            onUploadFile={handleUploadSingleFile}
            onAllCompleted={handleAllCompleted}
            allowedTypes={["image", "video"]}
            title="Batch Upload Gallery Photos & Videos"
            subtitle="Drag and drop multiple photos (JPG, PNG, WebP) or videos (MP4, WebM, MOV) to upload them directly to the gallery."
          />
        </div>
      )}

      {/* Occasion filter */}
      <div className="flex flex-wrap gap-2">
        <FilterChip
          active={filterOccasion === "all"}
          onClick={() => setFilterOccasion("all")}
          label={`All (${items.length})`}
        />
        <FilterChip
          active={filterOccasion === UNSORTED}
          onClick={() => setFilterOccasion(UNSORTED)}
          label={`Unsorted (${items.filter((i) => !i.occasion).length})`}
        />
        {OCCASION_SLUGS.map((slug) => (
          <FilterChip
            key={slug}
            active={filterOccasion === slug}
            onClick={() => setFilterOccasion(slug)}
            label={`${OCCASION_LABELS[slug]} (${items.filter((i) => i.occasion === slug).length})`}
          />
        ))}
      </div>

      {isLoading ? (
        <div className="mt-10 text-sm text-muted-foreground">Loading…</div>
      ) : filteredItems.length === 0 ? (
        <div className="mt-10 rounded-sm border border-dashed border-border/60 p-14 text-center">
          <p className="font-serif text-2xl text-foreground">No media yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {filterOccasion === "all"
              ? "Upload your first image or video to get started."
              : "No items tagged for this occasion yet."}
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-sm border border-border/60 bg-card"
            >
              <div className="aspect-[4/5] bg-muted">
                {item.kind === "image" ? (
                  <img
                    src={item.public_url}
                    alt={item.alt_text ?? item.title ?? ""}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video src={item.public_url} controls className="h-full w-full object-cover" />
                )}
              </div>
              <div className="p-4">
                <p className="truncate font-serif text-lg text-foreground">
                  {item.title || "Untitled"}
                </p>
                {item.caption && (
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.caption}</p>
                )}
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {item.kind} · {new Date(item.created_at).toLocaleDateString()}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-primary">
                  {item.occasion
                    ? (OCCASION_LABELS[item.occasion as OccasionSlug] ?? item.occasion)
                    : "Unsorted"}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setEditing(item)}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-input px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] hover:bg-accent"
                  >
                    <Pencil className="h-3 w-3" /> Edit
                  </button>
                  <button
                    onClick={() => remove(item)}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-destructive/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-destructive hover:bg-destructive/10"
                  >
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

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-[11px] uppercase tracking-wider transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border/60 text-muted-foreground hover:bg-accent"
      }`}
    >
      {label}
    </button>
  );
}

function EditDialog({ item, onClose }: { item: Item; onClose: () => void }) {
  const qc = useQueryClient();
  const [title, setTitle] = useState(item.title ?? "");
  const [alt, setAlt] = useState(item.alt_text ?? "");
  const [caption, setCaption] = useState(item.caption ?? "");
  const [occasion, setOccasion] = useState<OccasionSlug | "">(
    (item.occasion as OccasionSlug) ?? "",
  );
  const [sortOrder, setSortOrder] = useState(item.sort_order);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    try {
      await adminUpdateGalleryItem({
        data: {
          id: item.id,
          title,
          alt_text: alt,
          caption,
          occasion: occasion || null,
          sort_order: sortOrder,
        },
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-sm border border-border bg-card p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-foreground">Edit media</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Title
            </span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Alt text (accessibility)
            </span>
            <input
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              className="rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Caption
            </span>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Occasion
            </span>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value as OccasionSlug | "")}
              className="rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
            >
              <option value="">General / unsorted</option>
              {OCCASION_SLUGS.map((slug) => (
                <option key={slug} value={slug}>
                  {OCCASION_LABELS[slug]}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Sort order (lower = first)
            </span>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              className="w-32 rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
            />
          </label>
        </div>
        <div className="mt-8 flex gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="rounded-sm bg-primary px-6 py-2.5 text-[11px] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          <button
            onClick={onClose}
            className="rounded-sm border border-input px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] hover:bg-accent"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
