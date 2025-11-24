// packages/@graphwork/core/src/index.ts
export class GraphWorkCore {
  constructor(private config: any = {}) {
    console.log('GraphWork Core initialized');
  }

  async processRequest(request: any): Promise<any> {
    // Logique de base du framework
    console.log('Processing request:', request);
    return { success: true, data: 'Request processed' };
  }
}