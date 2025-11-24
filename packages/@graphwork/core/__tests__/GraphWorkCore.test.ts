// packages/@graphwork/core/__tests__/GraphWorkCore.test.ts
import { GraphWorkCore } from '../src/index';

describe('GraphWorkCore', () => {
  let graphWorkCore: GraphWorkCore;

  beforeEach(() => {
    graphWorkCore = new GraphWorkCore();
  });

  describe('constructor', () => {
    it('should create an instance of GraphWorkCore', () => {
      expect(graphWorkCore).toBeInstanceOf(GraphWorkCore);
    });

    it('should accept configuration options', () => {
      const config = { test: true };
      const coreWithConfig = new GraphWorkCore(config);
      // Note: In the current implementation, config is private so we can't directly test it
      expect(coreWithConfig).toBeInstanceOf(GraphWorkCore);
    });
  });

  describe('processRequest', () => {
    it('should process a request and return a success response', async () => {
      const request = { action: 'test', data: 'sample' };
      const response = await graphWorkCore.processRequest(request);
      
      expect(response).toEqual({
        success: true,
        data: 'Request processed'
      });
    });

    it('should handle empty request', async () => {
      const request = {};
      const response = await graphWorkCore.processRequest(request);
      
      expect(response).toEqual({
        success: true,
        data: 'Request processed'
      });
    });

    it('should handle complex request objects', async () => {
      const request = {
        action: 'generate',
        context: {
          domain: 'ecommerce',
          techStack: ['react', 'nodejs']
        },
        prompt: 'Create a product listing component'
      };
      
      const response = await graphWorkCore.processRequest(request);
      
      expect(response).toEqual({
        success: true,
        data: 'Request processed'
      });
    });
  });
});