"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevelopmentTools = void 0;
const perf_hooks_1 = require("perf_hooks");
class DevelopmentTools {
    static logInfo(message) {
        console.log(`[INFO] ${message}`);
    }
    static logWarning(message) {
        console.warn(`[WARNING] ${message}`);
    }
    static logError(message) {
        console.error(`[ERROR] ${message}`);
    }
    // Accept both sync and async functions, and use high-resolution timer to avoid flaky assertions
    static async measurePerformance(fn) {
        const start = perf_hooks_1.performance.now();
        const result = await Promise.resolve(fn());
        const duration = Math.max(0, Math.round(perf_hooks_1.performance.now() - start));
        return { result, duration };
    }
}
exports.DevelopmentTools = DevelopmentTools;
//# sourceMappingURL=index.js.map