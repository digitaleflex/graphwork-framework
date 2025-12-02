import { Command } from '@oclif/core';
export default class Build extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        minify: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        output: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    static args: {};
    run(): Promise<void>;
}
//# sourceMappingURL=build.d.ts.map