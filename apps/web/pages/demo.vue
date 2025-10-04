<template>
  <article class="space-y-16">
    <section class="rounded-3xl bg-gradient-to-r p-10 text-white shadow-xl" :class="demoProfile.accentColor">
      <div class="mx-auto flex max-w-4xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div class="space-y-4">
          <span class="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Demo microsite
          </span>
          <div>
            <h1 class="text-4xl font-semibold md:text-5xl">{{ demoProfile.name }}</h1>
            <p class="mt-2 text-lg text-white/80">{{ demoProfile.category }} • {{ demoProfile.location }}</p>
          </div>
          <p class="max-w-2xl text-base text-white/90">{{ demoProfile.description }}</p>
        </div>
        <NuxtLink to="/auth/register" class="inline-flex items-center justify-center rounded-md bg-white/90 px-5 py-3 text-sm font-semibold text-primary shadow hover:bg-white">
          {{ demoProfile.ctaLabel }}
        </NuxtLink>
      </div>
    </section>

    <section class="grid gap-10 md:grid-cols-2">
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">What we do</h2>
        <ul class="space-y-3 text-sm text-muted-foreground">
          <li v-for="service in demoProfile.services" :key="service" class="flex items-start gap-3">
            <span class="i-heroicons-sparkles-20-solid text-primary" aria-hidden="true" />
            <span>{{ service }}</span>
          </li>
        </ul>
      </div>
      <div class="space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm">
        <h3 class="text-xl font-semibold">Book a consultation</h3>
        <p class="text-sm text-muted-foreground">
          Share a brief introduction and we’ll get back to you within 24 hours with next steps and available slots.
        </p>
        <form class="space-y-3">
          <input type="text" placeholder="Your name" class="w-full rounded-md border border-border bg-background px-3 py-2" />
          <input type="email" placeholder="Email or phone" class="w-full rounded-md border border-border bg-background px-3 py-2" />
          <textarea rows="3" placeholder="Tell us about your project" class="w-full rounded-md border border-border bg-background px-3 py-2" />
          <button type="button" class="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
            Submit enquiry
          </button>
        </form>
      </div>
    </section>

    <section class="grid gap-8 md:grid-cols-3">
      <div class="rounded-2xl border border-border bg-background/80 p-6 shadow-sm">
        <h3 class="text-lg font-semibold">Call us</h3>
        <p class="mt-2 text-sm text-muted-foreground">{{ demoProfile.contact.phone }}</p>
      </div>
      <div class="rounded-2xl border border-border bg-background/80 p-6 shadow-sm">
        <h3 class="text-lg font-semibold">Write to us</h3>
        <p class="mt-2 text-sm text-muted-foreground">{{ demoProfile.contact.email }}</p>
      </div>
      <div v-if="demoProfile.contact.website" class="rounded-2xl border border-border bg-background/80 p-6 shadow-sm">
        <h3 class="text-lg font-semibold">Visit our site</h3>
        <NuxtLink :to="demoProfile.contact.website" target="_blank" rel="noopener" class="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          {{ demoProfile.contact.website }}
          <span aria-hidden="true" class="i-heroicons-arrow-top-right-on-square-20-solid" />
        </NuxtLink>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { highlightProfiles } from '~/data/highlights'

const demoProfile = highlightProfiles[0]
</script>
