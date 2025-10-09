<template>
  <section class="space-y-6">
    <div class="space-y-3">
      <div>
        <h1 class="text-3xl font-semibold">
          Welcome back, {{ profileName }}
        </h1>
        <p class="text-sm text-muted-foreground">
          Manage your microsite, update content, and monitor approvals from this dashboard.
        </p>
      </div>
      <div v-if="isSuperAdmin" class="flex flex-wrap items-center gap-3 text-sm">
        <span class="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">Super admin</span>
        <NuxtLink to="/super-admin" class="inline-flex items-center gap-1 text-primary hover:underline">
          Open control center
          <span aria-hidden="true" class="i-heroicons-arrow-right-16-solid" />
        </NuxtLink>
      </div>
    </div>
    <div class="grid gap-6 lg:grid-cols-3">
      <div class="rounded-xl border border-border bg-background p-6 shadow-sm">
        <h2 class="text-lg font-semibold">
          Profile status
        </h2>
        <p class="mt-2 text-sm text-muted-foreground">
          Current status: <span class="font-medium text-primary">{{ statusLabel }}</span>
        </p>
        <p v-if="user?.profile?.slug" class="mt-3 text-xs text-muted-foreground">
          Your microsite: <span class="font-mono">{{ user.profile.slug }}</span>
        </p>
      </div>
      <div class="rounded-xl border border-border bg-background p-6 shadow-sm lg:col-span-2">
        <h2 class="mb-4 text-lg font-semibold">
          Quick actions
        </h2>
        <div class="grid gap-3 md:grid-cols-2">
          <NuxtLink
            to="/dashboard/profile/edit"
            class="flex items-start gap-3 rounded-lg border border-border bg-background p-4 transition-all hover:border-primary hover:shadow-md"
          >
            <div class="rounded-lg bg-primary/10 p-2">
              <Icon name="heroicons:pencil-square" class="h-5 w-5 text-primary" />
            </div>
            <div class="flex-1">
              <h3 class="font-medium">
                Edit Profile
              </h3>
              <p class="text-sm text-muted-foreground">
                Update business info, contact details, and services
              </p>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/dashboard/themes"
            class="flex items-start gap-3 rounded-lg border border-border bg-background p-4 transition-all hover:border-primary hover:shadow-md"
          >
            <div class="rounded-lg bg-primary/10 p-2">
              <Icon name="heroicons:paint-brush" class="h-5 w-5 text-primary" />
            </div>
            <div class="flex-1">
              <h3 class="font-medium">
                Configure Theme
              </h3>
              <p class="text-sm text-muted-foreground">
                Choose and customize your microsite theme
              </p>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/dashboard/media"
            class="flex items-start gap-3 rounded-lg border border-border bg-background p-4 transition-all hover:border-primary hover:shadow-md"
          >
            <div class="rounded-lg bg-primary/10 p-2">
              <Icon name="heroicons:photo" class="h-5 w-5 text-primary" />
            </div>
            <div class="flex-1">
              <h3 class="font-medium">
                Media & Gallery
              </h3>
              <p class="text-sm text-muted-foreground">
                Upload cover images and manage media
              </p>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/dashboard/highlights"
            class="flex items-start gap-3 rounded-lg border border-border bg-background p-4 transition-all hover:border-primary hover:shadow-md"
          >
            <div class="rounded-lg bg-primary/10 p-2">
              <Icon name="heroicons:star" class="h-5 w-5 text-primary" />
            </div>
            <div class="flex-1">
              <h3 class="font-medium">
                Manage Highlights
              </h3>
              <p class="text-sm text-muted-foreground">
                Create and edit featured highlights
              </p>
            </div>
          </NuxtLink>
        </div>
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
