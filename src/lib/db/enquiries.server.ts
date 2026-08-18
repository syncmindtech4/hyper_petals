import { getSql } from "@/integrations/db/client.server";

// Row shape as stored in Postgres (see schema.sql / enquiries table)
export type EnquiryRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  enquiry_type: string;
  message: string;
  status: "new" | "read" | "archived";
  created_at: string;
};

export type NewEnquiry = {
  name: string;
  email: string;
  phone?: string;
  enquiryType: string;
  message: string;
};

export async function createEnquiry(input: NewEnquiry): Promise<EnquiryRow> {
  const sql = getSql();
  const rows = await sql`
    INSERT INTO enquiries (name, email, phone, enquiry_type, message)
    VALUES (${input.name}, ${input.email}, ${input.phone ?? null}, ${input.enquiryType}, ${input.message})
    RETURNING id, name, email, phone, enquiry_type, message, status, created_at
  `;
  return rows[0] as EnquiryRow;
}

export async function listEnquiriesAdmin(): Promise<EnquiryRow[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT id, name, email, phone, enquiry_type, message, status, created_at
    FROM enquiries
    ORDER BY created_at DESC
  `;
  return rows as EnquiryRow[];
}

export async function updateEnquiryStatus(id: string, status: EnquiryRow["status"]): Promise<void> {
  const sql = getSql();
  await sql`UPDATE enquiries SET status = ${status} WHERE id = ${id}`;
}
