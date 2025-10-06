import { o as executeAsync } from '../nitro/nitro.mjs';
import { e as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import { u as useAuthStore } from './auth-B72_8ogk.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const authenticated = defineNuxtRouteMiddleware(async (to) => {
  let __temp, __restore;
  const auth = useAuthStore();
  if (!auth.accessToken || !auth.refreshToken) {
    return navigateTo({ path: "/auth/login", query: { redirect: to.fullPath } });
  }
  if (!auth.user) {
    try {
      ;
      [__temp, __restore] = executeAsync(() => auth.fetchCurrentUser()), await __temp, __restore();
      ;
    } catch (error) {
      console.warn("failed to fetch user", error);
      return navigateTo({ path: "/auth/login", query: { redirect: to.fullPath } });
    }
  }
});

export { authenticated as default };
//# sourceMappingURL=authenticated-DbEqzUqY.mjs.map
