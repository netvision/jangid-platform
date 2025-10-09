<template>
  <div class="min-h-screen bg-surface text-foreground">
    <div class="flex min-h-screen">
      <aside class="hidden w-64 border-r border-border bg-background lg:flex lg:flex-col">
        <div class="flex h-16 items-center gap-3 border-b border-border px-6">
          <img src="/jangid_logo.png" alt="Jangid logo" class="h-8 w-8">
          <div>
            <p class="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Super Admin
            </p>
            <p class="text-sm font-medium">
              Jangid Control
            </p>
          </div>
        </div>
        <nav class="flex-1 space-y-1 px-4 py-6">
          <NuxtLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition"
            :class="linkClass(item.to)"
          >
            <component :is="item.icon" class="h-4 w-4" />
            <span>{{ item.label }}</span>
          </NuxtLink>
        </nav>
        <div class="border-t border-border px-4 py-4 text-xs text-muted-foreground">
          <p>&copy; {{ currentYear }} Jangid Portal</p>
          <p>Super Admin access only</p>
        </div>
      </aside>
      <div class="flex min-h-screen flex-1 flex-col">
        <header class="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
          <div class="flex h-16 items-center justify-between px-4 sm:px-6">
            <div class="flex items-center gap-3 lg:hidden">
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-md border border-border bg-background p-2 text-sm"
                @click="drawerOpen = true"
              >
                <Icon name="heroicons:bars-3" class="h-5 w-5" />
              </button>
              <span class="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Super Admin</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{{ auth.user?.email }}</span>
              <button type="button" class="rounded-md border border-border px-3 py-1 text-sm" @click="auth.logout()">
                Logout
              </button>
            </div>
          </div>
        </header>
        <main class="flex-1 bg-muted/40 px-4 py-8 sm:px-6">
          <slot />
        </main>
      </div>
    </div>
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="drawerOpen" class="fixed inset-0 z-40 flex lg:hidden">
          <div class="fixed inset-0 bg-black/40" @click="drawerOpen = false" />
          <aside class="relative ml-auto flex h-full w-64 flex-col border-l border-border bg-background shadow-xl">
            <div class="flex h-16 items-center gap-3 border-b border-border px-5">
              <img src="/jangid_logo.png" alt="Jangid logo" class="h-8 w-8">
              <span class="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Super Admin</span>
            </div>
            <nav class="flex-1 space-y-1 px-4 py-6">
              <NuxtLink
                v-for="item in navigation"
                :key="item.to"
                :to="item.to"
                class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition"
                :class="linkClass(item.to)"
                @click="drawerOpen = false"
              >
                <component :is="item.icon" class="h-4 w-4" />
                <span>{{ item.label }}</span>
              </NuxtLink>
            </nav>
          </aside>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const route = useRoute()
const drawerOpen = ref(false)
const currentYear = new Date().getFullYear()

const navigation = [
  {
    to: '/super-admin',
    label: 'Overview',
    icon: 'heroicons:home-modern'
  },
  {
    to: '/super-admin/categories',
    label: 'Categories',
    icon: 'heroicons:squares-2x2'
  },
  {
    to: '/super-admin/approvals',
    label: 'Approvals',
    icon: 'heroicons:check-badge'
  }
] as const

function linkClass (target: string) {
  const isActive = route.path === target
  return [
    isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
  ]
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-200;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
