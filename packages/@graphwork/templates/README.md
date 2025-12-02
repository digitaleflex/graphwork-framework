# Templates

Template engine for GraphWork Framework 2.0

## Overview

The Templates module provides a powerful template engine for generating code and documentation in the GraphWork Framework. It uses Handlebars as the underlying templating engine and provides specialized helpers for common development tasks.

## Installation

```bash
npm install graphwork-templates
```

## Features

- **Handlebars Engine**: Uses Handlebars as the templating engine
- **Specialized Helpers**: Provides helpers for common development tasks
- **Context-Aware Rendering**: Renders templates with project context
- **Custom Helper Registration**: Allows registration of custom helpers
- **Partial Templates**: Supports partial template inclusion
- **Async Rendering**: Supports asynchronous template rendering

## Usage

### Basic Setup

```typescript
import { TemplateEngine } from 'graphwork-templates';
import { KnowledgeBase } from 'graphwork-knowledge-base';

// Create a template engine instance
const templateEngine = new TemplateEngine();

// Optionally register a knowledge base for context
const knowledgeBase = new KnowledgeBase({ basePath: './work' });
await knowledgeBase.load();
templateEngine.setKnowledgeBase(knowledgeBase);
```

### Rendering Templates

```typescript
// Render a simple template
const template = 'Hello {{name}}!';
const result = templateEngine.render(template, { name: 'World' });
console.log(result); // Output: Hello World!

// Render with context from knowledge base
const specTemplate = `
# {{componentName}} Specification

## Requirements
{{#each requirements}}
- {{this}}
{{/each}}

## Technical Details
- Language: {{language}}
- Framework: {{framework}}
`;

const context = {
  componentName: 'User Service',
  requirements: [
    'User registration',
    'User authentication',
    'Password reset'
  ],
  language: 'TypeScript',
  framework: 'Express'
};

const specResult = templateEngine.render(specTemplate, context);
```

### Working with Template Files

```typescript
// Register a template file
templateEngine.registerTemplateFile('controller', './templates/controller.hbs');

// Render from registered template
const controllerCode = templateEngine.renderFromFile('controller', {
  className: 'UserController',
  serviceName: 'userService'
});
```

### Custom Helpers

```typescript
// Register a custom helper
templateEngine.registerHelper('uppercase', (str) => {
  return str.toUpperCase();
});

// Use the custom helper in a template
const template = '{{uppercase greeting}} {{name}}!';
const result = templateEngine.render(template, {
  greeting: 'hello',
  name: 'world'
});
console.log(result); // Output: HELLO world!
```

## API

### TemplateEngine

#### Constructor
```typescript
new TemplateEngine()
```

#### Methods
- `render(template: string, context: any): string` - Render a template with context
- `renderFromFile(templateName: string, context: any): Promise<string>` - Render from a registered template file
- `registerTemplateFile(name: string, filePath: string): void` - Register a template file
- `registerHelper(name: string, helper: Function): void` - Register a custom helper
- `setKnowledgeBase(kb: KnowledgeBase): void` - Set the knowledge base for context
- `getHelpers(): Record<string, Function>` - Get all registered helpers

### Built-in Helpers

- `uppercase(str)`: Convert string to uppercase
- `lowercase(str)`: Convert string to lowercase
- `capitalize(str)`: Capitalize first letter of string
- `camelcase(str)`: Convert string to camelCase
- `pascalcase(str)`: Convert string to PascalCase
- `snakecase(str)`: Convert string to snake_case
- `kebabcase(str)`: Convert string to kebab-case

## Template Syntax

The template engine uses Handlebars syntax with additional helpers:

### Variables
```handlebars
{{variableName}}
```

### Conditionals
```handlebars
{{#if condition}}
  Content when true
{{else}}
  Content when false
{{/if}}
```

### Loops
```handlebars
{{#each items}}
  Item: {{this}}
{{/each}}
```

### Helpers
```handlebars
{{helperName parameter1 parameter2}}
```

### Partials
```handlebars
{{> partialName}}
```

## Example Templates

### Controller Template
```handlebars
import { {{pascalcase serviceName}} } from './{{serviceName}}';

export class {{pascalcase className}} {
  private service: {{pascalcase serviceName}};
  
  constructor() {
    this.service = new {{pascalcase serviceName}}();
  }
  
  {{#each methods}}
  async {{this.name}}(req, res) {
    try {
      const result = await this.service.{{this.name}}(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  {{/each}}
}
```

### Service Template
```handlebars
export class {{pascalcase className}} {
  {{#each methods}}
  async {{this.name}}(data: any): Promise<any> {
    // Implementation for {{this.name}}
    {{#if this.description}}
    // {{this.description}}
    {{/if}}
    throw new Error('Not implemented');
  }
  {{/each}}
}
```

## Contributing

See our [Contributing Guide](https://github.com/graphmind/graphwork-framework/blob/main/CONTRIBUTING.md) for information on how to contribute to this package.

## License

This package is licensed under the MIT License. See the [LICENSE](https://github.com/graphmind/graphwork-framework/blob/main/LICENSE) file for details.