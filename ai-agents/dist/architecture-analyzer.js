"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchitectureAnalyzer = void 0;
// ai-agents/src/architecture-analyzer.ts
const index_1 = require("./index");
class ArchitectureAnalyzer extends index_1.BaseAgent {
    constructor(aiIntegration, knowledgeBase) {
        super('Architecture Analyzer', 'Analyzes system architecture and provides recommendations');
        this.aiIntegration = aiIntegration;
        this.knowledgeBase = knowledgeBase;
    }
    async execute(context) {
        const { architecture, components, technologies } = context;
        // Load relevant knowledge base context
        const kbContext = this.knowledgeBase.getContext();
        // Generate prompt for architecture analysis
        const prompt = this.generatePrompt(architecture, components, technologies, kbContext);
        // Analyze architecture using AI
        const analysis = await this.aiIntegration.generateCode(prompt, {
            architecture,
            components,
            technologies,
            context: kbContext
        });
        return {
            analysis,
            metadata: {
                agent: this.getName(),
                timestamp: new Date().toISOString(),
                components: components.length
            }
        };
    }
    generatePrompt(architecture, components, technologies, kbContext) {
        return `Analyze the following system architecture and provide detailed recommendations:

Architecture:
${architecture}

Components:
${components.join(', ')}

Technologies:
${technologies.join(', ')}

Knowledge Base Context:
${JSON.stringify(kbContext, null, 2)}

Your analysis should include:
1. Architecture overview and evaluation
2. Strengths of the current architecture
3. Potential weaknesses or bottlenecks
4. Scalability assessment
5. Security considerations
6. Performance recommendations
7. Technology stack evaluation
8. Best practices alignment
9. Improvement suggestions
10. Risk assessment

Format the response as a well-structured markdown document with appropriate headings and sections.`;
    }
}
exports.ArchitectureAnalyzer = ArchitectureAnalyzer;
//# sourceMappingURL=architecture-analyzer.js.map