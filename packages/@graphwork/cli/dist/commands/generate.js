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
// packages/@graphwork/cli/src/commands/generate.ts
const core_1 = require("@oclif/core");
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const inquirer = __importStar(require("inquirer"));
const chalk = __importStar(require("chalk"));
const ora = require("ora");
class Generate extends core_1.Command {
    async run() {
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
        }
        catch (error) {
            spinner.fail(chalk.red(`Failed to generate ${templateType} ${templateName}`));
            this.error(error);
        }
    }
    generateTemplateContent(type, name) {
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
    getFileExtension(type) {
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
exports.default = Generate;
Generate.description = 'Generate code templates with AI assistance';
Generate.examples = [
    '$ gw generate component MyComponent',
    '$ gw generate service UserService',
    '$ gw generate model User',
];
Generate.flags = {
    type: core_1.Flags.string({
        description: 'Type of template to generate',
        options: ['component', 'service', 'model', 'controller', 'middleware'],
    }),
    force: core_1.Flags.boolean({
        description: 'Overwrite existing files',
        default: false,
    }),
};
Generate.args = {
    type: core_1.Args.string({
        description: 'Type of template to generate',
        required: false,
    }),
    name: core_1.Args.string({
        description: 'Name of the template to generate',
        required: false,
    }),
};
//# sourceMappingURL=generate.js.map