"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationWriter = void 0;
// ai-agents/src/specification-writer.ts
const ai_agent_1 = require("./ai-agent");
class SpecificationWriter extends ai_agent_1.AIAgent {
    constructor(config) {
        super(config);
    }
    async execute(prompt, context = {}) {
        // Load relevant context if provided
        let loadedContext = {};
        if (context.contextPath) {
            loadedContext = await this.loadContext(context.contextPath);
        }
        // Create a comprehensive prompt for writing specifications
        const specPrompt = `
You are a specification writer AI assistant. Your task is to create clear, comprehensive, and well-structured specifications based on the user's request.

User Request: ${prompt}

Context Information:
${JSON.stringify({ ...loadedContext, ...context }, null, 2)}

Please generate a specification document that includes:

1. Overview and Objectives
2. Functional Requirements
3. Non-Functional Requirements
4. Technical Constraints
5. Success Criteria
6. Assumptions and Dependencies

Format the specification in a clear, professional manner with appropriate headings and structure.
`;
        try {
            const result = await this.aiIntegration.generateCode(specPrompt, context);
            // Validate the generated specification
            const isValid = await this.validateOutput(result);
            if (!isValid) {
                throw new Error('Generated specification failed validation');
            }
            return result;
        }
        catch (error) {
            console.error('Failed to generate specification:', error);
            throw error;
        }
    }
}
exports.SpecificationWriter = SpecificationWriter;
//# sourceMappingURL=specification-writer.js.map