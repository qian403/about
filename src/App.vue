<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useMainStore } from './stores/main'

const route = useRoute()
const store = useMainStore()
const isLoading = computed(() => store.isLoading)
const isCVPage = computed(() => route.path === '/cv')

const onEnter = (el: Element) => {
  store.setLoading(false)
}
</script>

<template>
  <div id="app" class="min-h-screen">
    <!-- 主要內容區域 -->
    <main class="relative z-10">
      <router-view v-slot="{ Component, route }">
        <transition name="page-slide" mode="out-in" @enter="onEnter">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <div v-if="isLoading" class="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex items-center justify-center">
      <div class="text-center">

      </div>
    </div>
  </div>
</template>

<style>
.page-slide-enter-active,
.page-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

html {
  scroll-behavior: smooth;
}

/* 防止g3m/53水平滾動 */
html,
body {
  overflow-x: hidden;
  max-width: 100vw;
}

#app {
  overflow-x: hidden;
  max-width: 100vw;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background: #e0e0e0;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #bdbdbd;
}


::selection {
  background-color: rgba(59, 130, 246, 0.4);
  color: #e0f2fe;
}

:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

md-card {
  --md-sys-color-surface: rgba(255, 255, 255, 0.1);
  --md-sys-color-surface-container: rgba(255, 255, 255, 0.05);
  --md-sys-color-on-surface: #e0f2fe;
  --md-sys-color-on-surface-variant: #93c5fd;
  --md-sys-color-outline: #60a5fa;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.1), 0 4px 16px rgba(59, 130, 246, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(96, 165, 250, 0.2);
}

md-button {
  --md-sys-color-primary: #3b82f6;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-outline: #60a5fa;
  --md-sys-color-on-surface-variant: #93c5fd;
  border-radius: 20px;
}

md-linear-progress {
  --md-sys-color-primary: #3b82f6;
  --md-sys-color-surface-container: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

md-circular-progress-four-color {
  --md-sys-color-primary: #3b82f6;
}

md-icon {
  color: inherit;
  font-family: 'Material Symbols Outlined';
  font-size: 24px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

/* 全域字體 */
body {
  font-family: 'Roboto', sans-serif;
  color: #e0f2fe;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%);
  min-height: 100vh;
}

/* Material Design 3 色彩系統 - 藍色調 */
:root {
  --md-sys-color-primary: #3b82f6;
  --md-sys-color-on-primary: #ffffff;
  --md-sys-color-primary-container: #dbeafe;
  --md-sys-color-on-primary-container: #1e40af;
  --md-sys-color-secondary: #60a5fa;
  --md-sys-color-on-secondary: #ffffff;
  --md-sys-color-secondary-container: #bfdbfe;
  --md-sys-color-on-secondary-container: #1e3a8a;
  --md-sys-color-surface: rgba(255, 255, 255, 0.1);
  --md-sys-color-on-surface: #e0f2fe;
  --md-sys-color-surface-container: rgba(255, 255, 255, 0.05);
  --md-sys-color-on-surface-variant: #93c5fd;
  --md-sys-color-outline: #60a5fa;
}
</style>
