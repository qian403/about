<template>
    <div class="cv-home">
        <!-- 回主頁按鈕跟匯出 -->
        <div class="cv-actions">
            <router-link to="/" class="cv-action-btn cv-home-btn" title="回到主頁">
                <md-icon>home</md-icon>
            </router-link>
            <button class="cv-action-btn cv-export-btn" @click="exportToPDF" title="匯出 PDF">
                <md-icon>picture_as_pdf</md-icon>
            </button>
        </div>

        <div class="container">
            <div class="cv-card cv-header-card animate-in">
                <div class="cv-header-content">
                    <div class="cv-avatar-block">
                        <img class="cv-avatar"
                            src="https://media.licdn.com/dms/image/v2/D5603AQE7ql0YvPJheA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1723312618792?e=1756944000&v=beta&t=xVdLu2sYQ-Mrckqj21swKX4_ZfFrFwqZD1ugikMDaYE"
                            alt="Jason Hsu" >
                    </div>
                    <div class="cv-header-info">
                        <h1 class="cv-title">HSU CHIA CHIEN</h1>
                        <p class="cv-subtitle">資訊工程系學生 / 系統維運實習生</p>
                        <div class="cv-contact-list">
                            <div class="cv-contact-item">
                                <md-icon>email</md-icon>
                                <a href="mailto:qian@qian30.net" class="cv-contact-link">qian@qian30.net</a>
                            </div>
                            <div class="cv-contact-item">
                                <svg class="github-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                <a href="https://github.com/qian403" target="_blank" rel="noopener noreferrer"
                                    class="cv-contact-link">github.com/qian403</a>
                            </div>
                            <div class="cv-contact-item"><md-icon>location_on</md-icon>台灣</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cv-card animate-in">
                <h2 class="cv-section-title"><md-icon>person</md-icon>個人簡介</h2>
                <p class="cv-summary">
                    具備四年運維經驗及兩年資安學習背景的資訊工程學生，熱衷於資訊安全與系統架構領域。
                    擅長網路維運、雲端服務、全端開發與容器化技術，參與學生開發者社群並展現協調能力。
                </p>
            </div>

            <div class="cv-card animate-in">
                <h2 class="cv-section-title"><md-icon>psychology</md-icon>專業技能</h2>
                <div class="cv-skills-grid">
                    <div class="cv-skill-card">
                        <h3 class="cv-skill-title"><md-icon>code</md-icon>程式開發</h3>
                        <div class="cv-skill-tags">
                            <span class="cv-skill-tag">Golang</span>
                            <span class="cv-skill-tag">Python</span>
                            <span class="cv-skill-tag">Vue.js</span>
                        </div>
                    </div>
                    <div class="cv-skill-card">
                        <h3 class="cv-skill-title"><md-icon>security</md-icon>網路與安全</h3>
                        <div class="cv-skill-tags">
                            <span class="cv-skill-tag">網路營運</span>
                            <span class="cv-skill-tag">防火牆配置</span>
                            <span class="cv-skill-tag">弱點掃描</span>
                        </div>
                    </div>
                    <div class="cv-skill-card">
                        <h3 class="cv-skill-title"><md-icon>cloud</md-icon>雲端與容器</h3>
                        <div class="cv-skill-tags">
                            <span class="cv-skill-tag">AWS</span>
                            <span class="cv-skill-tag">Docker</span>
                            <span class="cv-skill-tag">Kubernetes</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cv-card animate-in">
                <h2 class="cv-section-title"><md-icon>work</md-icon>工作經驗</h2>
                <div class="cv-timeline">
                    <div class="cv-timeline-item">
                        <div class="cv-timeline-dot"/>
                        <div class="cv-timeline-content">
                            <div class="cv-timeline-header">
                                <span class="cv-timeline-title">系統維運與安全部門 實習生</span>
                                <span class="cv-timeline-company">瀚霖智動銷售科技有限公司</span>
                                <span class="cv-timeline-period">2024年11月 - 2025年6月</span>
                            </div>
                            <ul class="cv-timeline-list">
                                <li>管理伺服器維持99.9%系統穩定度</li>
                                <li>建立自動化弱點掃描系統降低安全風險 40%</li>
                                <li>開發高效能網路爬蟲處理每日 1000+ 筆數據</li>
                                <li>協助完成3個大型IT基礎設施升級專案</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cv-card animate-in">
                <h2 class="cv-section-title"><md-icon>school</md-icon>教育背景</h2>
                <div class="cv-timeline">
                    <div class="cv-timeline-item">
                        <div class="cv-timeline-dot"/>
                        <div class="cv-timeline-content">
                            <div class="cv-timeline-header">
                                <span class="cv-timeline-title">國立宜蘭大學 - 資訊工程學系學士</span>
                                <span class="cv-timeline-period">2024年9月 - 現在</span>
                            </div>
                            <div class="cv-timeline-desc">主修資訊工程，專注於系統架構與資訊安全領域</div>
                        </div>
                    </div>
                    <div class="cv-timeline-item">
                        <div class="cv-timeline-dot"/>
                        <div class="cv-timeline-content">
                            <div class="cv-timeline-header">
                                <span class="cv-timeline-title">國立羅東高級工業職業學校 - 資訊科</span>
                                <span class="cv-timeline-period">2021 年 9 月 - 2024 年 6 月</span>
                            </div>
                            <div class="cv-timeline-desc">學習資訊技術基礎，參與多項技能競賽</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cv-card animate-in">
                <h2 class="cv-section-title"><md-icon>verified</md-icon>證照與認證</h2>
                <ul class="cv-cert-list">
                    <li>IPAS初階資安工程師</li>
                    <li>電腦硬體裝修丙級</li>
                    <li>網路架設丙級</li>
                </ul>
            </div>

            <div class="cv-card animate-in">
                <h2 class="cv-section-title"><md-icon>groups</md-icon>社群參與</h2>
                <ul class="cv-community-list">
                    <li><strong>SITCON 2026（學生計算機年會）總召</strong> | 2026年</li>
                    <li><strong>SITCON 2025 夏令營副召</strong> | 2025年</li>
                    <li><strong>SITCON 2025 行政組副組長</strong> | 2025年</li>
                    <li><strong>SITCON 2024（學生計算機年會）場務組組員</strong> | 2024年</li>
                    <li><strong>AIS3 Junior</strong> | 2023年</li>
                </ul>
            </div>

            <div class="cv-card animate-in">
                <h2 class="cv-section-title"><md-icon>language</md-icon>語言能力</h2>
                <div class="cv-lang-list">
                    <div class="cv-lang-item"><span>中文（繁體）</span><span>母語</span></div>
                    <div class="cv-lang-item"><span>中文（簡體）</span><span>可閱讀技術文件與完全溝通</span></div>
                    <div class="cv-lang-item"><span>英文</span><span>可閱讀技術文件與基礎溝通</span></div>
                </div>
            </div>

            <div class="cv-card animate-in">
                <h2 class="cv-section-title"><md-icon>emoji_events</md-icon>參賽經驗</h2>
                <div class="cv-competition-list">
                    <div class="cv-competition-item">
                        <div class="cv-competition-title">全國技能競賽分區賽 - 資訊網路技術 <span
                                class="cv-competition-year">2024年</span></div>
                        <div class="cv-competition-desc">網路架設、伺服器配置、系統整合、故障排除</div>
                    </div>
                    <div class="cv-competition-item">
                        <div class="cv-competition-title">2024金盾獎資安競賽 <span class="cv-competition-year">2024年</span>
                        </div>
                        <div class="cv-competition-desc">網路安全防護、弱點分析、事件回應</div>
                    </div>
                    <div class="cv-competition-item">
                        <div class="cv-competition-title">2023 T貓盃全國資安基礎實務能力競賽 <span
                                class="cv-competition-year">2023年</span> <span class="cv-competition-award">佳作</span>
                        </div>
                        <div class="cv-competition-desc">系統安全、網路防護、惡意程式分析</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'

const exportToPDF = () => {
    // 這裡可以添加 PDF 匯出功能
    // 例如使用 html2pdf.js 或 jsPDF
    window.print()
}

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in')
            }
        })
    }, { threshold: 0.1 })
    document.querySelectorAll('.cv-card').forEach(el => {
        observer.observe(el)
    })
})
</script>

<style scoped>
.cv-home {
    min-height: 100vh;
    background-color: #fffbfe;
    color: #1c1b1f;
    padding: 2rem 0;
    position: relative;
}

.cv-actions {
    position: fixed;
    top: 2rem;
    right: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    z-index: 1000;
}

.cv-action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    background: rgba(255, 251, 254, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(208, 188, 255, 0.3);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cv-action-btn md-icon {
    font-size: 1.25rem;
    color: #6750a4;
}

.cv-home-btn:hover {
    background: rgba(232, 222, 248, 0.95);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(103, 80, 164, 0.2);
}

.cv-export-btn:hover {
    background: rgba(103, 80, 164, 0.95);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(103, 80, 164, 0.3);
}

.cv-export-btn:hover md-icon {
    color: white;
}

.container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 2rem;
}

.cv-card {
    background: #fffbfe;
    border: 2px solid #d0bcff;
    border-radius: 16px;
    box-shadow: 0 2px 8px 0 rgb(0 0 0 / 0.1);
    margin-bottom: 2rem;
    padding: 2rem;
    transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s;
    opacity: 0;
    transform: translateY(30px);
}

.cv-card.animate-in {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.6s cubic-bezier(.4, 0, .2, 1), transform 0.6s cubic-bezier(.4, 0, .2, 1);
}

.cv-header-card {
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #f3f2f3 0%, #e8def8 100%);
    border: none;
    box-shadow: 0 4px 24px 0 rgb(103 80 164 / 0.08);
    margin-bottom: 2.5rem;
    padding: 2.5rem 2rem;
}

.cv-header-content {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 2.5rem;
}

.cv-avatar-block {
    flex-shrink: 0;
}

.cv-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid #d0bcff;
    box-shadow: 0 8px 32px rgba(103, 80, 164, 0.15);
    object-fit: cover;
}

.cv-header-info {
    flex: 1;
}

.cv-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #1c1b1f;
}

.cv-subtitle {
    font-size: 1.2rem;
    color: #49454f;
    margin-bottom: 1.5rem;
    font-weight: 500;
}

.cv-contact-list {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    color: #49454f;
    font-size: 1rem;
}

.cv-contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.cv-contact-link {
    color: #6750a4;
    text-decoration: none;
    transition: color 0.3s ease;
}

.cv-contact-link:hover {
    color: #6750a4;
    text-decoration: underline;
}

.github-icon {
    width: 1.2rem;
    height: 1.2rem;
    color: #6750a4;
    flex-shrink: 0;
}

.cv-section-title {
    font-size: 1.5rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #1c1b1f;
    margin-bottom: 1.5rem;
}

.cv-section-title md-icon {
    color: #6750a4;
    font-size: 2rem;
}

.cv-summary {
    font-size: 1.1rem;
    color: #49454f;
    line-height: 1.7;
}

.cv-skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2rem;
}

.cv-skill-card {
    background: #f3f2f3;
    border-radius: 12px;
    padding: 1.25rem 1rem;
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 0.05);
    border: 2px solid #d0bcff;
    transition: box-shadow 0.3s, border-color 0.3s;
}

.cv-skill-card:hover {
    box-shadow: 0 8px 24px 0 rgb(103 80 164 / 0.10);
    border-color: #6750a4;
}

.cv-skill-title {
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #1c1b1f;
    margin-bottom: 1rem;
}

.cv-skill-title md-icon {
    color: #6750a4;
    font-size: 1.5rem;
}

.cv-skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.cv-skill-tag {
    background: #e8def8;
    color: #6750a4;
    border-radius: 8px;
    padding: 0.4rem 1rem;
    font-size: 0.95rem;
    font-weight: 500;
}

.cv-timeline {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 1rem;
}

.cv-timeline-item {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    position: relative;
}

.cv-timeline-dot {
    width: 1.2rem;
    height: 1.2rem;
    background: #6750a4;
    border: 3px solid #fffbfe;
    border-radius: 50%;
    box-shadow: 0 0 0 2px #d0bcff;
    margin-top: 0.5rem;
    flex-shrink: 0;
}

.cv-timeline-content {
    flex: 1;
    min-width: 0;
}

.cv-timeline-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
}

.cv-timeline-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1c1b1f;
}

.cv-timeline-company {
    font-size: 1rem;
    color: #6750a4;
    font-weight: 500;
}

.cv-timeline-period {
    font-size: 0.95rem;
    color: #49454f;
    font-style: italic;
}

.cv-timeline-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.cv-timeline-list li {
    position: relative;
    padding-left: 1.2rem;
    margin-bottom: 0.5rem;
    color: #49454f;
    font-size: 0.98rem;
    line-height: 1.6;
}

.cv-timeline-list li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #6750a4;
    font-weight: bold;
}

.cv-timeline-desc {
    color: #49454f;
    font-size: 0.98rem;
    margin-top: 0.2rem;
}

.cv-cert-list {
    list-style: none;
    padding: 0;
    margin: 0;
    color: #49454f;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.cv-cert-list li {
    padding-left: 1.2rem;
    position: relative;
}

.cv-cert-list li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #6750a4;
    font-weight: bold;
}

.cv-community-list {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0 0;
}

.cv-community-list li {
    color: #49454f;
    line-height: 1.6;
    margin-bottom: 0.5rem;
    padding-left: 0;
}

.cv-community-list li:last-child {
    margin-bottom: 0;
}

.cv-lang-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.cv-lang-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem 0;
    color: #49454f;
    font-size: 0.98rem;
}

.cv-competition-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 0.5rem;
}

.cv-competition-item {
    background: #f3f2f3;
    border-radius: 10px;
    padding: 1rem 1.2rem;
    border: 2px solid #d0bcff;
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 0.05);
}

.cv-competition-title {
    font-size: 1.05rem;
    font-weight: 600;
    color: #1c1b1f;
    margin-bottom: 0.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.cv-competition-year {
    font-size: 0.95rem;
    color: #6750a4;
    font-weight: 500;
}

.cv-competition-award {
    background: #fbbf24;
    color: #1f2937;
    padding: 0.2rem 0.7rem;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-left: 0.5rem;
}

.cv-competition-desc {
    color: #49454f;
    font-size: 0.98rem;
    margin-top: 0.2rem;
}

@media (max-width: 900px) {
    .container {
        padding: 0 0.5rem;
    }

    .cv-header-content {
        flex-direction: column;
        gap: 1.5rem;
        text-align: center;
    }

    .cv-actions {
        top: 1rem;
        right: 1rem;
        gap: 0.5rem;
    }

    .cv-action-btn {
        width: 44px;
        height: 44px;
    }
}

@media (max-width: 480px) {
    .cv-actions {
        top: 0.5rem;
        right: 0.5rem;
        gap: 0.5rem;
    }

    .cv-action-btn {
        width: 40px;
        height: 40px;
    }

    .cv-action-btn md-icon {
        font-size: 1.1rem;
    }
}

@media (max-width: 600px) {

    .cv-card,
    .cv-header-card {
        padding: 1.2rem 0.7rem;
    }

    .cv-title {
        font-size: 1.5rem;
    }

    .cv-section-title {
        font-size: 1.1rem;
    }

    .cv-avatar {
        width: 80px;
        height: 80px;
    }

    .cv-skills-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}
</style>
