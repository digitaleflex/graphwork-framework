// packages/@graphwork/cache/__tests__/CacheManager.test.ts
import { CacheManager } from '../src/CacheManager';
import { LRUCache } from '../src/LRUCache';
import { MemoryCache } from '../src/MemoryCache';

describe('CacheManager', () => {
  let cacheManager: CacheManager;

  beforeEach(() => {
    cacheManager = new CacheManager({ maxSize: 100 });
  });

  describe('constructor', () => {
    it('should create a cache manager with default configuration', () => {
      const defaultManager = new CacheManager();
      expect(defaultManager).toBeInstanceOf(CacheManager);
    });

    it('should create a cache manager with custom configuration', () => {
      const customManager = new CacheManager({ maxSize: 50, ttl: 1000 });
      expect(customManager).toBeInstanceOf(CacheManager);
    });
  });

  describe('createLRUCache', () => {
    it('should create a new LRU cache', () => {
      const cache = cacheManager.createLRUCache<string>('test-lru');
      expect(cache).toBeInstanceOf(LRUCache);
      expect(cacheManager.getCache('test-lru')).toBe(cache);
    });

    it('should create a cache with merged configuration', () => {
      const cache = cacheManager.createLRUCache<string>('test-lru-config', { maxSize: 50 });
      expect(cache).toBeInstanceOf(LRUCache);
    });
  });

  describe('createMemoryCache', () => {
    it('should create a new memory cache', () => {
      const cache = cacheManager.createMemoryCache<string>('test-memory');
      expect(cache).toBeInstanceOf(MemoryCache);
      expect(cacheManager.getCache('test-memory')).toBe(cache);
    });

    it('should create a cache with merged configuration', () => {
      const cache = cacheManager.createMemoryCache<string>('test-memory-config', { maxSize: 50 });
      expect(cache).toBeInstanceOf(MemoryCache);
    });
  });

  describe('getCache', () => {
    it('should return an existing cache', () => {
      const cache = cacheManager.createLRUCache<string>('test-cache');
      expect(cacheManager.getCache('test-cache')).toBe(cache);
    });

    it('should return undefined for non-existent caches', () => {
      expect(cacheManager.getCache('nonexistent')).toBeUndefined();
    });
  });

  describe('getOrCreateCache', () => {
    it('should return an existing cache', () => {
      const existingCache = cacheManager.createLRUCache<string>('test-existing');
      const cache = cacheManager.getOrCreateCache<string>('test-existing');
      expect(cache).toBe(existingCache);
    });

    it('should create a new cache if it does not exist', () => {
      const cache = cacheManager.getOrCreateCache<string>('test-new');
      expect(cache).toBeInstanceOf(LRUCache);
      expect(cacheManager.getCache('test-new')).toBe(cache);
    });

    it('should create a memory cache if specified', () => {
      const cache = cacheManager.getOrCreateCache<string>('test-memory-new', 'memory');
      expect(cache).toBeInstanceOf(MemoryCache);
    });
  });

  describe('deleteCache', () => {
    it('should delete an existing cache', () => {
      cacheManager.createLRUCache<string>('test-delete');
      expect(cacheManager.deleteCache('test-delete')).toBe(true);
      expect(cacheManager.getCache('test-delete')).toBeUndefined();
    });

    it('should return false for non-existent caches', () => {
      expect(cacheManager.deleteCache('nonexistent')).toBe(false);
    });
  });

  describe('clearAll', () => {
    it('should clear all caches', () => {
      const cache1 = cacheManager.createLRUCache<string>('test-clear-1');
      const cache2 = cacheManager.createMemoryCache<string>('test-clear-2');
      
      cache1.set('key1', 'value1');
      cache2.set('key2', 'value2');
      
      cacheManager.clearAll();
      
      expect(cache1.size()).toBe(0);
      expect(cache2.size()).toBe(0);
      expect(cacheManager.getCacheNames()).toHaveLength(0);
    });
  });

  describe('getAllStats', () => {
    it('should return statistics for all caches', () => {
      const cache1 = cacheManager.createLRUCache<string>('test-stats-1');
      const cache2 = cacheManager.createMemoryCache<string>('test-stats-2');
      
      cache1.set('key1', 'value1');
      cache2.set('key2', 'value2');
      
      const stats = cacheManager.getAllStats();
      expect(stats).toHaveProperty('test-stats-1');
      expect(stats).toHaveProperty('test-stats-2');
      expect(stats['test-stats-1'].size).toBe(1);
      expect(stats['test-stats-2'].size).toBe(1);
    });
  });

  describe('getCacheNames', () => {
    it('should return all cache names', () => {
      cacheManager.createLRUCache<string>('cache1');
      cacheManager.createMemoryCache<string>('cache2');
      
      const names = cacheManager.getCacheNames();
      expect(names).toEqual(['cache1', 'cache2']);
    });
  });

  describe('getTotalSize', () => {
    it('should return the total size of all caches', () => {
      const cache1 = cacheManager.createLRUCache<string>('test-size-1');
      const cache2 = cacheManager.createMemoryCache<string>('test-size-2');
      
      cache1.set('key1', 'value1');
      cache2.set('key2', 'value2');
      cache2.set('key3', 'value3');
      
      expect(cacheManager.getTotalSize()).toBe(3);
    });
  });

  describe('preloadCache', () => {
    it('should preload a cache with data', () => {
      const cache = cacheManager.createLRUCache<string>('test-preload');
      const data = { key1: 'value1', key2: 'value2' };
      
      cacheManager.preloadCache('test-preload', data);
      
      expect(cache.get('key1')).toBe('value1');
      expect(cache.get('key2')).toBe('value2');
    });

    it('should throw an error for non-existent caches', () => {
      const data = { key1: 'value1' };
      expect(() => {
        cacheManager.preloadCache('nonexistent', data);
      }).toThrow('Cache nonexistent not found');
    });
  });

  describe('exportCache and importCache', () => {
    it('should export and import cache data', () => {
      const cache = cacheManager.createLRUCache<string>('test-export');
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      
      const data = cacheManager.exportCache<string>('test-export');
      expect(data).toEqual({ key1: 'value1', key2: 'value2' });
      
      // Create a new cache and import data
      const newCache = cacheManager.createLRUCache<string>('test-import');
      cacheManager.importCache('test-import', data);
      
      expect(newCache.get('key1')).toBe('value1');
      expect(newCache.get('key2')).toBe('value2');
    });

    it('should throw an error for non-existent caches', () => {
      expect(() => {
        cacheManager.exportCache('nonexistent');
      }).toThrow('Cache nonexistent not found');
      
      expect(() => {
        cacheManager.importCache('nonexistent', {});
      }).toThrow('Cache nonexistent not found');
    });
  });
});