import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true, 
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },

})
