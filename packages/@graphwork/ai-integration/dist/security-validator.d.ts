export interface SecurityValidationResult {
    isValid: boolean;
    issues: string[];
    severity: 'low' | 'medium' | 'high' | 'critical';
}
export declare class SecurityValidator {
    private static readonly INJECTION_PATTERNS;
    private static readonly DANGEROUS_FUNCTIONS;
    private static readonly HARD_CODED_SECRETS;
    static validateInput(input: string): SecurityValidationResult;
    static validateGeneratedCode(code: string): SecurityValidationResult;
    static validatePrompt(prompt: string): SecurityValidationResult;
    static encryptSensitiveData(data: string, key: string): string;
    static decryptSensitiveData(encryptedData: string, key: string): string;
    static hashData(data: string): string;
    private static calculateSeverity;
}
//# sourceMappingURL=security-validator.d.ts.map