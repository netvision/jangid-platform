<template>
  <div class="space-y-6">
    <header class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-semibold">
          Media & Gallery
        </h1>
        <p class="text-sm text-muted-foreground">
          Upload cover images and manage your media gallery.
        </p>
      </div>
      <NuxtLink
        to="/dashboard"
        class="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
      >
        <Icon name="heroicons:arrow-left" class="h-4 w-4" />
        Back to Dashboard
      </NuxtLink>
    </header>

    <!-- Cover Image Section -->
    <section class="rounded-xl border border-border bg-background p-6">
      <h2 class="mb-4 text-lg font-semibold">
        Cover Image
      </h2>
      <div class="space-y-4">
        <div
          class="flex aspect-video w-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30"
        >
          <div class="text-center">
            <Icon name="heroicons:photo" class="mx-auto h-12 w-12 text-muted-foreground" />
            <p class="mt-2 text-sm text-muted-foreground">
              Cover image upload coming soon
            </p>
          </div>
        </div>
        <div class="rounded-md border border-yellow-200 bg-yellow-50 p-4">
          <div class="flex items-start gap-3">
            <Icon name="heroicons:information-circle" class="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
            <div class="text-sm text-yellow-800">
              <p class="font-medium">
                File Upload Coming Soon
              </p>
              <p class="mt-1">
                Image upload functionality will be implemented in the next phase. This will include cover images, logos, and gallery support with direct file upload to cloud storage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Logo Section -->
    <section class="rounded-xl border border-border bg-background p-6">
      <h2 class="mb-4 text-lg font-semibold">
        Logo
      </h2>
      <div class="space-y-4">
        <div
          class="flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30"
        >
          <Icon name="heroicons:photo" class="h-8 w-8 text-muted-foreground" />
        </div>
        <p class="text-sm text-muted-foreground">
          Logo upload will be available soon
        </p>
      </div>
    </section>

    <!-- Media Gallery Section -->
    <section class="rounded-xl border border-border bg-background p-6">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold">
          Media Gallery
        </h2>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
          disabled
        >
          <Icon name="heroicons:plus" class="h-4 w-4" />
          Add Images
        </button>
      </div>
      <div class="rounded-md border border-blue-200 bg-blue-50 p-4">
        <div class="flex items-start gap-3">
          <Icon name="heroicons:information-circle" class="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          <div class="text-sm text-blue-800">
            <p class="font-medium">
              Gallery Feature Planned
            </p>
            <p class="mt-1">
              The media gallery feature for showcasing multiple images will be implemented in a future update. This will allow you to display your work, products, or services through a beautiful image carousel.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProfileStore } from '@/stores/profile'

definePageMeta({
  middleware: ['authenticated']
})

const profileStore = useProfileStore()

onMounted(async () => {
  await profileStore.ensureProfile()
})
</script>
