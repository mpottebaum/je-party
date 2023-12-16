/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      include: [
        'src',
      ],
      exclude: [
        'src/constants',
        'src/mock-data',
        'src/msw',
        'src/types',
        'src/*.tsx',
        'src/*.ts',
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      }
    },
    
  },
})
