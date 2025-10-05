import { _ as __nuxt_component_0 } from "./nuxt-link-FzQk3-Qr.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
import { s as storeToRefs } from "../server.mjs";
import { useRouter } from "vue-router";
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
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HeaderNav",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuthStore();
    const { isAuthenticated, role } = storeToRefs(auth);
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "border-b border-border bg-background/80 backdrop-blur" }, _attrs))}><div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-lg font-semibold text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Jangid Connect `);
          } else {
            return [
              createTextVNode(" Jangid Connect ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="flex items-center gap-4 text-sm font-medium">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/categories",
        class: "hover:text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Categories`);
          } else {
            return [
              createTextVNode("Categories")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/highlights",
        class: "hover:text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Highlights`);
          } else {
            return [
              createTextVNode("Highlights")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/pricing",
        class: "hover:text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Pricing`);
          } else {
            return [
              createTextVNode("Pricing")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(isAuthenticated)) {
        _push(`<!--[-->`);
        if (unref(role) === "SUPER_ADMIN") {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/dashboard/superadmin",
            class: "rounded-md border border-primary/40 px-3 py-1.5 text-primary shadow-sm hover:bg-primary/5"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Super admin `);
              } else {
                return [
                  createTextVNode(" Super admin ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard",
          class: "rounded-md border border-primary/40 px-3 py-1.5 text-primary shadow-sm hover:bg-primary/5"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Dashboard `);
            } else {
              return [
                createTextVNode(" Dashboard ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button type="button" class="rounded-md bg-primary px-3 py-1.5 text-white shadow hover:bg-primary/90"> Logout </button><!--]-->`);
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/login",
          class: "rounded-md bg-primary px-3 py-1.5 text-white shadow hover:bg-primary/90"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Login `);
            } else {
              return [
                createTextVNode(" Login ")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</nav></div></header>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeaderNav.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeaderNav = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-surface text-foreground" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_HeaderNav, null, null, _parent));
      _push(`<main class="mx-auto w-full max-w-7xl px-4 py-8">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="border-t border-border bg-background py-6"><div class="mx-auto flex max-w-7xl flex-col gap-2 px-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between"><p>© ${ssrInterpolate(unref(currentYear))} Jangid Portal. All rights reserved.</p><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/privacy",
        class: "hover:text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Privacy`);
          } else {
            return [
              createTextVNode("Privacy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/terms",
        class: "hover:text-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Terms`);
          } else {
            return [
              createTextVNode("Terms")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-C9kGGw8X.js.map
