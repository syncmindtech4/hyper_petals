import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Trash2, Pencil, X, Plus, Upload } from "lucide-react";
import { formatUGX } from "@/lib/products";
import {
  useAdminProducts,
  useInvalidateProducts,
} from "@/hooks/useProducts";
import {
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  adminUploadToBlob,
} from "@/lib/cms.functions";
import type { ProductRow } from "@/lib/db/products.server";

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: ProductsAdmin,
});

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ProductsAdmin() {
  const { data: products = [], isLoading } = useAdminProducts();
  const invalidate = useInvalidateProducts();
  const [editing, setEditing] = useState<ProductRow | "new" | null>(null);

  async function remove(item: ProductRow) {
    if (!confirm(`Delete "${item.name}" permanently? This can't be undone.`)) return;
    try {
      await adminDeleteProduct({ data: { id: item.id } });
      toast.success("Deleted");
      invalidate();
    } catch (e: any) {
      toast.error(e?.message ?? "Delete failed");
    }
  }

  async function toggleActive(item: ProductRow) {
    try {
      await adminUpdateProduct({ data: { id: item.id, is_active: !item.is_active } });
      invalidate();
    } catch (e: any) {
      toast.error(e?.message ?? "Update failed");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Products shown here are what customers see on the homepage, catalogue, and product pages.
        </p>
        <button
          onClick={() => setEditing("new")}
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add product
        </button>
      </div>

      {isLoading ? (
        <div className="mt-10 text-sm text-muted-foreground">Loading…</div>
      ) : products.length === 0 ? (
        <div className="mt-10 rounded-sm border border-dashed border-border/60 p-14 text-center">
          <p className="font-serif text-2xl text-foreground">No products yet</p>
          <p className="mt-2 text-sm text-muted-foreground">Add your first bouquet to get it live on the site.</p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <th className="pb-3 pr-4">Product</th>
                <th className="pb-3 pr-4">Category</th>
                <th className="pb-3 pr-4">Price</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 pr-4">Bestseller</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-border/40">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image_url} alt={p.name} className="h-12 w-12 rounded-sm object-cover bg-muted" />
                      <div>
                        <p className="font-serif text-base text-foreground">{p.name}</p>
                        <p className="text-[11px] text-muted-foreground">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{p.category_label || "—"}</td>
                  <td className="py-3 pr-4 font-medium text-foreground">{formatUGX(p.price_ugx)}</td>
                  <td className="py-3 pr-4">
                    <button
                      onClick={() => toggleActive(p)}
                      className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-wider ${
                        p.is_active
                          ? "bg-emerald-500/10 text-emerald-700"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {p.is_active ? "Live" : "Hidden"}
                    </button>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{p.is_bestseller ? "Yes" : "—"}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditing(p)}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-input px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] hover:bg-accent"
                      >
                        <Pencil className="h-3 w-3" /> Edit
                      </button>
                      <button
                        onClick={() => remove(p)}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-destructive/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && <ProductDialog item={editing === "new" ? null : editing} onClose={() => setEditing(null)} />}
    </div>
  );
}

function ProductDialog({ item, onClose }: { item: ProductRow | null; onClose: () => void }) {
  const invalidate = useInvalidateProducts();
  const isNew = !item;
  const [name, setName] = useState(item?.name ?? "");
  const [slug, setSlug] = useState(item?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!item);
  const [categoryLabel, setCategoryLabel] = useState(item?.category_label ?? "");
  const [price, setPrice] = useState(item?.price_ugx ?? 0);
  const [description, setDescription] = useState(item?.description ?? "");
  const [bestFor, setBestFor] = useState(item?.best_for ?? "");
  const [imageUrl, setImageUrl] = useState(item?.image_url ?? "");
  const [isBestseller, setIsBestseller] = useState(item?.is_bestseller ?? false);
  const [isActive, setIsActive] = useState(item?.is_active ?? true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>(item?.image_url ? [item.image_url] : []);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const imageFileRef = useRef<HTMLInputElement>(null);

  async function handleMultipleImageUploads(files: FileList | File[]) {
    const fileList = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (fileList.length === 0) {
      return toast.error("Please select valid image files (JPG, PNG, WebP, GIF)");
    }
    setUploadingImage(true);
    const toastId = toast.loading(
      fileList.length === 1
        ? "Uploading image to Vercel Blob…"
        : `Uploading ${fileList.length} images to Vercel Blob…`
    );

    const newUrls: string[] = [];
    let successCount = 0;

    for (const file of fileList) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "products");
        const result = await adminUploadToBlob({ data: formData });
        newUrls.push(result.url);
        successCount++;
      } catch (err: any) {
        console.error("Product image upload failed:", err);
      }
    }

    if (newUrls.length > 0) {
      setUploadedImages((prev) => Array.from(new Set([...newUrls, ...prev])));
      setImageUrl(newUrls[0]);
      toast.success(
        fileList.length === 1
          ? "Image uploaded successfully!"
          : `Successfully uploaded ${successCount} product images!`,
        { id: toastId }
      );
    } else {
      toast.error("Failed to upload images.", { id: toastId });
    }

    setUploadingImage(false);
    if (imageFileRef.current) imageFileRef.current.value = "";
  }

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function save() {
    if (!name.trim()) return toast.error("Name is required");
    if (!slug.trim()) return toast.error("Slug is required");
    if (!imageUrl.trim()) return toast.error("Add an image URL before saving");
    if (price <= 0) return toast.error("Price must be greater than zero");

    setSaving(true);
    try {
      const payload = {
        slug: slug.trim(),
        name: name.trim(),
        category_label: categoryLabel.trim() || null,
        price_ugx: Math.round(price),
        description: description.trim(),
        best_for: bestFor.trim() || null,
        image_url: imageUrl.trim(),
        is_bestseller: isBestseller,
        is_active: isActive,
      };
      if (isNew) {
        await adminCreateProduct({ data: payload });
        toast.success("Product created");
      } else {
        await adminUpdateProduct({ data: { id: item!.id, ...payload } });
        toast.success("Product updated");
      }
      invalidate();
      onClose();
    } catch (e: any) {
      toast.error(e?.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-sm border border-border bg-card p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl text-foreground">{isNew ? "Add product" : "Edit product"}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          {/* Dropzone & Preview Section */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium">
              Product Image & Gallery
            </span>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingOver(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDraggingOver(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingOver(false);
                if (e.dataTransfer.files?.length) {
                  handleMultipleImageUploads(e.dataTransfer.files);
                }
              }}
              className={`relative flex items-center gap-4 rounded-md border-2 border-dashed p-4 transition-all ${
                isDraggingOver
                  ? "border-primary bg-primary/10"
                  : "border-border/60 bg-muted/20 hover:border-primary/50"
              }`}
            >
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-sm border border-border/60 bg-muted relative">
                {imageUrl ? (
                  <img src={imageUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                    No image
                  </div>
                )}
              </div>

              <div className="flex-1 grid gap-2">
                <div className="flex gap-2">
                  <input
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      if (e.target.value && !uploadedImages.includes(e.target.value)) {
                        setUploadedImages((prev) => [e.target.value, ...prev]);
                      }
                    }}
                    placeholder="https://... or upload files"
                    className="flex-1 min-w-0 rounded-sm border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                  <label className="inline-flex cursor-pointer shrink-0 items-center gap-1.5 rounded-sm bg-primary px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] font-medium text-primary-foreground hover:bg-primary/90">
                    <Upload className="h-3.5 w-3.5" />
                    {uploadingImage ? "..." : "Upload"}
                    <input
                      ref={imageFileRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      disabled={uploadingImage}
                      onChange={(e) => e.target.files?.length && handleMultipleImageUploads(e.target.files)}
                    />
                  </label>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Drag & drop multiple image files here or click Upload to select photos.
                </p>
              </div>
            </div>

            {/* Thumbnail Selection Bar if multiple uploaded */}
            {uploadedImages.length > 1 && (
              <div className="pt-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Select Primary Image ({uploadedImages.length} available):
                </span>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {uploadedImages.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImageUrl(url)}
                      className={`relative h-12 w-12 overflow-hidden rounded-sm border-2 transition-all ${
                        imageUrl === url ? "border-primary scale-105 shadow-xs" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={url} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Name</span>
            <input
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Slug (used in the product URL)
            </span>
            <input
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(slugify(e.target.value));
              }}
              className="rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Category label (e.g. "Roses · Bestseller")
            </span>
            <input
              value={categoryLabel}
              onChange={(e) => setCategoryLabel(e.target.value)}
              className="rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Price (UGX)</span>
            <input
              type="number"
              min={0}
              step={1000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value) || 0)}
              className="rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Description</span>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Best for (occasions, comma/dot separated)
            </span>
            <input
              value={bestFor}
              onChange={(e) => setBestFor(e.target.value)}
              className="rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
            />
          </label>

          <div className="flex flex-wrap gap-6 pt-1">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input type="checkbox" checked={isBestseller} onChange={(e) => setIsBestseller(e.target.checked)} />
              Mark as bestseller
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
              Visible on site
            </label>
          </div>
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
