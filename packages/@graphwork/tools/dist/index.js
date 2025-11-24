"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevelopmentTools = void 0;
// packages/@graphwork/tools/src/index.ts
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
    static async measurePerformance(fn) {
        const start = Date.now();
        const result = await fn();
        const duration = Date.now() - start;
        return { result, duration };
    }
}
exports.DevelopmentTools = DevelopmentTools;
//# sourceMappingURL=index.js.map