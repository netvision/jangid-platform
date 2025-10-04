// src/schemas/profile.ts
import { z } from "zod";
var siteModeSchema = z.enum(["CARD", "BROCHURE"]);
var profileSectionSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  mediaUrl: z.string().url().optional(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().url().optional(),
  order: z.number().int().nonnegative()
});
var profileSchema = z.object({
  id: z.string().cuid().optional(),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphen allowed"),
  displayName: z.string().min(2, "Display name is required"),
  headline: z.string().max(120).optional(),
  summary: z.string().max(600).optional(),
  mode: siteModeSchema.default("CARD"),
  categorySlug: z.string().optional(),
  themeSlug: z.string().optional(),
  socialLinks: z.record(z.string(), z.string().url()).default({}),
  sections: z.array(profileSectionSchema).default([])
});

// src/schemas/category.ts
import { z as z2 } from "zod";
var categorySchema = z2.object({
  id: z2.string().min(1),
  name: z2.string().min(1),
  slug: z2.string().min(1),
  description: z2.string().nullable().optional()
});
var categoriesResponseSchema = z2.array(categorySchema);
export {
  categoriesResponseSchema,
  categorySchema,
  profileSchema,
  profileSectionSchema,
  siteModeSchema
};
