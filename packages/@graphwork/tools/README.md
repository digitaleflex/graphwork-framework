# Tools

Development tools for GraphWork Framework 2.0

## Overview

The Tools module provides a collection of utilities and development tools that enhance the GraphWork Framework experience. These tools help with project setup, code generation, validation, and other development tasks.

## Installation

```bash
npm install graphwork-tools
```

## Features

- **Project Setup Utilities**: Tools for initializing and configuring GraphWork projects
- **Code Generation Helpers**: Utilities for generating boilerplate code
- **Validation Tools**: Tools for validating project structure and code quality
- **File System Operations**: Enhanced file system operations for development workflows
- **Logging Utilities**: Structured logging for development tools
- **Configuration Management**: Tools for managing project configuration

## Usage

### Project Setup

```typescript
import { ProjectSetup } from 'graphwork-tools';

// Initialize a new project
const setup = new ProjectSetup('./my-project');
await setup.initialize({
  template: 'fullstack',
  technologies: ['react', 'nodejs', 'postgresql'],
  domain: 'ecommerce'
});
```

### File Operations

```typescript
import { FileUtils } from 'graphwork-tools';

// Create directory structure
await FileUtils.createDirectoryStructure('./my-project', {
  src: {
    controllers: {},
    services: {},
    models: {}
  },
  tests: {},
  docs: {}
});

// Copy template files
await FileUtils.copyTemplateFiles('./templates', './my-project/src');
```

### Validation

```typescript
import { Validator } from 'graphwork-tools';

const validator = new Validator();

// Validate project structure
const structureIssues = await validator.validateProjectStructure('./my-project');

// Validate code quality
const qualityIssues = await validator.validateCodeQuality('./my-project/src');
```

### Logging

```typescript
import { Logger } from 'graphwork-tools';

const logger = new Logger('MyTool');

logger.info('Starting tool execution');
logger.warn('This is a warning message');
logger.error('An error occurred', new Error('Something went wrong'));
```

## API

### ProjectSetup

#### Constructor
```typescript
new ProjectSetup(projectPath: string)
```

#### Methods
- `initialize(config: ProjectConfig): Promise<void>` - Initialize a new project
- `setupDirectories(): Promise<void>` - Set up directory structure
- `copyTemplates(): Promise<void>` - Copy template files
- `installDependencies(): Promise<void>` - Install project dependencies

### FileUtils

#### Static Methods
- `createDirectoryStructure(basePath: string, structure: DirectoryStructure): Promise<void>` - Create directory structure
- `copyTemplateFiles(source: string, destination: string): Promise<void>` - Copy template files
- `readContextFile(filePath: string): Promise<any>` - Read and parse context file
- `writeContextFile(filePath: string, data: any): Promise<void>` - Write context file

### Validator

#### Constructor
```typescript
new Validator()
```

#### Methods
- `validateProjectStructure(path: string): Promise<ValidationIssue[]>` - Validate project structure
- `validateCodeQuality(path: string): Promise<ValidationIssue[]>` - Validate code quality
- `validateDependencies(path: string): Promise<ValidationIssue[]>` - Validate dependencies

### Logger

#### Constructor
```typescript
new Logger(component: string)
```

#### Methods
- `info(message: string, ...args: any[])` - Log info message
- `warn(message: string, ...args: any[])` - Log warning message
- `error(message: string, error?: Error, ...args: any[])` - Log error message
- `debug(message: string, ...args: any[])` - Log debug message

### ValidationIssue

```typescript
interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  file?: string;
  line?: number;
  column?: number;
  suggestion?: string;
}
```

## Project Configuration

### ProjectConfig
```typescript
interface ProjectConfig {
  template: string;
  technologies: string[];
  domain: string;
  name?: string;
  description?: string;
}
```

### DirectoryStructure
```typescript
interface DirectoryStructure {
  [key: string]: DirectoryStructure | {};
}
```

## Available Templates

### Fullstack
A complete full-stack application template with:
- Frontend (React/Vue/Angular)
- Backend (Node.js/Python/Java)
- Database (PostgreSQL/MySQL/MongoDB)

### Backend
Backend-only template with:
- API framework
- Database integration
- Authentication

### Frontend
Frontend-only template with:
- Component library
- State management
- Routing

### Microservice
Microservice template with:
- Lightweight framework
- API gateway integration
- Container configuration

## Contributing

See our [Contributing Guide](https://github.com/graphmind/graphwork-framework/blob/main/CONTRIBUTING.md) for information on how to contribute to this package.

## License

This package is licensed under the MIT License. See the [LICENSE](https://github.com/graphmind/graphwork-framework/blob/main/LICENSE) file for details.