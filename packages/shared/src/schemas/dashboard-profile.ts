import { z } from 'zod'
import { siteModeSchema } from './profile.js'
import { themeSchema } from './theme.js'

export const dashboardProfileSchema = z.object({
  id: z.string(),
  slug: z.string(),
  displayName: z.string(),
  headline: z.string().nullable(),
  summary: z.string().nullable(),
  status: z.enum(['DRAFT', 'PENDING_REVIEW', 'APPROVED', 'SUSPENDED']),
  mode: siteModeSchema,
  themeId: z.string().nullable(),
  themeConfig: z.record(z.string(), z.unknown()).catch(() => ({})),
  contact: z.object({
    email: z.string().email().nullable(),
    phone: z.string().nullable(),
    website: z.string().nullable(),
    address: z.string().nullable()
  }),
  services: z.array(z.string()),
  sections: z.record(z.string(), z.unknown()).catch(() => ({})),
  metrics: z.object({
    views30d: z.number(),
    enquiries30d: z.number()
  }),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date())
})

export const dashboardProfileResponseSchema = z.object({
  profile: dashboardProfileSchema,
  user: z.object({
    id: z.string(),
    email: z.string().email(),
    isApproved: z.boolean()
  })
})

export type DashboardProfile = z.infer<typeof dashboardProfileSchema>
export type DashboardProfileResponse = z.infer<typeof dashboardProfileResponseSchema>
export type ThemeSummary = z.infer<typeof themeSchema>
