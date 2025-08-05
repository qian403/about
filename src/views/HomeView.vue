<template>
  <div class="home">

    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">HSU CHIA CHIEN</h1>
          <p class="hero-subtitle">資訊工程系學生 / 開源社群成員</p>
          <p class="hero-description">
            具備四年運維經驗及兩年資安學習背景的資訊工程學生，熱衷於資訊安全與系統架構領域。
            擅長網路維運、雲端服務、全端開發與容器化技術。
          </p>
          <div class="hero-actions">
            <md-filled-button @click="scrollToContact" class="primary-button">
              聯絡我
            </md-filled-button>
            <md-outlined-button @click="openBlog" class="secondary-button">
              Blog
            </md-outlined-button>
            <md-outlined-button @click="$router.push('')" class="secondary-button">
              CV
            </md-outlined-button>
          </div>
        </div>
      </div>
    </section>

    <section class="about-section">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2 class="about-title">
              <md-icon class="title-icon">person</md-icon>
              關於我
            </h2>
            <p class="about-description">
              我是一名具備四年運維經驗及兩年資安學習背景的資訊工程學生，熱衷於資訊安全與系統架構領域。
              擅長網路維運、雲端服務、全端開發與容器化技術，積極參與學生開發者社群並展現領導協調能力。
              曾代表學校參加全國技能競賽，現專注於企業級系統安全與效能優化，並持續學習各種新興技術。
            </p>
          </div>

          <div class="about-stats">
            <div class="stat-item">
              <md-icon class="stat-icon">schedule</md-icon>
              <div class="stat-number">4+</div>
              <div class="stat-label">年運維經驗</div>
            </div>
            <div class="stat-item">
              <md-icon class="stat-icon">security</md-icon>
              <div class="stat-number">2+</div>
              <div class="stat-label">年資安學習</div>
            </div>
            <div class="stat-item">
              <md-icon class="stat-icon">work</md-icon>
              <div class="stat-number">1+</div>
              <div class="stat-label">工作經驗</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="skills-section">
      <div class="container">
        <h2 class="section-title">
          技術技能
        </h2>
        <div class="skills-grid">
          <div class="skill-card">
            <div class="skill-category">
              <h3 class="category-title">
                <md-icon class="category-icon">code</md-icon>
                程式開發
              </h3>
              <div class="skill-list">
                <div class="skill-item">
                  <div class="skill-header">
                    <span class="skill-name">Golang</span>
                    <span class="skill-percentage">{{ skillProgress.golang }}%</span>
                  </div>
                  <md-linear-progress :value="skillProgress.golang / 100" class="skill-progress"/>
                </div>
                <div class="skill-item">
                  <div class="skill-header">
                    <span class="skill-name">Python</span>
                    <span class="skill-percentage">{{ skillProgress.python }}%</span>
                  </div>
                  <md-linear-progress :value="skillProgress.python / 100" class="skill-progress"/>
                </div>
                <div class="skill-item">
                  <div class="skill-header">
                    <span class="skill-name">Vue.js</span>
                    <span class="skill-percentage">{{ skillProgress.vuejs }}%</span>
                  </div>
                  <md-linear-progress :value="skillProgress.vuejs / 100" class="skill-progress"/>
                </div>
              </div>
            </div>
          </div>

          <div class="skill-card">
            <div class="skill-category">
              <h3 class="category-title">
                <md-icon class="category-icon">security</md-icon>
                網路與安全
              </h3>
              <div class="skill-list">
                <div class="skill-item">
                  <div class="skill-header">
                    <span class="skill-name">網路營運</span>
                    <span class="skill-percentage">{{ skillProgress.network }}%</span>
                  </div>
                  <md-linear-progress :value="skillProgress.network / 100" class="skill-progress"/>
                </div>
                <div class="skill-item">
                  <div class="skill-header">
                    <span class="skill-name">防火牆配置</span>
                    <span class="skill-percentage">{{ skillProgress.firewall }}%</span>
                  </div>
                  <md-linear-progress :value="skillProgress.firewall / 100" class="skill-progress"/>
                </div>
                <div class="skill-item">
                  <div class="skill-header">
                    <span class="skill-name">弱點掃描</span>
                    <span class="skill-percentage">{{ skillProgress.vulnerability }}%</span>
                  </div>
                  <md-linear-progress :value="skillProgress.vulnerability / 100"
                    class="skill-progress"/>
                </div>
              </div>
            </div>
          </div>

          <div class="skill-card">
            <div class="skill-category">
              <h3 class="category-title">
                <md-icon class="category-icon">cloud</md-icon>
                雲端與容器
              </h3>
              <div class="skill-list">
                <div class="skill-item">
                  <div class="skill-header">
                    <span class="skill-name">AWS</span>
                    <span class="skill-percentage">{{ skillProgress.aws }}%</span>
                  </div>
                  <md-linear-progress :value="skillProgress.aws / 100" class="skill-progress"/>
                </div>
                <div class="skill-item">
                  <div class="skill-header">
                    <span class="skill-name">Docker</span>
                    <span class="skill-percentage">{{ skillProgress.docker }}%</span>
                  </div>
                  <md-linear-progress :value="skillProgress.docker / 100" class="skill-progress"/>
                </div>
                <div class="skill-item">
                  <div class="skill-header">
                    <span class="skill-name">Kubernetes</span>
                    <span class="skill-percentage">{{ skillProgress.kubernetes }}%</span>
                  </div>
                  <md-linear-progress :value="skillProgress.kubernetes / 100"
                    class="skill-progress"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="experience-section">
      <div class="container">
        <h2 class="section-title">
          工作經驗
        </h2>
        <VuetifyTimeline :items="workExperience" />
      </div>
    </section>

    <section id="contact" class="contact-section">
      <div class="container">
        <h2 class="section-title">
          聯絡我
        </h2>
        <div class="contact-content">
          <div class="contact-grid">
            <a href="mailto:qian@qian30.net" class="contact-link">
              <Card class="contact-card">
                <div class="contact-item">
                  <md-icon class="contact-icon">email</md-icon>
                  <div class="contact-details">
                    <h3>Email</h3>
                    <p>qian@qian30.net</p>
                  </div>
                </div>
              </Card>
            </a>

            <a href="https://github.com/qian403" target="_blank" rel="noopener noreferrer" class="contact-link">
              <Card class="contact-card">
                <div class="contact-item">
                  <svg class="contact-icon github-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <div class="contact-details">
                    <h3>GitHub</h3>
                    <p>github.com/qian403</p>
                  </div>
                </div>
              </Card>
            </a>

            <a href="https://qian30.net" target="_blank" rel="noopener noreferrer" class="contact-link">
              <Card class="contact-card">
                <div class="contact-item">
                  <md-icon class="contact-icon">language</md-icon>
                  <div class="contact-details">
                    <h3>部落格</h3>
                    <p>qian30.net</p>
                  </div>
                </div>
              </Card>
            </a>

            <a href="https://www.linkedin.com/in/hsuchiachien" target="_blank" rel="noopener noreferrer"
              class="contact-link">
              <Card class="contact-card">
                <div class="contact-item">
                  <svg class="contact-icon linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <div class="contact-details">
                    <h3>LinkedIn</h3>
                    <p>linkedin.com/in/hsuchiachien</p>
                  </div>
                </div>
              </Card>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VuetifyTimeline from '../components/VuetifyTimeline.vue'
import Card from '../components/Card.vue'


const skillProgress = ref({
  golang: 0,
  python: 0,
  vuejs: 0,
  network: 0,
  firewall: 0,
  vulnerability: 0,
  aws: 0,
  docker: 0,
  kubernetes: 0
})


const targetSkills = {
  golang: 60,
  python: 60,
  vuejs: 65,
  network: 65,
  firewall: 60,
  vulnerability: 60,
  aws: 65,
  docker: 65,
  kubernetes: 66
}


const workExperience = ref([
  {
    icon: 'mdi-briefcase',
    title: '系統維運與安全部門 實習生',
    company: '瀚霖智動銷售科技有限公司',
    period: '2024年11月 - 2025年6月'
  }
])

const scrollToContact = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const openBlog = () => {
  window.open('https://blog.qian30.net', '_blank', 'noopener,noreferrer')
}


const animateSkills = () => {
  const duration = 2000
  const steps = 60
  const stepDuration = duration / steps

  let currentStep = 0

  const animate = () => {
    if (currentStep >= steps) return

    const progress = currentStep / steps
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)

    Object.keys(targetSkills).forEach(skill => {
      skillProgress.value[skill] = Math.round(targetSkills[skill] * easeOutQuart)
    })

    currentStep++
    setTimeout(animate, stepDuration)
  }

  animate()
}

onMounted(() => {

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        animateSkills()
        skillsObserver.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.3
  })


  const skillsSection = document.querySelector('.skills-section')
  if (skillsSection) {
    skillsObserver.observe(skillsSection)
  }


  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  }, {
    threshold: 0.1
  })

  // 觀察所有需要動畫的元素
  document.querySelectorAll('.skill-card, .contact-card').forEach(el => {
    observer.observe(el)
  })
})
</script>

<style scoped>
.home {
  min-height: 100vh;
  background-color: #fffbfe;
  color: #1c1b1f;
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background: linear-gradient(135deg, #f3f2f3 0%, #e8def8 100%);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
}

.hero-text {
  animation: fadeInUp 1s ease-out;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: #1c1b1f;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #49454f;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  color: #49454f;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.primary-button {
  min-width: 140px;
}

.secondary-button {
  min-width: 140px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.about-section,
.skills-section,
.experience-section,
.contact-section {
  padding: 4rem 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: #1c1b1f;
}


/* 移除空的 about-card 類別 */

.title-icon {
  font-size: 2rem;
  color: #6750a4;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  overflow: visible;
}

.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: center;
}

.about-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #1c1b1f;
}

.about-description {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #49454f;
}

.about-stats {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
  background: #f3f2f3;
  border-radius: 12px;
  border: 2px solid #d0bcff;
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 0.05);
}

.stat-icon {
  font-size: 2rem;
  color: #6750a4;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  margin-left: auto;
  margin-right: auto;
  overflow: visible;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1c1b1f;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: #49454f;
}

/* Skills Section */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.skill-card {
  background: #fffbfe;
  border: 2px solid #d0bcff;
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 2rem;
  min-height: 300px;
}

.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px 0 rgb(0 0 0 / 0.15);
}

.category-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #1c1b1f;
}

.category-icon {
  color: #6750a4;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  overflow: visible;
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  font-weight: 500;
  color: #1c1b1f;
}

.skill-percentage {
  font-size: 0.875rem;
  color: #49454f;
}

.skill-progress {
  border-radius: 4px;
}

/* Experience Section */
.experience-section {
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  position: relative;
}

.experience-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(103, 80, 164, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(103, 80, 164, 0.03) 0%, transparent 50%);
  pointer-events: none;
}

/* Contact Section */
.contact-content {
  max-width: 800px;
  margin: 0 auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.contact-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.contact-card {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  height: 100%;
  text-align: center;
  min-height: 100px;
  flex-direction: column;
}

.contact-icon {
  font-size: 1.5rem;
  color: #6750a4;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  overflow: visible;
}

.github-icon,
.linkedin-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #6750a4;
  flex-shrink: 0;
}

.contact-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.contact-details h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #1c1b1f;
  margin-bottom: 0.25rem;
}

.contact-details p {
  font-size: 0.875rem;
  color: #49454f;
  margin: 0;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.125rem;
  }

  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .section-title {
    font-size: 2rem;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
    max-width: 200px;
  }

  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .contact-item {
    padding: 1.25rem;
    min-height: 90px;
  }

  .contact-details h3 {
    font-size: 0.9rem;
  }

  .contact-details p {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .about-stats {
    flex-direction: row;
    gap: 1rem;
  }

  .stat-item {
    flex: 1;
  }

  .hero-actions {
    gap: 0.75rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .contact-link {
    height: auto;
  }

  .contact-item {
    padding: 0.75rem;
    min-height: 80px;
    gap: 0.5rem;
  }

  .contact-icon {
    font-size: 1.25rem;
    width: 1.25rem;
    height: 1.25rem;
  }

  .contact-details h3 {
    font-size: 0.875rem;
    margin-bottom: 0.125rem;
  }

  .contact-details p {
    font-size: 0.75rem;
    word-break: break-all;
  }
}
</style>