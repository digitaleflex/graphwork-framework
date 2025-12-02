"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// packages/@graphwork/cli/src/commands/init.ts
const core_1 = require("@oclif/core");
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const inquirer = __importStar(require("inquirer"));
const chalk = __importStar(require("chalk"));
class Init extends core_1.Command {
    async run() {
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
        }
        else {
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
exports.default = Init;
Init.description = 'Initialize a new GraphWork project';
Init.examples = [
    '$ gw init',
    '$ gw init my-project',
    '$ gw init my-project --template fullstack --tech react,nodejs,postgresql',
];
Init.flags = {
    template: core_1.Flags.string({
        description: 'Project template to use',
        options: ['fullstack', 'backend', 'frontend', 'api'],
    }),
    tech: core_1.Flags.string({
        description: 'Technologies to include (comma-separated)',
    }),
    domain: core_1.Flags.string({
        description: 'Domain of application (e.g., ecommerce, healthcare)',
    }),
    force: core_1.Flags.boolean({
        description: 'Force creation even if directory exists',
        default: false,
    }),
};
Init.args = {
    projectname: core_1.Args.string({
        description: 'Name of the project to create',
        required: false,
    }),
};
//# sourceMappingURL=init.js.map