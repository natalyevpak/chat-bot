<template>
  <div>
    <Button 
      label="Wialon Chat" 
      class="chat-button" 
      :class="{ 'no-animation': isOpen }"
      @click="toggleChat"
      iconPos="left"
    />

    <Transition name="slide">
      <div v-if="isOpen" class="chat-container">
        <Card class="no-padding-card">
          <template #content>
            <div class="chat-header">
              <span>✨ Wialon Trial Assistant ✨</span>
              <button class="close-btn" @click="toggleChat">
                <i class="pi pi-times"></i>
              </button>
            </div>

            <div ref="chatContainer" class="chat-messages">
            <div 
              v-for="(msg, index) in messages" 
              :key="index" 
              :class="msg.sender === 'user' ? 'user-message' : 'bot-message'"
            >
              <div class="message-header">
                {{ msg.sender === 'user' ? 'User' : 'Assistant' }}
              </div>
              <div :class="['message', msg.sender]">
                {{ msg.text }}
              </div>
            </div>

            <!-- Predefined Message Buttons -->
            <div v-if="showPredefined" class="predefined-messages">
              <Button 
                label="What are Tasks?" 
                class="predefined-btn" 
                @click="sendPredefinedMessage('What are Tasks?')"
              />
              <Button 
                label="Tell me about pricing" 
                class="predefined-btn" 
                @click="sendPredefinedMessage('Tell me about pricing')"
              />
              <Button 
                label="How to contact support?" 
                class="predefined-btn" 
                @click="sendPredefinedMessage('How to contact support?')"
              />
            </div>
          </div>
            <div class="chat-input">
              <InputText v-model="userInput" class="custom-input" @keyup.enter="sendMessage" placeholder="Type a message..." />
              <button class="send-btn" @click="sendMessage">
                <i class="pi pi-send"></i>
              </button>
            </div>
          </template>
        </Card>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import { Transition } from 'vue';

const isOpen = ref(false);
const userInput = ref('');
const messages = ref([
  { text: 'Hi! How can I help you?', sender: 'bot' }
]);
const chatContainer = ref(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};
const toggleChat = () => {
  isOpen.value = !isOpen.value;
};

const sendMessage = () => {
  if (userInput.value.trim() === '') return;

  // Hide predefined messages after first message
  showPredefined.value = false;

  messages.value.push({ text: userInput.value, sender: 'user' });
  userInput.value = '';

  // Scroll to bottom after user message
  scrollToBottom();

  setTimeout(() => {
    messages.value.push({ text: 'Works! We just need to connect the Nova bot.', sender: 'bot' });

    // Scroll to bottom after bot response
    scrollToBottom();
  }, 500);
};

const showPredefined = ref(true); // Controls button visibility

const sendPredefinedMessage = (text) => {
  // Add user message
  messages.value.push({ text, sender: 'user' });

  // Add bot response after a delay
  setTimeout(() => {
    messages.value.push({ text: 'This is an automated response to your query.', sender: 'bot' });
  }, 500);

  // Hide predefined buttons after first click
  showPredefined.value = false;
};

</script>

<style scoped>
@import "../assets/styles/ChatBot.css";
</style>
