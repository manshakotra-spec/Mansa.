<template>
  <div class="chat-panel">
    <div class="chat-header">
      <h2>🤖 AI Assistant</h2>
      <p>Powered by Gemini</p>
    </div>
    
    <div class="chat-messages">
      <div v-for="(msg, idx) in messages" :key="idx" :class="['message', msg.role]">
        <div class="message-content">{{ msg.content }}</div>
      </div>
    </div>
    
    <div class="chat-input">
      <textarea
        v-model="input"
        placeholder="Type your command... (e.g., 'Create a workflow to fetch data')"
        @keydown.enter.ctrl="sendMessage"
      ></textarea>
      <button @click="sendMessage" :disabled="!input.trim()">
        Send
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const input = ref('')
const messages = ref<Message[]>([
  {
    role: 'assistant',
    content: 'Hello! I\'m your AI assistant powered by Gemini. How can I help you create or manage workflows?'
  }
])

async function sendMessage() {
  if (!input.value.trim()) return
  
  // Add user message
  messages.value.push({
    role: 'user',
    content: input.value
  })
  
  const userMessage = input.value
  input.value = ''
  
  try {
    // Send to API
    const response = await fetch('/api/ai-command', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage })
    })
    
    if (!response.ok) throw new Error('API request failed')
    
    const data = await response.json()
    
    // Add assistant response
    messages.value.push({
      role: 'assistant',
      content: data.response || 'I\'m processing your request...'
    })
  } catch (error) {
    messages.value.push({
      role: 'assistant',
      content: '❌ Error: Could not process your request. Please try again.'
    })
  }
}
</script>

<style scoped>
.chat-panel {
  display: flex;
  flex-direction: column;
  height: 600px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.chat-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 212, 255, 0.2);
  background: rgba(0, 212, 255, 0.05);
}

.chat-header h2 {
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
}

.chat-header p {
  margin: 0;
  color: rgba(0, 212, 255, 0.7);
  font-size: 0.9rem;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  display: flex;
  animation: fadeIn 0.3s ease-in;
}

.message.user {
  justify-content: flex-end;
}

.message.assistant {
  justify-content: flex-start;
}

.message-content {
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  word-wrap: break-word;
}

.message.user .message-content {
  background: linear-gradient(135deg, #00d4ff, #0099cc);
  color: white;
}

.message.assistant .message-content {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.chat-input {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid rgba(0, 212, 255, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

textarea {
  flex: 1;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 6px;
  color: white;
  font-family: inherit;
  font-size: 0.95rem;
  resize: none;
  outline: none;
  transition: border-color 0.2s;
}

textarea:focus {
  border-color: rgba(0, 212, 255, 0.5);
}

textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #00d4ff, #0099cc);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.1s;
}

button:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .chat-panel {
    height: 400px;
  }
  
  .message-content {
    max-width: 100%;
  }
}
</style>
