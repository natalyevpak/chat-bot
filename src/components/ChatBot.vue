<template>
  <div>
    <Button 
      label="Wialon Chat" 
      class="chat-button" 
      @click="toggleChat"
      iconPos="left"
    />

    <Transition name="slide">
      <div v-if="isOpen" class="chat-container">
        <Card class="no-padding-card">
          <template #content>
            <div class="chat-header">
              <span>✨ Wialon Start AI Chatbot ✨</span>
              <button class="close-btn" @click="toggleChat">
                <i class="pi pi-times"></i>
              </button>
            </div>

            <div class="chat-messages">
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
import { ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import { Transition } from 'vue';

const isOpen = ref(false);
const userInput = ref('');
const messages = ref([
  { text: 'Hi! How can I help you?', sender: 'bot' }
]);

const toggleChat = () => {
  isOpen.value = !isOpen.value;
};

const sendMessage = () => {
  if (userInput.value.trim() === '') return;

  messages.value.push({ text: userInput.value, sender: 'user' });

  setTimeout(() => {
    messages.value.push({ text: 'Works! We just need connect the nova bot.', sender: 'bot' });
  }, 500);

  userInput.value = '';
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
