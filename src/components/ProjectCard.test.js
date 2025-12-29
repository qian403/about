/**
 * Property-Based Tests for ProjectCard
 * Feature: portfolio-redesign
 */
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import * as fc from 'fast-check'
import ProjectCard from './ProjectCard.vue'

// Mock md-icon component
const mockMdIcon = {
  template: '<span class="md-icon"><slot /></span>'
}

// Arbitrary for generating valid project data with realistic values
const projectArbitrary = fc.record({
  name: fc.stringMatching(/^[A-Za-z][A-Za-z0-9 ]{0,30}$/),
  description: fc.stringMatching(/^[A-Za-z][A-Za-z0-9 ,.!?]{0,100}$/),
  tags: fc.array(
    fc.stringMatching(/^[A-Za-z][A-Za-z0-9.]{0,15}$/),
    { minLength: 1, maxLength: 5 }
  ),
  github: fc.option(fc.constant('https://github.com/test/repo'), { nil: undefined }),
  demo: fc.option(fc.constant('https://example.com/demo'), { nil: undefined }),
  image: fc.option(fc.constant('https://example.com/image.png'), { nil: undefined })
})

describe('ProjectCard - Project Information Completeness Property Tests', () => {
  /**
   * Feature: portfolio-redesign, Property 2: 專案資訊完整性
   * Validates: Requirements 2.2
   * 
   * For any 專案資料，渲染後的專案卡片應包含：專案名稱、描述、至少一個技術標籤。若有 GitHub 連結，應顯示連結。
   */

  it('Property 2: Project card displays project name', () => {
    fc.assert(
      fc.property(projectArbitrary, (project) => {
        const wrapper = mount(ProjectCard, {
          props: { project },
          global: {
            stubs: { 'md-icon': mockMdIcon }
          }
        })
        
        const nameElement = wrapper.find('.project-name')
        const hasName = nameElement.exists() && nameElement.text().trim() === project.name.trim()
        
        wrapper.unmount()
        return hasName
      }),
      { numRuns: 50 }
    )
  })

  it('Property 2: Project card displays project description', () => {
    fc.assert(
      fc.property(projectArbitrary, (project) => {
        const wrapper = mount(ProjectCard, {
          props: { project },
          global: {
            stubs: { 'md-icon': mockMdIcon }
          }
        })
        
        const descElement = wrapper.find('.project-description')
        const hasDescription = descElement.exists() && descElement.text().trim() === project.description.trim()
        
        wrapper.unmount()
        return hasDescription
      }),
      { numRuns: 50 }
    )
  })

  it('Property 2: Project card displays correct number of tags', () => {
    fc.assert(
      fc.property(projectArbitrary, (project) => {
        const wrapper = mount(ProjectCard, {
          props: { project },
          global: {
            stubs: { 'md-icon': mockMdIcon }
          }
        })
        
        const tags = wrapper.findAll('.tag')
        const hasCorrectTagCount = tags.length === project.tags.length
        
        wrapper.unmount()
        return hasCorrectTagCount
      }),
      { numRuns: 50 }
    )
  })

  it('Property 2: Project card shows GitHub link when provided', () => {
    fc.assert(
      fc.property(
        projectArbitrary.filter(p => p.github !== undefined),
        (project) => {
          const wrapper = mount(ProjectCard, {
            props: { project },
            global: {
              stubs: { 'md-icon': mockMdIcon }
            }
          })
          
          const links = wrapper.findAll('.project-link')
          const hasGithubLink = links.some(link => 
            link.attributes('href') === project.github && 
            link.text().includes('GitHub')
          )
          
          wrapper.unmount()
          return hasGithubLink
        }
      ),
      { numRuns: 30 }
    )
  })

  it('Property 2: Project card shows Demo link when provided', () => {
    fc.assert(
      fc.property(
        projectArbitrary.filter(p => p.demo !== undefined),
        (project) => {
          const wrapper = mount(ProjectCard, {
            props: { project },
            global: {
              stubs: { 'md-icon': mockMdIcon }
            }
          })
          
          const links = wrapper.findAll('.project-link')
          const hasDemoLink = links.some(link => 
            link.attributes('href') === project.demo && 
            link.text().includes('Demo')
          )
          
          wrapper.unmount()
          return hasDemoLink
        }
      ),
      { numRuns: 30 }
    )
  })

  it('Property 2: Project card hides links section when no links provided', () => {
    fc.assert(
      fc.property(
        projectArbitrary.map(p => ({ ...p, github: undefined, demo: undefined })),
        (project) => {
          const wrapper = mount(ProjectCard, {
            props: { project },
            global: {
              stubs: { 'md-icon': mockMdIcon }
            }
          })
          
          const linksSection = wrapper.find('.project-links')
          const noLinksShown = !linksSection.exists()
          
          wrapper.unmount()
          return noLinksShown
        }
      ),
      { numRuns: 30 }
    )
  })

  it('Property 2: Project card has accessible aria-labelledby', () => {
    fc.assert(
      fc.property(projectArbitrary, (project) => {
        const wrapper = mount(ProjectCard, {
          props: { project },
          global: {
            stubs: { 'md-icon': mockMdIcon }
          }
        })
        
        const card = wrapper.find('.project-card')
        const ariaLabelledBy = card.attributes('aria-labelledby')
        const hasAccessibleLabel = ariaLabelledBy !== undefined && ariaLabelledBy.length > 0
        
        wrapper.unmount()
        return hasAccessibleLabel
      }),
      { numRuns: 50 }
    )
  })

  it('Property 2: Project tags have list role for accessibility', () => {
    fc.assert(
      fc.property(projectArbitrary, (project) => {
        const wrapper = mount(ProjectCard, {
          props: { project },
          global: {
            stubs: { 'md-icon': mockMdIcon }
          }
        })
        
        const tagsContainer = wrapper.find('.project-tags')
        const hasListRole = tagsContainer.attributes('role') === 'list'
        
        const tags = wrapper.findAll('.tag')
        const allTagsHaveListItemRole = tags.every(tag => tag.attributes('role') === 'listitem')
        
        wrapper.unmount()
        return hasListRole && allTagsHaveListItemRole
      }),
      { numRuns: 50 }
    )
  })

  it('Property 2: External links have proper security attributes', () => {
    fc.assert(
      fc.property(
        projectArbitrary.filter(p => p.github !== undefined || p.demo !== undefined),
        (project) => {
          const wrapper = mount(ProjectCard, {
            props: { project },
            global: {
              stubs: { 'md-icon': mockMdIcon }
            }
          })
          
          const links = wrapper.findAll('.project-link')
          const allLinksSecure = links.every(link => {
            const target = link.attributes('target')
            const rel = link.attributes('rel')
            return target === '_blank' && rel && rel.includes('noopener')
          })
          
          wrapper.unmount()
          return allLinksSecure
        }
      ),
      { numRuns: 30 }
    )
  })
})
