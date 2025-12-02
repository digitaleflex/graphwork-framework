"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheManager = void 0;
// packages/@graphwork/cache/src/CacheManager.ts
const LRUCache_1 = require("./LRUCache");
const MemoryCache_1 = require("./MemoryCache");
class CacheManager {
    constructor(defaultConfig = {}) {
        this.caches = new Map();
        this.defaultConfig = defaultConfig;
    }
    // Create a new LRU cache
    createLRUCache(name, config = {}) {
        const cacheConfig = { ...this.defaultConfig, ...config };
        const cache = new LRUCache_1.LRUCache(cacheConfig);
        this.caches.set(name, cache);
        return cache;
    }
    // Create a new memory cache
    createMemoryCache(name, config = {}) {
        const cacheConfig = { ...this.defaultConfig, ...config };
        const cache = new MemoryCache_1.MemoryCache(cacheConfig);
        this.caches.set(name, cache);
        return cache;
    }
    // Get an existing cache
    getCache(name) {
        return this.caches.get(name);
    }
    // Get or create a cache
    getOrCreateCache(name, type = 'lru', config = {}) {
        const existingCache = this.getCache(name);
        if (existingCache) {
            return existingCache;
        }
        if (type === 'lru') {
            return this.createLRUCache(name, config);
        }
        else {
            return this.createMemoryCache(name, config);
        }
    }
    // Delete a cache
    deleteCache(name) {
        const cache = this.caches.get(name);
        if (cache) {
            cache.clear();
            return this.caches.delete(name);
        }
        return false;
    }
    // Clear all caches
    clearAll() {
        for (const cache of this.caches.values()) {
            cache.clear();
        }
        this.caches.clear();
    }
    // Get stats for all caches
    getAllStats() {
        const stats = {};
        for (const [name, cache] of this.caches.entries()) {
            stats[name] = cache.stats();
        }
        return stats;
    }
    // Get cache names
    getCacheNames() {
        return Array.from(this.caches.keys());
    }
    // Get total size of all caches
    getTotalSize() {
        let totalSize = 0;
        for (const cache of this.caches.values()) {
            totalSize += cache.size();
        }
        return totalSize;
    }
    // Preload cache with data
    preloadCache(name, data, ttl) {
        const cache = this.getCache(name);
        if (!cache) {
            throw new Error(`Cache ${name} not found`);
        }
        for (const [key, value] of Object.entries(data)) {
            cache.set(key, value, ttl);
        }
    }
    // Export cache data
    exportCache(name) {
        const cache = this.getCache(name);
        if (!cache) {
            throw new Error(`Cache ${name} not found`);
        }
        const data = {};
        for (const [key, value] of cache.entries()) {
            data[key] = value;
        }
        return data;
    }
    // Import cache data
    importCache(name, data, ttl) {
        const cache = this.getCache(name);
        if (!cache) {
            throw new Error(`Cache ${name} not found`);
        }
        for (const [key, value] of Object.entries(data)) {
            cache.set(key, value, ttl);
        }
    }
}
exports.CacheManager = CacheManager;
//# sourceMappingURL=CacheManager.js.map