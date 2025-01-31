import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist', // Output directory
    rollupOptions: {
      output: {
        format: 'iife', // Immediately Invoked Function Expression (No import needed)
        entryFileNames: 'wialon-chatbot.js', // Output file name
      }
    }
  }
});
