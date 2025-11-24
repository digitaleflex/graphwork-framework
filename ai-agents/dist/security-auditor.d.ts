import { AIAgent, AgentConfig } from './ai-agent';
export interface SecurityAuditorConfig extends AgentConfig {
}
export declare class SecurityAuditor extends AIAgent {
    constructor(config: SecurityAuditorConfig);
    execute(prompt: string, context?: any): Promise<string>;
}
//# sourceMappingURL=security-auditor.d.ts.map