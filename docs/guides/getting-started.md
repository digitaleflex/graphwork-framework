# Getting Started Guide

This guide will help you get started with the GraphWork Framework 2.0. By the end of this guide, you'll have a working project and understand the basics of the framework.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js v16.0.0 or higher
- npm v7.0.0 or higher
- Git v2.0.0 or higher

## Installation

Install the GraphWork CLI globally:

```bash
npm install -g @graphwork/cli
```

## Creating Your First Project

### Initialize a New Project

```bash
gw init my-first-project
```

This command will:
- Create a new project directory
- Set up the GraphWork directory structure
- Create initial configuration files
- Generate documentation templates

### Project Structure

After initialization, your project will have the following structure:

```
my-first-project/
├── src/                    # Source code
├── tests/                  # Tests
├── docs/                   # Documentation
├── work/                   # Knowledge base
│   ├── 01-vision/          # Vision documents
│   ├── 02-specs/           # Specifications
│   ├── 03-architecture/    # Architecture documents
│   ├── 04-delivery/        # Delivery plans
│   ├── 05-quality/         # Quality standards
│   ├── 06-data/            # Data models
│   └── 07-compliance/      # Compliance documents
├── graphwork.config.js     # Framework configuration
└── README.md
```

## Configuring Your Project

### Setting Up AI Provider

Edit the `graphwork.config.js` file to configure your AI provider:

```javascript
module.exports = {
  ai: {
    provider: 'openai', // or 'anthropic', 'open-source'
    model: 'gpt-4',
    apiKey: process.env.OPENAI_API_KEY, // Set this in your environment
    endpoint: 'https://api.openai.com/v1', // For self-hosted models
  },
  // ... other configuration
};
```

### Defining Project Context

Before generating code, define your project context in the `work/` directory:

1. Edit `work/01-vision/product_vision.md` to define your product vision
2. Add specifications in `work/02-specs/functional_spec.md`
3. Document your architecture in `work/03-architecture/system_architecture.md`

## Generating Code

### Generate a Controller

```bash
gw generate controller --name user --context work/03-architecture/system_architecture.md
```

This will generate a controller based on your architectural context and best practices.

### Generate a Service

```bash
gw generate service --name user --context work/02-specs/functional_spec.md
```

### Generate a Component (for frontend)

```bash
gw generate component --name user-profile --context work/02-specs/functional_spec.md
```

## Validating Your Code

### Run Quality Checks

```bash
gw validate --all
```

This validates your code for quality, security, and compliance issues.

### Analyze Your Architecture

```bash
gw analyze --architecture
```

This analyzes your codebase against your architectural specifications.

## Advanced Usage

### Custom Templates

You can create custom templates for code generation:

```bash
gw generate template --type controller --output my-templates/user-controller.template.js
```

Then use your custom template:

```bash
gw generate controller --name user --template my-templates/user-controller.template.js
```

### Progressive Assistance

The framework adapts to your experience level. Start with basic commands and gradually use more advanced features as you become comfortable.

## Next Steps

- Define your complete project context in the `work/` directory
- Generate the core components of your application
- Validate your code regularly using the framework tools
- Explore the advanced features and customization options
- Join the community for support and to share your experience

## Troubleshooting

If you encounter issues:

1. Check that your AI provider is properly configured
2. Ensure your context files are well-defined
3. Run `gw validate` to check for common issues
4. Consult the [Troubleshooting Guide](./troubleshooting.md)
5. Ask for help in the [Community Forum](https://github.com/graphmind/graphwork-framework/discussions)