import { getSql } from "@/integrations/db/client.server";

export async function userHasRole(userId: string, role: "admin" | "editor" = "admin"): Promise<boolean> {
  const sql = getSql();
  const rows = await sql`
    SELECT 1 FROM user_roles
    WHERE user_id = ${userId}::uuid AND role = ${role}::app_role
    LIMIT 1
  `;
  return rows.length > 0;
}

export async function grantAdminRole(userId: string): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO user_roles (user_id, role)
    VALUES (${userId}::uuid, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING
  `;
}
