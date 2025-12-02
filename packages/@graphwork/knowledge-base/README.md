# Knowledge Base

Knowledge base system for GraphWork Framework 2.0

## Overview

The Knowledge Base module manages project context, requirements, specifications, and other documentation essential for AI-assisted development. It provides a structured way to organize and access project information that guides the AI in generating appropriate code and documentation.

## Installation

```bash
npm install graphwork-knowledge-base
```

## Features

- **Structured Organization**: Organizes project information in a standardized directory structure
- **Context Management**: Manages different types of project context (vision, specs, architecture, etc.)
- **File System Integration**: Reads and writes knowledge base files from the file system
- **Search and Query**: Provides search capabilities across the knowledge base
- **Version Control**: Tracks changes to knowledge base entries
- **Validation**: Validates knowledge base structure and content

## Usage

### Basic Setup

```typescript
import { KnowledgeBase } from 'graphwork-knowledge-base';

// Create a knowledge base instance
const kb = new KnowledgeBase({
  basePath: './work' // Path to the knowledge base directory
});

// Load the knowledge base
await kb.load();
```

### Working with Context Areas

```typescript
// Get context for a specific area
const visionContext = kb.getContext('vision');
const specContext = kb.getContext('specs/functional');

// Update context
kb.updateContext('vision', {
  productBrief: 'AI-powered project management tool',
  userStories: [
    'As a user, I want to create projects',
    'As a user, I want to assign tasks to team members'
  ]
});

// Get all context
const allContext = kb.getAllContext();
```

### Searching the Knowledge Base

```typescript
// Search for specific terms
const results = kb.search('authentication');

// Search in a specific area
const authResults = kb.searchInArea('security', 'encryption');
```

### Adding Documents

```typescript
// Add a document to the knowledge base
kb.addDocument('requirements/user-stories.md', `
# User Stories

1. As a user, I want to register an account
2. As a user, I want to log in to my account
3. As a user, I want to reset my password
`);

// Save changes
await kb.save();
```

## API

### KnowledgeBase

#### Constructor
```typescript
new KnowledgeBase(config: KnowledgeBaseConfig)
```

#### Methods
- `load(): Promise<void>` - Load the knowledge base from the file system
- `save(): Promise<void>` - Save the knowledge base to the file system
- `getContext(area: string): any` - Get context for a specific area
- `updateContext(area: string, data: any): void` - Update context for an area
- `getAllContext(): Record<string, any>` - Get all context data
- `search(query: string): SearchResult[]` - Search across the knowledge base
- `searchInArea(area: string, query: string): SearchResult[]` - Search in a specific area
- `addDocument(path: string, content: string): void` - Add a document to the knowledge base
- `getDocument(path: string): string | null` - Get a document from the knowledge base

### KnowledgeBaseConfig

```typescript
interface KnowledgeBaseConfig {
  basePath: string;        // Base path for the knowledge base directory
  autoLoad?: boolean;      // Automatically load on initialization
  validate?: boolean;      // Validate knowledge base structure
}
```

### SearchResult

```typescript
interface SearchResult {
  path: string;            // Path to the document
  content: string;         // Content of the document
  score: number;           // Relevance score
  matches: string[];       // Matching terms
}
```

## Directory Structure

The knowledge base follows a standardized directory structure:

```
work/
├── 01-vision/          # Vision documents
│   ├── product_brief.md
│   ├── user_stories.md
│   └── evil_stories.md
├── 02-specs/           # Specifications
│   ├── functional_spec.md
│   ├── non_functional_spec.md
│   └── technical_spec.md
├── 03-architecture/    # Architecture documents
│   ├── system_architecture.md
│   └── component_design.md
├── 04-delivery/        # Delivery plans
│   ├── roadmap.md
│   └── tasks_backlog.md
├── 05-quality/         # Quality standards
│   ├── coding_standards.md
│   └── testing_strategy.md
├── 06-data/            # Data models
│   └── data_model.md
├── 07-compliance/      # Compliance documents
│   ├── security_policy.md
│   └── privacy_policy.md
├── logs/               # Decision logs
│   ├── decisions.md
│   └── questions.md
├── prompts/            # AI prompts
│   ├── code_generation.md
│   └── review_prompts.md
└── templates/          # Custom templates
    ├── backend/
    ├── frontend/
    └── database/
```

## Context Areas

### Vision (01-vision)
Contains high-level project vision, user stories, and anti-stories.

### Specifications (02-specs)
Contains functional, non-functional, and technical specifications.

### Architecture (03-architecture)
Contains system architecture and component design documents.

### Delivery (04-delivery)
Contains roadmap and task backlog.

### Quality (05-quality)
Contains coding standards and testing strategies.

### Data (06-data)
Contains data models and schemas.

### Compliance (07-compliance)
Contains security and privacy policies.

## Validation

The knowledge base validates:
- Directory structure compliance
- Required document presence
- Document format consistency
- Cross-reference integrity

## Contributing

See our [Contributing Guide](https://github.com/graphmind/graphwork-framework/blob/main/CONTRIBUTING.md) for information on how to contribute to this package.

## License

This package is licensed under the MIT License. See the [LICENSE](https://github.com/graphmind/graphwork-framework/blob/main/LICENSE) file for details.