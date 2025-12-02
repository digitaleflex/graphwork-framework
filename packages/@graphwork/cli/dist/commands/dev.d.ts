import { Command } from '@oclif/core';
export default class Dev extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        watch: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        port: import("@oclif/core/lib/interfaces").OptionFlag<number, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    static args: {};
    run(): Promise<void>;
}
//# sourceMappingURL=dev.d.ts.map