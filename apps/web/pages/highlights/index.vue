<template>
  <section class="space-y-12">
    <header class="space-y-4 text-center">
      <h1 class="text-4xl font-semibold tracking-tight text-primary md:text-5xl">Community highlights</h1>
      <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
        Discover branded microsites crafted on the Jangid platform and get inspired to launch your own digital presence.
      </p>
    </header>

    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="highlight in highlightProfiles"
        :key="highlight.slug"
        class="group flex h-full flex-col rounded-2xl border border-border bg-background/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
      >
        <span
          class="inline-flex w-fit items-center justify-center rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white"
          :class="highlight.accentColor"
        >
          {{ highlight.category }}
        </span>
        <h2 class="mt-4 text-xl font-semibold text-foreground">{{ highlight.name }}</h2>
        <p class="mt-3 text-sm text-muted-foreground">
          {{ highlight.summary }}
        </p>
        <div class="mt-auto pt-6">
          <NuxtLink
            :to="`/profiles/${highlight.slug}`"
            class="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View profile
            <span aria-hidden="true" class="i-heroicons-arrow-right-16-solid transition group-hover:translate-x-0.5" />
          </NuxtLink>
        </div>
      </article>
    </div>

    <footer class="rounded-2xl bg-muted/40 p-8 text-center">
      <h2 class="text-2xl font-semibold">Want your business featured here?</h2>
      <p class="mt-2 text-muted-foreground">
        Publish your digital visiting card in minutes and we’ll showcase standout launches in the community highlights board.
      </p>
      <div class="mt-6 flex flex-wrap justify-center gap-4">
        <NuxtLink to="/auth/register" class="rounded-md bg-primary px-4 py-2 text-white shadow hover:bg-primary/90">
          Start your free trial
        </NuxtLink>
        <NuxtLink to="/demo" class="text-primary hover:underline">
          Preview the demo microsite
        </NuxtLink>
      </div>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { highlightProfiles } from '~/data/highlights'
</script>
