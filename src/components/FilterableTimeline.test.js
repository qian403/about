/**
 * Property-Based Tests for FilterableTimeline
 * Feature: resume-redesign
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import * as fc from 'fast-check'
import FilterableTimeline from './FilterableTimeline.vue'

// Mock Material Design components
const mockMdIcon = {
  template: '<span class="md-icon"><slot /></span>'
}

// Generate valid timeline item types
const timelineTypeArb = fc.constantFrom('work', 'education', 'community', 'competition')

// Generate a valid timeline item
const timelineItemArb = fc.record({
  id: fc.uuid(),
  type: timelineTypeArb,
  title: fc.string({ minLength: 1, maxLength: 100 }),
  subtitle: fc.option(fc.string({ minLength: 1, maxLength: 100 }), { nil: undefined }),
  period: fc.string({ minLength: 1, maxLength: 50 }),
  description: fc.string({ minLength: 1, maxLength: 500 }),
  tags: fc.array(fc.string({ minLength: 1, maxLength: 30 }), { minLength: 0, maxLength: 5 }),
  expanded: fc.boolean()
})

// Generate an array of timeline items
const timelineItemsArb = fc.array(timelineItemArb, { minLength: 1, maxLength: 20 })

// Sample test data for consistent testing
const sampleTimelineItems = [
  {
    id: 'work-1',
    type: 'work',
    title: '實習工程師',
    subtitle: '瀚霖智動銷售科技有限公司',
    period: '2024年11月 - 現在',
    description: '負責系統維運與資安相關工作。',
    tags: ['系統維運', '資訊安全'],
    expanded: false
  },
  {
    id: 'edu-1',
    type: 'education',
    title: '資訊工程系',
    subtitle: '中原大學',
    period: '2024年 - 現在',
    description: '主修資訊工程。',
    tags: ['資訊工程'],
    expanded: false
  },
  {
    id: 'community-1',
    type: 'community',
    title: 'SITCON 2026 總召',
    subtitle: '學生計算機年會',
    period: '2025年 - 2026年',
    description: '帶領學生計算機年會籌備團隊。',
    tags: ['領導', '社群經營'],
    expanded: false
  },
  {
    id: 'competition-1',
    type: 'competition',
    title: '全國技能競賽',
    subtitle: '勞動部',
    period: '2023年',
    description: '參與全國技能競賽網路安全職類。',
    tags: ['資訊安全', '競賽'],
    expanded: false
  }
]

describe('FilterableTimeline - Property 2: 時間軸篩選正確性', () => {
  /**
   * Feature: resume-redesign, Property 2: 時間軸篩選正確性
   * Validates: Requirements 3.2, 3.3
   * 
   * For any 篩選條件（work/education/community/competition），篩選後顯示的時間軸項目
   * 應全部屬於該類別，且每個項目應有對應類別的樣式類別。
   */

  let wrapper

  beforeEach(() => {
    wrapper = mount(FilterableTimeline, {
      props: {
        items: sampleTimelineItems.map(item => ({ ...item, expanded: false }))
      },
      global: {
        stubs: {
          'md-icon': mockMdIcon
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Property 2: Filtering by type shows only items of that type', () => {
    const filterTypes = ['work', 'education', 'community', 'competition']
    
    fc.assert(
      fc.property(
        fc.constantFrom(...filterTypes),
        (filterType) => {
          // Set the filter synchronously
          wrapper.vm.setFilter(filterType)
          
          // Get filtered items
          const filteredItems = wrapper.vm.filteredItems
          
          // All filtered items should be of the selected type
          return filteredItems.every(item => item.type === filterType)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 2: Filter "all" shows all items', async () => {
    wrapper.vm.setFilter('all')
    await wrapper.vm.$nextTick()
    
    const filteredItems = wrapper.vm.filteredItems
    expect(filteredItems.length).toBe(sampleTimelineItems.length)
  })

  it('Property 2: Each filtered item has correct type class on marker', async () => {
    const filterTypes = ['work', 'education', 'community', 'competition']
    
    for (const filterType of filterTypes) {
      wrapper.vm.setFilter(filterType)
      await wrapper.vm.$nextTick()
      
      const markers = wrapper.findAll('.timeline-marker')
      
      // All markers should have the correct type class
      markers.forEach(marker => {
        expect(marker.classes()).toContain(filterType)
      })
    }
  })

  it('Property 2: Each filtered item has correct type badge', async () => {
    const filterTypes = ['work', 'education', 'community', 'competition']
    
    for (const filterType of filterTypes) {
      wrapper.vm.setFilter(filterType)
      await wrapper.vm.$nextTick()
      
      const badges = wrapper.findAll('.timeline-type-badge')
      
      // All badges should have the correct type class
      badges.forEach(badge => {
        expect(badge.classes()).toContain(filterType)
      })
    }
  })

  it('Property 2: Filter buttons exist for all categories', () => {
    const filterButtons = wrapper.findAll('.filter-btn')
    
    // Should have 5 filter buttons (all, work, education, community, competition)
    expect(filterButtons.length).toBe(5)
    
    // Check that active class is applied correctly
    const activeButton = wrapper.find('.filter-btn.active')
    expect(activeButton.exists()).toBe(true)
  })

  it('Property 2: Clicking filter button updates currentFilter', () => {
    const filterTypes = ['work', 'education', 'community', 'competition', 'all']
    
    fc.assert(
      fc.property(
        fc.constantFrom(...filterTypes),
        (filterType) => {
          wrapper.vm.setFilter(filterType)
          
          return wrapper.vm.currentFilter === filterType
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 2: Filtered items count matches expected count for each type', async () => {
    const filterTypes = ['work', 'education', 'community', 'competition']
    
    for (const filterType of filterTypes) {
      wrapper.vm.setFilter(filterType)
      await wrapper.vm.$nextTick()
      
      const expectedCount = sampleTimelineItems.filter(item => item.type === filterType).length
      const actualCount = wrapper.vm.filteredItems.length
      
      expect(actualCount).toBe(expectedCount)
    }
  })
})

describe('FilterableTimeline - Property 2: 時間軸篩選正確性 (Generated Data)', () => {
  /**
   * Property-based test with generated timeline data
   * Validates: Requirements 3.2, 3.3
   */

  it('Property 2: For any generated timeline items, filtering preserves type consistency', () => {
    fc.assert(
      fc.property(
        timelineItemsArb,
        fc.constantFrom('work', 'education', 'community', 'competition'),
        (items, filterType) => {
          // Create items with unique IDs
          const itemsWithIds = items.map((item, index) => ({
            ...item,
            id: `item-${index}`,
            expanded: false
          }))
          
          const wrapper = mount(FilterableTimeline, {
            props: { items: itemsWithIds },
            global: {
              stubs: { 'md-icon': mockMdIcon }
            }
          })
          
          wrapper.vm.setFilter(filterType)
          
          const filteredItems = wrapper.vm.filteredItems
          const allMatchType = filteredItems.every(item => item.type === filterType)
          
          wrapper.unmount()
          
          return allMatchType
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 2: For any generated timeline items, "all" filter returns all items', () => {
    fc.assert(
      fc.property(
        timelineItemsArb,
        (items) => {
          const itemsWithIds = items.map((item, index) => ({
            ...item,
            id: `item-${index}`,
            expanded: false
          }))
          
          const wrapper = mount(FilterableTimeline, {
            props: { items: itemsWithIds },
            global: {
              stubs: { 'md-icon': mockMdIcon }
            }
          })
          
          wrapper.vm.setFilter('all')
          
          const result = wrapper.vm.filteredItems.length === itemsWithIds.length
          
          wrapper.unmount()
          
          return result
        }
      ),
      { numRuns: 100 }
    )
  })
})


describe('FilterableTimeline - Property 3: 時間軸展開功能', () => {
  /**
   * Feature: resume-redesign, Property 3: 時間軸展開功能
   * Validates: Requirements 3.4
   * 
   * For any 時間軸項目，點擊後其 expanded 狀態應切換，且詳細內容應根據 expanded 狀態顯示或隱藏。
   */

  let wrapper

  beforeEach(() => {
    // Create fresh items with expanded: false for each test
    const freshItems = sampleTimelineItems.map(item => ({ ...item, expanded: false }))
    wrapper = mount(FilterableTimeline, {
      props: {
        items: freshItems
      },
      global: {
        stubs: {
          'md-icon': mockMdIcon
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('Property 3: Toggling expand changes item expanded state', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: sampleTimelineItems.length - 1 }),
        (itemIndex) => {
          const item = wrapper.vm.filteredItems[itemIndex]
          const initialState = item.expanded
          
          // Toggle expand
          wrapper.vm.toggleExpand(item)
          
          // State should be toggled
          const afterToggle = item.expanded
          
          // Toggle back
          wrapper.vm.toggleExpand(item)
          
          // State should be back to initial
          const afterSecondToggle = item.expanded
          
          return afterToggle === !initialState && afterSecondToggle === initialState
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 3: Expanded item shows details section', async () => {
    // Get the first item and expand it
    const item = wrapper.vm.filteredItems[0]
    wrapper.vm.toggleExpand(item)
    await wrapper.vm.$nextTick()
    
    // Find the expanded item
    const expandedItem = wrapper.find('.timeline-item.expanded')
    expect(expandedItem.exists()).toBe(true)
    
    // Check that details section exists
    const details = expandedItem.find('.timeline-details')
    expect(details.exists()).toBe(true)
  })

  it('Property 3: Collapsed item hides details section', async () => {
    // Ensure all items are collapsed
    wrapper.vm.filteredItems.forEach(item => {
      item.expanded = false
    })
    await wrapper.vm.$nextTick()
    
    // Find all timeline items
    const timelineItems = wrapper.findAll('.timeline-item')
    
    // None should have the expanded class
    timelineItems.forEach(item => {
      expect(item.classes()).not.toContain('expanded')
    })
  })

  it('Property 3: Toggle expand is idempotent (double toggle returns to original)', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: sampleTimelineItems.length - 1 }),
        (itemIndex) => {
          const item = wrapper.vm.filteredItems[itemIndex]
          const originalState = item.expanded
          
          // Double toggle
          wrapper.vm.toggleExpand(item)
          wrapper.vm.toggleExpand(item)
          
          return item.expanded === originalState
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 3: Each timeline item has expand button', () => {
    const timelineItems = wrapper.findAll('.timeline-item')
    
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: timelineItems.length - 1 }),
        (index) => {
          const item = timelineItems[index]
          const expandBtn = item.find('.expand-btn')
          return expandBtn.exists()
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 3: Expand button has correct aria-label based on state', async () => {
    // Test collapsed state
    const item = wrapper.vm.filteredItems[0]
    item.expanded = false
    await wrapper.vm.$nextTick()
    
    let expandBtn = wrapper.find('.timeline-item .expand-btn')
    expect(expandBtn.attributes('aria-label')).toBe('展開詳情')
    
    // Test expanded state
    item.expanded = true
    await wrapper.vm.$nextTick()
    
    expandBtn = wrapper.find('.timeline-item.expanded .expand-btn')
    expect(expandBtn.attributes('aria-label')).toBe('收合詳情')
  })

  it('Property 3: Timeline item has aria-expanded attribute matching state', async () => {
    const item = wrapper.vm.filteredItems[0]
    
    // Test collapsed state
    item.expanded = false
    await wrapper.vm.$nextTick()
    
    let timelineItem = wrapper.findAll('.timeline-item')[0]
    expect(timelineItem.attributes('aria-expanded')).toBe('false')
    
    // Test expanded state
    item.expanded = true
    await wrapper.vm.$nextTick()
    
    timelineItem = wrapper.findAll('.timeline-item')[0]
    expect(timelineItem.attributes('aria-expanded')).toBe('true')
  })
})

describe('FilterableTimeline - Property 3: 時間軸展開功能 (Generated Data)', () => {
  /**
   * Property-based test with generated timeline data
   * Validates: Requirements 3.4
   */

  it('Property 3: For any generated timeline items, toggle expand changes state correctly', () => {
    fc.assert(
      fc.property(
        timelineItemsArb,
        fc.integer({ min: 0, max: 19 }),
        (items, targetIndex) => {
          // Ensure we have items and valid index
          if (items.length === 0) return true
          
          const safeIndex = targetIndex % items.length
          const itemsWithIds = items.map((item, index) => ({
            ...item,
            id: `item-${index}`,
            expanded: false
          }))
          
          const wrapper = mount(FilterableTimeline, {
            props: { items: itemsWithIds },
            global: {
              stubs: { 'md-icon': mockMdIcon }
            }
          })
          
          const item = wrapper.vm.filteredItems[safeIndex]
          const initialState = item.expanded
          
          wrapper.vm.toggleExpand(item)
          const afterToggle = item.expanded
          
          wrapper.unmount()
          
          return afterToggle === !initialState
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 3: For any generated timeline items, expanded state is boolean', () => {
    fc.assert(
      fc.property(
        timelineItemsArb,
        (items) => {
          const itemsWithIds = items.map((item, index) => ({
            ...item,
            id: `item-${index}`,
            expanded: false
          }))
          
          const wrapper = mount(FilterableTimeline, {
            props: { items: itemsWithIds },
            global: {
              stubs: { 'md-icon': mockMdIcon }
            }
          })
          
          // Toggle all items
          wrapper.vm.filteredItems.forEach(item => {
            wrapper.vm.toggleExpand(item)
          })
          
          // All expanded states should be boolean
          const allBoolean = wrapper.vm.filteredItems.every(
            item => typeof item.expanded === 'boolean'
          )
          
          wrapper.unmount()
          
          return allBoolean
        }
      ),
      { numRuns: 100 }
    )
  })
})
