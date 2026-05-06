import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    isLoading: false,
    theme: 'light',
    personalInfo: {
      name: 'Jason Hsu',
      title: 'Full-Stack Developer',
      email: 'jxu49220@gmail.com',
      location: 'Taiwan',
      github: 'https://github.com/qian403',
      linkedin: 'https://linkedin.com/in/yourprofile',
    },
  }),

  getters: {
    isDarkTheme: state => state.theme === 'dark',
  },

  actions: {
    setLoading(loading) {
      this.isLoading = loading
    },

    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },

    setTheme(newTheme) {
      this.theme = newTheme
    },

    updatePersonalInfo(info) {
      this.personalInfo = { ...this.personalInfo, ...info }
    },
  },
})
