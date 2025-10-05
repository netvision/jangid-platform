import { _ as __nuxt_component_0 } from "./nuxt-link-FzQk3-Qr.js";
import { defineComponent, reactive, watchEffect, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import { s as storeToRefs } from "../server.mjs";
import { useRouter, useRoute } from "vue-router";
import { u as useAuthStore } from "./auth-B72_8ogk.js";
import "/Volumes/Untitled/dev/jangid/node_modules/ufo/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/Volumes/Untitled/dev/jangid/node_modules/hookable/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/unctx/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/h3/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/radix3/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/defu/dist/defu.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/klona/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/@unhead/vue/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/destr/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/ohash/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const auth = useAuthStore();
    const { loading, error, isAuthenticated } = storeToRefs(auth);
    const form = reactive({
      email: "",
      password: ""
    });
    watchEffect(() => {
      if (isAuthenticated.value) {
        navigateAfterAuth();
      }
    });
    function navigateAfterAuth() {
      const redirect = route.query.redirect || "/dashboard";
      router.push(redirect);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-lg space-y-6" }, _attrs))}><h1 class="text-2xl font-semibold">Login to your dashboard</h1><p class="text-sm text-muted-foreground"> Access your profile, manage content, and customize your public microsite. </p><form class="space-y-4"><div class="space-y-2"><label class="text-sm font-medium" for="email">Email</label><input id="email"${ssrRenderAttr("value", form.email)} type="email" required autocomplete="email" class="w-full rounded-md border border-border bg-background px-3 py-2"></div><div class="space-y-2"><label class="text-sm font-medium" for="password">Password</label><input id="password"${ssrRenderAttr("value", form.password)} type="password" required autocomplete="current-password" class="w-full rounded-md border border-border bg-background px-3 py-2"></div>`);
      if (unref(error)) {
        _push(`<p class="text-sm text-red-500">${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="w-full rounded-md bg-primary px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}>`);
      if (unref(loading)) {
        _push(`<span>Logging in...</span>`);
      } else {
        _push(`<span>Login</span>`);
      }
      _push(`</button></form><p class="text-sm text-muted-foreground"> Don’t have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/register",
        class: "text-primary hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Create one`);
          } else {
            return [
              createTextVNode("Create one")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=login-CXTMX0FB.js.map
