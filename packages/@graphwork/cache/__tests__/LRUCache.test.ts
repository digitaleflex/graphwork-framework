// packages/@graphwork/cache/__tests__/LRUCache.test.ts
import { LRUCache } from '../src/LRUCache';

describe('LRUCache', () => {
  let cache: LRUCache<string>;

  beforeEach(() => {
    cache = new LRUCache<string>({ maxSize: 3 });
  });

  describe('constructor', () => {
    it('should create a cache with default configuration', () => {
      const defaultCache = new LRUCache<string>();
      expect(defaultCache).toBeInstanceOf(LRUCache);
    });

    it('should create a cache with custom configuration', () => {
      const customCache = new LRUCache<string>({ maxSize: 5, ttl: 1000 });
      expect(customCache).toBeInstanceOf(LRUCache);
    });
  });

  describe('set and get', () => {
    it('should store and retrieve values', () => {
      cache.set('key1', 'value1');
      expect(cache.get('key1')).toBe('value1');
    });

    it('should return undefined for non-existent keys', () => {
      expect(cache.get('nonexistent')).toBeUndefined();
    });

    it('should overwrite existing keys', () => {
      cache.set('key1', 'value1');
      cache.set('key1', 'value2');
      expect(cache.get('key1')).toBe('value2');
    });

    it('should evict least recently used items when maxSize is exceeded', () => {
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      cache.set('key3', 'value3');
      
      // Access key1 to make it recently used
      cache.get('key1');
      
      // Add a new item, should evict key2 (least recently used)
      cache.set('key4', 'value4');
      
      expect(cache.get('key1')).toBe('value1');
      expect(cache.get('key2')).toBeUndefined();
      expect(cache.get('key3')).toBe('value3');
      expect(cache.get('key4')).toBe('value4');
    });
  });

  describe('has', () => {
    it('should return true for existing keys', () => {
      cache.set('key1', 'value1');
      expect(cache.has('key1')).toBe(true);
    });

    it('should return false for non-existent keys', () => {
      expect(cache.has('nonexistent')).toBe(false);
    });
  });

  describe('delete', () => {
    it('should remove items from cache', () => {
      cache.set('key1', 'value1');
      expect(cache.delete('key1')).toBe(true);
      expect(cache.get('key1')).toBeUndefined();
    });

    it('should return false for non-existent keys', () => {
      expect(cache.delete('nonexistent')).toBe(false);
    });
  });

  describe('clear', () => {
    it('should remove all items from cache', () => {
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      cache.clear();
      expect(cache.size()).toBe(0);
      expect(cache.get('key1')).toBeUndefined();
      expect(cache.get('key2')).toBeUndefined();
    });
  });

  describe('size', () => {
    it('should return the correct cache size', () => {
      expect(cache.size()).toBe(0);
      cache.set('key1', 'value1');
      expect(cache.size()).toBe(1);
      cache.set('key2', 'value2');
      expect(cache.size()).toBe(2);
    });
  });

  describe('keys, values, entries', () => {
    it('should return correct keys, values, and entries', () => {
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      
      expect(cache.keys()).toEqual(['key1', 'key2']);
      expect(cache.values()).toEqual(['value1', 'value2']);
      expect(cache.entries()).toEqual([['key1', 'value1'], ['key2', 'value2']]);
    });
  });

  describe('stats', () => {
    it('should return correct statistics', () => {
      const stats1 = cache.stats();
      expect(stats1.hits).toBe(0);
      expect(stats1.misses).toBe(0);
      expect(stats1.hitRate).toBe(0);
      
      cache.set('key1', 'value1');
      cache.get('key1'); // hit
      cache.get('nonexistent'); // miss
      
      const stats2 = cache.stats();
      expect(stats2.hits).toBe(1);
      expect(stats2.misses).toBe(1);
      expect(stats2.hitRate).toBe(0.5);
    });
  });

  describe('TTL functionality', () => {
    it('should expire items based on TTL', (done) => {
      const ttlCache = new LRUCache<string>({ ttl: 50 });
      ttlCache.set('key1', 'value1');
      
      expect(ttlCache.get('key1')).toBe('value1');
      
      setTimeout(() => {
        expect(ttlCache.get('key1')).toBeUndefined();
        done();
      }, 100);
    });

    it('should allow stale items if configured', () => {
      const ttlCache = new LRUCache<string>({ ttl: 50, allowStale: true });
      ttlCache.set('key1', 'value1');
      
      expect(ttlCache.get('key1')).toBe('value1');
      
      // Wait for expiration
      setTimeout(() => {
        expect(ttlCache.get('key1')).toBe('value1'); // Should still return stale value
      }, 100);
    });
  });

  describe('fetch method', () => {
    it('should fetch and cache values using fetchMethod', async () => {
      const fetchCache = new LRUCache<string>({
        fetchMethod: async (key: string) => {
          return `fetched-${key}`;
        }
      });

      const value = await fetchCache.fetch('test-key');
      expect(value).toBe('fetched-test-key');
      expect(fetchCache.get('test-key')).toBe('fetched-test-key');
    });

    it('should return cached values without fetching', async () => {
      const fetchCache = new LRUCache<string>({
        fetchMethod: async (key: string) => {
          return `fetched-${key}`;
        }
      });

      fetchCache.set('test-key', 'cached-value');
      const value = await fetchCache.fetch('test-key');
      expect(value).toBe('cached-value');
    });
  });
});