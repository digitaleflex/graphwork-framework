// ai-agents/src/code-generator.ts
import { AIAgent, AgentConfig } from './ai-agent';

export type CodeGeneratorConfig = AgentConfig;

export class CodeGenerator extends AIAgent {
  constructor(config: CodeGeneratorConfig) {
    super(config);
  }

  async execute(prompt: string, context: any = {}): Promise<string> {
    // Load relevant context if provided
    let loadedContext = {};
    if (context.contextPath) {
      loadedContext = await this.loadContext(context.contextPath);
    }

    // Create a comprehensive prompt for code generation
    const codePrompt = `
You are a code generator AI assistant. Your task is to generate high-quality, secure, and well-structured code based on the user's request.

User Request: ${prompt}

Context Information:
${JSON.stringify({ ...loadedContext, ...context }, null, 2)}

Please generate code that:
1. Follows best practices and coding standards
2. Is secure and free from vulnerabilities
3. Is well-documented with comments
4. Is efficient and performant
5. Follows the specified technology stack and patterns

Include appropriate error handling, validation, and security measures.
`;

    try {
      const result = await this.aiIntegration.generateCode(codePrompt, context);

      // Validate the generated code
      const isValid = await this.validateOutput(result);
      if (!isValid) {
        throw new Error('Generated code failed validation');
      }

      return result;
    } catch (error) {
      console.error('Failed to generate code:', error);
      throw error;
    }
  }
}