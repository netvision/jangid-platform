<template>
  <section class="space-y-6">
    <div class="space-y-3">
      <div>
        <h1 class="text-3xl font-semibold">Welcome back, {{ profileName }}</h1>
        <p class="text-sm text-muted-foreground">
          Manage your microsite, update content, and monitor approvals from this dashboard.
        </p>
      </div>
      <div v-if="isSuperAdmin" class="flex flex-wrap items-center gap-3 text-sm">
        <span class="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">Super admin</span>
        <NuxtLink to="/dashboard/superadmin" class="inline-flex items-center gap-1 text-primary hover:underline">
          Open control center
          <span aria-hidden="true" class="i-heroicons-arrow-right-16-solid" />
        </NuxtLink>
      </div>
    </div>
    <div class="grid gap-6 lg:grid-cols-3">
      <div class="rounded-xl border border-border bg-background p-6 shadow-sm">
        <h2 class="text-lg font-semibold">Profile status</h2>
        <p class="mt-2 text-sm text-muted-foreground">
          Current status: <span class="font-medium text-primary">{{ statusLabel }}</span>
        </p>
      </div>
      <div class="rounded-xl border border-border bg-background p-6 shadow-sm lg:col-span-2">
        <h2 class="text-lg font-semibold">Quick actions</h2>
        <ul class="mt-4 space-y-3 text-sm">
          <li>• Edit your visiting card or brochure content</li>
          <li>• Upload a new cover image and media gallery</li>
          <li>• Configure themes and highlight preferences</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const { user } = storeToRefs(auth)

definePageMeta({
  middleware: ['authenticated']
})

const profileName = computed(() => user.value?.profile?.displayName ?? 'creator')

const isSuperAdmin = computed(() => user.value?.role === 'SUPER_ADMIN')

const statusLabel = computed(() => {
  const status = user.value?.profile?.status
  switch (status) {
    case 'APPROVED':
      return 'Approved'
    case 'PENDING_REVIEW':
      return 'Pending Approval'
    case 'SUSPENDED':
      return 'Suspended'
    default:
      return 'Draft'
  }
})
</script>
