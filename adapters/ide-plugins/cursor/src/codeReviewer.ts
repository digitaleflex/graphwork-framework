import * as cursor from 'cursor';
import { GraphWorkClient, GenerationRequest } from './graphworkClient';

export class CodeReviewer {
  constructor(private client: GraphWorkClient) {}

  async reviewCode() {
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
      if (!editor.selection.isEmpty) {
        selectedText = document.getText(editor.selection);
      } else {
        selectedText = fileContent;
      }

      // Show progress
      await this.client.showProgress('Reviewing code...', async () => {
        // Create the prompt for the AI
        const prompt = `
You are a quality reviewer AI assistant. Your task is to review code for quality, security, and adherence to best practices.

File: ${fileName}
Language: ${language}

Code to Review:
${selectedText}

Please provide a detailed review that includes:

1. Code Quality Assessment
   - Readability and maintainability
   - Adherence to coding standards for ${language}
   - Code organization and structure

2. Security Review
   - Potential vulnerabilities
   - Security best practices compliance
   - Input validation and sanitization

3. Performance Analysis
   - Efficiency considerations
   - Potential bottlenecks
   - Optimization suggestions

4. Best Practices Compliance
   - Industry standard adherence
   - Framework-specific guidelines
   - Documentation quality

5. Recommendations for Improvement
   - Specific suggestions for enhancement
   - Priority levels for each recommendation

Format your response as a structured review report with clear headings and actionable feedback.
`;

        const request: GenerationRequest = {
          prompt,
          context: {
            fileName,
            language
          }
        };

        // Generate the review
        const response = await this.client.reviewCode(request);

        // Create a new document with the review results
        const reviewDocument = await cursor.workspace.openTextDocument({
          content: response.content,
          language: 'markdown'
        });

        await cursor.window.showTextDocument(reviewDocument, {
          preview: false,
          viewColumn: cursor.ViewColumn.Beside
        });

        cursor.window.showInformationMessage('Code review completed successfully!');
      });
    } catch (error) {
      console.error('Error reviewing code:', error);
      cursor.window.showErrorMessage('Failed to review code. Please check your API key and network connection.');
    }
  }
}