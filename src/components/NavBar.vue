<template>
  <div ref="sentinelRef" class="scroll-sentinel" aria-hidden="true"></div>
  <nav
    class="navbar"
    :class="{ scrolled: isScrolled, 'menu-open': isMenuOpen }"
    role="navigation"
    aria-label="主要導航"
  >
    <div class="nav-inner">
      <a
        href="#"
        class="nav-brand"
        aria-label="回到首頁"
        @click.prevent="scrollToTop"
      >
        chien.dev
      </a>

      <div class="nav-links" :class="{ open: isMenuOpen }" role="menubar">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="nav-link"
          :class="{ active: currentSection === link.id }"
          role="menuitem"
          @click.prevent="handleNavClick(link.id)"
          >{{ link.label }}</a
        >
      </div>

      <button
        class="nav-toggle"
        :aria-expanded="isMenuOpen"
        aria-label="Toggle navigation menu"
        type="button"
        @click="toggleMenu"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const navLinks = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const currentSection = ref('')
const windowWidth = ref(
  typeof window !== 'undefined' ? window.innerWidth : 1024
)

const isMobile = computed(() => windowWidth.value <= 768)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  isMenuOpen.value = false
}

const handleNavClick = id => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  currentSection.value = id
  isMenuOpen.value = false
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleResize = () => {
  windowWidth.value = window.innerWidth
  if (!isMobile.value) isMenuOpen.value = false
}

const handleKeydown = e => {
  if (e.key === 'Escape') isMenuOpen.value = false
}

const sentinelRef = ref(null)
let observer = null
let sentinelObserver = null

/** 記錄各 section 是否在觀測帶內（rootMargin 定義的區間） */
const sectionInView = {}

onMounted(() => {
  window.addEventListener('resize', handleResize, { passive: true })
  window.addEventListener('keydown', handleKeydown)

  // 哨兵元素：觀察頁面頂端，取代 scroll 事件偵測
  sentinelObserver = new IntersectionObserver(
    ([entry]) => {
      isScrolled.value = !entry.isIntersecting
    },
    { rootMargin: '40px 0px 0px 0px' }
  )
  if (sentinelRef.value) sentinelObserver.observe(sentinelRef.value)

  const sections = navLinks
    .map(l => document.getElementById(l.id))
    .filter(Boolean)
  sections.forEach(s => {
    sectionInView[s.id] = false
  })
  observer = new IntersectionObserver(
    entries => {
      // 更新所有 section 的觀測狀態
      for (const e of entries) {
        sectionInView[e.target.id] = e.isIntersecting
      }

      // 選取目前在觀測帶內的「最後一個」section（DOM 順序）
      // 觀測帶為 viewport 上方 20%~100%（排除最上方 20% 的 Header 區域）
      // 往下滾時，最新進入觀測帶的 section 會覆蓋前面的；往上滾則自然讓出
      let lastActive = ''
      for (const link of navLinks) {
        if (sectionInView[link.id]) lastActive = link.id
      }

      if (lastActive) {
        currentSection.value = lastActive
      }
    },
    { rootMargin: '-20% 0px 0px 0px' }
  )
  sections.forEach(s => observer.observe(s))
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('keydown', handleKeydown)
  observer?.disconnect()
  sentinelObserver?.disconnect()
})

defineExpose({
  navLinks,
  currentSection,
  handleNavClick,
  scrollToTop,
  isMenuOpen,
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition:
    background var(--transition-normal) var(--ease-out),
    border-color var(--transition-normal) var(--ease-out),
    box-shadow var(--transition-normal) var(--ease-out);
  border-bottom: 1px solid transparent;
}

.navbar.scrolled {
  background: rgba(255, 255, 255, 0.96);
  border-bottom-color: var(--color-border);
}

@media (hover: hover) {
  .navbar.scrolled {
    background: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(12px);
  }
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width-content);
  margin: 0 auto;
  padding: 1rem var(--spacing-xl);
}

.nav-brand {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  letter-spacing: -0.01em;
  min-height: var(--min-touch-target);
  min-width: var(--min-touch-target);
  display: flex;
  align-items: center;
}

.nav-brand:hover {
  color: var(--color-text);
  opacity: 0.7;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav-link {
  padding: 0.375rem 0.75rem;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  border-radius: var(--radius-md);
  transition:
    color var(--transition-fast) var(--ease-out),
    background var(--transition-fast) var(--ease-out);
  min-height: var(--min-touch-target);
  min-width: var(--min-touch-target);
  display: flex;
  align-items: center;
}

.nav-link:hover {
  color: var(--color-text);
  background: rgba(0, 0, 0, 0.04);
}

.nav-link.active {
  color: var(--color-text);
  font-weight: var(--font-weight-semibold);
}

.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: var(--min-touch-target);
  height: var(--min-touch-target);
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-md);
  z-index: 101;
}

.bar {
  width: 22px;
  height: 1.5px;
  background: var(--color-text);
  border-radius: 2px;
  transition: all var(--transition-fast) var(--ease-out);
  display: block;
}

.navbar.menu-open .bar:nth-child(1) {
  transform: rotate(45deg) translate(4.5px, 4.5px);
}
.navbar.menu-open .bar:nth-child(2) {
  opacity: 0;
}
.navbar.menu-open .bar:nth-child(3) {
  transform: rotate(-45deg) translate(4.5px, -4.5px);
}

.scroll-sentinel {
  display: block;
  height: 1px;
  margin-bottom: -1px;
  pointer-events: none;
}

@media (max-width: 768px) {
  .nav-inner {
    padding: 0.75rem var(--spacing-md);
  }

  .nav-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    inset: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-sm);
    background: #ffffff;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity var(--transition-normal) var(--ease-out),
      visibility var(--transition-normal) var(--ease-out);
    z-index: 100;
  }

  .nav-links.open {
    opacity: 1;
    visibility: visible;
  }

  .nav-link {
    font-size: var(--font-size-xl);
    padding: var(--spacing-sm) var(--spacing-xl);
    min-width: 180px;
    justify-content: center;
  }
}
</style>
