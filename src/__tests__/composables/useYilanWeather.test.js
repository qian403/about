import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import {
  describeWeatherCode,
  getDemoWeather,
  getWeatherAppearance,
  normalizeCurrentWeather,
  useYilanWeather,
} from '../../composables/useYilanWeather'

const currentWeather = {
  temperature_2m: 27.4,
  apparent_temperature: 31.1,
  relative_humidity_2m: 83.4,
  precipitation: 0,
  weather_code: 2,
  wind_speed_10m: 11.6,
  is_day: 1,
  time: '2026-08-12T14:30',
}

const weatherResponse = current => ({
  ok: true,
  json: vi.fn().mockResolvedValue({ current }),
})

const mountWeather = options => {
  let weatherState
  const component = defineComponent({
    setup() {
      weatherState = useYilanWeather(options)
      return () => h('div')
    },
  })

  return { wrapper: mount(component), state: weatherState }
}

describe('Yilan weather presentation', () => {
  it.each([
    [0, 1, 'clear'],
    [0, 0, 'night'],
    [2, 1, 'cloudy'],
    [45, 1, 'cloudy'],
    [61, 1, 'rain'],
    [80, 0, 'rain'],
    [95, 1, 'storm'],
  ])('maps WMO code %s and isDay %s to %s', (code, isDay, expected) => {
    expect(getWeatherAppearance(code, isDay).key).toBe(expected)
  })

  it('falls back to the cloudy photograph for unknown data', () => {
    expect(getWeatherAppearance(undefined, 1)).toMatchObject({
      key: 'cloudy',
      src: '/weather/cloudy-day.jpg',
      desktopSrc: '/weather/cloudy-day-1920.webp',
      mobileSrc: '/weather/cloudy-day-720.webp',
    })
  })

  it('provides concise Traditional Chinese condition labels', () => {
    expect(describeWeatherCode(2)).toBe('局部多雲')
    expect(describeWeatherCode(82)).toBe('強陣雨')
    expect(describeWeatherCode(999)).toBe('天氣狀況不明')
  })

  it('accepts only the supported weather demo modes', () => {
    expect(getDemoWeather('rain')).toEqual({
      key: 'rain',
      code: 61,
      isDay: 1,
    })
    expect(getDemoWeather('unknown')).toBe(null)
  })

  it('normalizes the Open-Meteo current weather payload', () => {
    expect(normalizeCurrentWeather(currentWeather)).toEqual({
      temperature: 27.4,
      apparentTemperature: 31.1,
      humidity: 83,
      precipitation: 0,
      windSpeed: 12,
      code: 2,
      isDay: 1,
      observedAt: '2026-08-12T14:30',
    })
  })
})

describe('useYilanWeather lifecycle', () => {
  let wrapper

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
    vi.useRealTimers()
  })

  it('loads current weather and schedules refreshes', async () => {
    const fetcher = vi.fn().mockResolvedValue(weatherResponse(currentWeather))
    const mounted = mountWeather({
      fetcher,
      autoRefresh: true,
      refreshInterval: 5000,
    })
    wrapper = mounted.wrapper

    await flushPromises()
    expect(mounted.state.isLive.value).toBe(true)
    expect(mounted.state.weather.value.code).toBe(2)
    expect(mounted.state.observedDateTime.value).toBe(
      '2026-08-12T14:30:00+08:00'
    )
    expect(fetcher).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(5000)
    await flushPromises()
    expect(fetcher).toHaveBeenCalledTimes(2)
  })

  it('uses a labeled presentation override without changing live data', () => {
    const mounted = mountWeather({
      autoRefresh: false,
      demoWeather: 'rain',
    })
    wrapper = mounted.wrapper

    expect(mounted.state.isDemo.value).toBe(true)
    expect(mounted.state.condition.value).toBe('小雨')
    expect(mounted.state.background.value.key).toBe('rain')
    expect(mounted.state.weather.value.code).toBe(null)
  })

  it.each([
    ['an HTTP failure', { ok: false, status: 503 }],
    ['a malformed payload', weatherResponse(null)],
  ])('uses an honest fallback after %s', async (_label, response) => {
    const mounted = mountWeather({
      fetcher: vi.fn().mockResolvedValue(response),
      autoRefresh: true,
    })
    wrapper = mounted.wrapper

    await flushPromises()
    expect(mounted.state.isLoading.value).toBe(false)
    expect(mounted.state.isLive.value).toBe(false)
    expect(mounted.state.condition.value).toBe('天氣狀況不明')
    expect(mounted.state.background.value.key).toBe('cloudy')
  })

  it('times out a stalled weather request', async () => {
    let requestSignal
    const fetcher = vi.fn((_url, { signal }) => {
      requestSignal = signal
      return new Promise((_resolve, reject) => {
        signal.addEventListener('abort', () => {
          reject(new DOMException('Aborted', 'AbortError'))
        })
      })
    })
    const mounted = mountWeather({
      fetcher,
      autoRefresh: true,
      requestTimeout: 1000,
    })
    wrapper = mounted.wrapper

    expect(mounted.state.isLoading.value).toBe(true)
    await vi.advanceTimersByTimeAsync(1000)
    await flushPromises()

    expect(requestSignal.aborted).toBe(true)
    expect(mounted.state.isLoading.value).toBe(false)
    expect(mounted.state.isLive.value).toBe(false)
  })

  it('keeps the last observation if a later refresh fails', async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(weatherResponse(currentWeather))
      .mockResolvedValueOnce({ ok: false, status: 503 })
    const mounted = mountWeather({ fetcher, autoRefresh: true })
    wrapper = mounted.wrapper

    await flushPromises()
    expect(mounted.state.weather.value.code).toBe(2)

    await mounted.state.refresh()
    expect(mounted.state.weather.value.code).toBe(2)
    expect(mounted.state.isLive.value).toBe(false)
  })

  it('ignores an older request that resolves after a newer refresh', async () => {
    let resolveFirstRequest
    const firstRequest = new Promise(resolve => {
      resolveFirstRequest = resolve
    })
    const latestWeather = { ...currentWeather, weather_code: 0 }
    const fetcher = vi
      .fn()
      .mockReturnValueOnce(firstRequest)
      .mockResolvedValueOnce(weatherResponse(latestWeather))
    const mounted = mountWeather({ fetcher, autoRefresh: true })
    wrapper = mounted.wrapper

    await mounted.state.refresh()
    expect(mounted.state.weather.value.code).toBe(0)

    resolveFirstRequest(
      weatherResponse({ ...currentWeather, weather_code: 95 })
    )
    await flushPromises()

    expect(mounted.state.weather.value.code).toBe(0)
    expect(mounted.state.isLive.value).toBe(true)
  })

  it('ignores a late success after its request timed out', async () => {
    let resolveRequest
    const fetcher = vi.fn(
      () =>
        new Promise(resolve => {
          resolveRequest = resolve
        })
    )
    const mounted = mountWeather({
      fetcher,
      autoRefresh: true,
      requestTimeout: 1000,
    })
    wrapper = mounted.wrapper

    await vi.advanceTimersByTimeAsync(1000)
    expect(mounted.state.isLive.value).toBe(false)

    resolveRequest(weatherResponse(currentWeather))
    await flushPromises()

    expect(mounted.state.weather.value.code).toBe(null)
    expect(mounted.state.isLive.value).toBe(false)
  })

  it('aborts the active request when unmounted', () => {
    let requestSignal
    const fetcher = vi.fn((_url, { signal }) => {
      requestSignal = signal
      return new Promise(() => {})
    })
    const mounted = mountWeather({ fetcher, autoRefresh: true })
    wrapper = mounted.wrapper

    wrapper.unmount()
    wrapper = null
    expect(requestSignal.aborted).toBe(true)
  })
})
