<template>
  <section class="space-y-10">
    <header class="space-y-4 text-center">
      <h1 class="text-4xl font-semibold tracking-tight text-primary md:text-5xl">Explore service categories</h1>
      <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
        Browse the curated categories available on Jangid and discover specialists ready to help with your next project.
      </p>
    </header>

    <div v-if="pending" class="flex justify-center">
      <span class="text-sm text-muted-foreground">Loading categories…</span>
    </div>

    <div v-else-if="error" class="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600">
      Failed to load categories. Please refresh the page or try again later.
    </div>

    <div v-else class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="category in categories"
        :key="category.id"
        class="rounded-2xl border border-border bg-background/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      >
        <h2 class="text-xl font-semibold text-foreground">{{ category.name }}</h2>
        <p v-if="category.description" class="mt-2 text-sm text-muted-foreground">
          {{ category.description }}
        </p>
      </article>
    </div>

    <footer class="rounded-2xl bg-muted/40 p-8 text-center">
      <h2 class="text-2xl font-semibold">Don’t see your niche listed?</h2>
      <p class="mt-2 text-muted-foreground">
        We’re constantly expanding our directory. Reach out to request a new category or register to get early access to upcoming themes.
      </p>
      <div class="mt-6 flex flex-wrap justify-center gap-4">
        <NuxtLink to="/auth/register" class="rounded-md bg-primary px-4 py-2 text-white shadow hover:bg-primary/90">
          Claim your digital card
        </NuxtLink>
        <NuxtLink to="/demo" class="text-primary hover:underline">
          Preview the demo microsite
        </NuxtLink>
      </div>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRuntimeConfig, useAsyncData } from 'nuxt/app'
import { $fetch } from 'ofetch'
import { categoriesResponseSchema, type CategoryList } from '@jangid/shared'

const runtimeConfig = useRuntimeConfig()

const { data, pending, error } = await useAsyncData('categories:list', async () => {
  const response = await $fetch(`${runtimeConfig.public.apiBase}/categories`)
  return categoriesResponseSchema.parse(response)
})

const categories = computed<CategoryList>(() => data.value ?? [])
</script>
