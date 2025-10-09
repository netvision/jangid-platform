import { z } from 'zod'
import { siteModeSchema } from './profile'

export const profileStatusSchema = z.enum(['DRAFT', 'PENDING_REVIEW', 'APPROVED', 'SUSPENDED'])

export const adminProfileSchema = z.object({
  id: z.string(),
  slug: z.string(),
  displayName: z.string(),
  headline: z.string().nullable(),
  summary: z.string().nullable(),
  status: profileStatusSchema,
  mode: siteModeSchema,
  categoryId: z.string().nullable(),
  categoryName: z.string().nullable(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    phone: z.string().nullable(),
    isApproved: z.boolean()
  }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
})

export const adminProfilesResponseSchema = z.object({
  profiles: z.array(adminProfileSchema)
})

export const approveProfileSchema = z.object({
  approve: z.boolean(),
  reason: z.string().optional()
})

export type AdminProfile = z.infer<typeof adminProfileSchema>
export type AdminProfilesResponse = z.infer<typeof adminProfilesResponseSchema>
export type ApproveProfile = z.infer<typeof approveProfileSchema>
