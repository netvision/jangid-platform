import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'
import type { RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized) => {
  const auth = useAuthStore()

  if (!auth.accessToken || !auth.refreshToken) {
    return navigateTo({ path: '/auth/login', query: { redirect: to.fullPath } })
  }

  if (!auth.user) {
    try {
      await auth.fetchCurrentUser()
    } catch (error) {
      console.warn('failed to fetch user', error)
      return navigateTo({ path: '/auth/login', query: { redirect: to.fullPath } })
    }
  }

  if (auth.user?.role !== 'SUPER_ADMIN') {
    return navigateTo('/dashboard')
  }
})
