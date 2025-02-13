import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';
import 'primeicons/primeicons.css'
import { definePreset } from '@primevue/themes';
import App from './App.vue'

const app = createApp(App);


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
        options: {
            darkModeSelector: false || 'none',
        }
    },
});

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
  
  loadCSS('https://unpkg.com/primeicons/primeicons.css'); // PrimeIcons
  loadCSS('https://unpkg.com/primevue/resources/primevue.min.css'); // PrimeVue base styles
  loadCSS('https://unpkg.com/@primevue/themes/lara/light/theme.css'); // PrimeVue Lara theme (light mode)

app.mount('#app')


