"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeBase = void 0;
// packages/@graphwork/knowledge-base/src/index.ts
const fs = __importStar(require("fs-extra"));
class KnowledgeBase {
    constructor() {
        this.context = {};
    }
    async loadContext(contextPath) {
        if (await fs.pathExists(contextPath)) {
            const content = await fs.readFile(contextPath, 'utf-8');
            // Parse and validate context
            this.context = this.parseContext(content);
            return this.context;
        }
        throw new Error(`Context file not found: ${contextPath}`);
    }
    parseContext(content) {
        // Simple parsing for markdown content
        // In a real implementation, this would be more sophisticated
        return {
            rawContent: content,
            processed: true,
            lastUpdated: new Date()
        };
    }
    getContext() {
        return this.context;
    }
    async updateContext(contextPath, updates) {
        // Logic to update context in the knowledge base
        const existingContext = await this.loadContext(contextPath);
        const newContent = { ...existingContext, ...updates };
        // In a real implementation, this would update the actual file
    }
}
exports.KnowledgeBase = KnowledgeBase;
//# sourceMappingURL=index.js.map