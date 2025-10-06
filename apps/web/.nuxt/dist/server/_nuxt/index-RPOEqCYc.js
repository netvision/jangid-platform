import { _ as __nuxt_component_0 } from "./nuxt-link-FzQk3-Qr.js";
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { a as useRuntimeConfig } from "../server.mjs";
import { u as useAsyncData, c as categoriesResponseSchema } from "./index-Cv0Q2NO9.js";
import "/Volumes/Untitled/dev/jangid/node_modules/klona/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
import { $fetch } from "ofetch";
import "/Volumes/Untitled/dev/jangid/node_modules/ufo/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/hookable/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/unctx/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Volumes/Untitled/dev/jangid/node_modules/radix3/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/@unhead/vue/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/perfect-debounce/dist/index.mjs";
import "zod";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const runtimeConfig = useRuntimeConfig();
    const { data, pending, error } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("categories:list", async () => {
      const response = await $fetch(`${runtimeConfig.public.apiBase}/categories`);
      return categoriesResponseSchema.parse(response);
    })), __temp = await __temp, __restore(), __temp);
    const categories = computed(() => data.value ?? []);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-10" }, _attrs))}><header class="space-y-4 text-center"><h1 class="text-4xl font-semibold tracking-tight text-primary md:text-5xl">Explore service categories</h1><p class="mx-auto max-w-2xl text-lg text-muted-foreground"> Browse the curated categories available on Jangid and discover specialists ready to help with your next project. </p></header>`);
      if (unref(pending)) {
        _push(`<div class="flex justify-center"><span class="text-sm text-muted-foreground">Loading categories…</span></div>`);
      } else if (unref(error)) {
        _push(`<div class="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600"> Failed to load categories. Please refresh the page or try again later. </div>`);
      } else {
        _push(`<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"><!--[-->`);
        ssrRenderList(categories.value, (category) => {
          _push(`<article class="rounded-2xl border border-border bg-background/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"><h2 class="text-xl font-semibold text-foreground">${ssrInterpolate(category.name)}</h2>`);
          if (category.description) {
            _push(`<p class="mt-2 text-sm text-muted-foreground">${ssrInterpolate(category.description)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</article>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`<footer class="rounded-2xl bg-muted/40 p-8 text-center"><h2 class="text-2xl font-semibold">Don’t see your niche listed?</h2><p class="mt-2 text-muted-foreground"> We’re constantly expanding our directory. Reach out to request a new category or register to get early access to upcoming themes. </p><div class="mt-6 flex flex-wrap justify-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/register",
        class: "rounded-md bg-primary px-4 py-2 text-white shadow hover:bg-primary/90"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Claim your digital card `);
          } else {
            return [
              createTextVNode(" Claim your digital card ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/demo",
        class: "text-primary hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Preview the demo microsite `);
          } else {
            return [
              createTextVNode(" Preview the demo microsite ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></footer></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/categories/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-RPOEqCYc.js.map
