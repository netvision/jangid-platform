import { _ as __nuxt_component_0 } from "./nuxt-link-FzQk3-Qr.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import "/Volumes/Untitled/dev/jangid/node_modules/hookable/dist/index.mjs";
import { u as useHead } from "../server.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/ufo/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
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
    const metrics = [
      {
        label: "Pending approvals",
        value: "6",
        delta: "+2 vs last week",
        trend: "up",
        updatedAgo: "8 minutes ago"
      },
      {
        label: "Active microsites",
        value: "142",
        delta: "+12 this week",
        trend: "up",
        updatedAgo: "12 minutes ago"
      },
      {
        label: "Support backlog",
        value: "3",
        delta: "-4 since yesterday",
        trend: "down",
        updatedAgo: "35 minutes ago"
      },
      {
        label: "Daily traffic",
        value: "18.4k",
        delta: "+9% week over week",
        trend: "up",
        updatedAgo: "5 minutes ago"
      }
    ];
    const pendingProfiles = [
      {
        id: "pending-1",
        displayName: "Triveni Modular Kitchens",
        category: "Interior & Carpentry",
        submittedAgo: "2 hours ago"
      },
      {
        id: "pending-2",
        displayName: "Sagar Digital Studios",
        category: "Printing & Branding",
        submittedAgo: "4 hours ago"
      },
      {
        id: "pending-3",
        displayName: "Maheshwari Events Collective",
        category: "Events & Decor",
        submittedAgo: "yesterday"
      }
    ];
    const signals = [
      {
        title: "New high-traffic profile",
        message: "Rakesh Furniture Works crossed 1,200 visits in the last 24 hours.",
        severity: "success"
      },
      {
        title: "Upcoming billing renewals",
        message: "7 Growth-tier subscriptions renew in 3 days—send reminders.",
        severity: "warning"
      },
      {
        title: "Customer happiness score",
        message: "Daily NPS survey landed at 47 (above baseline).",
        severity: "info"
      }
    ];
    const latestSignups = [
      {
        id: "signup-1",
        business: "Goyal Heritage Decor",
        owner: "Ritika Goyal",
        category: "Events & Decor",
        status: "PENDING_REVIEW",
        statusLabel: "Pending review",
        joinedAgo: "30 minutes ago"
      },
      {
        id: "signup-2",
        business: "Khandelwal Fabrication",
        owner: "Amit Khandelwal",
        category: "Interior & Carpentry",
        status: "APPROVED",
        statusLabel: "Approved",
        joinedAgo: "3 hours ago"
      },
      {
        id: "signup-3",
        business: "Sharma Print Hub",
        owner: "Nisha Sharma",
        category: "Printing & Branding",
        status: "DRAFT",
        statusLabel: "Draft",
        joinedAgo: "yesterday"
      }
    ];
    useHead({
      title: "Super admin dashboard • Jangid Connect"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-10" }, _attrs))}><header class="space-y-2"><p class="text-xs uppercase tracking-widest text-muted-foreground">Super admin</p><h1 class="text-3xl font-semibold">Control center</h1><p class="text-sm text-muted-foreground"> Review pending profiles, monitor platform health, and onboard the wider Jangid collective. </p></header><div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4"><!--[-->`);
      ssrRenderList(metrics, (metric) => {
        _push(`<article class="rounded-2xl border border-border bg-background/80 p-5 shadow-sm"><p class="text-xs uppercase tracking-wide text-muted-foreground">${ssrInterpolate(metric.label)}</p><div class="mt-3 flex items-baseline gap-2"><span class="text-3xl font-semibold">${ssrInterpolate(metric.value)}</span><span class="${ssrRenderClass([
          "text-xs font-medium",
          metric.trend === "up" ? "text-emerald-600" : metric.trend === "down" ? "text-rose-600" : "text-muted-foreground"
        ])}">${ssrInterpolate(metric.delta)}</span></div><p class="mt-2 text-xs text-muted-foreground">Updated ${ssrInterpolate(metric.updatedAgo)}</p></article>`);
      });
      _push(`<!--]--></div><div class="grid gap-6 xl:grid-cols-3"><section class="xl:col-span-2 space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm"><header class="flex flex-wrap items-center justify-between gap-3"><div><h2 class="text-lg font-semibold">Profiles awaiting review</h2><p class="text-sm text-muted-foreground">Prioritize approvals to keep creators moving.</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/dashboard",
        class: "text-sm font-medium text-primary hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Go to profiles`);
          } else {
            return [
              createTextVNode("Go to profiles")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</header><ul class="divide-y divide-border text-sm"><!--[-->`);
      ssrRenderList(pendingProfiles, (profile) => {
        _push(`<li class="flex flex-wrap items-center justify-between gap-3 py-3"><div><p class="font-medium">${ssrInterpolate(profile.displayName)}</p><p class="text-xs text-muted-foreground">Submitted ${ssrInterpolate(profile.submittedAgo)} • ${ssrInterpolate(profile.category)}</p></div><div class="flex items-center gap-3"><button type="button" class="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-background"> Request edits </button><button type="button" class="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary/90"> Approve </button></div></li>`);
      });
      _push(`<!--]-->`);
      if (!pendingProfiles.length) {
        _push(`<li class="py-6 text-center text-sm text-muted-foreground"> All caught up! No pending submissions right now. </li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</ul></section><section class="space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm"><header class="flex items-center justify-between"><h2 class="text-lg font-semibold">Platform signals</h2><span class="text-xs text-muted-foreground">Last 24 hours</span></header><ul class="space-y-3 text-sm text-muted-foreground"><!--[-->`);
      ssrRenderList(signals, (signal) => {
        _push(`<li class="flex items-start gap-3"><span class="${ssrRenderClass([
          "i-heroicons-sparkles-20-solid mt-0.5",
          signal.severity === "info" ? "text-sky-500" : signal.severity === "success" ? "text-emerald-500" : "text-amber-500"
        ])}" aria-hidden="true"></span><div><p class="font-medium text-foreground">${ssrInterpolate(signal.title)}</p><p>${ssrInterpolate(signal.message)}</p></div></li>`);
      });
      _push(`<!--]--></ul></section></div><section class="space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm"><header class="flex flex-wrap items-center justify-between gap-3"><div><h2 class="text-lg font-semibold">Latest signups</h2><p class="text-sm text-muted-foreground">Keep an eye on onboarding momentum and reach out to help unblock teams.</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/register",
        class: "text-sm font-medium text-primary hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Invite a member`);
          } else {
            return [
              createTextVNode("Invite a member")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</header><div class="overflow-x-auto"><table class="min-w-full divide-y divide-border text-sm"><thead class="text-left text-xs uppercase text-muted-foreground"><tr><th scope="col" class="py-2 pr-6">Business</th><th scope="col" class="py-2 pr-6">Category</th><th scope="col" class="py-2 pr-6">Status</th><th scope="col" class="py-2">Joined</th></tr></thead><tbody class="divide-y divide-border"><!--[-->`);
      ssrRenderList(latestSignups, (signup) => {
        _push(`<tr class="text-sm"><td class="py-3 pr-6"><p class="font-medium text-foreground">${ssrInterpolate(signup.business)}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(signup.owner)}</p></td><td class="py-3 pr-6"><span class="rounded-full bg-muted px-3 py-1 text-xs font-medium">${ssrInterpolate(signup.category)}</span></td><td class="py-3 pr-6"><span class="${ssrRenderClass([
          "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
          signup.status === "APPROVED" ? "bg-emerald-100 text-emerald-600" : signup.status === "PENDING_REVIEW" ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-600"
        ])}"><span class="${ssrRenderClass([
          "h-2 w-2 rounded-full",
          signup.status === "APPROVED" ? "bg-emerald-500" : signup.status === "PENDING_REVIEW" ? "bg-amber-500" : "bg-slate-400"
        ])}"></span> ${ssrInterpolate(signup.statusLabel)}</span></td><td class="py-3">${ssrInterpolate(signup.joinedAgo)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table>`);
      if (!latestSignups.length) {
        _push(`<p class="py-6 text-center text-sm text-muted-foreground"> No recent signups. Encourage members to invite friends from the community! </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/superadmin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-CoAOGene.js.map
