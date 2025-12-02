# Cache

Cache management for GraphWork Framework 2.0

## Overview

The Cache module provides efficient caching mechanisms for the GraphWork Framework. It includes implementations of LRU (Least Recently Used) cache and memory cache to optimize performance and reduce redundant computations.

## Installation

```bash
npm install graphwork-cache
```

## Features

- **LRU Cache**: Implements Least Recently Used eviction policy
- **Memory Cache**: Simple in-memory caching solution
- **TTL Support**: Time-to-live expiration for cached items
- **Performance Optimized**: Efficient memory usage and fast access times
- **TypeScript Support**: Full TypeScript definitions included

## Usage

### LRU Cache

```typescript
import { LRUCache } from 'graphwork-cache';

// Create an LRU cache with a maximum size of 100 items
const cache = new LRUCache<string>({
  maxSize: 100,
  ttl: 3600000 // 1 hour in milliseconds
});

// Set a value
cache.set('key1', 'value1');

// Get a value
const value = cache.get('key1');

// Check if a key exists
const exists = cache.has('key1');

// Delete a key
cache.delete('key1');

// Clear all entries
cache.clear();
```

### Memory Cache

```typescript
import { MemoryCache } from 'graphwork-cache';

// Create a memory cache
const cache = new MemoryCache<string>({
  ttl: 1800000 // 30 minutes in milliseconds
});

// Set a value
cache.set('key1', 'value1');

// Get a value
const value = cache.get('key1');
```

### Cache Manager

```typescript
import { CacheManager } from 'graphwork-cache';

// Create a cache manager
const cacheManager = new CacheManager({
  maxSize: 1000
});

// Create different cache instances
const userCache = cacheManager.createLRUCache<User>('users');
const productCache = cacheManager.createMemoryCache<Product>('products');

// Use caches
userCache.set('user1', { id: 'user1', name: 'John Doe' });
const user = userCache.get('user1');
```

## API

### LRUCache

#### Constructor
```typescript
new LRUCache<T>(config: CacheConfig)
```

#### Methods
- `set(key: string, value: T): void` - Sets a value in the cache
- `get(key: string): T | undefined` - Gets a value from the cache
- `has(key: string): boolean` - Checks if a key exists in the cache
- `delete(key: string): boolean` - Deletes a key from the cache
- `clear(): void` - Clears all entries from the cache
- `size(): number` - Returns the number of entries in the cache
- `maxSize(): number` - Returns the maximum size of the cache

### MemoryCache

#### Constructor
```typescript
new MemoryCache<T>(config: CacheConfig)
```

#### Methods
- `set(key: string, value: T): void` - Sets a value in the cache
- `get(key: string): T | undefined` - Gets a value from the cache
- `has(key: string): boolean` - Checks if a key exists in the cache
- `delete(key: string): boolean` - Deletes a key from the cache
- `clear(): void` - Clears all entries from the cache
- `size(): number` - Returns the number of entries in the cache

### CacheManager

#### Constructor
```typescript
new CacheManager(config: CacheManagerConfig)
```

#### Methods
- `createLRUCache<T>(name: string, config?: CacheConfig): LRUCache<T>` - Creates a new LRU cache
- `createMemoryCache<T>(name: string, config?: CacheConfig): MemoryCache<T>` - Creates a new memory cache
- `getCache(name: string): Cache | undefined` - Gets a cache by name
- `deleteCache(name: string): boolean` - Deletes a cache by name
- `clearAll(): void` - Clears all caches
- `getAllStats(): Record<string, CacheStats>` - Gets statistics for all caches

## Configuration

### CacheConfig
```typescript
interface CacheConfig {
  maxSize?: number;    // Maximum number of items (for LRU cache)
  ttl?: number;        // Time to live in milliseconds
}
```

### CacheManagerConfig
```typescript
interface CacheManagerConfig {
  maxSize?: number;    // Default maximum size for caches
}
```

## Performance

The cache implementations are optimized for:
- Fast O(1) access times
- Efficient memory usage
- Automatic cleanup of expired entries
- Minimal garbage collection overhead

## Contributing

See our [Contributing Guide](https://github.com/graphmind/graphwork-framework/blob/main/CONTRIBUTING.md) for information on how to contribute to this package.

## License

This package is licensed under the MIT License. See the [LICENSE](https://github.com/graphmind/graphwork-framework/blob/main/LICENSE) file for details.