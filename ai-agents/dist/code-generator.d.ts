import { AIAgent, AgentConfig } from './ai-agent';
export interface CodeGeneratorConfig extends AgentConfig {
}
export declare class CodeGenerator extends AIAgent {
    constructor(config: CodeGeneratorConfig);
    execute(prompt: string, context?: any): Promise<string>;
}
//# sourceMappingURL=code-generator.d.ts.map