// ai-agents/src/documentation-writer.ts
import { AIAgent, AgentConfig } from './ai-agent';

export type DocumentationWriterConfig = AgentConfig;

export class DocumentationWriter extends AIAgent {
  constructor(config: DocumentationWriterConfig) {
    super(config);
  }

  async execute(prompt: string, context: any = {}): Promise<string> {
    // Load relevant context if provided
    let loadedContext = {};
    if (context.contextPath) {
      loadedContext = await this.loadContext(context.contextPath);
    }

    // Create a comprehensive prompt for documentation writing
    const docPrompt = `
You are a documentation writer AI assistant. Your task is to create clear, comprehensive, and well-structured documentation based on the user's request.

Documentation Request: ${prompt}

Context Information:
${JSON.stringify({ ...loadedContext, ...context }, null, 2)}

Please generate documentation that includes:

1. Overview and Purpose
2. Installation and Setup Instructions
3. Configuration Guide
4. Usage Examples
5. API Reference (if applicable)
6. Troubleshooting Guide
7. Best Practices
8. Frequently Asked Questions

Format the documentation in a clear, professional manner with appropriate headings, code examples, and explanations.
`;

    try {
      const result = await this.aiIntegration.generateCode(docPrompt, context);

      // Validate the generated documentation
      const isValid = await this.validateOutput(result);
      if (!isValid) {
        throw new Error('Generated documentation failed validation');
      }

      return result;
    } catch (error) {
      console.error('Failed to generate documentation:', error);
      throw error;
    }
  }
}