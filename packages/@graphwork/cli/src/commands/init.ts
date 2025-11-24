// packages/@graphwork/cli/src/commands/init.ts
import { Command, flags } from '@oclif/command';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as inquirer from 'inquirer';
import * as chalk from 'chalk';

export default class Init extends Command {
  static description = 'Initialize a new GraphWork project';

  static examples = [
    '$ gw init',
    '$ gw init my-project',
    '$ gw init my-project --template fullstack --tech react,nodejs,postgresql',
  ];

  static flagsConfig = {
    template: flags.string({
      description: 'Project template to use',
      options: ['fullstack', 'backend', 'frontend', 'api'],
    }),
    tech: flags.string({
      description: 'Technologies to include (comma-separated)',
    }),
    domain: flags.string({
      description: 'Domain of application (e.g., ecommerce, healthcare)',
    }),
    force: flags.boolean({
      description: 'Force creation even if directory exists',
      default: false,
    }),
  };

  static args = [
    {
      name: 'projectName',
      description: 'Name of the project to create',
      required: false,
    },
  ];

  async run() {
    const { args, flags } = this.parse(Init);
    
    this.log(chalk.blue('Initializing GraphWork Framework 2.0 project...'));
    
    let projectName = args.projectName;
    if (!projectName) {
      const response = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Project name:',
          default: 'graphwork-project',
        }
      ]);
      projectName = response.projectName;
    }

    // Create project directory
    const projectPath = path.resolve(projectName);
    
    if (fs.existsSync(projectPath) && !flags.force) {
      this.error(`Directory ${projectPath} already exists. Use --force to overwrite.`);
      return;
    }

    // Create directory structure
    await fs.ensureDir(projectPath);
    await fs.ensureDir(path.join(projectPath, 'src'));
    await fs.ensureDir(path.join(projectPath, 'tests'));
    await fs.ensureDir(path.join(projectPath, 'docs'));
    await fs.ensureDir(path.join(projectPath, 'work', '01-vision'));
    await fs.ensureDir(path.join(projectPath, 'work', '02-specs'));
    await fs.ensureDir(path.join(projectPath, 'work', '03-architecture'));
    await fs.ensureDir(path.join(projectPath, 'work', '04-delivery'));
    await fs.ensureDir(path.join(projectPath, 'work', '05-quality'));
    await fs.ensureDir(path.join(projectPath, 'work', '06-data'));
    await fs.ensureDir(path.join(projectPath, 'work', '07-compliance'));

    // Create basic files
    await fs.writeFile(
      path.join(projectPath, 'graphwork.config.js'),
      this.generateConfig(flags)
    );

    await fs.writeFile(
      path.join(projectPath, 'README.md'),
      this.generateReadme(projectName)
    );

    await fs.writeFile(
      path.join(projectPath, 'work', '01-vision', 'product_vision.md'),
      this.generateVisionDoc()
    );

    this.log(chalk.green(`\n✅ Project ${projectName} created successfully!`));
    this.log(chalk.yellow(`\nNext steps:`));
    this.log(chalk.yellow(`  1. cd ${projectName}`));
    this.log(chalk.yellow(`  2. Configure your GraphWork settings`));
    this.log(chalk.yellow(`  3. Start building with GraphWork Framework 2.0`));
  }

  private generateConfig(flags: any) {
    return `module.exports = {
  // Configuration de l'IA
  ai: {
    provider: 'openai', // openai, anthropic, ou open-source
    model: 'gpt-4',
    temperature: 0.3,
    maxTokens: 2048,
    apiKey: process.env.GRAPHWORK_AI_API_KEY,
    endpoint: process.env.GRAPHWORK_AI_ENDPOINT
  },
  
  // Configuration de la sécurité
  security: {
    dataProtection: true,
    inputValidation: true,
    consentManagement: 'required',
    vulnerabilityScanning: true,
    sensitiveDataDetection: true
  },
  
  // Configuration de la qualité
  quality: {
    codeStandards: 'strict',
    testCoverage: 80,
    securityAudit: true,
    performanceBenchmarks: true,
    maintainabilityIndex: 85
  },
  
  // Configuration des performances
  performance: {
    caching: true,
    cacheTTL: 3600,
    rateLimiting: {
      requestsPerMinute: 60
    },
    resourceLimits: {
      maxConcurrent: 10,
      maxMemory: '1GB'
    }
  },
  
  // Configuration de la traçabilité
  traceability: {
    decisionLogging: true,
    attributionTracking: true,
    auditTrail: true,
    explanationRequired: true
  },
  
  // Configuration de la confidentialité
  privacy: {
    dataAnonymization: true,
    consentRequired: true,
    gdprCompliance: true,
    piiDetection: true
  },
  
  // Configuration de l'expérience utilisateur
  userExperience: {
    progressiveAssistance: true,
    realTimeFeedback: true,
    customization: true,
    skillLevel: 'intermediate'
  },
  
  // Configuration du template et des technologies
  project: {
    template: '${flags.template || "fullstack"}',
    technologies: [${flags.tech ? `'${flags.tech.split(',').join('\', \'')}'` : ''}],
    domain: '${flags.domain || "general"}'
  }
};
`;
  }

  private generateReadme(projectName: string) {
    return `# ${projectName}

This project was generated with [GraphWork Framework 2.0](https://graphwork-framework.com).

## Project Structure

This project follows the GraphWork Framework structure:

- \`work/\` - Knowledge base with project context
- \`src/\` - Source code
- \`tests/\` - Tests
- \`docs/\` - Documentation

## Getting Started

1. Configure your AI provider settings in \`graphwork.config.js\`
2. Define your project context in \`work/\` 
3. Start generating code with GraphWork CLI

## Commands

\`\`\`
# Generate a controller
gw generate controller --name user --context work/03-architecture/system_architecture.md

# Validate the code
gw validate --all

# Analyze architecture
gw analyze --architecture
\`\`\`

For more information, see the [GraphWork Framework Documentation](https://docs.graphwork-framework.com).
`;
  }

  private generateVisionDoc() {
    return `# Product Vision

## Vision Statement

[Define the overarching vision for your product]

## Goals

[Define the primary goals for the project]

## Success Metrics

[Define metrics to measure success]

## Constraints and Non-Goals

[Define what is out of scope or constraints]
`;
  }
}