import { z } from 'zod'

export const metricCardSchema = z.object({
  label: z.string(),
  value: z.string(),
  delta: z.string(),
  trend: z.enum(['up', 'down', 'neutral']).default('neutral'),
  updatedAgo: z.string()
})

export const pendingProfileCardSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  category: z.string(),
  submittedAgo: z.string(),
  contactEmail: z.string().email().optional(),
  phone: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium')
})

export const signalItemSchema = z.object({
  title: z.string(),
  message: z.string(),
  severity: z.enum(['info', 'success', 'warning'])
})

export const signupRowSchema = z.object({
  id: z.string(),
  business: z.string(),
  owner: z.string(),
  category: z.string(),
  status: z.enum(['APPROVED', 'PENDING_REVIEW', 'DRAFT']),
  statusLabel: z.string(),
  joinedAgo: z.string()
})

export const quickActionSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  href: z.string(),
  ctaLabel: z.string(),
  tone: z.enum(['primary', 'neutral', 'destructive']).default('primary')
})

export const healthCheckSchema = z.object({
  id: z.string(),
  label: z.string(),
  status: z.enum(['pass', 'warn', 'fail']).default('pass'),
  message: z.string(),
  updatedAgo: z.string()
})

export const activityItemSchema = z.object({
  id: z.string(),
  actor: z.string(),
  action: z.string(),
  target: z.string(),
  timestampAgo: z.string(),
  severity: z.enum(['info', 'success', 'warning']),
  icon: z.string().optional()
})

export const superAdminDashboardSchema = z.object({
  generatedAt: z.string(),
  metrics: z.array(metricCardSchema),
  pendingProfiles: z.array(pendingProfileCardSchema),
  signals: z.array(signalItemSchema),
  latestSignups: z.array(signupRowSchema),
  quickActions: z.array(quickActionSchema),
  healthChecks: z.array(healthCheckSchema),
  recentActivity: z.array(activityItemSchema)
})

export type MetricCard = z.infer<typeof metricCardSchema>
export type PendingProfileCard = z.infer<typeof pendingProfileCardSchema>
export type SignalItem = z.infer<typeof signalItemSchema>
export type SignupRow = z.infer<typeof signupRowSchema>
export type QuickAction = z.infer<typeof quickActionSchema>
export type HealthCheck = z.infer<typeof healthCheckSchema>
export type ActivityItem = z.infer<typeof activityItemSchema>
export type SuperAdminDashboard = z.infer<typeof superAdminDashboardSchema>
