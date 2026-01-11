import type { TrpcContext } from "./context";

type RateLimitOptions = {
  windowMs: number;
  max: number;
  key?: (ctx: TrpcContext) => string;
};

const buckets = new Map<string, { count: number; resetAt: number }>();

const defaultKey = (ctx: TrpcContext) => ctx.req.ip || "unknown";

export function checkRateLimit(ctx: TrpcContext, options: RateLimitOptions) {
  const key = options.key ? options.key(ctx) : defaultKey(ctx);
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + options.windowMs });
    return;
  }

  if (entry.count >= options.max) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    const error = new Error("RATE_LIMIT");
    (error as Error & { retryAfter?: number }).retryAfter = retryAfter;
    throw error;
  }

  entry.count += 1;
}
