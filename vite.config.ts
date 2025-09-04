import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      'types': path.resolve(__dirname, './src/types'),
      '@handlers': path.resolve(__dirname, './src/handlers'),
    },
  },
  plugins: [react()],
});
