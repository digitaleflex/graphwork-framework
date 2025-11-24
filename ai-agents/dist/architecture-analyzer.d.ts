import { BaseAgent } from './index';
import { AIIntegration } from '@graphwork/ai-integration';
import { KnowledgeBase } from '@graphwork/knowledge-base';
export declare class ArchitectureAnalyzer extends BaseAgent {
    private aiIntegration;
    private knowledgeBase;
    constructor(aiIntegration: AIIntegration, knowledgeBase: KnowledgeBase);
    execute(context: any): Promise<any>;
    private generatePrompt;
}
//# sourceMappingURL=architecture-analyzer.d.ts.map