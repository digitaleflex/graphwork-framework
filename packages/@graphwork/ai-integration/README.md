# AI Integration

AI integration layer for GraphWork Framework 2.0

## Overview

The AI Integration module provides a unified interface for integrating various AI models and services into the GraphWork Framework. It supports multiple providers including OpenAI, Anthropic, and Google Gemini, allowing developers to leverage AI capabilities for code generation, analysis, and other development tasks.

## Installation

```bash
npm install graphwork-ai-integration
```

## Features

- **Multi-Provider Support**: Supports OpenAI, Anthropic, Google Gemini, and other AI providers
- **Unified API**: Consistent interface across different AI providers
- **Context-Aware Prompts**: Integrates with the knowledge base for contextual AI interactions
- **Rate Limiting**: Built-in rate limiting to prevent API abuse
- **Retry Logic**: Automatic retry with exponential backoff for failed requests
- **Caching**: Optional caching of AI responses to reduce API costs
- **Streaming Responses**: Support for streaming AI responses

## Usage

### Basic Setup

```typescript
import { AIIntegration } from 'graphwork-ai-integration';

// Initialize AI integration
const ai = new AIIntegration({
  provider: 'openai', // or 'anthropic', 'gemini'
  model: 'gpt-4',
  apiKey: process.env.OPENAI_API_KEY // or process.env.ANTHROPIC_API_KEY, process.env.GOOGLE_GEMINI_API_KEY
});

// Send a simple prompt
const response = await ai.generateText('Write a hello world program in TypeScript');
console.log(response);
```

### Working with Context

```typescript
import { AIIntegration } from 'graphwork-ai-integration';
import { KnowledgeBase } from 'graphwork-knowledge-base';

// Initialize with knowledge base context
const knowledgeBase = new KnowledgeBase({ basePath: './work' });
await knowledgeBase.load();

const ai = new AIIntegration({
  provider: 'openai', // or 'anthropic', 'gemini'
  model: 'gpt-4',
  apiKey: process.env.OPENAI_API_KEY, // or process.env.ANTHROPIC_API_KEY, process.env.GOOGLE_GEMINI_API_KEY
  knowledgeBase: knowledgeBase
});

// Generate code with context
const code = await ai.generateCode({
  task: 'Create a user authentication service',
  context: {
    domain: 'web application',
    technology: 'Node.js with Express',
    requirements: 'OAuth2 integration, JWT tokens'
  }
});
```

### Chat Interface

```typescript
// Start a chat session
const chat = ai.startChat();

// Send messages
const response1 = await chat.sendMessage('What is the best way to structure a REST API?');
console.log(response1);

const response2 = await chat.sendMessage('Can you give me an example with Express.js?');
console.log(response2);

// End the chat session
chat.end();
```

### Streaming Responses

```typescript
// Stream a response
const stream = await ai.streamText('Write a detailed explanation of async/await in JavaScript');

for await (const chunk of stream) {
  process.stdout.write(chunk);
}
```

## API

### AIIntegration

#### Constructor
```typescript
new AIIntegration(config: AIConfig)
```

#### Methods
- `generateText(prompt: string, options?: GenerateOptions): Promise<string>` - Generate text from a prompt
- `generateCode(request: CodeGenerationRequest): Promise<string>` - Generate code based on a request
- `analyzeCode(code: string, task: string): Promise<AnalysisResult>` - Analyze code for a specific task
- `startChat(): ChatSession` - Start a chat session
- `embed(text: string): Promise<number[]>` - Generate embeddings for text
- `streamText(prompt: string, options?: GenerateOptions): Promise<AsyncIterable<string>>` - Stream text generation

### AIConfig

```typescript
interface AIConfig {
  provider: 'openai' | 'anthropic' | 'gemini' | string;
  model: string;
  apiKey: string;
  baseUrl?: string;
  temperature?: number;
  maxTokens?: number;
  knowledgeBase?: KnowledgeBase;
  cache?: boolean;
  cacheTTL?: number;
}
```

### GenerateOptions

```typescript
interface GenerateOptions {
  temperature?: number;
  maxTokens?: number;
  stopSequences?: string[];
}
```

### CodeGenerationRequest

```typescript
interface CodeGenerationRequest {
  task: string;
  context?: Record<string, any>;
  language?: string;
  framework?: string;
  style?: 'functional' | 'object-oriented' | 'modular';
}
```

### ChatSession

#### Methods
- `sendMessage(message: string): Promise<string>` - Send a message and get a response
- `getHistory(): ChatMessage[]` - Get the chat history
- `clearHistory(): void` - Clear the chat history
- `end(): void` - End the chat session

## Supported Providers

### OpenAI
- Models: GPT-4, GPT-3.5 Turbo, and others
- Configuration: `provider: 'openai'`

### Anthropic
- Models: Claude, Claude Instant
- Configuration: `provider: 'anthropic'`

### Google Gemini
- Models: Gemini Pro, Gemini Ultra
- Configuration: `provider: 'gemini'`

### Custom Providers
Custom AI providers can be integrated by implementing the `AIProvider` interface.

## Rate Limiting

The AI Integration module includes built-in rate limiting to prevent API abuse:

```typescript
const ai = new AIIntegration({
  provider: 'openai', // or 'anthropic', 'gemini'
  model: 'gpt-4',
  apiKey: process.env.OPENAI_API_KEY, // or process.env.ANTHROPIC_API_KEY, process.env.GOOGLE_GEMINI_API_KEY
  rateLimit: {
    requestsPerMinute: 60,
    tokensPerMinute: 150000
  }
});
```

## Caching

Responses can be cached to reduce API costs:

```typescript
const ai = new AIIntegration({
  provider: 'openai', // or 'anthropic', 'gemini'
  model: 'gpt-4',
  apiKey: process.env.OPENAI_API_KEY, // or process.env.ANTHROPIC_API_KEY, process.env.GOOGLE_GEMINI_API_KEY
  cache: true,
  cacheTTL: 3600000 // 1 hour
});
```

## Error Handling

The module provides comprehensive error handling:

```typescript
try {
  const response = await ai.generateText('Your prompt here');
  console.log(response);
} catch (error) {
  if (error instanceof AIError) {
    console.error('AI Error:', error.message);
    console.error('Error Code:', error.code);
  } else {
    console.error('Unexpected Error:', error);
  }
}
```

## Contributing

See our [Contributing Guide](https://github.com/graphmind/graphwork-framework/blob/main/CONTRIBUTING.md) for information on how to contribute to this package.

## License

This package is licensed under the MIT License. See the [LICENSE](https://github.com/graphmind/graphwork-framework/blob/main/LICENSE) file for details.