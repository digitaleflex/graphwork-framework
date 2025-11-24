// packages/@graphwork/tools/__tests__/DevelopmentTools.test.ts
import { DevelopmentTools } from '../src/index';

describe('DevelopmentTools', () => {
  let logSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation();
    warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    errorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    logSpy.mockRestore();
    warnSpy.mockRestore();
    errorSpy.mockRestore();
  });

  describe('logInfo', () => {
    it('should log an info message', () => {
      const message = 'This is an info message';
      
      DevelopmentTools.logInfo(message);
      
      expect(logSpy).toHaveBeenCalledWith(`[INFO] ${message}`);
    });
  });

  describe('logWarning', () => {
    it('should log a warning message', () => {
      const message = 'This is a warning message';
      
      DevelopmentTools.logWarning(message);
      
      expect(warnSpy).toHaveBeenCalledWith(`[WARNING] ${message}`);
    });
  });

  describe('logError', () => {
    it('should log an error message', () => {
      const message = 'This is an error message';
      
      DevelopmentTools.logError(message);
      
      expect(errorSpy).toHaveBeenCalledWith(`[ERROR] ${message}`);
    });
  });

  describe('measurePerformance', () => {
    it('should measure the performance of a function', async () => {
      const testFunction = async () => {
        // Simulate some work
        await new Promise(resolve => setTimeout(resolve, 10));
        return 'result';
      };
      
      const { result, duration } = await DevelopmentTools.measurePerformance(testFunction);
      
      expect(result).toBe('result');
      expect(duration).toBeGreaterThanOrEqual(10);
    });

    it('should handle synchronous functions wrapped in async', async () => {
      const testFunction = async () => {
        return 42;
      };
      
      const { result, duration } = await DevelopmentTools.measurePerformance(testFunction);
      
      expect(result).toBe(42);
      expect(duration).toBeGreaterThanOrEqual(0);
    });

    it('should handle functions that throw errors', async () => {
      const testFunction = async () => {
        throw new Error('Test error');
      };
      
      await expect(DevelopmentTools.measurePerformance(testFunction))
        .rejects
        .toThrow('Test error');
    });
  });
});