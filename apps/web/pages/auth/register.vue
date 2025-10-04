<template>
  <div class="mx-auto max-w-2xl space-y-6">
    <h1 class="text-2xl font-semibold">Create your Jangid portal</h1>
    <p class="text-sm text-muted-foreground">
      Reserve your subdomain, publish a visiting card or brochure, and manage enquiries from one dashboard.
    </p>
    <form class="grid gap-4 md:grid-cols-2" @submit.prevent="onSubmit">
      <label class="space-y-2 text-sm font-medium" for="displayName">
        Full name
        <input
          id="displayName"
          v-model="form.displayName"
          type="text"
          required
          autocomplete="name"
          class="w-full rounded-md border border-border bg-background px-3 py-2"
        />
      </label>
      <label class="space-y-2 text-sm font-medium" for="email">
        Email address
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          autocomplete="email"
          class="w-full rounded-md border border-border bg-background px-3 py-2"
        />
      </label>
      <label class="space-y-2 text-sm font-medium" for="phone">
        Phone number
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          placeholder="Optional"
          class="w-full rounded-md border border-border bg-background px-3 py-2"
        />
      </label>
      <label class="space-y-2 text-sm font-medium" for="slug">
        Desired subdomain
        <div class="flex items-center rounded-md border border-border bg-background">
          <input
            id="slug"
            v-model="form.slug"
            type="text"
            required
            placeholder="rakesh"
            class="w-full rounded-l-md px-3 py-2"
          />
          <span class="px-3 text-sm text-muted-foreground">.jangid.co.in</span>
        </div>
      </label>
      <label class="md:col-span-2 space-y-2 text-sm font-medium" for="category">
        Category
        <select
          id="category"
          v-model="form.categoryId"
          class="w-full rounded-md border border-border bg-background px-3 py-2 disabled:opacity-60"
          :disabled="categoriesPending"
        >
          <option value="">Select a category</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <p v-if="categoriesError" class="text-xs text-red-500">Failed to load categories. Please refresh and try again.</p>
      </label>
      <label class="md:col-span-2 space-y-2 text-sm font-medium" for="password">
        Password
        <input
          id="password"
          v-model="form.password"
          type="password"
          required
          autocomplete="new-password"
          class="w-full rounded-md border border-border bg-background px-3 py-2"
        />
      </label>
      <p v-if="error" class="md:col-span-2 text-sm text-red-500">{{ error }}</p>
      <button
        class="md:col-span-2 rounded-md bg-primary px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"
        :disabled="loading"
      >
        <span v-if="loading">Submitting...</span>
        <span v-else>Submit registration</span>
      </button>
    </form>
    <p class="text-sm text-muted-foreground">
      Already registered?
      <NuxtLink to="/auth/login" class="text-primary hover:underline">Login to continue</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useRuntimeConfig, useAsyncData } from 'nuxt/app'
import { $fetch } from 'ofetch'
import { categoriesResponseSchema, type CategoryList } from '@jangid/shared'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const { loading, error, isAuthenticated } = storeToRefs(auth)
const runtimeConfig = useRuntimeConfig()

const { data: categoriesData, pending: categoriesPending, error: categoriesError } = await useAsyncData(
  'categories',
  async () => {
    const response = await $fetch(`${runtimeConfig.public.apiBase}/categories`)
    return categoriesResponseSchema.parse(response)
  }
)

const categories = computed<CategoryList>(() => categoriesData.value ?? [])

const form = reactive({
  displayName: '',
  email: '',
  phone: '',
  slug: '',
  categoryId: '',
  password: ''
})

watchEffect(() => {
  if (isAuthenticated.value) {
    navigateAfterAuth()
  }
})

const onSubmit = async () => {
  try {
    await auth.register({
      displayName: form.displayName,
      email: form.email,
      phone: form.phone || undefined,
      slug: form.slug,
      categoryId: form.categoryId || undefined,
      password: form.password
    })
    navigateAfterAuth()
  } catch (err) {
    console.warn('registration failed', err)
  }
}

function navigateAfterAuth() {
  const redirect = (route.query.redirect as string) || '/dashboard'
  router.push(redirect)
}
</script>
