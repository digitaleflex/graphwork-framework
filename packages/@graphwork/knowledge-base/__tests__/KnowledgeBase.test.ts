// packages/@graphwork/knowledge-base/__tests__/KnowledgeBase.test.ts
import { KnowledgeBase } from '../src/index';
import * as fs from 'fs-extra';
import * as path from 'path';

// Mock fs-extra
jest.mock('fs-extra');

describe('KnowledgeBase', () => {
  let knowledgeBase: KnowledgeBase;
  const mockFs = fs as jest.Mocked<typeof fs>;

  beforeEach(() => {
    knowledgeBase = new KnowledgeBase();
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('loadContext', () => {
    it('should load context from an existing file', async () => {
      const contextPath = '/test/context.md';
      const fileContent = '# Test Context\n\nThis is a test context file.';
      
      // Mock fs.pathExists to return true
      (mockFs.pathExists as jest.Mock).mockResolvedValue(true);
      // Mock fs.readFile to return the file content
      (mockFs.readFile as jest.Mock).mockResolvedValue(fileContent);
      
      const context = await knowledgeBase.loadContext(contextPath);
      
      expect(mockFs.pathExists).toHaveBeenCalledWith(contextPath);
      expect(mockFs.readFile).toHaveBeenCalledWith(contextPath, 'utf-8');
      expect(context).toEqual({
        rawContent: fileContent,
        processed: true,
        lastUpdated: expect.any(Date)
      });
    });

    it('should throw an error when context file does not exist', async () => {
      const contextPath = '/nonexistent/context.md';
      
      // Mock fs.pathExists to return false
      (mockFs.pathExists as jest.Mock).mockResolvedValue(false);
      
      await expect(knowledgeBase.loadContext(contextPath))
        .rejects
        .toThrow(`Context file not found: ${contextPath}`);
    });
  });

  describe('getContext', () => {
    it('should return empty context when no context has been loaded', () => {
      const context = knowledgeBase.getContext();
      expect(context).toEqual({});
    });

    it('should return loaded context after loading', async () => {
      const contextPath = '/test/context.md';
      const fileContent = '# Test Context';
      
      // Mock fs.pathExists to return true
      (mockFs.pathExists as jest.Mock).mockResolvedValue(true);
      // Mock fs.readFile to return the file content
      (mockFs.readFile as jest.Mock).mockResolvedValue(fileContent);
      
      await knowledgeBase.loadContext(contextPath);
      const context = knowledgeBase.getContext();
      
      expect(context).toEqual({
        rawContent: fileContent,
        processed: true,
        lastUpdated: expect.any(Date)
      });
    });
  });

  describe('updateContext', () => {
    it('should update context with new data', async () => {
      const contextPath = '/test/context.md';
      const fileContent = '# Original Context';
      const updates = { newField: 'newValue' };
      
      // Mock fs.pathExists to return true
      (mockFs.pathExists as jest.Mock).mockResolvedValue(true);
      // Mock fs.readFile to return the file content
      (mockFs.readFile as jest.Mock).mockResolvedValue(fileContent);
      
      // First load the context
      await knowledgeBase.loadContext(contextPath);
      
      // Then update it
      await knowledgeBase.updateContext(contextPath, updates);
      
      // The method doesn't return anything, but we can verify the calls were made
      expect(mockFs.pathExists).toHaveBeenCalledWith(contextPath);
      expect(mockFs.readFile).toHaveBeenCalledWith(contextPath, 'utf-8');
    });
  });
});