<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold">
        Super Admin Overview
      </h1>
      <p class="text-sm text-muted-foreground">
        High-level status for moderation and catalog curation.
      </p>
    </div>
    <div class="grid gap-4 md:grid-cols-3">
      <div
        v-for="card in statCards"
        :key="card.label"
        class="rounded-xl border border-border bg-background p-5 shadow-sm"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs uppercase tracking-wide text-muted-foreground">
              {{ card.label }}
            </p>
            <p class="mt-2 text-2xl font-semibold">
              {{ card.value }}
            </p>
          </div>
          <Icon :name="card.icon" class="h-8 w-8 text-primary" />
        </div>
      </div>
    </div>
    <section class="rounded-xl border border-border bg-background p-6">
      <h2 class="text-lg font-semibold">
        Next actions
      </h2>
      <ul class="mt-4 space-y-3 text-sm text-muted-foreground">
        <li>Review pending profiles awaiting approval.</li>
        <li>Keep the category catalog clean and descriptive.</li>
        <li>Coordinate with support for any escalations.</li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAdminProfilesStore } from '@/stores/adminProfiles'
import { useAdminCategoriesStore } from '@/stores/adminCategories'

const profilesStore = useAdminProfilesStore()
const categoriesStore = useAdminCategoriesStore()

const { profiles: allProfiles } = storeToRefs(profilesStore)
const { categories } = storeToRefs(categoriesStore)

const pendingCount = computed(() =>
  allProfiles.value.filter(p => p.status === 'PENDING_REVIEW').length
)

const activeCategories = computed(() =>
  categories.value.filter(c => c.isActive).length
)

const statCards = computed(() => [
  {
    label: 'Pending Profiles',
    value: pendingCount.value,
    icon: 'heroicons:clock'
  },
  {
    label: 'Active Categories',
    value: activeCategories.value,
    icon: 'heroicons:squares-2x2'
  },
  {
    label: 'Rejections (7d)',
    value: 0,
    icon: 'heroicons:x-circle'
  }
])

onMounted(() => {
  profilesStore.fetchProfiles('PENDING_REVIEW')
  categoriesStore.fetchCategories()
})

definePageMeta({
  layout: 'super-admin',
  middleware: ['super-admin']
})
</script>
