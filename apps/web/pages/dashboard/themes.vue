<template>
  <div class="space-y-6">
    <header class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-semibold">
          Theme Configuration
        </h1>
        <p class="text-sm text-muted-foreground">
          Choose and customize the visual theme for your microsite.
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

    <div v-if="error" class="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
      {{ error }}
    </div>

    <!-- Current Theme -->
    <section v-if="profile" class="rounded-xl border border-border bg-background p-6">
      <h2 class="mb-4 text-lg font-semibold">
        Current Theme
      </h2>
      <div class="flex items-center gap-4">
        <div class="rounded-lg border border-border bg-muted p-4">
          <Icon name="heroicons:paint-brush" class="h-8 w-8 text-primary" />
        </div>
        <div class="flex-1">
          <p class="font-medium">
            {{ currentThemeName }}
          </p>
          <p class="text-sm text-muted-foreground">
            Currently selected theme
          </p>
        </div>
        <div v-if="micrositeUrl" class="text-right">
          <a
            :href="micrositeUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            Preview Site
            <Icon name="heroicons:arrow-top-right-on-square" class="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>

    <!-- Available Themes -->
    <section class="rounded-xl border border-border bg-background p-6">
      <h2 class="mb-4 text-lg font-semibold">
        Available Themes
      </h2>
      
      <div v-if="themesLoading" class="py-8 text-center text-sm text-muted-foreground">
        Loading themes...
      </div>

      <div v-else-if="themes.length === 0" class="py-8 text-center text-sm text-muted-foreground">
        No themes available
      </div>

      <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="theme in themes"
          :key="theme.id"
          class="overflow-hidden rounded-lg border border-border transition-all hover:border-primary hover:shadow-md"
          :class="{ 'ring-2 ring-primary': isCurrentTheme(theme.slug) }"
        >
          <div
            v-if="theme.thumbnail"
            class="aspect-video w-full overflow-hidden bg-muted"
          >
            <img
              :src="theme.thumbnail"
              :alt="theme.name"
              class="h-full w-full object-cover"
            >
          </div>
          <div
            v-else
            class="flex aspect-video w-full items-center justify-center bg-muted"
          >
            <Icon name="heroicons:photo" class="h-12 w-12 text-muted-foreground" />
          </div>
          <div class="p-4">
            <div class="mb-2 flex items-center justify-between">
              <h3 class="font-semibold">
                {{ theme.name }}
              </h3>
              <span
                v-if="isCurrentTheme(theme.slug)"
                class="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
              >
                Active
              </span>
            </div>
            <p
              v-if="theme.description"
              class="mb-3 text-sm text-muted-foreground"
            >
              {{ theme.description }}
            </p>
            <button
              v-if="!isCurrentTheme(theme.slug)"
              type="button"
              class="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
              :disabled="loading"
              @click="selectTheme(theme.slug)"
            >
              Select Theme
            </button>
            <button
              v-else
              type="button"
              class="w-full rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
              @click="showThemeConfig = !showThemeConfig"
            >
              Configure
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Theme Configuration Panel -->
    <section
      v-if="showThemeConfig && profile"
      class="rounded-xl border border-border bg-background p-6"
    >
      <h2 class="mb-4 text-lg font-semibold">
        Theme Customization
      </h2>
      <div class="rounded-md border border-blue-200 bg-blue-50 p-4">
        <div class="flex items-start gap-3">
          <Icon name="heroicons:information-circle" class="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
          <div class="text-sm text-blue-800">
            <p class="font-medium">
              Advanced Customization Coming Soon
            </p>
            <p class="mt-1">
              Theme customization options (colors, fonts, layout preferences) will be available in a future update. For now, you can select from pre-configured themes.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProfileStore } from '@/stores/profile'

definePageMeta({
  middleware: ['authenticated']
})

const profileStore = useProfileStore()
const { profile, loading, error, themes, themesLoading, micrositeUrl } = storeToRefs(profileStore)

const showThemeConfig = ref(false)

const currentThemeName = computed(() => {
  if (!profile.value?.themeId) {
    return 'Default Theme'
  }
  const theme = themes.value.find(t => t.slug === profile.value?.themeId)
  return theme?.name || profile.value.themeId
})

function isCurrentTheme (themeSlug: string) {
  return profile.value?.themeId === themeSlug
}

async function selectTheme (themeSlug: string) {
  try {
    await profileStore.updateProfile({
      theme: {
        themeId: themeSlug
      }
    })
    showThemeConfig.value = false
  } catch (err) {
    // Error handled by store
  }
}

onMounted(async () => {
  await profileStore.ensureProfile()
  await profileStore.fetchThemes()
})
</script>
