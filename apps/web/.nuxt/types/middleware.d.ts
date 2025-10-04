import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "authenticated" | "super-admin"
declare module 'nuxt/app' {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}