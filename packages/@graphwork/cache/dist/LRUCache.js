"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LRUCache = void 0;
class LRUCache {
    constructor(config = {}) {
        this.hitCount = 0;
        this.missCount = 0;
        this.evictionCount = 0;
        this.cache = new Map();
        // Set default values for config
        this.config = {
            maxSize: config.maxSize || 1000,
            ttl: config.ttl || 0,
            maxAge: config.maxAge || 0,
            updateAgeOnGet: config.updateAgeOnGet || false,
            dispose: config.dispose || (() => { }),
            disposeAfter: config.disposeAfter || (() => { }),
            noDisposeOnSet: config.noDisposeOnSet || false,
            ttlAutopurge: config.ttlAutopurge || false,
            allowStale: config.allowStale || false,
            noDeleteOnStaleGet: config.noDeleteOnStaleGet || false,
            fetchMethod: config.fetchMethod || undefined
        };
    }
    get(key) {
        const entry = this.cache.get(key);
        if (!entry) {
            this.missCount++;
            return undefined;
        }
        // Check if entry has expired
        if (this.isExpired(entry)) {
            if (!this.config.allowStale || !this.config.noDeleteOnStaleGet) {
                this.delete(key);
            }
            this.missCount++;
            return this.config.allowStale ? entry.value : undefined;
        }
        // Update access time
        if (this.config.updateAgeOnGet) {
            entry.accessedAt = Date.now();
        }
        // Move to end (most recently used)
        this.cache.delete(key);
        this.cache.set(key, entry);
        this.hitCount++;
        return entry.value;
    }
    set(key, value, ttl) {
        const now = Date.now();
        const effectiveTtl = ttl !== undefined ? ttl : this.config.ttl;
        const expiresAt = effectiveTtl > 0 ? now + effectiveTtl : undefined;
        // If cache is at max size, evict least recently used item
        if (this.cache.size >= this.config.maxSize && !this.cache.has(key)) {
            const firstKey = this.cache.keys().next().value;
            if (firstKey) {
                this.delete(firstKey);
                this.evictionCount++;
            }
        }
        // If replacing an existing entry and dispose is configured
        if (this.cache.has(key) && !this.config.noDisposeOnSet) {
            const oldEntry = this.cache.get(key);
            if (oldEntry) {
                this.config.dispose(key, oldEntry.value);
            }
        }
        const entry = {
            key,
            value,
            createdAt: now,
            accessedAt: now,
            expiresAt
        };
        this.cache.set(key, entry);
        // Call disposeAfter if configured
        if (this.config.disposeAfter) {
            // Use setTimeout to call disposeAfter after the set operation
            setTimeout(() => {
                this.config.disposeAfter(key, value);
            }, 0);
        }
        // Auto-purge expired entries if configured
        if (this.config.ttlAutopurge && expiresAt) {
            setTimeout(() => {
                if (this.isExpired(entry)) {
                    this.delete(key);
                }
            }, effectiveTtl);
        }
    }
    has(key) {
        const entry = this.cache.get(key);
        if (!entry)
            return false;
        if (this.isExpired(entry)) {
            if (!this.config.noDeleteOnStaleGet) {
                this.delete(key);
            }
            return false;
        }
        return true;
    }
    delete(key) {
        const entry = this.cache.get(key);
        if (!entry)
            return false;
        this.cache.delete(key);
        // Call dispose if configured
        this.config.dispose(key, entry.value);
        return true;
    }
    clear() {
        // Call dispose for all entries
        for (const [key, entry] of this.cache.entries()) {
            this.config.dispose(key, entry.value);
        }
        this.cache.clear();
        this.hitCount = 0;
        this.missCount = 0;
        this.evictionCount = 0;
    }
    size() {
        // Remove expired entries before returning size
        this.purgeExpired();
        return this.cache.size;
    }
    stats() {
        const totalRequests = this.hitCount + this.missCount;
        const hitRate = totalRequests > 0 ? this.hitCount / totalRequests : 0;
        return {
            hits: this.hitCount,
            misses: this.missCount,
            evictions: this.evictionCount,
            size: this.cache.size,
            maxSize: this.config.maxSize,
            hitRate
        };
    }
    keys() {
        this.purgeExpired();
        return Array.from(this.cache.keys());
    }
    values() {
        this.purgeExpired();
        return Array.from(this.cache.values()).map(entry => entry.value);
    }
    entries() {
        this.purgeExpired();
        return Array.from(this.cache.entries()).map(([key, entry]) => [key, entry.value]);
    }
    isExpired(entry) {
        const now = Date.now();
        // Check TTL expiration
        if (entry.expiresAt && now > entry.expiresAt) {
            return true;
        }
        // Check max age expiration
        if (this.config.maxAge > 0 && now - entry.createdAt > this.config.maxAge) {
            return true;
        }
        return false;
    }
    purgeExpired() {
        for (const [key, entry] of this.cache.entries()) {
            if (this.isExpired(entry)) {
                this.delete(key);
            }
        }
    }
    // Async fetch method with caching
    async fetch(key) {
        // Try to get from cache first
        const cached = this.get(key);
        if (cached !== undefined) {
            return cached;
        }
        // If fetchMethod is configured, use it to fetch the value
        if (this.config.fetchMethod) {
            try {
                const value = await this.config.fetchMethod(key);
                this.set(key, value);
                return value;
            }
            catch (error) {
                console.error(`Error fetching key ${key}:`, error);
                return undefined;
            }
        }
        return undefined;
    }
}
exports.LRUCache = LRUCache;
//# sourceMappingURL=LRUCache.js.map