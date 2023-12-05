/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      include: [
        'src',
      ],
      exclude: [
        '**/constants',
        '**/mock-data',
        '**/msw',
        '**/types',
        'src/*.tsx',
        'src/*.ts',
      ]
    },
    
  },
})
