const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60;

const ipRequests = new Map<string, { count: number; expiresAt: number }>();

export function rateLimit(ip: string): { success: boolean } {
  const now = Date.now();
  const requestInfo = ipRequests.get(ip);

  if (!requestInfo || now > requestInfo.expiresAt) {
    ipRequests.set(ip, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { success: true };
  }

  if (requestInfo.count >= MAX_REQUESTS_PER_WINDOW) {
    return { success: false };
  }

  requestInfo.count += 1;
  return { success: true };
}
