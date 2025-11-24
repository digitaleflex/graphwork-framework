import * as vscode from 'vscode';
import { GraphWorkClient, GenerationRequest } from './graphworkClient';

export class DocumentationGenerator {
  constructor(private client: GraphWorkClient) {}

  async generateDocumentation() {
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
      await this.client.showProgress('Generating documentation...', async () => {
        // Create the prompt for the AI
        const prompt = `
You are a documentation writer AI assistant. Your task is to create clear, comprehensive, and well-structured documentation based on the code provided.

File: ${fileName}
Language: ${language}

Code to Document:
${selectedText}

Please generate documentation that includes:

1. Overview and Purpose
2. Installation and Setup Instructions
3. Configuration Guide
4. Usage Examples
5. API Reference (if applicable)
6. Troubleshooting Guide
7. Best Practices
8. Frequently Asked Questions

Format the documentation in a clear, professional manner with appropriate headings, code examples, and explanations.
`;

        const request: GenerationRequest = {
          prompt,
          context: {
            fileName,
            language
          }
        };

        // Generate the documentation
        const response = await this.client.generateDocumentation(request);

        // Create a new document with the documentation results
        const docDocument = await vscode.workspace.openTextDocument({
          content: response.content,
          language: 'markdown'
        });

        await vscode.window.showTextDocument(docDocument, {
          preview: false,
          viewColumn: vscode.ViewColumn.Beside
        });

        vscode.window.showInformationMessage('Documentation generated successfully!');
      });
    } catch (error) {
      console.error('Error generating documentation:', error);
      vscode.window.showErrorMessage('Failed to generate documentation. Please check your API key and network connection.');
    }
  }
}