import { _ as __nuxt_component_0 } from "./nuxt-link-FzQk3-Qr.js";
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
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
  __name: "demo",
  __ssrInlineRender: true,
  setup(__props) {
    const demoProfile = highlightProfiles[0];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "space-y-16" }, _attrs))}><section class="${ssrRenderClass([unref(demoProfile).accentColor, "rounded-3xl bg-gradient-to-r p-10 text-white shadow-xl"])}"><div class="mx-auto flex max-w-4xl flex-col gap-6 md:flex-row md:items-end md:justify-between"><div class="space-y-4"><span class="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide"> Demo microsite </span><div><h1 class="text-4xl font-semibold md:text-5xl">${ssrInterpolate(unref(demoProfile).name)}</h1><p class="mt-2 text-lg text-white/80">${ssrInterpolate(unref(demoProfile).category)} • ${ssrInterpolate(unref(demoProfile).location)}</p></div><p class="max-w-2xl text-base text-white/90">${ssrInterpolate(unref(demoProfile).description)}</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/register",
        class: "inline-flex items-center justify-center rounded-md bg-white/90 px-5 py-3 text-sm font-semibold text-primary shadow hover:bg-white"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(demoProfile).ctaLabel)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(demoProfile).ctaLabel), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><section class="grid gap-10 md:grid-cols-2"><div class="space-y-4"><h2 class="text-2xl font-semibold">What we do</h2><ul class="space-y-3 text-sm text-muted-foreground"><!--[-->`);
      ssrRenderList(unref(demoProfile).services, (service) => {
        _push(`<li class="flex items-start gap-3"><span class="i-heroicons-sparkles-20-solid text-primary" aria-hidden="true"></span><span>${ssrInterpolate(service)}</span></li>`);
      });
      _push(`<!--]--></ul></div><div class="space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm"><h3 class="text-xl font-semibold">Book a consultation</h3><p class="text-sm text-muted-foreground"> Share a brief introduction and we’ll get back to you within 24 hours with next steps and available slots. </p><form class="space-y-3"><input type="text" placeholder="Your name" class="w-full rounded-md border border-border bg-background px-3 py-2"><input type="email" placeholder="Email or phone" class="w-full rounded-md border border-border bg-background px-3 py-2"><textarea rows="3" placeholder="Tell us about your project" class="w-full rounded-md border border-border bg-background px-3 py-2"></textarea><button type="button" class="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"> Submit enquiry </button></form></div></section><section class="grid gap-8 md:grid-cols-3"><div class="rounded-2xl border border-border bg-background/80 p-6 shadow-sm"><h3 class="text-lg font-semibold">Call us</h3><p class="mt-2 text-sm text-muted-foreground">${ssrInterpolate(unref(demoProfile).contact.phone)}</p></div><div class="rounded-2xl border border-border bg-background/80 p-6 shadow-sm"><h3 class="text-lg font-semibold">Write to us</h3><p class="mt-2 text-sm text-muted-foreground">${ssrInterpolate(unref(demoProfile).contact.email)}</p></div>`);
      if (unref(demoProfile).contact.website) {
        _push(`<div class="rounded-2xl border border-border bg-background/80 p-6 shadow-sm"><h3 class="text-lg font-semibold">Visit our site</h3>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(demoProfile).contact.website,
          target: "_blank",
          rel: "noopener",
          class: "mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(demoProfile).contact.website)} <span aria-hidden="true" class="i-heroicons-arrow-top-right-on-square-20-solid"${_scopeId}></span>`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(demoProfile).contact.website) + " ", 1),
                createVNode("span", {
                  "aria-hidden": "true",
                  class: "i-heroicons-arrow-top-right-on-square-20-solid"
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
      _push(`</section></article>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/demo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=demo-CloqF10n.js.map
