import axios, { AxiosInstance } from 'axios';
import * as cursor from 'cursor';

export interface GraphWorkConfig {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

export interface GenerationRequest {
  prompt: string;
  context?: any;
  temperature?: number;
  maxTokens?: number;
}

export interface GenerationResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export class GraphWorkClient {
  private axiosInstance: AxiosInstance;
  private config: GraphWorkConfig;

  constructor(apiKey: string, model: string, temperature: number, maxTokens: number) {
    this.config = { apiKey, model, temperature, maxTokens };
    this.axiosInstance = axios.create({
      baseURL: 'https://api.graphwork.ai/v1', // This would be the actual GraphWork API endpoint
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'GraphWork-Cursor-Extension/2.0.0'
      }
    });

    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          cursor.window.showErrorMessage('Invalid GraphWork API key. Please check your settings.');
        } else if (error.response?.status === 429) {
          cursor.window.showErrorMessage('Rate limit exceeded. Please try again later.');
        } else if (error.code === 'ECONNABORTED') {
          cursor.window.showErrorMessage('Request timeout. Please check your network connection.');
        } else {
          cursor.window.showErrorMessage(`GraphWork API error: ${error.message}`);
        }
        return Promise.reject(error);
      }
    );
  }

  updateConfig(apiKey: string, model: string, temperature: number, maxTokens: number) {
    this.config = { apiKey, model, temperature, maxTokens };
    // @ts-ignore - Type definition issue with axios headers
    this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;
  }

  async generateSpecification(request: GenerationRequest): Promise<GenerationResponse> {
    try {
      const response = await this.axiosInstance.post('/specifications/generate', {
        prompt: request.prompt,
        context: request.context,
        model: this.config.model,
        temperature: request.temperature || this.config.temperature,
        maxTokens: request.maxTokens || this.config.maxTokens
      });

      return {
        content: response.data.content,
        usage: response.data.usage
      };
    } catch (error) {
      console.error('Error generating specification:', error);
      throw error;
    }
  }

  async generateCode(request: GenerationRequest): Promise<GenerationResponse> {
    try {
      const response = await this.axiosInstance.post('/code/generate', {
        prompt: request.prompt,
        context: request.context,
        model: this.config.model,
        temperature: request.temperature || this.config.temperature,
        maxTokens: request.maxTokens || this.config.maxTokens
      });

      return {
        content: response.data.content,
        usage: response.data.usage
      };
    } catch (error) {
      console.error('Error generating code:', error);
      throw error;
    }
  }

  async reviewCode(request: GenerationRequest): Promise<GenerationResponse> {
    try {
      const response = await this.axiosInstance.post('/code/review', {
        prompt: request.prompt,
        context: request.context,
        model: this.config.model,
        temperature: request.temperature || this.config.temperature,
        maxTokens: request.maxTokens || this.config.maxTokens
      });

      return {
        content: response.data.content,
        usage: response.data.usage
      };
    } catch (error) {
      console.error('Error reviewing code:', error);
      throw error;
    }
  }

  async auditSecurity(request: GenerationRequest): Promise<GenerationResponse> {
    try {
      const response = await this.axiosInstance.post('/security/audit', {
        prompt: request.prompt,
        context: request.context,
        model: this.config.model,
        temperature: request.temperature || this.config.temperature,
        maxTokens: request.maxTokens || this.config.maxTokens
      });

      return {
        content: response.data.content,
        usage: response.data.usage
      };
    } catch (error) {
      console.error('Error auditing security:', error);
      throw error;
    }
  }

  async generateDocumentation(request: GenerationRequest): Promise<GenerationResponse> {
    try {
      const response = await this.axiosInstance.post('/documentation/generate', {
        prompt: request.prompt,
        context: request.context,
        model: this.config.model,
        temperature: request.temperature || this.config.temperature,
        maxTokens: request.maxTokens || this.config.maxTokens
      });

      return {
        content: response.data.content,
        usage: response.data.usage
      };
    } catch (error) {
      console.error('Error generating documentation:', error);
      throw error;
    }
  }

  // Utility method to get current file content
  async getCurrentFileContent(): Promise<{ content: string; language: string; fileName: string } | null> {
    const editor = cursor.window.activeTextEditor;
    if (!editor) {
      return null;
    }

    const document = editor.document;
    const content = document.getText();
    const language = document.languageId;
    const fileName = document.fileName;

    return { content, language, fileName };
  }

  // Utility method to get selected text
  getSelectedText(): string | null {
    const editor = cursor.window.activeTextEditor;
    if (!editor) {
      return null;
    }

    const selection = editor.selection;
    if (selection.isEmpty) {
      return null;
    }

    return editor.document.getText(selection);
  }

  // Utility method to get current file path
  getCurrentFilePath(): string | null {
    const editor = cursor.window.activeTextEditor;
    if (!editor) {
      return null;
    }

    return editor.document.uri.fsPath;
  }

  // Utility method to show progress
  async showProgress<T>(title: string, task: () => Promise<T>): Promise<T> {
    return cursor.window.withProgress(
      {
        location: cursor.ProgressLocation.Notification,
        title: `GraphWork: ${title}`,
        cancellable: false
      },
      async () => {
        return task();
      }
    );
  }
}