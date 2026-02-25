/**
 * Centralized env access. Add schema validation (e.g. zod) in production.
 */
function getEnv(key: string, fallback?: string): string {
  if (typeof process.env[key] !== "undefined") return process.env[key]!;
  if (fallback !== undefined) return fallback;
  return "";
}

export const env = {
  nextPublicSiteUrl: getEnv("NEXT_PUBLIC_SITE_URL", "https://rentflow.in"),
  nodeEnv: getEnv("NODE_ENV", "development"),
} as const;
