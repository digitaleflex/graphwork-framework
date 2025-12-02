import { LRUCache } from './LRUCache';
import { MemoryCache } from './MemoryCache';
import { CacheConfig, CacheInterface, CacheStats } from './types';
export declare class CacheManager {
    private caches;
    private defaultConfig;
    constructor(defaultConfig?: CacheConfig);
    createLRUCache<T = any>(name: string, config?: CacheConfig): LRUCache<T>;
    createMemoryCache<T = any>(name: string, config?: CacheConfig): MemoryCache<T>;
    getCache<T = any>(name: string): CacheInterface<T> | undefined;
    getOrCreateCache<T = any>(name: string, type?: 'lru' | 'memory', config?: CacheConfig): CacheInterface<T>;
    deleteCache(name: string): boolean;
    clearAll(): void;
    getAllStats(): Record<string, CacheStats>;
    getCacheNames(): string[];
    getTotalSize(): number;
    preloadCache<T = any>(name: string, data: Record<string, T>, ttl?: number): void;
    exportCache<T = any>(name: string): Record<string, T>;
    importCache<T = any>(name: string, data: Record<string, T>, ttl?: number): void;
}
//# sourceMappingURL=CacheManager.d.ts.map