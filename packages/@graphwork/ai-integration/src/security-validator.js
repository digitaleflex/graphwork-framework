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
exports.SecurityValidator = void 0;
// packages/@graphwork/ai-integration/src/security-validator.ts
const crypto = __importStar(require("crypto"));
class SecurityValidator {
    static validateInput(input) {
        const issues = [];
        // Check for injection patterns
        for (const pattern of this.INJECTION_PATTERNS) {
            if (pattern.test(input)) {
                issues.push(`Potential injection vulnerability detected: ${pattern}`);
            }
        }
        // Check for dangerous functions
        for (const func of this.DANGEROUS_FUNCTIONS) {
            // Look for the function name followed by parentheses
            const funcPattern = new RegExp(`\\b${func}\\s*\\(`, 'i');
            if (funcPattern.test(input)) {
                issues.push(`Dangerous function detected: ${func}`);
            }
        }
        // Check for hardcoded secrets
        for (const pattern of this.HARD_CODED_SECRETS) {
            if (pattern.test(input)) {
                issues.push('Potential hardcoded secret detected');
            }
        }
        // Check input length
        if (input.length > 10000) {
            issues.push('Input exceeds maximum allowed length');
        }
        return {
            isValid: issues.length === 0,
            issues,
            severity: this.calculateSeverity(issues)
        };
    }
    static validateGeneratedCode(code) {
        const issues = [];
        // Check for dangerous functions in generated code
        for (const func of this.DANGEROUS_FUNCTIONS) {
            // Look for the function name followed by parentheses
            const funcPattern = new RegExp(`\\b${func}\\s*\\(`, 'i');
            if (funcPattern.test(code)) {
                issues.push(`Dangerous function detected in generated code: ${func}`);
            }
        }
        // Check for hardcoded secrets in generated code
        for (const pattern of this.HARD_CODED_SECRETS) {
            if (pattern.test(code)) {
                issues.push('Potential hardcoded secret detected in generated code');
            }
        }
        // Check for insecure patterns
        if (/(innerHTML\s*=)/i.test(code) && !/(innerHTML\s*=\s*[^<]*)/.test(code)) {
            issues.push('Potentially unsafe innerHTML assignment detected');
        }
        if (/document\.write\(/i.test(code)) {
            issues.push('Potentially unsafe document.write usage detected');
        }
        // Check for eval-like functions
        const evalLike = ['eval', 'Function', 'setTimeout', 'setInterval'];
        for (const func of evalLike) {
            // Only flag if it's being called with a string parameter
            const funcPattern = new RegExp(`${func}\\s*\\([^)]*['"][^'"]*['"]\\s*\\)`, 'i');
            if (funcPattern.test(code)) {
                issues.push(`Potentially unsafe ${func} usage detected`);
            }
        }
        // Debug output
        if (issues.length > 0) {
            console.log('Security validation found issues:', issues);
        }
        return {
            isValid: issues.length === 0,
            issues,
            severity: this.calculateSeverity(issues)
        };
    }
    static validatePrompt(prompt) {
        const issues = [];
        // Check for prompt injection attempts
        const injectionIndicators = [
            'ignore previous instructions',
            'override security',
            'bypass restrictions',
            'act as',
            'pretend you are'
        ];
        for (const indicator of injectionIndicators) {
            if (prompt.toLowerCase().includes(indicator)) {
                issues.push(`Potential prompt injection detected: ${indicator}`);
            }
        }
        // Check for injection patterns in prompts
        for (const pattern of this.INJECTION_PATTERNS) {
            if (pattern.test(prompt)) {
                issues.push(`Potential injection pattern in prompt: ${pattern}`);
            }
        }
        return {
            isValid: issues.length === 0,
            issues,
            severity: this.calculateSeverity(issues)
        };
    }
    static encryptSensitiveData(data, key) {
        try {
            const algorithm = 'aes-256-gcm';
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipher(algorithm, key);
            let encrypted = cipher.update(data, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted;
        }
        catch (error) {
            throw new Error('Failed to encrypt sensitive data');
        }
    }
    static decryptSensitiveData(encryptedData, key) {
        try {
            const algorithm = 'aes-256-gcm';
            const decipher = crypto.createDecipher(algorithm, key);
            let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        }
        catch (error) {
            throw new Error('Failed to decrypt sensitive data');
        }
    }
    static hashData(data) {
        return crypto.createHash('sha3-256').update(data).digest('hex');
    }
    static calculateSeverity(issues) {
        if (issues.length === 0)
            return 'low';
        // Check for critical issues
        const criticalKeywords = ['secret', 'password', 'bypass', 'override'];
        for (const issue of issues) {
            for (const keyword of criticalKeywords) {
                if (issue.toLowerCase().includes(keyword)) {
                    return 'critical';
                }
            }
        }
        // Check for high severity issues
        const highKeywords = ['dangerous', 'unsafe', 'injection'];
        for (const issue of issues) {
            for (const keyword of highKeywords) {
                if (issue.toLowerCase().includes(keyword)) {
                    return 'high';
                }
            }
        }
        // Check for medium severity issues
        const mediumKeywords = ['potential', 'might', 'could'];
        for (const issue of issues) {
            for (const keyword of mediumKeywords) {
                if (issue.toLowerCase().includes(keyword)) {
                    return 'medium';
                }
            }
        }
        return 'low';
    }
}
exports.SecurityValidator = SecurityValidator;
SecurityValidator.INJECTION_PATTERNS = [
    // SQL Injection patterns - more specific to avoid false positives
    /\b(SELECT\s+(DISTINCT\s+)?\*?\s*(\w+\.)?\w+\s+FROM|INSERT\s+INTO|UPDATE\s+\w+\s+SET|DELETE\s+FROM|DROP\s+(TABLE|DATABASE|USER|PROCEDURE|FUNCTION|INDEX|VIEW|TRIGGER)|CREATE\s+(TABLE|DATABASE|USER|PROCEDURE|FUNCTION|INDEX|VIEW|TRIGGER)|ALTER\s+TABLE|EXEC(UTE)?\s+\w+)\b/i,
    /('\s*(OR|AND)\s*'?\d+'?\s*=\s*'?\d+'?)/i,
    // Command injection patterns
    /(\|\||&&|\||&)\s*\w+/,
    /\$\([^)]+\)/,
    /\${[^}]+}/,
    // Script injection patterns
    /<script[^>]*>.*?<\/script>/i,
    /javascript:\s*\w+/i,
    /on(load|error|click|hover)\s*=/i,
    // Path traversal patterns
    /\.\.\/|\.\.\\/g
];
SecurityValidator.DANGEROUS_FUNCTIONS = [
    'eval', 'exec', 'system', 'popen', 'spawn'
];
SecurityValidator.HARD_CODED_SECRETS = [
    /(api[key|secret]?\s*[=:]\s*['"][a-zA-Z0-9_\-]{30,}['"])/i
];
//# sourceMappingURL=security-validator.js.map