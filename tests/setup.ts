// tests/setup.ts
// Setup file for Jest tests

// Global test setup
beforeAll(() => {
  // Set environment variables for testing
  process.env.NODE_ENV = 'test';
});

// Global test teardown
afterAll(() => {
  // Clean up any resources
});