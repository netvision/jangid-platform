import { executeAsync } from "/Volumes/Untitled/dev/jangid/node_modules/unctx/dist/index.mjs";
import "vue";
import "/Volumes/Untitled/dev/jangid/node_modules/hookable/dist/index.mjs";
import { e as defineNuxtRouteMiddleware, n as navigateTo } from "../server.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/klona/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
import { u as useAuthStore } from "./auth-B72_8ogk.js";
import "ofetch";
import "/Volumes/Untitled/dev/jangid/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Volumes/Untitled/dev/jangid/node_modules/radix3/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/ufo/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/@unhead/vue/dist/index.mjs";
import "vue/server-renderer";
import "/Volumes/Untitled/dev/jangid/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/destr/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/ohash/dist/index.mjs";
const superAdmin = defineNuxtRouteMiddleware(async (to) => {
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
  if (auth.user?.role !== "SUPER_ADMIN") {
    return navigateTo("/dashboard");
  }
});
export {
  superAdmin as default
};
//# sourceMappingURL=super-admin-D3d2ZXB6.js.map
