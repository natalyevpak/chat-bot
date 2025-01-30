import { createApp } from 'vue';
import WialonChatBot from './components/ChatBot.vue';
import PrimeVue from 'primevue/config';

const loadChatBot = () => {
  const chatbotContainer = document.createElement('div');
  chatbotContainer.id = 'wialon-chatbot';
  document.body.appendChild(chatbotContainer);

  const app = createApp(WialonChatBot);
  app.use(PrimeVue);
  app.mount('#wialon-chatbot');
};

// Automatically load the chatbot when the script is loaded
loadChatBot();
