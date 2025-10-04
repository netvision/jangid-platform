<template>
  <div class="mx-auto max-w-lg space-y-6">
    <h1 class="text-2xl font-semibold">Login to your dashboard</h1>
    <p class="text-sm text-muted-foreground">
      Access your profile, manage content, and customize your public microsite.
    </p>
    <form class="space-y-4" @submit.prevent="onSubmit">
      <div class="space-y-2">
        <label class="text-sm font-medium" for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          autocomplete="email"
          class="w-full rounded-md border border-border bg-background px-3 py-2"
        />
      </div>
      <div class="space-y-2">
        <label class="text-sm font-medium" for="password">Password</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          required
          autocomplete="current-password"
          class="w-full rounded-md border border-border bg-background px-3 py-2"
        />
      </div>
      <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
      <button
        class="w-full rounded-md bg-primary px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"
        :disabled="loading"
      >
        <span v-if="loading">Logging in...</span>
        <span v-else>Login</span>
      </button>
    </form>
    <p class="text-sm text-muted-foreground">
      Don’t have an account?
      <NuxtLink to="/auth/register" class="text-primary hover:underline">Create one</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const { loading, error, isAuthenticated } = storeToRefs(auth)

const form = reactive({
  email: '',
  password: ''
})

watchEffect(() => {
  if (isAuthenticated.value) {
    navigateAfterAuth()
  }
})

const onSubmit = async () => {
  try {
    await auth.login({ ...form })
    navigateAfterAuth()
  } catch (err) {
    console.warn('login failed', err)
  }
}

function navigateAfterAuth() {
  const redirect = (route.query.redirect as string) || '/dashboard'
  router.push(redirect)
}
</script>
