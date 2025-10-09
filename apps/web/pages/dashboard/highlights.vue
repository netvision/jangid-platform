<template>
  <div class="space-y-6">
    <header class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-semibold">
          Highlights Management
        </h1>
        <p class="text-sm text-muted-foreground">
          Create and manage featured highlights for your microsite.
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

    <!-- Info Banner -->
    <div class="rounded-md border border-blue-200 bg-blue-50 p-4">
      <div class="flex items-start gap-3">
        <Icon name="heroicons:information-circle" class="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
        <div class="text-sm text-blue-800">
          <p class="font-medium">
            Highlights Feature
          </p>
          <p class="mt-1">
            Highlights allow you to showcase special offers, featured projects, or announcements on your microsite. You can set an accent color and optional start/end dates for time-limited promotions.
          </p>
        </div>
      </div>
    </div>

    <!-- Highlights List -->
    <section class="rounded-xl border border-border bg-background p-6">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold">
          Your Highlights
        </h2>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
          disabled
        >
          <Icon name="heroicons:plus" class="h-4 w-4" />
          Add Highlight
        </button>
      </div>

      <div class="rounded-md border border-yellow-200 bg-yellow-50 p-4">
        <div class="flex items-start gap-3">
          <Icon name="heroicons:exclamation-triangle" class="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
          <div class="text-sm text-yellow-800">
            <p class="font-medium">
              API Implementation Required
            </p>
            <p class="mt-1">
              The highlights management feature requires backend API endpoints to be implemented. This includes:
            </p>
            <ul class="mt-2 list-inside list-disc space-y-1">
              <li>
                GET /profiles/me/highlights - List all highlights
              </li>
              <li>
                POST /profiles/me/highlights - Create new highlight
              </li>
              <li>
                PATCH /profiles/me/highlights/:id - Update highlight
              </li>
              <li>
                DELETE /profiles/me/highlights/:id - Delete highlight
              </li>
            </ul>
            <p class="mt-2">
              Once the API is ready, this page will provide full CRUD functionality for managing your highlights.
            </p>
          </div>
        </div>
      </div>

      <!-- Mock Highlight Example -->
      <div class="mt-6">
        <h3 class="mb-3 text-sm font-medium text-muted-foreground">
          Example Highlight (Preview)
        </h3>
        <div class="overflow-hidden rounded-lg border-2 border-dashed border-border p-4">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="mb-2 flex items-center gap-2">
                <div class="h-3 w-3 rounded-full bg-primary" />
                <h4 class="font-semibold">
                  Special Offer: 20% Off All Services
                </h4>
              </div>
              <p class="text-sm text-muted-foreground">
                Limited time discount on all our carpentry services. Book now to save!
              </p>
              <p class="mt-2 text-xs text-muted-foreground">
                Valid from Jan 1, 2025 to Jan 31, 2025
              </p>
            </div>
            <div class="flex gap-2">
              <button
                type="button"
                class="rounded-md border border-border bg-background p-2 text-sm hover:bg-muted"
                disabled
              >
                <Icon name="heroicons:pencil" class="h-4 w-4" />
              </button>
              <button
                type="button"
                class="rounded-md border border-border bg-background p-2 text-sm hover:bg-red-50 hover:text-red-600"
                disabled
              >
                <Icon name="heroicons:trash" class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Highlight Form (Placeholder) -->
    <section class="rounded-xl border border-border bg-background p-6">
      <h2 class="mb-4 text-lg font-semibold">
        Create Highlight (Preview)
      </h2>
      <form class="space-y-4" @submit.prevent>
        <div>
          <label for="title" class="block text-sm font-medium">
            Title <span class="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            disabled
            class="mt-1 w-full rounded-md border border-border bg-muted px-3 py-2"
            placeholder="e.g., New Year Special Offer"
          >
        </div>

        <div>
          <label for="description" class="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            rows="3"
            disabled
            class="mt-1 w-full rounded-md border border-border bg-muted px-3 py-2"
            placeholder="Describe your highlight..."
          />
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <label for="startsAt" class="block text-sm font-medium">
              Start Date (Optional)
            </label>
            <input
              id="startsAt"
              type="date"
              disabled
              class="mt-1 w-full rounded-md border border-border bg-muted px-3 py-2"
            >
          </div>
          <div>
            <label for="endsAt" class="block text-sm font-medium">
              End Date (Optional)
            </label>
            <input
              id="endsAt"
              type="date"
              disabled
              class="mt-1 w-full rounded-md border border-border bg-muted px-3 py-2"
            >
          </div>
        </div>

        <div>
          <label for="accentColor" class="block text-sm font-medium">
            Accent Color
          </label>
          <div class="mt-1 flex items-center gap-2">
            <input
              id="accentColor"
              type="color"
              disabled
              class="h-10 w-20 rounded-md border border-border"
              value="#d97706"
            >
            <span class="text-sm text-muted-foreground">#d97706</span>
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <button
            type="button"
            class="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium"
            disabled
          >
            Cancel
          </button>
          <button
            type="submit"
            class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
            disabled
          >
            Create Highlight
          </button>
        </div>
      </form>
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
