import { performance } from 'perf_hooks';

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

  // Accept both sync and async functions, and use high-resolution timer to avoid flaky assertions
  static async measurePerformance<T>(fn: () => T | Promise<T>): Promise<{ result: T; duration: number }> {
    const start = performance.now();
    const result = await Promise.resolve(fn());
    const duration = Math.max(0, Math.round(performance.now() - start));
    return { result, duration };
  }
}