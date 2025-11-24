import * as vscode from 'vscode';
import { GraphWorkClient, GenerationRequest } from './graphworkClient';

export class SecurityAuditor {
  constructor(private client: GraphWorkClient) {}

  async auditSecurity() {
    try {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
      }

      // Get the current file information
      const document = editor.document;
      const fileName = document.fileName;
      const language = document.languageId;
      const fileContent = document.getText();

      // Get selected text or entire file
      let selectedText = '';
      if (!editor.selection.isEmpty) {
        selectedText = document.getText(editor.selection);
      } else {
        selectedText = fileContent;
      }

      // Show progress
      await this.client.showProgress('Auditing security...', async () => {
        // Create the prompt for the AI
        const prompt = `
You are a security auditor AI assistant. Your task is to perform comprehensive security audits of code, configurations, and architectures.

File: ${fileName}
Language: ${language}

Code to Audit:
${selectedText}

Please perform a security audit that includes:

1. Vulnerability Assessment
   - Common security vulnerabilities (OWASP Top 10)
   - Language-specific security issues for ${language}
   - Framework-specific security concerns

2. Configuration Security
   - Environment variable security
   - Credential management
   - Access control configurations

3. Data Protection
   - Data encryption practices
   - Personally Identifiable Information (PII) handling
   - Data transmission security

4. Authentication and Authorization
   - Authentication mechanisms
   - Authorization controls
   - Session management security

5. Input Validation and Sanitization
   - Injection attack prevention
   - Cross-site scripting (XSS) prevention
   - Cross-site request forgery (CSRF) protection

6. Security Recommendations
   - Specific remediation steps
   - Priority levels for each vulnerability
   - Best practices for secure implementation

Format your response as a structured security audit report with clear risk ratings and actionable recommendations.
`;

        const request: GenerationRequest = {
          prompt,
          context: {
            fileName,
            language
          }
        };

        // Generate the audit
        const response = await this.client.auditSecurity(request);

        // Create a new document with the audit results
        const auditDocument = await vscode.workspace.openTextDocument({
          content: response.content,
          language: 'markdown'
        });

        await vscode.window.showTextDocument(auditDocument, {
          preview: false,
          viewColumn: vscode.ViewColumn.Beside
        });

        vscode.window.showInformationMessage('Security audit completed successfully!');
      });
    } catch (error) {
      console.error('Error auditing security:', error);
      vscode.window.showErrorMessage('Failed to audit security. Please check your API key and network connection.');
    }
  }
}