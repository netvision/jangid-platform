import { defineNuxtPlugin } from 'nuxt/app'
import { useAuthStore } from '@/stores/auth'

export default defineNuxtPlugin(async () => {
  const auth = useAuthStore()
  try {
    await auth.restore()
  } catch (error) {
    console.warn('Failed to restore auth session', error)
  }
})
