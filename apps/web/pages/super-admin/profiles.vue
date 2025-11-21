<template>
  <div class="space-y-6">
    <header class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-semibold">
          User Profiles
        </h1>
        <p class="text-sm text-muted-foreground">
          Manage all user profiles, approvals, and moderation status.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <select
          v-model="statusFilter"
          class="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          @change="handleFilterChange"
        >
          <option value="ALL">All Statuses</option>
          <option value="PENDING_REVIEW">Pending Review</option>
          <option value="APPROVED">Approved</option>
          <option value="SUSPENDED">Suspended</option>
          <option value="DRAFT">Draft</option>
        </select>
        <button
          class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="loading"
          @click="refresh"
        >
          <span v-if="loading">Loading...</span>
          <span v-else>Refresh</span>
        </button>
      </div>
    </header>

    <section class="rounded-xl border border-border bg-background">
      <div class="border-b border-border px-6 py-4">
        <h2 class="text-lg font-semibold">
          {{ statusLabel }} Profiles
        </h2>
        <p class="text-sm text-muted-foreground">
          Showing {{ filteredProfiles.length }} profile(s)
        </p>
      </div>
      
      <div v-if="error" class="border-b border-border bg-red-50 px-6 py-4 text-sm text-red-600">
        {{ error }}
      </div>

      <div v-if="loading && filteredProfiles.length === 0" class="px-6 py-10 text-center text-sm text-muted-foreground">
        Loading profiles...
      </div>

      <div v-else-if="filteredProfiles.length === 0" class="px-6 py-10 text-center text-sm text-muted-foreground">
        No profiles found matching the criteria.
      </div>

      <div v-else class="divide-y divide-border">
        <div
          v-for="profile in filteredProfiles"
          :key="profile.id"
          class="px-6 py-4 hover:bg-muted/30"
        >
          <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div class="flex-1 space-y-2">
              <div class="flex items-center gap-2">
                <h3 class="font-semibold">
                  {{ profile.displayName }}
                </h3>
                <span 
                  class="rounded-md px-2 py-0.5 text-xs font-medium"
                  :class="statusBadgeClass(profile.status)"
                >
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
              <template v-if="profile.status === 'PENDING_REVIEW'">
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
              </template>
              <template v-else-if="profile.status === 'APPROVED'">
                 <button
                  class="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-70"
                  :disabled="acting"
                  @click="handleReject(profile.id)"
                >
                  Suspend
                </button>
              </template>
               <template v-else-if="profile.status === 'SUSPENDED'">
                 <button
                  class="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
                  :disabled="acting"
                  @click="handleApprove(profile.id)"
                >
                  Re-Approve
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAdminProfilesStore } from '@/stores/adminProfiles'

definePageMeta({
  layout: 'super-admin',
  middleware: ['super-admin']
})

const store = useAdminProfilesStore()
const { profiles, loading, acting, error } = storeToRefs(store)

const statusFilter = ref('ALL')

const filteredProfiles = computed(() => {
  if (statusFilter.value === 'ALL') return profiles.value
  return profiles.value.filter(p => p.status === statusFilter.value)
})

const statusLabel = computed(() => {
  if (statusFilter.value === 'ALL') return 'All'
  return statusFilter.value.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
})

onMounted(() => {
  fetchData()
})

async function fetchData() {
  const filter = statusFilter.value === 'ALL' ? undefined : statusFilter.value
  await store.fetchProfiles(filter)
}

async function handleFilterChange() {
  await fetchData()
}

async function refresh () {
  await fetchData()
}

async function handleApprove (profileId: string) {
  try {
    await store.updateApproval(profileId, { approve: true })
    // Refresh the list after approval
    await fetchData()
  } catch (err) {
    // Error is handled by the store
  }
}

async function handleReject (profileId: string) {
  try {
    await store.updateApproval(profileId, { approve: false })
    // Refresh the list after rejection
    await fetchData()
  } catch (err) {
    // Error is handled by the store
  }
}

function statusBadgeClass(status: string) {
  switch (status) {
    case 'APPROVED': return 'bg-green-100 text-green-800'
    case 'PENDING_REVIEW': return 'bg-yellow-100 text-yellow-800'
    case 'SUSPENDED': return 'bg-red-100 text-red-800'
    case 'DRAFT': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
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
