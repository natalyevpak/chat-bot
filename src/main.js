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

    },
});

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelectorAll('[data-primevue-style-id="global-variables"]').forEach(styleTag => {
            styleTag.innerHTML = styleTag.innerHTML.replace(/@media \(prefers-color-scheme: dark\) {[^}]+}/g, '');
        });
    }, 100); // Даем PrimeVue загрузиться
});


app.mount('#app')


