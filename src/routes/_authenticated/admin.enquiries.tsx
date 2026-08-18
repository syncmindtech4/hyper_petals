import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Mail, Phone, Archive, CheckCircle2, Circle } from "lucide-react";
import { useAdminEnquiries, useInvalidateEnquiries } from "@/hooks/useEnquiries";
import { adminUpdateEnquiryStatus } from "@/lib/cms.functions";
import type { EnquiryRow } from "@/lib/db/enquiries.server";

export const Route = createFileRoute("/_authenticated/admin/enquiries")({
  component: EnquiriesAdmin,
});

const STATUS_STYLES: Record<EnquiryRow["status"], string> = {
  new: "bg-primary/10 text-primary",
  read: "bg-emerald-500/10 text-emerald-700",
  archived: "bg-muted text-muted-foreground",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-UG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function EnquiriesAdmin() {
  const { data: enquiries = [], isLoading } = useAdminEnquiries();
  const invalidate = useInvalidateEnquiries();

  const newCount = enquiries.filter((e) => e.status === "new").length;

  async function setStatus(item: EnquiryRow, status: EnquiryRow["status"]) {
    try {
      await adminUpdateEnquiryStatus({ data: { id: item.id, status } });
      invalidate();
    } catch (e: any) {
      toast.error(e?.message ?? "Update failed");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Messages submitted through the contact form.
          {newCount > 0 && (
            <span className="ml-2 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
              {newCount} new
            </span>
          )}
        </p>
      </div>

      {isLoading ? (
        <div className="mt-10 text-sm text-muted-foreground">Loading…</div>
      ) : enquiries.length === 0 ? (
        <div className="mt-10 rounded-sm border border-dashed border-border/60 p-14 text-center">
          <p className="font-serif text-2xl text-foreground">No enquiries yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Messages sent through the contact form will show up here.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {enquiries.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl border p-5 ${
                item.status === "new" ? "border-primary/30 bg-primary/5" : "border-border/60"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-serif text-lg text-foreground">{item.name}</p>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${STATUS_STYLES[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <a
                      href={`mailto:${item.email}`}
                      className="inline-flex items-center gap-1 hover:text-primary"
                    >
                      <Mail className="h-3 w-3" /> {item.email}
                    </a>
                    {item.phone && (
                      <a
                        href={`tel:${item.phone}`}
                        className="inline-flex items-center gap-1 hover:text-primary"
                      >
                        <Phone className="h-3 w-3" /> {item.phone}
                      </a>
                    )}
                    <span className="uppercase tracking-wider">{item.enquiry_type}</span>
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {item.status !== "read" && (
                    <button
                      onClick={() => setStatus(item, "read")}
                      title="Mark as read"
                      className="rounded-sm border border-input p-2 hover:bg-accent"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                  )}
                  {item.status !== "new" && (
                    <button
                      onClick={() => setStatus(item, "new")}
                      title="Mark as new"
                      className="rounded-sm border border-input p-2 hover:bg-accent"
                    >
                      <Circle className="h-4 w-4" />
                    </button>
                  )}
                  {item.status !== "archived" && (
                    <button
                      onClick={() => setStatus(item, "archived")}
                      title="Archive"
                      className="rounded-sm border border-input p-2 hover:bg-accent"
                    >
                      <Archive className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-foreground/90">{item.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
