# Jangid Microsite Platform Roadmap

_Last updated: 2025-10-08_

## Vision
Deliver a self-serve microsite experience for the Jangid community where artisans can register, claim a personalized subdomain, choose a theme, and manage their presence through a unified dashboard.

## Feature Pillars
- **User lifecycle:** Registration, authentication, session management, and approvals.
- **Microsite provisioning:** Automatic subdomain allocation, tenant routing, and profile publishing workflow.
- **Theme + content management:** Theme catalog, customizable sections, media uploads, and live preview.
- **Operations:** Admin approvals, analytics hooks, and infrastructure readiness for wildcard HTTPS.

## Current Foundation (2025-10)
- Nuxt 3 frontend with tenant-aware middleware and static profile templates.
- NestJS API with Prisma models for `User`, `Profile`, `Theme`, and session handling.
- Pinia store for authentication, login/register modals on the public site.
- Wildcard DNS + TLS (Certbot) configured for `*.jangid.co.in`.

## Phase Breakdown

### Phase 1 · Data Layer Enablement
- [ ] Extend Prisma schema & migrations for theme presets, profile sections, and contact fields.
- [ ] Seed starter themes/templates with preview thumbnails.
- [ ] Expose API endpoints for profile read/update and theme catalog.
- [ ] Enforce slug uniqueness + reserved words validation in service layer.

### Phase 2 · Tenant Microsite Delivery
- [ ] Replace static highlight dataset with live profile fetch in `profiles/[slug].vue`.
- [ ] SSR-friendly caching + 404 for unapproved or missing profiles.
- [ ] Render profile sections dynamically based on `Profile.sections` & theme config.
- [ ] Add contact CTA form hooking into backend (email or CRM integration placeholder).

### Phase 3 · User Dashboard
- [ ] Scaffold `/dashboard` layout with auth guard and tenant context.
- [ ] Build Overview, Content, Theme, and Domain tabs.
- [ ] Implement editable forms for headline, services, contact info, gallery.
- [ ] Support publish/unpublish workflows (toggle `Profile.status`).

### Phase 4 · Theme Management
- [ ] Theme selector UI with live preview + search.
- [ ] Allow theme-specific customization (colors, typography, layout toggles).
- [ ] Persist theme config in `Profile.themeId` and `Profile.sections` metadata.

### Phase 5 · Subdomain & Login Experience
- [ ] Enhance auth modals to detect tenant slug and redirect to dashboard.
- [ ] Surface "Manage this site" CTA on microsites (conditional on ownership).
- [ ] Prepare for custom domain mapping (future) with alias support.

### Phase 6 · Operational Extras
- [ ] Transactional emails for signup, approval, and publish status changes.
- [ ] Activity logging & analytics events per tenant.
- [ ] Backups and CDN/storage strategy for media assets.

## Immediate Next Steps
1. Draft detailed API contracts for profile CRUD and theme listing endpoints.
2. Scaffold Prisma migrations + seed script for theme presets.
3. Update Nuxt profile page to fetch from API (graceful fallback while backend endpoints are built).
4. Design dashboard shell (routes, layout, navigation) with auth gating.

## Sprint 1 Backlog (Registration + Dashboard Foundation)
- **Backend**
	- [ ] Define contracts for `GET /profiles/me`, `PATCH /profiles/me`, `GET /themes` (OpenAPI or typed interfaces).
	- [ ] Implement profile service/controller methods with Prisma, including reserved slug validation and approval guards.
	- [ ] Seed initial themes (Classic Card, Modern Brochure) via Prisma seed script with config JSON and thumbnails.
- **Frontend**
	- [ ] Create `useProfileStore` (Pinia) to load/update profile data via new endpoints.
	- [ ] Scaffold `/dashboard` route group with layout, sidebar nav, and authenticated middleware hook.
	- [ ] Build Overview tab with profile status card, "View microsite" link, and next-step checklist.
	- [ ] Build Content tab forms for headline, summary, services, and contact info (bind to store, show save state).
	- [ ] Add Theme tab with theme grid, selection control, and preview placeholder.
- **UX & QA**
	- [ ] Display banner on dashboard when profile status is `PENDING_REVIEW` with guidance.
	- [ ] Improve registration error feedback for duplicate and reserved slugs.
	- [ ] Write integration smoke test covering register → login → dashboard redirect flow.

## Open Questions
- What approval criteria should flip a profile from `PENDING_REVIEW` to `APPROVED`?
- Preferred storage solution for media (Linode Object Storage, S3, or local uploads)?
- Email provider for transactional notifications (SendGrid, Postmark, etc.)?
- Analytics requirements: basic page views vs. tenant-level dashboards?

## Tracking & Review
Review progress during weekly standups; update this roadmap as phases complete or priorities shift.
