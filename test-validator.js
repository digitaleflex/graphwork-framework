// Simple test to verify our security validator is working
const code = `        const apiKey = 'sk-abcdefghijklmnopqrstuvwxyz12345678901234567890';
        function useApiKey() {
          console.log(apiKey);
        }`;

// Test our actual security validator
import { SecurityValidator } from './packages/@graphwork/ai-integration/dist/security-validator.js';

const result = SecurityValidator.validateGeneratedCode(code);
console.log('Result:', result);