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
export {
  activityItemSchema,
  categoriesResponseSchema,
  categorySchema,
  healthCheckSchema,
  metricCardSchema,
  pendingProfileCardSchema,
  profileSchema,
  profileSectionSchema,
  quickActionSchema,
  signalItemSchema,
  signupRowSchema,
  siteModeSchema,
  superAdminDashboardSchema
};
