<template>
  <div class="app">
    <header class="app-header">
      <h1>🚀 Mansa. - AI-Powered Workflow Automation</h1>
    </header>
    
    <main class="app-main">
      <div class="container">
        <section class="welcome">
          <h2>Welcome to Mansa.</h2>
          <p>AI-powered N8N workflow automation with Gemini integration</p>
        </section>
        
        <ChatPanel />
      </div>
    </main>
    
    <footer class="app-footer">
      <p>&copy; 2026 Mansa. - All rights reserved</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import ChatPanel from './components/ChatPanel.vue'
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #1f1f1f 0%, #2d2d2d 100%);
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.app-header {
  background: rgba(0, 212, 255, 0.1);
  border-bottom: 1px solid rgba(0, 212, 255, 0.2);
  padding: 2rem;
  text-align: center;
}

.app-header h1 {
  margin: 0;
  font-size: 2rem;
  background: linear-gradient(135deg, #00d4ff, #0099cc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.app-main {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome {
  text-align: center;
  margin-bottom: 3rem;
}

.welcome h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.welcome p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
}

.app-footer {
  border-top: 1px solid rgba(0, 212, 255, 0.2);
  padding: 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .app-header h1 {
    font-size: 1.5rem;
  }
  
  .app-main {
    padding: 1rem;
  }
  
  .welcome h2 {
    font-size: 1.3rem;
  }
}
</style>
