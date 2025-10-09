import {
  adminProfilesResponseSchema,
  adminProfileSchema,
  type AdminProfile,
  type ApproveProfile
} from '@jangid/shared'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRuntimeConfig } from '#imports'
import { useAuthStore } from '@/stores/auth'

export const useAdminProfilesStore = defineStore('admin-profiles', () => {
  const auth = useAuthStore()
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase ?? '/api'

  const profiles = ref<AdminProfile[]>([])
  const loading = ref(false)
  const acting = ref(false)
  const error = ref<string | null>(null)

  async function fetchProfiles (status?: string, force = false) {
    if (!auth.accessToken) {
      return [] as AdminProfile[]
    }

    if (!force && profiles.value.length > 0) {
      return profiles.value
    }

    loading.value = true
    error.value = null

    try {
      const url = new URL(`${baseUrl}/admin/profiles`)
      if (status) {
        url.searchParams.set('status', status)
      }

      const response = await fetch(url.toString(), {
        headers: buildHeaders()
      })

      if (!response.ok) {
        throw new Error(`Failed to load profiles (${response.status})`)
      }

      const payload = await response.json()
      const parsed = adminProfilesResponseSchema.parse(payload)
      profiles.value = parsed.profiles
      return profiles.value
    } catch (err) {
      handleError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateApproval (profileId: string, payload: ApproveProfile) {
    ensureAuth()
    acting.value = true
    error.value = null

    try {
      const response = await fetch(`${baseUrl}/admin/profiles/${profileId}/approval`, {
        method: 'PATCH',
        headers: buildHeaders(),
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`Failed to update approval (${response.status})`)
      }

      const data = adminProfileSchema.parse(await response.json())
      
      // Update local state
      const index = profiles.value.findIndex(p => p.id === profileId)
      if (index !== -1) {
        profiles.value.splice(index, 1)
      }
      
      return data
    } catch (err) {
      handleError(err)
      throw err
    } finally {
      acting.value = false
    }
  }

  function clearCache () {
    profiles.value = []
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

  function ensureAuth () {
    if (!auth.accessToken) {
      throw new Error('Not authenticated')
    }
  }

  function handleError (err: unknown) {
    const message = err instanceof Error ? err.message : 'Something went wrong'
    error.value = message
  }

  return {
    profiles,
    loading,
    acting,
    error,
    fetchProfiles,
    updateApproval,
    clearCache
  }
})
