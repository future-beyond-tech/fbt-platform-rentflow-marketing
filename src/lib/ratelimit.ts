import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const getRatelimit = (): Ratelimit | null => {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, "1 h"),
  });
};

/** Returns true if allowed, false if rate limited. */
export async function checkRateLimit(identifier: string): Promise<boolean> {
  const rl = getRatelimit();
  if (!rl) return true;
  const { success } = await rl.limit(identifier);
  return success;
}
