<template>
  <main class="home" role="main">
    <!-- Skip to main content link for keyboard users -->
    <a href="#projects" class="skip-link" @click.prevent="scrollToSection('projects')">
      跳至主要內容
    </a>

    <!-- Navigation Bar -->
    <NavBar />

    <!-- Hero Section -->
    <header class="hero" role="banner" aria-labelledby="hero-title">
      <div class="hero-content">
        <h1 id="hero-title" class="hero-name">HSU CHIA CHIEN</h1>
        <p class="hero-role" aria-live="polite" aria-atomic="true">{{ currentRole }}</p>
        <p class="hero-tagline">用程式碼解決問題，用社群連結人們</p>

        <div class="hero-actions" role="group" aria-label="主要行動按鈕">
          <!-- CV 按鈕暫時隱藏 -->
          <!-- <button class="btn btn-primary" @click="goToCV">
              CV
            </button> -->
          <button class="btn btn-secondary" @click="scrollToSection('contact')">
            聯絡我
          </button>
          <a class="btn btn-primary" href="https://blog.chien.dev" target="_blank" rel="noopener noreferrer">
            Blog
          </a>
        </div>
      </div>

      <!-- 滾動指示器 -->
      <button class="scroll-indicator" @click="scrollToSection('projects')" aria-label="向下滾動到專案區塊" type="button">
        <span class="scroll-text" aria-hidden="true">向下滾動</span>
        <div class="scroll-arrow" aria-hidden="true"></div>
      </button>
    </header>

    <!-- Projects Section -->
    <section id="projects" class="section projects-section" aria-labelledby="projects-title">
      <div class="container">
        <h2 id="projects-title" class="section-title">專案作品</h2>
        <div class="projects-grid" role="list" aria-label="專案列表">
          <ProjectCard v-for="project in projects" :key="project.name" :project="project" role="listitem" />
        </div>
        <div class="more-projects">
          <button class="btn btn-secondary showcase-trigger" type="button" @click="openProjectShowcase">
            <md-icon aria-hidden="true">auto_awesome</md-icon>
            更多專案
          </button>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="section skills-section" aria-labelledby="skills-title">
      <div class="container">
        <h2 id="skills-title" class="section-title">技術能力</h2>
        <div class="skills-cloud" role="list" aria-label="技能列表">
          <span v-for="skill in allSkills" :key="skill.name" class="skill-tag" :class="skill.level" role="listitem">
            {{ skill.name }}
          </span>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="section experience-section" aria-labelledby="experience-title">
      <div class="container">
        <h2 id="experience-title" class="section-title">經歷軌跡</h2>

        <!-- 篩選按鈕 -->
        <div class="timeline-filters">
          <button v-for="filterOption in experienceFilters" :key="filterOption.value" class="filter-btn"
            :class="{ active: currentExperienceFilter === filterOption.value }"
            @click="currentExperienceFilter = filterOption.value">
            <md-icon aria-hidden="true">{{ filterOption.icon }}</md-icon>
            <span>{{ filterOption.label }}</span>
          </button>
        </div>

        <VuetifyTimeline :items="filteredExperience" :compact="true" :alternate="false" />
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section contact-section" aria-labelledby="contact-title">
      <div class="container">
        <h2 id="contact-title" class="section-title">聯絡我</h2>
        <p class="contact-intro">有任何問題或合作機會，歡迎透過以下方式聯繫我</p>
        <div class="contact-grid">
          <a v-for="contact in contacts" :key="contact.type" :href="contact.href"
            :target="contact.external ? '_blank' : undefined"
            :rel="contact.external ? 'noopener noreferrer' : undefined" class="contact-card"
            :aria-label="`${contact.label}: ${contact.value}`">
            <div class="contact-icon-wrapper">
              <md-icon v-if="contact.icon">{{ contact.icon }}</md-icon>
              <svg v-else-if="contact.svg === 'github'" class="contact-svg" viewBox="0 0 24 24" fill="currentColor"
                aria-hidden="true">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <svg v-else-if="contact.svg === 'linkedin'" class="contact-svg" viewBox="0 0 24 24" fill="currentColor"
                aria-hidden="true">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <div class="contact-info">
              <span class="contact-label">{{ contact.label }}</span>
              <span class="contact-value">{{ contact.value }}</span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Back to Top Button -->
    <button class="back-to-top" :class="{ visible: showBackToTop }" @click="scrollToTop" aria-label="回到頂部" type="button"
      :tabindex="showBackToTop ? 0 : -1">
      <md-icon aria-hidden="true">keyboard_arrow_up</md-icon>
    </button>

    <Teleport to="body">
      <Transition name="showcase">
        <div
          v-if="isProjectShowcaseOpen"
          class="project-showcase"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-showcase-title"
          @click.self="closeProjectShowcase"
        >
          <div class="showcase-shell">
            <div class="showcase-header">
              <div>
                <span class="showcase-kicker">PROJECT ARCHIVE</span>
                <h2 id="project-showcase-title">專案作品展示</h2>
              </div>
              <button class="showcase-close" type="button" aria-label="關閉專案展示" @click="closeProjectShowcase">
                <md-icon aria-hidden="true">close</md-icon>
              </button>
            </div>

            <div class="showcase-stage" aria-label="專案展示列表">
              <article
                v-for="(project, index) in projects"
                :key="project.name"
                class="showcase-project"
                :style="{ '--project-index': index }"
              >
                <div class="showcase-project-media">
                  <picture v-if="project.image">
                    <source :srcset="project.image.replace('.png', '.webp')" type="image/webp" />
                    <img :src="project.image" :alt="`${project.name} 專案截圖`" loading="lazy" />
                  </picture>
                  <div v-else class="showcase-project-icon" aria-hidden="true">
                    <md-icon>terminal</md-icon>
                  </div>
                </div>

                <div class="showcase-project-body">
                  <div class="showcase-project-number">{{ String(index + 1).padStart(2, '0') }}</div>
                  <h3>{{ project.name }}</h3>
                  <p>{{ project.description }}</p>
                  <div class="showcase-tags" aria-label="使用技術">
                    <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
                  </div>
                  <div class="showcase-actions">
                    <a
                      v-if="project.github"
                      :href="project.github"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="showcase-link"
                    >
                      GitHub
                    </a>
                    <a
                      v-if="project.demo"
                      :href="project.demo"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="showcase-link primary"
                    >
                      {{ project.demoLabel || 'Demo' }}
                    </a>
                  </div>
                </div>
              </article>
            </div>

            <div class="showcase-footer">
              <span>完整原始碼與更多實驗作品</span>
              <a href="https://github.com/qian403" target="_blank" rel="noopener noreferrer" class="showcase-github">
                前往 GitHub
                <md-icon aria-hidden="true">arrow_forward</md-icon>
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { mdiBriefcase, mdiSchool, mdiAccountGroup } from '@mdi/js'
import VuetifyTimeline from '../components/VuetifyTimeline.vue'
import ProjectCard from '../components/ProjectCard.vue'
import NavBar from '../components/NavBar.vue'

const router = useRouter()

// 身份輪播
const roles = ['Backend Developer', 'Security Enthusiast']
const currentRole = ref(roles[0])
let roleIndex = 0
let roleInterval = null
let lockedScrollY = 0

// 回到頂部按鈕狀態
const showBackToTop = ref(false)
const isProjectShowcaseOpen = ref(false)

// 處理滾動事件
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && isProjectShowcaseOpen.value) {
    closeProjectShowcase()
  }
}

// 滾動到頂部
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 跳轉到 CV 頁面
const goToCV = () => {
  router.push('/cv')
}

const openProjectShowcase = () => {
  lockedScrollY = window.scrollY
  isProjectShowcaseOpen.value = true
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
  document.body.style.position = 'fixed'
  document.body.style.top = `-${lockedScrollY}px`
  document.body.style.left = '0'
  document.body.style.right = '0'
  document.body.style.width = '100%'
}

const closeProjectShowcase = () => {
  isProjectShowcaseOpen.value = false
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.width = ''
  window.scrollTo({ top: lockedScrollY, behavior: 'auto' })
}

onMounted(() => {
  roleInterval = setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length
    currentRole.value = roles[roleIndex]
  }, 3000)

  // 監聽滾動事件
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  if (roleInterval) {
    clearInterval(roleInterval)
  }
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.width = ''
})

// 專案資料
const projects = ref([
  {
    name: 'Web Tools',
    description: '實用網頁工具集',
    tags: ['Web', 'Tools'],
    github: 'https://github.com/qian403/web-tools',
    demo: 'https://tools.chien.dev',
    demoLabel: '前往網站',
    image: '/tools.png'
  },
  {
    name: 'CatchTheDiff',
    description: '定時爬取各家新聞網站並記錄版本變更',
    tags: ['Python', 'Crawler', 'News'],
    github: 'https://github.com/qian403/CatchTheDiff',
    demo: null,
    image: null
  },
  {
    name: 'FutureNest Chatbot',
    description: '具備 RAG 功能的 Chatbot，使用 Django + React.js',
    tags: ['Django', 'React', 'RAG'],
    github: 'https://github.com/qian403/futurenest-chatbot',
    demo: null,
    image: null
  }
])

// 技能資料（扁平化為標籤雲）
const allSkills = ref([
  { name: 'Golang', level: 'expert' },
  { name: 'Python', level: 'expert' },
  { name: 'Web Security', level: 'expert' },
  { name: 'Network (BGP/ASN)', level: 'expert' },
  { name: 'Django', level: 'proficient' },
  { name: 'FastAPI', level: 'proficient' },
  { name: 'Penetration Testing', level: 'proficient' },
  { name: 'Vulnerability Research', level: 'proficient' },
  { name: 'Linux', level: 'proficient' },
  { name: 'Docker', level: 'proficient' },
  { name: 'Vue.js', level: 'proficient' },
  { name: 'JavaScript', level: 'proficient' },
  { name: 'CSS', level: 'familiar' }
])

// 經歷篩選
const experienceFilters = [
  { value: 'work', label: '工作', icon: 'work' },
  { value: 'education', label: '教育', icon: 'school' },
  { value: 'community', label: '社群', icon: 'groups' }
]

const currentExperienceFilter = ref('work')

// 經歷資料
const experienceData = ref([
  {
    type: 'work',
    icon: mdiBriefcase,
    title: '實習工程師',
    company: '瀚霖智動銷售科技有限公司',
    period: '2024年11月 - 現在'
  },
  {
    type: 'work',
    icon: mdiBriefcase,
    title: '前端工程師',
    company: '網化數位有限公司',
    period: '2023年7月 - 2023年9月'
  },
  {
    type: 'education',
    icon: mdiSchool,
    title: '資訊工程系',
    company: '國立宜蘭大學',
    period: '2024年 - 現在'
  },
  {
    type: 'education',
    icon: mdiSchool,
    title: '資訊科',
    company: '國立羅東高級工業職業學校',
    period: '2021年 - 2024年'
  },
  {
    type: 'community',
    icon: mdiAccountGroup,
    title: '總召',
    company: 'SITCON 學生計算機年會 2026',
    period: '2025年 - 2026年'
  },
  {
    type: 'community',
    icon: mdiAccountGroup,
    title: '副召',
    company: 'SITCON Camp 2025',
    period: '2025年'
  },
  {
    type: 'community',
    icon: mdiAccountGroup,
    title: '行政組副組長',
    company: 'SITCON 學生計算機年會 2025',
    period: '2024年 - 2025年'
  },
  {
    type: 'community',
    icon: mdiAccountGroup,
    title: '場務組志工',
    company: 'SITCON 學生計算機年會 2024',
    period: '2024年'
  },
  {
    type: 'community',
    icon: mdiAccountGroup,
    title: '學員',
    company: 'AWS STEM Summer Camp on The Cloud 2023',
    period: '2023年'
  },
  {
    type: 'community',
    icon: mdiAccountGroup,
    title: '學員',
    company: '教育部先進資通安全實務人才培育計畫',
    period: '2023年'
  },
  {
    type: 'community',
    icon: mdiAccountGroup,
    title: '學員',
    company: 'AIS3 Junior 2022',
    period: '2022年'
  }
])

// 計算持續時間
function calcDuration(period) {
  const now = new Date()

  const parseDate = (s) => {
    s = s.trim()
    if (s === '現在') return now
    const ym = s.match(/(\d{4})年(\d{1,2})月/)
    if (ym) return new Date(parseInt(ym[1]), parseInt(ym[2]) - 1)
    const y = s.match(/(\d{4})年/)
    if (y) return new Date(parseInt(y[1]), 0)
    return now
  }

  const parts = period.split(' - ')
  // 只有單一年份（如 "2023年"），不顯示持續時間
  if (parts.length < 2) return null

  const start = parseDate(parts[0])
  const end = parseDate(parts[1])

  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  if (months < 1) months = 1
  const years = Math.floor(months / 12)
  const remainMonths = months % 12

  if (years > 0 && remainMonths > 0) return `${years}年${remainMonths}個月`
  if (years > 0) return `${years}年`
  return `${remainMonths}個月`
}

const filteredExperience = computed(() => {
  return experienceData.value
    .filter(item => item.type === currentExperienceFilter.value)
    .map(item => ({ ...item, duration: calcDuration(item.period) }))
})



// 聯絡資訊
const contacts = ref([
  {
    type: 'email',
    label: 'Email',
    value: 'hi@chien.dev',
    href: 'mailto:hi@chien.dev',
    icon: 'email',
    external: false
  },
  {
    type: 'github',
    label: 'GitHub',
    value: 'qian403',
    href: 'https://github.com/qian403',
    svg: 'github',
    external: true
  },
  {
    type: 'blog',
    label: 'Blog',
    value: 'blog.chien.dev',
    href: 'https://blog.chien.dev',
    icon: 'language',
    external: true
  },
  {
    type: 'linkedin',
    label: 'LinkedIn',
    value: 'hsuchiachien',
    href: 'https://www.linkedin.com/in/hsuchiachien',
    svg: 'linkedin',
    external: true
  }
])

// 滾動到指定區塊
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>


<style scoped>
/* ========================================
   Home View - 頁面樣式
   ======================================== */

.home {
  min-height: 100vh;
}

/* Skip Link for Keyboard Navigation */
.skip-link {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-semibold);
  z-index: 9999;
  transition: top var(--transition-fast) var(--ease-out);
}

.skip-link:focus {
  top: var(--spacing-md);
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}

/* ========================================
   Hero Section
   ======================================== */

.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg,
      var(--color-bg-primary) 0%,
      var(--color-bg-secondary) 50%,
      var(--color-bg-primary) 100%);
  padding: var(--spacing-xl);
}

.hero-content {
  text-align: center;
  max-width: 600px;
}

.hero-name {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  letter-spacing: -0.02em;
}

.hero-role {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
  font-weight: var(--font-weight-medium);
  transition: opacity var(--transition-normal) var(--ease-out);
}

.hero-tagline {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-2xl);
  line-height: var(--line-height-relaxed);
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

/* 滾動指示器 */
.scroll-indicator {
  position: absolute;
  bottom: var(--spacing-2xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  opacity: 0.6;
  transition: opacity var(--transition-normal) var(--ease-out);
}

.scroll-indicator:hover {
  opacity: 1;
}

.scroll-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.scroll-arrow {
  width: 24px;
  height: 24px;
  border-right: 2px solid var(--color-text-muted);
  border-bottom: 2px solid var(--color-text-muted);
  transform: rotate(45deg);
  animation: bounce 2s infinite;
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: rotate(45deg) translateY(0);
  }

  40% {
    transform: rotate(45deg) translateY(8px);
  }

  60% {
    transform: rotate(45deg) translateY(4px);
  }
}

/* ========================================
   Section 共用樣式
   ======================================== */

.section {
  padding: var(--spacing-4xl) var(--spacing-lg);
}

.projects-section {
  background-color: var(--color-bg-secondary);
}

.skills-section {
  background-color: var(--color-bg-primary);
}

.highlights-section {
  background-color: var(--color-bg-secondary);
}

.experience-section {
  background-color: var(--color-bg-primary);
}

/* 經歷篩選按鈕 */
.timeline-filters {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 44px;
}

.filter-btn:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-primary);
  color: var(--color-text-primary);
}

.filter-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-on-primary);
}

.filter-btn md-icon {
  font-size: 1.125rem;
  width: 1.125rem;
  height: 1.125rem;
}

/* ========================================
   Projects Section
   ======================================== */

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xl);
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}

.more-projects {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-2xl);
}

.showcase-trigger {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  border-color: rgba(100, 181, 246, 0.45);
  position: relative;
  overflow: hidden;
}

.showcase-trigger::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(100, 181, 246, 0.18), transparent);
  transform: translateX(-110%);
  transition: transform 600ms var(--ease-out);
}

.showcase-trigger:hover::before {
  transform: translateX(110%);
}

.showcase-trigger md-icon {
  font-size: 18px;
  width: 18px;
  height: 18px;
}

.project-showcase {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  background:
    linear-gradient(rgba(100, 181, 246, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(100, 181, 246, 0.05) 1px, transparent 1px),
    rgba(6, 17, 29, 0.9);
  background-size: 28px 28px, 28px 28px, auto;
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  backdrop-filter: blur(20px) saturate(140%);
}

.project-showcase::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, transparent 0%, rgba(100, 181, 246, 0.08) 50%, transparent 100%);
  animation: showcase-scan 5s linear infinite;
}

.showcase-shell {
  width: min(1120px, 100%);
  max-height: min(760px, calc(100vh - 2rem));
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(232, 244, 248, 0.22);
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, rgba(232, 244, 248, 0.14), rgba(13, 27, 42, 0.58) 42%, rgba(30, 48, 68, 0.44));
  -webkit-backdrop-filter: blur(28px) saturate(150%);
  backdrop-filter: blur(28px) saturate(150%);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5), 0 0 48px rgba(79, 195, 247, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.16);
  position: relative;
}

.showcase-shell::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.16), transparent 28%, rgba(100, 181, 246, 0.08) 72%, transparent);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}

.showcase-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
  border-bottom: 1px solid rgba(144, 202, 249, 0.18);
}

.showcase-kicker {
  display: block;
  margin-bottom: var(--spacing-xs);
  color: var(--color-primary-light);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0;
}

.showcase-header h2 {
  color: var(--color-text-primary);
  font-size: var(--font-size-3xl);
  line-height: var(--line-height-tight);
}

.showcase-close {
  width: var(--min-touch-target);
  height: var(--min-touch-target);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid rgba(232, 244, 248, 0.18);
  border-radius: var(--radius-md);
  background: rgba(232, 244, 248, 0.08);
  -webkit-backdrop-filter: blur(12px) saturate(130%);
  backdrop-filter: blur(12px) saturate(130%);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: all var(--transition-fast) var(--ease-out);
}

.showcase-close:hover {
  border-color: var(--color-primary);
  background: rgba(100, 181, 246, 0.16);
}

.showcase-stage {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
  overflow-y: auto;
}

.showcase-project {
  min-height: 420px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(232, 244, 248, 0.16);
  border-radius: var(--radius-lg);
  background: linear-gradient(155deg, rgba(232, 244, 248, 0.12), rgba(30, 48, 68, 0.5) 46%, rgba(13, 27, 42, 0.48));
  -webkit-backdrop-filter: blur(18px) saturate(145%);
  backdrop-filter: blur(18px) saturate(145%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transform: translateY(0) scale(1);
  opacity: 1;
  animation: project-rise 520ms var(--ease-out) backwards;
  animation-delay: calc(110ms + var(--project-index) * 120ms);
  transition: border-color var(--transition-normal) var(--ease-out), box-shadow var(--transition-normal) var(--ease-out), transform var(--transition-normal) var(--ease-out);
}

.showcase-project:hover {
  border-color: rgba(144, 202, 249, 0.65);
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.32), 0 0 28px rgba(79, 195, 247, 0.14);
}

.showcase-project-media {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    linear-gradient(135deg, rgba(232, 244, 248, 0.12), rgba(100, 181, 246, 0.16)),
    rgba(42, 63, 84, 0.46);
  border-bottom: 1px solid rgba(232, 244, 248, 0.12);
}

.showcase-project-media picture,
.showcase-project-media img {
  width: 100%;
  height: 100%;
}

.showcase-project-media img {
  object-fit: cover;
}

.showcase-project-icon {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(232, 244, 248, 0.2);
  border-radius: var(--radius-lg);
  background: rgba(232, 244, 248, 0.08);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  backdrop-filter: blur(14px) saturate(140%);
  color: var(--color-primary-light);
}

.showcase-project-icon md-icon {
  font-size: 36px;
  width: 36px;
  height: 36px;
}

.showcase-project-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: var(--spacing-lg);
  position: relative;
}

.showcase-project-number {
  align-self: flex-start;
  margin-bottom: var(--spacing-md);
  color: var(--color-primary-light);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
}

.showcase-project h3 {
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-primary);
  font-size: var(--font-size-xl);
  line-height: var(--line-height-tight);
}

.showcase-project p {
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-md);
}

.showcase-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.showcase-tags span {
  padding: 0.35rem 0.6rem;
  border: 1px solid rgba(232, 244, 248, 0.14);
  border-radius: var(--radius-sm);
  background: rgba(232, 244, 248, 0.07);
  -webkit-backdrop-filter: blur(10px) saturate(130%);
  backdrop-filter: blur(10px) saturate(130%);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
}

.showcase-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-top: auto;
}

.showcase-link,
.showcase-github {
  min-height: var(--min-touch-target);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid rgba(232, 244, 248, 0.18);
  border-radius: var(--radius-md);
  background: rgba(232, 244, 248, 0.07);
  -webkit-backdrop-filter: blur(12px) saturate(130%);
  backdrop-filter: blur(12px) saturate(130%);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-fast) var(--ease-out);
}

.showcase-link:hover,
.showcase-github:hover {
  border-color: var(--color-primary);
  background: rgba(100, 181, 246, 0.12);
  color: var(--color-primary-light);
}

.showcase-link.primary {
  background: var(--color-primary);
  color: var(--color-on-primary);
  border-color: var(--color-primary);
}

.showcase-link.primary:hover {
  background: var(--color-primary-light);
  color: var(--color-on-primary);
}

.showcase-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg) var(--spacing-xl);
  border-top: 1px solid rgba(144, 202, 249, 0.18);
  color: var(--color-text-secondary);
}

.showcase-github md-icon {
  font-size: 18px;
  width: 18px;
  height: 18px;
}

.showcase-enter-active,
.showcase-leave-active {
  transition: opacity 260ms var(--ease-out);
}

.showcase-enter-from,
.showcase-leave-to {
  opacity: 0;
}

.showcase-enter-active .showcase-shell,
.showcase-leave-active .showcase-shell {
  transition: transform 320ms var(--ease-out), opacity 320ms var(--ease-out);
}

.showcase-enter-from .showcase-shell,
.showcase-leave-to .showcase-shell {
  opacity: 0;
  transform: translateY(18px) scale(0.98);
}

@keyframes project-rise {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes showcase-scan {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(100%);
  }
}

.project-card {
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-normal) var(--ease-out);
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--color-border-light);
}

.project-image img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.project-placeholder {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-bg-tertiary) 0%, var(--color-bg-secondary) 100%);
  color: var(--color-text-muted);
}

.project-placeholder md-icon {
  font-size: 48px;
  width: 48px;
  height: 48px;
}

.project-content {
  padding: var(--spacing-lg);
}

.project-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.project-description {
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-md);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.project-links {
  display: flex;
  gap: var(--spacing-md);
}

.project-link {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  transition: color var(--transition-fast) var(--ease-out);
}

.project-link:hover {
  color: var(--color-primary-light);
  text-decoration: underline;
}

/* ========================================
   Skills Section - 標籤雲
   ======================================== */

.skills-cloud {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-md);
  max-width: 800px;
  margin: 0 auto;
}

.skill-tag {
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  transition: all var(--transition-fast) var(--ease-out);
}

.skill-tag:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.skill-tag.expert {
  border-color: var(--color-success);
  color: var(--color-success);
}

.skill-tag.proficient {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.skill-tag.familiar {
  border-color: var(--color-text-muted);
  color: var(--color-text-secondary);
}

/* ========================================
   Highlights Section
   ======================================== */

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
}

.highlight-card {
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  text-align: center;
  position: relative;
  transition: all var(--transition-normal) var(--ease-out);
}

.highlight-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--color-border-light);
}

.highlight-card.large {
  grid-column: span 2;
  padding: var(--spacing-xl);
}

.highlight-card.medium {
  grid-column: span 1;
}

.highlight-card.small {
  grid-column: span 1;
}

.highlight-icon {
  margin-bottom: var(--spacing-md);
  color: var(--color-primary);
}

.highlight-icon md-icon {
  font-size: 40px;
  width: 40px;
  height: 40px;
}

.highlight-card.large .highlight-icon md-icon {
  font-size: 48px;
  width: 48px;
  height: 48px;
}

.highlight-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.highlight-card.large .highlight-title {
  font-size: var(--font-size-xl);
}

.highlight-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

.highlight-badge {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-sm);
}

/* ========================================
   Contact Section
   ======================================== */

.contact-section {
  background-color: var(--color-bg-secondary);
  padding-bottom: var(--spacing-4xl);
}

.contact-intro {
  text-align: center;
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-2xl);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
  max-width: 1000px;
  margin: 0 auto;
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

.contact-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  background-color: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: all var(--transition-normal) var(--ease-out);
  min-height: var(--min-touch-target);
  text-align: center;
}

.contact-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--color-primary);
}

.contact-card:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.contact-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: rgba(100, 181, 246, 0.1);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.contact-icon-wrapper md-icon {
  font-size: 24px;
  width: 24px;
  height: 24px;
  color: var(--color-primary);
}

.contact-svg {
  width: 24px;
  height: 24px;
  color: var(--color-primary);
}

.contact-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.contact-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
}

.contact-value {
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ========================================
   響應式設計
   ======================================== */

@media (max-width: 1024px) {
  .highlights-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .highlight-card.large {
    grid-column: span 2;
  }

  .showcase-stage {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .section {
    padding: var(--spacing-3xl) var(--spacing-md);
  }

  .hero {
    padding: var(--spacing-lg);
    min-height: calc(100vh - 60px);
    padding-top: 80px;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
    max-width: 280px;
  }

  .hero-actions .btn {
    width: 100%;
    min-height: var(--min-touch-target);
  }

  .scroll-indicator {
    display: none;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-showcase {
    align-items: stretch;
    padding: var(--spacing-md);
  }

  .showcase-shell {
    max-height: calc(100vh - 2rem);
  }

  .showcase-header,
  .showcase-stage,
  .showcase-footer {
    padding: var(--spacing-lg);
  }

  .showcase-header h2 {
    font-size: var(--font-size-2xl);
  }

  .showcase-stage {
    grid-template-columns: 1fr;
  }

  .showcase-footer {
    align-items: stretch;
    flex-direction: column;
  }

  .showcase-github {
    width: 100%;
  }

  .skills-cloud {
    gap: var(--spacing-sm);
  }

  .skill-tag {
    font-size: var(--font-size-sm);
    padding: var(--spacing-xs) var(--spacing-md);
  }

  .highlights-grid {
    grid-template-columns: 1fr;
  }

  .highlight-card.large,
  .highlight-card.medium,
  .highlight-card.small {
    grid-column: span 1;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  /* 確保聯絡卡片有足夠的點擊區域 */
  .contact-card {
    min-height: var(--min-touch-target);
    padding: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .section {
    padding: var(--spacing-2xl) var(--spacing-sm);
  }

  .hero {
    padding: var(--spacing-md);
    padding-top: 70px;
  }

  .hero-name {
    font-size: clamp(2rem, 8vw, 2.5rem);
  }

  .hero-role {
    font-size: clamp(1rem, 4vw, 1.25rem);
  }

  .hero-tagline {
    font-size: var(--font-size-md);
  }

  .hero-actions {
    max-width: 100%;
    padding: 0 var(--spacing-sm);
  }

  /* 專案卡片優化 */
  .project-content {
    padding: var(--spacing-md);
  }

  .project-name {
    font-size: var(--font-size-lg);
  }

  .project-description {
    font-size: var(--font-size-sm);
  }

  .showcase-header {
    gap: var(--spacing-md);
  }

  .showcase-project {
    min-height: auto;
  }

  .showcase-project-media {
    height: 136px;
  }

  .showcase-project-body {
    padding: var(--spacing-md);
  }

  .showcase-actions {
    flex-direction: column;
  }

  .showcase-link {
    width: 100%;
  }

  /* 技能區塊優化 */
  .skill-category {
    padding: var(--spacing-md);
  }

  .category-name {
    font-size: var(--font-size-md);
  }

  .skill-name {
    font-size: var(--font-size-sm);
  }

  /* 亮點區塊優化 */
  .highlight-card {
    padding: var(--spacing-md);
  }

  .highlight-title {
    font-size: var(--font-size-md);
  }

  .highlight-description {
    font-size: var(--font-size-xs);
  }

  /* 聯絡區塊優化 */
  .contact-intro {
    font-size: var(--font-size-md);
    padding: 0 var(--spacing-sm);
  }

  .contact-card {
    padding: var(--spacing-md);
  }

  .contact-value {
    font-size: var(--font-size-sm);
  }
}

/* ========================================
   減少動畫偏好
   ======================================== */

@media (prefers-reduced-motion: reduce) {
  .scroll-arrow {
    animation: none;
  }

  .project-showcase::before,
  .showcase-project {
    animation: none;
  }

  .showcase-project {
    opacity: 1;
    transform: none;
  }

  .hero-role {
    transition: none;
  }

  .project-card,
  .highlight-card,
  .contact-card,
  .skill-tag,
  .back-to-top,
  .skip-link,
  .showcase-trigger,
  .showcase-close,
  .showcase-link,
  .showcase-github {
    transition: none;
  }

  .project-card:hover,
  .highlight-card:hover,
  .contact-card:hover,
  .skill-tag:hover,
  .showcase-project:hover {
    transform: none;
  }

  .back-to-top:hover {
    transform: none;
  }
}

/* ========================================
   Back to Top Button
   ======================================== */

.back-to-top {
  position: fixed;
  bottom: var(--spacing-xl);
  right: var(--spacing-xl);
  width: var(--min-touch-target);
  height: var(--min-touch-target);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: all var(--transition-normal) var(--ease-out);
  box-shadow: var(--shadow-lg);
  z-index: 999;
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top:hover {
  background-color: var(--color-primary-light);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(100, 181, 246, 0.4);
}

.back-to-top:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}

.back-to-top md-icon {
  font-size: 28px;
  width: 28px;
  height: 28px;
}

@media (max-width: 768px) {
  .back-to-top {
    bottom: var(--spacing-lg);
    right: var(--spacing-lg);
  }
}
</style>
