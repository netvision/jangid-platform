# Dashboard Shell Implementation Plan

_Last updated: 2025-10-09_

## Goals (Sprint 1)
- Provide authenticated users a `/dashboard` area with consistent navigation and guards.
- Surface quick status (profile approval, microsite link) and editable content forms (headline, summary, services, contact).
- Integrate API data via a dedicated Pinia profile store.

## Layout & Navigation
- **Layout file:** `layouts/dashboard.vue`
  - Sticky sidebar with logo, navigation links (Overview, Content, Theme, Domain).
  - Top bar containing user avatar placeholder, "View microsite" button, logout action.
  - Main content slot for route pages.
- **Middleware:** reuse existing `authenticated` middleware; apply to `/dashboard/**` routes with route meta `requiresAuth: true`.
- **Routes:**
  - `pages/dashboard/index.vue` → Overview (default)
  - `pages/dashboard/content.vue`
  - `pages/dashboard/theme.vue`
  - `pages/dashboard/domain.vue`

## Data Flow
- **Store:** `stores/profile.ts`
  - State: `profile`, `status`, `loading`, `error`.
  - Actions: `fetchProfile()`, `updateProfile(payload)`, `selectTheme(themeId, config)`.
  - Uses new endpoints `GET /profiles/me`, `PATCH /profiles/me`, `GET /themes`.
- **SSR Handling:** Call `useAsyncData` in top-level dashboard pages to preload profile, or run `profileStore.ensure()` in `setup`.
- **Error states:** If 404 from API, route to onboarding placeholder; if 401, middleware will redirect to login.

## Page Responsibilities
- **Overview:** show status badge, call-to-action list, metrics placeholders, "View microsite" link (constructed from slug).
- **Content:** form sections for headline, summary, services (tag input), contact details; Save button wired to `updateProfile`.
- **Theme:** theme cards fetched via store; allow selection with optimistic update.
- **Domain:** read-only display of subdomain, publish status banner, future custom domain placeholder.

## Component Breakdown
- `components/dashboard/DashboardSidebar.vue`
- `components/dashboard/DashboardTopbar.vue`
- `components/dashboard/StatusBadge.vue`
- `components/dashboard/ThemeCard.vue`
- `components/dashboard/FormSection.vue`

(Components can be introduced incrementally; initial pass may keep them inline until refined.)

## Styling & UX
- Tailwind utilities with shared palette.
- Use `useHead` to set dashboard page titles.
- Provide toast/alert feedback on profile updates (Nuxt `useToast` or custom composable in later work).

## Validation & Testing
- Run `npm run typecheck --workspace @jangid/web` after implementation.
- Add a basic Cypress/Vitest flow later (post-MVP).
