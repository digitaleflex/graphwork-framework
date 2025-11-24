import { AIIntegration, AIConfig } from '@graphwork/ai-integration';
import { KnowledgeBase } from '@graphwork/knowledge-base';
import { TemplateEngine } from '@graphwork/templates';
export interface AgentConfig {
    name: string;
    description: string;
    aiConfig: AIConfig;
}
export declare abstract class AIAgent {
    protected name: string;
    protected description: string;
    protected aiIntegration: AIIntegration;
    protected knowledgeBase: KnowledgeBase;
    protected templateEngine: TemplateEngine;
    constructor(config: AgentConfig);
    abstract execute(prompt: string, context: any): Promise<any>;
    protected loadContext(contextPath: string): Promise<any>;
    protected generateWithTemplate(templateName: string, data: any): Promise<string>;
    protected validateOutput(output: string): Promise<boolean>;
    getName(): string;
    getDescription(): string;
}
//# sourceMappingURL=ai-agent.d.ts.map