import { z } from 'zod'

export const adminCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  isActive: z.boolean(),
  createdAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true })
})

export const adminCategoriesResponseSchema = z.object({
  categories: z.array(adminCategorySchema)
})

export type AdminCategory = z.infer<typeof adminCategorySchema>
export type AdminCategoriesResponse = z.infer<typeof adminCategoriesResponseSchema>
