import { Command, flags } from '@oclif/command';
export default class Init extends Command {
    static description: string;
    static examples: string[];
    static flagsConfig: {
        template: flags.IOptionFlag<string | undefined>;
        tech: flags.IOptionFlag<string | undefined>;
        domain: flags.IOptionFlag<string | undefined>;
        force: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    static args: {
        name: string;
        description: string;
        required: boolean;
    }[];
    run(): Promise<void>;
    private generateConfig;
    private generateReadme;
    private generateVisionDoc;
}
//# sourceMappingURL=init.d.ts.map