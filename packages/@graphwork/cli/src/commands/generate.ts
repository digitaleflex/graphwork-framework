// packages/@graphwork/cli/src/commands/generate.ts
import { Command, Flags, Args } from '@oclif/core';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as inquirer from 'inquirer';
import * as chalk from 'chalk';
import ora = require('ora');

export default class Generate extends Command {
  static description = 'Generate code templates with AI assistance';

  static examples = [
    '$ gw generate component MyComponent',
    '$ gw generate service UserService',
    '$ gw generate model User',
  ];

  static flags = {
    type: Flags.string({
      description: 'Type of template to generate',
      options: ['component', 'service', 'model', 'controller', 'middleware'],
    }),
    force: Flags.boolean({
      description: 'Overwrite existing files',
      default: false,
    }),
  };

  static args = {
    type: Args.string({
      description: 'Type of template to generate',
      required: false,
    }),
    name: Args.string({
      description: 'Name of the template to generate',
      required: false,
    }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Generate);
    
    let templateType = args.type || flags.type || 'component';
    let templateName = args.name || 'GeneratedTemplate';
    
    // Si le type n'est pas fourni, demander à l'utilisateur
    if (!args.type && !flags.type) {
      const response = await inquirer.prompt([{
        type: 'list',
        name: 'templateType',
        message: 'What would you like to generate?',
        choices: ['component', 'service', 'model', 'controller', 'middleware']
      }]);
      templateType = response.templateType;
    }
    
    // Si le nom n'est pas fourni, demander à l'utilisateur
    if (!args.name) {
      const response = await inquirer.prompt([{
        type: 'input',
        name: 'templateName',
        message: `Enter ${templateType} name:`,
        default: 'MyTemplate'
      }]);
      templateName = response.templateName;
    }
    
    const spinner = ora(`Generating ${templateType} ${templateName}...`).start();
    
    try {
      // Créer le répertoire approprié selon le type
      const targetDir = path.join(process.cwd(), `${templateType}s`);
      fs.ensureDirSync(targetDir);
      
      // Générer le contenu du template (simulé)
      const templateContent = this.generateTemplateContent(templateType, templateName);
      
      // Écrire le fichier
      const fileName = `${templateName}.${this.getFileExtension(templateType)}`;
      const filePath = path.join(targetDir, fileName);
      
      // Vérifier si le fichier existe déjà
      if (fs.existsSync(filePath) && !flags.force) {
        spinner.fail(chalk.red(`File ${fileName} already exists!`));
        this.log(chalk.yellow('Use --force to overwrite the existing file.'));
        return;
      }
      
      fs.writeFileSync(filePath, templateContent);
      
      spinner.succeed(chalk.green(`${templateType} ${templateName} generated successfully!`));
      this.log(chalk.blue(`Created: ${filePath}`));
    } catch (error) {
      spinner.fail(chalk.red(`Failed to generate ${templateType} ${templateName}`));
      this.error(error as Error);
    }
  }
  
  private generateTemplateContent(type: string, name: string): string {
    // Générer un contenu de template basique selon le type
    switch (type) {
      case 'component':
        return `// ${name} Component

export class ${name} {
  // Component logic here
}
`;
      case 'service':
        return `// ${name} Service

export class ${name}Service {
  // Service logic here
}
`;
      case 'model':
        return `// ${name} Model

export interface ${name} {
  id: string;
  // Model properties here
}
`;
      case 'controller':
        return `// ${name} Controller

export class ${name}Controller {
  // Controller logic here
}
`;
      case 'middleware':
        return `// ${name} Middleware

export function ${name}Middleware(req: any, res: any, next: any) {
  // Middleware logic here
  next();
}
`;
      default:
        return `// ${name} ${type}\n\n// Generated template content\n`;
    }
  }
  
  private getFileExtension(type: string): string {
    // Retourner l'extension de fichier appropriée selon le type
    switch (type) {
      case 'component':
      case 'service':
      case 'controller':
      case 'middleware':
        return 'ts';
      case 'model':
        return 'ts';
      default:
        return 'ts';
    }
  }
}