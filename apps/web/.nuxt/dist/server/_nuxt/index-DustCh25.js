import { _ as __nuxt_component_0 } from "./nuxt-link-FzQk3-Qr.js";
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { h as highlightProfiles } from "../server.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/ufo/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/Volumes/Untitled/dev/jangid/node_modules/hookable/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/unctx/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Volumes/Untitled/dev/jangid/node_modules/radix3/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/defu/dist/defu.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/klona/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-12" }, _attrs))}><header class="space-y-4 text-center"><h1 class="text-4xl font-semibold tracking-tight text-primary md:text-5xl">Community highlights</h1><p class="mx-auto max-w-2xl text-lg text-muted-foreground"> Discover branded microsites crafted on the Jangid platform and get inspired to launch your own digital presence. </p></header><div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"><!--[-->`);
      ssrRenderList(unref(highlightProfiles), (highlight) => {
        _push(`<article class="group flex h-full flex-col rounded-2xl border border-border bg-background/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><span class="${ssrRenderClass([highlight.accentColor, "inline-flex w-fit items-center justify-center rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white"])}">${ssrInterpolate(highlight.category)}</span><h2 class="mt-4 text-xl font-semibold text-foreground">${ssrInterpolate(highlight.name)}</h2><p class="mt-3 text-sm text-muted-foreground">${ssrInterpolate(highlight.summary)}</p><div class="mt-auto pt-6">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/profiles/${highlight.slug}`,
          class: "inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` View profile <span aria-hidden="true" class="i-heroicons-arrow-right-16-solid transition group-hover:translate-x-0.5"${_scopeId}></span>`);
            } else {
              return [
                createTextVNode(" View profile "),
                createVNode("span", {
                  "aria-hidden": "true",
                  class: "i-heroicons-arrow-right-16-solid transition group-hover:translate-x-0.5"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></article>`);
      });
      _push(`<!--]--></div><footer class="rounded-2xl bg-muted/40 p-8 text-center"><h2 class="text-2xl font-semibold">Want your business featured here?</h2><p class="mt-2 text-muted-foreground"> Publish your digital visiting card in minutes and we’ll showcase standout launches in the community highlights board. </p><div class="mt-6 flex flex-wrap justify-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/register",
        class: "rounded-md bg-primary px-4 py-2 text-white shadow hover:bg-primary/90"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Start your free trial `);
          } else {
            return [
              createTextVNode(" Start your free trial ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/highlights/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DustCh25.js.map
