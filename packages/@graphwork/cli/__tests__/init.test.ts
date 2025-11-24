// packages/@graphwork/cli/__tests__/init.test.ts
import Init from '../src/commands/init';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as inquirer from 'inquirer';
import * as chalk from 'chalk';

// Mock fs-extra
jest.mock('fs-extra');
const mockFs = fs as any;

// Mock inquirer
jest.mock('inquirer');
const mockInquirer = inquirer as jest.Mocked<typeof inquirer>;

// Mock chalk
jest.mock('chalk', () => ({
  blue: jest.fn((str) => str),
  green: jest.fn((str) => str),
  yellow: jest.fn((str) => str),
  red: jest.fn((str) => str)
}));

describe('Init Command', () => {
  let initCommand: Init;
  let logSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    initCommand = new Init([], {} as any);
    logSpy = jest.spyOn(initCommand, 'log').mockImplementation();
    errorSpy = jest.spyOn(initCommand, 'error').mockImplementation();
    
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('run', () => {
    it('should initialize a project with default name when no args provided', async () => {
      // Mock inquirer prompt to return default project name
      mockInquirer.prompt.mockResolvedValue({ projectName: 'graphwork-project' });
      
      // Mock fs functions
      mockFs.existsSync.mockReturnValue(false);
      mockFs.ensureDir.mockResolvedValue(undefined);
      mockFs.writeFile.mockResolvedValue(undefined);
      
      // Mock parse to return empty args and flags
      (initCommand as any).parse = jest.fn().mockReturnValue({
        args: {},
        flags: {}
      });
      
      await initCommand.run();
      
      expect(mockInquirer.prompt).toHaveBeenCalled();
      expect(mockFs.ensureDir).toHaveBeenCalled();
      expect(mockFs.writeFile).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining('Project graphwork-project created successfully!')
      );
    });

    it('should initialize a project with provided name', async () => {
      const projectName = 'my-test-project';
      
      // Mock fs functions
      mockFs.existsSync.mockReturnValue(false);
      mockFs.ensureDir.mockResolvedValue(undefined);
      mockFs.writeFile.mockResolvedValue(undefined);
      
      // Mock parse to return project name in args
      (initCommand as any).parse = jest.fn().mockReturnValue({
        args: { projectName },
        flags: {}
      });
      
      await initCommand.run();
      
      expect(mockFs.ensureDir).toHaveBeenCalled();
      expect(mockFs.writeFile).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining(`Project ${projectName} created successfully!`)
      );
    });

    it('should show error when directory already exists', async () => {
      const projectName = 'existing-project';
      
      // Mock fs.existsSync to return true
      mockFs.existsSync.mockReturnValue(true);
      
      // Mock parse to return project name in args
      (initCommand as any).parse = jest.fn().mockReturnValue({
        args: { projectName },
        flags: {}
      });
      
      await initCommand.run();
      
      expect(errorSpy).toHaveBeenCalledWith(
        `Directory ${path.resolve(projectName)} already exists. Use --force to overwrite.`
      );
    });
  });

  describe('generateConfig', () => {
    it('should generate config with default values', () => {
      const flags = {};
      const config = (initCommand as any).generateConfig(flags);
      
      expect(config).toContain('module.exports = {');
      expect(config).toContain('provider: \'openai\'');
      expect(config).toContain('model: \'gpt-4\'');
      expect(config).toContain('template: \'fullstack\'');
    });

    it('should generate config with custom values', () => {
      const flags = {
        template: 'backend',
        tech: 'nodejs,postgresql',
        domain: 'ecommerce'
      };
      const config = (initCommand as any).generateConfig(flags);
      
      expect(config).toContain('template: \'backend\'');
      expect(config).toContain('\'nodejs\', \'postgresql\'');
      expect(config).toContain('domain: \'ecommerce\'');
    });
  });

  describe('generateReadme', () => {
    it('should generate README with project name', () => {
      const projectName = 'test-project';
      const readme = (initCommand as any).generateReadme(projectName);
      
      expect(readme).toContain(`# ${projectName}`);
      expect(readme).toContain('GraphWork Framework 2.0');
    });
  });

  describe('generateVisionDoc', () => {
    it('should generate vision document', () => {
      const visionDoc = (initCommand as any).generateVisionDoc();
      
      expect(visionDoc).toContain('# Product Vision');
      expect(visionDoc).toContain('Vision Statement');
    });
  });
});