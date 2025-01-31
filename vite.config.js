import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/wialon-chatbot.js', // Entry point
      name: 'WialonChatBot',
      fileName: 'wialon-chatbot'
    },
    rollupOptions: {
      external: ['vue', 'primevue'], // Exclude Vue & PrimeVue to avoid duplication
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
          @import "@/assets/base.css";
          @import "@/assets/main.css";
          @import "@/assets/styles/ChatBot.css";
        `
      }
    }
  }
});












