<template>
  <div>
    <Button 
      label="Wialon Help" 
      icon="pi pi-sparkles"
      class="chat-button" 
      @click="toggleChat"
    />

    <Transition name="slide">
      <div v-if="isOpen" class="chat-container">
        <Card class="no-padding-card">
          <template #content>
            <div class="chat-header">
              <span>Wialon Start Assistant</span>
              <button class="close-btn" @click="toggleChat">
                <i class="pi pi-times"></i>
              </button>
            </div>

            <div class="chat-messages">

              <div v-for="(msg, index) in messages" :key="index" :class="msg.sender === 'user' ? 'user-message' : 'bot-message'">
                <div class="message-header">
                {{ msg.sender === 'user' ? 'You' : 'Assistant' }}
                <i v-if="msg.sender === 'bot'" class="pi pi-lightbulb assistant-icon"></i>
                <i v-if="msg.sender === 'user'" class="pi pi-user user-icon"></i>
              </div>
              <div :class="['message', msg.sender]">
                {{ msg.text }}
              </div>
              
            </div>

            </div>

            <div class="chat-input">
              <InputText v-model="userInput" @keyup.enter="sendMessage" placeholder="Type a message..." />
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
  { text: 'Hello! How can I help you?', sender: 'bot' }
]);

const toggleChat = () => {
  isOpen.value = !isOpen.value;
};

const sendMessage = () => {
  if (userInput.value.trim() === '') return;

  messages.value.push({ text: userInput.value, sender: 'user' });

  setTimeout(() => {
    messages.value.push({ text: 'I am just a simple bot for now.', sender: 'bot' });
  }, 500);

  userInput.value = '';
};
</script>

<style scoped>
@import "../assets/styles/ChatBot.css";
</style>
