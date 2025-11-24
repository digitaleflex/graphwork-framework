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
exports.TemplateEngine = void 0;
// packages/@graphwork/templates/src/index.ts
const Handlebars = __importStar(require("handlebars"));
// Register JSON stringify helper
Handlebars.registerHelper('JSONstringify', function (context) {
    return JSON.stringify(context);
});
class TemplateEngine {
    constructor() {
        this.templates = new Map();
    }
    async registerTemplate(name, template) {
        const compiled = Handlebars.compile(template);
        this.templates.set(name, compiled);
    }
    async renderTemplate(name, data) {
        const template = this.templates.get(name);
        if (!template) {
            throw new Error(`Template ${name} not found`);
        }
        return template(data);
    }
    async renderFromPath(templatePath, data) {
        // In a real implementation, this would read the template file
        const templateContent = `Template for ${templatePath} with data: {{JSONstringify data}}`;
        const compiled = Handlebars.compile(templateContent);
        return compiled({ data });
    }
}
exports.TemplateEngine = TemplateEngine;
//# sourceMappingURL=index.js.map