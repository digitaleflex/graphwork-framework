import * as cursor from 'cursor';
import { GraphWorkClient, GenerationRequest } from './graphworkClient';

export class CodeGenerator {
  constructor(private client: GraphWorkClient) {}

  async generateCode() {
    try {
      const editor = cursor.window.activeTextEditor;
      if (!editor) {
        cursor.window.showErrorMessage('No active editor found');
        return;
      }

      // Get the current file information
      const document = editor.document;
      const fileName = document.fileName;
      const language = document.languageId;
      const fileContent = document.getText();

      // Get selected text or entire file
      let selectedText = '';
      let selectionRange: cursor.Range | undefined;

      if (!editor.selection.isEmpty) {
        selectedText = document.getText(editor.selection);
        selectionRange = editor.selection;
      } else {
        selectedText = fileContent;
        selectionRange = new cursor.Range(
          document.positionAt(0),
          document.positionAt(fileContent.length)
        );
      }

      // Ask user for generation instructions
      const instructions = await cursor.window.showInputBox({
        prompt: 'Enter instructions for code generation',
        placeHolder: 'e.g., Implement a function to calculate fibonacci sequence'
      });

      if (!instructions) {
        return;
      }

      // Show progress
      await this.client.showProgress('Generating code...', async () => {
        // Create the prompt for the AI
        const prompt = `
You are a code generator AI assistant. Your task is to generate high-quality, secure, and well-structured code based on the user's request.

Current File: ${fileName}
Language: ${language}

Instructions: ${instructions}

Current Code:
${selectedText}

Please generate code that:
1. Follows best practices and coding standards for ${language}
2. Is secure and free from vulnerabilities
3. Is well-documented with comments
4. Is efficient and performant
5. Follows the specified technology stack and patterns

Include appropriate error handling, validation, and security measures.
`;

        const request: GenerationRequest = {
          prompt,
          context: {
            fileName,
            language,
            instructions
          }
        };

        // Generate the code
        const response = await this.client.generateCode(request);

        // Replace selected text or insert at cursor
        await editor.edit((editBuilder: cursor.TextEditorEdit) => {
          if (selectionRange) {
            editBuilder.replace(selectionRange, response.content);
          } else {
            editBuilder.insert(editor.selection.active, response.content);
          }
        });

        cursor.window.showInformationMessage('Code generated successfully!');
      });
    } catch (error) {
      console.error('Error generating code:', error);
      cursor.window.showErrorMessage('Failed to generate code. Please check your API key and network connection.');
    }
  }
}