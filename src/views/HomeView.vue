<template>
  <main class="home" role="main">
    <a href="#projects" class="skip-link" @click.prevent="scrollToSection('projects')">跳至主要內容</a>

    <NavBar />

    <!-- Hero -->
    <header class="hero" role="banner">
      <div class="hero-layout">
        <div class="hero-avatar-col">
          <img
            ref="avatarRef"
            class="hero-avatar"
            src="/avatar.jpg"
            alt="HSU CHIA CHIEN"
            width="400"
            height="400"
            :style="{ transform: `rotate(${avatarRotation}deg)` }"
          />
        </div>
        <div class="hero-text-col">
          <p class="hero-sub">Hi, I'm</p>
          <h1 class="hero-name">HSU CHIA CHIEN</h1>
          <p class="hero-role" aria-live="polite" aria-atomic="true">{{ currentRole }}</p>
          <p class="hero-tagline">用程式碼解決問題，用社群連結人們</p>
          <div class="hero-actions">
            <button class="btn" @click="scrollToSection('contact')">聯絡我</button>
            <a class="btn btn-primary" href="https://blog.chien.dev" target="_blank" rel="noopener noreferrer">Blog →</a>
          </div>
        </div>
      </div>

      <button class="scroll-hint" @click="scrollToSection('projects')" type="button" aria-label="向下滾動">
        <span class="scroll-arrow"></span>
      </button>
    </header>

    <!-- Projects -->
    <section id="projects" class="section" aria-labelledby="projects-title">
      <div class="container">
        <div class="section-head">
          <span class="section-label">PROJECTS</span>
          <h2 id="projects-title" class="section-title">專案作品</h2>
        </div>
        <div class="projects-grid">
          <ProjectCard v-for="p in projects" :key="p.name" :project="p" />
        </div>
        <p class="projects-more">
          更多專案 →
          <a href="https://github.com/qian403" target="_blank" rel="noopener noreferrer">github.com/qian403</a>
        </p>
      </div>
    </section>

    <!-- Skills -->
    <section id="skills" class="section section-alt" aria-labelledby="skills-title">
      <div class="container">
        <div class="section-head">
          <span class="section-label">SKILLS</span>
          <h2 id="skills-title" class="section-title">技術能力</h2>
        </div>
        <div class="skills-grid">
          <div v-for="cat in skillCategories" :key="cat.label" class="skill-group">
            <h3 class="skill-group-label">{{ cat.label }}</h3>
            <div class="skill-tags">
              <span v-for="s in cat.items" :key="s" class="tag">{{ s }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience -->
    <section id="experience" class="section" aria-labelledby="experience-title">
      <div class="container">
        <div class="section-head">
          <span class="section-label">EXPERIENCE</span>
          <h2 id="experience-title" class="section-title">經歷軌跡</h2>
        </div>
        <div class="exp-tabs" role="tablist">
          <button
            v-for="tab in expTabs"
            :key="tab.value"
            :class="['exp-tab', { active: currentTab === tab.value }]"
            @click="currentTab = tab.value"
            role="tab"
            :aria-selected="currentTab === tab.value"
            type="button"
          >{{ tab.label }}</button>
        </div>
        <div class="timeline">
          <div
            v-for="(item, i) in filteredExp"
            :key="`${item.title}-${item.period}`"
            class="timeline-item"
          >
            <div class="timeline-track">
              <div class="timeline-dot"></div>
              <div v-if="i < filteredExp.length - 1" class="timeline-line"></div>
            </div>
            <div class="timeline-body">
              <div class="timeline-meta">
                <span class="timeline-period">{{ item.period }}</span>
                <span v-if="item.duration" class="timeline-dur">· {{ item.duration }}</span>
              </div>
              <p class="timeline-title">{{ item.title }}</p>
              <p class="timeline-org">{{ item.company }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="section section-alt" aria-labelledby="contact-title">
      <div class="container">
        <div class="section-head">
          <span class="section-label">CONTACT</span>
          <h2 id="contact-title" class="section-title">聯絡我</h2>
        </div>
        <p class="contact-intro">有任何問題或合作機會，歡迎透過以下方式聯繫</p>
        <div class="contact-list">
          <a
            v-for="c in contacts"
            :key="c.type"
            :href="c.href"
            :target="c.external ? '_blank' : undefined"
            :rel="c.external ? 'noopener noreferrer' : undefined"
            class="contact-item"
            :aria-label="`${c.label}: ${c.value}`"
          >
            <span class="contact-label">{{ c.label }}</span>
            <span class="contact-value">{{ c.value }}</span>
            <span class="contact-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="container">
        <p>© 2025 HSU CHIA CHIEN &nbsp;·&nbsp; Built with Vue.js &nbsp;·&nbsp; <a href="https://github.com/qian403/about" target="_blank" rel="noopener noreferrer">Source</a></p>
      </div>
    </footer>

    <!-- Back to top -->
    <button
      class="back-to-top"
      :class="{ visible: showBackToTop }"
      @click="scrollToTop"
      aria-label="回到頂部"
      type="button"
      :tabindex="showBackToTop ? 0 : -1"
    >↑</button>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { mdiBriefcase, mdiSchool, mdiAccountGroup } from '@mdi/js'
import NavBar from '../components/NavBar.vue'
import ProjectCard from '../components/ProjectCard.vue'

// Role cycling
const roles = ['Backend Developer', 'Security Enthusiast', 'Community Leader']
let roleIndex = 0
const currentRole = ref(roles[0])
let roleTimer = null

// Back to top
const showBackToTop = ref(false)

// Avatar rotation
const avatarRef = ref(null)
const avatarRotation = ref(0)
let avatarExitY = 0

const updateAvatarExitY = () => {
  if (!avatarRef.value) return
  const rect = avatarRef.value.getBoundingClientRect()
  // Y position where avatar bottom exits the top of the viewport
  avatarExitY = rect.bottom + window.scrollY
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300

  if (avatarExitY > 0) {
    const progress = Math.min(Math.max(window.scrollY / avatarExitY, 0), 1)
    avatarRotation.value = progress * 360
  }
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  roleTimer = setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length
    currentRole.value = roles[roleIndex]
  }, 3000)
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', updateAvatarExitY, { passive: true })
  // Wait for layout to settle before measuring
  requestAnimationFrame(updateAvatarExitY)
})

onUnmounted(() => {
  clearInterval(roleTimer)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateAvatarExitY)
})

// Projects
const projects = ref([
  {
    name: 'Web Tools',
    description: '實用網頁工具集合',
    tags: ['Vue.js', 'Tools'],
    github: 'https://github.com/qian403/web-tools',
    demo: 'https://tools.chien.dev',
    demoLabel: '前往網站',
    image: '/tools.png'
  },
  {
    name: 'CatchTheDiff',
    description: '定時爬取各家新聞網站並記錄版本變更，追蹤新聞修改痕跡',
    tags: ['Python', 'Crawler', 'News'],
    github: 'https://github.com/qian403/CatchTheDiff',
    demo: null,
    image: null
  },
  {
    name: 'FutureNest Chatbot',
    description: '具備 RAG 功能的 Chatbot，使用 Django + React.js 建構',
    tags: ['Django', 'React', 'RAG', 'Python'],
    github: 'https://github.com/qian403/futurenest-chatbot',
    demo: null,
    image: null
  }
])

// Skills
const skillCategories = ref([
  {
    label: 'Languages',
    items: ['Golang', 'Python', 'JavaScript']
  },
  {
    label: 'Backend',
    items: ['Django', 'FastAPI', 'Linux', 'Docker']
  },
  {
    label: 'Security',
    items: ['Web Security', 'Penetration Testing', 'Vulnerability Research']
  },
  {
    label: 'Network & Other',
    items: ['BGP / ASN', 'Vue.js', 'CSS']
  }
])

// Experience
const expTabs = [
  { value: 'work', label: 'Work' },
  { value: 'education', label: 'Education' },
  { value: 'community', label: 'Community' }
]
const currentTab = ref('work')

const experienceData = ref([
  { type: 'work', icon: mdiBriefcase, title: '實習工程師', company: '瀚霖智動銷售科技有限公司', period: '2024年11月 - 現在' },
  { type: 'work', icon: mdiBriefcase, title: '前端工程師', company: '網化數位有限公司', period: '2023年7月 - 2023年9月' },
  { type: 'education', icon: mdiSchool, title: '資訊工程系', company: '國立宜蘭大學', period: '2024年 - 現在' },
  { type: 'education', icon: mdiSchool, title: '資訊科', company: '國立羅東高級工業職業學校', period: '2021年 - 2024年' },
  { type: 'community', icon: mdiAccountGroup, title: '總召', company: 'SITCON 學生計算機年會 2026', period: '2025年 - 2026年' },
  { type: 'community', icon: mdiAccountGroup, title: '副召', company: 'SITCON Camp 2025', period: '2025年' },
  { type: 'community', icon: mdiAccountGroup, title: '行政組副組長', company: 'SITCON 學生計算機年會 2025', period: '2024年 - 2025年' },
  { type: 'community', icon: mdiAccountGroup, title: '場務組志工', company: 'SITCON 學生計算機年會 2024', period: '2024年' },
  { type: 'community', icon: mdiAccountGroup, title: '學員', company: 'AWS STEM Summer Camp on The Cloud 2023', period: '2023年' },
  { type: 'community', icon: mdiAccountGroup, title: '學員', company: '教育部先進資通安全實務人才培育計畫', period: '2023年' },
  { type: 'community', icon: mdiAccountGroup, title: '學員', company: 'AIS3 Junior 2022', period: '2022年' }
])

function calcDuration(period) {
  const now = new Date()
  const parse = (s) => {
    s = s.trim()
    if (s === '現在') return now
    const ym = s.match(/(\d{4})年(\d{1,2})月/)
    if (ym) return new Date(+ym[1], +ym[2] - 1)
    const y = s.match(/(\d{4})年/)
    if (y) return new Date(+y[1], 0)
    return now
  }
  const parts = period.split(' - ')
  if (parts.length < 2) return null
  let months = (() => {
    const s = parse(parts[0]), e = parse(parts[1])
    const m = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth())
    return Math.max(1, m)
  })()
  const y = Math.floor(months / 12), m = months % 12
  if (y > 0 && m > 0) return `${y}年${m}個月`
  if (y > 0) return `${y}年`
  return `${m}個月`
}

const filteredExp = computed(() =>
  experienceData.value
    .filter(i => i.type === currentTab.value)
    .map(i => ({ ...i, duration: calcDuration(i.period) }))
)

// Contacts
const contacts = ref([
  { type: 'email', label: 'Email', value: 'hi@chien.dev', href: 'mailto:hi@chien.dev', external: false },
  { type: 'github', label: 'GitHub', value: 'github.com/qian403', href: 'https://github.com/qian403', external: true },
  { type: 'blog', label: 'Blog', value: 'blog.chien.dev', href: 'https://blog.chien.dev', external: true },
  { type: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/hsuchiachien', href: 'https://www.linkedin.com/in/hsuchiachien', external: true }
])
</script>

<style scoped>
/* ── Skip link ──────────────────────────────── */
.skip-link {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-text);
  color: #fff;
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  z-index: 9999;
  transition: top var(--transition-fast);
}
.skip-link:focus { top: 1rem; }

/* ── Hero ───────────────────────────────────── */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem var(--spacing-xl) 4rem;
  position: relative;
}

.hero-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  align-items: center;
  width: 100%;
  max-width: var(--max-width-content);
}

.hero-avatar-col {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-avatar {
  width: min(340px, 100%);
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
  transform-origin: center center;
  will-change: transform;
}

.hero-text-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-sub {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
}

.hero-name {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: var(--font-weight-extrabold);
  letter-spacing: -0.025em;
  color: var(--color-text);
  line-height: 1.1;
  margin-bottom: 1.25rem;
}

.hero-role {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: var(--color-text-secondary);
  font-family: 'SFMono-Regular', 'Consolas', 'Liberation Mono', monospace;
  margin-bottom: 1rem;
}

.hero-role::before {
  content: '$ ';
  color: var(--color-text-muted);
}

.hero-role::after {
  content: '|';
  color: var(--color-accent);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.hero-tagline {
  font-size: var(--font-size-md);
  color: var(--color-text-muted);
  margin-bottom: 2.5rem;
  line-height: var(--line-height-relaxed);
}

.hero-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.scroll-hint {
  position: absolute;
  bottom: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  cursor: pointer;
  opacity: 0.5;
  transition: opacity var(--transition-fast);
}

.scroll-hint:hover { opacity: 1; }

.scroll-arrow {
  width: 8px;
  height: 8px;
  border-right: 1.5px solid var(--color-text);
  border-bottom: 1.5px solid var(--color-text);
  transform: rotate(45deg);
  margin-bottom: 3px;
  animation: bounce 1.8s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: rotate(45deg) translateY(0); }
  50% { transform: rotate(45deg) translateY(4px); }
}

/* ── Sections ───────────────────────────────── */
.section {
  padding: var(--spacing-3xl) 0;
}

.section-alt {
  background: rgba(0, 0, 0, 0.018);
}

.section-head {
  margin-bottom: var(--spacing-2xl);
}

.section-label {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.14em;
  color: var(--color-text-muted);
  margin-bottom: 0.375rem;
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  line-height: var(--line-height-tight);
}

/* ── Projects ───────────────────────────────── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.projects-more {
  margin-top: var(--spacing-xl);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.projects-more a {
  font-weight: var(--font-weight-medium);
}

/* ── Skills ─────────────────────────────────── */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-xl) var(--spacing-2xl);
}

.skill-group-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-sm);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* ── Experience ─────────────────────────────── */
.exp-tabs {
  display: flex;
  gap: 0.25rem;
  margin-bottom: var(--spacing-xl);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0;
}

.exp-tab {
  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  margin-bottom: -1px;
  transition: color var(--transition-fast), border-color var(--transition-fast);
  font-family: inherit;
}

.exp-tab:hover {
  color: var(--color-text);
}

.exp-tab.active {
  color: var(--color-text);
  border-bottom-color: var(--color-text);
}


/* ── Contact ────────────────────────────────── */
.contact-intro {
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
}

.contact-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--color-border);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--color-border);
  text-decoration: none;
  color: var(--color-text);
  transition: background var(--transition-fast), padding-left var(--transition-fast);
}

.contact-item:hover {
  padding-left: var(--spacing-sm);
}

.contact-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  min-width: 80px;
}

.contact-value {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  flex: 1;
}

.contact-arrow {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  transition: transform var(--transition-fast);
}

.contact-item:hover .contact-arrow {
  transform: translateX(4px);
  color: var(--color-text);
}

/* ── Footer ─────────────────────────────────── */
.site-footer {
  padding: var(--spacing-xl) 0;
  border-top: 1px solid var(--color-border);
}

.site-footer p {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  text-align: center;
}

.site-footer a {
  color: var(--color-text-muted);
  text-decoration: underline;
}

/* ── Experience Timeline ────────────────────── */
.timeline {
  display: flex;
  flex-direction: column;
}

.timeline-item {
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: 0 var(--spacing-lg);
}

.timeline-track {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6px;
}

.timeline-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-text);
  flex-shrink: 0;
  box-shadow: 0 0 0 2px var(--color-bg), 0 0 0 3px var(--color-border-strong);
}

.timeline-line {
  width: 1px;
  flex: 1;
  background: var(--color-border);
  margin: 4px 0;
  min-height: 24px;
}

.timeline-body {
  padding-bottom: var(--spacing-xl);
}

.timeline-meta {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: 0.25rem;
  display: flex;
  gap: 0.375rem;
}

.timeline-title {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: 0.15rem;
}

.timeline-org {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

/* ── Back to top ────────────────────────────── */
.back-to-top {
  position: fixed;
  bottom: var(--spacing-xl);
  right: var(--spacing-xl);
  width: 40px;
  height: 40px;
  background: var(--color-text);
  color: #ffffff;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  font-size: var(--font-size-md);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition: opacity var(--transition-normal), visibility var(--transition-normal),
              transform var(--transition-normal);
  z-index: 50;
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top:hover {
  background: #333333;
}

/* ── Responsive ─────────────────────────────── */
@media (max-width: 1024px) {
  .projects-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .hero { padding: 5rem var(--spacing-md) 3rem; }
  .hero-layout {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
    text-align: center;
  }
  .hero-text-col { align-items: center; }
  .hero-avatar { width: min(200px, 60vw); }
  .section { padding: var(--spacing-2xl) 0; }
  .projects-grid { grid-template-columns: 1fr; }
  .skills-grid { grid-template-columns: 1fr; }

  .contact-label { min-width: 60px; }
  .contact-value { font-size: var(--font-size-xs); }

  .back-to-top { bottom: var(--spacing-lg); right: var(--spacing-lg); }
}

@media (max-width: 480px) {
  .hero-actions { flex-direction: column; align-items: stretch; width: 100%; max-width: 240px; }
  .btn { justify-content: center; }
  .scroll-hint { display: none; }
}
</style>
