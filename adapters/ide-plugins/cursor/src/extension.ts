import * as cursor from 'cursor';
import { GraphWorkClient } from './graphworkClient';
import { SpecGenerator } from './specGenerator';
import { CodeGenerator } from './codeGenerator';
import { CodeReviewer } from './codeReviewer';
import { SecurityAuditor } from './securityAuditor';
import { DocumentationGenerator } from './documentationGenerator';

let graphWorkClient: GraphWorkClient;

export function activate(context: cursor.ExtensionContext) {
  console.log('GraphWork extension is now active!');

  // Initialize the GraphWork client
  const config = cursor.workspace.getConfiguration('graphwork');
  graphWorkClient = new GraphWorkClient(
    config.get<string>('apiKey') || '',
    config.get<string>('model') || 'gpt-4',
    config.get<number>('temperature') || 0.7,
    config.get<number>('maxTokens') || 2000
  );

  // Register commands
  const generateSpecCommand = cursor.commands.registerCommand(
    'graphwork.generateSpecification',
    async (uri: cursor.Uri) => {
      const specGenerator = new SpecGenerator(graphWorkClient);
      await specGenerator.generateSpecification(uri);
    }
  );

  const generateCodeCommand = cursor.commands.registerCommand(
    'graphwork.generateCode',
    async () => {
      const codeGenerator = new CodeGenerator(graphWorkClient);
      await codeGenerator.generateCode();
    }
  );

  const reviewCodeCommand = cursor.commands.registerCommand(
    'graphwork.reviewCode',
    async () => {
      const codeReviewer = new CodeReviewer(graphWorkClient);
      await codeReviewer.reviewCode();
    }
  );

  const auditSecurityCommand = cursor.commands.registerCommand(
    'graphwork.auditSecurity',
    async () => {
      const securityAuditor = new SecurityAuditor(graphWorkClient);
      await securityAuditor.auditSecurity();
    }
  );

  const generateDocumentationCommand = cursor.commands.registerCommand(
    'graphwork.generateDocumentation',
    async () => {
      const docGenerator = new DocumentationGenerator(graphWorkClient);
      await docGenerator.generateDocumentation();
    }
  );

  const runAllAgentsCommand = cursor.commands.registerCommand(
    'graphwork.runAllAgents',
    async () => {
      // Run all agents in sequence
      const specGenerator = new SpecGenerator(graphWorkClient);
      const codeGenerator = new CodeGenerator(graphWorkClient);
      const codeReviewer = new CodeReviewer(graphWorkClient);
      const securityAuditor = new SecurityAuditor(graphWorkClient);
      const docGenerator = new DocumentationGenerator(graphWorkClient);

      await specGenerator.generateSpecification();
      await codeGenerator.generateCode();
      await codeReviewer.reviewCode();
      await securityAuditor.auditSecurity();
      await docGenerator.generateDocumentation();

      cursor.window.showInformationMessage('All GraphWork agents have completed their tasks!');
    }
  );

  // Add disposables to context
  context.subscriptions.push(
    generateSpecCommand,
    generateCodeCommand,
    reviewCodeCommand,
    auditSecurityCommand,
    generateDocumentationCommand,
    runAllAgentsCommand
  );

  // Register configuration change listener
  context.subscriptions.push(
    cursor.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration('graphwork')) {
        const newConfig = cursor.workspace.getConfiguration('graphwork');
        graphWorkClient.updateConfig(
          newConfig.get<string>('apiKey') || '',
          newConfig.get<string>('model') || 'gpt-4',
          newConfig.get<number>('temperature') || 0.7,
          newConfig.get<number>('maxTokens') || 2000
        );
      }
    })
  );
}

export function deactivate() {
  console.log('GraphWork extension is now deactivated!');
}