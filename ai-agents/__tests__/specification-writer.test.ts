// ai-agents/__tests__/specification-writer.test.ts
import { SpecificationWriter, SpecificationWriterConfig } from '../src/specification-writer';

describe('SpecificationWriter', () => {
  let specWriter: SpecificationWriter;
  const mockConfig: SpecificationWriterConfig = {
    name: 'Specification Writer',
    description: 'Generates detailed technical specifications',
    aiConfig: {
      provider: 'openai',
      model: 'gpt-4',
      apiKey: 'test-api-key',
      endpoint: 'https://api.openai.com/v1/completions'
    }
  };

  beforeEach(() => {
    specWriter = new SpecificationWriter(mockConfig);
  });

  describe('constructor', () => {
    it('should create an instance of SpecificationWriter', () => {
      expect(specWriter).toBeInstanceOf(SpecificationWriter);
    });

    it('should set the name and description', () => {
      expect(specWriter.getName()).toBe('Specification Writer');
      expect(specWriter.getDescription()).toBe('Generates detailed technical specifications');
    });
  });

  describe('execute', () => {
    it('should execute the specification writer with prompt and context', async () => {
      const prompt = 'Create a specification for a user authentication system';
      const context = { domain: 'web application', technology: 'Node.js' };
      
      // Since we're not mocking the AI integration, we'll just check that it doesn't throw
      await expect(specWriter.execute(prompt, context)).resolves.toBeDefined();
    });

    it('should handle empty context', async () => {
      const prompt = 'Create a specification for a simple API';
      const context = {};
      
      // Since we're not mocking the AI integration, we'll just check that it doesn't throw
      await expect(specWriter.execute(prompt, context)).resolves.toBeDefined();
    });
  });
});