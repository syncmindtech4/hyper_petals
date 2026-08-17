import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@clerk/react+[...].mjs";
import { _ as saveSiteContent } from "./cms.functions-CoGRr0hG.mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { i as useServicesContent, n as useHero, t as useContact } from "./useSiteContent-Dfn_bZBC.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.content-CYusT-V9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
function ContentEditor() {
	const [tab, setTab] = (0, import_react.useState)("hero");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-2 border-b border-border/40",
		children: [
			"hero",
			"contact",
			"services"
		].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => setTab(t),
			className: `px-4 py-2 text-[11px] uppercase tracking-[0.22em] ${tab === t ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`,
			children: t
		}, t))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8",
		children: [
			tab === "hero" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroEditor, {}),
			tab === "contact" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactEditor, {}),
			tab === "services" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServicesEditor, {})
		]
	})] });
}
async function saveKey(key, value) {
	await saveSiteContent({ data: {
		key,
		value
	} });
}
function Field({ label, value, onChange, textarea }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
			children: label
		}), textarea ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			rows: 3,
			value,
			onChange: (e) => onChange(e.target.value),
			className: "rounded-sm border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "rounded-sm border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
		})]
	});
}
function SaveBar({ onSave, saving }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: onSave,
			disabled: saving,
			className: "rounded-sm bg-primary px-8 py-3 text-[11px] uppercase tracking-[0.24em] text-primary-foreground hover:bg-primary/90 disabled:opacity-60",
			children: saving ? "Saving…" : "Save changes"
		})
	});
}
function HeroEditor() {
	const { data } = useHero();
	const qc = useQueryClient();
	const [form, setForm] = (0, import_react.useState)(data);
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (data) setForm(data);
	}, [data]);
	async function save() {
		setSaving(true);
		try {
			await saveKey("hero", form);
			toast.success("Homepage hero updated");
			qc.invalidateQueries({ queryKey: ["site_content", "hero"] });
		} catch (e) {
			toast.error(e?.message ?? "Save failed");
		} finally {
			setSaving(false);
		}
	}
	const upd = (k) => (v) => setForm({
		...form,
		[k]: v
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Eyebrow",
				value: form.eyebrow,
				onChange: upd("eyebrow")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Title (lead)",
						value: form.titleLead,
						onChange: upd("titleLead")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Title (italic)",
						value: form.titleItalic,
						onChange: upd("titleItalic")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Title (tail)",
						value: form.titleTail ?? "",
						onChange: upd("titleTail")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Subtitle",
				value: form.subtitle,
				onChange: upd("subtitle"),
				textarea: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Stat 1 label",
						value: form.stat1Label,
						onChange: upd("stat1Label")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Stat 2 label",
						value: form.stat2Label,
						onChange: upd("stat2Label")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Stat 3 label",
						value: form.stat3Label,
						onChange: upd("stat3Label")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Stat 1 value",
						value: form.stat1Value,
						onChange: upd("stat1Value")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Stat 2 value",
						value: form.stat2Value,
						onChange: upd("stat2Value")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Stat 3 value",
						value: form.stat3Value,
						onChange: upd("stat3Value")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveBar, {
				onSave: save,
				saving
			})
		]
	});
}
function ContactEditor() {
	const { data } = useContact();
	const qc = useQueryClient();
	const [form, setForm] = (0, import_react.useState)(data);
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (data) setForm(data);
	}, [data]);
	async function save() {
		setSaving(true);
		try {
			await saveKey("contact", form);
			toast.success("Contact info updated");
			qc.invalidateQueries({ queryKey: ["site_content", "contact"] });
		} catch (e) {
			toast.error(e?.message ?? "Save failed");
		} finally {
			setSaving(false);
		}
	}
	const upd = (k) => (v) => setForm({
		...form,
		[k]: v
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5 max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Phone (display)",
						value: form.phone,
						onChange: upd("phone")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Phone (tel: link)",
						value: form.phoneHref,
						onChange: upd("phoneHref")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "WhatsApp (digits only)",
						value: form.whatsapp,
						onChange: upd("whatsapp")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Email",
						value: form.email,
						onChange: upd("email")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Address",
						value: form.address,
						onChange: upd("address")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Hours",
						value: form.hours,
						onChange: upd("hours")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Instagram URL",
				value: form.instagram,
				onChange: upd("instagram")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveBar, {
				onSave: save,
				saving
			})
		]
	});
}
function ServicesEditor() {
	const { data } = useServicesContent();
	const qc = useQueryClient();
	const [form, setForm] = (0, import_react.useState)(data);
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (data) setForm(data);
	}, [data]);
	async function save() {
		setSaving(true);
		try {
			await saveKey("services", form);
			toast.success("Services updated");
			qc.invalidateQueries({ queryKey: ["site_content", "services"] });
		} catch (e) {
			toast.error(e?.message ?? "Save failed");
		} finally {
			setSaving(false);
		}
	}
	function updItem(i, patch) {
		const items = form.items.slice();
		items[i] = {
			...items[i],
			...patch
		};
		setForm({
			...form,
			items
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Page heading",
				value: form.heading,
				onChange: (v) => setForm({
					...form,
					heading: v
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Page subtitle",
				value: form.subtitle,
				onChange: (v) => setForm({
					...form,
					subtitle: v
				}),
				textarea: true
			}),
			form.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-sm border border-border/60 bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "eyebrow",
					children: ["Service ", i + 1]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Title",
							value: item.title,
							onChange: (v) => updItem(i, { title: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Price",
							value: item.price,
							onChange: (v) => updItem(i, { price: v })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Body",
							value: item.body,
							onChange: (v) => updItem(i, { body: v }),
							textarea: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Includes (one per line)",
							value: item.includes.join("\n"),
							onChange: (v) => updItem(i, { includes: v.split("\n").map((s) => s.trim()).filter(Boolean) }),
							textarea: true
						})
					]
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveBar, {
				onSave: save,
				saving
			})
		]
	});
}
//#endregion
export { ContentEditor as component };
