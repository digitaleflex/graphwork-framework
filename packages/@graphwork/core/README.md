# Core

Core engine of GraphWork Framework 2.0

## Overview

The Core module is the central engine of the GraphWork Framework. It provides the foundational infrastructure that coordinates all other modules, manages the knowledge base, integrates with AI services, and handles template processing.

## Installation

```bash
npm install graphwork-core
```

## Features

- **Central Coordination**: Orchestrates interactions between all framework modules
- **Knowledge Management**: Manages project context and knowledge base
- **AI Integration**: Provides interfaces for AI model integration
- **Template Processing**: Handles template-based code generation
- **Plugin Architecture**: Supports extensible plugin system
- **Event System**: Publish-subscribe pattern for inter-module communication

## Usage

### Basic Setup

```typescript
import { GraphWorkCore } from 'graphwork-core';
import { KnowledgeBase } from 'graphwork-knowledge-base';
import { AIIntegration } from 'graphwork-ai-integration';
import { TemplateEngine } from 'graphwork-templates';

// Initialize components
const knowledgeBase = new KnowledgeBase();
const aiIntegration = new AIIntegration({
  provider: 'openai', // or 'anthropic', 'gemini'
  model: 'gpt-4',
  apiKey: process.env.OPENAI_API_KEY
});
const templateEngine = new TemplateEngine();

// Create core instance
const core = new GraphWorkCore({
  knowledgeBase,
  aiIntegration,
  templateEngine
});

// Initialize the core
await core.initialize();
```

### Working with Context

```typescript
import { ContextManager } from 'graphwork-core';

const contextManager = new ContextManager(core);

// Load project context
await contextManager.loadProjectContext('./work');

// Get context for a specific area
const architectureContext = contextManager.getContext('architecture');

// Update context
contextManager.updateContext('requirements', {
  functional: 'User authentication system',
  nonFunctional: 'High performance, secure'
});
```

### Event Handling

```typescript
import { EventEmitter } from 'graphwork-core';

// Subscribe to events
core.events.on('codeGenerated', (data) => {
  console.log('Code generated:', data);
});

// Emit events
core.events.emit('validationStarted', {
  component: 'user-service',
  timestamp: Date.now()
});
```

## API

### GraphWorkCore

#### Constructor
```typescript
new GraphWorkCore(config: CoreConfig)
```

#### Methods
- `initialize(): Promise<void>` - Initialize the core engine
- `getContextManager(): ContextManager` - Get the context manager
- `getAIIntegration(): AIIntegration` - Get the AI integration service
- `getTemplateEngine(): TemplateEngine` - Get the template engine
- `getEventManager(): EventEmitter` - Get the event manager

### ContextManager

#### Methods
- `loadProjectContext(path: string): Promise<void>` - Load project context from directory
- `getContext(area: string): any` - Get context for a specific area
- `updateContext(area: string, data: any): void` - Update context for an area
- `getAllContext(): Record<string, any>` - Get all context data

### EventEmitter

#### Methods
- `on(event: string, listener: Function): void` - Subscribe to an event
- `emit(event: string, data: any): void` - Emit an event
- `off(event: string, listener: Function): void` - Unsubscribe from an event

## Configuration

### CoreConfig
```typescript
interface CoreConfig {
  knowledgeBase: KnowledgeBase;
  aiIntegration: AIIntegration;
  templateEngine: TemplateEngine;
  plugins?: Plugin[];
}
```

## Architecture

The Core module follows a modular architecture with the following components:

1. **Context Manager**: Handles project context and knowledge base
2. **AI Coordinator**: Manages AI model interactions
3. **Template Processor**: Processes templates for code generation
4. **Plugin Manager**: Manages framework plugins
5. **Event System**: Facilitates communication between modules

## Extending Core

### Creating Plugins

```typescript
import { Plugin } from 'graphwork-core';

export class CustomPlugin implements Plugin {
  name = 'CustomPlugin';
  version = '1.0.0';
  
  async initialize(core: GraphWorkCore): Promise<void> {
    // Plugin initialization logic
  }
  
  async destroy(): Promise<void> {
    // Cleanup logic
  }
}
```

### Registering Plugins

```typescript
import { CustomPlugin } from './CustomPlugin';

const core = new GraphWorkCore({
  knowledgeBase,
  aiIntegration,
  templateEngine,
  plugins: [new CustomPlugin()]
});
```

## Contributing

See our [Contributing Guide](https://github.com/graphmind/graphwork-framework/blob/main/CONTRIBUTING.md) for information on how to contribute to this package.

## License

This package is licensed under the MIT License. See the [LICENSE](https://github.com/graphmind/graphwork-framework/blob/main/LICENSE) file for details.