import { AIAgent, AgentConfig } from './ai-agent';
export interface DocumentationWriterConfig extends AgentConfig {
}
export declare class DocumentationWriter extends AIAgent {
    constructor(config: DocumentationWriterConfig);
    execute(prompt: string, context?: any): Promise<string>;
}
//# sourceMappingURL=documentation-writer.d.ts.map