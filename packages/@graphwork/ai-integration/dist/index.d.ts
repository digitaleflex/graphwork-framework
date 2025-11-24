export interface AIConfig {
    provider: string;
    model: string;
    apiKey: string;
    endpoint: string;
    temperature?: number;
    maxTokens?: number;
}
export declare class AIIntegration {
    private config;
    constructor(config: AIConfig);
    generateCode(prompt: string, context?: any): Promise<string>;
    private callAIProvider;
    validateResponse(response: string): Promise<boolean>;
}
//# sourceMappingURL=index.d.ts.map