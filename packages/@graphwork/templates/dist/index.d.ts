export declare class TemplateEngine {
    private templates;
    registerTemplate(name: string, template: string): Promise<void>;
    renderTemplate(name: string, data: any): Promise<string>;
    renderFromPath(templatePath: string, data: any): Promise<string>;
}
//# sourceMappingURL=index.d.ts.map