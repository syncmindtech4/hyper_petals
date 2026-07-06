
# Admin Dashboard Build Plan

## 1. Enable Lovable Cloud
Provisions Postgres, auth, and file storage — no external accounts needed.

## 2. Database schema (one migration)

**`app_role` enum** + **`user_roles`** table (separate from profiles, per security best practice) with `has_role(user_id, role)` security-definer function. First admin seeded by email.

**`site_content`** — key/value JSONB store for editable copy:
```
key text primary key   -- 'hero', 'stats', 'contact', 'services'
value jsonb not null
updated_at, updated_by
```
Seeded with current site copy (hero title, stats, contact info, 3 services).

**`gallery_items`** — media records:
```
id uuid pk
kind text check in ('image','video')
storage_path text        -- path in the 'gallery' bucket
title text, alt_text text, caption text
sort_order int
created_at, created_by
```

**RLS**
- `site_content`: public SELECT; admin INSERT/UPDATE (via `has_role`)
- `gallery_items`: public SELECT; admin write
- `user_roles`: authenticated SELECT self; admin all

**Storage bucket** `gallery` (public read) with policies: admin upload/delete, anyone read.

Grants for all three tables to `anon`/`authenticated`/`service_role` per public-schema rules.

## 3. Frontend integration (public site reads from DB)

Refactor `src/lib/site.ts`, homepage hero/stats, services page, and gallery to fetch from `site_content` and `gallery_items` via a public-safe server function + TanStack Query. Existing hardcoded values become the seed data — no visible change to visitors.

## 4. Admin routes (protected under `_authenticated`)

- `/auth` — email+password sign-in page (existing Cloud auth flow)
- `/_authenticated/admin` — layout; `beforeLoad` checks `has_role('admin')`, else redirect
  - `/admin` — dashboard overview
  - `/admin/content` — tabbed editor for Hero, Stats, Contact, Services (3 cards)
  - `/admin/gallery` — grid view + upload dialog + edit/delete per item

Server functions (`.functions.ts`, `requireSupabaseAuth` + admin role check):
- `updateSiteContent({ key, value })`
- `listGallery()` / `createGalleryItem` / `updateGalleryItem` / `deleteGalleryItem` (also removes from storage)
- Signed upload URL helper for direct browser → storage uploads (validated size/type client + server)

## 5. Media handling
- **Storage:** Lovable Cloud storage bucket `gallery`, public-read for display, admin-only write.
- **Validation:** images (jpg/png/webp) ≤ 5 MB; video (mp4/webm) ≤ 50 MB. Enforced client-side (immediate feedback) and server-side (in the create fn).
- Deletes remove the storage object AND the DB row in a single server function.

## 6. UI polish
- shadcn `Dialog`, `Tabs`, `Card`, `Input`, `Textarea`, `Button`
- `sonner` toasts on every mutation: "Content saved", "Upload failed", "Item deleted", etc.
- Loading skeletons and empty states in the gallery grid.

## 7. First admin
After Cloud is enabled and you sign up once at `/auth`, I'll run a one-line insert to grant your email the `admin` role. Tell me which email to seed (or I can add a small "claim admin" flow gated by a one-time secret).

---

### Technical notes (for reference)
- Uses TanStack Start server functions (not Edge Functions) per stack conventions.
- Public site reads use a publishable-key server client + narrow anon SELECT policies.
- All mutations go through `requireSupabaseAuth` + `has_role('admin')` check inside the handler.
- Storage recommendation: Lovable Cloud storage (S3-compatible under the hood) — no need for Cloudinary/S3 unless you outgrow it.

**Scope check:** this is ~1 large turn of work (migration + ~8 new files + refactors to 4 existing files). Confirm and I'll build it, or tell me to trim (e.g. skip services editor, images-only, etc.).
