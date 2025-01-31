import { createApp } from 'vue';
import WialonChatBot from './components/ChatBot.vue';
import PrimeVue from 'primevue/config';

// Import all necessary CSS files
import './assets/base.css';
import './assets/main.css';
import './assets/styles/ChatBot.css';


const loadChatBot = () => {
  const chatbotContainer = document.createElement('div');
  chatbotContainer.id = 'wialon-chatbot';
  document.body.appendChild(chatbotContainer);

  const app = createApp(WialonChatBot);
  app.use(PrimeVue);
  app.mount('#wialon-chatbot');
};

loadChatBot();