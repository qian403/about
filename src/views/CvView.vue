<template>
  <main class="cv-root" :data-view="view">
    <div class="cv-toolbar">
      <div class="cv-toolbar-inner">
        <div class="cv-toolbar-title">
          <router-link to="/" class="cv-back">← chien.dev</router-link>
          <p class="cv-eyebrow">Curriculum Vitae</p>
          <p class="cv-updated">Last updated / 2026.10</p>
        </div>

        <div class="cv-toolbar-actions">
          <div class="cv-view-switch" role="group" aria-label="履歷顯示模式">
            <button
              type="button"
              :aria-pressed="view === 'web'"
              @click="setView('web')"
            >
              網頁版
            </button>
            <button
              type="button"
              :aria-pressed="view === 'print'"
              @click="setView('print')"
            >
              列印預覽
            </button>
          </div>
          <button type="button" class="cv-print-button" @click="printCv">
            <span class="cv-print-label">列印 / </span>PDF
          </button>
        </div>
      </div>
    </div>

    <article
      class="cv-web-view"
      :aria-hidden="view !== 'web'"
      :inert="view !== 'web'"
    >
      <header class="cv-web-hero">
        <div class="cv-hero-text">
          <p class="cv-eyebrow cv-hero-eyebrow">Network · Security · Systems</p>
          <h1>
            徐嘉謙
            <span>CHIEN</span>
          </h1>
          <p class="cv-hero-lead">
            在網路、資安與系統維運之間，把複雜問題整理成可靠、可持續維護的實作。
          </p>
          <p class="cv-hero-intro">
            資訊工程學生，具備企業系統維運、網路管理、資訊安全與全端開發實務經驗。運營個人自治系統
            AS215934，持續投入 BGP 路由、可靠系統與資安領域。
          </p>
          <nav class="cv-contact-links" aria-label="聯絡方式">
            <a
              v-for="contact in contacts"
              :key="contact.label"
              :href="contact.href"
              :target="contact.external ? '_blank' : undefined"
              :rel="contact.external ? 'noopener noreferrer' : undefined"
              class="cv-contact-link"
              :aria-label="contact.label"
              :title="contact.label"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path :d="contact.icon" fill="currentColor" />
              </svg>
            </a>
          </nav>
        </div>

        <div class="cv-hero-side">
          <img
            src="/avatar.jpg"
            alt="CHIEN 的個人頭像"
            class="cv-portrait"
            width="160"
            height="160"
          />
          <dl class="cv-hero-meta">
            <div>
              <dt class="sr-only">所在地</dt>
              <dd>Yilan, Taiwan</dd>
            </div>
            <div>
              <dt class="sr-only">時區</dt>
              <dd>GMT+8</dd>
            </div>
            <div>
              <dt class="sr-only">目前狀態</dt>
              <dd>Student / Engineer</dd>
            </div>
          </dl>
        </div>
      </header>

      <nav class="cv-classic-nav" aria-label="履歷章節">
        <a
          v-for="link in sectionLinks"
          :key="link.id"
          :href="`#${link.id}`"
          @click.prevent="scrollToSection(link.id)"
          >{{ link.label }}</a
        >
      </nav>

      <section class="cv-now-section" aria-labelledby="web-focus-heading">
        <div class="cv-now-label">
          <p class="cv-eyebrow">Current focus</p>
          <h2 id="web-focus-heading">現在投入的領域</h2>
        </div>
        <dl class="cv-now-list">
          <div v-for="item in focusAreas" :key="item.label">
            <dt>{{ item.label }}</dt>
            <dd>{{ item.text }}</dd>
          </div>
        </dl>
      </section>

      <section class="cv-web-section" aria-labelledby="web-experience-heading">
        <div class="cv-web-section-label">
          <p>01 / Experience</p>
          <h2 id="web-experience-heading">實務經驗</h2>
        </div>
        <div class="cv-timeline">
          <article
            v-for="job in workExperience"
            :key="job.company"
            class="cv-timeline-entry"
          >
            <div class="cv-timeline-date">
              <div>
                <p v-for="period in job.periods" :key="period.start">
                  {{ formatPeriod(period) }}
                </p>
              </div>
              <p class="cv-muted">
                {{ formatWorkPeriodsDuration(job.periods) }}
              </p>
            </div>
            <div>
              <h3 class="cv-job-title">{{ job.title }}</h3>
              <p class="cv-job-company">
                {{ job.company }} · {{ job.department }}
              </p>
              <p class="cv-job-summary">{{ job.summary }}</p>
              <ul class="cv-chips" aria-label="工作內容">
                <li v-for="focus in job.focus" :key="focus" class="cv-chip">
                  {{ focus }}
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section
        class="cv-web-section"
        aria-labelledby="web-vulnerabilities-heading"
      >
        <div class="cv-web-section-label">
          <p>02 / Security Research</p>
          <h2 id="web-vulnerabilities-heading">漏洞研究與通報</h2>
        </div>
        <div class="cv-vulnerability-timeline">
          <a
            v-for="vulnerability in vulnerabilityDisclosures"
            :key="vulnerability.id"
            :href="vulnerability.href"
            target="_blank"
            rel="noopener noreferrer"
            class="cv-vulnerability-row"
          >
            <span>
              <strong class="cv-mono-accent">{{ vulnerability.id }}</strong>
              <span class="cv-mono-muted">
                {{ vulnerability.year }} · {{ vulnerability.risk }}
              </span>
            </span>
            <span>
              <strong class="cv-row-title">{{
                vulnerability.organization
              }}</strong>
              <span class="cv-row-text">{{ vulnerability.title }}</span>
            </span>
            <span>
              <span class="cv-row-text cv-row-text-first">
                {{ vulnerability.description }}
              </span>
              <span class="cv-mono-muted">{{ vulnerability.type }}</span>
            </span>
            <span class="cv-row-link">ZeroDay ↗</span>
          </a>
        </div>
      </section>

      <section class="cv-web-section" aria-labelledby="web-projects-heading">
        <div class="cv-web-section-label">
          <p>03 / Projects</p>
          <h2 id="web-projects-heading">代表專案</h2>
        </div>
        <div class="cv-project-list">
          <a
            v-for="(project, index) in projects"
            :key="project.name"
            :href="project.href"
            target="_blank"
            rel="noopener noreferrer"
            class="cv-project-row"
          >
            <span class="cv-project-index">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <span>
              <strong class="cv-row-title">{{ project.name }}</strong>
              <span class="cv-mono-muted">{{ project.stack }}</span>
            </span>
            <span class="cv-row-text cv-row-text-first">
              {{ project.description }}
            </span>
            <span class="cv-row-link">{{ project.linkLabel }} ↗</span>
          </a>
        </div>
      </section>

      <section class="cv-web-section" aria-labelledby="web-background-heading">
        <div class="cv-web-section-label">
          <p>04 / Background</p>
          <h2 id="web-background-heading">學歷與證照</h2>
        </div>
        <div class="cv-web-content cv-two-columns">
          <div>
            <h3 class="cv-web-subheading">Education</h3>
            <div class="cv-compact-timeline">
              <div
                v-for="item in education"
                :key="item.school"
                class="cv-compact-row"
              >
                <div>
                  <p class="cv-strong">{{ item.school }}</p>
                  <p class="cv-subtext">{{ item.department }}</p>
                </div>
                <p class="cv-mono-date">
                  {{ formatDate(item.start) }} - {{ formatDate(item.end) }}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 class="cv-web-subheading">Certifications</h3>
            <div class="cv-cert-list">
              <div
                v-for="certification in certifications"
                :key="certification.name"
                class="cv-compact-row cv-cert-row"
              >
                <div>
                  <p class="cv-strong">{{ certification.name }}</p>
                  <p class="cv-subtext">
                    {{ certification.level && `${certification.level} · `
                    }}{{ certification.issuer }}
                  </p>
                </div>
                <p class="cv-mono-accent cv-mono-date">
                  {{ certification.year }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="cv-web-section" aria-labelledby="web-skills-heading">
        <div class="cv-web-section-label">
          <p>05 / Toolbox</p>
          <h2 id="web-skills-heading">技能與工具</h2>
        </div>
        <dl class="cv-skill-list">
          <div v-for="group in skillGroups" :key="group.name">
            <dt>{{ group.name }}</dt>
            <dd>{{ group.skills.join(' · ') }}</dd>
          </div>
        </dl>
      </section>

      <section class="cv-web-section" aria-labelledby="web-community-heading">
        <div class="cv-web-section-label">
          <p>06 / Community</p>
          <h2 id="web-community-heading">社群與活動</h2>
        </div>
        <div class="cv-web-content cv-two-columns">
          <div>
            <h3 class="cv-web-subheading">Community</h3>
            <ul class="cv-compact-timeline">
              <li
                v-for="item in leadership"
                :key="item.name"
                class="cv-compact-row"
              >
                <span class="cv-list-text">
                  <a
                    :href="item.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="cv-list-link"
                  >
                    <strong>{{ item.name }}</strong>
                  </a>
                  <span class="cv-list-role">{{ item.role }}</span>
                </span>
                <time class="cv-mono-date">{{ item.year }}</time>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="cv-web-subheading">Training & Activities</h3>
            <ul class="cv-compact-timeline">
              <li
                v-for="item in additionalExperience"
                :key="item.name"
                class="cv-compact-row"
              >
                <span class="cv-list-text">
                  <strong>{{ item.name }}</strong>
                  <span class="cv-list-role">{{ item.role }}</span>
                </span>
                <time class="cv-mono-date">{{ item.year }}</time>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </article>

    <article
      class="cv-paper cv-print-view"
      :aria-hidden="view !== 'print'"
      :inert="view !== 'print'"
    >
      <header class="cv-header">
        <div class="cv-header-top">
          <div>
            <p class="cv-paper-name">徐嘉謙</p>
            <p class="cv-paper-alias">CHIEN</p>
            <p class="cv-paper-role">Network / Security / Systems Engineer</p>
          </div>

          <address class="cv-paper-address">
            <p>Yilan, Taiwan · GMT+8</p>
            <p><a href="mailto:hi@chien.dev">hi@chien.dev</a></p>
            <p><a href="https://github.com/qian403">github.com/qian403</a></p>
            <p><a href="https://t.me/qian50">t.me/qian50</a></p>
          </address>
        </div>

        <p class="cv-paper-summary">
          資訊工程學生，具備企業系統維運、網路管理、資訊安全與全端開發實務經驗。運營個人自治系統
          AS215934，持續投入 BGP 路由、可靠系統與資安領域。
        </p>
      </header>

      <div class="cv-columns">
        <aside class="cv-sidebar">
          <section class="cv-section" aria-labelledby="education-heading">
            <h2 id="education-heading" class="cv-heading">Education</h2>
            <div class="cv-stack cv-stack-4">
              <div
                v-for="item in education"
                :key="item.school"
                class="cv-entry"
              >
                <h3 class="cv-p-title">{{ item.school }}</h3>
                <p class="cv-p-accent">{{ item.department }}</p>
                <p class="cv-p-meta">
                  {{ formatDate(item.start) }} - {{ formatDate(item.end) }}
                </p>
              </div>
            </div>
          </section>

          <section class="cv-section" aria-labelledby="certifications-heading">
            <h2 id="certifications-heading" class="cv-heading">
              Certifications
            </h2>
            <div class="cv-stack cv-stack-3">
              <div
                v-for="certification in certifications"
                :key="certification.name"
                class="cv-entry"
              >
                <div class="cv-p-split">
                  <h3 class="cv-p-title cv-p-title-sm">
                    {{ certification.name }}
                  </h3>
                  <span class="cv-p-year">{{ certification.year }}</span>
                </div>
                <p v-if="certification.level" class="cv-p-level">
                  {{ certification.level }}
                </p>
                <p class="cv-p-meta">{{ certification.issuer }}</p>
              </div>
            </div>
          </section>

          <section class="cv-section" aria-labelledby="skills-heading">
            <h2 id="skills-heading" class="cv-heading">Technical Skills</h2>
            <dl class="cv-stack cv-stack-3">
              <div
                v-for="group in skillGroups"
                :key="group.name"
                class="cv-entry"
              >
                <dt class="cv-p-skill-name">{{ group.name }}</dt>
                <dd class="cv-p-body">{{ group.skills.join(' · ') }}</dd>
              </div>
            </dl>
          </section>
        </aside>

        <div class="cv-main">
          <section class="cv-section" aria-labelledby="experience-heading">
            <h2 id="experience-heading" class="cv-heading">Work Experience</h2>
            <div class="cv-stack cv-stack-4">
              <div
                v-for="job in workExperience"
                :key="job.company"
                class="cv-entry"
              >
                <div class="cv-p-split">
                  <div>
                    <h3 class="cv-p-title cv-p-title-lg">{{ job.title }}</h3>
                    <p class="cv-p-accent">{{ job.company }}</p>
                  </div>
                  <div class="cv-p-dates">
                    <div>
                      <p v-for="period in job.periods" :key="period.start">
                        {{ formatPeriod(period) }}
                      </p>
                    </div>
                    <p class="cv-p-duration">
                      {{ formatWorkPeriodsDuration(job.periods) }}
                    </p>
                  </div>
                </div>
                <p class="cv-p-meta">{{ job.department }}</p>
                <p class="cv-p-body cv-p-gap">{{ job.summary }}</p>
                <p class="cv-p-meta">{{ job.focus.join(' / ') }}</p>
              </div>
            </div>
          </section>

          <section class="cv-section" aria-labelledby="vulnerabilities-heading">
            <h2 id="vulnerabilities-heading" class="cv-heading">
              Vulnerability Disclosure
            </h2>
            <div class="cv-stack cv-stack-3">
              <div
                v-for="vulnerability in vulnerabilityDisclosures"
                :key="vulnerability.id"
                class="cv-entry"
              >
                <div class="cv-p-split">
                  <div>
                    <h3 class="cv-p-title">{{ vulnerability.organization }}</h3>
                    <p class="cv-p-level">{{ vulnerability.title }}</p>
                  </div>
                  <a
                    :href="vulnerability.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="`查看 ${vulnerability.id}`"
                    class="cv-p-link"
                  >
                    {{ vulnerability.id }}
                  </a>
                </div>
                <p class="cv-p-meta">
                  {{ vulnerability.type }} · {{ vulnerability.risk }}
                </p>
              </div>
            </div>
          </section>

          <section class="cv-section" aria-labelledby="projects-heading">
            <h2 id="projects-heading" class="cv-heading">Selected Projects</h2>
            <div class="cv-project-grid">
              <div
                v-for="project in projects"
                :key="project.name"
                class="cv-entry"
              >
                <div class="cv-p-split">
                  <h3 class="cv-p-title">{{ project.name }}</h3>
                  <a
                    :href="project.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="`查看 ${project.name}`"
                    class="cv-p-link"
                  >
                    {{ project.linkLabel }}
                  </a>
                </div>
                <p class="cv-p-body cv-p-gap">{{ project.description }}</p>
                <p class="cv-p-meta">{{ project.stack }}</p>
              </div>
            </div>
          </section>

          <section class="cv-section" aria-labelledby="leadership-heading">
            <h2 id="leadership-heading" class="cv-heading">
              Leadership & Community
            </h2>
            <div class="cv-stack cv-stack-2">
              <div
                v-for="item in leadership"
                :key="item.name"
                class="cv-entry cv-p-row"
              >
                <p class="cv-p-body">
                  <a
                    :href="item.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="cv-p-name-link"
                  >
                    {{ item.name }}
                  </a>
                  <span class="cv-p-role">/ {{ item.role }}</span>
                </p>
                <time class="cv-p-time">{{ item.year }}</time>
              </div>
            </div>
          </section>

          <section class="cv-section" aria-labelledby="training-heading">
            <h2 id="training-heading" class="cv-heading">
              Additional Training & Activities
            </h2>
            <ul class="cv-training-list">
              <li
                v-for="item in additionalExperience"
                :key="item.name"
                class="cv-entry"
              >
                <p class="cv-p-body">
                  <strong>{{ item.name }}</strong>
                  <span v-if="item.role" class="cv-p-role"
                    >/ {{ item.role }}</span
                  >
                </p>
                <time class="cv-p-time">{{ item.year }}</time>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </article>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mdiEmail, mdiGithub, mdiSend } from '@mdi/js'

const route = useRoute()
const router = useRouter()

const view = ref(route.query.view === 'print' ? 'print' : 'web')

const setView = next => {
  view.value = next
  router.replace({ query: next === 'print' ? { view: 'print' } : {} })
}

const printCv = () => window.print()

const scrollToSection = id =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const contacts = [
  { label: 'Email', href: 'mailto:hi@chien.dev', icon: mdiEmail },
  {
    label: 'GitHub',
    href: 'https://github.com/qian403',
    icon: mdiGithub,
    external: true,
  },
  {
    label: 'Telegram',
    href: 'https://t.me/qian50',
    icon: mdiSend,
    external: true,
  },
]

const sectionLinks = [
  { id: 'web-experience-heading', label: '經歷' },
  { id: 'web-vulnerabilities-heading', label: '漏洞研究' },
  { id: 'web-projects-heading', label: '專案' },
  { id: 'web-background-heading', label: '學歷' },
  { id: 'web-community-heading', label: '社群' },
]

const focusAreas = [
  { label: '01 / NETWORK', text: '運營 AS215934，實作 BGP 路由與網路架構。' },
  { label: '02 / SYSTEMS', text: '處理 Linux、容器化服務與日常系統維運。' },
  { label: '03 / COMMUNITY', text: '參與 SITCON 組織與學生技術社群。' },
]

const workExperience = [
  {
    title: '實習工程師',
    company: '瀚霖智動銷售科技有限公司',
    department: '系統維運與安全部門',
    summary: '負責系統維運、資訊安全，以及全端開發。',
    focus: ['系統維運', '資訊安全', '前後端開發'],
    periods: [
      { start: '2025-12', end: '2026-10' },
      { start: '2024-11', end: '2025-06' },
    ],
  },
  {
    title: '前端工程師',
    company: '網化數位有限公司',
    department: '前端開發',
    summary: '參與網站前端功能與介面開發。',
    focus: ['前端開發'],
    periods: [{ start: '2023-07', end: '2023-09' }],
  },
]

const education = [
  {
    school: '國立宜蘭大學',
    department: '資訊工程系',
    start: '2024-09',
    end: null,
  },
  {
    school: '國立羅東高工',
    department: '資訊科',
    start: '2021-09',
    end: '2023-06',
  },
]

const certifications = [
  {
    name: 'iPAS 資訊安全工程師',
    level: '中級能力鑑定',
    issuer: '經濟部產業發展署',
    year: '2025',
  },
  {
    name: '網路架設乙級技術士',
    level: '',
    issuer: '勞動部勞動力發展署',
    year: '2023',
  },
  {
    name: '電腦硬體裝修乙級技術士',
    level: '',
    issuer: '勞動部勞動力發展署',
    year: '2022',
  },
]

const skillGroups = [
  {
    name: 'Programming',
    skills: ['Python', 'JavaScript', 'C++', 'C#', 'Go', 'Swift'],
  },
  {
    name: 'Web',
    skills: ['Vue.js', 'React', 'Django', 'Tailwind CSS'],
  },
  {
    name: 'Systems',
    skills: ['Linux', 'Windows', 'Docker', 'Git', 'Nginx'],
  },
  {
    name: 'Network & Security',
    skills: ['BGP', '網路維運', '系統維運', '資訊安全'],
  },
]

const projects = [
  {
    name: 'AS215934 自治系統',
    description: '運營個人自治系統，實踐 BGP 路由協議與網路架構設計。',
    stack: 'BGP / Network Operations',
    href: 'https://bgp.tools/as/215934',
    linkLabel: 'BGP Tools',
  },
  {
    name: 'FutureNest Chatbot',
    description: '支援文件索引與多供應商 LLM 回退的 RAG 文件檢索聊天機器人。',
    stack: 'Django / React / Chroma / Docker',
    href: 'https://github.com/qian403/futurenest-chatbot',
    linkLabel: 'GitHub',
  },
  {
    name: 'NIU-app',
    description: '整合校務系統、Moodle、課表與行事曆的宜蘭大學校園 App。',
    stack: 'Swift / SwiftUI / UIKit / WidgetKit',
    href: 'https://github.com/qian403/NIU-app',
    linkLabel: 'GitHub',
  },
  {
    name: 'Web Tools',
    description: '以 Vue 開發的實用網頁工具集合。',
    stack: 'Vue.js',
    href: 'https://github.com/qian403/web-tools',
    linkLabel: 'GitHub',
  },
]

const vulnerabilityDisclosures = [
  {
    id: 'ZD-2026-00749',
    organization: '中天新聞網',
    title: '管理後台 API 的認證與授權機制存在缺陷',
    description:
      '管理後台 API 缺乏存取控制，未登入的攻擊者可取得 API token，並讀取逾 7,000 筆含個人資料的民眾投訴紀錄。',
    type: 'Broken Access Control · CWE-284',
    risk: '中風險',
    year: '2026',
    href: 'https://zeroday.hitcon.org/vulnerability/ZD-2026-00749',
  },
  {
    id: 'ZD-2025-01331',
    organization: '國立宜蘭大學',
    title: '投稿系統前端加密授權繞過導致論文資料未授權存取',
    description:
      '投稿系統將授權檢查與加密金鑰置於前端，攻擊者可繞過存取控制，未經授權讀取投稿論文與作者個人資料。',
    type: 'Broken Access Control · CWE-284',
    risk: '高風險',
    year: '2025',
    href: 'https://zeroday.hitcon.org/vulnerability/ZD-2025-01331',
  },
]

const leadership = [
  {
    name: 'SITCON 學生計算機年會 2026',
    role: '總召',
    year: '2026',
    href: 'https://sitcon.org/2026/',
  },
  {
    name: 'SITCON Camp 2025',
    role: '副召',
    year: '2025',
    href: 'https://sitcon.camp/2025/',
  },
  {
    name: 'SITCON 學生計算機年會 2025',
    role: '行政組副組長',
    year: '2025',
    href: 'https://sitcon.org/2025/',
  },
  {
    name: 'SITCON 學生計算機年會 2024',
    role: '場務組志工',
    year: '2024',
    href: 'https://sitcon.org/2024/',
  },
]

const additionalExperience = [
  { name: 'AWS STEM Summer Camp on The Cloud', role: '學員', year: '2023' },
  { name: '教育部先進資通安全實務人才培育計畫', role: '學員', year: '2023' },
  { name: '一日資安體驗營', role: '助教', year: '2023' },
  { name: 'AIS3 Junior', role: '學員', year: '2022' },
  { name: '羅東高工資訊研究社', role: '副社長', year: '2021-2023' },
]

function formatDate(date) {
  if (!date) return 'Present'
  const [year, month] = date.split('-')
  return month ? `${year}.${month}` : year
}

const formatPeriod = period =>
  `${formatDate(period.start)} - ${formatDate(period.end)}`

// 起訖月份皆計入，例如 2025-12 ~ 2026-10 為 11 個月
function toMonthIndex(value) {
  const [year, month] = value.split('-').map(Number)
  return year * 12 + month - 1
}

function formatWorkPeriodsDuration(periods, currentDate = new Date()) {
  const totalMonths = periods.reduce((total, { start, end }) => {
    const endMonth = end
      ? toMonthIndex(end)
      : currentDate.getFullYear() * 12 + currentDate.getMonth()
    return total + endMonth - toMonthIndex(start) + 1
  }, 0)
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  return [years > 0 && `${years} 年`, months > 0 && `${months} 個月`]
    .filter(Boolean)
    .join(' ')
}

const previousTitle = document.title

onMounted(() => {
  document.title = 'CHIEN 履歷 | chien.dev'
})

onUnmounted(() => {
  document.title = previousTitle
})
</script>

<style scoped>
.cv-root {
  --cv-fg: var(--color-text);
  --cv-bg: var(--color-bg);
  --cv-accent: var(--color-accent);
  --cv-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  padding-inline: 1.25rem;
  color: var(--cv-fg);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

a {
  color: inherit;
  text-decoration: none;
}

/* ── Toolbar ─────────────────────────────────────────────────────────────── */

.cv-toolbar {
  position: sticky;
  top: 0;
  z-index: 20;
  margin-inline: -1.25rem;
  padding: 1.25rem;
  border-bottom: 1px solid color-mix(in oklab, var(--cv-fg) 10%, transparent);
  background: color-mix(in oklab, var(--cv-bg) 92%, transparent);
  backdrop-filter: blur(14px);
}

.cv-toolbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: min(920px, 100%);
  margin-inline: auto;
}

.cv-toolbar-title {
  min-width: 0;
}

.cv-back {
  display: inline-block;
  margin-bottom: 0.35rem;
  color: color-mix(in oklab, var(--cv-fg) 62%, transparent);
  font-size: 0.8125rem;
  font-weight: 600;
}

.cv-back:hover {
  color: var(--cv-accent);
}

.cv-eyebrow {
  color: var(--cv-accent);
  font-family: var(--cv-mono);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  text-transform: uppercase;
}

.cv-updated {
  margin-top: 0.25rem;
  color: color-mix(in oklab, var(--cv-fg) 55%, transparent);
  font-size: 0.75rem;
}

.cv-toolbar-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.75rem;
}

.cv-view-switch {
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  min-height: 2.5rem;
  padding: 0.2rem;
  border: 1px solid color-mix(in oklab, var(--cv-fg) 16%, transparent);
  border-radius: 0.375rem;
  background: color-mix(in oklab, var(--cv-fg) 4%, transparent);
}

.cv-view-switch button {
  min-width: 4.75rem;
  padding: 0.4rem 0.7rem;
  border: 0;
  border-radius: 0.25rem;
  background: transparent;
  color: color-mix(in oklab, var(--cv-fg) 58%, transparent);
  font: inherit;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1rem;
  cursor: pointer;
  transition:
    background-color 150ms ease,
    color 150ms ease;
}

.cv-view-switch button[aria-pressed='true'] {
  background: var(--cv-fg);
  color: var(--cv-bg);
}

.cv-print-button {
  min-height: 2.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid color-mix(in oklab, var(--cv-fg) 18%, transparent);
  border-radius: 0.375rem;
  background: transparent;
  color: var(--cv-fg);
  font: inherit;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    border-color 150ms ease,
    color 150ms ease;
}

.cv-print-button:hover {
  border-color: color-mix(in oklab, var(--cv-accent) 60%, transparent);
  color: var(--cv-accent);
}

.cv-print-view,
.cv-root[data-view='print'] .cv-web-view {
  display: none;
}

.cv-root[data-view='print'] .cv-print-view {
  display: block;
}

/* ── Web view ────────────────────────────────────────────────────────────── */

.cv-web-view {
  width: min(920px, 100%);
  margin-inline: auto;
  padding-bottom: 4rem;
}

.cv-web-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 3rem;
  padding-block: 4rem;
  border-bottom: 1px solid color-mix(in oklab, var(--cv-fg) 10%, transparent);
}

.cv-hero-text {
  max-width: 48rem;
}

.cv-hero-eyebrow {
  margin-bottom: 1.25rem;
}

.cv-web-hero h1 {
  font-size: 2.75rem;
  font-weight: 700;
  line-height: 1.12;
}

.cv-web-hero h1 span {
  display: block;
  margin-top: 0.6rem;
  color: color-mix(in oklab, var(--cv-fg) 48%, transparent);
  font-size: 1rem;
  font-weight: 600;
}

.cv-hero-lead {
  max-width: 42rem;
  margin-top: 1.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.85rem;
}

.cv-hero-intro {
  max-width: 42rem;
  margin-top: 0.9rem;
  color: color-mix(in oklab, var(--cv-fg) 68%, transparent);
  font-size: 0.9375rem;
  line-height: 1.65rem;
}

.cv-contact-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.75rem;
}

.cv-contact-link {
  display: inline-flex;
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  color: color-mix(in oklab, var(--cv-fg) 68%, transparent);
  transition:
    background-color 150ms ease,
    color 150ms ease;
}

.cv-contact-link svg {
  width: 1.25rem;
  height: 1.25rem;
}

.cv-contact-link:hover {
  background: color-mix(in oklab, var(--cv-fg) 7%, transparent);
  color: var(--cv-accent);
}

.cv-portrait {
  display: block;
  width: 6.5rem;
  height: 6.5rem;
  margin-left: auto;
  border: 1px solid color-mix(in oklab, var(--cv-fg) 12%, transparent);
  border-radius: 50%;
  object-fit: cover;
}

.cv-hero-meta {
  margin-top: 1.5rem;
  color: color-mix(in oklab, var(--cv-fg) 60%, transparent);
  font-family: var(--cv-mono);
  font-size: 0.75rem;
  line-height: 1.5rem;
  text-align: right;
}

.cv-classic-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
  padding-block: 1rem;
  border-bottom: 1px solid color-mix(in oklab, var(--cv-fg) 10%, transparent);
  font-size: 0.8125rem;
  font-weight: 700;
}

.cv-classic-nav a {
  color: color-mix(in oklab, var(--cv-fg) 62%, transparent);
}

.cv-classic-nav a:hover {
  color: var(--cv-accent);
}

.cv-now-section {
  padding-block: 3rem;
  border-bottom: 1px solid color-mix(in oklab, var(--cv-fg) 10%, transparent);
}

.cv-now-label {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.cv-now-label h2 {
  color: color-mix(in oklab, var(--cv-fg) 65%, transparent);
  font-size: 0.875rem;
  font-weight: 600;
}

.cv-now-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 2rem;
}

.cv-now-list > div {
  padding-inline: 1.5rem;
  border-left: 1px solid color-mix(in oklab, var(--cv-fg) 10%, transparent);
}

.cv-now-list > div:last-child {
  padding-right: 0;
}

.cv-now-list dt {
  color: var(--cv-accent);
  font-family: var(--cv-mono);
  font-size: 0.75rem;
  font-weight: 600;
}

.cv-now-list dd {
  margin-top: 0.5rem;
  color: color-mix(in oklab, var(--cv-fg) 68%, transparent);
  font-size: 0.875rem;
  line-height: 1.5rem;
}

.cv-web-section {
  padding-block: 3rem;
}

.cv-web-section-label {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid color-mix(in oklab, var(--cv-fg) 12%, transparent);
}

.cv-web-section-label > p {
  color: var(--cv-accent);
  font-family: var(--cv-mono);
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1rem;
  text-transform: uppercase;
}

.cv-web-section-label > h2 {
  scroll-margin-top: 8rem;
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.75rem;
}

.cv-web-content {
  margin-top: 2rem;
}

.cv-web-subheading {
  color: color-mix(in oklab, var(--cv-fg) 62%, transparent);
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1rem;
  text-transform: uppercase;
}

.cv-timeline,
.cv-vulnerability-timeline {
  position: relative;
  margin-top: 2rem;
}

.cv-timeline-entry {
  position: relative;
  display: grid;
  grid-template-columns: 9.5rem minmax(0, 1fr);
  gap: 2rem;
  padding: 0 0 2.25rem 1.75rem;
}

.cv-timeline-entry:last-child {
  padding-bottom: 0;
}

.cv-timeline-entry::after,
.cv-vulnerability-row::after,
.cv-compact-timeline > *::after {
  position: absolute;
  top: 0.32rem;
  left: 0;
  width: 0.65rem;
  height: 0.65rem;
  border: 2px solid color-mix(in oklab, var(--cv-accent) 62%, transparent);
  border-radius: 50%;
  background: var(--cv-bg);
  content: '';
}

.cv-timeline-entry:not(:last-child)::before,
.cv-vulnerability-row:not(:last-child)::before,
.cv-compact-timeline > *:not(:last-child)::before {
  position: absolute;
  top: 0.9rem;
  bottom: -0.3rem;
  left: 0.3rem;
  width: 1px;
  background: color-mix(in oklab, var(--cv-fg) 18%, transparent);
  content: '';
}

.cv-timeline-date {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: var(--cv-accent);
  font-family: var(--cv-mono);
  font-size: 0.75rem;
  font-weight: 600;
}

.cv-timeline-date > div p + p {
  margin-top: 0.25rem;
}

.cv-muted {
  color: color-mix(in oklab, var(--cv-fg) 48%, transparent);
}

.cv-job-title {
  font-size: 1.25rem;
  font-weight: 700;
}

.cv-job-company {
  margin-top: 0.25rem;
  color: color-mix(in oklab, var(--cv-fg) 68%, transparent);
  font-size: 0.875rem;
  font-weight: 600;
}

.cv-job-summary {
  margin-top: 0.75rem;
  color: color-mix(in oklab, var(--cv-fg) 72%, transparent);
  line-height: 1.75rem;
}

.cv-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  list-style: none;
}

.cv-chip {
  padding: 0.3rem 0.55rem;
  border: 1px solid color-mix(in oklab, var(--cv-fg) 13%, transparent);
  border-radius: 0.25rem;
  color: color-mix(in oklab, var(--cv-fg) 66%, transparent);
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1rem;
}

.cv-vulnerability-row {
  position: relative;
  display: grid;
  grid-template-columns: 8rem minmax(11rem, 0.8fr) minmax(0, 1fr) auto;
  gap: 1.5rem;
  padding: 0 0 2.25rem 1.75rem;
}

.cv-vulnerability-row:last-child {
  padding-bottom: 0;
}

.cv-mono-accent {
  display: block;
  color: var(--cv-accent);
  font-family: var(--cv-mono);
  font-size: 0.875rem;
  font-weight: 700;
}

.cv-mono-muted {
  display: block;
  margin-top: 0.5rem;
  color: color-mix(in oklab, var(--cv-fg) 48%, transparent);
  font-family: var(--cv-mono);
  font-size: 0.75rem;
  line-height: 1.25rem;
}

.cv-row-title {
  display: block;
  font-weight: 700;
  transition: color 150ms ease;
}

.cv-vulnerability-row:hover .cv-row-title,
.cv-project-row:hover .cv-row-title {
  color: var(--cv-accent);
}

.cv-row-text {
  display: block;
  margin-top: 0.5rem;
  color: color-mix(in oklab, var(--cv-fg) 68%, transparent);
  font-size: 0.875rem;
  line-height: 1.5rem;
}

.cv-row-text-first {
  margin-top: 0;
}

.cv-row-link {
  color: var(--cv-accent);
  font-size: 0.875rem;
  font-weight: 600;
}

.cv-project-row {
  display: grid;
  grid-template-columns: 2.5rem minmax(10rem, 0.72fr) minmax(0, 1fr) auto;
  align-items: start;
  gap: 1rem;
  padding-block: 1.5rem;
}

.cv-project-row + .cv-project-row {
  border-top: 1px solid color-mix(in oklab, var(--cv-fg) 10%, transparent);
}

.cv-project-index {
  color: color-mix(in oklab, var(--cv-fg) 42%, transparent);
  font-family: var(--cv-mono);
  font-size: 0.75rem;
}

.cv-two-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 3.5rem;
}

.cv-compact-timeline,
.cv-cert-list {
  margin-top: 1.25rem;
  list-style: none;
}

.cv-compact-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1.25rem;
}

.cv-compact-timeline > * {
  position: relative;
  padding: 0 0 1.5rem 1.75rem;
}

.cv-compact-timeline > *:last-child {
  padding-bottom: 0;
}

.cv-cert-row {
  padding-top: 1rem;
  border-top: 1px solid color-mix(in oklab, var(--cv-fg) 10%, transparent);
}

.cv-cert-row + .cv-cert-row {
  margin-top: 1.5rem;
}

.cv-strong {
  font-weight: 700;
}

.cv-subtext {
  margin-top: 0.25rem;
  color: color-mix(in oklab, var(--cv-fg) 62%, transparent);
  font-size: 0.875rem;
  line-height: 1.5rem;
}

.cv-mono-date {
  margin-top: 0;
  color: color-mix(in oklab, var(--cv-fg) 50%, transparent);
  font-family: var(--cv-mono);
  font-size: 0.75rem;
}

.cv-mono-accent.cv-mono-date {
  color: var(--cv-accent);
  font-weight: 600;
}

.cv-skill-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.75rem 2.5rem;
}

.cv-skill-list > div {
  padding-top: 1rem;
  border-top: 1px solid color-mix(in oklab, var(--cv-fg) 10%, transparent);
}

.cv-skill-list > div:nth-child(-n + 2) {
  border-top: 0;
}

.cv-skill-list dt {
  color: var(--cv-accent);
  font-family: var(--cv-mono);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.cv-skill-list dd {
  margin-top: 0.75rem;
  color: color-mix(in oklab, var(--cv-fg) 72%, transparent);
  font-size: 0.875rem;
  line-height: 1.75rem;
}

.cv-list-text {
  color: color-mix(in oklab, var(--cv-fg) 72%, transparent);
  font-size: 0.875rem;
  line-height: 1.5rem;
}

.cv-list-text strong {
  color: var(--cv-fg);
  font-weight: 600;
  transition: color 150ms ease;
}

.cv-list-link:hover strong {
  color: var(--cv-accent);
}

.cv-list-role {
  display: block;
  margin-top: 0.125rem;
  color: color-mix(in oklab, var(--cv-fg) 52%, transparent);
}

@media (max-width: 767px) {
  .cv-web-hero {
    grid-template-columns: 1fr;
    gap: 1.75rem;
    padding-block: 3rem;
  }

  .cv-hero-side {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1.5rem;
    order: -1;
  }

  .cv-portrait {
    width: 5.5rem;
    height: 5.5rem;
    margin-left: 0;
  }

  .cv-hero-meta {
    margin-top: 0;
  }

  .cv-web-hero h1 {
    font-size: 2.25rem;
  }

  .cv-web-section-label {
    display: block;
  }

  .cv-web-section-label > h2 {
    margin-top: 0.55rem;
  }

  .cv-timeline-entry,
  .cv-vulnerability-row,
  .cv-project-row,
  .cv-two-columns {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .cv-two-columns {
    gap: 2.5rem;
  }
}

@media (max-width: 639px) {
  .cv-print-label {
    display: none;
  }

  .cv-view-switch button {
    min-width: 4.25rem;
    padding-inline: 0.45rem;
  }

  .cv-print-button {
    padding-inline: 0.65rem;
  }

  .cv-now-list,
  .cv-skill-list {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .cv-now-list > div {
    padding: 1rem 0 0;
    border-top: 1px solid color-mix(in oklab, var(--cv-fg) 10%, transparent);
    border-left: 0;
  }

  .cv-skill-list > div:nth-child(2) {
    border-top: 1px solid color-mix(in oklab, var(--cv-fg) 10%, transparent);
  }
}

/* ── Paper / print view ──────────────────────────────────────────────────── */

.cv-paper {
  width: min(210mm, 100%);
  min-height: 297mm;
  margin: 2rem auto 4rem;
  padding: 14mm 15mm;
  background: #fff;
  color: #18181b;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang TC',
    'Noto Sans TC', 'Microsoft JhengHei', sans-serif;
  letter-spacing: 0;
  box-shadow: 0 18px 60px rgb(0 0 0 / 18%);
}

.cv-paper a {
  color: #1d4ed8;
  text-underline-offset: 2px;
}

.cv-header {
  padding-bottom: 1rem;
  border-bottom: 1px solid #d4d4d8;
}

.cv-header-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.25rem;
}

.cv-paper-name {
  color: #111827;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.cv-paper-alias {
  margin-top: 0.5rem;
  color: #2563eb;
  font-size: 1.125rem;
  font-weight: 600;
}

.cv-paper-role {
  margin-top: 0.75rem;
  color: #4b5563;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
}

.cv-paper-address {
  color: #374151;
  font-size: 0.6875rem;
  font-style: normal;
  line-height: 1.25rem;
  text-align: right;
}

.cv-paper-summary {
  margin-top: 1rem;
  padding-left: 1rem;
  border-left: 2px solid #2563eb;
  color: #374151;
  font-size: 0.75rem;
  line-height: 1.25rem;
}

.cv-columns {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.9fr);
  gap: 1.75rem;
  margin-top: 1rem;
}

.cv-sidebar {
  padding-right: 1.5rem;
  border-right: 1px solid #e4e4e7;
}

.cv-main {
  min-width: 0;
}

.cv-sidebar > * + * {
  margin-top: 1.25rem;
}

.cv-main > * + * {
  margin-top: 1rem;
}

.cv-heading {
  padding-bottom: 0.35rem;
  border-bottom: 1px solid #d4d4d8;
  color: #111827;
  font-size: 0.75rem;
  font-weight: 800;
  line-height: 1.25rem;
  text-transform: uppercase;
}

.cv-stack {
  margin-top: 0.75rem;
}

.cv-stack-4 > * + * {
  margin-top: 1rem;
}

.cv-stack-3 > * + * {
  margin-top: 0.875rem;
}

.cv-stack-2 > * + * {
  margin-top: 0.625rem;
}

.cv-p-split {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.cv-p-title {
  color: #111827;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1rem;
}

.cv-p-title-sm {
  font-size: 0.6875rem;
}

.cv-p-title-lg {
  font-size: 0.8125rem;
}

.cv-p-accent {
  margin-top: 0.125rem;
  color: #2563eb;
  font-size: 0.6875rem;
  font-weight: 600;
}

.cv-p-level {
  margin-top: 0.125rem;
  color: #4b5563;
  font-size: 0.625rem;
  font-weight: 600;
  line-height: 1rem;
}

.cv-p-meta {
  margin-top: 0.25rem;
  color: #6b7280;
  font-size: 0.625rem;
  line-height: 1rem;
}

.cv-p-body {
  color: #374151;
  font-size: 0.6875rem;
  line-height: 1.25rem;
}

.cv-p-gap {
  margin-top: 0.375rem;
}

.cv-p-year {
  flex-shrink: 0;
  color: #2563eb;
  font-size: 0.625rem;
  font-weight: 600;
}

.cv-p-skill-name {
  color: #2563eb;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
}

.cv-p-skill-name + .cv-p-body {
  margin-top: 0.25rem;
}

.cv-p-dates {
  flex-shrink: 0;
  color: #4b5563;
  font-size: 0.625rem;
  font-weight: 600;
  text-align: right;
}

.cv-p-duration {
  margin-top: 0.375rem;
  color: #6b7280;
}

.cv-p-link {
  flex-shrink: 0;
  font-size: 0.625rem;
  font-weight: 600;
  text-decoration: none;
}

.cv-project-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem 1.5rem;
  margin-top: 0.75rem;
}

.cv-project-grid .cv-p-link {
  font-size: 0.6875rem;
  font-weight: 400;
}

.cv-p-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1rem;
}

.cv-paper .cv-p-name-link {
  color: #111827;
  font-weight: 700;
  text-decoration: none;
}

.cv-p-role {
  margin-left: 0.375rem;
  color: #2563eb;
}

.cv-p-time {
  flex-shrink: 0;
  color: #6b7280;
  font-size: 0.625rem;
  font-weight: 600;
}

.cv-training-list {
  margin-top: 0.75rem;
  list-style: none;
}

.cv-training-list li {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 0.5rem;
}

.cv-training-list li + li {
  border-top: 1px solid rgb(17 17 17 / 10%);
}

.cv-training-list strong {
  color: #111827;
  font-weight: 600;
}

@media (max-width: 639px) {
  .cv-paper {
    width: auto;
    min-height: 0;
    margin: 0 -1.25rem 2rem;
    padding: 2rem 1.25rem;
    box-shadow: none;
  }

  .cv-header-top {
    flex-direction: column;
  }

  .cv-paper-address {
    text-align: left;
  }

  .cv-columns,
  .cv-project-grid {
    grid-template-columns: 1fr;
  }

  .cv-sidebar {
    padding-right: 0;
    border-right: 0;
  }

  .cv-paper :is(p, address, li, dd, time) {
    font-size: 0.75rem !important;
    line-height: 1.35rem !important;
  }

  .cv-paper :is(h3, dt, .cv-heading) {
    font-size: 0.8125rem !important;
    line-height: 1.35rem !important;
  }
}

@media print {
  @page {
    size: A4;
    margin: 4mm 9mm;
  }

  :global(.grid-bg),
  .cv-toolbar,
  .cv-web-view {
    display: none !important;
  }

  .cv-root {
    padding: 0;
  }

  .cv-print-view {
    display: block !important;
  }

  :global(html),
  :global(body) {
    background: #fff !important;
    color: #18181b !important;
  }

  .cv-paper {
    width: 100%;
    min-height: 0;
    margin: 0;
    padding: 0;
    box-shadow: none;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  .cv-paper :is(p, address, li, dd, time) {
    line-height: 4.2mm !important;
  }

  .cv-header {
    padding-bottom: 2mm;
    break-after: avoid-page;
  }

  .cv-header-top {
    flex-direction: row;
    gap: 4mm;
  }

  .cv-paper-address {
    text-align: right;
  }

  .cv-paper-summary {
    margin-top: 2mm;
    padding-left: 3mm;
  }

  .cv-columns {
    grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.9fr);
    gap: 5mm;
    margin-top: 2mm;
    break-inside: auto;
  }

  .cv-project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .cv-sidebar {
    padding-right: 4mm;
    border-right: 1px solid #e4e4e7;
  }

  .cv-sidebar > * + *,
  .cv-main > * + * {
    margin-top: 2mm;
  }

  .cv-heading {
    padding-bottom: 1mm;
    line-height: 4.5mm;
    break-after: avoid-page;
  }

  .cv-section {
    break-inside: auto;
  }

  .cv-entry {
    break-inside: avoid-page;
    page-break-inside: avoid;
  }

  .cv-section > :not(.cv-heading) {
    margin-top: 1.25mm;
  }

  .cv-stack > * + * {
    margin-top: 1.25mm;
  }

  .cv-project-grid {
    row-gap: 1.25mm;
  }

  .cv-training-list li {
    padding-block: 0.4mm;
  }

  .cv-paper a {
    color: #1d4ed8 !important;
  }
}
</style>
