import { CacheInterface, CacheConfig, CacheStats } from './types';
export declare class LRUCache<T = any> implements CacheInterface<T> {
    private cache;
    private config;
    private hitCount;
    private missCount;
    private evictionCount;
    constructor(config?: CacheConfig);
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
    private isExpired;
    private purgeExpired;
    fetch(key: string): Promise<T | undefined>;
}
//# sourceMappingURL=LRUCache.d.ts.map