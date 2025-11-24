// packages/@graphwork/cache/src/CacheManager.ts
import { LRUCache } from './LRUCache';
import { MemoryCache } from './MemoryCache';
import { CacheConfig, CacheInterface, CacheStats } from './types';

export class CacheManager {
  private caches: Map<string, CacheInterface<any>>;
  private defaultConfig: CacheConfig;

  constructor(defaultConfig: CacheConfig = {}) {
    this.caches = new Map<string, CacheInterface<any>>();
    this.defaultConfig = defaultConfig;
  }

  // Create a new LRU cache
  createLRUCache<T = any>(name: string, config: CacheConfig = {}): LRUCache<T> {
    const cacheConfig = { ...this.defaultConfig, ...config };
    const cache = new LRUCache<T>(cacheConfig);
    this.caches.set(name, cache);
    return cache;
  }

  // Create a new memory cache
  createMemoryCache<T = any>(name: string, config: CacheConfig = {}): MemoryCache<T> {
    const cacheConfig = { ...this.defaultConfig, ...config };
    const cache = new MemoryCache<T>(cacheConfig);
    this.caches.set(name, cache);
    return cache;
  }

  // Get an existing cache
  getCache<T = any>(name: string): CacheInterface<T> | undefined {
    return this.caches.get(name);
  }

  // Get or create a cache
  getOrCreateCache<T = any>(name: string, type: 'lru' | 'memory' = 'lru', config: CacheConfig = {}): CacheInterface<T> {
    const existingCache = this.getCache<T>(name);
    if (existingCache) {
      return existingCache;
    }

    if (type === 'lru') {
      return this.createLRUCache<T>(name, config);
    } else {
      return this.createMemoryCache<T>(name, config);
    }
  }

  // Delete a cache
  deleteCache(name: string): boolean {
    const cache = this.caches.get(name);
    if (cache) {
      cache.clear();
      return this.caches.delete(name);
    }
    return false;
  }

  // Clear all caches
  clearAll(): void {
    for (const cache of this.caches.values()) {
      cache.clear();
    }
    this.caches.clear();
  }

  // Get stats for all caches
  getAllStats(): Record<string, CacheStats> {
    const stats: Record<string, CacheStats> = {};
    for (const [name, cache] of this.caches.entries()) {
      stats[name] = cache.stats();
    }
    return stats;
  }

  // Get cache names
  getCacheNames(): string[] {
    return Array.from(this.caches.keys());
  }

  // Get total size of all caches
  getTotalSize(): number {
    let totalSize = 0;
    for (const cache of this.caches.values()) {
      totalSize += cache.size();
    }
    return totalSize;
  }

  // Preload cache with data
  preloadCache<T = any>(name: string, data: Record<string, T>, ttl?: number): void {
    const cache = this.getCache<T>(name);
    if (!cache) {
      throw new Error(`Cache ${name} not found`);
    }

    for (const [key, value] of Object.entries(data)) {
      cache.set(key, value, ttl);
    }
  }

  // Export cache data
  exportCache<T = any>(name: string): Record<string, T> {
    const cache = this.getCache<T>(name);
    if (!cache) {
      throw new Error(`Cache ${name} not found`);
    }

    const data: Record<string, T> = {};
    for (const [key, value] of cache.entries()) {
      data[key] = value;
    }
    return data;
  }

  // Import cache data
  importCache<T = any>(name: string, data: Record<string, T>, ttl?: number): void {
    const cache = this.getCache<T>(name);
    if (!cache) {
      throw new Error(`Cache ${name} not found`);
    }

    for (const [key, value] of Object.entries(data)) {
      cache.set(key, value, ttl);
    }
  }
}