/**
 * Property-Based Tests for CV Page Redesign
 * Feature: cv-redesign
 * 
 * Tests for visual consistency, content completeness, data correctness, and accessibility.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import * as fc from 'fast-check'
import CVView from './CVView.vue'

// Mock md-icon component
const mockMdIcon = {
  template: '<span class="md-icon"><slot /></span>'
}

// Mock router-link component
const mockRouterLink = {
  template: '<a :href="to"><slot /></a>',
  props: ['to']
}

/**
 * Property 1: 視覺風格一致性
 * Feature: cv-redesign, Property 1
 * Validates: Requirements 1.1, 3.1, 3.2
 * 
 * For any CV 頁面渲染，頁面應使用與主頁相同的 CSS 變數（背景色、文字色、間距等），
 * 且每個區塊應有清晰的標題。在大螢幕（≥1024px）時應呈現雙欄佈局，小螢幕時應回歸單欄。
 */
describe('Property 1: 視覺風格一致性', () => {
  // CSS variables that should be used for visual consistency
  const REQUIRED_CSS_VARIABLES = [
    '--color-bg-primary',
    '--color-bg-card',
    '--color-text-primary',
    '--color-text-secondary',
    '--color-primary',
    '--color-border',
    '--radius-lg',
    '--spacing-lg',
    '--spacing-xl'
  ]

  // Section titles that should exist in the CV page
  const SECTION_TITLES = [
    '工作經驗',
    '技能與證照',
    '學歷',
    '社群經驗',
    '特殊成就'
  ]

  it('Property 1: CV page uses required CSS variables from design system', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const componentPath = path.resolve(__dirname, './CVView.vue')
    const componentContent = fs.readFileSync(componentPath, 'utf-8')

    fc.assert(
      fc.property(
        fc.constantFrom(...REQUIRED_CSS_VARIABLES),
        (cssVar) => {
          return componentContent.includes(`var(${cssVar})`)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 1: For any section title, it exists in the CV page', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const componentPath = path.resolve(__dirname, './CVView.vue')
    const componentContent = fs.readFileSync(componentPath, 'utf-8')

    fc.assert(
      fc.property(
        fc.constantFrom(...SECTION_TITLES),
        (title) => {
          return componentContent.includes(title)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 1: Each section has a clear h2 title element', () => {
    const wrapper = mount(CVView, {
      global: {
        stubs: {
          'md-icon': mockMdIcon,
          'router-link': mockRouterLink
        }
      },
      attachTo: document.body
    })

    const sections = wrapper.findAll('.cv-section')
    const sectionTitles = wrapper.findAll('.cv-section-title')

    // Each section should have a title
    expect(sections.length).toBe(sectionTitles.length)
    
    // All section titles should be h2 elements
    sectionTitles.forEach(title => {
      expect(title.element.tagName.toLowerCase()).toBe('h2')
    })

    wrapper.unmount()
  })

  it('Property 1: CV page uses card styling consistent with main page', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const componentPath = path.resolve(__dirname, './CVView.vue')
    const componentContent = fs.readFileSync(componentPath, 'utf-8')

    // Check for card-related CSS variables
    expect(componentContent).toContain('var(--color-bg-card)')
    expect(componentContent).toContain('var(--color-border)')
    expect(componentContent).toContain('var(--radius-lg)')
  })

  it('Property 1: CV page uses two-column grid layout for large screens', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const componentPath = path.resolve(__dirname, './CVView.vue')
    const componentContent = fs.readFileSync(componentPath, 'utf-8')

    // Check for grid layout (CSS may be minified without spaces)
    expect(componentContent).toContain('cv-grid')
    expect(componentContent).toMatch(/grid-template-columns:\s*1fr\s+2fr/)
    expect(componentContent).toContain('cv-left-column')
    expect(componentContent).toContain('cv-right-column')
  })

  it('Property 1: CV page has responsive breakpoint for single-column layout', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const componentPath = path.resolve(__dirname, './CVView.vue')
    const componentContent = fs.readFileSync(componentPath, 'utf-8')

    // Check for responsive breakpoint at 1024px (CSS may be minified without spaces)
    expect(componentContent).toMatch(/@media\s*\(\s*max-width:\s*1023px\s*\)/)
    expect(componentContent).toMatch(/grid-template-columns:\s*1fr/)
  })

  it('Property 1: Left column uses sticky positioning for large screens', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const componentPath = path.resolve(__dirname, './CVView.vue')
    const componentContent = fs.readFileSync(componentPath, 'utf-8')

    // Check for sticky positioning on left column (CSS may be minified without spaces)
    expect(componentContent).toContain('.cv-left-column')
    expect(componentContent).toMatch(/position:\s*sticky/)
  })

  it('Property 1: CV page has correct content distribution in columns', () => {
    const wrapper = mount(CVView, {
      global: {
        stubs: {
          'md-icon': mockMdIcon,
          'router-link': mockRouterLink
        }
      },
      attachTo: document.body
    })

    // Left column should contain header and skills section
    const leftColumn = wrapper.find('.cv-left-column')
    expect(leftColumn.find('.cv-header').exists()).toBe(true)
    expect(leftColumn.find('#skills-heading').exists()).toBe(true)

    // Right column should contain experience, education, community, achievements
    const rightColumn = wrapper.find('.cv-right-column')
    expect(rightColumn.find('#experience-heading').exists()).toBe(true)
    expect(rightColumn.find('#education-heading').exists()).toBe(true)
    expect(rightColumn.find('#community-heading').exists()).toBe(true)
    expect(rightColumn.find('#achievements-heading').exists()).toBe(true)

    wrapper.unmount()
  })
})


/**
 * Property 2: CV 內容完整性
 * Feature: cv-redesign, Property 2
 * Validates: Requirements 2.3, 5.2, 5.3, 6.1
 * 
 * For any CV 頁面渲染，應展示所有必要的聯絡方式（Email、Blog）、
 * 所有技能標籤（Network、C++、Linux/Windows Server、Golang、Cybersecurity）、
 * 所有證照、以及所有社群經驗（包含活動名稱與角色）。
 */
describe('Property 2: CV 內容完整性', () => {
  // Required contact information
  const REQUIRED_CONTACTS = [
    { type: 'email', label: 'qian@qian30.net' },
    { type: 'blog', label: 'blog.qian30.net' }
  ]

  // Required skills
  const REQUIRED_SKILLS = [
    'Network(IT)',
    'C++',
    'Linux/Windows Server',
    'Golang',
    'Cybersecurity'
  ]

  // Required certifications
  const REQUIRED_CERTIFICATIONS = [
    'iPAS資訊安全工程師-中級能力鑑定',
    '網路架設丙級',
    '電腦硬體裝修丙級'
  ]

  // Required community experiences (name and role pairs)
  const REQUIRED_COMMUNITY = [
    { name: 'SITCON 學生計算機年會 2026', role: '總召' },
    { name: 'SITCON Camp 2025', role: '副召' },
    { name: 'SITCON 學生計算機年會 2025', role: '行政組副組長' },
    { name: '羅東高工資訊研究社', role: '副社長' }
  ]

  it('Property 2: For any required contact, it is displayed in the CV', () => {
    const wrapper = mount(CVView, {
      global: {
        stubs: {
          'md-icon': mockMdIcon,
          'router-link': mockRouterLink
        }
      },
      attachTo: document.body
    })

    const html = wrapper.html()

    fc.assert(
      fc.property(
        fc.constantFrom(...REQUIRED_CONTACTS),
        (contact) => {
          return html.includes(contact.label)
        }
      ),
      { numRuns: 100 }
    )

    wrapper.unmount()
  })

  it('Property 2: For any required skill, it is displayed as a skill tag', () => {
    const wrapper = mount(CVView, {
      global: {
        stubs: {
          'md-icon': mockMdIcon,
          'router-link': mockRouterLink
        }
      },
      attachTo: document.body
    })

    const skillTags = wrapper.findAll('.cv-skill-tag')
    const skillTexts = skillTags.map(tag => tag.text())

    fc.assert(
      fc.property(
        fc.constantFrom(...REQUIRED_SKILLS),
        (skill) => {
          return skillTexts.includes(skill)
        }
      ),
      { numRuns: 100 }
    )

    wrapper.unmount()
  })

  it('Property 2: For any required certification, it is displayed in the CV', () => {
    const wrapper = mount(CVView, {
      global: {
        stubs: {
          'md-icon': mockMdIcon,
          'router-link': mockRouterLink
        }
      },
      attachTo: document.body
    })

    const certList = wrapper.find('.cv-cert-list')
    const certItems = certList.findAll('li')
    const certTexts = certItems.map(item => item.text().trim())

    fc.assert(
      fc.property(
        fc.constantFrom(...REQUIRED_CERTIFICATIONS),
        (cert) => {
          return certTexts.some(text => text.includes(cert) || cert.includes(text))
        }
      ),
      { numRuns: 100 }
    )

    wrapper.unmount()
  })

  it('Property 2: For any required community experience, both name and role are displayed', () => {
    const wrapper = mount(CVView, {
      global: {
        stubs: {
          'md-icon': mockMdIcon,
          'router-link': mockRouterLink
        }
      },
      attachTo: document.body
    })

    const html = wrapper.html()

    fc.assert(
      fc.property(
        fc.constantFrom(...REQUIRED_COMMUNITY),
        (community) => {
          return html.includes(community.name) && html.includes(community.role)
        }
      ),
      { numRuns: 100 }
    )

    wrapper.unmount()
  })

  it('Property 2: All 5 required skills are displayed', () => {
    const wrapper = mount(CVView, {
      global: {
        stubs: {
          'md-icon': mockMdIcon,
          'router-link': mockRouterLink
        }
      },
      attachTo: document.body
    })

    const skillTags = wrapper.findAll('.cv-skill-tag')
    expect(skillTags.length).toBe(REQUIRED_SKILLS.length)

    wrapper.unmount()
  })

  it('Property 2: All 3 required certifications are displayed', () => {
    const wrapper = mount(CVView, {
      global: {
        stubs: {
          'md-icon': mockMdIcon,
          'router-link': mockRouterLink
        }
      },
      attachTo: document.body
    })

    const certList = wrapper.find('.cv-cert-list')
    const certItems = certList.findAll('li')
    expect(certItems.length).toBe(REQUIRED_CERTIFICATIONS.length)

    wrapper.unmount()
  })
})


/**
 * Property 3: 經歷資料正確性
 * Feature: cv-redesign, Property 3
 * Validates: Requirements 4.1, 4.3, 6.2
 * 
 * For any 經歷項目，應包含職位、公司、部門、時間資訊。
 * 經歷應按時間倒序排列（最新在前）。
 * 社群經驗中的領導角色（總召、副召、組長）應排在前面。
 */
describe('Property 3: 經歷資料正確性', () => {
  // Leadership roles that should appear first
  const LEADERSHIP_ROLES = ['總召', '副召', '組長', '副組長', '副社長']
  
  // Non-leadership roles
  const NON_LEADERSHIP_ROLES = ['志工', '學員', '助教']

  it('Property 3: For any experience item, it contains role, company, department, and period', () => {
    const wrapper = mount(CVView, {
      global: {
        stubs: {
          'md-icon': mockMdIcon,
          'router-link': mockRouterLink
        }
      },
      attachTo: document.body
    })

    // Find the experience section
    const experienceSection = wrapper.find('#experience-heading').element.closest('section')
    const experienceItems = experienceSection.querySelectorAll('.cv-list-item')

    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: experienceItems.length - 1 }),
        (index) => {
          const item = experienceItems[index]
          const hasTitle = item.querySelector('.cv-list-title') !== null
          const hasSubtitle = item.querySelector('.cv-list-subtitle') !== null
          const hasPeriod = item.querySelector('.cv-list-period') !== null
          
          // Title should contain role, subtitle should contain company and department
          const title = item.querySelector('.cv-list-title')?.textContent || ''
          const subtitle = item.querySelector('.cv-list-subtitle')?.textContent || ''
          const period = item.querySelector('.cv-list-period')?.textContent || ''
          
          return hasTitle && hasSubtitle && hasPeriod && 
                 title.length > 0 && subtitle.length > 0 && period.length > 0
        }
      ),
      { numRuns: 100 }
    )

    wrapper.unmount()
  })

  it('Property 3: Experience items are ordered by time (newest first)', () => {
    const wrapper = mount(CVView, {
      global: {
        stubs: {
          'md-icon': mockMdIcon,
          'router-link': mockRouterLink
        }
      },
      attachTo: document.body
    })

    // Find the experience section
    const experienceSection = wrapper.find('#experience-heading').element.closest('section')
    const periodElements = experienceSection.querySelectorAll('.cv-list-period')
    const periods = Array.from(periodElements).map(el => el.textContent.trim())

    // Extract years from periods (e.g., "2024/11 - NOW" -> 2024, "2023/7 - 2023/9" -> 2023)
    const extractYear = (period) => {
      const match = period.match(/(\d{4})/)
      return match ? parseInt(match[1]) : 0
    }

    // Check that years are in descending order (newest first)
    for (let i = 0; i < periods.length - 1; i++) {
      const currentYear = extractYear(periods[i])
      const nextYear = extractYear(periods[i + 1])
      expect(currentYear).toBeGreaterThanOrEqual(nextYear)
    }

    wrapper.unmount()
  })

  it('Property 3: Leadership roles appear before non-leadership roles in community section', () => {
    const wrapper = mount(CVView, {
      global: {
        stubs: {
          'md-icon': mockMdIcon,
          'router-link': mockRouterLink
        }
      },
      attachTo: document.body
    })

    // Find the community section
    const communitySection = wrapper.find('#community-heading').element.closest('section')
    const roleElements = communitySection.querySelectorAll('.cv-community-role')
    const roles = Array.from(roleElements).map(el => el.textContent.trim())

    // Find the index of the last leadership role
    let lastLeadershipIndex = -1
    roles.forEach((role, index) => {
      if (LEADERSHIP_ROLES.some(lr => role.includes(lr))) {
        lastLeadershipIndex = index
      }
    })

    // Find the index of the first non-leadership role
    let firstNonLeadershipIndex = roles.length
    roles.forEach((role, index) => {
      if (NON_LEADERSHIP_ROLES.some(nlr => role.includes(nlr))) {
        if (index < firstNonLeadershipIndex) {
          firstNonLeadershipIndex = index
        }
      }
    })

    // Leadership roles should appear before non-leadership roles
    // (last leadership index should be less than first non-leadership index)
    expect(lastLeadershipIndex).toBeLessThan(firstNonLeadershipIndex)

    wrapper.unmount()
  })

  it('Property 3: For any leadership role, it appears in the first half of community list', () => {
    const wrapper = mount(CVView, {
      global: {
        stubs: {
          'md-icon': mockMdIcon,
          'router-link': mockRouterLink
        }
      },
      attachTo: document.body
    })

    // Find the community section
    const communitySection = wrapper.find('#community-heading').element.closest('section')
    const roleElements = communitySection.querySelectorAll('.cv-community-role')
    const roles = Array.from(roleElements).map(el => el.textContent.trim())
    const midpoint = Math.ceil(roles.length / 2)

    fc.assert(
      fc.property(
        fc.constantFrom(...LEADERSHIP_ROLES),
        (leadershipRole) => {
          const index = roles.findIndex(role => role.includes(leadershipRole))
          // If the role exists, it should be in the first half
          return index === -1 || index < midpoint
        }
      ),
      { numRuns: 100 }
    )

    wrapper.unmount()
  })

  it('Property 3: Experience subtitle contains both company and department', () => {
    const wrapper = mount(CVView, {
      global: {
        stubs: {
          'md-icon': mockMdIcon,
          'router-link': mockRouterLink
        }
      },
      attachTo: document.body
    })

    // Find the experience section
    const experienceSection = wrapper.find('#experience-heading').element.closest('section')
    const subtitleElements = experienceSection.querySelectorAll('.cv-list-subtitle')
    
    subtitleElements.forEach(subtitle => {
      const text = subtitle.textContent.trim()
      // Subtitle should contain a separator (company - department format)
      expect(text).toContain(' - ')
    })

    wrapper.unmount()
  })
})


/**
 * Property 4: 無障礙標準符合性
 * Feature: cv-redesign, Property 4
 * Validates: Requirements 8.2, 9.1, 9.2
 * 
 * For any CV 頁面，所有互動元素（按鈕、連結）應至少有 44px 的點擊區域。
 * 頁面應支援鍵盤導航（Tab 順序正確）。
 * 頁面應使用語義化 HTML 標籤（header、main、section、h1-h2）。
 */
describe('Property 4: 無障礙標準符合性', () => {
  // Semantic HTML tags that should be used
  const SEMANTIC_TAGS = ['main', 'header', 'section', 'nav', 'h1', 'h2']
  
  // Interactive elements that need minimum touch target
  const INTERACTIVE_SELECTORS = ['.cv-action-btn', '.cv-contact-link']

  it('Property 4: CV page uses semantic main element', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const componentPath = path.resolve(__dirname, './CVView.vue')
    const componentContent = fs.readFileSync(componentPath, 'utf-8')

    expect(componentContent).toContain('<main')
    expect(componentContent).toContain('class="cv-page"')
  })

  it('Property 4: CV page uses semantic header element', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const componentPath = path.resolve(__dirname, './CVView.vue')
    const componentContent = fs.readFileSync(componentPath, 'utf-8')

    expect(componentContent).toContain('<header')
    expect(componentContent).toContain('class="cv-header')
  })

  it('Property 4: For any semantic tag, it is used in the CV page', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const componentPath = path.resolve(__dirname, './CVView.vue')
    const componentContent = fs.readFileSync(componentPath, 'utf-8')

    fc.assert(
      fc.property(
        fc.constantFrom(...SEMANTIC_TAGS),
        (tag) => {
          return componentContent.includes(`<${tag}`)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 4: All sections have aria-labelledby attribute', () => {
    const wrapper = mount(CVView, {
      global: {
        stubs: {
          'md-icon': mockMdIcon,
          'router-link': mockRouterLink
        }
      },
      attachTo: document.body
    })

    const sections = wrapper.findAll('.cv-section')
    
    sections.forEach(section => {
      expect(section.attributes('aria-labelledby')).toBeTruthy()
    })

    wrapper.unmount()
  })

  it('Property 4: CV header has aria-labelledby attribute', () => {
    const wrapper = mount(CVView, {
      global: {
        stubs: {
          'md-icon': mockMdIcon,
          'router-link': mockRouterLink
        }
      },
      attachTo: document.body
    })

    const header = wrapper.find('.cv-header')
    expect(header.attributes('aria-labelledby')).toBeTruthy()

    wrapper.unmount()
  })

  it('Property 4: Action buttons have minimum 44px touch target', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const componentPath = path.resolve(__dirname, './CVView.vue')
    const componentContent = fs.readFileSync(componentPath, 'utf-8')

    // Check that action buttons have at least 44px width and height (CSS may be minified without spaces)
    // The CSS shows width: 48px and height: 48px for .cv-action-btn
    expect(componentContent).toMatch(/width:\s*48px/)
    expect(componentContent).toMatch(/height:\s*48px/)
  })

  it('Property 4: Contact links have minimum touch target via CSS variable', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const componentPath = path.resolve(__dirname, './CVView.vue')
    const componentContent = fs.readFileSync(componentPath, 'utf-8')

    // Check that contact links use min-touch-target CSS variable (CSS may be minified without spaces)
    expect(componentContent).toMatch(/min-height:\s*var\(--min-touch-target\)/)
  })

  it('Property 4: For any interactive element, it has proper accessibility attributes', () => {
    const wrapper = mount(CVView, {
      global: {
        stubs: {
          'md-icon': mockMdIcon,
          'router-link': mockRouterLink
        }
      },
      attachTo: document.body
    })

    // Check action buttons
    const actionBtns = wrapper.findAll('.cv-action-btn')
    actionBtns.forEach(btn => {
      // Should have aria-label or title
      const hasAriaLabel = btn.attributes('aria-label') !== undefined
      const hasTitle = btn.attributes('title') !== undefined
      expect(hasAriaLabel || hasTitle).toBe(true)
    })

    // Check contact links
    const contactLinks = wrapper.findAll('.cv-contact-link')
    contactLinks.forEach(link => {
      expect(link.attributes('aria-label')).toBeTruthy()
    })

    wrapper.unmount()
  })

  it('Property 4: Navigation has proper aria-label', () => {
    const wrapper = mount(CVView, {
      global: {
        stubs: {
          'md-icon': mockMdIcon,
          'router-link': mockRouterLink
        }
      },
      attachTo: document.body
    })

    const nav = wrapper.find('.cv-actions')
    expect(nav.attributes('aria-label')).toBeTruthy()

    const contactNav = wrapper.find('.cv-contacts')
    expect(contactNav.attributes('aria-label')).toBeTruthy()

    wrapper.unmount()
  })

  it('Property 4: Skip link exists for keyboard navigation', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const componentPath = path.resolve(__dirname, './CVView.vue')
    const componentContent = fs.readFileSync(componentPath, 'utf-8')

    expect(componentContent).toContain('skip-link')
    expect(componentContent).toContain('跳至主要內容')
  })

  it('Property 4: Decorative icons have aria-hidden attribute', () => {
    const wrapper = mount(CVView, {
      global: {
        stubs: {
          'md-icon': mockMdIcon,
          'router-link': mockRouterLink
        }
      },
      attachTo: document.body
    })

    // Check that md-icon elements have aria-hidden
    const html = wrapper.html()
    // The template shows aria-hidden="true" on md-icon elements
    expect(html).toContain('aria-hidden')

    wrapper.unmount()
  })

  it('Property 4: CV page supports prefers-reduced-motion', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const componentPath = path.resolve(__dirname, './CVView.vue')
    const componentContent = fs.readFileSync(componentPath, 'utf-8')

    // Check that prefers-reduced-motion media query is used
    expect(componentContent).toContain('prefers-reduced-motion')
    expect(componentContent).toContain('reduce')
  })

  it('Property 4: Focus-visible styles are defined for interactive elements', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const componentPath = path.resolve(__dirname, './CVView.vue')
    const componentContent = fs.readFileSync(componentPath, 'utf-8')

    // Check that focus-visible styles are defined
    expect(componentContent).toContain(':focus-visible')
    expect(componentContent).toContain('outline')
  })
})
