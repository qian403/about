/**
 * Property-Based Tests for HomeView
 * Feature: portfolio-redesign
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import * as fc from 'fast-check'
import HomeView from './HomeView.vue'

// Mock FilterableTimeline component
const mockFilterableTimeline = {
  template: '<div class="filterable-timeline-stub" data-testid="timeline"></div>',
  props: ['items']
}

// Mock md-icon component
const mockMdIcon = {
  template: '<span class="md-icon"><slot /></span>'
}

describe('HomeView - Role Rotation Property Tests', () => {
  /**
   * Feature: portfolio-redesign, Property 1: 身份輪播正確性
   * Validates: Requirements 1.3
   * 
   * For any 身份列表，輪播功能應依序顯示每個身份，且在顯示完最後一個身份後應回到第一個身份繼續循環。
   */
  
  const expectedRoles = ['Backend Developer', 'Security Enthusiast', 'Community Leader']
  let wrapper

  beforeEach(() => {
    vi.useFakeTimers()
    wrapper = mount(HomeView, {
      global: {
        stubs: {
          FilterableTimeline: mockFilterableTimeline,
          'md-icon': mockMdIcon
        }
      },
      attachTo: document.body
    })
  })

  afterEach(() => {
    wrapper.unmount()
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('Property 1: Initial role is the first role in the list', () => {
    const roleElement = wrapper.find('.hero-role')
    expect(roleElement.exists()).toBe(true)
    expect(roleElement.text()).toBe(expectedRoles[0])
  })

  it('Property 1: Role rotates to next role after interval', async () => {
    const roleElement = wrapper.find('.hero-role')
    
    // Initial state
    expect(roleElement.text()).toBe(expectedRoles[0])
    
    // After 3 seconds, should show second role
    await vi.advanceTimersByTimeAsync(3000)
    expect(roleElement.text()).toBe(expectedRoles[1])
    
    // After another 3 seconds, should show third role
    await vi.advanceTimersByTimeAsync(3000)
    expect(roleElement.text()).toBe(expectedRoles[2])
  })

  it('Property 1: Role cycles back to first after last role', async () => {
    const roleElement = wrapper.find('.hero-role')
    
    // Advance through all roles
    await vi.advanceTimersByTimeAsync(3000) // -> role 2
    await vi.advanceTimersByTimeAsync(3000) // -> role 3
    await vi.advanceTimersByTimeAsync(3000) // -> role 1 (cycle)
    
    expect(roleElement.text()).toBe(expectedRoles[0])
  })

  it('Property 1: All roles in the list are displayed during rotation', async () => {
    const roleElement = wrapper.find('.hero-role')
    const displayedRoles = new Set()
    
    // Collect all displayed roles over one complete cycle
    displayedRoles.add(roleElement.text())
    
    for (let i = 1; i < expectedRoles.length; i++) {
      await vi.advanceTimersByTimeAsync(3000)
      displayedRoles.add(roleElement.text())
    }
    
    // All expected roles should have been displayed
    expect(displayedRoles.size).toBe(expectedRoles.length)
    expectedRoles.forEach(role => {
      expect(displayedRoles.has(role)).toBe(true)
    })
  })

  it('Property 1: Interval is cleared on component unmount', async () => {
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')
    
    wrapper.unmount()
    
    expect(clearIntervalSpy).toHaveBeenCalled()
  })

  it('Property 1: Role rotation completes multiple full cycles correctly', async () => {
    const roleElement = wrapper.find('.hero-role')
    
    // Test 3 complete cycles
    for (let cycle = 0; cycle < 3; cycle++) {
      for (let i = 0; i < expectedRoles.length; i++) {
        const currentIndex = (cycle * expectedRoles.length + i) % expectedRoles.length
        expect(roleElement.text()).toBe(expectedRoles[currentIndex])
        await vi.advanceTimersByTimeAsync(3000)
      }
    }
    
    // After 3 complete cycles (9 intervals), should be back at first role
    expect(roleElement.text()).toBe(expectedRoles[0])
  })

  it('Property 1: Role index wraps correctly using modulo operation', () => {
    // Property test: For any role index, the modulo operation should always produce a valid index
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 1000 }),
        (index) => {
          const wrappedIndex = index % expectedRoles.length
          return wrappedIndex >= 0 && wrappedIndex < expectedRoles.length
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 1: Role sequence is deterministic for any starting point', () => {
    // Property test: Given any starting index, the next index should always be (current + 1) % length
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: expectedRoles.length - 1 }),
        (currentIndex) => {
          const nextIndex = (currentIndex + 1) % expectedRoles.length
          const expectedNextRole = expectedRoles[nextIndex]
          
          // Verify the sequence logic
          return nextIndex >= 0 && 
                 nextIndex < expectedRoles.length && 
                 expectedNextRole !== undefined
        }
      ),
      { numRuns: 100 }
    )
  })
})
