"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QualityReviewer = void 0;
// ai-agents/src/quality-reviewer.ts
const ai_agent_1 = require("./ai-agent");
class QualityReviewer extends ai_agent_1.AIAgent {
    constructor(config) {
        super(config);
    }
    async execute(prompt, context = {}) {
        // Load relevant context if provided
        let loadedContext = {};
        if (context.contextPath) {
            loadedContext = await this.loadContext(context.contextPath);
        }
        // Create a comprehensive prompt for quality review
        const reviewPrompt = `
You are a quality reviewer AI assistant. Your task is to review code or specifications for quality, security, and adherence to best practices.

Item to Review: ${prompt}

Context Information:
${JSON.stringify({ ...loadedContext, ...context }, null, 2)}

Please provide a detailed review that includes:

1. Code Quality Assessment
   - Readability and maintainability
   - Adherence to coding standards
   - Code organization and structure

2. Security Review
   - Potential vulnerabilities
   - Security best practices compliance
   - Input validation and sanitization

3. Performance Analysis
   - Efficiency considerations
   - Potential bottlenecks
   - Optimization suggestions

4. Best Practices Compliance
   - Industry standard adherence
   - Framework-specific guidelines
   - Documentation quality

5. Recommendations for Improvement
   - Specific suggestions for enhancement
   - Priority levels for each recommendation

Format your response as a structured review report with clear headings and actionable feedback.
`;
        try {
            const result = await this.aiIntegration.generateCode(reviewPrompt, context);
            // Validate the generated review
            const isValid = await this.validateOutput(result);
            if (!isValid) {
                throw new Error('Generated review failed validation');
            }
            return result;
        }
        catch (error) {
            console.error('Failed to generate review:', error);
            throw error;
        }
    }
}
exports.QualityReviewer = QualityReviewer;
//# sourceMappingURL=quality-reviewer.js.map