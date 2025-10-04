<template>
  <article
    class="group relative overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
  >
    <div class="absolute inset-0 bg-gradient-to-r opacity-10" :class="highlight.accentColor" />
    <div class="relative flex flex-col gap-4 p-6">
      <div>
        <p class="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {{ highlight.category }}
        </p>
        <h3 class="mt-2 text-xl font-semibold text-foreground group-hover:text-primary">
          {{ highlight.name }}
        </h3>
      </div>
      <p class="text-sm text-muted-foreground">
        {{ highlight.summary }}
      </p>
      <NuxtLink
        :to="`/profiles/${highlight.slug}`"
        class="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        View profile
        <span aria-hidden="true">→</span>
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{
  highlight: {
    name: string
    category: string
    slug: string
    summary: string
    accentColor: string
  }
}>()
</script>
