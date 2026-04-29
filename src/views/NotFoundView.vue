<template>
  <main class="not-found">
    <div class="not-found-content">
      <h1>404</h1>
      <p>This page does not exist.</p>
      <a href="/">← Back to home</a>
    </div>
  </main>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  document.title = '404 Not Found | chien.dev'

  const meta = document.createElement('meta')
  meta.setAttribute('name', 'robots')
  meta.setAttribute('content', 'noindex, nofollow')
  meta.setAttribute('data-dynamic', 'noindex')
  document.head.appendChild(meta)
})

onUnmounted(() => {
  const meta = document.querySelector('meta[data-dynamic="noindex"]')
  if (meta) document.head.removeChild(meta)
  document.title = 'HSU CHIA CHIEN | Cybersecurity Engineer & Backend Developer'
})
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0d1b2a;
  color: #e8f4f8;
  font-family: Inter, sans-serif;
}

.not-found-content {
  text-align: center;
}

.not-found-content h1 {
  font-size: 6rem;
  font-weight: 800;
  color: #64b5f6;
  margin: 0;
}

.not-found-content p {
  font-size: 1.25rem;
  margin: 1rem 0 2rem;
  opacity: 0.7;
}

.not-found-content a {
  color: #64b5f6;
  text-decoration: none;
  font-size: 1rem;
}

.not-found-content a:hover {
  text-decoration: underline;
}
</style>
