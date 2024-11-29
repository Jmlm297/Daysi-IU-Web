import { defineStore } from 'pinia'

export const useProgressStore = defineStore('progress', {
  state: () => ({
    isLoading: false,
    progress: 0
  }),
  actions: {
    startLoading() {
      this.isLoading = true
      this.progress = 0
    },
    updateProgress(value: number) {
      this.progress = value
    },
    stopLoading() {
      this.isLoading = false
      this.progress = 0
    }
  }
}) 