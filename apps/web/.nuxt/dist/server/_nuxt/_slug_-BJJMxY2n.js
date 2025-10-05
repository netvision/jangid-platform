import { _ as __nuxt_component_0 } from "./nuxt-link-FzQk3-Qr.js";
import { defineComponent, computed, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { createError } from "/Volumes/Untitled/dev/jangid/node_modules/h3/dist/index.mjs";
import { f as findHighlightProfile, u as useHead, h as highlightProfiles } from "../server.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/hookable/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/ufo/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/Volumes/Untitled/dev/jangid/node_modules/unctx/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/radix3/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/defu/dist/defu.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/klona/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const slug = computed(() => route.params.slug);
    const profile = computed(() => findHighlightProfile(slug.value));
    if (!profile.value) {
      throw createError({ statusCode: 404, statusMessage: "Profile not found" });
    }
    useHead(() => ({
      title: `${profile.value?.name ?? "Profile"} • Jangid demo profile`
    }));
    const related = computed(() => highlightProfiles.filter((item) => item.slug !== slug.value).slice(0, 2));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (profile.value) {
        _push(`<article${ssrRenderAttrs(mergeProps({ class: "space-y-16" }, _attrs))}><section class="${ssrRenderClass([profile.value.accentColor, "rounded-3xl bg-gradient-to-r p-10 text-white shadow-xl"])}"><div class="mx-auto flex max-w-4xl flex-col gap-6 md:flex-row md:items-end md:justify-between"><div class="space-y-4"><span class="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">${ssrInterpolate(profile.value.category)}</span><div><h1 class="text-4xl font-semibold md:text-5xl">${ssrInterpolate(profile.value.name)}</h1><p class="mt-2 text-lg text-white/85">${ssrInterpolate(profile.value.location)}</p></div><p class="max-w-2xl text-base text-white/90">${ssrInterpolate(profile.value.description)}</p></div><div class="flex flex-col items-start gap-3">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/auth/register",
          class: "inline-flex items-center justify-center rounded-md bg-white/90 px-5 py-3 text-sm font-semibold text-primary shadow hover:bg-white"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Launch your microsite `);
            } else {
              return [
                createTextVNode(" Launch your microsite ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/pricing",
          class: "text-sm font-medium text-white/90 hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` View pricing plans `);
            } else {
              return [
                createTextVNode(" View pricing plans ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></section><section class="grid gap-10 md:grid-cols-2"><div class="space-y-6"><div><h2 class="text-2xl font-semibold">Services</h2><ul class="mt-4 space-y-3 text-sm text-muted-foreground"><!--[-->`);
        ssrRenderList(profile.value.services, (service) => {
          _push(`<li class="flex items-start gap-3"><span class="i-heroicons-star-20-solid text-primary" aria-hidden="true"></span><span>${ssrInterpolate(service)}</span></li>`);
        });
        _push(`<!--]--></ul></div><div class="rounded-2xl border border-border bg-background/80 p-6 shadow-sm"><h3 class="text-lg font-semibold">Ready to discuss a project?</h3><p class="mt-2 text-sm text-muted-foreground"> Share a quick overview of your requirements and the team will respond within one business day. </p><button type="button" class="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">${ssrInterpolate(profile.value.ctaLabel)}</button></div></div><div class="space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm"><h2 class="text-2xl font-semibold">Contact</h2><ul class="space-y-3 text-sm text-muted-foreground">`);
        if (profile.value.contact.phone) {
          _push(`<li class="flex items-center gap-2"><span class="i-heroicons-phone-20-solid text-primary" aria-hidden="true"></span> ${ssrInterpolate(profile.value.contact.phone)}</li>`);
        } else {
          _push(`<!---->`);
        }
        if (profile.value.contact.email) {
          _push(`<li class="flex items-center gap-2"><span class="i-heroicons-envelope-20-solid text-primary" aria-hidden="true"></span> ${ssrInterpolate(profile.value.contact.email)}</li>`);
        } else {
          _push(`<!---->`);
        }
        if (profile.value.contact.website) {
          _push(`<li class="flex items-center gap-2"><span class="i-heroicons-globe-alt-20-solid text-primary" aria-hidden="true"></span>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: profile.value.contact.website,
            target: "_blank",
            rel: "noopener",
            class: "hover:underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(profile.value.contact.website)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(profile.value.contact.website), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</ul></div></section>`);
        if (related.value.length) {
          _push(`<section class="space-y-6"><h2 class="text-2xl font-semibold">More community highlights</h2><div class="grid gap-6 md:grid-cols-2"><!--[-->`);
          ssrRenderList(related.value, (item) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: item.slug,
              to: `/profiles/${item.slug}`,
              class: "group flex h-full flex-col rounded-2xl border border-border bg-background/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="${ssrRenderClass([item.accentColor, "inline-flex w-fit items-center rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white"])}"${_scopeId}>${ssrInterpolate(item.category)}</span><h3 class="mt-4 text-lg font-semibold text-foreground group-hover:text-primary"${_scopeId}>${ssrInterpolate(item.name)}</h3><p class="mt-2 text-sm text-muted-foreground"${_scopeId}>${ssrInterpolate(item.summary)}</p>`);
                } else {
                  return [
                    createVNode("span", {
                      class: ["inline-flex w-fit items-center rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold text-white", item.accentColor]
                    }, toDisplayString(item.category), 3),
                    createVNode("h3", { class: "mt-4 text-lg font-semibold text-foreground group-hover:text-primary" }, toDisplayString(item.name), 1),
                    createVNode("p", { class: "mt-2 text-sm text-muted-foreground" }, toDisplayString(item.summary), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</article>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profiles/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_slug_-BJJMxY2n.js.map
