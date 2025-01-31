import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: path.resolve(__dirname, 'src/wialon-chatbot.js'),
      output: {
        format: 'iife', // IIFE makes it work on all browsers
        entryFileNames: 'wialon-chatbot.js', // Output filename
        name: 'WialonChatBot', // Global variable name
      }
    }
  }
});
