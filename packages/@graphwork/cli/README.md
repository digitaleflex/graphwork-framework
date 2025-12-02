# CLI

Command Line Interface for GraphWork Framework 2.0

## Overview

The CLI module provides a powerful command-line interface for the GraphWork Framework. It enables developers to initialize projects, generate code, validate quality, and analyze architecture directly from the terminal.

## Installation

```bash
# Global installation
npm install -g graphwork-cli

# Local installation
npm install graphwork-cli
```

## Features

- **Project Initialization**: Create new GraphWork projects with predefined templates
- **Code Generation**: Generate components, services, controllers, and more with AI assistance
- **Quality Validation**: Validate code quality, security, and compliance
- **Architecture Analysis**: Analyze project architecture against specifications
- **Progressive Assistance**: Adaptive help based on user experience level
- **Interactive Prompts**: User-friendly interactive command-line interface

## Usage

### Initialize a New Project

```bash
# Interactive initialization
gw init

# Direct initialization with options
gw init my-project --template fullstack --tech react,nodejs,postgresql --domain ecommerce
```

### Generate Code

```bash
# Generate a controller
gw generate controller --name user --context work/03-architecture/system_design.md

# Generate a service
gw generate service --name user-service --context work/02-specs/functional_spec.md

# Generate a component
gw generate component --name user-profile --context work/02-specs/ui_specs.md
```

### Validate Quality

```bash
# Validate all aspects of the project
gw validate --all

# Validate specific aspects
gw validate --security
gw validate --performance
gw validate --quality
```

### Analyze Architecture

```bash
# Analyze architecture
gw analyze --architecture

# Analyze dependencies
gw analyze --dependencies
```

### Other Commands

```bash
# Show system status
gw status

# Show help
gw --help

# Show version
gw --version
```

## Commands

### init
Initialize a new GraphWork project.

```bash
gw init [name] [options]
```

Options:
- `--template <template>`: Project template to use
- `--tech <technologies>`: Comma-separated list of technologies
- `--domain <domain>`: Project domain

### generate
Generate code components with AI assistance.

```bash
gw generate <type> [options]
```

Types:
- `controller`: Generate a controller
- `service`: Generate a service
- `component`: Generate a UI component
- `model`: Generate a data model
- `template`: Generate a custom template

Common Options:
- `--name <name>`: Name of the component to generate
- `--context <file>`: Context file to use for generation
- `--template <file>`: Custom template to use

### validate
Validate project quality, security, and compliance.

```bash
gw validate [options]
```

Options:
- `--all`: Validate all aspects
- `--security`: Validate security aspects
- `--performance`: Validate performance aspects
- `--quality`: Validate code quality
- `--file <file>`: Validate specific file

### analyze
Analyze project architecture and dependencies.

```bash
gw analyze [options]
```

Options:
- `--architecture`: Analyze architecture
- `--dependencies`: Analyze dependencies
- `--complexity`: Analyze code complexity

### status
Show the current status of the GraphWork system.

```bash
gw status
```

## Configuration

The CLI can be configured through a `graphwork.config.js` file in your project root:

```javascript
module.exports = {
  ai: {
    provider: 'openai', // or 'anthropic', 'gemini'
    model: 'gpt-4',
    temperature: 0.3,
    apiKey: process.env.GRAPHWORK_AI_API_KEY
  },
  security: {
    dataProtection: true,
    inputValidation: true
  },
  quality: {
    codeStandards: 'strict',
    testCoverage: 80
  }
};
```

## Environment Variables

- `GRAPHWORK_AI_API_KEY`: API key for the AI provider (OpenAI, Anthropic, or Google Gemini)
- `GRAPHWORK_DEBUG`: Enable debug logging
- `GRAPHWORK_TEMPLATE_DIR`: Custom template directory

## Contributing

See our [Contributing Guide](https://github.com/graphmind/graphwork-framework/blob/main/CONTRIBUTING.md) for information on how to contribute to this package.

## License

This package is licensed under the MIT License. See the [LICENSE](https://github.com/graphmind/graphwork-framework/blob/main/LICENSE) file for details.