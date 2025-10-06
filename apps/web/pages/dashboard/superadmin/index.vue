<template>
  <section class="space-y-10">
    <header class="flex flex-wrap items-start justify-between gap-6">
      <div class="space-y-2">
        <p class="text-xs uppercase tracking-widest text-muted-foreground">Super admin</p>
        <h1 class="text-3xl font-semibold">Control center</h1>
        <p class="text-sm text-muted-foreground">
          Review pending profiles, monitor platform health, and onboard the wider Jangid collective.
        </p>
      </div>
      <div class="flex flex-col items-end gap-2 text-sm">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-medium transition hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="pending"
          @click="refresh()"
        >
          <span class="i-heroicons-arrow-path-20-solid" :class="pending ? 'animate-spin text-primary' : 'text-muted-foreground'" aria-hidden="true" />
          Refresh data
        </button>
        <p class="text-xs text-muted-foreground">{{ lastGeneratedText }}</p>
      </div>
    </header>

    <div
      v-if="error"
      class="rounded-2xl border border-rose-200 bg-rose-50/70 p-6 text-sm text-rose-700 shadow-sm"
    >
      <div class="flex flex-wrap items-center gap-3">
        <span class="i-heroicons-exclamation-triangle-20-solid text-rose-500" aria-hidden="true" />
        <p>We couldn’t load the latest dashboard data. Check connectivity or try again.</p>
        <button
          type="button"
          class="ml-auto inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          @click="refresh()"
        >
          Retry
        </button>
      </div>
    </div>

    <template v-else>
      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <template v-if="pending && !metrics.length">
          <article
            v-for="index in 4"
            :key="`metric-skeleton-${index}`"
            class="animate-pulse rounded-2xl border border-border bg-background/60 p-5"
          >
            <div class="h-3 w-24 rounded bg-muted" />
            <div class="mt-4 flex items-baseline gap-3">
              <div class="h-7 w-20 rounded bg-muted" />
              <div class="h-4 w-16 rounded bg-muted/80" />
            </div>
            <div class="mt-3 h-3 w-32 rounded bg-muted" />
          </article>
        </template>
        <article
          v-for="metric in metrics"
          :key="metric.label"
          class="rounded-2xl border border-border bg-background/80 p-5 shadow-sm transition hover:border-primary/40"
        >
          <p class="text-xs uppercase tracking-wide text-muted-foreground">{{ metric.label }}</p>
          <div class="mt-3 flex items-baseline gap-2">
            <span class="text-3xl font-semibold">{{ metric.value }}</span>
            <span
              :class="[
                'inline-flex items-center gap-1 text-xs font-medium',
                metric.trend === 'up'
                  ? 'text-emerald-600'
                  : metric.trend === 'down'
                    ? 'text-rose-600'
                    : 'text-muted-foreground'
              ]"
            >
              <span
                v-if="metric.trend !== 'neutral'"
                :class="[
                  'i-heroicons-arrow-trending-up-20-solid',
                  metric.trend === 'down' ? 'rotate-180' : ''
                ]"
                aria-hidden="true"
              />
              {{ metric.delta }}
            </span>
          </div>
          <p class="mt-2 text-xs text-muted-foreground">Updated {{ metric.updatedAgo }}</p>
        </article>
      </div>

      <div class="grid gap-6 xl:grid-cols-[2fr,1fr]">
        <section class="space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm">
          <header class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 class="text-lg font-semibold">Profiles awaiting review</h2>
              <p class="text-sm text-muted-foreground">Prioritize approvals to keep creators moving.</p>
            </div>
            <NuxtLink to="/dashboard" class="text-sm font-medium text-primary hover:underline">Go to profiles</NuxtLink>
          </header>
          <ul class="divide-y divide-border text-sm">
            <template v-if="pending && !pendingProfiles.length">
              <li v-for="index in 3" :key="`pending-skeleton-${index}`" class="animate-pulse py-4">
                <div class="h-4 w-48 rounded bg-muted" />
                <div class="mt-3 h-3 w-32 rounded bg-muted/70" />
              </li>
            </template>
            <li
              v-for="profile in pendingProfiles"
              :key="profile.id"
              class="flex flex-wrap items-start justify-between gap-3 py-4"
            >
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <p class="font-medium">{{ profile.displayName }}</p>
                  <span
                    :class="['inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide', priorityClasses[profile.priority]]"
                  >
                    {{ priorityLabels[profile.priority] }}
                  </span>
                </div>
                <p class="text-xs text-muted-foreground">
                  Submitted {{ profile.submittedAgo }} • {{ profile.category }}
                </p>
                <p v-if="profile.contactEmail || profile.phone" class="text-xs text-muted-foreground">
                  <span v-if="profile.contactEmail">{{ profile.contactEmail }}</span>
                  <span v-if="profile.contactEmail && profile.phone" class="mx-1">•</span>
                  <span v-if="profile.phone">{{ profile.phone }}</span>
                </p>
              </div>
              <div class="flex flex-wrap items-center gap-3 text-xs">
                <button
                  type="button"
                  class="rounded-md border border-border px-3 py-1.5 font-medium transition hover:bg-background"
                >
                  Request edits
                </button>
                <button
                  type="button"
                  class="rounded-md bg-primary px-3 py-1.5 font-medium text-white transition hover:bg-primary/90"
                >
                  Approve
                </button>
              </div>
            </li>
            <li v-if="!pendingProfiles.length && !pending" class="py-6 text-center text-sm text-muted-foreground">
              All caught up! No pending submissions right now.
            </li>
          </ul>
        </section>

        <div class="space-y-6">
          <section class="space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm">
            <header class="flex items-center justify-between">
              <h2 class="text-lg font-semibold">Quick actions</h2>
              <span class="text-xs text-muted-foreground">Suggested workflows</span>
            </header>
            <ul class="space-y-3 text-sm">
              <li
                v-for="action in quickActions"
                :key="action.id"
                class="rounded-xl border border-border/60 bg-background/60 p-4"
              >
                <div class="flex flex-col gap-3">
                  <div>
                    <p class="font-medium text-foreground">{{ action.label }}</p>
                    <p class="text-xs text-muted-foreground">{{ action.description }}</p>
                  </div>
                  <NuxtLink
                    :to="action.href"
                    class="inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold shadow-sm focus-visible:outline-none focus-visible:ring-2"
                    :class="quickActionToneClasses[action.tone]"
                  >
                    {{ action.ctaLabel }}
                    <span class="i-heroicons-arrow-up-right-20-solid" aria-hidden="true" />
                  </NuxtLink>
                </div>
              </li>
              <li v-if="!quickActions.length" class="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                Define automation playbooks to surface quick actions here.
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
              <li v-if="!signals.length" class="rounded-xl border border-dashed border-border p-6 text-center text-xs">
                No alerts raised in the last 24 hours.
              </li>
            </ul>
          </section>

          <section class="space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm">
            <header class="flex items-center justify-between">
              <h2 class="text-lg font-semibold">System health</h2>
              <span class="text-xs text-muted-foreground">Realtime</span>
            </header>
            <ul class="space-y-3 text-sm">
              <li
                v-for="check in healthChecks"
                :key="check.id"
                class="flex items-start justify-between gap-3 rounded-xl border border-border/60 bg-background/60 p-4"
              >
                <div>
                  <p class="font-medium text-foreground">{{ check.label }}</p>
                  <p class="text-xs text-muted-foreground">{{ check.message }}</p>
                  <p class="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">Updated {{ check.updatedAgo }}</p>
                </div>
                <span
                  :class="[
                    'inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide',
                    check.status === 'pass'
                      ? 'bg-emerald-100 text-emerald-600'
                      : check.status === 'warn'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-rose-100 text-rose-600'
                  ]"
                >
                  <span
                    :class="[
                      'h-2 w-2 rounded-full',
                      check.status === 'pass'
                        ? 'bg-emerald-500'
                        : check.status === 'warn'
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                    ]"
                  />
                  {{ check.status === 'pass' ? 'healthy' : check.status === 'warn' ? 'attention' : 'issue' }}
                </span>
              </li>
              <li v-if="!healthChecks.length" class="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                Connect monitoring to surface runtime health here.
              </li>
            </ul>
          </section>
        </div>
      </div>

      <div class="grid gap-6 xl:grid-cols-[2fr,1fr]">
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

        <section class="space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm">
          <header class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">Recent platform activity</h2>
            <span class="text-xs text-muted-foreground">Live feed</span>
          </header>
          <ol class="space-y-4 text-sm">
            <li v-for="item in activityItems" :key="item.id" class="flex items-start gap-3">
              <span
                :class="[
                  item.icon || 'i-heroicons-sparkles-20-solid',
                  'mt-1',
                  activitySeverityClasses[item.severity]
                ]"
                aria-hidden="true"
              />
              <div class="space-y-1">
                <p class="font-medium text-foreground">
                  {{ item.actor }} {{ item.action }} <span class="text-muted-foreground">{{ item.target }}</span>
                </p>
                <p class="text-xs text-muted-foreground">{{ item.timestampAgo }}</p>
              </div>
            </li>
            <li v-if="!activityItems.length" class="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
              Activity will appear here as your team makes changes across the platform.
            </li>
          </ol>
        </section>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAsyncData, useHead } from '#imports'
import { $fetch } from 'ofetch'
import {
  superAdminDashboardSchema,
  type SuperAdminDashboard,
  type MetricCard,
  type PendingProfileCard,
  type QuickAction,
  type HealthCheck,
  type ActivityItem,
  type SignalItem,
  type SignupRow
} from '@jangid/shared'

const { data, pending, error, refresh } = await useAsyncData('super-admin-dashboard', async () => {
  const response = await $fetch('/api/super-admin/dashboard')
  return superAdminDashboardSchema.parse(response)
})

const dashboard = computed<SuperAdminDashboard | null>(() => data.value ?? null)

const metrics = computed<MetricCard[]>(() => dashboard.value?.metrics ?? [])
const pendingProfiles = computed<PendingProfileCard[]>(() => dashboard.value?.pendingProfiles ?? [])
const signals = computed<SignalItem[]>(() => dashboard.value?.signals ?? [])
const latestSignups = computed<SignupRow[]>(() => dashboard.value?.latestSignups ?? [])
const quickActions = computed<QuickAction[]>(() => dashboard.value?.quickActions ?? [])
const healthChecks = computed<HealthCheck[]>(() => dashboard.value?.healthChecks ?? [])
const activityItems = computed<ActivityItem[]>(() => dashboard.value?.recentActivity ?? [])

const priorityLabels: Record<PendingProfileCard['priority'], string> = {
  high: 'High priority',
  medium: 'Medium priority',
  low: 'Low priority'
}

const priorityClasses: Record<PendingProfileCard['priority'], string> = {
  high: 'bg-rose-100 text-rose-600 border border-rose-200',
  medium: 'bg-amber-100 text-amber-600 border border-amber-200',
  low: 'bg-emerald-100 text-emerald-600 border border-emerald-200'
}

const quickActionToneClasses: Record<QuickAction['tone'], string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/70',
  neutral: 'bg-muted text-foreground hover:bg-muted/80 focus-visible:ring-muted-foreground/30',
  destructive: 'bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500/70'
}

const activitySeverityClasses: Record<ActivityItem['severity'], string> = {
  info: 'text-sky-500',
  success: 'text-emerald-500',
  warning: 'text-amber-500'
}

const lastGeneratedText = computed(() => {
  if (pending.value) {
    return 'Syncing latest data...'
  }
  const timestamp = dashboard.value?.generatedAt
  if (!timestamp) {
    return 'Awaiting first sync'
  }
  const formatted = new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit'
  }).format(new Date(timestamp))
  return `Last synced at ${formatted}`
})

useHead({
  title: 'Super admin dashboard • Jangid Connect'
})

definePageMeta({
  middleware: ['super-admin']
})
</script>
