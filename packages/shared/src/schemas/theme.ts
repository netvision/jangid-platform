import { z } from 'zod'

export const themeConfigSchema = z.record(z.string(), z.unknown()).catch(() => ({}))

export const themeSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  thumbnail: z.string().url().nullable(),
  configSchema: themeConfigSchema
})

export const themesResponseSchema = z.object({
  themes: z.array(themeSchema)
})

export type ThemeResponse = z.infer<typeof themeSchema>
export type ThemesResponse = z.infer<typeof themesResponseSchema>
