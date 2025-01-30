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
      external: ['vue', 'primevue'], // Exclude Vue & PrimeVue to avoid duplications
      output: {
        globals: {
          vue: 'Vue',
          primevue: 'PrimeVue'
        }
      }
    }
  }
});
