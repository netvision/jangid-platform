import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useCookie, useRuntimeConfig } from 'nuxt/app'
import { $fetch } from 'ofetch'

interface Credentials {
  email: string
  password: string
}

interface RegisterPayload extends Credentials {
  displayName: string
  slug: string
  phone?: string
  categoryId?: string
}

interface AuthProfile {
  id: string
  slug: string
  displayName: string
  status: 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'SUSPENDED'
  mode: 'CARD' | 'BROCHURE'
  headline?: string | null
  summary?: string | null
}

interface AuthUser {
  id: string
  email: string
  phone?: string | null
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
  isApproved: boolean
  profile?: AuthProfile | null
}

interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: AuthUser
}

const ACCESS_COOKIE = 'jangid_access_token'
const REFRESH_COOKIE = 'jangid_refresh_token'

export const useAuthStore = defineStore('auth', () => {
  const runtimeConfig = useRuntimeConfig()
  const baseURL = runtimeConfig.public.apiBase
  const secureCookie = typeof window !== 'undefined'
    ? window.location.protocol === 'https:'
    : runtimeConfig.public.apiBase.startsWith('https:')
  const accessToken = useCookie<string | null>(ACCESS_COOKIE, {
    sameSite: 'lax',
    secure: secureCookie,
    path: '/'
  })
  const refreshToken = useCookie<string | null>(REFRESH_COOKIE, {
    sameSite: 'lax',
    secure: secureCookie,
    path: '/'
  })
  const user = ref<AuthUser | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value && !!accessToken.value)
  const role = computed(() => user.value?.role ?? null)

  async function register(payload: RegisterPayload) {
    return authenticate(`${baseURL}/auth/register`, payload)
  }

  async function login(credentials: Credentials) {
    return authenticate(`${baseURL}/auth/login`, credentials)
  }

  async function authenticate(endpoint: string, body: Credentials | RegisterPayload) {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch<AuthResponse>(endpoint, {
        method: 'POST',
        body,
        headers: buildAuthHeaders()
      })
      setSession(response)
      return response
    } catch (err) {
      error.value = extractErrorMessage(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function refresh() {
    if (!refreshToken.value) {
      clearSession()
      return null
    }
    try {
      const response = await $fetch<AuthResponse>(`${baseURL}/auth/refresh`, {
        method: 'POST',
        body: { refreshToken: refreshToken.value },
        headers: buildAuthHeaders()
      })
      setSession(response)
      return response
    } catch (err) {
      clearSession()
      throw err
    }
  }

  async function fetchCurrentUser() {
    if (!accessToken.value) {
      return null
    }
    try {
      const me = await $fetch<AuthUser>(`${baseURL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`
        }
      })
      user.value = me
      return me
    } catch (err) {
      if (isTokenExpiredError(err) && refreshToken.value) {
        const refreshed = await refresh().catch(() => null)
        if (refreshed) {
          return user.value
        }
      }
      clearSession()
      return null
    }
  }

  async function logout() {
    if (accessToken.value) {
      try {
        await $fetch(`${baseURL}/auth/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken.value}`
          }
        })
      } catch (err) {
        // ignore errors during logout
        console.warn('logout failed', err)
      }
    }
    clearSession()
  }

  function setSession(response: AuthResponse) {
    accessToken.value = response.accessToken
    refreshToken.value = response.refreshToken
    user.value = response.user
  }

  function clearSession() {
    accessToken.value = null
    refreshToken.value = null
    user.value = null
  }

  function buildAuthHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    if (accessToken.value) {
      headers.Authorization = `Bearer ${accessToken.value}`
    }
    return headers
  }

  function extractErrorMessage(err: unknown): string {
    if (err && typeof err === 'object' && 'data' in err) {
      const data = (err as { data?: { message?: string | string[] } }).data
      if (data?.message) {
        return Array.isArray(data.message) ? data.message.join(', ') : data.message
      }
    }
    if (err instanceof Error) {
      return err.message
    }
    return 'Unexpected error occurred'
  }

  function isTokenExpiredError(err: unknown) {
    if (err && typeof err === 'object' && 'status' in err) {
      const status = (err as { status?: number }).status
      return status === 401 || status === 403
    }
    return false
  }

  async function restore() {
    if (user.value || !accessToken.value) {
      return user.value
    }
    return fetchCurrentUser()
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    role,
    accessToken,
    refreshToken,
    register,
    login,
    refresh,
    fetchCurrentUser,
    logout,
    restore,
    clearSession
  }
})
