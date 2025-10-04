<template>
  <header class="border-b border-border bg-background/80 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
      <NuxtLink to="/" class="text-lg font-semibold text-primary">
        Jangid Connect
      </NuxtLink>
      <nav class="flex items-center gap-4 text-sm font-medium">
        <NuxtLink to="/categories" class="hover:text-primary">Categories</NuxtLink>
        <NuxtLink to="/highlights" class="hover:text-primary">Highlights</NuxtLink>
        <NuxtLink to="/pricing" class="hover:text-primary">Pricing</NuxtLink>
        <template v-if="isAuthenticated">
          <NuxtLink
            v-if="role === 'SUPER_ADMIN'"
            to="/dashboard/superadmin"
            class="rounded-md border border-primary/40 px-3 py-1.5 text-primary shadow-sm hover:bg-primary/5"
          >
            Super admin
          </NuxtLink>
          <NuxtLink
            to="/dashboard"
            class="rounded-md border border-primary/40 px-3 py-1.5 text-primary shadow-sm hover:bg-primary/5"
          >
            Dashboard
          </NuxtLink>
          <button
            type="button"
            class="rounded-md bg-primary px-3 py-1.5 text-white shadow hover:bg-primary/90"
            @click="handleLogout"
          >
            Logout
          </button>
        </template>
        <NuxtLink
          v-else
          to="/auth/login"
          class="rounded-md bg-primary px-3 py-1.5 text-white shadow hover:bg-primary/90"
        >
          Login
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const { isAuthenticated, role } = storeToRefs(auth)
const router = useRouter()

const handleLogout = async () => {
  await auth.logout()
  router.push('/auth/login')
}
</script>
