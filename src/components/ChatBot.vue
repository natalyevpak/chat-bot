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

                <!-- Feedback Buttons for Last Bot Message -->
                <!-- Hide feedback for the first bot message -->
                  <div
                    v-if="msg.sender === 'bot' && index === lastBotMessageIndex && index !== 0"
                    class="footer-buttons"
                  >

                  <Button
                    icon="pi pi-thumbs-up"
                    class="like-btn"
                    text
                    aria-label="Like"
                    style="color: #127543"
                    @click="openFeedbackDialog('positive')"
                  />
                  <Button
                    icon="pi pi-thumbs-down"
                    class="dislike-btn"
                    text
                    aria-label="Dislike"
                    style="color: #D40E42"
                    @click="openFeedbackDialog('negative')"
                  />
                  <Button
                    icon="pi pi-envelope"
                    class="mail-btn"
                    text
                    aria-label="Share"
                    style="color: #1e1eee"
                    @click="openSendToSupportDialog"
                  />
                  <Button
                    :icon="copyState === index ? 'pi pi-check' : 'pi pi-copy'"
                    class="copy-btn"
                    text
                    aria-label="Copy"
                    style="color: black"
                    @click="copyToClipboard(msg.text, index)"
                  />
                </div>
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
                @click="sendPredefinedMessage('How to contact support')"
              />
            </div>

            <div class="chat-input">
              <InputText v-model="userInput" class="custom-input" @keyup.enter="sendMessage" placeholder="Ask a question..." />
              <button class="send-btn" @click="sendMessage">
                <i class="pi pi-send"></i>
              </button>
            </div>
          </template>
        </Card>
      </div>
    </Transition>

    <!-- Feedback Dialog -->
    <Dialog 
  v-model:visible="isFeedbackDialogVisible" 
  :header="feedbackTitle"
  modal="false"
  autoFocus="false"
  class="feedback-dialog"
>
      <p>{{ feedbackMessage }}</p>
      <div class="feedback-actions">
        <Button label="Cancel" @click="isFeedbackDialogVisible = false" />
        <Button label="Submit" @click="submitFeedback" />
      </div>
    </Dialog>
  </div>
</template>


<script setup>
import { nextTick, ref, computed, watchEffect } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import { Transition } from 'vue';
import Dialog from 'primevue/dialog';

const isOpen = ref(false);
const userInput = ref('');
const messages = ref([
  { text: 'Hi! How can I help you?', sender: 'bot' }
]);
const chatContainer = ref(null);

const lastBotMessageIndex = computed(() => {
  if (!messages.value.length) return null; // Prevents issues when array is empty
  const lastIndex = [...messages.value].reverse().findIndex(msg => msg.sender === 'bot');
  return lastIndex === -1 ? null : messages.value.length - 1 - lastIndex;
});


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
    messages.value.push({ text: 'Connect nova and I will tell you!', sender: 'bot' });
  }, 500);

  // Hide predefined buttons after first click
  showPredefined.value = false;
};

const isFeedbackDialogVisible = ref(false);
const feedbackTitle = ref('');
const feedbackMessage = ref('');
const copyState = ref(null);

const openFeedbackDialog = (type) => {
  isFeedbackDialogVisible.value = true;
  feedbackTitle.value = type === 'positive' ? 'Thank You!' : 'We appreciate your feedback';
  feedbackMessage.value = type === 'positive' ? 'Glad you found this helpful!' : 'Tell us what went wrong.';
};

const openSendToSupportDialog = () => {
  isFeedbackDialogVisible.value = true;
  feedbackTitle.value = 'Send to Support';
  feedbackMessage.value = 'Would you like to forward this to our support team?';
};

const copyToClipboard = (text, index) => {
  navigator.clipboard.writeText(text);
  copyState.value = index;
  setTimeout(() => {
    copyState.value = null;
  }, 1000);
};


</script>

<style scoped>
@import "../assets/styles/ChatBot.css";
</style>
