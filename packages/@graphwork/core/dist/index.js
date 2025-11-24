"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphWorkCore = void 0;
// packages/@graphwork/core/src/index.ts
class GraphWorkCore {
    constructor(config = {}) {
        this.config = config;
        console.log('GraphWork Core initialized');
    }
    async processRequest(request) {
        // Logique de base du framework
        console.log('Processing request:', request);
        return { success: true, data: 'Request processed' };
    }
}
exports.GraphWorkCore = GraphWorkCore;
//# sourceMappingURL=index.js.map