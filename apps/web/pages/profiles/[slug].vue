<template>
  <article v-if="displayProfile" class="space-y-16">
    <section class="rounded-3xl bg-gradient-to-r p-10 text-white shadow-xl" :class="displayProfile.accentColor">
      <div class="mx-auto flex max-w-4xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div class="space-y-4">
          <span class="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            {{ displayProfile.category }}
          </span>
          <div>
            <h1 class="text-4xl font-semibold md:text-5xl">{{ displayProfile.name }}</h1>
            <p class="mt-2 text-lg text-white/85">{{ displayProfile.location }}</p>
          </div>
          <p class="max-w-2xl text-base text-white/90">{{ displayProfile.description }}</p>
        </div>
        <div class="flex flex-col items-start gap-3">
          <NuxtLink to="/auth/register" class="inline-flex items-center justify-center rounded-md bg-white/90 px-5 py-3 text-sm font-semibold text-primary shadow hover:bg-white">
            Launch your microsite
          </NuxtLink>
          <NuxtLink to="/pricing" class="text-sm font-medium text-white/90 hover:underline">
            View pricing plans
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="grid gap-10 md:grid-cols-2">
      <div class="space-y-6">
        <div>
          <h2 class="text-2xl font-semibold">Services</h2>
          <ul class="mt-4 space-y-3 text-sm text-muted-foreground">
            <li v-for="service in displayProfile.services" :key="service" class="flex items-start gap-3">
              <span class="i-heroicons-star-20-solid text-primary" aria-hidden="true" />
              <span>{{ service }}</span>
            </li>
          </ul>
        </div>
        <div class="rounded-2xl border border-border bg-background/80 p-6 shadow-sm">
          <h3 class="text-lg font-semibold">Ready to discuss a project?</h3>
          <p class="mt-2 text-sm text-muted-foreground">
            Share a quick overview of your requirements and the team will respond within one business day.
          </p>
          <button type="button" class="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
            {{ displayProfile.ctaLabel }}
          </button>
        </div>
      </div>
      <div class="space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm">
        <h2 class="text-2xl font-semibold">Contact</h2>
        <ul class="space-y-3 text-sm text-muted-foreground">
          <li v-if="displayProfile.contact.phone" class="flex items-center gap-2">
            <span class="i-heroicons-phone-20-solid text-primary" aria-hidden="true" />
            {{ displayProfile.contact.phone }}
          </li>
          <li v-if="displayProfile.contact.email" class="flex items-center gap-2">
            <span class="i-heroicons-envelope-20-solid text-primary" aria-hidden="true" />
            {{ displayProfile.contact.email }}
          </li>
          <li v-if="displayProfile.contact.website" class="flex items-center gap-2">
            <span class="i-heroicons-globe-alt-20-solid text-primary" aria-hidden="true" />
            <NuxtLink :to="displayProfile.contact.website" target="_blank" rel="noopener" class="hover:underline">
              {{ displayProfile.contact.website }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <section v-if="related.length" class="space-y-6">
      <h2 class="text-2xl font-semibold">More community highlights</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <NuxtLink
          v-for="item in related"
          :key="item.slug"
          :to="`/profiles/${item.slug}`"
          class="group flex h-full flex-col rounded-2xl border border-border bg-background/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <span class="inline-flex w-fit items-center rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white" :class="item.accentColor">
            {{ item.category }}
          </span>
          <h3 class="mt-4 text-lg font-semibold text-foreground group-hover:text-primary">{{ item.name }}</h3>
          <p class="mt-2 text-sm text-muted-foreground">{{ item.summary }}</p>
        </NuxtLink>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead, useFetch, useRuntimeConfig } from '#imports'
import { createError } from 'h3'
import type { DashboardProfile } from '~/types/profile'

const config = useRuntimeConfig()
const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: profile, error } = await useFetch<DashboardProfile>(`${config.public.apiBase}/profiles/by-slug/${slug.value}`)

if (error.value || !profile.value) {
  throw createError({ statusCode: 404, statusMessage: 'Profile not found' })
}

// Map API response to template expectations if needed
// The API returns DashboardProfile which has similar fields but we might need to adapt some
const displayProfile = computed(() => {
  if (!profile.value) return null
  const p = profile.value
  return {
    name: p.displayName,
    slug: p.slug,
    category: p.category || 'General',
    summary: p.summary,
    accentColor: 'from-amber-500 to-orange-500', // Default accent
    description: p.headline || p.summary,
    location: p.contact?.address || 'India',
    services: p.services || [],
    ctaLabel: 'Contact Us',
    contact: p.contact
  }
})

useHead(() => ({
  title: `${displayProfile.value?.name ?? 'Profile'} • Jangid Community`
}))

// Fetch related profiles (optional, for now just empty or fetch highlights)
const related: any[] = [] 
</script>
