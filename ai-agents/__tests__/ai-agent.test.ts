// ai-agents/__tests__/ai-agent.test.ts
import { AIAgent, AgentConfig } from '../src/ai-agent';

// Mock agent for testing
class TestAgent extends AIAgent {
  constructor(config: AgentConfig) {
    super(config);
  }

  async execute(prompt: string, context: any): Promise<any> {
    return { result: 'test result', prompt, context };
  }
}

describe('AIAgent', () => {
  let testAgent: AIAgent;
  const mockConfig: AgentConfig = {
    name: 'Test Agent',
    description: 'A test agent for unit testing',
    aiConfig: {
      provider: 'openai',
      model: 'gpt-4',
      apiKey: 'test-api-key',
      endpoint: 'https://api.openai.com/v1/completions'
    }
  };

  beforeEach(() => {
    testAgent = new TestAgent(mockConfig);
  });

  describe('constructor', () => {
    it('should create an instance of AIAgent', () => {
      expect(testAgent).toBeInstanceOf(AIAgent);
    });

    it('should set the name and description', () => {
      expect(testAgent.getName()).toBe('Test Agent');
      expect(testAgent.getDescription()).toBe('A test agent for unit testing');
    });
  });

  describe('execute', () => {
    it('should execute the agent with prompt and context', async () => {
      const prompt = 'Test prompt';
      const context = { test: 'data' };
      
      const result = await testAgent.execute(prompt, context);
      
      expect(result).toEqual({
        result: 'test result',
        prompt,
        context
      });
    });
  });

  describe('getName', () => {
    it('should return the agent name', () => {
      expect(testAgent.getName()).toBe('Test Agent');
    });
  });

  describe('getDescription', () => {
    it('should return the agent description', () => {
      expect(testAgent.getDescription()).toBe('A test agent for unit testing');
    });
  });
});