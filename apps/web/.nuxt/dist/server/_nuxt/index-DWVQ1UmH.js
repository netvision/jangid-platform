import { _ as __nuxt_component_0 } from "./nuxt-link-FzQk3-Qr.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import "/Volumes/Untitled/dev/jangid/node_modules/ufo/dist/index.mjs";
import "../server.mjs";
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
    const plans = [
      {
        name: "Starter",
        description: "Launch your digital visiting card with essential sections and lead capture.",
        price: "₹0",
        billing: "forever free",
        features: ["1 microsite", "Core templates & branding", "Lead capture form", "WhatsApp & phone CTA"],
        cta: "/auth/register",
        ctaLabel: "Get started for free"
      },
      {
        name: "Growth",
        badge: "Popular",
        description: "Unlock analytics, advanced themes, and high-converting CTA blocks.",
        price: "₹499",
        billing: "per month, billed annually",
        features: ["3 microsites", "Premium themes & sections", "Insights dashboard", "Custom domain mapping"],
        cta: "/auth/register?plan=growth",
        ctaLabel: "Start free trial"
      },
      {
        name: "Collective",
        description: "For associations and agencies managing multiple member profiles.",
        price: "Let’s talk",
        billing: "custom billing based on seats",
        features: ["Unlimited microsites", "Team access controls", "Shared asset library", "Dedicated support channel"],
        cta: "mailto:sales@jangid.co.in",
        ctaLabel: "Book a consult"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-12" }, _attrs))}><header class="space-y-4 text-center"><h1 class="text-4xl font-semibold tracking-tight text-primary md:text-5xl">Simple pricing for every stage</h1><p class="mx-auto max-w-2xl text-lg text-muted-foreground"> Launch for free and upgrade when you need advanced templates, analytics, and lead management tools. </p></header><div class="grid gap-6 lg:grid-cols-3"><!--[-->`);
      ssrRenderList(plans, (plan) => {
        _push(`<article class="flex flex-col rounded-2xl border border-border bg-background/80 p-6 shadow-sm"><div class="flex items-baseline justify-between"><h2 class="text-xl font-semibold">${ssrInterpolate(plan.name)}</h2>`);
        if (plan.badge) {
          _push(`<span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">${ssrInterpolate(plan.badge)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="mt-2 text-sm text-muted-foreground">${ssrInterpolate(plan.description)}</p><p class="mt-6 text-4xl font-semibold">${ssrInterpolate(plan.price)}</p><p class="text-sm text-muted-foreground">${ssrInterpolate(plan.billing)}</p><ul class="mt-6 space-y-3 text-sm"><!--[-->`);
        ssrRenderList(plan.features, (feature) => {
          _push(`<li class="flex items-center gap-2"><span class="i-heroicons-check-circle-20-solid text-primary" aria-hidden="true"></span> ${ssrInterpolate(feature)}</li>`);
        });
        _push(`<!--]--></ul>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: plan.cta,
          class: "mt-8 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow hover:bg-primary/90"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(plan.ctaLabel)}`);
            } else {
              return [
                createTextVNode(toDisplayString(plan.ctaLabel), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</article>`);
      });
      _push(`<!--]--></div><section class="grid gap-6 rounded-2xl bg-muted/40 p-8 md:grid-cols-2"><div class="space-y-3"><h2 class="text-2xl font-semibold">Have questions about billing?</h2><p class="text-sm text-muted-foreground"> Talk to our onboarding team about annual discounts, multi-profile bundles, or migrating from your existing website. </p></div><div class="flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "mailto:hello@jangid.co.in",
        class: "inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-primary hover:bg-background"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="i-heroicons-envelope-20-solid" aria-hidden="true"${_scopeId}></span> hello@jangid.co.in `);
          } else {
            return [
              createVNode("span", {
                class: "i-heroicons-envelope-20-solid",
                "aria-hidden": "true"
              }),
              createTextVNode(" hello@jangid.co.in ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pricing/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DWVQ1UmH.js.map
