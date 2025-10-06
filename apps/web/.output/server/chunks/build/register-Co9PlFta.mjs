import { _ as __nuxt_component_0 } from './nuxt-link-FzQk3-Qr.mjs';
import { defineComponent, withAsyncContext, computed, reactive, watchEffect, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { s as storeToRefs, a as useRuntimeConfig } from './server.mjs';
import { useRouter, useRoute } from 'vue-router';
import { u as useAsyncData, c as categoriesResponseSchema } from './index-Cv0Q2NO9.mjs';
import { $ as $fetch } from '../nitro/nitro.mjs';
import { u as useAuthStore } from './auth-B72_8ogk.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'perfect-debounce';
import 'zod';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const router = useRouter();
    const route = useRoute();
    const auth = useAuthStore();
    const { loading, error, isAuthenticated } = storeToRefs(auth);
    const runtimeConfig = useRuntimeConfig();
    const { data: categoriesData, pending: categoriesPending, error: categoriesError } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      "categories",
      async () => {
        const response = await $fetch(`${runtimeConfig.public.apiBase}/categories`);
        return categoriesResponseSchema.parse(response);
      }
    )), __temp = await __temp, __restore(), __temp);
    const categories = computed(() => {
      var _a;
      return (_a = categoriesData.value) != null ? _a : [];
    });
    const form = reactive({
      displayName: "",
      email: "",
      phone: "",
      slug: "",
      categoryId: "",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-2xl space-y-6" }, _attrs))}><h1 class="text-2xl font-semibold">Create your Jangid portal</h1><p class="text-sm text-muted-foreground"> Reserve your subdomain, publish a visiting card or brochure, and manage enquiries from one dashboard. </p><form class="grid gap-4 md:grid-cols-2"><label class="space-y-2 text-sm font-medium" for="displayName"> Full name <input id="displayName"${ssrRenderAttr("value", form.displayName)} type="text" required autocomplete="name" class="w-full rounded-md border border-border bg-background px-3 py-2"></label><label class="space-y-2 text-sm font-medium" for="email"> Email address <input id="email"${ssrRenderAttr("value", form.email)} type="email" required autocomplete="email" class="w-full rounded-md border border-border bg-background px-3 py-2"></label><label class="space-y-2 text-sm font-medium" for="phone"> Phone number <input id="phone"${ssrRenderAttr("value", form.phone)} type="tel" placeholder="Optional" class="w-full rounded-md border border-border bg-background px-3 py-2"></label><label class="space-y-2 text-sm font-medium" for="slug"> Desired subdomain <div class="flex items-center rounded-md border border-border bg-background"><input id="slug"${ssrRenderAttr("value", form.slug)} type="text" required placeholder="rakesh" class="w-full rounded-l-md px-3 py-2"><span class="px-3 text-sm text-muted-foreground">.jangid.co.in</span></div></label><label class="md:col-span-2 space-y-2 text-sm font-medium" for="category"> Category <select id="category" class="w-full rounded-md border border-border bg-background px-3 py-2 disabled:opacity-60"${ssrIncludeBooleanAttr(unref(categoriesPending)) ? " disabled" : ""}><option value=""${ssrIncludeBooleanAttr(Array.isArray(form.categoryId) ? ssrLooseContain(form.categoryId, "") : ssrLooseEqual(form.categoryId, "")) ? " selected" : ""}>Select a category</option><!--[-->`);
      ssrRenderList(categories.value, (category) => {
        _push(`<option${ssrRenderAttr("value", category.id)}${ssrIncludeBooleanAttr(Array.isArray(form.categoryId) ? ssrLooseContain(form.categoryId, category.id) : ssrLooseEqual(form.categoryId, category.id)) ? " selected" : ""}>${ssrInterpolate(category.name)}</option>`);
      });
      _push(`<!--]--></select>`);
      if (unref(categoriesError)) {
        _push(`<p class="text-xs text-red-500">Failed to load categories. Please refresh and try again.</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</label><label class="md:col-span-2 space-y-2 text-sm font-medium" for="password"> Password <input id="password"${ssrRenderAttr("value", form.password)} type="password" required autocomplete="new-password" class="w-full rounded-md border border-border bg-background px-3 py-2"></label>`);
      if (unref(error)) {
        _push(`<p class="md:col-span-2 text-sm text-red-500">${ssrInterpolate(unref(error))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="md:col-span-2 rounded-md bg-primary px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}>`);
      if (unref(loading)) {
        _push(`<span>Submitting...</span>`);
      } else {
        _push(`<span>Submit registration</span>`);
      }
      _push(`</button></form><p class="text-sm text-muted-foreground"> Already registered? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/login",
        class: "text-primary hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Login to continue`);
          } else {
            return [
              createTextVNode("Login to continue")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-Co9PlFta.mjs.map
