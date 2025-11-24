import { AIAgent, AgentConfig } from './ai-agent';
export interface SpecificationWriterConfig extends AgentConfig {
}
export declare class SpecificationWriter extends AIAgent {
    constructor(config: SpecificationWriterConfig);
    execute(prompt: string, context?: any): Promise<string>;
}
//# sourceMappingURL=specification-writer.d.ts.map