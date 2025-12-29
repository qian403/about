/**
 * Property-Based Tests for NavBar
 * Feature: portfolio-redesign, Property 7: 導航功能正確性
 * Validates: Requirements 6.2, 6.3
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import * as fc from 'fast-check'
import NavBar from './NavBar.vue'

// Mock Material Design components
const mockMdIcon = {
  template: '<span class="md-icon"><slot /></span>'
}

// Mock window.scrollTo
const mockScrollTo = vi.fn()
const mockScrollIntoView = vi.fn()

// Navigation link IDs
const navLinkIds = ['projects', 'skills', 'highlights', 'experience', 'contact']

// Generate valid nav link ID
const navLinkIdArb = fc.constantFrom(...navLinkIds)

describe('NavBar - Property 7: 導航功能正確性', () => {
  /**
   * Feature: portfolio-redesign, Property 7: 導航功能正確性
   * Validates: Requirements 6.2, 6.3
   * 
   * For any 導航項目，點擊後應觸發滾動到對應的頁面區塊，且該導航項目應被標記為 active 狀態。
   */

  let wrapper
  let originalScrollTo
  let mockSections

  beforeEach(() => {
    // Save original window.scrollTo
    originalScrollTo = window.scrollTo
    window.scrollTo = mockScrollTo
    
    // Create mock sections in the DOM
    mockSections = {}
    navLinkIds.forEach((id, index) => {
      const section = document.createElement('section')
      section.id = id
      section.scrollIntoView = mockScrollIntoView
      // Set offsetTop for scroll detection
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
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
    window.scrollTo = originalScrollTo
    mockScrollTo.mockClear()
    mockScrollIntoView.mockClear()
    
    // Clean up mock sections
    navLinkIds.forEach(id => {
      const section = document.getElementById(id)
      if (section) {
        document.body.removeChild(section)
      }
    })
  })

  it('Property 7: All navigation links exist', () => {
    const navLinks = wrapper.findAll('.nav-link')
    expect(navLinks.length).toBe(navLinkIds.length)
  })

  it('Property 7: Clicking nav link updates currentSection to that section', () => {
    fc.assert(
      fc.property(
        navLinkIdArb,
        (sectionId) => {
          // Call handleNavClick
          wrapper.vm.handleNavClick(sectionId)
          
          // currentSection should be updated
          return wrapper.vm.currentSection === sectionId
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 7: Clicking nav link triggers scrollIntoView on the section', () => {
    fc.assert(
      fc.property(
        navLinkIdArb,
        (sectionId) => {
          mockScrollIntoView.mockClear()
          
          // Call handleNavClick
          wrapper.vm.handleNavClick(sectionId)
          
          // scrollIntoView should have been called
          return mockScrollIntoView.mock.calls.length > 0
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 7: Active nav link has active class', async () => {
    for (const sectionId of navLinkIds) {
      wrapper.vm.handleNavClick(sectionId)
      await wrapper.vm.$nextTick()
      
      const activeLink = wrapper.find('.nav-link.active')
      expect(activeLink.exists()).toBe(true)
      expect(activeLink.attributes('href')).toBe(`#${sectionId}`)
    }
  })

  it('Property 7: Only one nav link is active at a time', async () => {
    for (const sectionId of navLinkIds) {
      wrapper.vm.handleNavClick(sectionId)
      await wrapper.vm.$nextTick()
      
      const activeLinks = wrapper.findAll('.nav-link.active')
      expect(activeLinks.length).toBe(1)
    }
  })

  it('Property 7: Nav links have correct href attributes', () => {
    const navLinks = wrapper.findAll('.nav-link')
    
    navLinks.forEach((link, index) => {
      expect(link.attributes('href')).toBe(`#${navLinkIds[index]}`)
    })
  })

  it('Property 7: scrollToTop triggers window.scrollTo with top: 0', () => {
    mockScrollTo.mockClear()
    
    wrapper.vm.scrollToTop()
    
    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('Property 7: Nav brand click triggers scrollToTop', async () => {
    mockScrollTo.mockClear()
    
    const navBrand = wrapper.find('.nav-brand')
    await navBrand.trigger('click')
    
    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('Property 7: Mobile menu toggle works correctly', async () => {
    // Initially menu should be closed
    expect(wrapper.vm.isMenuOpen).toBe(false)
    
    // Toggle menu
    const toggleBtn = wrapper.find('.nav-toggle')
    await toggleBtn.trigger('click')
    
    expect(wrapper.vm.isMenuOpen).toBe(true)
    
    // Toggle again
    await toggleBtn.trigger('click')
    
    expect(wrapper.vm.isMenuOpen).toBe(false)
  })

  it('Property 7: Clicking nav link closes mobile menu', () => {
    fc.assert(
      fc.property(
        navLinkIdArb,
        (sectionId) => {
          // Open menu first
          wrapper.vm.isMenuOpen = true
          
          // Click nav link
          wrapper.vm.handleNavClick(sectionId)
          
          // Menu should be closed
          return wrapper.vm.isMenuOpen === false
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 7: Nav toggle button has correct aria-expanded attribute', async () => {
    const toggleBtn = wrapper.find('.nav-toggle')
    
    // Initially false
    expect(toggleBtn.attributes('aria-expanded')).toBe('false')
    
    // After toggle
    await toggleBtn.trigger('click')
    expect(toggleBtn.attributes('aria-expanded')).toBe('true')
    
    // After second toggle
    await toggleBtn.trigger('click')
    expect(toggleBtn.attributes('aria-expanded')).toBe('false')
  })

  it('Property 7: Nav toggle button has aria-label for accessibility', () => {
    const toggleBtn = wrapper.find('.nav-toggle')
    expect(toggleBtn.attributes('aria-label')).toBe('Toggle navigation menu')
  })
})

describe('NavBar - Property 7: 導航功能正確性 (Generated Data)', () => {
  /**
   * Property-based test with generated navigation sequences
   * Validates: Requirements 6.2, 6.3
   */

  let wrapper
  let mockSections

  beforeEach(() => {
    window.scrollTo = vi.fn()
    
    // Create mock sections
    mockSections = {}
    navLinkIds.forEach((id, index) => {
      const section = document.createElement('section')
      section.id = id
      section.scrollIntoView = vi.fn()
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
          'md-icon': { template: '<span class="md-icon"><slot /></span>' }
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
    navLinkIds.forEach(id => {
      const section = document.getElementById(id)
      if (section) document.body.removeChild(section)
    })
  })

  it('Property 7: For any sequence of nav clicks, currentSection always matches last clicked', () => {
    fc.assert(
      fc.property(
        fc.array(navLinkIdArb, { minLength: 1, maxLength: 10 }),
        (clickSequence) => {
          // Click through the sequence
          clickSequence.forEach(sectionId => {
            wrapper.vm.handleNavClick(sectionId)
          })
          
          // currentSection should match the last clicked
          const lastClicked = clickSequence[clickSequence.length - 1]
          return wrapper.vm.currentSection === lastClicked
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 7: For any nav link, clicking it always triggers scroll', () => {
    fc.assert(
      fc.property(
        navLinkIdArb,
        (sectionId) => {
          const section = mockSections[sectionId]
          section.scrollIntoView.mockClear()
          
          wrapper.vm.handleNavClick(sectionId)
          
          return section.scrollIntoView.mock.calls.length === 1
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 7: scrollIntoView is called with smooth behavior', () => {
    fc.assert(
      fc.property(
        navLinkIdArb,
        (sectionId) => {
          const section = mockSections[sectionId]
          section.scrollIntoView.mockClear()
          
          wrapper.vm.handleNavClick(sectionId)
          
          const calls = section.scrollIntoView.mock.calls
          return calls.length > 0 && calls[0][0]?.behavior === 'smooth'
        }
      ),
      { numRuns: 100 }
    )
  })
})
