import { Command } from '@oclif/core';
export default class Generate extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        type: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
        force: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    static args: {
        type: import("@oclif/core/lib/interfaces").Arg<string | undefined, Record<string, unknown>>;
        name: import("@oclif/core/lib/interfaces").Arg<string | undefined, Record<string, unknown>>;
    };
    run(): Promise<void>;
    private generateTemplateContent;
    private getFileExtension;
}
//# sourceMappingURL=generate.d.ts.map