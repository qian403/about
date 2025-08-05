import { ref, computed } from 'vue'

// 使用 Composition API 創建一個簡單的狀態管理
const isLoading = ref(true)
const theme = ref('light')

// 個人資訊
const personalInfo = ref({
  name: 'Jason Hsu',
  title: 'Full-Stack Developer',
  email: 'jxu49220@gmail.com',
  phone: '+886 123 456 789',
  location: 'Taiwan',
  github: 'https://github.com/qian403',
  linkedin: 'https://linkedin.com/in/yourprofile'
})

export function useMainStore() {
  const setLoading = (loading) => {
    isLoading.value = loading
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  const setTheme = (newTheme) => {
    theme.value = newTheme
  }

  const updatePersonalInfo = (info) => {
    personalInfo.value = { ...personalInfo.value, ...info }
  }

  return {
    // state
    isLoading: computed(() => isLoading.value),
    theme: computed(() => theme.value),
    personalInfo: computed(() => personalInfo.value),
    
    // actions
    setLoading,
    toggleTheme,
    setTheme,
    updatePersonalInfo
  }
}
