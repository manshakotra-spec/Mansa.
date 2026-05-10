<template>
  <div class="ai-panel">
    <h2>AI Assistant</h2>
    <textarea
      v-model="message"
      placeholder="Type command..."
    ></textarea>
    <button @click="sendMessage">
      Send
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const message = ref("");

async function sendMessage(){
  const res = await fetch("/api/ai-command",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      message:message.value
    })
  });

  const data = await res.json();
  console.log(data);
}
</script>

<style>
.ai-panel{
  position:fixed;
  right:0;
  top:0;
  width:320px;
  height:100vh;
  background:#1f1f1f;
  color:white;
  z-index:9999;
  padding:20px;
}

textarea{
  width:100%;
  height:150px;
}

button{
  width:100%;
  height:45px;
  margin-top:10px;
}
</style>