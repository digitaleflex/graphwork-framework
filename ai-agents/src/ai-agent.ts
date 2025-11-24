// ai-agents/src/ai-agent.ts
import { AIIntegration, AIConfig } from '@graphwork/ai-integration';
import { KnowledgeBase } from '@graphwork/knowledge-base';
import { TemplateEngine } from '@graphwork/templates';

export interface AgentConfig {
  name: string;
  description: string;
  aiConfig: AIConfig;
}

export abstract class AIAgent {
  protected name: string;
  protected description: string;
  protected aiIntegration: AIIntegration;
  protected knowledgeBase: KnowledgeBase;
  protected templateEngine: TemplateEngine;

  constructor(config: AgentConfig) {
    this.name = config.name;
    this.description = config.description;
    this.aiIntegration = new AIIntegration(config.aiConfig);
    this.knowledgeBase = new KnowledgeBase();
    this.templateEngine = new TemplateEngine();
  }

  abstract execute(prompt: string, context: any): Promise<any>;

  protected async loadContext(contextPath: string): Promise<any> {
    try {
      return await this.knowledgeBase.loadContext(contextPath);
    } catch (error) {
      console.warn(`Failed to load context from ${contextPath}:`, error);
      return {};
    }
  }

  protected async generateWithTemplate(templateName: string, data: any): Promise<string> {
    try {
      return await this.templateEngine.renderTemplate(templateName, data);
    } catch (error) {
      console.warn(`Failed to render template ${templateName}:`, error);
      return '';
    }
  }

  protected async validateOutput(output: string): Promise<boolean> {
    try {
      return await this.aiIntegration.validateResponse(output);
    } catch (error) {
      console.warn('Failed to validate output:', error);
      return false;
    }
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }
}