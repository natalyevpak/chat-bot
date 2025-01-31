(() => {
  const loadScript = (src, callback) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = callback;
      document.head.appendChild(script);
  };

  const loadCSS = (href) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
  };

  // Load styles dynamically
  loadCSS('https://wialon-chat-bot.netlify.app/assets/base.css');
  loadCSS('https://wialon-chat-bot.netlify.app/assets/main.css');
  loadCSS('https://wialon-chat-bot.netlify.app/assets/styles/ChatBot.css');

  // Load Vue 3 & PrimeVue dynamically
  loadScript('https://unpkg.com/vue@3/dist/vue.global.prod.js', () => {
      loadScript('https://unpkg.com/primevue/core/core.min.js', () => {
          loadScript('https://unpkg.com/primevue/button/button.min.js', () => {
              loadScript('https://unpkg.com/primevue/inputtext/inputtext.min.js', () => {
                  initChatbot();
              });
          });
      });
  });

  const initChatbot = () => {
      const { createApp, ref } = Vue;
      const { Button } = primevue.button;
      const { InputText } = primevue.inputtext;

      const chatbotContainer = document.createElement('div');
      chatbotContainer.id = 'wialon-chatbot';
      document.body.appendChild(chatbotContainer);

      const ChatBot = {
          template: `
              <div>
                  <Button label="Chat" class="chat-button" @click="toggleChat" />
                  <div v-if="isOpen" class="chat-container">
                      <div class="chat-header">
                          <span>Wialon ChatBot</span>
                          <Button icon="pi pi-times" text @click="toggleChat" />
                      </div>
                      <div class="chat-messages">
                          <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.sender]">
                              {{ msg.text }}
                          </div>
                      </div>
                      <div class="chat-input">
                          <InputText v-model="userInput" @keyup.enter="sendMessage" placeholder="Type a message..." />
                          <Button icon="pi pi-send" text @click="sendMessage" />
                      </div>
                  </div>
              </div>
          `,
          components: { Button, InputText },
          setup() {
              const isOpen = ref(false);
              const userInput = ref('');
              const messages = ref([{ text: 'Hello! How can I help you?', sender: 'bot' }]);

              const toggleChat = () => { isOpen.value = !isOpen.value; };

              const sendMessage = () => {
                  if (userInput.value.trim() === '') return;
                  messages.value.push({ text: userInput.value, sender: 'user' });

                  setTimeout(() => {
                      messages.value.push({ text: 'I am just a simple bot for now.', sender: 'bot' });
                  }, 500);

                  userInput.value = '';
              };

              return { isOpen, userInput, messages, toggleChat, sendMessage };
          }
      };

      createApp(ChatBot).mount('#wialon-chatbot');
  };
})();
