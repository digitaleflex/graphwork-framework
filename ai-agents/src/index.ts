// ai-agents/src/index.ts
export { AIAgent, AgentConfig } from './ai-agent';
export { SpecificationWriter, SpecificationWriterConfig } from './specification-writer';
export { CodeGenerator, CodeGeneratorConfig } from './code-generator';
export { QualityReviewer, QualityReviewerConfig } from './quality-reviewer';
export { SecurityAuditor, SecurityAuditorConfig } from './security-auditor';
export { DocumentationWriter, DocumentationWriterConfig } from './documentation-writer';

export type AgentType = 
  | 'specification-writer'
  | 'code-generator'
  | 'quality-reviewer'
  | 'security-auditor'
  | 'documentation-writer';

// We'll implement the factory later when we have the dependencies resolved
