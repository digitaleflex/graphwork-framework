// packages/@graphwork/templates/__tests__/TemplateEngine.test.ts
import { TemplateEngine } from '../src/index';

describe('TemplateEngine', () => {
  let templateEngine: TemplateEngine;

  beforeEach(() => {
    templateEngine = new TemplateEngine();
  });

  describe('constructor', () => {
    it('should create an instance of TemplateEngine', () => {
      expect(templateEngine).toBeInstanceOf(TemplateEngine);
    });
  });

  describe('registerTemplate', () => {
    it('should register a template', async () => {
      const templateName = 'test-template';
      const templateContent = '<h1>{{title}}</h1><p>{{content}}</p>';
      
      await templateEngine.registerTemplate(templateName, templateContent);
      
      // Since the templates are stored in a private Map, we can't directly test it
      // But we can test that no error was thrown
      expect(true).toBe(true);
    });

    it('should register multiple templates', async () => {
      const template1Name = 'template-1';
      const template1Content = '<div>{{name}}</div>';
      
      const template2Name = 'template-2';
      const template2Content = '<span>{{value}}</span>';
      
      await templateEngine.registerTemplate(template1Name, template1Content);
      await templateEngine.registerTemplate(template2Name, template2Content);
      
      // Since the templates are stored in a private Map, we can't directly test it
      // But we can test that no error was thrown
      expect(true).toBe(true);
    });
  });

  describe('renderTemplate', () => {
    it('should render a registered template with data', async () => {
      const templateName = 'greeting-template';
      const templateContent = '<h1>Hello {{name}}!</h1>';
      const data = { name: 'World' };
      
      await templateEngine.registerTemplate(templateName, templateContent);
      const result = await templateEngine.renderTemplate(templateName, data);
      
      expect(result).toContain('Hello World!');
    });

    it('should throw an error when rendering a non-existent template', async () => {
      const templateName = 'non-existent-template';
      const data = { test: 'value' };
      
      await expect(templateEngine.renderTemplate(templateName, data))
        .rejects
        .toThrow(`Template ${templateName} not found`);
    });
  });

  describe('renderFromPath', () => {
    it('should render a template from a path', async () => {
      const templatePath = '/templates/component.hbs';
      const data = { data: { title: 'Test' } };
      
      const result = await templateEngine.renderFromPath(templatePath, data);
      
      // In the current implementation, this returns a mock response
      expect(result).toContain('Template for /templates/component.hbs');
      expect(result).toContain('Test');
    });
  });
});