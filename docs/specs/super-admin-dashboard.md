# Super Admin Dashboard Plan

_Last updated: 2025-10-09_

## Objectives
- Provide super administrators with tools to curate platform content.
- Manage category catalog (create, edit, deactivate) used for member profiles.
- Review and moderate pending profiles, approving or rejecting with feedback.
- Maintain parity with existing auth and role guards.

## User Stories
- **Manage categories:** As a super admin, I can view all categories, add new ones, edit details, and deactivate categories not in use.
- **Approve profiles:** As a super admin, I can review pending profiles, inspect submitted details, approve them to go live, or reject with a note.
- **Dashboard overview:** As a super admin, I can see counts of pending approvals and quick links into moderation queues.

## Backend Scope
1. **Authorization Guarding**
   - Add `RolesGuard`/decorator usage to restrict new endpoints to `SUPER_ADMIN` role.

2. **Category Administration Endpoints** (`/admin/categories`)
   - `GET /admin/categories` → list with pagination + filter by status.
   - `POST /admin/categories` → create (name, slug, description, isActive).
   - `PATCH /admin/categories/:id` → update fields, including activation toggle.
   - Optional: `DELETE /admin/categories/:id` soft delete (flag `isActive = false`).

3. **Profile Moderation Endpoints** (`/admin/profiles`)
   - `GET /admin/profiles?status=pending` → list pending profiles with owner email.
   - `GET /admin/profiles/:id` → detailed view including submitted content.
   - `PATCH /admin/profiles/:id/approve` → approve profile, set status `APPROVED`, mark `isApproved=true` on user.
   - `PATCH /admin/profiles/:id/reject` → set status `REJECTED`, persist `moderatorNote`.
   - Optional: include `PATCH .../request-changes` for soft rejections.

4. **Shared Schemas**
   - Extend `@jangid/shared` with admin-specific Zod schemas for categories and profiles to keep front/back aligned.

5. **Seed Data Adjustments**
   - Ensure categories include `isActive` default true.
   - Confirm super admin user seeded with role and `isApproved: true`.

## Frontend Scope (Nuxt 3)
1. **Routing & Layout**
   - New layout `layouts/super-admin.vue` with side navigation (Overview, Categories, Approvals).
   - Middleware to enforce both `authenticated` and `super-admin` guard (already available in `middleware/super-admin.ts`).
   - Route structure under `pages/super-admin/*`.

2. **Stores / Composables**
   - `stores/adminCategories.ts`: fetch list, create/update actions, optimistic updates.
   - `stores/adminProfiles.ts`: fetch pending approvals, approve/reject operations.
   - Leverage new shared schemas for type safety.

3. **Pages & Components**
   - `pages/super-admin/index.vue`: quick stats, recent approvals, navigation cards.
   - `pages/super-admin/categories.vue`: table of categories with inline actions. Modal/drawer for create/edit.
   - `pages/super-admin/approvals.vue`: list of pending profiles, expandable detail drawer, approve/reject buttons.
   - Shared components: `AdminStatCard`, `AdminTable`, `ModerationActions`, `EditorNoteField`.

4. **UX Considerations**
   - Toast feedback on actions, disabled states while loading.
   - Confirmations before destructive operations (deactivate/reject).
   - Accessible forms with validation messages.

## Data Contracts
- **Category**
  - `{ id, name, slug, description, isActive, createdAt, updatedAt }`
- **ProfileModerationItem**
  - `{ id, displayName, slug, ownerEmail, status, submittedAt, services, contact, moderatorNote }`

## Delivery Strategy
1. Backend endpoints + shared schemas (Sprint 2 start).
2. Frontend layout & navigation.
3. Categories management UI & wiring.
4. Profile moderation UI & wiring.
5. QA: manual walkthrough, typecheck, targeted API tests (future automation).

## Open Questions
- Do we require audit logging for moderation decisions? (future enhancement)
- Should profile approval send notification emails? (not in scope for first release)
- Need pagination for large datasets? (plan to add basic pagination support in API/responses.)
