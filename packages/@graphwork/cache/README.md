# @graphwork/cache

Cache management system for GraphWork Framework 2.0

## Overview

The `@graphwork/cache` package provides a comprehensive caching solution for the GraphWork Framework. It includes implementations of LRU (Least Recently Used) and Memory caches with features like TTL (Time To Live), statistics tracking, and cache management.

## Features

- **LRU Cache**: Automatically evicts least recently used items when maxSize is reached
- **Memory Cache**: Simple in-memory cache with size limits
- **TTL Support**: Automatic expiration of cached items
- **Statistics**: Hit/miss ratios, eviction counts, and other metrics
- **Cache Manager**: Centralized management of multiple caches
- **Async Fetch**: Automatic fetching and caching of data
- **Preloading**: Bulk loading of cache data
- **Export/Import**: Serialization and deserialization of cache data

## Installation

```bash
npm install @graphwork/cache
```

## Usage

### Basic LRU Cache

```typescript
import { LRUCache } from '@graphwork/cache';

// Create a new LRU cache with a maximum size of 100 items
const cache = new LRUCache<string>({ maxSize: 100 });

// Set values
cache.set('key1', 'value1');
cache.set('key2', 'value2', 5000); // TTL of 5 seconds

// Get values
const value1 = cache.get('key1');
const value2 = cache.get('key2');

// Check if key exists
if (cache.has('key1')) {
  console.log('Key exists');
}

// Delete a key
cache.delete('key1');

// Clear all items
cache.clear();
```

### Memory Cache

```typescript
import { MemoryCache } from '@graphwork/cache';

// Create a new memory cache with a maximum size of 50 items
const cache = new MemoryCache<string>({ maxSize: 50 });

// Set values (throws error if maxSize is exceeded)
cache.set('key1', 'value1');

// Get values
const value1 = cache.get('key1');
```

### Cache Manager

```typescript
import { CacheManager } from '@graphwork/cache';

// Create a cache manager with default configuration
const cacheManager = new CacheManager({ maxSize: 1000, ttl: 30000 });

// Create caches
const userCache = cacheManager.createLRUCache<User>('users');
const productCache = cacheManager.createMemoryCache<Product>('products');

// Get or create cache
const sessionCache = cacheManager.getOrCreateCache<Session>('sessions');

// Preload data
cacheManager.preloadCache('users', {
  'user1': { id: 'user1', name: 'John Doe' },
  'user2': { id: 'user2', name: 'Jane Smith' }
});

// Get statistics
const stats = cacheManager.getAllStats();
console.log(stats);
```

### Async Fetch with Caching

```typescript
import { LRUCache } from '@graphwork/cache';

// Create a cache with a fetch method
const cache = new LRUCache<User>({
  maxSize: 100,
  ttl: 60000, // 1 minute
  fetchMethod: async (userId: string) => {
    // Fetch user from database or API
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }
});

// Fetch user (automatically cached)
const user = await cache.fetch('user123');

// Subsequent calls will return cached value
const sameUser = await cache.fetch('user123');
```

## Configuration Options

### CacheConfig

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| maxSize | number | 1000 | Maximum number of items in cache |
| ttl | number | 0 | Time to live in milliseconds (0 = no expiration) |
| maxAge | number | 0 | Maximum age in milliseconds |
| updateAgeOnGet | boolean | false | Update item age on get |
| dispose | function | noop | Called when item is removed |
| disposeAfter | function | noop | Called after item is removed |
| noDisposeOnSet | boolean | false | Don't call dispose when overwriting |
| ttlAutopurge | boolean | false | Automatically remove expired items |
| allowStale | boolean | false | Allow returning stale items |
| noDeleteOnStaleGet | boolean | false | Don't delete stale items on get |
| fetchMethod | function | undefined | Async function to fetch data |

## API Reference

### LRUCache

- `get(key: string): T | undefined`
- `set(key: string, value: T, ttl?: number): void`
- `has(key: string): boolean`
- `delete(key: string): boolean`
- `clear(): void`
- `size(): number`
- `stats(): CacheStats`
- `keys(): string[]`
- `values(): T[]`
- `entries(): [string, T][]`
- `fetch(key: string): Promise<T | undefined>`

### MemoryCache

Same API as LRUCache but throws error when maxSize is exceeded.

### CacheManager

- `createLRUCache<T>(name: string, config?: CacheConfig): LRUCache<T>`
- `createMemoryCache<T>(name: string, config?: CacheConfig): MemoryCache<T>`
- `getCache<T>(name: string): CacheInterface<T> | undefined`
- `getOrCreateCache<T>(name: string, type?: 'lru' | 'memory', config?: CacheConfig): CacheInterface<T>`
- `deleteCache(name: string): boolean`
- `clearAll(): void`
- `getAllStats(): Record<string, CacheStats>`
- `getCacheNames(): string[]`
- `getTotalSize(): number`
- `preloadCache<T>(name: string, data: Record<string, T>, ttl?: number): void`
- `exportCache<T>(name: string): Record<string, T>`
- `importCache<T>(name: string, data: Record<string, T>, ttl?: number): void`

## Performance Considerations

- LRU cache is optimized for frequent access patterns
- Memory cache is faster but has stricter size limits
- Use appropriate TTL values to balance performance and data freshness
- Monitor cache statistics to optimize configuration
- Consider using fetchMethod for automatic data fetching and caching

## License

MIT © GraphMind Organization