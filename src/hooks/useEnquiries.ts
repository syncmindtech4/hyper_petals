import { useQuery, useQueryClient } from "@tanstack/react-query";
import { adminListEnquiries } from "@/lib/cms.functions";
import type { EnquiryRow } from "@/lib/db/enquiries.server";

export function useAdminEnquiries() {
  return useQuery<EnquiryRow[]>({
    queryKey: ["admin", "enquiries"],
    queryFn: () => adminListEnquiries(),
  });
}

export function useInvalidateEnquiries() {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: ["admin", "enquiries"] });
  };
}

export type { EnquiryRow };
