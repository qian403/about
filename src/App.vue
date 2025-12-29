<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div id="app" class="min-h-screen">
    <!-- 主要內容區域 -->
    <main class="relative z-10">
      <router-view v-slot="{ Component, route }">
        <transition name="page-slide" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
/* Page transition animations */
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

/* Material Design Web Components styling */
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

/* Material Design 3 color system - Blue theme */
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

/* Loading spinner styles */
.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: #e0f2fe;
  font-size: 1rem;
  font-weight: 500;
}
</style>
