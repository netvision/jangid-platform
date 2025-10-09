<template>
  <div class="space-y-6">
    <header class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-semibold">
          Edit Profile
        </h1>
        <p class="text-sm text-muted-foreground">
          Update your business information and public profile details.
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

    <form class="space-y-6" @submit.prevent="handleSubmit">
      <!-- Basic Information -->
      <section class="rounded-xl border border-border bg-background p-6">
        <h2 class="mb-4 text-lg font-semibold">
          Basic Information
        </h2>
        <div class="space-y-4">
          <div>
            <label for="displayName" class="block text-sm font-medium">
              Business Name <span class="text-red-500">*</span>
            </label>
            <input
              id="displayName"
              v-model="form.displayName"
              type="text"
              required
              class="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
              placeholder="Your Business Name"
            >
          </div>

          <div>
            <label for="headline" class="block text-sm font-medium">
              Headline
            </label>
            <input
              id="headline"
              v-model="form.headline"
              type="text"
              maxlength="120"
              class="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
              placeholder="Brief tagline (max 120 characters)"
            >
            <p class="mt-1 text-xs text-muted-foreground">
              {{ form.headline?.length || 0 }} / 120 characters
            </p>
          </div>

          <div>
            <label for="summary" class="block text-sm font-medium">
              Summary
            </label>
            <textarea
              id="summary"
              v-model="form.summary"
              rows="4"
              maxlength="600"
              class="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
              placeholder="Describe your business and services (max 600 characters)"
            />
            <p class="mt-1 text-xs text-muted-foreground">
              {{ form.summary?.length || 0 }} / 600 characters
            </p>
          </div>
        </div>
      </section>

      <!-- Contact Information -->
      <section class="rounded-xl border border-border bg-background p-6">
        <h2 class="mb-4 text-lg font-semibold">
          Contact Information
        </h2>
        <div class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium">
              Public Email
            </label>
            <input
              id="email"
              v-model="form.contact.email"
              type="email"
              class="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
              placeholder="contact@yourbusiness.com"
            >
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium">
              Public Phone
            </label>
            <input
              id="phone"
              v-model="form.contact.phone"
              type="tel"
              class="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
              placeholder="+91 98765 43210"
            >
          </div>

          <div>
            <label for="website" class="block text-sm font-medium">
              Website
            </label>
            <input
              id="website"
              v-model="form.contact.website"
              type="url"
              class="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
              placeholder="https://yourbusiness.com"
            >
          </div>

          <div>
            <label for="address" class="block text-sm font-medium">
              Address
            </label>
            <textarea
              id="address"
              v-model="form.contact.address"
              rows="3"
              class="mt-1 w-full rounded-md border border-border bg-background px-3 py-2"
              placeholder="Your business address"
            />
          </div>
        </div>
      </section>

      <!-- Services -->
      <section class="rounded-xl border border-border bg-background p-6">
        <h2 class="mb-4 text-lg font-semibold">
          Services Offered
        </h2>
        <div class="space-y-4">
          <div class="space-y-2">
            <div
              v-for="(service, index) in form.services"
              :key="index"
              class="flex items-center gap-2"
            >
              <input
                v-model="form.services[index]"
                type="text"
                class="flex-1 rounded-md border border-border bg-background px-3 py-2"
                placeholder="Service name"
              >
              <button
                type="button"
                class="rounded-md border border-border bg-background px-3 py-2 text-sm hover:bg-red-50 hover:text-red-600"
                @click="removeService(index)"
              >
                <Icon name="heroicons:trash" class="h-4 w-4" />
              </button>
            </div>
          </div>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
            @click="addService"
          >
            <Icon name="heroicons:plus" class="h-4 w-4" />
            Add Service
          </button>
        </div>
      </section>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-3">
        <NuxtLink
          to="/dashboard"
          class="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Cancel
        </NuxtLink>
        <button
          type="submit"
          class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
          :disabled="loading"
        >
          <span v-if="loading">Saving...</span>
          <span v-else>Save Changes</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useProfileStore } from '@/stores/profile'

definePageMeta({
  middleware: ['authenticated']
})

const router = useRouter()
const profileStore = useProfileStore()
const { profile, loading, error } = storeToRefs(profileStore)

const form = reactive({
  displayName: '',
  headline: null as string | null,
  summary: null as string | null,
  contact: {
    email: null as string | null,
    phone: null as string | null,
    website: null as string | null,
    address: null as string | null
  },
  services: [] as string[]
})

onMounted(async () => {
  await profileStore.ensureProfile()
  if (profile.value) {
    form.displayName = profile.value.displayName
    form.headline = profile.value.headline
    form.summary = profile.value.summary
    form.contact = { ...profile.value.contact }
    form.services = [...profile.value.services]
  }
})

function addService () {
  form.services.push('')
}

function removeService (index: number) {
  form.services.splice(index, 1)
}

async function handleSubmit () {
  try {
    const payload = {
      displayName: form.displayName,
      headline: form.headline || null,
      summary: form.summary || null,
      contact: {
        email: form.contact.email || null,
        phone: form.contact.phone || null,
        website: form.contact.website || null,
        address: form.contact.address || null
      },
      services: form.services.filter(s => s.trim().length > 0)
    }

    await profileStore.updateProfile(payload)
    router.push('/dashboard')
  } catch (err) {
    // Error handled by store
  }
}
</script>
