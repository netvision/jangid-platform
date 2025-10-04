<template>
  <section class="space-y-10">
    <header class="space-y-2">
      <p class="text-xs uppercase tracking-widest text-muted-foreground">Super admin</p>
      <h1 class="text-3xl font-semibold">Control center</h1>
      <p class="text-sm text-muted-foreground">
        Review pending profiles, monitor platform health, and onboard the wider Jangid collective.
      </p>
    </header>

    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <article
        v-for="metric in metrics"
        :key="metric.label"
        class="rounded-2xl border border-border bg-background/80 p-5 shadow-sm"
      >
        <p class="text-xs uppercase tracking-wide text-muted-foreground">{{ metric.label }}</p>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-3xl font-semibold">{{ metric.value }}</span>
          <span
            :class="[
              'text-xs font-medium',
              metric.trend === 'up' ? 'text-emerald-600' : metric.trend === 'down' ? 'text-rose-600' : 'text-muted-foreground'
            ]"
          >
            {{ metric.delta }}
          </span>
        </div>
        <p class="mt-2 text-xs text-muted-foreground">Updated {{ metric.updatedAgo }}</p>
      </article>
    </div>

    <div class="grid gap-6 xl:grid-cols-3">
      <section class="xl:col-span-2 space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm">
        <header class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 class="text-lg font-semibold">Profiles awaiting review</h2>
            <p class="text-sm text-muted-foreground">Prioritize approvals to keep creators moving.</p>
          </div>
          <NuxtLink to="/dashboard" class="text-sm font-medium text-primary hover:underline">Go to profiles</NuxtLink>
        </header>
        <ul class="divide-y divide-border text-sm">
          <li
            v-for="profile in pendingProfiles"
            :key="profile.id"
            class="flex flex-wrap items-center justify-between gap-3 py-3"
          >
            <div>
              <p class="font-medium">{{ profile.displayName }}</p>
              <p class="text-xs text-muted-foreground">Submitted {{ profile.submittedAgo }} • {{ profile.category }}</p>
            </div>
            <div class="flex items-center gap-3">
              <button type="button" class="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-background">
                Request edits
              </button>
              <button type="button" class="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary/90">
                Approve
              </button>
            </div>
          </li>
          <li v-if="!pendingProfiles.length" class="py-6 text-center text-sm text-muted-foreground">
            All caught up! No pending submissions right now.
          </li>
        </ul>
      </section>

      <section class="space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm">
        <header class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Platform signals</h2>
          <span class="text-xs text-muted-foreground">Last 24 hours</span>
        </header>
        <ul class="space-y-3 text-sm text-muted-foreground">
          <li v-for="signal in signals" :key="signal.message" class="flex items-start gap-3">
            <span
              :class="[
                'i-heroicons-sparkles-20-solid mt-0.5',
                signal.severity === 'info'
                  ? 'text-sky-500'
                  : signal.severity === 'success'
                    ? 'text-emerald-500'
                    : 'text-amber-500'
              ]"
              aria-hidden="true"
            />
            <div>
              <p class="font-medium text-foreground">{{ signal.title }}</p>
              <p>{{ signal.message }}</p>
            </div>
          </li>
        </ul>
      </section>
    </div>

    <section class="space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm">
      <header class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-semibold">Latest signups</h2>
          <p class="text-sm text-muted-foreground">Keep an eye on onboarding momentum and reach out to help unblock teams.</p>
        </div>
        <NuxtLink to="/auth/register" class="text-sm font-medium text-primary hover:underline">Invite a member</NuxtLink>
      </header>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-border text-sm">
          <thead class="text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th scope="col" class="py-2 pr-6">Business</th>
              <th scope="col" class="py-2 pr-6">Category</th>
              <th scope="col" class="py-2 pr-6">Status</th>
              <th scope="col" class="py-2">Joined</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr v-for="signup in latestSignups" :key="signup.id" class="text-sm">
              <td class="py-3 pr-6">
                <p class="font-medium text-foreground">{{ signup.business }}</p>
                <p class="text-xs text-muted-foreground">{{ signup.owner }}</p>
              </td>
              <td class="py-3 pr-6">
                <span class="rounded-full bg-muted px-3 py-1 text-xs font-medium">{{ signup.category }}</span>
              </td>
              <td class="py-3 pr-6">
                <span
                  :class="[
                    'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium',
                    signup.status === 'APPROVED'
                      ? 'bg-emerald-100 text-emerald-600'
                      : signup.status === 'PENDING_REVIEW'
                        ? 'bg-amber-100 text-amber-600'
                        : 'bg-slate-100 text-slate-600'
                  ]"
                >
                  <span
                    :class="[
                      'h-2 w-2 rounded-full',
                      signup.status === 'APPROVED'
                        ? 'bg-emerald-500'
                        : signup.status === 'PENDING_REVIEW'
                          ? 'bg-amber-500'
                          : 'bg-slate-400'
                    ]"
                  />
                  {{ signup.statusLabel }}
                </span>
              </td>
              <td class="py-3">{{ signup.joinedAgo }}</td>
            </tr>
          </tbody>
        </table>
        <p v-if="!latestSignups.length" class="py-6 text-center text-sm text-muted-foreground">
          No recent signups. Encourage members to invite friends from the community!
        </p>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

interface MetricCard {
  label: string
  value: string
  delta: string
  trend: 'up' | 'down' | 'neutral'
  updatedAgo: string
}

interface PendingProfile {
  id: string
  displayName: string
  category: string
  submittedAgo: string
}

interface SignalItem {
  title: string
  message: string
  severity: 'info' | 'success' | 'warning'
}

interface SignupRow {
  id: string
  business: string
  owner: string
  category: string
  status: 'APPROVED' | 'PENDING_REVIEW' | 'DRAFT'
  statusLabel: string
  joinedAgo: string
}

const metrics: MetricCard[] = [
  {
    label: 'Pending approvals',
    value: '6',
    delta: '+2 vs last week',
    trend: 'up',
    updatedAgo: '8 minutes ago'
  },
  {
    label: 'Active microsites',
    value: '142',
    delta: '+12 this week',
    trend: 'up',
    updatedAgo: '12 minutes ago'
  },
  {
    label: 'Support backlog',
    value: '3',
    delta: '-4 since yesterday',
    trend: 'down',
    updatedAgo: '35 minutes ago'
  },
  {
    label: 'Daily traffic',
    value: '18.4k',
    delta: '+9% week over week',
    trend: 'up',
    updatedAgo: '5 minutes ago'
  }
]

const pendingProfiles: PendingProfile[] = [
  {
    id: 'pending-1',
    displayName: 'Triveni Modular Kitchens',
    category: 'Interior & Carpentry',
    submittedAgo: '2 hours ago'
  },
  {
    id: 'pending-2',
    displayName: 'Sagar Digital Studios',
    category: 'Printing & Branding',
    submittedAgo: '4 hours ago'
  },
  {
    id: 'pending-3',
    displayName: 'Maheshwari Events Collective',
    category: 'Events & Decor',
    submittedAgo: 'yesterday'
  }
]

const signals: SignalItem[] = [
  {
    title: 'New high-traffic profile',
    message: 'Rakesh Furniture Works crossed 1,200 visits in the last 24 hours.',
    severity: 'success'
  },
  {
    title: 'Upcoming billing renewals',
    message: '7 Growth-tier subscriptions renew in 3 days—send reminders.',
    severity: 'warning'
  },
  {
    title: 'Customer happiness score',
    message: 'Daily NPS survey landed at 47 (above baseline).',
    severity: 'info'
  }
]

const latestSignups: SignupRow[] = [
  {
    id: 'signup-1',
    business: 'Goyal Heritage Decor',
    owner: 'Ritika Goyal',
    category: 'Events & Decor',
    status: 'PENDING_REVIEW',
    statusLabel: 'Pending review',
    joinedAgo: '30 minutes ago'
  },
  {
    id: 'signup-2',
    business: 'Khandelwal Fabrication',
    owner: 'Amit Khandelwal',
    category: 'Interior & Carpentry',
    status: 'APPROVED',
    statusLabel: 'Approved',
    joinedAgo: '3 hours ago'
  },
  {
    id: 'signup-3',
    business: 'Sharma Print Hub',
    owner: 'Nisha Sharma',
    category: 'Printing & Branding',
    status: 'DRAFT',
    statusLabel: 'Draft',
    joinedAgo: 'yesterday'
  }
]

useHead({
  title: 'Super admin dashboard • Jangid Connect'
})

definePageMeta({
  middleware: ['super-admin']
})
</script>
