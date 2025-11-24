// packages/@graphwork/tools/src/index.ts
export class DevelopmentTools {
  static logInfo(message: string): void {
    console.log(`[INFO] ${message}`);
  }

  static logWarning(message: string): void {
    console.warn(`[WARNING] ${message}`);
  }

  static logError(message: string): void {
    console.error(`[ERROR] ${message}`);
  }

  static async measurePerformance<T>(fn: () => Promise<T>): Promise<{ result: T, duration: number }> {
    const start = Date.now();
    const result = await fn();
    const duration = Date.now() - start;
    return { result, duration };
  }
}