import * as cursor from 'cursor';
import { GraphWorkClient, GenerationRequest } from './graphworkClient';
import * as fs from 'fs';
import * as path from 'path';

export class SpecGenerator {
  constructor(private client: GraphWorkClient) {}

  async generateSpecification(uri?: cursor.Uri) {
    try {
      // Get the target directory
      let targetDir: string;
      if (uri) {
        targetDir = uri.fsPath;
      } else {
        const folders = cursor.workspace.workspaceFolders;
        if (!folders || folders.length === 0) {
          cursor.window.showErrorMessage('No workspace folder found');
          return;
        }
        targetDir = folders[0].uri.fsPath;
      }

      // Ask user for specification details
      const specName = await cursor.window.showInputBox({
        prompt: 'Enter the name of the specification',
        placeHolder: 'e.g., User Authentication System'
      });

      if (!specName) {
        return;
      }

      const description = await cursor.window.showInputBox({
        prompt: 'Enter a brief description of the specification',
        placeHolder: 'e.g., A system for user registration, login, and authentication'
      });

      if (!description) {
        return;
      }

      // Show progress
      await this.client.showProgress('Generating specification...', async () => {
        // Create the prompt for the AI
        const prompt = `
You are a specification writer AI assistant. Your task is to create a clear, comprehensive, and well-structured specification based on the user's request.

User Request: ${specName}

Description: ${description}

Context Information:
- Target directory: ${targetDir}
- Workspace: ${cursor.workspace.name || 'Unnamed workspace'}

Please generate a specification document that includes:

1. Overview and Objectives
2. Functional Requirements
3. Non-Functional Requirements
4. Technical Constraints
5. Success Criteria
6. Assumptions and Dependencies

Format the specification in a clear, professional manner with appropriate headings and structure.
`;

        const request: GenerationRequest = {
          prompt,
          context: {
            targetDir,
            workspace: cursor.workspace.name
          }
        };

        // Generate the specification
        const response = await this.client.generateSpecification(request);

        // Create the specification file
        const specFileName = `${specName.replace(/\s+/g, '-').toLowerCase()}-specification.md`;
        const specFilePath = path.join(targetDir, specFileName);

        // Write the specification to file
        fs.writeFileSync(specFilePath, response.content);

        // Open the generated specification
        const document = await cursor.workspace.openTextDocument(specFilePath);
        await cursor.window.showTextDocument(document);

        cursor.window.showInformationMessage(`Specification generated successfully: ${specFileName}`);
      });
    } catch (error) {
      console.error('Error generating specification:', error);
      cursor.window.showErrorMessage('Failed to generate specification. Please check your API key and network connection.');
    }
  }
}