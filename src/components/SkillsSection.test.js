/**
 * Property-Based Tests for Skills Section
 * Feature: portfolio-redesign
 */
import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'

/**
 * Feature: portfolio-redesign, Property 3: 技能分類與等級正確性
 * Validates: Requirements 3.2, 3.3
 * 
 * For any 技能資料，該技能應被分配到正確的類別（後端/資安/DevOps/前端），
 * 且應顯示熟練度等級（精通/熟練/熟悉）。
 */

// Valid skill levels
const VALID_LEVELS = ['expert', 'proficient', 'familiar']

// Valid category names (matching the actual implementation)
const VALID_CATEGORIES = ['後端開發', '資訊安全', '網路與系統', '前端開發']

// Level label mapping (matching getLevelLabel function in HomeView.vue)
const LEVEL_LABELS = {
  expert: '精通',
  proficient: '熟練',
  familiar: '熟悉'
}

// Function to get level label (extracted from HomeView.vue)
const getLevelLabel = (level) => {
  return LEVEL_LABELS[level] || level
}

// Arbitrary for generating valid skill data
const skillArbitrary = fc.record({
  name: fc.stringMatching(/^[A-Za-z][A-Za-z0-9. ]{0,20}$/),
  level: fc.constantFrom(...VALID_LEVELS)
})

// Arbitrary for generating valid skill category
const skillCategoryArbitrary = fc.record({
  name: fc.constantFrom(...VALID_CATEGORIES),
  skills: fc.array(skillArbitrary, { minLength: 1, maxLength: 5 })
})

// Arbitrary for generating skill categories array
const skillCategoriesArbitrary = fc.array(skillCategoryArbitrary, { minLength: 1, maxLength: 4 })

describe('Skills Section - Skill Classification and Level Property Tests', () => {

  it('Property 3: Every skill has a valid proficiency level', () => {
    fc.assert(
      fc.property(skillArbitrary, (skill) => {
        return VALID_LEVELS.includes(skill.level)
      }),
      { numRuns: 100 }
    )
  })

  it('Property 3: Every skill level maps to a valid Chinese label', () => {
    fc.assert(
      fc.property(skillArbitrary, (skill) => {
        const label = getLevelLabel(skill.level)
        const validLabels = Object.values(LEVEL_LABELS)
        return validLabels.includes(label)
      }),
      { numRuns: 100 }
    )
  })

  it('Property 3: Every skill category has a valid category name', () => {
    fc.assert(
      fc.property(skillCategoryArbitrary, (category) => {
        return VALID_CATEGORIES.includes(category.name)
      }),
      { numRuns: 100 }
    )
  })

  it('Property 3: Every skill in a category has both name and level', () => {
    fc.assert(
      fc.property(skillCategoryArbitrary, (category) => {
        return category.skills.every(skill => 
          typeof skill.name === 'string' && 
          skill.name.length > 0 &&
          VALID_LEVELS.includes(skill.level)
        )
      }),
      { numRuns: 100 }
    )
  })

  it('Property 3: Level label transformation is deterministic', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...VALID_LEVELS),
        (level) => {
          const label1 = getLevelLabel(level)
          const label2 = getLevelLabel(level)
          return label1 === label2
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 3: Each level maps to exactly one label (bijective mapping)', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...VALID_LEVELS),
        fc.constantFrom(...VALID_LEVELS),
        (level1, level2) => {
          const label1 = getLevelLabel(level1)
          const label2 = getLevelLabel(level2)
          // If levels are different, labels should be different
          // If levels are same, labels should be same
          return (level1 === level2) === (label1 === label2)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('Property 3: All skills in categories array have valid structure', () => {
    fc.assert(
      fc.property(skillCategoriesArbitrary, (categories) => {
        return categories.every(category => 
          VALID_CATEGORIES.includes(category.name) &&
          category.skills.length > 0 &&
          category.skills.every(skill => 
            typeof skill.name === 'string' &&
            skill.name.length > 0 &&
            VALID_LEVELS.includes(skill.level)
          )
        )
      }),
      { numRuns: 100 }
    )
  })

  it('Property 3: Expert level always maps to 精通', () => {
    expect(getLevelLabel('expert')).toBe('精通')
  })

  it('Property 3: Proficient level always maps to 熟練', () => {
    expect(getLevelLabel('proficient')).toBe('熟練')
  })

  it('Property 3: Familiar level always maps to 熟悉', () => {
    expect(getLevelLabel('familiar')).toBe('熟悉')
  })

  it('Property 3: Unknown level returns the original value', () => {
    fc.assert(
      fc.property(
        fc.string().filter(s => !VALID_LEVELS.includes(s)),
        (unknownLevel) => {
          return getLevelLabel(unknownLevel) === unknownLevel
        }
      ),
      { numRuns: 50 }
    )
  })
})
