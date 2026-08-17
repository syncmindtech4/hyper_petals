import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@clerk/react+[...].mjs";
import { a as adminListGallery, l as adminUploadGalleryMedia, n as adminDeleteGalleryItem, s as adminUpdateGalleryItem } from "./cms.functions-CoGRr0hG.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as validateMediaFile, t as formatBytes } from "./media-CqgNq6ku.mjs";
import { A as CloudUpload, C as LoaderCircle, E as Film, F as ChevronUp, N as CircleCheck, P as CircleAlert, R as ChevronDown, T as Image, f as Plus, h as PenLine, i as Trash2, m as Pencil, n as Upload, t as X, u as RotateCcw } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.gallery-BVVpBEoI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function MediaUploader({ onUploadFile, onAllCompleted, allowedTypes = ["image", "video"], maxFiles = 25, title = "Upload Images & Videos", subtitle = "Drag & drop multiple files or click to browse (Images up to 10MB, Videos up to 50MB)", compact = false, className = "" }) {
	const [queue, setQueue] = (0, import_react.useState)([]);
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const [isUploadingBatch, setIsUploadingBatch] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		return () => {
			queue.forEach((q) => {
				if (q.previewUrl) URL.revokeObjectURL(q.previewUrl);
			});
		};
	}, []);
	const addFilesToQueue = (0, import_react.useCallback)((files) => {
		const incoming = Array.from(files);
		if (incoming.length === 0) return;
		if (queue.length + incoming.length > maxFiles) {
			toast.error(`You can upload maximum ${maxFiles} files at once.`);
			return;
		}
		const newItems = [];
		const errors = [];
		for (const file of incoming) try {
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
				showMeta: false
			});
		} catch (err) {
			errors.push(err?.message ?? `Invalid file: ${file.name}`);
		}
		if (errors.length > 0) toast.error(errors[0] + (errors.length > 1 ? ` (+${errors.length - 1} more errors)` : ""));
		if (newItems.length > 0) {
			setQueue((prev) => [...prev, ...newItems]);
			toast.info(`Added ${newItems.length} file${newItems.length > 1 ? "s" : ""} to queue.`);
		}
	}, [
		queue.length,
		maxFiles,
		allowedTypes
	]);
	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (!isDragging) setIsDragging(true);
	};
	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	};
	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) addFilesToQueue(e.dataTransfer.files);
	};
	const removeFile = (id) => {
		setQueue((prev) => {
			const target = prev.find((item) => item.id === id);
			if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
			return prev.filter((item) => item.id !== id);
		});
	};
	const updateMeta = (id, patch) => {
		setQueue((prev) => prev.map((item) => item.id === id ? {
			...item,
			...patch
		} : item));
	};
	const uploadSingleFile = async (item) => {
		setQueue((prev) => prev.map((q) => q.id === item.id ? {
			...q,
			status: "uploading",
			progress: 10,
			errorMsg: void 0
		} : q));
		try {
			await onUploadFile(item.file, {
				title: item.title,
				altText: item.altText,
				caption: item.caption
			}, (percent) => {
				setQueue((prev) => prev.map((q) => q.id === item.id ? {
					...q,
					progress: percent
				} : q));
			});
			setQueue((prev) => prev.map((q) => q.id === item.id ? {
				...q,
				status: "success",
				progress: 100
			} : q));
			return true;
		} catch (err) {
			const msg = err?.message ?? "Upload failed";
			setQueue((prev) => prev.map((q) => q.id === item.id ? {
				...q,
				status: "error",
				progress: 0,
				errorMsg: msg
			} : q));
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
		const CONCURRENCY = 2;
		const itemsToProcess = [...pendingItems];
		const worker = async () => {
			while (itemsToProcess.length > 0) {
				const item = itemsToProcess.shift();
				if (!item) break;
				if (await uploadSingleFile(item)) successCount++;
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
		} else toast.error(`Failed to upload ${failCount} file(s). Check errors below.`);
	};
	const clearCompleted = () => {
		setQueue((prev) => {
			const remaining = [];
			prev.forEach((q) => {
				if (q.status === "success") {
					if (q.previewUrl) URL.revokeObjectURL(q.previewUrl);
				} else remaining.push(q);
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
	const totalProgressPercent = totalFiles > 0 ? Math.round(queue.reduce((acc, q) => acc + (q.status === "success" ? 100 : q.progress), 0) / (totalFiles * 100) * 100) : 0;
	const acceptAttribute = [allowedTypes.includes("image") ? "image/*" : null, allowedTypes.includes("video") ? "video/*" : null].filter(Boolean).join(",");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `space-y-4 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onDragOver: handleDragOver,
			onDragLeave: handleDragLeave,
			onDrop: handleDrop,
			onClick: () => fileInputRef.current?.click(),
			className: `relative flex flex-col items-center justify-center cursor-pointer rounded-lg border-2 border-dashed transition-all duration-200 ${compact ? "p-6" : "p-10"} ${isDragging ? "border-primary bg-primary/10 scale-[1.01]" : "border-border/70 hover:border-primary/60 hover:bg-accent/40 bg-card/60"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileInputRef,
					type: "file",
					accept: acceptAttribute,
					multiple: true,
					className: "hidden",
					disabled: isUploadingBatch,
					onChange: (e) => {
						if (e.target.files && e.target.files.length > 0) {
							addFilesToQueue(e.target.files);
							e.target.value = "";
						}
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-6 w-6" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-3 font-serif text-lg font-medium text-foreground",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-center text-xs text-muted-foreground max-w-md",
					children: subtitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground",
					children: [allowedTypes.includes("image") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-muted/80 px-2.5 py-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-3 w-3 text-emerald-600" }), " Images (JPG, PNG, WebP)"]
					}), allowedTypes.includes("video") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-muted/80 px-2.5 py-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "h-3 w-3 text-indigo-600" }), " Videos (MP4, WebM, MOV)"]
					})]
				})
			]
		}), totalFiles > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg border border-border/60 bg-card p-4 shadow-sm space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-serif text-lg font-medium text-foreground",
								children: [
									"Media Queue (",
									totalFiles,
									")"
								]
							}),
							completedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700",
								children: [completedCount, " uploaded"]
							}),
							errorCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive",
								children: [errorCount, " failed"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: "Review, edit metadata, and upload your items to the server."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => fileInputRef.current?.click(),
								disabled: isUploadingBatch,
								className: "inline-flex items-center gap-1.5 rounded-sm border border-input bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent disabled:opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Add More"]
							}),
							completedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: clearCompleted,
								disabled: isUploadingBatch,
								className: "inline-flex items-center gap-1.5 rounded-sm border border-input bg-background px-3 py-1.5 text-xs font-medium hover:bg-accent disabled:opacity-50",
								children: "Clear Completed"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: clearAll,
								disabled: isUploadingBatch,
								className: "inline-flex items-center gap-1.5 rounded-sm border border-destructive/30 text-destructive px-3 py-1.5 text-xs font-medium hover:bg-destructive/10 disabled:opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Clear Queue"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: startBatchUpload,
								disabled: isUploadingBatch || totalFiles === completedCount,
								className: "inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 disabled:opacity-50 shadow-sm",
								children: isUploadingBatch ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
									" Uploading (",
									totalProgressPercent,
									"%)"
								] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-4 w-4" }),
									" Start Batch Upload (",
									totalFiles - completedCount,
									")"
								] })
							})
						]
					})]
				}),
				(isUploadingBatch || completedCount > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Overall Upload Progress" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono",
							children: [totalProgressPercent, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 w-full overflow-hidden rounded-full bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-primary transition-all duration-300 ease-out",
							style: { width: `${totalProgressPercent}%` }
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: queue.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `relative flex flex-col rounded-md border transition-all duration-200 overflow-hidden ${item.status === "error" ? "border-destructive/60 bg-destructive/5" : item.status === "success" ? "border-emerald-500/50 bg-emerald-500/5" : item.status === "uploading" ? "border-primary/60 bg-primary/5" : "border-border/80 bg-card"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-video w-full bg-muted/80 overflow-hidden group",
							children: [
								item.isImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.previewUrl,
									alt: item.title,
									className: "h-full w-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative h-full w-full flex items-center justify-center bg-black/90",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
										src: item.previewUrl,
										className: "h-full w-full object-cover opacity-80",
										muted: true,
										preload: "metadata"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0 flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xs",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "h-5 w-5" })
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute top-2 left-2 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded bg-black/70 px-2 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wider backdrop-blur-xs",
										children: item.isImage ? "IMAGE" : "VIDEO"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-xs",
										children: formatBytes(item.file.size)
									})]
								}),
								item.status !== "uploading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => removeFile(item.id),
									className: "absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-destructive hover:text-white transition-colors backdrop-blur-xs",
									title: "Remove file",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 flex-1 flex flex-col justify-between space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-medium text-sm text-foreground",
										title: item.file.name,
										children: item.title || item.file.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => updateMeta(item.id, { showMeta: !item.showMeta }),
										className: "text-muted-foreground hover:text-primary transition-colors shrink-0 p-0.5",
										title: "Edit title & caption",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "h-3.5 w-3.5" })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center gap-2",
									children: [
										item.status === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-flex items-center gap-1 text-[11px] text-muted-foreground font-medium",
											children: "Ready for upload"
										}),
										item.status === "uploading" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 text-[11px] text-primary font-medium animate-pulse",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }),
												" Uploading ",
												item.progress,
												"%"
											]
										}),
										item.status === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), " Uploaded"]
										}),
										item.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1 text-[11px] text-destructive font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3.5 w-3.5" }), " Upload failed"]
										})
									]
								}),
								item.status === "error" && item.errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-destructive bg-destructive/10 p-1.5 rounded",
									children: item.errorMsg
								}),
								item.showMeta && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 space-y-2 border-t border-border/60 pt-2 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "block space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase font-semibold text-muted-foreground",
												children: "Title"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: item.title,
												onChange: (e) => updateMeta(item.id, { title: e.target.value }),
												className: "w-full rounded border border-input bg-background px-2 py-1 text-xs focus:border-primary focus:outline-none",
												placeholder: "Media title..."
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "block space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase font-semibold text-muted-foreground",
												children: "Alt Text"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: item.altText,
												onChange: (e) => updateMeta(item.id, { altText: e.target.value }),
												className: "w-full rounded border border-input bg-background px-2 py-1 text-xs focus:border-primary focus:outline-none",
												placeholder: "Accessibility description..."
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "block space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase font-semibold text-muted-foreground",
												children: "Caption"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: item.caption,
												onChange: (e) => updateMeta(item.id, { caption: e.target.value }),
												className: "w-full rounded border border-input bg-background px-2 py-1 text-xs focus:border-primary focus:outline-none",
												placeholder: "Optional caption..."
											})]
										})
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 border-t border-border/40 flex items-center justify-between gap-2 text-xs",
								children: [item.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => uploadSingleFile(item),
									className: "inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3 w-3" }), " Retry"]
								}), item.status === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => uploadSingleFile(item),
									disabled: isUploadingBatch,
									className: "ml-auto text-xs text-primary font-medium hover:underline disabled:opacity-50",
									children: "Upload now"
								})]
							})]
						})]
					}, item.id))
				})
			]
		})]
	});
}
function GalleryAdmin() {
	const qc = useQueryClient();
	const { data: items = [], isLoading } = useQuery({
		queryKey: ["gallery"],
		queryFn: () => adminListGallery()
	});
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [showUploader, setShowUploader] = (0, import_react.useState)(true);
	const handleUploadSingleFile = async (file, meta, onProgress) => {
		onProgress(30);
		const formData = new FormData();
		formData.append("file", file);
		if (meta.title) formData.append("title", meta.title);
		if (meta.altText) formData.append("alt_text", meta.altText);
		if (meta.caption) formData.append("caption", meta.caption);
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
	async function remove(item) {
		if (!confirm(`Delete "${item.title || "this item"}" permanently?`)) return;
		try {
			await adminDeleteGalleryItem({ data: { id: item.id } });
			toast.success("Deleted");
			qc.invalidateQueries({ queryKey: ["gallery"] });
			qc.invalidateQueries({ queryKey: ["admin", "gallery_count"] });
			qc.invalidateQueries({ queryKey: ["public_gallery"] });
		} catch (e) {
			toast.error(e?.message ?? "Delete failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl text-foreground",
					children: "Media Gallery"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Upload and manage photos and video showcases for Hyper Petals & Decor."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowUploader((v) => !v),
					className: "inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-[11px] uppercase tracking-[0.24em] font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }),
						showUploader ? "Hide Uploader" : "Batch Upload Media",
						showUploader ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
					]
				})]
			}),
			showUploader && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg border border-border/80 bg-card/50 p-6 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaUploader, {
					onUploadFile: handleUploadSingleFile,
					onAllCompleted: handleAllCompleted,
					allowedTypes: ["image", "video"],
					title: "Batch Upload Gallery Photos & Videos",
					subtitle: "Drag and drop multiple photos (JPG, PNG, WebP) or videos (MP4, WebM, MOV) to upload them directly to the gallery."
				})
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 text-sm text-muted-foreground",
				children: "Loading…"
			}) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 rounded-sm border border-dashed border-border/60 p-14 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-serif text-2xl text-foreground",
					children: "No media yet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Upload your first image or video to get started."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group overflow-hidden rounded-sm border border-border/60 bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[4/5] bg-muted",
						children: item.kind === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.public_url,
							alt: item.alt_text ?? item.title ?? "",
							className: "h-full w-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							src: item.public_url,
							controls: true,
							className: "h-full w-full object-cover"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-serif text-lg text-foreground",
								children: item.title || "Untitled"
							}),
							item.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-xs text-muted-foreground",
								children: item.caption
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: [
									item.kind,
									" · ",
									new Date(item.created_at).toLocaleDateString()
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setEditing(item),
									className: "inline-flex items-center gap-1.5 rounded-sm border border-input px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] hover:bg-accent",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3 w-3" }), " Edit"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => remove(item),
									className: "inline-flex items-center gap-1.5 rounded-sm border border-destructive/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-destructive hover:bg-destructive/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" }), " Delete"]
								})]
							})
						]
					})]
				}, item.id))
			}),
			editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditDialog, {
				item: editing,
				onClose: () => setEditing(null)
			})
		]
	});
}
function EditDialog({ item, onClose }) {
	const qc = useQueryClient();
	const [title, setTitle] = (0, import_react.useState)(item.title ?? "");
	const [alt, setAlt] = (0, import_react.useState)(item.alt_text ?? "");
	const [caption, setCaption] = (0, import_react.useState)(item.caption ?? "");
	const [sortOrder, setSortOrder] = (0, import_react.useState)(item.sort_order);
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function save() {
		setSaving(true);
		try {
			await adminUpdateGalleryItem({ data: {
				id: item.id,
				title,
				alt_text: alt,
				caption,
				sort_order: sortOrder
			} });
			toast.success("Updated");
			qc.invalidateQueries({ queryKey: ["gallery"] });
			qc.invalidateQueries({ queryKey: ["public_gallery"] });
			onClose();
		} catch (e) {
			toast.error(e?.message ?? "Update failed");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onClick: (e) => e.stopPropagation(),
			className: "w-full max-w-lg rounded-sm border border-border bg-card p-8 shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl text-foreground",
						children: "Edit media"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
								children: "Title"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: title,
								onChange: (e) => setTitle(e.target.value),
								className: "rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
								children: "Alt text (accessibility)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: alt,
								onChange: (e) => setAlt(e.target.value),
								className: "rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
								children: "Caption"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								value: caption,
								onChange: (e) => setCaption(e.target.value),
								className: "rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
								children: "Sort order (lower = first)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: sortOrder,
								onChange: (e) => setSortOrder(parseInt(e.target.value) || 0),
								className: "w-32 rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: save,
						disabled: saving,
						className: "rounded-sm bg-primary px-6 py-2.5 text-[11px] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90 disabled:opacity-60",
						children: saving ? "Saving…" : "Save"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "rounded-sm border border-input px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] hover:bg-accent",
						children: "Cancel"
					})]
				})
			]
		})
	});
}
//#endregion
export { GalleryAdmin as component };
