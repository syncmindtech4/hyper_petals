import { useState, useRef, useEffect, useCallback } from "react";
import {
  UploadCloud,
  FileVideo,
  FileImage,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Plus,
  Trash2,
  Edit3,
  RotateCcw,
  Film,
  Image as ImageIcon,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { validateMediaFile, formatBytes } from "@/lib/media";

export interface QueuedFile {
  id: string;
  file: File;
  previewUrl: string;
  isImage: boolean;
  isVideo: boolean;
  status: "idle" | "uploading" | "success" | "error";
  progress: number; // 0 - 100
  errorMsg?: string;
  title: string;
  altText: string;
  caption: string;
  showMeta: boolean;
}

export interface MediaUploaderProps {
  /**
   * Function to handle individual file upload.
   * Return resolved data on success or throw Error on failure.
   */
  onUploadFile: (
    file: File,
    meta: { title: string; altText: string; caption: string },
    onProgress: (percent: number) => void
  ) => Promise<any>;
  onAllCompleted?: () => void;
  allowedTypes?: Array<"image" | "video">;
  maxFiles?: number;
  title?: string;
  subtitle?: string;
  compact?: boolean;
  className?: string;
}

export function MediaUploader({
  onUploadFile,
  onAllCompleted,
  allowedTypes = ["image", "video"],
  maxFiles = 25,
  title = "Upload Images & Videos",
  subtitle = "Drag & drop multiple files or click to browse (Images up to 10MB, Videos up to 50MB)",
  compact = false,
  className = "",
}: MediaUploaderProps) {
  const [queue, setQueue] = useState<QueuedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploadingBatch, setIsUploadingBatch] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      queue.forEach((q) => {
        if (q.previewUrl) URL.revokeObjectURL(q.previewUrl);
      });
    };
  }, []);

  const addFilesToQueue = useCallback(
    (files: FileList | File[]) => {
      const incoming = Array.from(files);
      if (incoming.length === 0) return;

      if (queue.length + incoming.length > maxFiles) {
        toast.error(`You can upload maximum ${maxFiles} files at once.`);
        return;
      }

      const newItems: QueuedFile[] = [];
      const errors: string[] = [];

      for (const file of incoming) {
        try {
          const { isImage, isVideo } = validateMediaFile(file);

          if (!allowedTypes.includes(isImage ? "image" : "video")) {
            errors.push(`"${file.name}" type is not accepted here.`);
            continue;
          }

          const defaultTitle = file.name.replace(/\.[^/.]+$/, "");
          const previewUrl = URL.createObjectURL(file);

          newItems.push({
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            file,
            previewUrl,
            isImage,
            isVideo,
            status: "idle",
            progress: 0,
            title: defaultTitle,
            altText: defaultTitle,
            caption: "",
            showMeta: false,
          });
        } catch (err: any) {
          errors.push(err?.message ?? `Invalid file: ${file.name}`);
        }
      }

      if (errors.length > 0) {
        toast.error(errors[0] + (errors.length > 1 ? ` (+${errors.length - 1} more errors)` : ""));
      }

      if (newItems.length > 0) {
        setQueue((prev) => [...prev, ...newItems]);
        toast.info(`Added ${newItems.length} file${newItems.length > 1 ? "s" : ""} to queue.`);
      }
    },
    [queue.length, maxFiles, allowedTypes]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFilesToQueue(e.dataTransfer.files);
    }
  };

  const removeFile = (id: string) => {
    setQueue((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((item) => item.id !== id);
    });
  };

  const updateMeta = (id: string, patch: Partial<QueuedFile>) => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  };

  const uploadSingleFile = async (item: QueuedFile) => {
    setQueue((prev) =>
      prev.map((q) =>
        q.id === item.id ? { ...q, status: "uploading", progress: 10, errorMsg: undefined } : q
      )
    );

    try {
      await onUploadFile(
        item.file,
        {
          title: item.title,
          altText: item.altText,
          caption: item.caption,
        },
        (percent) => {
          setQueue((prev) =>
            prev.map((q) => (q.id === item.id ? { ...q, progress: percent } : q))
          );
        }
      );

      setQueue((prev) =>
        prev.map((q) =>
          q.id === item.id ? { ...q, status: "success", progress: 100 } : q
        )
      );
      return true;
    } catch (err: any) {
      const msg = err?.message ?? "Upload failed";
      setQueue((prev) =>
        prev.map((q) =>
          q.id === item.id
            ? { ...q, status: "error", progress: 0, errorMsg: msg }
            : q
        )
      );
      return false;
    }
  };

  const startBatchUpload = async () => {
    const pendingItems = queue.filter((item) => item.status === "idle" || item.status === "error");
    if (pendingItems.length === 0) {
      toast.info("No files ready to upload.");
      return;
    }

    setIsUploadingBatch(true);
    let successCount = 0;
    let failCount = 0;

    // Run up to 2 concurrent uploads
    const CONCURRENCY = 2;
    const itemsToProcess = [...pendingItems];

    const worker = async () => {
      while (itemsToProcess.length > 0) {
        const item = itemsToProcess.shift();
        if (!item) break;
        const ok = await uploadSingleFile(item);
        if (ok) successCount++;
        else failCount++;
      }
    };

    const workers = Array.from({ length: Math.min(CONCURRENCY, pendingItems.length) }, () => worker());
    await Promise.all(workers);

    setIsUploadingBatch(false);

    if (failCount === 0) {
      toast.success(`Successfully uploaded all ${successCount} file${successCount > 1 ? "s" : ""}!`);
      if (onAllCompleted) onAllCompleted();
    } else if (successCount > 0) {
      toast.warning(`Uploaded ${successCount} file(s), ${failCount} failed.`);
      if (onAllCompleted) onAllCompleted();
    } else {
      toast.error(`Failed to upload ${failCount} file(s). Check errors below.`);
    }
  };

  const clearCompleted = () => {
    setQueue((prev) => {
      const remaining: QueuedFile[] = [];
      prev.forEach((q) => {
        if (q.status === "success") {
          if (q.previewUrl) URL.revokeObjectURL(q.previewUrl);
        } else {
          remaining.push(q);
        }
      });
      return remaining;
    });
  };

  const clearAll = () => {
    queue.forEach((q) => {
      if (q.previewUrl) URL.revokeObjectURL(q.previewUrl);
    });
    setQueue([]);
  };

  const totalFiles = queue.length;
  const completedCount = queue.filter((q) => q.status === "success").length;
  const errorCount = queue.filter((q) => q.status === "error").length;

  const totalProgressPercent =
    totalFiles > 0
      ? Math.round(
          (queue.reduce((acc, q) => acc + (q.status === "success" ? 100 : q.progress), 0) /
            (totalFiles * 100)) *
            100
        )
      : 0;

  const acceptAttribute = [
    allowedTypes.includes("image") ? "image/*" : null,
    allowedTypes.includes("video") ? "video/*" : null,
  ]
    .filter(Boolean)
    .join(",");

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Drag and Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center cursor-pointer rounded-lg border-2 border-dashed transition-all duration-200 ${
          compact ? "p-6" : "p-10"
        } ${
          isDragging
            ? "border-primary bg-primary/10 scale-[1.01]"
            : "border-border/70 hover:border-primary/60 hover:bg-accent/40 bg-card/60"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptAttribute}
          multiple
          className="hidden"
          disabled={isUploadingBatch}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              addFilesToQueue(e.target.files);
              e.target.value = "";
            }
          }}
        />

        <div className="flex items-center justify-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UploadCloud className="h-6 w-6" />
          </div>
        </div>

        <h3 className="mt-3 font-serif text-lg font-medium text-foreground">{title}</h3>
        <p className="mt-1 text-center text-xs text-muted-foreground max-w-md">{subtitle}</p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
          {allowedTypes.includes("image") && (
            <span className="inline-flex items-center gap-1 rounded-full bg-muted/80 px-2.5 py-1">
              <ImageIcon className="h-3 w-3 text-emerald-600" /> Images (JPG, PNG, WebP)
            </span>
          )}
          {allowedTypes.includes("video") && (
            <span className="inline-flex items-center gap-1 rounded-full bg-muted/80 px-2.5 py-1">
              <Film className="h-3 w-3 text-indigo-600" /> Videos (MP4, WebM, MOV)
            </span>
          )}
        </div>
      </div>

      {/* Queue Header & Global Actions */}
      {totalFiles > 0 && (
        <div className="rounded-lg border border-border/60 bg-card p-4 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-medium text-foreground">
                  Media Queue ({totalFiles})
                </span>
                {completedCount > 0 && (
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                    {completedCount} uploaded
                  </span>
                )}
                {errorCount > 0 && (
                  <span className="rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">
                    {errorCount} failed
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Review, edit metadata, and upload your items to the server.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingBatch}
                className="inline-flex items-center gap-1.5 rounded-sm border border-input bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent disabled:opacity-50"
              >
                <Plus className="h-3.5 w-3.5" /> Add More
              </button>

              {completedCount > 0 && (
                <button
                  type="button"
                  onClick={clearCompleted}
                  disabled={isUploadingBatch}
                  className="inline-flex items-center gap-1.5 rounded-sm border border-input bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent disabled:opacity-50"
                >
                  Clear Completed
                </button>
              )}

              <button
                type="button"
                onClick={clearAll}
                disabled={isUploadingBatch}
                className="inline-flex items-center gap-1.5 rounded-sm border border-destructive/30 text-destructive px-3 py-1.5 text-xs font-medium hover:bg-destructive/10 disabled:opacity-50"
              >
                <Trash2 className="h-3.5 w-3.5" /> Clear Queue
              </button>

              <button
                type="button"
                onClick={startBatchUpload}
                disabled={isUploadingBatch || totalFiles === completedCount}
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 disabled:opacity-50 shadow-sm"
              >
                {isUploadingBatch ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Uploading ({totalProgressPercent}%)
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-4 w-4" /> Start Batch Upload ({totalFiles - completedCount})
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Global Progress Bar */}
          {(isUploadingBatch || completedCount > 0) && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Overall Upload Progress</span>
                <span className="font-mono">{totalProgressPercent}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${totalProgressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Queued Media Grid */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {queue.map((item) => (
              <div
                key={item.id}
                className={`relative flex flex-col rounded-md border transition-all duration-200 overflow-hidden ${
                  item.status === "error"
                    ? "border-destructive/60 bg-destructive/5"
                    : item.status === "success"
                    ? "border-emerald-500/50 bg-emerald-500/5"
                    : item.status === "uploading"
                    ? "border-primary/60 bg-primary/5"
                    : "border-border/80 bg-card"
                }`}
              >
                {/* Thumbnail Preview Header */}
                <div className="relative aspect-video w-full bg-muted/80 overflow-hidden group">
                  {item.isImage ? (
                    <img
                      src={item.previewUrl}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="relative h-full w-full flex items-center justify-center bg-black/90">
                      <video
                        src={item.previewUrl}
                        className="h-full w-full object-cover opacity-80"
                        muted
                        preload="metadata"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xs">
                          <Film className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Badge: Type & Size */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="rounded bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wider backdrop-blur-xs">
                      {item.isImage ? "IMAGE" : "VIDEO"}
                    </span>
                    <span className="rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-xs">
                      {formatBytes(item.file.size)}
                    </span>
                  </div>

                  {/* Top Right Action: Remove */}
                  {item.status !== "uploading" && (
                    <button
                      type="button"
                      onClick={() => removeFile(item.id)}
                      className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-destructive hover:text-white transition-colors backdrop-blur-xs"
                      title="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Card Content & Metadata */}
                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate font-medium text-sm text-foreground" title={item.file.name}>
                        {item.title || item.file.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => updateMeta(item.id, { showMeta: !item.showMeta })}
                        className="text-muted-foreground hover:text-primary transition-colors shrink-0 p-0.5"
                        title="Edit title & caption"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-1 flex items-center gap-2">
                      {item.status === "idle" && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
                          Ready for upload
                        </span>
                      )}
                      {item.status === "uploading" && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-primary font-medium animate-pulse">
                          <Loader2 className="h-3 w-3 animate-spin" /> Uploading {item.progress}%
                        </span>
                      )}
                      {item.status === "success" && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Uploaded
                        </span>
                      )}
                      {item.status === "error" && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-destructive font-medium">
                          <AlertCircle className="h-3.5 w-3.5" /> Upload failed
                        </span>
                      )}
                    </div>

                    {/* Error details if failed */}
                    {item.status === "error" && item.errorMsg && (
                      <p className="mt-1 text-xs text-destructive bg-destructive/10 p-1.5 rounded">
                        {item.errorMsg}
                      </p>
                    )}

                    {/* Expandable Metadata Edit Inputs */}
                    {item.showMeta && (
                      <div className="mt-3 space-y-2 border-t border-border/60 pt-2 text-xs">
                        <label className="block space-y-1">
                          <span className="text-[10px] uppercase font-semibold text-muted-foreground">Title</span>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => updateMeta(item.id, { title: e.target.value })}
                            className="w-full rounded border border-input bg-background px-2 py-1 text-xs focus:border-primary focus:outline-none"
                            placeholder="Media title..."
                          />
                        </label>
                        <label className="block space-y-1">
                          <span className="text-[10px] uppercase font-semibold text-muted-foreground">Alt Text</span>
                          <input
                            type="text"
                            value={item.altText}
                            onChange={(e) => updateMeta(item.id, { altText: e.target.value })}
                            className="w-full rounded border border-input bg-background px-2 py-1 text-xs focus:border-primary focus:outline-none"
                            placeholder="Accessibility description..."
                          />
                        </label>
                        <label className="block space-y-1">
                          <span className="text-[10px] uppercase font-semibold text-muted-foreground">Caption</span>
                          <input
                            type="text"
                            value={item.caption}
                            onChange={(e) => updateMeta(item.id, { caption: e.target.value })}
                            className="w-full rounded border border-input bg-background px-2 py-1 text-xs focus:border-primary focus:outline-none"
                            placeholder="Optional caption..."
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Individual Item Actions */}
                  <div className="pt-2 border-t border-border/40 flex items-center justify-between gap-2 text-xs">
                    {item.status === "error" && (
                      <button
                        type="button"
                        onClick={() => uploadSingleFile(item)}
                        className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline"
                      >
                        <RotateCcw className="h-3 w-3" /> Retry
                      </button>
                    )}
                    {item.status === "idle" && (
                      <button
                        type="button"
                        onClick={() => uploadSingleFile(item)}
                        disabled={isUploadingBatch}
                        className="ml-auto text-xs text-primary font-medium hover:underline disabled:opacity-50"
                      >
                        Upload now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
