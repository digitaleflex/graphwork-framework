// packages/@graphwork/cli/src/commands/init.ts
import { Command, Flags, Args } from '@oclif/core';
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

  static flags = {
    template: Flags.string({
      description: 'Project template to use',
      options: ['fullstack', 'backend', 'frontend', 'api'],
    }),
    tech: Flags.string({
      description: 'Technologies to include (comma-separated)',
    }),
    domain: Flags.string({
      description: 'Domain of application (e.g., ecommerce, healthcare)',
    }),
    force: Flags.boolean({
      description: 'Force creation even if directory exists',
      default: false,
    }),
  };

  static args = {
    projectname: Args.string({
      description: 'Name of the project to create',
      required: false,
    }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Init);
    
    this.log(chalk.blue('Initializing GraphWork Framework 2.0 project...'));
    
    let projectName = args.projectname || 'my-graphwork-project';
    
    // Si aucun nom de projet n'est fourni, demander à l'utilisateur
    if (!args.projectname) {
      const response = await inquirer.prompt([{
        type: 'input',
        name: 'projectName',
        message: 'Enter project name:',
        default: 'my-graphwork-project'
      }]);
      projectName = response.projectName;
    }
    
    const projectPath = path.join(process.cwd(), projectName);
    
    // Vérifier si le répertoire existe déjà
    if (fs.existsSync(projectPath) && !flags.force) {
      this.log(chalk.red(`Error: Directory ${projectName} already exists!`));
      this.log(chalk.yellow('Use --force to overwrite the existing directory.'));
      return;
    }
    
    // Créer le répertoire du projet
    fs.ensureDirSync(projectPath);
    process.chdir(projectPath);
    
    // Copier les fichiers de template
    const templatePath = path.join(__dirname, '../../work');
    if (fs.existsSync(templatePath)) {
      fs.copySync(templatePath, projectPath);
      this.log(chalk.green('Project structure created successfully!'));
    } else {
      this.log(chalk.red('Error: Template files not found!'));
      return;
    }
    
    // Mettre à jour le nom du projet dans package.json
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = fs.readJsonSync(packageJsonPath);
      packageJson.name = projectName;
      fs.writeJsonSync(packageJsonPath, packageJson, { spaces: 2 });
    }
    
    this.log(chalk.green(`\nProject ${projectName} initialized successfully!`));
    this.log(chalk.blue('\nNext steps:'));
    this.log(chalk.white(`  cd ${projectName}`));
    this.log(chalk.white('  npm install'));
    this.log(chalk.white('  gw dev'));
  }
}