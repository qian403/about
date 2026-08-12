import { computed, onMounted, onUnmounted, readonly, ref } from 'vue'

const YILAN_WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=24.757&longitude=121.753&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,is_day&timezone=Asia%2FTaipei'

const REFRESH_INTERVAL = 15 * 60 * 1000
const REQUEST_TIMEOUT = 10 * 1000

const DEMO_WEATHER = {
  clear: { key: 'clear', code: 0, isDay: 1 },
  cloudy: { key: 'cloudy', code: 2, isDay: 1 },
  rain: { key: 'rain', code: 61, isDay: 1 },
  storm: { key: 'storm', code: 95, isDay: 1 },
  night: { key: 'night', code: 0, isDay: 0 },
}

const createImageSet = name => ({
  src: `/weather/${name}.jpg`,
  desktopSrc: `/weather/${name}-1920.webp`,
  mobileSrc: `/weather/${name}-720.webp`,
})

const SKY_BACKGROUNDS = {
  clear: createImageSet('clear-day'),
  cloudy: createImageSet('cloudy-day'),
  rain: createImageSet('rain-day'),
  storm: createImageSet('storm-day'),
  night: createImageSet('night'),
}

const WEATHER_DESCRIPTIONS = {
  0: '晴朗',
  1: '大致晴朗',
  2: '局部多雲',
  3: '陰天',
  45: '有霧',
  48: '霧淞',
  51: '細雨',
  53: '細雨',
  55: '較強細雨',
  56: '凍毛毛雨',
  57: '較強凍毛毛雨',
  61: '小雨',
  63: '中雨',
  65: '大雨',
  66: '凍雨',
  67: '較強凍雨',
  71: '小雪',
  73: '中雪',
  75: '大雪',
  77: '雪粒',
  80: '短暫陣雨',
  81: '陣雨',
  82: '強陣雨',
  85: '短暫陣雪',
  86: '強陣雪',
  95: '雷雨',
  96: '雷雨伴冰雹',
  99: '強雷雨伴冰雹',
}

const isBetween = (value, min, max) => value >= min && value <= max

export const describeWeatherCode = code =>
  WEATHER_DESCRIPTIONS[code] ?? '天氣狀況不明'

export const getDemoWeather = value => DEMO_WEATHER[value] ?? null

export const getWeatherAppearance = (weatherCode, isDay = 1) => {
  const code = Number.isFinite(weatherCode) ? weatherCode : 2

  if (isBetween(code, 95, 99)) {
    return { key: 'storm', ...SKY_BACKGROUNDS.storm }
  }

  if (isBetween(code, 51, 82) || isBetween(code, 85, 86)) {
    return { key: 'rain', ...SKY_BACKGROUNDS.rain }
  }

  if (Number(isDay) === 0 && isBetween(code, 0, 1)) {
    return { key: 'night', ...SKY_BACKGROUNDS.night }
  }

  if (isBetween(code, 0, 1)) {
    return { key: 'clear', ...SKY_BACKGROUNDS.clear }
  }

  return { key: 'cloudy', ...SKY_BACKGROUNDS.cloudy }
}

export const normalizeCurrentWeather = current => {
  if (!current || !Number.isFinite(current.weather_code)) {
    throw new Error('Invalid current weather response')
  }

  return {
    temperature: Number.isFinite(current.temperature_2m)
      ? current.temperature_2m
      : null,
    apparentTemperature: Number.isFinite(current.apparent_temperature)
      ? current.apparent_temperature
      : null,
    humidity: Number.isFinite(current.relative_humidity_2m)
      ? Math.round(current.relative_humidity_2m)
      : null,
    precipitation: Number.isFinite(current.precipitation)
      ? current.precipitation
      : null,
    windSpeed: Number.isFinite(current.wind_speed_10m)
      ? Math.round(current.wind_speed_10m)
      : null,
    code: current.weather_code,
    isDay: current.is_day,
    observedAt: current.time ?? null,
  }
}

export function useYilanWeather(options = {}) {
  const {
    fetcher = fetch,
    autoRefresh = import.meta.env.MODE !== 'test',
    refreshInterval = REFRESH_INTERVAL,
    requestTimeout = REQUEST_TIMEOUT,
  } = options
  const queryDemoWeather =
    typeof window === 'undefined'
      ? null
      : new URLSearchParams(window.location.search).get('weather')
  const demoWeather = getDemoWeather(options.demoWeather ?? queryDemoWeather)
  const weather = ref({
    temperature: null,
    apparentTemperature: null,
    humidity: null,
    precipitation: null,
    windSpeed: null,
    code: null,
    isDay: 1,
    observedAt: null,
  })
  const isLoading = ref(true)
  const isLive = ref(false)

  const isDemo = computed(() => demoWeather !== null)
  const condition = computed(() =>
    describeWeatherCode(demoWeather?.code ?? weather.value.code)
  )
  const background = computed(() =>
    getWeatherAppearance(
      demoWeather?.code ?? weather.value.code,
      demoWeather?.isDay ?? weather.value.isDay
    )
  )
  const observedTime = computed(
    () => weather.value.observedAt?.slice(11, 16) ?? null
  )
  const observedDateTime = computed(() =>
    weather.value.observedAt ? `${weather.value.observedAt}:00+08:00` : null
  )

  let refreshTimer = null
  let requestController = null

  const refresh = async () => {
    requestController?.abort()
    const controller = new AbortController()
    requestController = controller
    isLoading.value = true
    let didTimeout = false
    const timeoutId = window.setTimeout(() => {
      didTimeout = true
      controller.abort()
    }, requestTimeout)

    try {
      const response = await fetcher(YILAN_WEATHER_URL, {
        signal: controller.signal,
      })
      if (!response.ok)
        throw new Error(`Weather request failed: ${response.status}`)

      const data = await response.json()
      const currentWeather = normalizeCurrentWeather(data.current)
      if (requestController !== controller || controller.signal.aborted) {
        return
      }

      weather.value = currentWeather
      isLive.value = true
    } catch (error) {
      if (
        requestController === controller &&
        (error.name !== 'AbortError' || didTimeout)
      ) {
        isLive.value = false
      }
    } finally {
      window.clearTimeout(timeoutId)
      if (requestController === controller) isLoading.value = false
    }
  }

  onMounted(() => {
    if (!autoRefresh) {
      isLoading.value = false
      return
    }

    refresh()
    refreshTimer = window.setInterval(refresh, refreshInterval)
  })

  onUnmounted(() => {
    const controller = requestController
    requestController = null
    controller?.abort()
    window.clearInterval(refreshTimer)
  })

  return {
    weather: readonly(weather),
    condition,
    background,
    observedTime,
    observedDateTime,
    isLoading: readonly(isLoading),
    isLive: readonly(isLive),
    isDemo,
    refresh,
  }
}
