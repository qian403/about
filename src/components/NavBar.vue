<template>
  <nav class="navbar" :class="{ scrolled: isScrolled, 'menu-open': isMenuOpen }" role="navigation" aria-label="主要導航">
    <div class="nav-container">
      <a href="#" class="nav-brand" @click.prevent="scrollToTop" aria-label="回到首頁"></a>
      
      <div 
        class="nav-links" 
        :class="{ open: isMenuOpen }"
        role="menubar"
        :aria-hidden="!isMenuOpen && isMobile ? 'true' : 'false'"
      >
        <a 
          v-for="link in navLinks" 
          :key="link.id"
          :href="`#${link.id}`"
          class="nav-link"
          :class="{ active: currentSection === link.id }"
          role="menuitem"
          :aria-current="currentSection === link.id ? 'true' : undefined"
          @click.prevent="handleNavClick(link.id)"
          @keydown.enter.prevent="handleNavClick(link.id)"
        >
          {{ link.label }}
        </a>
      </div>
      
      <button 
        class="nav-toggle" 
        @click="toggleMenu" 
        :aria-expanded="isMenuOpen"
        aria-label="Toggle navigation menu"
        aria-controls="mobile-nav"
        type="button"
      >
        <span class="hamburger-line" aria-hidden="true"></span>
        <span class="hamburger-line" aria-hidden="true"></span>
        <span class="hamburger-line" aria-hidden="true"></span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const navLinks = [
  { id: 'projects', label: '專案' },
  { id: 'skills', label: '技能' },
  { id: 'experience', label: '經歷' },
  { id: 'contact', label: '聯絡' }
]

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const currentSection = ref('')
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

// Check if mobile view
const isMobile = computed(() => windowWidth.value <= 768)

// 滾動到頂部
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  isMenuOpen.value = false
}

// 處理導航點擊
const handleNavClick = (sectionId) => {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
    currentSection.value = sectionId
  }
  isMenuOpen.value = false
}

// 切換手機選單
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// 監聽滾動事件
const handleScroll = () => {
  // 更新滾動狀態
  isScrolled.value = window.scrollY > 50
  
  // 更新當前區塊
  updateCurrentSection()
}

// 監聽視窗大小變化
const handleResize = () => {
  windowWidth.value = window.innerWidth
  // Close mobile menu when resizing to desktop
  if (!isMobile.value) {
    isMenuOpen.value = false
  }
}

// 更新當前區塊高亮
const updateCurrentSection = () => {
  const sections = navLinks.map(link => document.getElementById(link.id)).filter(Boolean)
  const scrollPosition = window.scrollY + 100
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i]
    if (section.offsetTop <= scrollPosition) {
      currentSection.value = section.id
      return
    }
  }
  
  // 如果在頂部，清除當前區塊
  if (window.scrollY < 100) {
    currentSection.value = ''
  }
}

// Handle escape key to close mobile menu
const handleKeydown = (event) => {
  if (event.key === 'Escape' && isMenuOpen.value) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  handleScroll() // 初始化狀態
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('keydown', handleKeydown)
})

// 導出給測試使用
defineExpose({
  navLinks,
  currentSection,
  handleNavClick,
  scrollToTop,
  isMenuOpen,
  isMobile
})
</script>


<style scoped>
/* ========================================
   NavBar 導航列樣式
   ======================================== */

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: transparent;
  transition: all var(--transition-normal) var(--ease-out);
}

.navbar.scrolled {
  background-color: rgba(13, 27, 42, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-md);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width-content);
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-lg);
}

/* 品牌標誌 */
.nav-brand {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  text-decoration: none;
  min-width: var(--min-touch-target);
  min-height: var(--min-touch-target);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color var(--transition-fast) var(--ease-out);
}

.nav-brand:hover {
  color: var(--color-primary-light);
}

/* 導航連結 */
.nav-links {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.nav-link {
  padding: var(--spacing-sm) var(--spacing-md);
  min-height: var(--min-touch-target);
  display: flex;
  align-items: center;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast) var(--ease-out);
}

.nav-link:hover {
  color: var(--color-text-primary);
  background-color: rgba(100, 181, 246, 0.1);
}

.nav-link.active {
  color: var(--color-primary);
  background-color: rgba(100, 181, 246, 0.15);
}

/* 漢堡選單按鈕 */
.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: var(--min-touch-target);
  height: var(--min-touch-target);
  padding: var(--spacing-sm);
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast) var(--ease-out);
}

.nav-toggle:hover {
  background-color: rgba(100, 181, 246, 0.1);
}

.hamburger-line {
  width: 24px;
  height: 2px;
  background-color: var(--color-text-primary);
  border-radius: var(--radius-full);
  transition: all var(--transition-fast) var(--ease-out);
}

/* 漢堡選單動畫 */
.navbar.menu-open .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.navbar.menu-open .hamburger-line:nth-child(2) {
  opacity: 0;
}

.navbar.menu-open .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* ========================================
   響應式設計
   ======================================== */

@media (max-width: 768px) {
  .nav-container {
    padding: var(--spacing-sm) var(--spacing-md);
  }
  
  .nav-toggle {
    display: flex;
    z-index: 1001;
  }
  
  .nav-links {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-md);
    background-color: rgba(13, 27, 42, 0.98);
    backdrop-filter: blur(10px);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-normal) var(--ease-out);
    z-index: 1000;
  }
  
  .nav-links.open {
    opacity: 1;
    visibility: visible;
  }
  
  .nav-link {
    font-size: var(--font-size-xl);
    padding: var(--spacing-md) var(--spacing-xl);
    min-height: var(--min-touch-target);
    min-width: 200px;
    justify-content: center;
  }
  
  /* 確保品牌標誌在手機版有足夠的點擊區域 */
  .nav-brand {
    z-index: 1001;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: var(--spacing-xs) var(--spacing-sm);
  }
  
  .nav-link {
    font-size: var(--font-size-lg);
    padding: var(--spacing-md) var(--spacing-lg);
  }
}

/* ========================================
   減少動畫偏好
   ======================================== */

@media (prefers-reduced-motion: reduce) {
  .navbar,
  .nav-brand,
  .nav-link,
  .nav-toggle,
  .hamburger-line,
  .nav-links {
    transition: none;
  }
}
</style>
