import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@clerk/react+[...].mjs";
import { v as submitEnquiry } from "./cms.functions-CoGRr0hG.mjs";
import { t as useContact } from "./useSiteContent-Dfn_bZBC.mjs";
import { b as MapPin, p as Phone, v as MessageCircle, w as Instagram, x as Mail } from "../_libs/lucide-react.mjs";
import { t as site } from "./site-Wk8BehLF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CdfrGiBE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var ENQUIRY_TYPE_LABELS = {
	bouquet: "Bouquet Order",
	birthday: "Birthday Parties",
	bridal: "Bridal Showers",
	babyshower: "Baby Showers",
	proposal: "Marriage Proposals",
	kwanjula: "Kwanjula & Traditional Events",
	teaparty: "Tea Party",
	corporate: "Corporate & Brand Events",
	other: "Something else"
};
function Contact() {
	const [sent, setSent] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const { data: c } = useContact();
	const waHref = `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(site.whatsappMsg)}`;
	async function onSubmit(e) {
		e.preventDefault();
		setError(null);
		const form = e.currentTarget;
		const formData = new FormData(form);
		const name = String(formData.get("name") ?? "").trim();
		const email = String(formData.get("email") ?? "").trim();
		const phone = String(formData.get("phone") ?? "").trim();
		const enquiryType = String(formData.get("type") ?? "other");
		const message = String(formData.get("message") ?? "").trim();
		setSubmitting(true);
		try {
			await submitEnquiry({ data: {
				name,
				email,
				phone: phone || void 0,
				enquiryType,
				message
			} });
			const typeLabel = ENQUIRY_TYPE_LABELS[enquiryType] ?? enquiryType;
			const waMessage = `New enquiry via website\n\n*Name*: ${name}\n*Email*: ${email}\n` + (phone ? `*Phone*: ${phone}\n` : "") + `*Type*: ${typeLabel}\n\n${message}`;
			window.open(`https://wa.me/${c.whatsapp}?text=${encodeURIComponent(waMessage)}`, "_blank");
			setSent(true);
			form.reset();
		} catch (err) {
			console.error("submitEnquiry failed:", err);
			setError("Something went wrong sending your message. Please try WhatsApp or email instead.");
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-border/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-[1fr_1.15fr] md:py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Get in touch"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-serif text-5xl leading-[1.05] text-foreground md:text-6xl",
					children: "Let's design something beautiful."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-md text-base leading-relaxed text-muted-foreground",
					children: "Whether it's a Tuesday bouquet or a full wedding install, we'd love to hear about it. WhatsApp is fastest."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: waHref,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "flex items-start gap-4 group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
								children: "WhatsApp"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block font-serif text-lg text-foreground group-hover:text-primary",
								children: "Message the studio"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: c.phoneHref,
							className: "flex items-start gap-4 group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
								children: "Phone"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block font-serif text-lg text-foreground group-hover:text-primary",
								children: c.phone
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `mailto:${c.email}`,
							className: "flex items-start gap-4 group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block font-serif text-lg text-foreground group-hover:text-primary",
								children: c.email
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
									children: "Studio"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block font-serif text-lg text-foreground",
									children: c.address
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-xs uppercase tracking-[0.2em] text-muted-foreground",
									children: c.hours
								})
							] })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: c.instagram,
					className: "mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-primary hover:opacity-70",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, { className: "h-4 w-4" }), " Follow the studio"]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-sm border border-border/70 bg-card p-8 shadow-[var(--shadow-card)] md:p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "Send a message"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-serif text-3xl text-foreground",
						children: "Tell us about it"
					}),
					sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 rounded-sm border border-primary/30 bg-secondary/40 p-8 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-2xl text-foreground",
							children: "Thank you — flowers already forming."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "We'll be in touch within one business day."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "mt-8 grid gap-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Name",
								name: "name",
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-5 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Email",
									name: "email",
									type: "email",
									required: true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Phone",
									name: "phone",
									type: "tel"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
									children: "Enquiry type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									name: "type",
									defaultValue: "bouquet",
									className: "rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none",
									children: Object.entries(ENQUIRY_TYPE_LABELS).map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value,
										children: label
									}, value))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
									children: "Message"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									name: "message",
									rows: 5,
									required: true,
									className: "rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none",
									placeholder: "Tell us the date, occasion and any vision you already have…"
								})]
							}),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-destructive",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: submitting,
								className: "mt-2 rounded-sm bg-primary px-8 py-3.5 text-[11px] uppercase tracking-[0.24em] text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60",
								children: submitting ? "Sending…" : "Send enquiry"
							})
						]
					})
				]
			})]
		})
	});
}
function Field({ label, name, type = "text", required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
			children: [label, required && " *"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			name,
			required,
			className: "rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
		})]
	});
}
//#endregion
export { Contact as component };
