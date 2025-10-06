import { _ as __nuxt_component_0 } from './nuxt-link-FzQk3-Qr.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import __nuxt_component_0$1 from './Icon-jMO8duBQ.mjs';
import { h as highlightProfiles } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
import './index-B565YYiG.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "HomeHighlightCard",
  __ssrInlineRender: true,
  props: {
    highlight: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "group relative overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-lg" }, _attrs))}><div class="${ssrRenderClass([__props.highlight.accentColor, "absolute inset-0 bg-gradient-to-r opacity-10"])}"></div><div class="relative flex flex-col gap-4 p-6"><div><p class="text-sm font-medium uppercase tracking-wide text-muted-foreground">${ssrInterpolate(__props.highlight.category)}</p><h3 class="mt-2 text-xl font-semibold text-foreground group-hover:text-primary">${ssrInterpolate(__props.highlight.name)}</h3></div><p class="text-sm text-muted-foreground">${ssrInterpolate(__props.highlight.summary)}</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/profiles/${__props.highlight.slug}`,
        class: "mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View profile <span aria-hidden="true"${_scopeId}>\u2192</span>`);
          } else {
            return [
              createTextVNode(" View profile "),
              createVNode("span", { "aria-hidden": "true" }, "\u2192")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></article>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HomeHighlightCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FeatureCard",
  __ssrInlineRender: true,
  props: {
    feature: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4 rounded-2xl border border-border bg-background/80 p-6" }, _attrs))}><div class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: __props.feature.icon,
        class: "h-6 w-6"
      }, null, _parent));
      _push(`</div><div><h3 class="text-lg font-semibold text-foreground">${ssrInterpolate(__props.feature.title)}</h3><p class="mt-1 text-sm text-muted-foreground">${ssrInterpolate(__props.feature.description)}</p></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FeatureCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const highlights = highlightProfiles;
    const features = [
      {
        title: "Instant subdomain setup",
        description: "Secure your unique URL and publish a digital visiting card or brochure instantly.",
        icon: "i-heroicons-globe-alt-20-solid"
      },
      {
        title: "Custom themes & layouts",
        description: "Pick from curated templates, tweak colors, sections, and media to match your brand.",
        icon: "i-heroicons-sparkles-20-solid"
      },
      {
        title: "Admin insights dashboard",
        description: "Track visits, leads, and engagement with real-time analytics and notifications.",
        icon: "i-heroicons-chart-bar-20-solid"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeHighlightCard = _sfc_main$2;
      const _component_FeatureCard = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-12" }, _attrs))}><div class="flex flex-col gap-6 text-center"><h1 class="text-4xl font-semibold tracking-tight text-primary md:text-5xl"> Discover professionals across the Jangid community </h1><p class="mx-auto max-w-2xl text-lg text-muted-foreground"> Lets begin again and again...... </p><div class="mx-auto flex w-full max-w-xl flex-col gap-3 md:flex-row"><input type="search" placeholder="Search by name, service, or location" class="w-full rounded-md border border-border bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-primary"><button class="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-medium text-white shadow hover:bg-primary/90"> Search </button></div></div><div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"><!--[-->`);
      ssrRenderList(unref(highlights), (highlight) => {
        _push(ssrRenderComponent(_component_HomeHighlightCard, {
          key: highlight.slug,
          highlight
        }, null, _parent));
      });
      _push(`<!--]--></div><section class="rounded-2xl bg-muted/40 p-8"><h2 class="text-2xl font-semibold">Create your digital presence in minutes</h2><div class="mt-6 grid gap-6 md:grid-cols-3"><!--[-->`);
      ssrRenderList(features, (feature) => {
        _push(ssrRenderComponent(_component_FeatureCard, {
          key: feature.title,
          feature
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="mt-8 flex flex-wrap items-center justify-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/register",
        class: "rounded-md bg-primary px-4 py-2 text-white shadow hover:bg-primary/90"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Get started for free `);
          } else {
            return [
              createTextVNode(" Get started for free ")
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
            _push2(` View demo microsite `);
          } else {
            return [
              createTextVNode(" View demo microsite ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Dbwje8QO.mjs.map
