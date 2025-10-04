<template>
  <div class="flex flex-col gap-4 rounded-2xl border border-border bg-background/80 p-6">
    <div class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
      <Icon :name="feature.icon" class="h-6 w-6" />
    </div>
    <div>
      <h3 class="text-lg font-semibold text-foreground">{{ feature.title }}</h3>
      <p class="mt-1 text-sm text-muted-foreground">{{ feature.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  feature: {
    title: string
    description: string
    icon: string
  }
}>()
</script>
