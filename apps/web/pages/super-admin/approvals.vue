<template>
  <div class="space-y-6">
    <header class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-semibold">
          Profile approvals
        </h1>
        <p class="text-sm text-muted-foreground">
          Review pending submissions and decide what goes live.
        </p>
      </div>
      <button
        class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        :disabled="loading"
        @click="refresh"
      >
        <span v-if="loading">Loading...</span>
        <span v-else>Refresh</span>
      </button>
    </header>

    <section class="rounded-xl border border-border bg-background">
      <div class="border-b border-border px-6 py-4">
        <h2 class="text-lg font-semibold">
          Pending queue
        </h2>
        <p class="text-sm text-muted-foreground">
          {{ pendingProfiles.length }} profile(s) awaiting review
        </p>
      </div>
      
      <div v-if="error" class="border-b border-border bg-red-50 px-6 py-4 text-sm text-red-600">
        {{ error }}
      </div>

      <div v-if="loading && pendingProfiles.length === 0" class="px-6 py-10 text-center text-sm text-muted-foreground">
        Loading pending profiles...
      </div>

      <div v-else-if="pendingProfiles.length === 0" class="px-6 py-10 text-center text-sm text-muted-foreground">
        No pending profiles at the moment.
      </div>

      <div v-else class="divide-y divide-border">
        <div
          v-for="profile in pendingProfiles"
          :key="profile.id"
          class="px-6 py-4 hover:bg-muted/30"
        >
          <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div class="flex-1 space-y-2">
              <div class="flex items-center gap-2">
                <h3 class="font-semibold">
                  {{ profile.displayName }}
                </h3>
                <span class="rounded-md bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                  {{ profile.status }}
                </span>
              </div>
              
              <div class="space-y-1 text-sm text-muted-foreground">
                <p>
                  <strong>Slug:</strong> {{ profile.slug }}
                </p>
                <p>
                  <strong>Email:</strong> {{ profile.user.email }}
                </p>
                <p v-if="profile.user.phone">
                  <strong>Phone:</strong> {{ profile.user.phone }}
                </p>
                <p v-if="profile.categoryName">
                  <strong>Category:</strong> {{ profile.categoryName }}
                </p>
                <p v-if="profile.headline">
                  <strong>Headline:</strong> {{ profile.headline }}
                </p>
                <p>
                  <strong>Submitted:</strong> {{ formatDate(profile.createdAt) }}
                </p>
              </div>
            </div>

            <div class="flex gap-2">
              <button
                class="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-70"
                :disabled="acting"
                @click="handleReject(profile.id)"
              >
                Reject
              </button>
              <button
                class="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
                :disabled="acting"
                @click="handleApprove(profile.id)"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAdminProfilesStore } from '@/stores/adminProfiles'

definePageMeta({
  layout: 'super-admin',
  middleware: ['super-admin']
})

const store = useAdminProfilesStore()
const { profiles, loading, acting, error } = storeToRefs(store)

const pendingProfiles = computed(() =>
  profiles.value.filter(p => p.status === 'PENDING_REVIEW')
)

onMounted(() => {
  store.fetchProfiles('PENDING_REVIEW')
})

async function refresh () {
  await store.fetchProfiles('PENDING_REVIEW', true)
}

async function handleApprove (profileId: string) {
  try {
    await store.updateApproval(profileId, { approve: true })
    // Refresh the list after approval
    await store.fetchProfiles('PENDING_REVIEW', true)
  } catch (err) {
    // Error is handled by the store
  }
}

async function handleReject (profileId: string) {
  try {
    await store.updateApproval(profileId, { approve: false })
    // Refresh the list after rejection
    await store.fetchProfiles('PENDING_REVIEW', true)
  } catch (err) {
    // Error is handled by the store
  }
}

function formatDate (date: Date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
