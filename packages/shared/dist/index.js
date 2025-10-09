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

// src/schemas/super-admin-dashboard.ts
import { z as z3 } from "zod";
var metricCardSchema = z3.object({
  label: z3.string(),
  value: z3.string(),
  delta: z3.string(),
  trend: z3.enum(["up", "down", "neutral"]).default("neutral"),
  updatedAgo: z3.string()
});
var pendingProfileCardSchema = z3.object({
  id: z3.string(),
  displayName: z3.string(),
  category: z3.string(),
  submittedAgo: z3.string(),
  contactEmail: z3.string().email().optional(),
  phone: z3.string().optional(),
  priority: z3.enum(["low", "medium", "high"]).default("medium")
});
var signalItemSchema = z3.object({
  title: z3.string(),
  message: z3.string(),
  severity: z3.enum(["info", "success", "warning"])
});
var signupRowSchema = z3.object({
  id: z3.string(),
  business: z3.string(),
  owner: z3.string(),
  category: z3.string(),
  status: z3.enum(["APPROVED", "PENDING_REVIEW", "DRAFT"]),
  statusLabel: z3.string(),
  joinedAgo: z3.string()
});
var quickActionSchema = z3.object({
  id: z3.string(),
  label: z3.string(),
  description: z3.string(),
  href: z3.string(),
  ctaLabel: z3.string(),
  tone: z3.enum(["primary", "neutral", "destructive"]).default("primary")
});
var healthCheckSchema = z3.object({
  id: z3.string(),
  label: z3.string(),
  status: z3.enum(["pass", "warn", "fail"]).default("pass"),
  message: z3.string(),
  updatedAgo: z3.string()
});
var activityItemSchema = z3.object({
  id: z3.string(),
  actor: z3.string(),
  action: z3.string(),
  target: z3.string(),
  timestampAgo: z3.string(),
  severity: z3.enum(["info", "success", "warning"]),
  icon: z3.string().optional()
});
var superAdminDashboardSchema = z3.object({
  generatedAt: z3.string(),
  metrics: z3.array(metricCardSchema),
  pendingProfiles: z3.array(pendingProfileCardSchema),
  signals: z3.array(signalItemSchema),
  latestSignups: z3.array(signupRowSchema),
  quickActions: z3.array(quickActionSchema),
  healthChecks: z3.array(healthCheckSchema),
  recentActivity: z3.array(activityItemSchema)
});

// src/schemas/theme.ts
import { z as z4 } from "zod";
var themeConfigSchema = z4.record(z4.string(), z4.unknown()).catch(() => ({}));
var themeSchema = z4.object({
  id: z4.string(),
  slug: z4.string(),
  name: z4.string(),
  description: z4.string().nullable(),
  thumbnail: z4.string().url().nullable(),
  configSchema: themeConfigSchema
});
var themesResponseSchema = z4.object({
  themes: z4.array(themeSchema)
});

// src/schemas/dashboard-profile.ts
import { z as z5 } from "zod";
var dashboardProfileSchema = z5.object({
  id: z5.string(),
  slug: z5.string(),
  displayName: z5.string(),
  headline: z5.string().nullable(),
  summary: z5.string().nullable(),
  status: z5.enum(["DRAFT", "PENDING_REVIEW", "APPROVED", "SUSPENDED"]),
  mode: siteModeSchema,
  themeId: z5.string().nullable(),
  themeConfig: z5.record(z5.string(), z5.unknown()).catch(() => ({})),
  contact: z5.object({
    email: z5.string().email().nullable(),
    phone: z5.string().nullable(),
    website: z5.string().nullable(),
    address: z5.string().nullable()
  }),
  services: z5.array(z5.string()),
  sections: z5.record(z5.string(), z5.unknown()).catch(() => ({})),
  metrics: z5.object({
    views30d: z5.number(),
    enquiries30d: z5.number()
  }),
  createdAt: z5.string().or(z5.date()),
  updatedAt: z5.string().or(z5.date())
});
var dashboardProfileResponseSchema = z5.object({
  profile: dashboardProfileSchema,
  user: z5.object({
    id: z5.string(),
    email: z5.string().email(),
    isApproved: z5.boolean()
  })
});

// src/schemas/admin-category.ts
import { z as z6 } from "zod";
var adminCategorySchema = z6.object({
  id: z6.string(),
  name: z6.string(),
  slug: z6.string(),
  description: z6.string().nullable(),
  isActive: z6.boolean(),
  createdAt: z6.string().datetime({ offset: true }),
  updatedAt: z6.string().datetime({ offset: true })
});
var adminCategoriesResponseSchema = z6.object({
  categories: z6.array(adminCategorySchema)
});

// src/schemas/admin-profile.ts
import { z as z7 } from "zod";
var profileStatusSchema = z7.enum(["DRAFT", "PENDING_REVIEW", "APPROVED", "SUSPENDED"]);
var adminProfileSchema = z7.object({
  id: z7.string(),
  slug: z7.string(),
  displayName: z7.string(),
  headline: z7.string().nullable(),
  summary: z7.string().nullable(),
  status: profileStatusSchema,
  mode: siteModeSchema,
  categoryId: z7.string().nullable(),
  categoryName: z7.string().nullable(),
  user: z7.object({
    id: z7.string(),
    email: z7.string(),
    phone: z7.string().nullable(),
    isApproved: z7.boolean()
  }),
  createdAt: z7.coerce.date(),
  updatedAt: z7.coerce.date()
});
var adminProfilesResponseSchema = z7.object({
  profiles: z7.array(adminProfileSchema)
});
var approveProfileSchema = z7.object({
  approve: z7.boolean(),
  reason: z7.string().optional()
});
export {
  activityItemSchema,
  adminCategoriesResponseSchema,
  adminCategorySchema,
  adminProfileSchema,
  adminProfilesResponseSchema,
  approveProfileSchema,
  categoriesResponseSchema,
  categorySchema,
  dashboardProfileResponseSchema,
  dashboardProfileSchema,
  healthCheckSchema,
  metricCardSchema,
  pendingProfileCardSchema,
  profileSchema,
  profileSectionSchema,
  profileStatusSchema,
  quickActionSchema,
  signalItemSchema,
  signupRowSchema,
  siteModeSchema,
  superAdminDashboardSchema,
  themeConfigSchema,
  themeSchema,
  themesResponseSchema
};
