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
        format: 'iife', 
        entryFileNames: 'wialon-chatbot.js',
        name: 'WialonChatBot',
      }
    }
  },
  assetsInclude: ['**/*.css'] // Ensure CSS files are included in the build
});
