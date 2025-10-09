<template>
  <div class="space-y-6">
    <header class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold">
          Category management
        </h1>
        <p class="text-sm text-muted-foreground">
          Curate the catalog used across the community directory.
        </p>
      </div>
      <button
        type="button"
        class="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition hover:bg-primary/90"
        :disabled="store.saving"
        @click="openCreateForm"
      >
        <Icon name="heroicons:plus" class="h-4 w-4" />
        New category
      </button>
    </header>

    <section class="rounded-xl border border-border bg-background">
      <div class="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h2 class="text-lg font-semibold">
            Catalog
          </h2>
          <p class="text-sm text-muted-foreground">
            Manage labels and visibility for categories shown during profile onboarding.
          </p>
        </div>
        <span v-if="store.loading" class="text-xs uppercase tracking-wide text-muted-foreground">
          Loading…
        </span>
      </div>

      <div v-if="store.error" class="border-b border-border bg-destructive/10 px-6 py-3 text-sm text-destructive">
        {{ store.error }}
      </div>

      <div v-if="store.categories.length === 0 && !store.loading" class="px-6 py-10 text-sm text-muted-foreground">
        No categories yet. Create your first category to get started.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-border text-sm">
          <thead class="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th class="px-6 py-3 font-medium">
                Name
              </th>
              <th class="px-6 py-3 font-medium">
                Slug
              </th>
              <th class="px-6 py-3 font-medium">
                Status
              </th>
              <th class="px-6 py-3 font-medium">
                Updated
              </th>
              <th class="px-6 py-3 font-medium text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="category in store.categories" :key="category.id" class="bg-background">
              <td class="px-6 py-4 align-top">
                <div class="font-medium text-foreground">
                  {{ category.name }}
                </div>
                <div v-if="category.description" class="mt-1 text-xs text-muted-foreground">
                  {{ category.description }}
                </div>
              </td>
              <td class="px-6 py-4 align-top font-mono text-xs text-muted-foreground">
                {{ category.slug }}
              </td>
              <td class="px-6 py-4 align-top">
                <span
                  class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium"
                  :class="category.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'"
                >
                  <span class="block h-2 w-2 rounded-full" :class="category.isActive ? 'bg-emerald-500' : 'bg-slate-500'" />
                  {{ category.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 align-top text-xs text-muted-foreground">
                {{ formatDate(category.updatedAt) }}
              </td>
              <td class="px-6 py-4 align-top">
                <div class="flex items-center justify-end gap-2 text-xs">
                  <button
                    type="button"
                    class="rounded-md border border-border px-2 py-1 font-medium transition hover:bg-muted"
                    :disabled="store.saving"
                    @click="openEditForm(category)"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="rounded-md border border-border px-2 py-1 font-medium transition hover:bg-muted"
                    :disabled="store.saving"
                    @click="toggleActive(category)"
                  >
                    {{ category.isActive ? 'Deactivate' : 'Activate' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showForm" class="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div class="w-full max-w-lg rounded-xl border border-border bg-background p-6 shadow-2xl">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-lg font-semibold">
                  {{ isEditing ? 'Edit category' : 'New category' }}
                </h3>
                <p class="text-sm text-muted-foreground">
                  {{ isEditing ? 'Update naming or visibility for this category.' : 'Add a category for profiles to choose from.' }}
                </p>
              </div>
              <button type="button" class="text-muted-foreground transition hover:text-foreground" @click="closeForm">
                <Icon name="heroicons:x-mark" class="h-5 w-5" />
              </button>
            </div>

            <form class="mt-6 space-y-4" @submit.prevent="submitForm">
              <div class="space-y-2">
                <label class="text-sm font-medium" for="category-name">Name</label>
                <input
                  id="category-name"
                  v-model.trim="form.name"
                  type="text"
                  required
                  class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="e.g. Interior & Carpentry"
                >
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium" for="category-slug">Slug (optional)</label>
                <input
                  id="category-slug"
                  v-model.trim="form.slug"
                  type="text"
                  class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="interior-carpentry"
                >
                <p class="text-xs text-muted-foreground">
                  Leave blank to generate automatically from the name.
                </p>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium" for="category-description">Description</label>
                <textarea
                  id="category-description"
                  v-model.trim="form.description"
                  rows="3"
                  class="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Short summary shown on onboarding form"
                />
              </div>

              <label class="flex items-center gap-3 text-sm font-medium">
                <input v-model="form.isActive" type="checkbox" class="h-4 w-4 rounded border-border text-primary focus:ring-primary/60">
                Active
              </label>

              <p v-if="formError" class="text-sm text-destructive">
                {{ formError }}
              </p>

              <div class="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  class="rounded-md border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
                  @click="closeForm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                  :disabled="store.saving"
                >
                  <Icon v-if="store.saving" name="heroicons:arrow-path" class="h-4 w-4 animate-spin" />
                  {{ isEditing ? 'Save changes' : 'Create category' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useAdminCategoriesStore } from '@/stores/adminCategories'

const store = useAdminCategoriesStore()
const showForm = ref(false)
const editingId = ref<string | null>(null)
const isEditing = computed(() => !!editingId.value)
const form = reactive({
  name: '',
  slug: '',
  description: '',
  isActive: true
})
const formError = ref<string | null>(null)

definePageMeta({
  layout: 'super-admin',
  middleware: ['super-admin']
})

onMounted(async () => {
  try {
    await store.fetchCategories()
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Failed to load categories'
  }
})

function openCreateForm () {
  editingId.value = null
  form.name = ''
  form.slug = ''
  form.description = ''
  form.isActive = true
  formError.value = null
  showForm.value = true
}

function openEditForm (category: (typeof store.categories)[number]) {
  editingId.value = category.id
  form.name = category.name
  form.slug = category.slug
  form.description = category.description ?? ''
  form.isActive = category.isActive
  formError.value = null
  showForm.value = true
}

function closeForm () {
  showForm.value = false
}

async function submitForm () {
  if (!form.name.trim()) {
    formError.value = 'Name is required'
    return
  }

  const payload = {
    name: form.name.trim(),
    slug: form.slug.trim() || undefined,
    description: form.description.trim() || undefined,
    isActive: form.isActive
  }

  try {
    if (editingId.value) {
      await store.updateCategory(editingId.value, payload)
    } else {
      await store.createCategory(payload)
    }
    closeForm()
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Failed to save category'
  }
}

async function toggleActive (category: (typeof store.categories)[number]) {
  try {
    await store.updateCategory(category.id, { isActive: !category.isActive })
  } catch (err) {
    formError.value = err instanceof Error ? err.message : 'Failed to update status'
  }
}

function formatDate (value: string) {
  const date = new Date(value)
  return date.toLocaleDateString()
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
