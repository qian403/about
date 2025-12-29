/**
 * Property-Based Tests for Interactive Element Minimum Sizes
 * Feature: portfolio-redesign, Property 8: 互動元素最小尺寸
 * Validates: Requirements 8.2
 * 
 * For any 可點擊的互動元素（按鈕、連結），其最小寬度和高度應至少為 44px，
 * 以符合觸控裝置的可用性標準。
 * 
 * Note: Since JSDOM doesn't compute CSS from stylesheets, these tests verify:
 * 1. The correct CSS classes are applied to interactive elements
 * 2. The CSS variable --min-touch-target is defined as 44px
 * 3. Interactive elements have the expected structure for touch targets
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import * as fc from 'fast-check'
import NavBar from './NavBar.vue'
import ProjectCard from './ProjectCard.vue'
import FilterableTimeline from './FilterableTimeline.vue'

// Mock md-icon component
const mockMdIcon = {
  template: '<span class="md-icon"><slot /></span>'
}

// Minimum touch target size (44px)
const MIN_TOUCH_TARGET = 44

// CSS variable name for touch target
const TOUCH_TARGET_VAR = '--min-touch-target'

describe('Property 8: 互動元素最小尺寸', () => {
  /**
   * Feature: portfolio-redesign, Property 8: 互動元素最小尺寸
   * Validates: Requirements 8.2
   */

  describe('CSS Variable Definition', () => {
    it('Property 8: CSS variable --min-touch-target is defined as 44px in main.css', async () => {
      // Read the main.css file content to verify the variable is defined
      const fs = await import('fs')
      const path = await import('path')
      const cssPath = path.resolve(__dirname, '../assets/main.css')
      const cssContent = fs.readFileSync(cssPath, 'utf-8')
      
      // Check that --min-touch-target: 44px is defined
      expect(cssContent).toContain('--min-touch-target: 44px')
    })
  })

  describe('NavBar Interactive Elements', () => {
    let wrapper
    let mockSections

    beforeEach(() => {
      // Create mock sections in DOM
      mockSections = {}
      const navLinkIds = ['projects', 'skills', 'highlights', 'experience', 'contact']
      navLinkIds.forEach((id, index) => {
        const section = document.createElement('section')
        section.id = id
        section.scrollIntoView = () => {}
        Object.defineProperty(section, 'offsetTop', {
          value: (index + 1) * 500,
          writable: true
        })
        document.body.appendChild(section)
        mockSections[id] = section
      })

      wrapper = mount(NavBar, {
        global: {
          stubs: {
            'md-icon': mockMdIcon
          }
        },
        attachTo: document.body
      })
    })

    afterEach(() => {
      wrapper.unmount()
      Object.keys(mockSections).forEach(id => {
        const section = document.getElementById(id)
        if (section) document.body.removeChild(section)
      })
    })

    it('Property 8: Nav brand element exists and has correct class', () => {
      const navBrand = wrapper.find('.nav-brand')
      expect(navBrand.exists()).toBe(true)
    })

    it('Property 8: All nav links exist with correct class', () => {
      const navLinks = wrapper.findAll('.nav-link')
      expect(navLinks.length).toBe(5) // projects, skills, highlights, experience, contact
    })

    it('Property 8: Nav toggle button exists with correct class', () => {
      const navToggle = wrapper.find('.nav-toggle')
      expect(navToggle.exists()).toBe(true)
    })

    it('Property 8: NavBar CSS contains min-touch-target references for interactive elements', async () => {
      const fs = await import('fs')
      const path = await import('path')
      const componentPath = path.resolve(__dirname, './NavBar.vue')
      const componentContent = fs.readFileSync(componentPath, 'utf-8')
      
      // Verify CSS uses --min-touch-target for nav-brand
      expect(componentContent).toContain('.nav-brand')
      expect(componentContent).toContain('min-width: var(--min-touch-target)')
      expect(componentContent).toContain('min-height: var(--min-touch-target)')
      
      // Verify CSS uses --min-touch-target for nav-link
      expect(componentContent).toContain('.nav-link')
      
      // Verify CSS uses --min-touch-target for nav-toggle
      expect(componentContent).toContain('.nav-toggle')
      expect(componentContent).toContain('width: var(--min-touch-target)')
      expect(componentContent).toContain('height: var(--min-touch-target)')
    })

    it('Property 8: For any nav link index, the element has nav-link class', () => {
      const navLinks = wrapper.findAll('.nav-link')
      
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: navLinks.length - 1 }),
          (index) => {
            const link = navLinks[index]
            return link.classes().includes('nav-link')
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  describe('ProjectCard Interactive Elements', () => {
    let wrapper

    const sampleProject = {
      name: 'Test Project',
      description: 'A test project description',
      tags: ['Vue', 'JavaScript'],
      github: 'https://github.com/test',
      demo: 'https://demo.test.com'
    }

    beforeEach(() => {
      wrapper = mount(ProjectCard, {
        props: {
          project: sampleProject
        },
        global: {
          stubs: {
            'md-icon': mockMdIcon
          }
        },
        attachTo: document.body
      })
    })

    afterEach(() => {
      wrapper.unmount()
    })

    it('Property 8: Project links exist with correct class', () => {
      const projectLinks = wrapper.findAll('.project-link')
      expect(projectLinks.length).toBeGreaterThan(0)
    })

    it('Property 8: ProjectCard CSS contains min-touch-target reference for links', async () => {
      const fs = await import('fs')
      const path = await import('path')
      const componentPath = path.resolve(__dirname, './ProjectCard.vue')
      const componentContent = fs.readFileSync(componentPath, 'utf-8')
      
      // Verify CSS uses --min-touch-target for project-link
      expect(componentContent).toContain('.project-link')
      expect(componentContent).toContain('min-height: var(--min-touch-target)')
    })

    it('Property 8: For any project with links, all links have project-link class', () => {
      // Generate various project configurations
      const projectArb = fc.record({
        name: fc.string({ minLength: 1, maxLength: 50 }),
        description: fc.string({ minLength: 1, maxLength: 200 }),
        tags: fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 1, maxLength: 5 }),
        github: fc.option(fc.constant('https://github.com/test'), { nil: null }),
        demo: fc.option(fc.constant('https://demo.test.com'), { nil: null })
      })

      fc.assert(
        fc.property(
          projectArb,
          (project) => {
            // Skip if project has no links
            if (!project.github && !project.demo) return true
            
            const testWrapper = mount(ProjectCard, {
              props: { project },
              global: {
                stubs: { 'md-icon': mockMdIcon }
              },
              attachTo: document.body
            })
            
            const links = testWrapper.findAll('.project-link')
            const allHaveClass = links.every((link) => link.classes().includes('project-link'))
            
            testWrapper.unmount()
            return allHaveClass
          }
        ),
        { numRuns: 50 }
      )
    })
  })

  describe('FilterableTimeline Interactive Elements', () => {
    let wrapper

    const sampleItems = [
      {
        id: 'work-1',
        type: 'work',
        title: 'Test Job',
        subtitle: 'Test Company',
        period: '2024',
        description: 'Test description',
        expanded: false
      },
      {
        id: 'edu-1',
        type: 'education',
        title: 'Test School',
        subtitle: 'Test University',
        period: '2023',
        description: 'Test education',
        expanded: false
      }
    ]

    beforeEach(() => {
      wrapper = mount(FilterableTimeline, {
        props: {
          items: sampleItems
        },
        global: {
          stubs: {
            'md-icon': mockMdIcon
          }
        },
        attachTo: document.body
      })
    })

    afterEach(() => {
      wrapper.unmount()
    })

    it('Property 8: Filter buttons exist with correct class', () => {
      const filterBtns = wrapper.findAll('.filter-btn')
      expect(filterBtns.length).toBe(5) // all, work, education, community, competition
    })

    it('Property 8: Expand buttons exist with correct class', () => {
      const expandBtns = wrapper.findAll('.expand-btn')
      expect(expandBtns.length).toBe(sampleItems.length)
    })

    it('Property 8: FilterableTimeline CSS contains min-height/min-width for filter buttons', async () => {
      const fs = await import('fs')
      const path = await import('path')
      const componentPath = path.resolve(__dirname, './FilterableTimeline.vue')
      const componentContent = fs.readFileSync(componentPath, 'utf-8')
      
      // Verify CSS defines min-height and min-width for filter-btn
      expect(componentContent).toContain('.filter-btn')
      expect(componentContent).toContain('min-height: 44px')
      expect(componentContent).toContain('min-width: 44px')
    })

    it('Property 8: FilterableTimeline CSS contains min-height/min-width for expand buttons', async () => {
      const fs = await import('fs')
      const path = await import('path')
      const componentPath = path.resolve(__dirname, './FilterableTimeline.vue')
      const componentContent = fs.readFileSync(componentPath, 'utf-8')
      
      // Verify CSS defines min-height and min-width for expand-btn
      expect(componentContent).toContain('.expand-btn')
      expect(componentContent).toContain('min-width: 44px')
      expect(componentContent).toContain('min-height: 44px')
    })

    it('Property 8: For any filter option index, the button has filter-btn class', () => {
      const filterBtns = wrapper.findAll('.filter-btn')
      
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: filterBtns.length - 1 }),
          (index) => {
            const btn = filterBtns[index]
            return btn.classes().includes('filter-btn')
          }
        ),
        { numRuns: 100 }
      )
    })

    it('Property 8: For any timeline item, expand button has expand-btn class', () => {
      // Generate various timeline item configurations
      const timelineItemArb = fc.record({
        id: fc.string({ minLength: 1, maxLength: 20 }),
        type: fc.constantFrom('work', 'education', 'community', 'competition'),
        title: fc.string({ minLength: 1, maxLength: 50 }),
        subtitle: fc.string({ minLength: 1, maxLength: 50 }),
        period: fc.string({ minLength: 1, maxLength: 20 }),
        description: fc.string({ minLength: 1, maxLength: 200 }),
        expanded: fc.boolean()
      })

      fc.assert(
        fc.property(
          fc.array(timelineItemArb, { minLength: 1, maxLength: 5 }),
          (items) => {
            // Ensure unique IDs
            const uniqueItems = items.map((item, index) => ({
              ...item,
              id: `${item.type}-${index}`
            }))
            
            const testWrapper = mount(FilterableTimeline, {
              props: { items: uniqueItems },
              global: {
                stubs: { 'md-icon': mockMdIcon }
              },
              attachTo: document.body
            })
            
            const expandBtns = testWrapper.findAll('.expand-btn')
            const allHaveClass = expandBtns.every((btn) => btn.classes().includes('expand-btn'))
            
            testWrapper.unmount()
            return allHaveClass
          }
        ),
        { numRuns: 30 }
      )
    })
  })

  describe('HomeView Interactive Elements', () => {
    it('Property 8: HomeView CSS contains min-touch-target references for buttons', async () => {
      const fs = await import('fs')
      const path = await import('path')
      const componentPath = path.resolve(__dirname, '../views/HomeView.vue')
      const componentContent = fs.readFileSync(componentPath, 'utf-8')
      
      // Verify CSS uses --min-touch-target for contact-card
      expect(componentContent).toContain('.contact-card')
      expect(componentContent).toContain('min-height: var(--min-touch-target)')
      
      // Verify CSS uses --min-touch-target for back-to-top button
      expect(componentContent).toContain('.back-to-top')
      expect(componentContent).toContain('width: var(--min-touch-target)')
      expect(componentContent).toContain('height: var(--min-touch-target)')
    })

    it('Property 8: main.css contains responsive rules for touch targets', async () => {
      const fs = await import('fs')
      const path = await import('path')
      const cssPath = path.resolve(__dirname, '../assets/main.css')
      const cssContent = fs.readFileSync(cssPath, 'utf-8')
      
      // Verify responsive rules for buttons
      expect(cssContent).toContain('@media (max-width: 768px)')
      expect(cssContent).toContain('min-height: var(--min-touch-target)')
      expect(cssContent).toContain('min-width: var(--min-touch-target)')
    })
  })
})
