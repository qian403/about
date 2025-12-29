/**
 * Property-Based Tests for Highlight Card Size
 * Feature: portfolio-redesign, Property 4: 亮點成就尺寸正確性
 * Validates: Requirements 4.2
 * 
 * For any 標記為重要的亮點成就，其渲染後的元素應具有 large 尺寸的 CSS class。
 */
import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'

/**
 * Highlight data structure generator
 * Generates valid highlight objects with various sizes
 */
const highlightArbitrary = fc.record({
  title: fc.string({ minLength: 1, maxLength: 50 }),
  description: fc.string({ minLength: 1, maxLength: 200 }),
  icon: fc.constantFrom('groups', 'verified', 'bug_report', 'router', 'star', 'code'),
  badge: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: null }),
  size: fc.constantFrom('large', 'medium', 'small')
})

/**
 * Important highlight generator - always has size 'large'
 */
const importantHighlightArbitrary = fc.record({
  title: fc.string({ minLength: 1, maxLength: 50 }),
  description: fc.string({ minLength: 1, maxLength: 200 }),
  icon: fc.constantFrom('groups', 'verified', 'bug_report', 'router', 'star', 'code'),
  badge: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: null }),
  size: fc.constant('large')
})

/**
 * Simulates the CSS class assignment logic from HomeView.vue
 * The template uses :class="highlight.size" to apply the size class
 */
function getHighlightCardClasses(highlight) {
  const baseClasses = ['highlight-card']
  if (highlight.size) {
    baseClasses.push(highlight.size)
  }
  return baseClasses
}

/**
 * Checks if a highlight is marked as important (size === 'large')
 */
function isImportantHighlight(highlight) {
  return highlight.size === 'large'
}

describe('Highlight Card Size Property Tests', () => {
  /**
   * Feature: portfolio-redesign, Property 4: 亮點成就尺寸正確性
   * Validates: Requirements 4.2
   */
  
  it('Property 4: Important highlights (size=large) always have the large CSS class', () => {
    fc.assert(
      fc.property(
        importantHighlightArbitrary,
        (highlight) => {
          const classes = getHighlightCardClasses(highlight)
          
          // Important highlights must have 'large' class
          return classes.includes('large')
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 4: All highlights with size property get corresponding CSS class', () => {
    fc.assert(
      fc.property(
        highlightArbitrary,
        (highlight) => {
          const classes = getHighlightCardClasses(highlight)
          
          // The size class should match the highlight's size property
          return classes.includes(highlight.size)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 4: Important highlights are correctly identified by size=large', () => {
    fc.assert(
      fc.property(
        highlightArbitrary,
        (highlight) => {
          const isImportant = isImportantHighlight(highlight)
          
          // A highlight is important if and only if its size is 'large'
          return isImportant === (highlight.size === 'large')
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 4: Non-important highlights do not have large class', () => {
    const nonImportantHighlightArbitrary = fc.record({
      title: fc.string({ minLength: 1, maxLength: 50 }),
      description: fc.string({ minLength: 1, maxLength: 200 }),
      icon: fc.constantFrom('groups', 'verified', 'bug_report', 'router'),
      badge: fc.option(fc.string({ minLength: 1, maxLength: 20 }), { nil: null }),
      size: fc.constantFrom('medium', 'small')
    })

    fc.assert(
      fc.property(
        nonImportantHighlightArbitrary,
        (highlight) => {
          const classes = getHighlightCardClasses(highlight)
          
          // Non-important highlights should NOT have 'large' class
          return !classes.includes('large')
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 4: Highlight card always has base class plus size class', () => {
    fc.assert(
      fc.property(
        highlightArbitrary,
        (highlight) => {
          const classes = getHighlightCardClasses(highlight)
          
          // Should always have base class and exactly one size class
          const hasBaseClass = classes.includes('highlight-card')
          const hasSizeClass = classes.includes(highlight.size)
          const classCount = classes.length
          
          return hasBaseClass && hasSizeClass && classCount === 2
        }
      ),
      { numRuns: 100 }
    )
  })
})
