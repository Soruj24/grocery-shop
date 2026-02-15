import { NextResponse } from "next/server";

// Simple in-memory rate limiting map
// Note: In production, use Redis or a similar store for distributed rate limiting
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const LIMIT = 50; // Max requests
const WINDOW = 60 * 1000; // 1 minute window

export function rateLimit(ip: string) {
  const now = Date.now();
  const userData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  if (now - userData.lastReset > WINDOW) {
    userData.count = 1;
    userData.lastReset = now;
  } else {
    userData.count++;
  }

  rateLimitMap.set(ip, userData);

  return {
    success: userData.count <= LIMIT,
    remaining: Math.max(0, LIMIT - userData.count),
    reset: userData.lastReset + WINDOW
  };
}
