<template>
  <section class="space-y-12">
    <div class="flex flex-col gap-6 text-center">
      <h1 class="text-4xl font-semibold tracking-tight text-primary md:text-5xl">
        Discover professionals across the Jangid community
      </h1>
      <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
        Lets begin again and again......
      </p>
      <div class="mx-auto flex w-full max-w-xl flex-col gap-3 md:flex-row">
        <input
          type="search"
          placeholder="Search by name, service, or location"
          class="w-full rounded-md border border-border bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-medium text-white shadow hover:bg-primary/90">
          Search
        </button>
      </div>
    </div>

    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <HomeHighlightCard
        v-for="highlight in highlights"
        :key="highlight.slug"
        :highlight="highlight"
      />
    </div>

    <section class="rounded-2xl bg-muted/40 p-8">
      <h2 class="text-2xl font-semibold">Create your digital presence in minutes</h2>
      <div class="mt-6 grid gap-6 md:grid-cols-3">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :feature="feature"
        />
      </div>
      <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
        <NuxtLink to="/auth/register" class="rounded-md bg-primary px-4 py-2 text-white shadow hover:bg-primary/90">
          Get started for free
        </NuxtLink>
        <NuxtLink to="/demo" class="text-primary hover:underline">
          View demo microsite
        </NuxtLink>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { highlightProfiles } from '~/data/highlights'

interface Feature {
  title: string
  description: string
  icon: string
}

const highlights = highlightProfiles

const features: Feature[] = [
  {
    title: 'Instant subdomain setup',
    description: 'Secure your unique URL and publish a digital visiting card or brochure instantly.',
    icon: 'i-heroicons-globe-alt-20-solid'
  },
  {
    title: 'Custom themes & layouts',
    description: 'Pick from curated templates, tweak colors, sections, and media to match your brand.',
    icon: 'i-heroicons-sparkles-20-solid'
  },
  {
    title: 'Admin insights dashboard',
    description: 'Track visits, leads, and engagement with real-time analytics and notifications.',
    icon: 'i-heroicons-chart-bar-20-solid'
  }
]
</script>
