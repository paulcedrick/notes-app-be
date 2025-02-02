import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.d.ts',
        '**/*.test.ts',
        'coverage/**'
      ],
      enabled: true,
      all: true,
    },
    setupFiles: ['dotenv/config'],
    teardownTimeout: 10000,
    globalSetup: './scripts/test-db-setup.ts',
    env: {
      NODE_ENV: 'test'
    },
    
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})