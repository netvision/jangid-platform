<template>
  <main class="page-watermark space-y-16 pb-16">
    <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 via-orange-400 to-amber-300 text-slate-900 shadow-xl">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_transparent_65%)] mix-blend-screen" />
      <div class="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:px-12 xl:px-16">
        <div class="max-w-xl space-y-8">
          <header class="space-y-5">
            <p class="hero-kicker">
              Legacy of artisans, blessed by Vishwakarma
            </p>
            <h1 class="hero-wordmark font-script">
              Jangid Community
            </h1>
            <h2 class="hero-title font-display">
              The most creative community
            </h2>
            <p class="text-lg font-semibold leading-snug text-amber-950/85">
              <span class="highlight">Jangid</span>, believed to be the descendants of Rishi Angira and blessed by Bhagwan Vishwakarma, is a community known for innovation and creative skills.
              We, at jangid.co.in, aspire to be a platform to network and to showcase these enterprises. So please come, join us and share your brilliance with the world.
            </p>
          </header>

          <section class="rounded-3xl bg-white/90 p-5 shadow-2xl backdrop-blur">
            <header class="flex items-center gap-2 rounded-2xl bg-amber-100/90 p-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-900">
              <button
                type="button"
                class="flex-1 rounded-xl px-3 py-2 transition"
                :class="authMode === 'login' ? 'bg-white text-amber-900 shadow' : 'text-amber-900/70 hover:text-amber-900'"
                @click="authMode = 'login'"
              >
                Login
              </button>
              <button
                type="button"
                class="flex-1 rounded-xl px-3 py-2 transition"
                :class="authMode === 'register' ? 'bg-white text-amber-900 shadow' : 'text-amber-900/70 hover:text-amber-900'"
                @click="authMode = 'register'"
              >
                Register
              </button>
            </header>

            <form class="mt-5 space-y-4" @submit.prevent="handleAuthSubmit">
              <div v-if="authMode === 'register'" class="grid gap-3 sm:grid-cols-2">
                <label class="col-span-full text-xs font-semibold uppercase tracking-wide text-amber-900/80">
                  Quick profile basics
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="name"
                  class="input-field"
                  placeholder="Full name"
                  required
                >
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  class="input-field"
                  placeholder="WhatsApp / phone"
                >
              </div>
              <div class="grid gap-3 sm:grid-cols-2">
                <label class="col-span-full text-xs font-semibold uppercase tracking-wide text-amber-900/80">
                  Account access
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  class="input-field"
                  placeholder="Email address"
                  required
                >
                <input
                  id="password"
                  type="password"
                  name="password"
                  class="input-field"
                  placeholder="Password"
                  required
                >
              </div>
              <button
                type="submit"
                class="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:from-amber-600 hover:via-orange-600 hover:to-amber-700"
              >
                {{ submitLabel }}
              </button>
              <footer class="space-y-2 text-center">
                <p class="text-xs font-medium text-amber-900/70">
                  {{ toggleCopy }}
                  <button
                    type="button"
                    class="font-semibold text-amber-900 underline-offset-4 hover:underline"
                    @click="authMode = authMode === 'login' ? 'register' : 'login'"
                  >
                    Switch to {{ authMode === 'login' ? 'register' : 'login' }}
                  </button>
                </p>
                <p class="text-[11px] uppercase tracking-[0.2em] text-amber-900/60">
                  Prefer to explore first?
                  <NuxtLink to="/highlights" class="font-semibold text-amber-900 underline-offset-4 hover:underline">
                    Browse community stories
                  </NuxtLink>
                </p>
              </footer>
            </form>
          </section>
        </div>
        <div class="relative flex-shrink-0">
          <div class="absolute inset-0 -z-10 -mx-24 -my-24 rounded-full bg-amber-200/60 blur-3xl" />
          <img
            src="/bhagwan_vishwakarma.png"
            alt="Illustration of Bhagwan Vishwakarma seated with tools"
            class="relative z-10 w-full max-w-lg rounded-[2.75rem] object-cover"
          >
        </div>
      </div>
    </section>

    <section class="mx-auto w-full max-w-6xl px-6 lg:px-12 xl:px-16">
      <header class="flex flex-col items-center gap-4 text-center">
        <h3 class="text-3xl font-semibold tracking-tight text-amber-950">
          Stories from across the nation
        </h3>
        <p class="max-w-2xl text-base text-amber-900/70">
          Discover artisans, technologists, designers, and entrepreneurs from every corner of the Jangid community. Each profile is a testament to the
          craft, discipline, and devotion that define our shared heritage.
        </p>
      </header>
      <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <HomeHighlightCard
          v-for="highlight in highlights"
          :key="highlight.slug"
          :highlight="highlight"
        />
      </div>
    </section>

    <section class="mx-auto w-full max-w-6xl rounded-2xl border border-amber-100 bg-white/85 px-6 py-12 shadow-lg backdrop-blur lg:px-12 xl:px-16">
      <div class="flex flex-col gap-4 text-center">
        <h3 class="text-3xl font-semibold text-amber-950">
          Build your digital presence in minutes
        </h3>
        <p class="text-base text-amber-900/70">
          Launch a modern microsite, share your portfolio, and connect with collaborators—all from one place tailored for the Jangid community.
        </p>
      </div>
      <div class="mt-8 grid gap-6 md:grid-cols-3">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :feature="feature"
        />
      </div>
      <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
        <NuxtLink
          to="/auth/register"
          class="rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-6 py-3 font-semibold text-white shadow transition hover:from-amber-600 hover:via-orange-600 hover:to-amber-700"
        >
          Get started for free
        </NuxtLink>
        <NuxtLink
          to="/demo"
          class="rounded-full border border-amber-300 px-6 py-3 font-semibold text-amber-900 transition hover:bg-amber-100/70"
        >
          View demo microsite
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { navigateTo, useRequestEvent, useFetch, useRuntimeConfig } from '#imports'
import type { DashboardProfile } from '~/types/profile'

const config = useRuntimeConfig()
const requestEvent = useRequestEvent()
const tenantSlug = requestEvent?.context?.tenantSlug

// Handle Subdomain Routing
if (process.server && tenantSlug) {
  try {
    // Fetch profile by slug from API
    const { data: tenantProfile } = await useFetch<DashboardProfile>(`${config.public.apiBase}/profiles/by-slug/${tenantSlug}`)
    
    if (tenantProfile.value) {
      await navigateTo(`/profiles/${tenantProfile.value.slug}`, { replace: true })
    }
  } catch (error) {
    // If profile not found or error, do nothing (stay on landing page or show 404)
    console.error(`Failed to resolve tenant: ${tenantSlug}`, error)
  }
}

interface Feature {
  title: string
  description: string
  icon: string
}

// Fetch Highlights Dynamically
const { data: profiles } = await useFetch<DashboardProfile[]>(`${config.public.apiBase}/profiles/highlights`, {
  lazy: true,
  default: () => []
})

const highlights = computed(() => {
  return (profiles.value || []).map(p => ({
    name: p.displayName,
    category: p.category,
    slug: p.slug,
    summary: p.summary || '',
    accentColor: 'from-amber-500 to-orange-500' // Default accent for now
  }))
})

const authMode = ref<'login' | 'register'>('login')

const submitLabel = computed(() => (authMode.value === 'login' ? 'Continue to login' : 'Continue to register'))
const toggleCopy = computed(() => (authMode.value === 'login' ? 'New here? Create your Jangid profile.' : 'Already part of the community?'))

const handleAuthSubmit = async () => {
  await navigateTo(authMode.value === 'login' ? '/auth/login' : '/auth/register')
}

const features: Feature[] = [
  {
    title: 'Showcase your craft',
    description: 'Publish rich galleries, service packages, and testimonials that celebrate generations of mastery.',
    icon: 'i-heroicons-sparkles-20-solid'
  },
  {
    title: 'Grow trusted networks',
    description: 'Connect with fellow artisans, mentors, and patrons through curated community highlights and events.',
    icon: 'i-heroicons-users-20-solid'
  },
  {
    title: 'Unlock digital tools',
    description: 'Access analytics, lead capture, and marketing tools built specifically for creative entrepreneurs.',
    icon: 'i-heroicons-chart-bar-20-solid'
  }
]
</script>

<style scoped lang="postcss">
.page-watermark {
  @apply relative isolate lg:py-6;
}

.page-watermark::before {
  content: '';
  position: absolute;
  inset: -4rem 0 -2rem;
  background-image: url('/jangid_watermark.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.18;
  filter: saturate(1.15) contrast(1.05);
  pointer-events: none;
  z-index: -1;
}

.highlight {
  @apply font-semibold text-orange-700;
}

.input-field {
  @apply rounded-xl border border-amber-200 bg-white/90 px-3.5 py-2.5 text-sm text-amber-950 placeholder:text-amber-900/40 shadow-sm transition focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400;
}

.hero-kicker {
  @apply inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.65em] text-amber-900/70;
}

.hero-kicker::before,
.hero-kicker::after {
  content: '';
  @apply h-px w-8 rounded-full bg-gradient-to-r from-transparent via-amber-900/40 to-transparent;
}

.hero-wordmark {
  font-size: clamp(2.75rem, 5vw, 4rem);
  @apply text-amber-50 drop-shadow-[0_20px_55px_rgba(137,65,0,0.35)];
}

.hero-title {
  @apply text-3xl font-semibold uppercase tracking-[0.35em] text-transparent sm:text-[2.65rem] bg-clip-text bg-gradient-to-r from-amber-950 via-orange-800 to-amber-500 drop-shadow-[0_12px_45px_rgba(137,65,0,0.35)];
}
</style>
