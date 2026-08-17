import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@clerk/react+[...].mjs";
import { c as adminUpdateProduct, r as adminDeleteProduct, t as adminCreateProduct, u as adminUploadToBlob } from "./cms.functions-CoGRr0hG.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as Plus, i as Trash2, m as Pencil, n as Upload, t as X } from "../_libs/lucide-react.mjs";
import { n as useInvalidateProducts, t as useAdminProducts } from "./useProducts-BtNG2CQt.mjs";
import { t as formatUGX } from "./products-aqe0UNe5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.products-jX3U8MBo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function slugify(name) {
	return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function ProductsAdmin() {
	const { data: products = [], isLoading } = useAdminProducts();
	const invalidate = useInvalidateProducts();
	const [editing, setEditing] = (0, import_react.useState)(null);
	async function remove(item) {
		if (!confirm(`Delete "${item.name}" permanently? This can't be undone.`)) return;
		try {
			await adminDeleteProduct({ data: { id: item.id } });
			toast.success("Deleted");
			invalidate();
		} catch (e) {
			toast.error(e?.message ?? "Delete failed");
		}
	}
	async function toggleActive(item) {
		try {
			await adminUpdateProduct({ data: {
				id: item.id,
				is_active: !item.is_active
			} });
			invalidate();
		} catch (e) {
			toast.error(e?.message ?? "Update failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Products shown here are what customers see on the homepage, catalogue, and product pages."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setEditing("new"),
				className: "inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Add product"]
			})]
		}),
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 text-sm text-muted-foreground",
			children: "Loading…"
		}) : products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 rounded-sm border border-dashed border-border/60 p-14 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-2xl text-foreground",
				children: "No products yet"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Add your first bouquet to get it live on the site."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[720px] border-collapse text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border/60 text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-3 pr-4",
							children: "Product"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-3 pr-4",
							children: "Category"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-3 pr-4",
							children: "Price"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-3 pr-4",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-3 pr-4",
							children: "Bestseller"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-3",
							children: "Actions"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.image_url,
									alt: p.name,
									className: "h-12 w-12 rounded-sm object-cover bg-muted"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-serif text-base text-foreground",
									children: p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: p.slug
								})] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-4 text-muted-foreground",
							children: p.category_label || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-4 font-medium text-foreground",
							children: formatUGX(p.price_ugx)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => toggleActive(p),
								className: `rounded-full px-3 py-1 text-[10px] uppercase tracking-wider ${p.is_active ? "bg-emerald-500/10 text-emerald-700" : "bg-muted text-muted-foreground"}`,
								children: p.is_active ? "Live" : "Hidden"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 pr-4 text-muted-foreground",
							children: p.is_bestseller ? "Yes" : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setEditing(p),
									className: "inline-flex items-center gap-1.5 rounded-sm border border-input px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] hover:bg-accent",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3 w-3" }), " Edit"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => remove(p),
									className: "inline-flex items-center gap-1.5 rounded-sm border border-destructive/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-destructive hover:bg-destructive/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" }), " Delete"]
								})]
							})
						})
					]
				}, p.id)) })]
			})
		}),
		editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductDialog, {
			item: editing === "new" ? null : editing,
			onClose: () => setEditing(null)
		})
	] });
}
function ProductDialog({ item, onClose }) {
	const invalidate = useInvalidateProducts();
	const isNew = !item;
	const [name, setName] = (0, import_react.useState)(item?.name ?? "");
	const [slug, setSlug] = (0, import_react.useState)(item?.slug ?? "");
	const [slugTouched, setSlugTouched] = (0, import_react.useState)(!!item);
	const [categoryLabel, setCategoryLabel] = (0, import_react.useState)(item?.category_label ?? "");
	const [price, setPrice] = (0, import_react.useState)(item?.price_ugx ?? 0);
	const [description, setDescription] = (0, import_react.useState)(item?.description ?? "");
	const [bestFor, setBestFor] = (0, import_react.useState)(item?.best_for ?? "");
	const [imageUrl, setImageUrl] = (0, import_react.useState)(item?.image_url ?? "");
	const [isBestseller, setIsBestseller] = (0, import_react.useState)(item?.is_bestseller ?? false);
	const [isActive, setIsActive] = (0, import_react.useState)(item?.is_active ?? true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [uploadingImage, setUploadingImage] = (0, import_react.useState)(false);
	const [uploadedImages, setUploadedImages] = (0, import_react.useState)(item?.image_url ? [item.image_url] : []);
	const [isDraggingOver, setIsDraggingOver] = (0, import_react.useState)(false);
	const imageFileRef = (0, import_react.useRef)(null);
	async function handleMultipleImageUploads(files) {
		const fileList = Array.from(files).filter((f) => f.type.startsWith("image/"));
		if (fileList.length === 0) return toast.error("Please select valid image files (JPG, PNG, WebP, GIF)");
		setUploadingImage(true);
		const toastId = toast.loading(fileList.length === 1 ? "Uploading image to Vercel Blob…" : `Uploading ${fileList.length} images to Vercel Blob…`);
		const newUrls = [];
		let successCount = 0;
		for (const file of fileList) try {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("folder", "products");
			const result = await adminUploadToBlob({ data: formData });
			newUrls.push(result.url);
			successCount++;
		} catch (err) {
			console.error("Product image upload failed:", err);
		}
		if (newUrls.length > 0) {
			setUploadedImages((prev) => Array.from(/* @__PURE__ */ new Set([...newUrls, ...prev])));
			setImageUrl(newUrls[0]);
			toast.success(fileList.length === 1 ? "Image uploaded successfully!" : `Successfully uploaded ${successCount} product images!`, { id: toastId });
		} else toast.error("Failed to upload images.", { id: toastId });
		setUploadingImage(false);
		if (imageFileRef.current) imageFileRef.current.value = "";
	}
	function handleNameChange(value) {
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
				is_active: isActive
			};
			if (isNew) {
				await adminCreateProduct({ data: payload });
				toast.success("Product created");
			} else {
				await adminUpdateProduct({ data: {
					id: item.id,
					...payload
				} });
				toast.success("Product updated");
			}
			invalidate();
			onClose();
		} catch (e) {
			toast.error(e?.message ?? "Save failed");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			onClick: (e) => e.stopPropagation(),
			className: "w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-sm border border-border bg-card p-8 shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl text-foreground",
						children: isNew ? "Add product" : "Edit product"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-medium",
									children: "Product Image & Gallery"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									onDragOver: (e) => {
										e.preventDefault();
										setIsDraggingOver(true);
									},
									onDragLeave: (e) => {
										e.preventDefault();
										setIsDraggingOver(false);
									},
									onDrop: (e) => {
										e.preventDefault();
										setIsDraggingOver(false);
										if (e.dataTransfer.files?.length) handleMultipleImageUploads(e.dataTransfer.files);
									},
									className: `relative flex items-center gap-4 rounded-md border-2 border-dashed p-4 transition-all ${isDraggingOver ? "border-primary bg-primary/10" : "border-border/60 bg-muted/20 hover:border-primary/50"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-20 w-20 shrink-0 overflow-hidden rounded-sm border border-border/60 bg-muted relative",
										children: imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: imageUrl,
											alt: "",
											className: "h-full w-full object-cover"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-full w-full items-center justify-center text-xs text-muted-foreground",
											children: "No image"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: imageUrl,
												onChange: (e) => {
													setImageUrl(e.target.value);
													if (e.target.value && !uploadedImages.includes(e.target.value)) setUploadedImages((prev) => [e.target.value, ...prev]);
												},
												placeholder: "https://... or upload files",
												className: "flex-1 min-w-0 rounded-sm border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "inline-flex cursor-pointer shrink-0 items-center gap-1.5 rounded-sm bg-primary px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] font-medium text-primary-foreground hover:bg-primary/90",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-3.5 w-3.5" }),
													uploadingImage ? "..." : "Upload",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														ref: imageFileRef,
														type: "file",
														accept: "image/*",
														multiple: true,
														className: "hidden",
														disabled: uploadingImage,
														onChange: (e) => e.target.files?.length && handleMultipleImageUploads(e.target.files)
													})
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-muted-foreground",
											children: "Drag & drop multiple image files here or click Upload to select photos."
										})]
									})]
								}),
								uploadedImages.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
										children: [
											"Select Primary Image (",
											uploadedImages.length,
											" available):"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1.5 flex flex-wrap gap-2",
										children: uploadedImages.map((url, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setImageUrl(url),
											className: `relative h-12 w-12 overflow-hidden rounded-sm border-2 transition-all ${imageUrl === url ? "border-primary scale-105 shadow-xs" : "border-transparent opacity-60 hover:opacity-100"}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: url,
												alt: "",
												className: "h-full w-full object-cover"
											})
										}, idx))
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: name,
								onChange: (e) => handleNameChange(e.target.value),
								className: "rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
								children: "Slug (used in the product URL)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: slug,
								onChange: (e) => {
									setSlugTouched(true);
									setSlug(slugify(e.target.value));
								},
								className: "rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
								children: "Category label (e.g. \"Roses · Bestseller\")"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: categoryLabel,
								onChange: (e) => setCategoryLabel(e.target.value),
								className: "rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
								children: "Price (UGX)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 0,
								step: 1e3,
								value: price,
								onChange: (e) => setPrice(Number(e.target.value) || 0),
								className: "rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
								children: "Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								value: description,
								onChange: (e) => setDescription(e.target.value),
								className: "rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
								children: "Best for (occasions, comma/dot separated)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: bestFor,
								onChange: (e) => setBestFor(e.target.value),
								className: "rounded-sm border border-input bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-6 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: isBestseller,
									onChange: (e) => setIsBestseller(e.target.checked)
								}), "Mark as bestseller"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-sm text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: isActive,
									onChange: (e) => setIsActive(e.target.checked)
								}), "Visible on site"]
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
export { ProductsAdmin as component };
