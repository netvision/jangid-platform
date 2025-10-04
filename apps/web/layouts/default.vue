<template>
  <div class="min-h-screen bg-surface text-foreground">
    <HeaderNav />
    <main class="mx-auto w-full max-w-7xl px-4 py-8">
      <slot />
    </main>
    <footer class="border-t border-border bg-background py-6">
      <div class="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>&copy; {{ currentYear }} Jangid Portal. All rights reserved.</p>
        <div class="flex items-center gap-4">
          <NuxtLink to="/privacy" class="hover:text-primary">Privacy</NuxtLink>
          <NuxtLink to="/terms" class="hover:text-primary">Terms</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
