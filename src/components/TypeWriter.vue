<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  texts: { type: Array, required: true },
  speed: { type: Number, default: 100 },
  deleteSpeed: { type: Number, default: 50 },
  pause: { type: Number, default: 2000 }
})

const displayText = ref('')
const currentIndex = ref(0)
let timeout = null

const typeText = () => {
  const text = props.texts[currentIndex.value]
  let charIndex = 0
  
  const type = () => {
    if (charIndex < text.length) {
      displayText.value = text.slice(0, charIndex + 1)
      charIndex++
      timeout = setTimeout(type, props.speed)
    } else {
      timeout = setTimeout(deleteText, props.pause)
    }
  }
  
  const deleteText = () => {
    if (displayText.value.length > 0) {
      displayText.value = displayText.value.slice(0, -1)
      timeout = setTimeout(deleteText, props.deleteSpeed)
    } else {
      currentIndex.value = (currentIndex.value + 1) % props.texts.length
      timeout = setTimeout(typeText, 500)
    }
  }
  
  type()
}

onMounted(() => typeText())
onUnmounted(() => {
  if (timeout) clearTimeout(timeout)
})

// 暴露內部狀態供測試使用
defineExpose({
  displayText,
  currentIndex
})
</script>

<template>
  <span class="typewriter">
    <span class="typewriter-text">{{ displayText }}</span>
    <span class="typewriter-cursor">|</span>
  </span>
</template>

<style scoped>
.typewriter {
  display: inline-flex;
  align-items: center;
}

.typewriter-text {
  display: inline;
}

.typewriter-cursor {
  display: inline-block;
  margin-left: 2px;
  animation: blink 1s step-end infinite;
  color: currentColor;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* 尊重使用者的動畫偏好 */
@media (prefers-reduced-motion: reduce) {
  .typewriter-cursor {
    animation: none;
    opacity: 1;
  }
}
</style>
