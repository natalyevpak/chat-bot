import { createApp } from 'vue';
import WialonChatBot from './components/ChatBot.vue';
import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';
import { definePreset } from '@primevue/themes';

// Function to dynamically load CSS
const loadCSS = (href) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
};

// Check if running locally or on Netlify
const isLocal = window.location.hostname === 'localhost';

// Define the correct base URL for assets
const BASE_URL = isLocal
  ? 'http://localhost:5173/src/assets' // Local Vite dev server path
  : 'https://wialon-chat-bot.netlify.app/assets';

// Load PrimeVue styles
loadCSS('https://unpkg.com/primeicons/primeicons.css'); // PrimeIcons
loadCSS('https://unpkg.com/primevue/resources/primevue.min.css'); // PrimeVue base styles
loadCSS('https://unpkg.com/@primevue/themes/lara/light/theme.css'); // PrimeVue Lara theme (light mode)

// Load chatbot custom styles
loadCSS(`${BASE_URL}/base.css`);
loadCSS(`${BASE_URL}/main.css`);
loadCSS(`${BASE_URL}/styles/ChatBot.css`);

const loadChatBot = () => {
  const chatbotContainer = document.createElement('div');
  chatbotContainer.id = 'wialon-chatbot';
  document.body.appendChild(chatbotContainer);

  const app = createApp(WialonChatBot);

  // Define PrimeVue Theme Preset
  const MyPreset = definePreset(Lara, {
    semantic: {
      primary: {
        50: '{blue.50}',
        100: '{blue.100}',
        200: '{blue.200}',
        300: '{blue.300}',
        400: '{blue.400}',
        500: '{blue.500}',
        600: '{blue.600}',
        700: '{blue.700}',
        800: '{blue.800}',
        900: '{blue.900}',
        950: '{blue.950}'
      }
    }
  });

  app.use(PrimeVue, {
    theme: {
      preset: MyPreset,
    },
  });

  app.mount('#wialon-chatbot');
};

// Automatically load chatbot when the script is loaded
loadChatBot();
