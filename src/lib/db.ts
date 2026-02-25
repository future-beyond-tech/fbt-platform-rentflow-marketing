import { neon } from "@neondatabase/serverless";

export type NeonSql = ReturnType<typeof neon>;

/** Lazy Neon client to avoid build-time errors when DATABASE_URL is unset. */
export function getSql(): NeonSql | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}
