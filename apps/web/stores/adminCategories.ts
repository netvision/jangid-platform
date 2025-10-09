import {
  adminCategoriesResponseSchema,
  adminCategorySchema,
  type AdminCategory
} from '@jangid/shared'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRuntimeConfig } from '#imports'
import { useAuthStore } from '@/stores/auth'

type CategoryPayload = {
  name?: string
  slug?: string
  description?: string
  isActive?: boolean
}

export const useAdminCategoriesStore = defineStore('admin-categories', () => {
  const auth = useAuthStore()
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase ?? '/api'

  const categories = ref<AdminCategory[]>([])
  const loading = ref(false)
  const saving = ref(false)
  const error = ref<string | null>(null)

  async function fetchCategories (force = false) {
    if (!auth.accessToken) {
      return [] as AdminCategory[]
    }

    if (!force && categories.value.length > 0) {
      return categories.value
    }

    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${baseUrl}/admin/categories`, {
        headers: buildHeaders()
      })

      if (!response.ok) {
        throw new Error(`Failed to load categories (${response.status})`)
      }

      const payload = await response.json()
      const parsed = adminCategoriesResponseSchema.parse(payload)
      categories.value = parsed.categories
      return categories.value
    } catch (err) {
      handleError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createCategory (payload: CategoryPayload & { name: string }) {
    ensureAuth()
    saving.value = true
    error.value = null

    try {
      const response = await fetch(`${baseUrl}/admin/categories`, {
        method: 'POST',
        headers: buildHeaders(),
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`Failed to create category (${response.status})`)
      }

      const data = adminCategorySchema.parse(await response.json())
      categories.value = [data, ...categories.value].sort(sortByName)
      return data
    } catch (err) {
      handleError(err)
      throw err
    } finally {
      saving.value = false
    }
  }

  async function updateCategory (id: string, payload: CategoryPayload) {
    ensureAuth()
    saving.value = true
    error.value = null

    try {
      const response = await fetch(`${baseUrl}/admin/categories/${id}`, {
        method: 'PATCH',
        headers: buildHeaders(),
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`Failed to update category (${response.status})`)
      }

      const data = adminCategorySchema.parse(await response.json())
      categories.value = categories.value
        .map(category => (category.id === id ? data : category))
        .sort(sortByName)
      return data
    } catch (err) {
      handleError(err)
      throw err
    } finally {
      saving.value = false
    }
  }

  function clearCache () {
    categories.value = []
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

  function sortByName (a: AdminCategory, b: AdminCategory) {
    return a.name.localeCompare(b.name)
  }

  return {
    categories,
    loading,
    saving,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    clearCache
  }
})
