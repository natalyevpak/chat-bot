import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/wialon-chatbot.js', // Entry point for chatbot
      name: 'WialonChatBot',
      fileName: 'wialon-chatbot'
    },
    rollupOptions: {
      external: ['vue', 'primevue'], // Exclude Vue & PrimeVue to prevent duplication
      output: {
        globals: {
          vue: 'Vue',
          primevue: 'PrimeVue'
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `
          @import "./src/assets/base.css";
          @import "./src/assets/main.css";
          @import "./src/assets/styles/ChatBot.css";
        `
      }
    }
  },
  build: {
    assetsInlineLimit: 0, // Prevent inlining small assets (ensures CSS is properly loaded)
    outDir: 'dist',
    cssCodeSplit: false // ✅ Ensures all CSS is bundled into a single file
  }
});
