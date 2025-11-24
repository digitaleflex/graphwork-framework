"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIAgent = void 0;
// ai-agents/src/ai-agent.ts
const ai_integration_1 = require("@graphwork/ai-integration");
const knowledge_base_1 = require("@graphwork/knowledge-base");
const templates_1 = require("@graphwork/templates");
class AIAgent {
    constructor(config) {
        this.name = config.name;
        this.description = config.description;
        this.aiIntegration = new ai_integration_1.AIIntegration(config.aiConfig);
        this.knowledgeBase = new knowledge_base_1.KnowledgeBase();
        this.templateEngine = new templates_1.TemplateEngine();
    }
    async loadContext(contextPath) {
        try {
            return await this.knowledgeBase.loadContext(contextPath);
        }
        catch (error) {
            console.warn(`Failed to load context from ${contextPath}:`, error);
            return {};
        }
    }
    async generateWithTemplate(templateName, data) {
        try {
            return await this.templateEngine.renderTemplate(templateName, data);
        }
        catch (error) {
            console.warn(`Failed to render template ${templateName}:`, error);
            return '';
        }
    }
    async validateOutput(output) {
        try {
            return await this.aiIntegration.validateResponse(output);
        }
        catch (error) {
            console.warn('Failed to validate output:', error);
            return false;
        }
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
}
exports.AIAgent = AIAgent;
//# sourceMappingURL=ai-agent.js.map