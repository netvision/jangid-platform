import { z } from 'zod'

export const categorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().nullable().optional()
})

export const categoriesResponseSchema = z.array(categorySchema)

export type Category = z.infer<typeof categorySchema>
export type CategoryList = z.infer<typeof categoriesResponseSchema>
