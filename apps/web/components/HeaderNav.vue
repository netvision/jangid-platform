<template>
  <header class="border-b border-border bg-background/80 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
      <NuxtLink to="/" class="group flex items-center gap-3 text-amber-900 transition hover:text-primary">
        <img src="/jangid_logo.png" alt="Jangid Community" class="h-9 w-auto drop-shadow-sm transition duration-300 group-hover:scale-105 md:h-10">
        <span class="sr-only">Jangid Community homepage</span>
        <div class="flex flex-col leading-tight">
          <span class="header-brand-title font-display">Jangid Community</span>
          <span class="header-brand-tagline font-script">Innovation meets skill</span>
        </div>
      </NuxtLink>
      <nav class="flex items-center gap-4 text-sm font-medium">
        <NuxtLink to="/categories" class="hover:text-primary">
          Categories
        </NuxtLink>
        <NuxtLink to="/highlights" class="hover:text-primary">
          Highlights
        </NuxtLink>
        <NuxtLink to="/pricing" class="hover:text-primary">
          Pricing
        </NuxtLink>
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

<style scoped lang="postcss">
.header-brand-title {
  @apply text-[13px] font-semibold uppercase tracking-[0.65em] text-amber-900;
}

.header-brand-tagline {
  @apply -mt-1 text-[18px] leading-none text-amber-700/80;
}
</style>
