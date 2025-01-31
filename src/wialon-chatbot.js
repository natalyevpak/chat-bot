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

// Function to Load External CSS
const loadCSS = (href) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
};

// Load PrimeIcons
loadCSS('https://unpkg.com/primeicons/primeicons.css');

// Load ChatBot.css (Ensure the correct path based on your deployment)
loadCSS('https://wialon-chat-bot.netlify.app/assets/styles/ChatBot.css');

// Automatically load the chatbot when the script is loaded
loadChatBot();
