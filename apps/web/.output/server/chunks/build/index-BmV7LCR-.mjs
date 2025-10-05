import { _ as __nuxt_component_0 } from './nuxt-link-FzQk3-Qr.mjs';
import { defineComponent, computed, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { s as storeToRefs } from './server.mjs';
import { u as useAuthStore } from './auth-B72_8ogk.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const auth = useAuthStore();
    const { user } = storeToRefs(auth);
    const profileName = computed(() => {
      var _a, _b, _c;
      return (_c = (_b = (_a = user.value) == null ? void 0 : _a.profile) == null ? void 0 : _b.displayName) != null ? _c : "creator";
    });
    const isSuperAdmin = computed(() => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.role) === "SUPER_ADMIN";
    });
    const statusLabel = computed(() => {
      var _a, _b;
      const status = (_b = (_a = user.value) == null ? void 0 : _a.profile) == null ? void 0 : _b.status;
      switch (status) {
        case "APPROVED":
          return "Approved";
        case "PENDING_REVIEW":
          return "Pending Approval";
        case "SUSPENDED":
          return "Suspended";
        default:
          return "Draft";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="space-y-3"><div><h1 class="text-3xl font-semibold">Welcome back, ${ssrInterpolate(profileName.value)}</h1><p class="text-sm text-muted-foreground"> Manage your microsite, update content, and monitor approvals from this dashboard. </p></div>`);
      if (isSuperAdmin.value) {
        _push(`<div class="flex flex-wrap items-center gap-3 text-sm"><span class="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">Super admin</span>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/dashboard/superadmin",
          class: "inline-flex items-center gap-1 text-primary hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Open control center <span aria-hidden="true" class="i-heroicons-arrow-right-16-solid"${_scopeId}></span>`);
            } else {
              return [
                createTextVNode(" Open control center "),
                createVNode("span", {
                  "aria-hidden": "true",
                  class: "i-heroicons-arrow-right-16-solid"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid gap-6 lg:grid-cols-3"><div class="rounded-xl border border-border bg-background p-6 shadow-sm"><h2 class="text-lg font-semibold">Profile status</h2><p class="mt-2 text-sm text-muted-foreground"> Current status: <span class="font-medium text-primary">${ssrInterpolate(statusLabel.value)}</span></p></div><div class="rounded-xl border border-border bg-background p-6 shadow-sm lg:col-span-2"><h2 class="text-lg font-semibold">Quick actions</h2><ul class="mt-4 space-y-3 text-sm"><li>\u2022 Edit your visiting card or brochure content</li><li>\u2022 Upload a new cover image and media gallery</li><li>\u2022 Configure themes and highlight preferences</li></ul></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BmV7LCR-.mjs.map
