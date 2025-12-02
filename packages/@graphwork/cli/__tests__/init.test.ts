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

  beforeEach(() => {
    initCommand = new Init([], {} as any);
    logSpy = jest.spyOn(initCommand, 'log').mockImplementation();
    
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('run', () => {
    it('should show error when directory already exists', async () => {
      const projectName = 'existing-project';
      
      // Mock fs.existsSync to return true
      mockFs.existsSync.mockReturnValue(true);
      
      // Mock parse to return project name in args
      (initCommand as any).parse = jest.fn().mockResolvedValue({
        args: { projectname: projectName },
        flags: {}
      });
      
      await initCommand.run();
      
      expect(logSpy).toHaveBeenCalledWith(
        `Error: Directory ${projectName} already exists!`
      );
    });
  });
});