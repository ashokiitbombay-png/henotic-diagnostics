import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const { mockGetRedis, mockLimit, MockRatelimit } = vi.hoisted(() => {
  const limitFn = vi.fn();
  const getRedisFn = vi.fn();
  class FakeRatelimit {
    static slidingWindow = vi.fn(() => 'sliding-window-config');
    limit = limitFn;
  }
  return {
    mockGetRedis: getRedisFn,
    mockLimit: limitFn,
    MockRatelimit: FakeRatelimit,
  };
});

vi.mock('@/lib/cache/redis', () => ({
  getRedis: mockGetRedis,
}));

vi.mock('@upstash/ratelimit', () => ({
  Ratelimit: MockRatelimit,
}));

import { rateLimitDistributed, resetRateLimitMemoryStore } from '@/lib/rate-limit';

describe('Distributed Rate Limiter with In-Memory Fallback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetRateLimitMemoryStore();
  });

  afterEach(() => {
    resetRateLimitMemoryStore();
  });

  it('enforces limits via in-memory sliding window when Redis is unconfigured', async () => {
    mockGetRedis.mockReturnValue(null);

    const r1 = await rateLimitDistributed('test-fallback-key', 2, 60_000);
    expect(r1.success).toBe(true);
    expect(r1.remaining).toBe(1);

    const r2 = await rateLimitDistributed('test-fallback-key', 2, 60_000);
    expect(r2.success).toBe(true);
    expect(r2.remaining).toBe(0);

    const r3 = await rateLimitDistributed('test-fallback-key', 2, 60_000);
    expect(r3.success).toBe(false);
    expect(r3.remaining).toBe(0);
    expect(mockLimit).not.toHaveBeenCalled();
  });

  it('uses @upstash/ratelimit when Redis client is configured', async () => {
    const fakeRedisClient = { id: 'mock-redis-client' };
    mockGetRedis.mockReturnValue(fakeRedisClient);
    mockLimit.mockResolvedValue({
      success: true,
      remaining: 4,
      reset: 1790000000000,
    });

    const result = await rateLimitDistributed('booking:1.2.3.4', 5, 60_000);
    expect(MockRatelimit.slidingWindow).toHaveBeenCalledWith(5, '60 s');
    expect(mockLimit).toHaveBeenCalledWith('booking:1.2.3.4');
    expect(result).toEqual({
      success: true,
      remaining: 4,
      resetTime: 1790000000000,
    });
  });

  it('falls back cleanly to in-memory limiter if Redis throws at runtime', async () => {
    const fakeRedisClient = { id: 'mock-redis-failing' };
    mockGetRedis.mockReturnValue(fakeRedisClient);
    mockLimit.mockRejectedValue(new Error('Upstash connection timed out'));

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const res = await rateLimitDistributed('otp-ip:5.6.7.8', 1, 60_000);
    expect(res.success).toBe(true);
    expect(res.remaining).toBe(0);

    const blocked = await rateLimitDistributed('otp-ip:5.6.7.8', 1, 60_000);
    expect(blocked.success).toBe(false);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
