import { z } from 'zod';
import { d as defineEventHandler } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

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
z.object({
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
var categorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().nullable().optional()
});
z.array(categorySchema);
var metricCardSchema = z.object({
  label: z.string(),
  value: z.string(),
  delta: z.string(),
  trend: z.enum(["up", "down", "neutral"]).default("neutral"),
  updatedAgo: z.string()
});
var pendingProfileCardSchema = z.object({
  id: z.string(),
  displayName: z.string(),
  category: z.string(),
  submittedAgo: z.string(),
  contactEmail: z.string().email().optional(),
  phone: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium")
});
var signalItemSchema = z.object({
  title: z.string(),
  message: z.string(),
  severity: z.enum(["info", "success", "warning"])
});
var signupRowSchema = z.object({
  id: z.string(),
  business: z.string(),
  owner: z.string(),
  category: z.string(),
  status: z.enum(["APPROVED", "PENDING_REVIEW", "DRAFT"]),
  statusLabel: z.string(),
  joinedAgo: z.string()
});
var quickActionSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  href: z.string(),
  ctaLabel: z.string(),
  tone: z.enum(["primary", "neutral", "destructive"]).default("primary")
});
var healthCheckSchema = z.object({
  id: z.string(),
  label: z.string(),
  status: z.enum(["pass", "warn", "fail"]).default("pass"),
  message: z.string(),
  updatedAgo: z.string()
});
var activityItemSchema = z.object({
  id: z.string(),
  actor: z.string(),
  action: z.string(),
  target: z.string(),
  timestampAgo: z.string(),
  severity: z.enum(["info", "success", "warning"]),
  icon: z.string().optional()
});
var superAdminDashboardSchema = z.object({
  generatedAt: z.string(),
  metrics: z.array(metricCardSchema),
  pendingProfiles: z.array(pendingProfileCardSchema),
  signals: z.array(signalItemSchema),
  latestSignups: z.array(signupRowSchema),
  quickActions: z.array(quickActionSchema),
  healthChecks: z.array(healthCheckSchema),
  recentActivity: z.array(activityItemSchema)
});

const dashboard_get = defineEventHandler(() => {
  const response = {
    generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    metrics: [
      {
        label: "Pending approvals",
        value: "6",
        delta: "+2 vs last week",
        trend: "up",
        updatedAgo: "8 minutes ago"
      },
      {
        label: "Active microsites",
        value: "142",
        delta: "+12 this week",
        trend: "up",
        updatedAgo: "12 minutes ago"
      },
      {
        label: "Support backlog",
        value: "3",
        delta: "-4 since yesterday",
        trend: "down",
        updatedAgo: "35 minutes ago"
      },
      {
        label: "Daily traffic",
        value: "18.4k",
        delta: "+9% week over week",
        trend: "up",
        updatedAgo: "5 minutes ago"
      }
    ],
    pendingProfiles: [
      {
        id: "pending-1",
        displayName: "Triveni Modular Kitchens",
        category: "Interior & Carpentry",
        submittedAgo: "2 hours ago",
        contactEmail: "hello@trivenimodular.in",
        phone: "+91 98765 43210",
        priority: "high"
      },
      {
        id: "pending-2",
        displayName: "Sagar Digital Studios",
        category: "Printing & Branding",
        submittedAgo: "4 hours ago",
        contactEmail: "team@sagardigital.in",
        phone: "+91 99887 66775",
        priority: "medium"
      },
      {
        id: "pending-3",
        displayName: "Maheshwari Events Collective",
        category: "Events & Decor",
        submittedAgo: "yesterday",
        contactEmail: "crew@maheshwarievents.in",
        phone: "+91 98111 22334",
        priority: "low"
      }
    ],
    signals: [
      {
        title: "New high-traffic profile",
        message: "Rakesh Furniture Works crossed 1,200 visits in the last 24 hours.",
        severity: "success"
      },
      {
        title: "Upcoming billing renewals",
        message: "7 Growth-tier subscriptions renew in 3 days\u2014send reminders.",
        severity: "warning"
      },
      {
        title: "Customer happiness score",
        message: "Daily NPS survey landed at 47 (above baseline).",
        severity: "info"
      }
    ],
    latestSignups: [
      {
        id: "signup-1",
        business: "Goyal Heritage Decor",
        owner: "Ritika Goyal",
        category: "Events & Decor",
        status: "PENDING_REVIEW",
        statusLabel: "Pending review",
        joinedAgo: "30 minutes ago"
      },
      {
        id: "signup-2",
        business: "Khandelwal Fabrication",
        owner: "Amit Khandelwal",
        category: "Interior & Carpentry",
        status: "APPROVED",
        statusLabel: "Approved",
        joinedAgo: "3 hours ago"
      },
      {
        id: "signup-3",
        business: "Sharma Print Hub",
        owner: "Nisha Sharma",
        category: "Printing & Branding",
        status: "DRAFT",
        statusLabel: "Draft",
        joinedAgo: "yesterday"
      }
    ],
    quickActions: [
      {
        id: "review-backlog",
        label: "Review approval backlog",
        description: "Jump straight into the approval queue and clear high-priority requests first.",
        href: "/dashboard",
        ctaLabel: "Open approvals",
        tone: "primary"
      },
      {
        id: "broadcast-update",
        label: "Post a community update",
        description: "Share a spotlight, funding update, or collective milestone with members.",
        href: "/dashboard/highlights",
        ctaLabel: "Compose update",
        tone: "neutral"
      },
      {
        id: "escalate-support",
        label: "Escalate support tickets",
        description: "Flag unresolved tickets that have waited over 12 hours for a response.",
        href: "/dashboard/support",
        ctaLabel: "View tickets",
        tone: "destructive"
      }
    ],
    healthChecks: [
      {
        id: "uptime",
        label: "Platform uptime",
        status: "pass",
        message: "99.98% over the last 30 days",
        updatedAgo: "12 minutes ago"
      },
      {
        id: "payments",
        label: "Payments pipeline",
        status: "warn",
        message: "2 settlements pending reconciliation",
        updatedAgo: "18 minutes ago"
      },
      {
        id: "email",
        label: "Transactional email",
        status: "pass",
        message: "All providers responding normally",
        updatedAgo: "5 minutes ago"
      }
    ],
    recentActivity: [
      {
        id: "activity-1",
        actor: "Anita Sharma",
        action: "approved",
        target: "Maheshwari Events Collective",
        timestampAgo: "18 minutes ago",
        severity: "success",
        icon: "i-heroicons-check-circle-20-solid"
      },
      {
        id: "activity-2",
        actor: "Platform monitor",
        action: "flagged",
        target: "High retry error rate on SMTP provider",
        timestampAgo: "1 hour ago",
        severity: "warning",
        icon: "i-heroicons-exclamation-triangle-20-solid"
      },
      {
        id: "activity-3",
        actor: "Govind Patel",
        action: "invited",
        target: "Rajasthan Arts Collective",
        timestampAgo: "2 hours ago",
        severity: "info",
        icon: "i-heroicons-user-plus-20-solid"
      }
    ]
  };
  return superAdminDashboardSchema.parse(response);
});

export { dashboard_get as default };
//# sourceMappingURL=dashboard.get.mjs.map
