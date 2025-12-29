<template>
  <main class="cv-page" ref="rootEl">
    <a href="#cv-content" class="skip-link">跳至主要內容</a>
    <nav class="cv-actions" aria-label="頁面操作">
      <router-link to="/" class="cv-action-btn" title="回到主頁" aria-label="回到主頁">
        <md-icon aria-hidden="true">home</md-icon>
      </router-link>
      <button class="cv-action-btn" type="button" @click="exportToPDF" title="匯出 PDF" aria-label="匯出 PDF">
        <md-icon aria-hidden="true">picture_as_pdf</md-icon>
      </button>
    </nav>
    <div id="cv-content" class="container cv-container" tabindex="-1">
      <div class="cv-grid">
        <aside class="cv-left-column" aria-label="個人資訊">
          <header class="cv-header animate-in" aria-labelledby="cv-title">
            <h1 id="cv-title" class="cv-name">徐嘉謙</h1>
            <p class="cv-summary">資安與後端開發愛好者，現任 SITCON 2026 年會總召。持有 iPAS 中級資安認證，曾獨立發現校務系統漏洞並完成回報。技術專長涵蓋 Linux 維運、Golang 開發與滲透測試，期望透過學術訓練強化系統底層與演算法能力。</p>
            <nav class="cv-contacts" aria-label="聯絡方式">
              <a v-for="c in contacts" :key="c.type" :href="c.href" class="cv-contact-link" target="_blank" rel="noopener noreferrer" :aria-label="`${c.type === 'email' ? '電子郵件' : '部落格'}: ${c.label}`">
                <md-icon aria-hidden="true">{{ c.icon }}</md-icon>
                <span>{{ c.label }}</span>
              </a>
            </nav>
          </header>
          <section class="cv-section animate-in" aria-labelledby="skills-heading">
            <h2 id="skills-heading" class="cv-section-title"><md-icon aria-hidden="true">psychology</md-icon>技能與證照</h2>
            <div class="cv-skills-certs">
              <div class="cv-skill-tags" role="list" aria-label="技能列表">
                <span v-for="skill in skills" :key="skill" class="cv-skill-tag" role="listitem">{{ skill }}</span>
              </div>
              <ul class="cv-cert-list" aria-label="證照列表">
                <li v-for="cert in certifications" :key="cert">{{ cert }}</li>
              </ul>
            </div>
          </section>
        </aside>
        <div class="cv-right-column">
          <section class="cv-section animate-in" aria-labelledby="experience-heading">
            <h2 id="experience-heading" class="cv-section-title"><md-icon aria-hidden="true">work</md-icon>工作經驗</h2>
            <ul class="cv-list" role="list">
              <li v-for="exp in experience" :key="exp.company" class="cv-list-item">
                <div class="cv-list-main">
                  <span class="cv-list-title">{{ exp.role }}</span>
                  <span class="cv-list-subtitle">{{ exp.company }} - {{ exp.department }}</span>
                </div>
                <span class="cv-list-period" aria-label="工作期間">{{ exp.period }}</span>
              </li>
            </ul>
          </section>
          <section class="cv-section animate-in" aria-labelledby="education-heading">
            <h2 id="education-heading" class="cv-section-title"><md-icon aria-hidden="true">school</md-icon>學歷</h2>
            <ul class="cv-list" role="list">
              <li v-for="edu in education" :key="edu.school" class="cv-list-item">
                <div class="cv-list-main">
                  <span class="cv-list-title">{{ edu.school }}</span>
                  <span class="cv-list-subtitle">{{ edu.department }}</span>
                </div>
              </li>
            </ul>
          </section>
          <section class="cv-section animate-in" aria-labelledby="community-heading">
            <h2 id="community-heading" class="cv-section-title"><md-icon aria-hidden="true">groups</md-icon>社群經驗</h2>
            <ul class="cv-list" role="list">
              <li v-for="c in community" :key="c.name" class="cv-list-item">
                <div class="cv-list-main"><span class="cv-list-title">{{ c.name }}</span></div>
                <span class="cv-community-role" aria-label="角色">{{ c.role }}</span>
              </li>
            </ul>
          </section>
          <section class="cv-section animate-in" aria-labelledby="competitions-heading">
            <h2 id="competitions-heading" class="cv-section-title"><md-icon aria-hidden="true">emoji_events</md-icon>比賽經驗</h2>
            <ul class="cv-list" role="list">
              <li v-for="comp in competitions" :key="comp.name" class="cv-list-item">
                <div class="cv-list-main">
                  <span class="cv-list-title">{{ comp.name }}<span v-if="comp.award" class="cv-award-badge" role="status" :aria-label="`獲得${comp.award}`">{{ comp.award }}</span></span>
                </div>
              </li>
            </ul>
          </section>
          <section class="cv-section animate-in" aria-labelledby="vulnerabilities-heading">
            <h2 id="vulnerabilities-heading" class="cv-section-title"><md-icon aria-hidden="true">bug_report</md-icon>漏洞回報</h2>
            <ul class="cv-list" role="list">
              <li v-for="vuln in vulnerabilities" :key="vuln.id" class="cv-list-item cv-vuln-item">
                <a :href="vuln.url" class="cv-vuln-id" target="_blank" rel="noopener noreferrer" :aria-label="`查看漏洞 ${vuln.id} 詳情`">{{ vuln.id }}</a>
                <span class="cv-vuln-desc">{{ vuln.description }}</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
defineOptions({ name: 'CVView' })
const pdfUrl = `${import.meta.env.BASE_URL}cv/HSU_CHIA_CHIEN_CV.pdf`
const exportToPDF = () => { const a = document.createElement('a'); a.href = pdfUrl; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.setAttribute('download', ''); document.body.appendChild(a); a.click(); document.body.removeChild(a) }
const contacts = [{ type: 'email', label: 'qian@qian30.net', href: 'mailto:qian@qian30.net', icon: 'email' },{ type: 'blog', label: 'blog.qian30.net', href: 'https://blog.qian30.net', icon: 'language' }]
const skills = ['Network(IT)','C++','Linux/Windows Server','Golang','Cybersecurity']
const certifications = ['iPAS資訊安全工程師-中級能力鑑定','網路架設丙級','電腦硬體裝修丙級']
const experience = [{role:'實習工程師',company:'瀚霖智動銷售科技有限公司',department:'系統維運與安全部門',period:'2024/11 - NOW'},{role:'前端工程師',company:'網化數位有限公司',department:'研發部門',period:'2023/7 - 2023/9'}]
const education = [{school:'國立宜蘭大學',department:'資訊工程學系'},{school:'國立羅東高級工業職業學校',department:'資訊科'}]
const community = [{name:'SITCON 學生計算機年會 2026',role:'總召'},{name:'SITCON Camp 2025',role:'副召'},{name:'SITCON 學生計算機年會 2025',role:'行政組副組長'},{name:'羅東高工資訊研究社',role:'副社長'},{name:'一日資安體驗營-宜花東場',role:'助教'},{name:'羅東高工設計思考學習營',role:'助教'},{name:'SITCON 學生計算機年會 2024',role:'場務組志工'},{name:'2023 AWS STEM Summer Camp on The Cloud',role:'學員'},{name:'教育部先進資通安全實務人才培育計畫',role:'學員'},{name:'AIS3 Junior 2022',role:'學員'},{name:'蘭登之星 APCS 培訓計畫基礎班',role:'學員'}]
const competitions = [{name:'2023 T貓盃全國資安基礎實務能力競賽',award:'佳作'}]
const vulnerabilities = [{id:'ZD-2025-01331',url:'https://zeroday.hitcon.org/vulnerability/ZD-2025-01331',description:'國立宜蘭大學 投稿系統前端加密授權繞過導致論文資料未授權存取'}]
const rootEl = ref(null)
let observer = null
onMounted(() => {
  const sections = rootEl.value ? rootEl.value.querySelectorAll('.cv-section, .cv-header') : []
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) { sections.forEach(el => el.classList.add('animate-in')); return }
  observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('animate-in'); if (observer) observer.unobserve(entry.target) } }) }, { threshold: 0.1 })
  sections.forEach(el => observer && observer.observe(el))
})
onBeforeUnmount(() => { if (observer) { observer.disconnect(); observer = null } })
</script>
<style scoped>
.skip-link{position:absolute;top:-100%;left:var(--spacing-md);z-index:9999;padding:var(--spacing-sm) var(--spacing-md);background:var(--color-primary);color:var(--color-on-primary);border-radius:var(--radius-md);font-weight:var(--font-weight-semibold);text-decoration:none;transition:top var(--transition-fast) var(--ease-out)}
.skip-link:focus{top:var(--spacing-md);outline:2px solid var(--color-text-primary);outline-offset:2px}
.cv-page{min-height:100vh;background-color:var(--color-bg-primary);color:var(--color-text-primary);padding:var(--spacing-2xl) 0;position:relative}
.cv-container{max-width:var(--max-width-content)}
.cv-grid{display:grid;grid-template-columns:1fr 2fr;gap:var(--spacing-2xl);align-items:start}
.cv-left-column{position:sticky;top:var(--spacing-2xl);display:flex;flex-direction:column;gap:var(--spacing-xl)}
.cv-right-column{display:flex;flex-direction:column;gap:var(--spacing-xl)}
.cv-actions{position:fixed;top:var(--spacing-xl);right:var(--spacing-xl);display:flex;flex-direction:column;gap:var(--spacing-sm);z-index:1000}
.cv-action-btn{display:flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:var(--radius-full);border:1px solid var(--color-border);cursor:pointer;transition:all var(--transition-normal) var(--ease-out);text-decoration:none;background:var(--color-bg-card);backdrop-filter:blur(10px)}
.cv-action-btn:hover{background:var(--color-bg-tertiary);border-color:var(--color-primary);transform:translateY(-2px);box-shadow:0 4px 16px rgba(100,181,246,0.2)}
.cv-action-btn:focus-visible{outline:2px solid var(--color-primary);outline-offset:2px}
.cv-action-btn md-icon{font-size:1.25rem;color:var(--color-primary)}
.cv-header{text-align:center;padding:var(--spacing-xl);background:var(--color-bg-card);border:1px solid var(--color-border);border-radius:var(--radius-lg);opacity:0;transform:translateY(20px)}
.cv-header.animate-in{opacity:1;transform:translateY(0);transition:opacity 0.6s var(--ease-out),transform 0.6s var(--ease-out)}
.cv-name{font-size:clamp(1.75rem,4vw,2.5rem);font-weight:var(--font-weight-extrabold);color:var(--color-text-primary);margin-bottom:var(--spacing-md);letter-spacing:-0.02em}
.cv-summary{font-size:var(--font-size-sm);color:var(--color-text-secondary);line-height:var(--line-height-relaxed);margin-bottom:var(--spacing-lg)}
.cv-contacts{display:flex;flex-direction:column;gap:var(--spacing-sm);align-items:center}
.cv-contact-link{display:inline-flex;align-items:center;gap:var(--spacing-sm);color:var(--color-primary);font-size:var(--font-size-sm);transition:color var(--transition-fast) var(--ease-out);min-height:var(--min-touch-target);padding:var(--spacing-xs) var(--spacing-sm);border-radius:var(--radius-sm)}
.cv-contact-link:hover{color:var(--color-primary-light);background:rgba(100,181,246,0.1)}
.cv-contact-link:focus-visible{outline:2px solid var(--color-primary);outline-offset:2px}
.cv-contact-link md-icon{font-size:1.25rem}
.cv-section{padding:var(--spacing-xl);background:var(--color-bg-card);border:1px solid var(--color-border);border-radius:var(--radius-lg);opacity:0;transform:translateY(20px)}
.cv-section.animate-in{opacity:1;transform:translateY(0);transition:opacity 0.6s var(--ease-out),transform 0.6s var(--ease-out)}
.cv-section-title{font-size:var(--font-size-lg);font-weight:var(--font-weight-bold);color:var(--color-text-primary);display:flex;align-items:center;gap:var(--spacing-sm);margin-bottom:var(--spacing-lg);padding-bottom:var(--spacing-sm);border-bottom:1px solid var(--color-border)}
.cv-section-title md-icon{color:var(--color-primary);font-size:1.5rem}
.cv-subsection-title{font-size:var(--font-size-md);font-weight:var(--font-weight-semibold);color:var(--color-text-secondary);margin-top:var(--spacing-lg);margin-bottom:var(--spacing-md)}
.cv-subsection-title:first-of-type{margin-top:0}
.cv-list{display:flex;flex-direction:column;gap:var(--spacing-md)}
.cv-list-item{display:flex;justify-content:space-between;align-items:flex-start;gap:var(--spacing-md);padding:var(--spacing-sm) 0;border-bottom:1px solid var(--color-border)}
.cv-list-item:last-child{border-bottom:none}
.cv-list-main{display:flex;flex-direction:column;gap:var(--spacing-xs);flex:1}
.cv-list-title{font-size:var(--font-size-md);font-weight:var(--font-weight-semibold);color:var(--color-text-primary)}
.cv-list-subtitle{font-size:var(--font-size-sm);color:var(--color-text-secondary)}
.cv-list-period{font-size:var(--font-size-sm);color:var(--color-primary);font-weight:var(--font-weight-medium);white-space:nowrap}
.cv-skills-certs{display:flex;flex-direction:column;gap:var(--spacing-lg)}
.cv-skill-tags{display:flex;flex-wrap:wrap;gap:var(--spacing-sm)}
.cv-skill-tag{display:inline-flex;align-items:center;justify-content:center;padding:var(--spacing-xs) var(--spacing-sm);min-height:32px;background:rgba(100,181,246,0.15);color:var(--color-primary);border-radius:var(--radius-full);font-size:var(--font-size-xs);font-weight:var(--font-weight-medium);border:1px solid var(--color-primary)}
.cv-cert-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:var(--spacing-sm)}
.cv-cert-list li{font-size:var(--font-size-sm);color:var(--color-text-secondary);padding-left:var(--spacing-lg);position:relative}
.cv-cert-list li::before{content:'•';position:absolute;left:0;color:var(--color-primary);font-weight:bold}
.cv-community-role{display:inline-flex;align-items:center;justify-content:center;font-size:var(--font-size-sm);color:var(--color-primary);font-weight:var(--font-weight-medium);padding:var(--spacing-xs) var(--spacing-sm);min-height:32px;background:rgba(100,181,246,0.1);border-radius:var(--radius-sm);white-space:nowrap}
.cv-award-badge{display:inline-block;margin-left:var(--spacing-sm);padding:var(--spacing-xs) var(--spacing-sm);background:var(--color-warning);color:var(--color-bg-primary);font-size:var(--font-size-xs);font-weight:var(--font-weight-bold);border-radius:var(--radius-sm)}
.cv-vuln-item{flex-direction:column;align-items:flex-start;gap:var(--spacing-xs)}
.cv-vuln-id{font-size:var(--font-size-sm);font-weight:var(--font-weight-bold);color:var(--color-primary);text-decoration:none;transition:color var(--transition-fast) var(--ease-out)}
.cv-vuln-id:hover{color:var(--color-primary-light);text-decoration:underline}
.cv-vuln-id:focus-visible{outline:2px solid var(--color-primary);outline-offset:2px;border-radius:var(--radius-sm)}
.cv-vuln-desc{font-size:var(--font-size-md);color:var(--color-text-secondary)}
@media(max-width:1023px){.cv-grid{grid-template-columns:1fr;gap:var(--spacing-xl)}.cv-left-column{position:static}.cv-container{max-width:var(--max-width-narrow)}.cv-name{font-size:clamp(2rem,6vw,2.5rem)}.cv-summary{font-size:var(--font-size-md);max-width:600px;margin-left:auto;margin-right:auto}.cv-contacts{flex-direction:row;flex-wrap:wrap;justify-content:center;gap:var(--spacing-lg)}.cv-contact-link{font-size:var(--font-size-md)}.cv-section-title{font-size:var(--font-size-xl)}.cv-skill-tag{font-size:var(--font-size-sm);padding:var(--spacing-sm) var(--spacing-md);min-height:36px}.cv-cert-list li{font-size:var(--font-size-md)}}
@media(max-width:768px){.cv-page{padding:var(--spacing-xl) 0}.cv-actions{top:var(--spacing-md);right:var(--spacing-md)}.cv-action-btn{width:44px;height:44px}.cv-header,.cv-section{padding:var(--spacing-lg);border-radius:var(--radius-md)}.cv-name{font-size:clamp(1.75rem,8vw,2.5rem);margin-bottom:var(--spacing-md)}.cv-summary{font-size:var(--font-size-sm);margin-bottom:var(--spacing-lg)}.cv-section-title{font-size:var(--font-size-md);gap:var(--spacing-xs);margin-bottom:var(--spacing-md)}.cv-section-title md-icon{font-size:1.25rem}.cv-list-item{flex-direction:column;gap:var(--spacing-sm);padding:var(--spacing-md) 0}.cv-list-period,.cv-community-role{align-self:flex-start}.cv-list-title{font-size:var(--font-size-sm)}.cv-list-subtitle{font-size:var(--font-size-xs)}.cv-skill-tag{font-size:var(--font-size-xs);padding:var(--spacing-xs) var(--spacing-sm)}.cv-cert-list li{font-size:var(--font-size-sm)}.cv-subsection-title{font-size:var(--font-size-sm)}.cv-vuln-desc{font-size:var(--font-size-sm)}}
@media(max-width:480px){.cv-page{padding:var(--spacing-lg) 0}.cv-container{padding:0 var(--spacing-sm)}.cv-actions{top:var(--spacing-sm);right:var(--spacing-sm);flex-direction:row}.cv-header,.cv-section{padding:var(--spacing-md)}.cv-name{font-size:1.75rem}.cv-summary{font-size:var(--font-size-xs);line-height:var(--line-height-relaxed)}.cv-contacts{flex-direction:column;align-items:center;gap:var(--spacing-sm)}.cv-contact-link{font-size:var(--font-size-sm)}.cv-section-title{font-size:var(--font-size-sm);padding-bottom:var(--spacing-xs)}.cv-list{gap:var(--spacing-sm)}.cv-list-item{padding:var(--spacing-sm) 0}.cv-skill-tags{gap:var(--spacing-xs)}.cv-award-badge{font-size:0.625rem;padding:2px var(--spacing-xs)}}
@media(prefers-reduced-motion:reduce){.cv-header,.cv-section,.cv-header.animate-in,.cv-section.animate-in{transition:none!important;transform:none!important;opacity:1!important;animation:none!important}.cv-action-btn,.cv-contact-link{transition:none!important}.cv-action-btn:hover{transform:none!important}.skip-link{transition:none!important}}
@media print{@page{margin:12mm}:root{-webkit-print-color-adjust:exact;print-color-adjust:exact}.cv-actions{display:none!important}.cv-page{padding:0;background:#fff!important;color:#000!important}.cv-grid{grid-template-columns:1fr 2fr}.cv-left-column{position:static}.cv-header,.cv-section{background:none!important;border-color:#ccc!important;page-break-inside:avoid;break-inside:avoid;opacity:1!important;transform:none!important}.cv-skill-tag{background:#f0f0f0!important;color:#333!important;border-color:#999!important}}
</style>
