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
// packages/@graphwork/cli/src/commands/build.ts
const core_1 = require("@oclif/core");
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const chalk = __importStar(require("chalk"));
const ora = require("ora");
class Build extends core_1.Command {
    async run() {
        const { flags } = await this.parse(Build);
        const spinner = ora('Building project...').start();
        try {
            // Simuler le processus de build
            await new Promise(resolve => setTimeout(resolve, 3000));
            // Créer le répertoire de sortie s'il n'existe pas
            fs.ensureDirSync(flags.output);
            // Simuler la génération de fichiers de build
            const buildFiles = ['index.js', 'bundle.js', 'styles.css'];
            buildFiles.forEach(file => {
                fs.writeFileSync(path.join(flags.output, file), `// Built file: ${file}\n`);
            });
            spinner.succeed(chalk.green('Project built successfully!'));
            this.log(chalk.blue(`Build output saved to: ${flags.output}`));
            if (flags.minify) {
                this.log(chalk.yellow('Output has been minified'));
            }
        }
        catch (error) {
            spinner.fail(chalk.red('Failed to build project'));
            this.error(error);
        }
    }
}
exports.default = Build;
Build.description = 'Build the project for production';
Build.examples = [
    '$ gw build',
    '$ gw build --minify',
    '$ gw build --output dist/prod',
];
Build.flags = {
    minify: core_1.Flags.boolean({
        description: 'Minify the output',
        default: true,
    }),
    output: core_1.Flags.string({
        description: 'Output directory',
        default: 'dist',
    }),
};
Build.args = {};
//# sourceMappingURL=build.js.map