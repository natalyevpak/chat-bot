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

<template>
  <div>
    <Button 
      label="Chat with Wialon" 
      class="chat-button" 
      @click="toggleChat"
    />

    <Transition name="slide">
      <div v-if="isOpen" class="chat-container">
        <Card>
          <template #content>
            <div class="chat-header">
              <span>Wialon ChatBot</span>
              <Button icon="pi pi-times" text @click="toggleChat" class="close-btn" />
            </div>

            <div class="chat-messages">
              <div 
                v-for="(msg, index) in messages" 
                :key="index" 
                :class="['message', msg.sender]"
              >
                {{ msg.text }}
              </div>
            </div>

            <div class="chat-input">
              <InputText 
                v-model="userInput" 
                @keyup.enter="sendMessage" 
                placeholder="Type a message..." 
              />
              <Button icon="pi pi-send" text class="send-btn" @click="sendMessage" />
            </div>
          </template>
        </Card>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
@import "../assets/styles/ChatBot.css";

</style>