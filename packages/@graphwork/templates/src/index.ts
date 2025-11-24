// packages/@graphwork/templates/src/index.ts
import * as Handlebars from 'handlebars';

export class TemplateEngine {
  private templates: Map<string, Handlebars.TemplateDelegate> = new Map();

  async registerTemplate(name: string, template: string): Promise<void> {
    const compiled = Handlebars.compile(template);
    this.templates.set(name, compiled);
  }

  async renderTemplate(name: string, data: any): Promise<string> {
    const template = this.templates.get(name);
    if (!template) {
      throw new Error(`Template ${name} not found`);
    }
    return template(data);
  }

  async renderFromPath(templatePath: string, data: any): Promise<string> {
    // In a real implementation, this would read the template file
    const templateContent = `Template for ${templatePath} with data: {{JSONstringify data}}`;
    const compiled = Handlebars.compile(templateContent);
    return compiled({ data });
  }
}