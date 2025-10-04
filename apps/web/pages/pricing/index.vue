<template>
  <section class="space-y-12">
    <header class="space-y-4 text-center">
      <h1 class="text-4xl font-semibold tracking-tight text-primary md:text-5xl">Simple pricing for every stage</h1>
      <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
        Launch for free and upgrade when you need advanced templates, analytics, and lead management tools.
      </p>
    </header>

    <div class="grid gap-6 lg:grid-cols-3">
      <article v-for="plan in plans" :key="plan.name" class="flex flex-col rounded-2xl border border-border bg-background/80 p-6 shadow-sm">
        <div class="flex items-baseline justify-between">
          <h2 class="text-xl font-semibold">{{ plan.name }}</h2>
          <span v-if="plan.badge" class="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{{ plan.badge }}</span>
        </div>
        <p class="mt-2 text-sm text-muted-foreground">{{ plan.description }}</p>
        <p class="mt-6 text-4xl font-semibold">{{ plan.price }}</p>
        <p class="text-sm text-muted-foreground">{{ plan.billing }}</p>
        <ul class="mt-6 space-y-3 text-sm">
          <li v-for="feature in plan.features" :key="feature" class="flex items-center gap-2">
            <span class="i-heroicons-check-circle-20-solid text-primary" aria-hidden="true" />
            {{ feature }}
          </li>
        </ul>
        <NuxtLink :to="plan.cta" class="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow hover:bg-primary/90">
          {{ plan.ctaLabel }}
        </NuxtLink>
      </article>
    </div>

    <section class="grid gap-6 rounded-2xl bg-muted/40 p-8 md:grid-cols-2">
      <div class="space-y-3">
        <h2 class="text-2xl font-semibold">Have questions about billing?</h2>
        <p class="text-sm text-muted-foreground">
          Talk to our onboarding team about annual discounts, multi-profile bundles, or migrating from your existing website.
        </p>
      </div>
      <div class="flex items-center justify-center">
        <NuxtLink to="mailto:hello@jangid.co.in" class="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-primary hover:bg-background">
          <span class="i-heroicons-envelope-20-solid" aria-hidden="true" />
          hello@jangid.co.in
        </NuxtLink>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
const plans = [
  {
    name: 'Starter',
    description: 'Launch your digital visiting card with essential sections and lead capture.',
    price: '₹0',
    billing: 'forever free',
    features: ['1 microsite', 'Core templates & branding', 'Lead capture form', 'WhatsApp & phone CTA'],
    cta: '/auth/register',
    ctaLabel: 'Get started for free'
  },
  {
    name: 'Growth',
    badge: 'Popular',
    description: 'Unlock analytics, advanced themes, and high-converting CTA blocks.',
    price: '₹499',
    billing: 'per month, billed annually',
    features: ['3 microsites', 'Premium themes & sections', 'Insights dashboard', 'Custom domain mapping'],
    cta: '/auth/register?plan=growth',
    ctaLabel: 'Start free trial'
  },
  {
    name: 'Collective',
    description: 'For associations and agencies managing multiple member profiles.',
    price: 'Let’s talk',
    billing: 'custom billing based on seats',
    features: ['Unlimited microsites', 'Team access controls', 'Shared asset library', 'Dedicated support channel'],
    cta: 'mailto:sales@jangid.co.in',
    ctaLabel: 'Book a consult'
  }
]
</script>
