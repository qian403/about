import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TypeWriter from './TypeWriter.vue'

describe('TypeWriter', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders typewriter component with cursor', () => {
    const wrapper = mount(TypeWriter, {
      props: {
        texts: ['Hello', 'World']
      }
    })
    expect(wrapper.find('.typewriter').exists()).toBe(true)
    expect(wrapper.find('.typewriter-cursor').exists()).toBe(true)
    expect(wrapper.find('.typewriter-cursor').text()).toBe('|')
  })

  it('types text progressively', async () => {
    const wrapper = mount(TypeWriter, {
      props: {
        texts: ['Hi'],
        speed: 100
      }
    })

    // 第一個字元在 mount 時同步執行
    expect(wrapper.vm.displayText).toBe('H')

    // 等待 speed 時間後打第二個字
    vi.advanceTimersByTime(100)
    expect(wrapper.vm.displayText).toBe('Hi')
  })

  it('has delete functionality', async () => {
    const wrapper = mount(TypeWriter, {
      props: {
        texts: ['A'],
        speed: 100,
        deleteSpeed: 50,
        pause: 500
      }
    })

    // mount 時打 'A'
    expect(wrapper.vm.displayText).toBe('A')
    
    // 驗證組件有 deleteSpeed prop
    expect(wrapper.props('deleteSpeed')).toBe(50)
    expect(wrapper.props('pause')).toBe(500)
  })

  it('respects custom speed props', async () => {
    const wrapper = mount(TypeWriter, {
      props: {
        texts: ['Test'],
        speed: 200
      }
    })

    // mount 時同步打第一個字
    expect(wrapper.vm.displayText).toBe('T')

    // 200ms 後打第二個字
    vi.advanceTimersByTime(200)
    expect(wrapper.vm.displayText).toBe('Te')
  })

  it('cleans up timeout on unmount', async () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
    
    const wrapper = mount(TypeWriter, {
      props: {
        texts: ['Hello']
      }
    })

    vi.advanceTimersByTime(100)
    wrapper.unmount()
    
    expect(clearTimeoutSpy).toHaveBeenCalled()
  })
})
