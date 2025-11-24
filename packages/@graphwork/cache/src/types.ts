// packages/@graphwork/cache/src/types.ts

export interface CacheConfig {
  maxSize?: number;
  ttl?: number; // Time to live in milliseconds
  maxAge?: number; // Maximum age in milliseconds
  updateAgeOnGet?: boolean;
  dispose?: (key: string, value: any) => void;
  disposeAfter?: (key: string, value: any) => void;
  noDisposeOnSet?: boolean;
  ttlAutopurge?: boolean;
  allowStale?: boolean;
  noDeleteOnStaleGet?: boolean;
  fetchMethod?: (key: string) => Promise<any>;
}

export interface CacheEntry<T = any> {
  key: string;
  value: T;
  createdAt: number;
  accessedAt: number;
  expiresAt?: number;
}

export interface CacheStats {
  hits: number;
  misses: number;
  evictions: number;
  size: number;
  maxSize: number;
  hitRate: number;
}

export interface CacheInterface<T = any> {
  get(key: string): T | undefined;
  set(key: string, value: T, ttl?: number): void;
  has(key: string): boolean;
  delete(key: string): boolean;
  clear(): void;
  size(): number;
  stats(): CacheStats;
  keys(): string[];
  values(): T[];
  entries(): [string, T][];
}