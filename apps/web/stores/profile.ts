import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import { $fetch } from 'ofetch'
import {
  dashboardProfileResponseSchema,
  themesResponseSchema,
  type DashboardProfile,
  type ThemeSummary
} from '@jangid/shared'
import { useAuthStore } from '@/stores/auth'

interface UpdateProfilePayload {
  displayName?: string
  headline?: string | null
  summary?: string | null
  services?: string[]
  contact?: {
    email?: string | null
    phone?: string | null
    website?: string | null
    address?: string | null
  }
  sections?: Record<string, unknown>
  theme?: {
    themeId: string
    config?: Record<string, unknown>
  }
}

export const useProfileStore = defineStore('profile', () => {
  const runtimeConfig = useRuntimeConfig()
  const auth = useAuthStore()
  const profile = ref<DashboardProfile | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const themes = ref<ThemeSummary[]>([])
  const themesLoading = ref(false)
  const themesLoaded = ref(false)

  const baseURL = runtimeConfig.public.apiBase

  const micrositeUrl = computed(() => {
    if (!profile.value?.slug) {
      return null
    }
    if (process.client) {
      const segments = window.location.hostname.split('.')
      const baseHost = segments.slice(-2).join('.') || window.location.hostname
      return `https://${profile.value.slug}.${baseHost}`
    }
    const fallbackHost = process.env.NUXT_PUBLIC_MICROSITE_BASE ?? 'jangid.co.in'
    return `https://${profile.value.slug}.${fallbackHost}`
  })

  async function fetchProfile (force = false) {
    if (!auth.accessToken) {
      return null
    }
    if (!force && profile.value) {
      return profile.value
    }

    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/profiles/me`, {
        headers: buildHeaders()
      })
      const parsed = dashboardProfileResponseSchema.parse(response)
      profile.value = normaliseDates(parsed.profile)
      return profile.value
    } catch (err) {
      handleError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function ensureProfile () {
    if (!profile.value) {
      await fetchProfile()
    }
    return profile.value
  }

  async function updateProfile (payload: UpdateProfilePayload) {
    if (!auth.accessToken) {
      throw new Error('Not authenticated')
    }
    loading.value = true
    error.value = null
    try {
      const response = await $fetch(`${baseURL}/profiles/me`, {
        method: 'PATCH',
        headers: buildHeaders(),
        body: payload
      })
      const parsed = dashboardProfileResponseSchema.parse(response)
      profile.value = normaliseDates(parsed.profile)
      return profile.value
    } catch (err) {
      handleError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchThemes (force = false) {
    if (themesLoaded.value && !force) {
      return themes.value
    }
    themesLoading.value = true
    try {
      const response = await $fetch(`${baseURL}/themes`, {
        headers: buildHeaders()
      })
      const parsed = themesResponseSchema.parse(response)
      themes.value = parsed.themes
      themesLoaded.value = true
      return themes.value
    } catch (err) {
      handleError(err)
      throw err
    } finally {
      themesLoading.value = false
    }
  }

  function clearProfile () {
    profile.value = null
    error.value = null
  }

  function buildHeaders () {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    if (auth.accessToken) {
      headers.Authorization = `Bearer ${auth.accessToken}`
    }
    return headers
  }

  function handleError (err: unknown) {
    if (err && typeof err === 'object' && 'data' in err) {
      const message = (err as { data?: { message?: string | string[] } }).data?.message
      error.value = Array.isArray(message) ? message.join(', ') : message ?? 'Unexpected error'
    } else if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = 'Unexpected error'
    }
    if ((err as { status?: number }).status === 401) {
      auth.clearSession()
    }
  }

  function normaliseDates (data: DashboardProfile): DashboardProfile {
    return {
      ...data,
      createdAt: data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt),
      updatedAt: data.updatedAt instanceof Date ? data.updatedAt : new Date(data.updatedAt)
    }
  }

  return {
    profile,
    loading,
    error,
    themes,
    themesLoading,
    micrositeUrl,
    fetchProfile,
    ensureProfile,
    updateProfile,
    fetchThemes,
    clearProfile
  }
})
