<template>
  <main class="home" role="main">
    <a
      href="#projects"
      class="skip-link"
      @click.prevent="scrollToSection('projects')"
      >跳至主要內容</a
    >

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
            @load="updateAvatarExitY"
          />
        </div>
        <div class="hero-text-col">
          <p class="hero-sub">Hi, I'm</p>
          <h1 class="hero-name">HSU CHIA CHIEN</h1>
          <p class="hero-role">{{ currentRole }}</p>
          <p class="hero-tagline">用程式碼解決問題，用社群連結人們</p>
          <div class="hero-actions">
            <button class="btn" @click="scrollToSection('contact')">
              聯絡我
            </button>
            <a
              class="btn btn-primary"
              href="https://blog.chien.dev"
              target="_blank"
              rel="noopener noreferrer"
              >Blog →</a
            >
          </div>
        </div>
      </div>

      <button
        class="scroll-hint"
        type="button"
        aria-label="向下滾動"
        @click="scrollToSection('projects')"
      >
        <span class="scroll-arrow"></span>
      </button>
    </header>

    <!-- Experience -->
    <section id="experience" class="section" aria-labelledby="experience-title">
      <div class="container">
        <div class="section-head">
          <span class="section-label">EXPERIENCE</span>
          <h2 id="experience-title" class="section-title">經歷軌跡</h2>
        </div>
        <div ref="tabsRef" class="exp-tabs">
          <button
            v-for="tab in expTabs"
            :key="tab.value"
            :ref="
              el => {
                if (el) tabBtnRefs[tab.value] = el
              }
            "
            :class="['exp-tab', { active: currentTab === tab.value }]"
            type="button"
            @click="selectTab(tab.value)"
          >
            {{ tab.label }}
          </button>
          <div
            class="tab-indicator"
            :style="indicatorStyle"
            aria-hidden="true"
          ></div>
        </div>
        <Transition name="tab-slide" mode="out-in">
          <div :key="currentTab" class="timeline" aria-live="polite">
            <div
              v-for="item in filteredExp"
              :key="item.id"
              class="timeline-item"
            >
              <div class="timeline-track">
                <div class="timeline-dot"></div>
                <div class="timeline-line"></div>
              </div>
              <div class="timeline-body">
                <div class="timeline-meta">
                  <span class="timeline-period">{{ item.period }}</span>
                  <span v-if="item.duration" class="timeline-dur"
                    >· {{ item.duration }}</span
                  >
                </div>
                <p class="timeline-title">{{ item.title }}</p>
                <p class="timeline-org">{{ item.company }}</p>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <!-- Projects -->
    <section
      id="projects"
      class="section section-alt"
      aria-labelledby="projects-title"
    >
      <div class="container">
        <div class="section-head">
          <span class="section-label">PROJECTS</span>
          <h2 id="projects-title" class="section-title">專案作品</h2>
        </div>
        <div class="projects-list">
          <div v-for="(p, i) in projects" :key="p.name" class="project-row">
            <span class="project-num">{{
              String(i + 1).padStart(2, '0')
            }}</span>

            <div class="project-info">
              <h3 class="project-name">{{ p.name }}</h3>
              <p class="project-desc">{{ p.description }}</p>
            </div>

            <div class="project-tags">
              <span v-for="tag in p.tags" :key="tag" class="tag">{{
                tag
              }}</span>
            </div>

            <div class="project-actions">
              <a
                v-if="p.github"
                :href="p.github"
                target="_blank"
                rel="noopener noreferrer"
                class="project-action-link"
                :aria-label="`${p.name} GitHub`"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                GitHub
              </a>
              <a
                v-if="p.demo"
                :href="p.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="project-action-link project-action-primary"
                :aria-label="`${p.name} ${p.demoLabel || 'Demo'}`"
              >
                {{ p.demoLabel || 'Demo' }} →
              </a>
            </div>
          </div>
        </div>

        <p class="projects-more">
          更多 →
          <a
            href="https://github.com/qian403"
            target="_blank"
            rel="noopener noreferrer"
            >github.com/qian403</a
          >
        </p>
      </div>
    </section>

    <!-- Skills -->
    <section
      id="skills"
      class="section section-alt"
      aria-labelledby="skills-title"
    >
      <div class="container">
        <div class="section-head">
          <span class="section-label">SKILLS</span>
          <h2 id="skills-title" class="section-title">技術能力</h2>
        </div>
        <div class="skills-grid">
          <div
            v-for="cat in skillCategories"
            :key="cat.label"
            class="skill-group"
          >
            <h3 class="skill-group-label">{{ cat.label }}</h3>
            <div class="skill-tags">
              <span v-for="s in cat.items" :key="s" class="tag">{{ s }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section
      id="contact"
      class="section section-alt"
      aria-labelledby="contact-title"
    >
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
        <p>
          © 2026 HSU CHIA CHIEN &nbsp;·&nbsp; Built with Vue.js &nbsp;·&nbsp;
          <a
            href="https://github.com/qian403/about"
            target="_blank"
            rel="noopener noreferrer"
            >Source</a
          >
        </p>
      </div>
    </footer>

    <!-- Back to top -->
    <button
      class="back-to-top"
      :class="{ visible: showBackToTop }"
      aria-label="回到頂部"
      type="button"
      :tabindex="showBackToTop ? 0 : -1"
      @click="scrollToTop"
    >
      ↑
    </button>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import NavBar from '../components/NavBar.vue'

// ── Static data (plain const — never reassigned, no reactivity needed) ─────

const roles = ['Backend Developer', 'Security Enthusiast']

const projects = [
  {
    name: 'Web Tools',
    description: '實用網頁工具集合',
    tags: ['Vue.js', 'Tools'],
    github: 'https://github.com/qian403/web-tools',
    demo: 'https://tools.chien.dev',
    demoLabel: '前往網站',
  },
  {
    name: 'CatchTheDiff',
    description: '定時爬取各家新聞網站並記錄版本變更，追蹤新聞修改痕跡',
    tags: ['Python', 'Crawler', 'News'],
    github: 'https://github.com/qian403/CatchTheDiff',
    demo: null,
  },
  {
    name: 'FutureNest Chatbot',
    description: '具備 RAG 功能的 Chatbot，使用 Django + React.js 建構',
    tags: ['Django', 'React', 'RAG', 'Python'],
    github: 'https://github.com/qian403/futurenest-chatbot',
    demo: null,
  },
]

const skillCategories = [
  { label: 'Languages', items: ['Golang', 'Python', 'JavaScript'] },
  { label: 'Backend', items: ['Django', 'FastAPI', 'Linux', 'Docker'] },
  {
    label: 'Security',
    items: ['Web Security', 'Penetration Testing', 'Vulnerability Research'],
  },
  { label: 'Network & Other', items: ['BGP / ASN', 'Vue.js', 'CSS'] },
]

const expTabs = [
  { value: 'work', label: 'Work' },
  { value: 'education', label: 'Education' },
  { value: 'community', label: 'Community' },
]

const experienceData = [
  {
    id: 'w1',
    type: 'work',
    title: '實習工程師',
    company: '瀚霖智動銷售科技有限公司',
    period: '2024年11月 - 現在',
  },
  {
    id: 'w2',
    type: 'work',
    title: '前端工程師',
    company: '網化數位有限公司',
    period: '2023年7月 - 2023年9月',
  },
  {
    id: 'e1',
    type: 'education',
    title: '資訊工程系',
    company: '國立宜蘭大學',
    period: '2024年 - 現在',
  },
  {
    id: 'e2',
    type: 'education',
    title: '資訊科',
    company: '國立羅東高級工業職業學校',
    period: '2021年 - 2024年',
  },
  {
    id: 'c1',
    type: 'community',
    title: '總召',
    company: 'SITCON 學生計算機年會 2026',
    period: '2025年 - 2026年',
  },
  {
    id: 'c2',
    type: 'community',
    title: '副召',
    company: 'SITCON Camp 2025',
    period: '2025年',
  },
  {
    id: 'c3',
    type: 'community',
    title: '行政組副組長',
    company: 'SITCON 學生計算機年會 2025',
    period: '2024年 - 2025年',
  },
  {
    id: 'c4',
    type: 'community',
    title: '場務組志工',
    company: 'SITCON 學生計算機年會 2024',
    period: '2024年',
  },
  {
    id: 'c5',
    type: 'community',
    title: '學員',
    company: 'AWS STEM Summer Camp on The Cloud 2023',
    period: '2023年',
  },
  {
    id: 'c6',
    type: 'community',
    title: '學員',
    company: '教育部先進資通安全實務人才培育計畫',
    period: '2023年',
  },
  {
    id: 'c7',
    type: 'community',
    title: '學員',
    company: 'AIS3 Junior 2022',
    period: '2022年',
  },
]

const contacts = [
  {
    type: 'email',
    label: 'Email',
    value: 'hi@chien.dev',
    href: 'mailto:hi@chien.dev',
    external: false,
  },
  {
    type: 'github',
    label: 'GitHub',
    value: 'github.com/qian403',
    href: 'https://github.com/qian403',
    external: true,
  },
  {
    type: 'blog',
    label: 'Blog',
    value: 'blog.chien.dev',
    href: 'https://blog.chien.dev',
    external: true,
  },
  {
    type: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/hsuchiachien',
    href: 'https://www.linkedin.com/in/hsuchiachien',
    external: true,
  },
]

// ── Reactive state ──────────────────────────────────────────────────────────

const currentRole = ref(roles[0])
const showBackToTop = ref(false)
const avatarRef = ref(null)
const avatarRotation = ref(0)
const currentTab = ref('work')

// Tab indicator
const tabsRef = ref(null)
const tabBtnRefs = {}
const indicatorStyle = ref({ left: '0px', width: '0px' })

const updateIndicator = tabValue => {
  const btn = tabBtnRefs[tabValue]
  const container = tabsRef.value
  if (!btn || !container) return
  const cr = container.getBoundingClientRect()
  const br = btn.getBoundingClientRect()
  indicatorStyle.value = {
    left: `${br.left - cr.left}px`,
    width: `${br.width}px`,
  }
}

const selectTab = value => {
  currentTab.value = value
  nextTick(() => updateIndicator(value))
}

// ── Role cycling ────────────────────────────────────────────────────────────

let roleIndex = 0
let roleTimer = null
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
)

const resumeRoleCycling = () => {
  if (roleTimer) return
  roleTimer = setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length
    currentRole.value = roles[roleIndex]
  }, 3000)
}

const pauseRoleCycling = () => {
  clearInterval(roleTimer)
  roleTimer = null
}

const handleVisibilityChange = () => {
  document.hidden ? pauseRoleCycling() : resumeRoleCycling()
}

// ── Avatar rotation (rAF-throttled, respects prefers-reduced-motion) ────────

let avatarExitY = 0
let rafPending = false

const updateAvatarExitY = () => {
  if (!avatarRef.value) return
  const rect = avatarRef.value.getBoundingClientRect()
  avatarExitY = rect.bottom + window.scrollY
}

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300

  if (prefersReducedMotion.matches || avatarExitY <= 0 || rafPending) return
  rafPending = true
  requestAnimationFrame(() => {
    avatarRotation.value = Math.min(window.scrollY / avatarExitY, 1) * 360
    rafPending = false
  })
}

// ── Helpers ─────────────────────────────────────────────────────────────────

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
const scrollToSection = id =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

function calcDuration(period) {
  const now = new Date()
  const parse = s => {
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
  const s = parse(parts[0]),
    e = parse(parts[1])
  const months = Math.max(
    1,
    (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth())
  )
  const y = Math.floor(months / 12),
    m = months % 12
  if (y > 0 && m > 0) return `${y}年${m}個月`
  if (y > 0) return `${y}年`
  return `${m}個月`
}

// ── Computed ─────────────────────────────────────────────────────────────────

const filteredExp = computed(() =>
  experienceData
    .filter(item => item.type === currentTab.value)
    .map(item => ({ ...item, duration: calcDuration(item.period) }))
)

// ── Lifecycle ────────────────────────────────────────────────────────────────

onMounted(() => {
  resumeRoleCycling()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', updateAvatarExitY, { passive: true })
  document.addEventListener('visibilitychange', handleVisibilityChange)
  nextTick(() => {
    updateAvatarExitY()
    updateIndicator(currentTab.value)
  })
})

onUnmounted(() => {
  pauseRoleCycling()
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateAvatarExitY)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
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

.skip-link:focus {
  top: 1rem;
}

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

@media (prefers-reduced-motion: reduce) {
  .hero-avatar {
    transform: none !important;
    will-change: auto;
  }

  .hero-role::after {
    animation: none;
    opacity: 1;
  }
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
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
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

.scroll-hint:hover {
  opacity: 1;
}

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
  0%,
  100% {
    transform: rotate(45deg) translateY(0);
  }

  50% {
    transform: rotate(45deg) translateY(4px);
  }
}

/* ── Sections ───────────────────────────────── */
.section {
  padding: var(--spacing-3xl) 0;
  contain: layout style;
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
.projects-list {
  border-top: 1px solid var(--color-border);
}

.project-row {
  display: grid;
  grid-template-columns: 2.5rem 1fr auto auto;
  gap: var(--spacing-xl);
  align-items: center;
  padding: var(--spacing-lg) 0;
  border-bottom: 1px solid var(--color-border);
  transition: padding-left var(--transition-fast) var(--ease-out);
}

.project-row:hover {
  padding-left: var(--spacing-sm);
}

.project-num {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-muted);
  font-family: 'SFMono-Regular', 'Consolas', monospace;
  letter-spacing: 0.05em;
}

.project-info {
  min-width: 0;
}

.project-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  margin-bottom: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: flex-end;
}

.project-actions {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
  flex-shrink: 0;
}

.project-action-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  white-space: nowrap;
  transition: color var(--transition-fast);
}

.project-action-link:hover {
  color: var(--color-text);
}

.project-action-primary {
  color: var(--color-accent);
}

.project-action-primary:hover {
  color: var(--color-accent-hover);
}

.projects-more {
  margin-top: var(--spacing-lg);
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
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* ── Experience ─────────────────────────────── */
.exp-tabs {
  position: relative;
  display: flex;
  gap: 0.25rem;
  margin-bottom: var(--spacing-xl);
  border-bottom: 1px solid var(--color-border);
}

.exp-tab {
  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  margin-bottom: -1px;
  transition: color var(--transition-normal) var(--ease-out);
  font-family: inherit;
}

.exp-tab:hover {
  color: var(--color-text);
}

.exp-tab.active {
  color: var(--color-text);
}

.tab-indicator {
  position: absolute;
  bottom: -1px;
  height: 2px;
  background: var(--color-text);
  border-radius: 1px;
  transition:
    left 220ms var(--ease-out),
    width 220ms var(--ease-out);
  pointer-events: none;
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
  transition:
    background var(--transition-fast),
    padding-left var(--transition-fast);
}

.contact-item:hover {
  padding-left: var(--spacing-sm);
}

.contact-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  min-width: 80px;
}

.contact-value {
  font-size: var(--font-size-sm);
  color: var(--color-text);
  flex: 1;
}

.contact-arrow {
  color: var(--color-text-secondary);
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

/* ── Tab transition ─────────────────────────── */
.tab-slide-enter-active,
.tab-slide-leave-active {
  transition:
    opacity 180ms var(--ease-out),
    transform 180ms var(--ease-out);
}

.tab-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.tab-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
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
  box-shadow:
    0 0 0 2px var(--color-bg),
    0 0 0 3px var(--color-border-strong);
}

.timeline-line {
  width: 1px;
  flex: 1;
  background: var(--color-border);
  margin: 4px 0;
  min-height: 24px;
}

.timeline-item:last-child .timeline-line {
  display: none;
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
  transition:
    opacity var(--transition-normal),
    visibility var(--transition-normal),
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
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 5rem var(--spacing-md) 3rem;
  }

  .hero-layout {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
    text-align: center;
  }

  .hero-text-col {
    align-items: center;
  }

  .hero-avatar {
    width: min(200px, 60vw);
  }

  .section {
    padding: var(--spacing-2xl) 0;
  }

  .project-row {
    grid-template-columns: 2rem 1fr;
    grid-template-rows: auto auto;
    row-gap: var(--spacing-sm);
  }

  .project-tags {
    grid-column: 2;
    justify-content: flex-start;
  }

  .project-actions {
    grid-column: 2;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .contact-label {
    min-width: 60px;
  }

  .contact-value {
    font-size: var(--font-size-xs);
  }

  .back-to-top {
    bottom: var(--spacing-lg);
    right: var(--spacing-lg);
  }
}

@media (max-width: 480px) {
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    max-width: 240px;
  }

  .btn {
    justify-content: center;
  }

  .scroll-hint {
    display: none;
  }
}

/* touch devices: neutralize hover-triggered transforms during scroll */
@media (hover: none) and (pointer: coarse) {
  .project-row:hover {
    padding-left: 0;
  }

  .contact-item:hover {
    padding-left: 0;
  }

  .contact-item:hover .contact-arrow {
    transform: none;
  }
}
</style>
