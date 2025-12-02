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
// packages/@graphwork/cli/src/commands/dev.ts
const core_1 = require("@oclif/core");
const chalk = __importStar(require("chalk"));
const ora = require("ora");
class Dev extends core_1.Command {
    async run() {
        const { flags } = await this.parse(Dev);
        const spinner = ora('Starting development mode...').start();
        try {
            // Simuler le démarrage du mode développement
            await new Promise(resolve => setTimeout(resolve, 2000));
            spinner.succeed(chalk.green('Development mode started successfully!'));
            this.log(chalk.blue(`Development server running on port ${flags.port}`));
            if (flags.watch) {
                this.log(chalk.yellow('Watching for file changes...'));
            }
            this.log(chalk.gray('\nPress Ctrl+C to stop the development server'));
        }
        catch (error) {
            spinner.fail(chalk.red('Failed to start development mode'));
            this.error(error);
        }
    }
}
exports.default = Dev;
Dev.description = 'Start development mode with AI assistance';
Dev.examples = [
    '$ gw dev',
    '$ gw dev --watch',
    '$ gw dev --port 3000',
];
Dev.flags = {
    watch: core_1.Flags.boolean({
        description: 'Watch for file changes',
        default: true,
    }),
    port: core_1.Flags.integer({
        description: 'Port to run the development server on',
        default: 3000,
    }),
};
Dev.args = {};
//# sourceMappingURL=dev.js.map