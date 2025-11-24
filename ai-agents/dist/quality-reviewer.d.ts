import { AIAgent, AgentConfig } from './ai-agent';
export interface QualityReviewerConfig extends AgentConfig {
}
export declare class QualityReviewer extends AIAgent {
    constructor(config: QualityReviewerConfig);
    execute(prompt: string, context?: any): Promise<string>;
}
//# sourceMappingURL=quality-reviewer.d.ts.map