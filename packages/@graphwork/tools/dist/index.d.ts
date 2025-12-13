export declare class DevelopmentTools {
    static logInfo(message: string): void;
    static logWarning(message: string): void;
    static logError(message: string): void;
    static measurePerformance<T>(fn: () => T | Promise<T>): Promise<{
        result: T;
        duration: number;
    }>;
}
//# sourceMappingURL=index.d.ts.map