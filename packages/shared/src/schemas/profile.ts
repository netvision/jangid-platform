import { z } from 'zod'

export const siteModeSchema = z.enum(['CARD', 'BROCHURE'])

export const profileSectionSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  mediaUrl: z.string().url().optional(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().url().optional(),
  order: z.number().int().nonnegative()
})

export const profileSchema = z.object({
  id: z.string().cuid().optional(),
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters')
    .regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers, and hyphen allowed'),
  displayName: z.string().min(2, 'Display name is required'),
  headline: z.string().max(120).optional(),
  summary: z.string().max(600).optional(),
  mode: siteModeSchema.default('CARD'),
  categorySlug: z.string().optional(),
  themeSlug: z.string().optional(),
  socialLinks: z.record(z.string(), z.string().url()).default({}),
  sections: z.array(profileSectionSchema).default([])
})

export type ProfileInput = z.infer<typeof profileSchema>
export type ProfileSectionInput = z.infer<typeof profileSectionSchema>
export type SiteMode = z.infer<typeof siteModeSchema>
