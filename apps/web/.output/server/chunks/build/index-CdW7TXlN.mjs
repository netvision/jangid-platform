import { _ as __nuxt_component_0 } from './nuxt-link-FzQk3-Qr.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { $ as $fetch } from '../nitro/nitro.mjs';
import { u as useAsyncData, s as superAdminDashboardSchema } from './index-Cv0Q2NO9.mjs';
import { u as useHead } from './server.mjs';
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
  async setup(__props) {
    let __temp, __restore;
    const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("super-admin-dashboard", async () => {
      const response = await $fetch("/api/super-admin/dashboard");
      return superAdminDashboardSchema.parse(response);
    })), __temp = await __temp, __restore(), __temp);
    const dashboard = computed(() => {
      var _a;
      return (_a = data.value) != null ? _a : null;
    });
    const metrics = computed(() => {
      var _a, _b;
      return (_b = (_a = dashboard.value) == null ? void 0 : _a.metrics) != null ? _b : [];
    });
    const pendingProfiles = computed(() => {
      var _a, _b;
      return (_b = (_a = dashboard.value) == null ? void 0 : _a.pendingProfiles) != null ? _b : [];
    });
    const signals = computed(() => {
      var _a, _b;
      return (_b = (_a = dashboard.value) == null ? void 0 : _a.signals) != null ? _b : [];
    });
    const latestSignups = computed(() => {
      var _a, _b;
      return (_b = (_a = dashboard.value) == null ? void 0 : _a.latestSignups) != null ? _b : [];
    });
    const quickActions = computed(() => {
      var _a, _b;
      return (_b = (_a = dashboard.value) == null ? void 0 : _a.quickActions) != null ? _b : [];
    });
    const healthChecks = computed(() => {
      var _a, _b;
      return (_b = (_a = dashboard.value) == null ? void 0 : _a.healthChecks) != null ? _b : [];
    });
    const activityItems = computed(() => {
      var _a, _b;
      return (_b = (_a = dashboard.value) == null ? void 0 : _a.recentActivity) != null ? _b : [];
    });
    const priorityLabels = {
      high: "High priority",
      medium: "Medium priority",
      low: "Low priority"
    };
    const priorityClasses = {
      high: "bg-rose-100 text-rose-600 border border-rose-200",
      medium: "bg-amber-100 text-amber-600 border border-amber-200",
      low: "bg-emerald-100 text-emerald-600 border border-emerald-200"
    };
    const quickActionToneClasses = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary/70",
      neutral: "bg-muted text-foreground hover:bg-muted/80 focus-visible:ring-muted-foreground/30",
      destructive: "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500/70"
    };
    const activitySeverityClasses = {
      info: "text-sky-500",
      success: "text-emerald-500",
      warning: "text-amber-500"
    };
    const lastGeneratedText = computed(() => {
      var _a;
      if (pending.value) {
        return "Syncing latest data...";
      }
      const timestamp = (_a = dashboard.value) == null ? void 0 : _a.generatedAt;
      if (!timestamp) {
        return "Awaiting first sync";
      }
      const formatted = new Intl.DateTimeFormat("en-IN", {
        hour: "numeric",
        minute: "2-digit"
      }).format(new Date(timestamp));
      return `Last synced at ${formatted}`;
    });
    useHead({
      title: "Super admin dashboard \u2022 Jangid Connect"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-10" }, _attrs))}><header class="flex flex-wrap items-start justify-between gap-6"><div class="space-y-2"><p class="text-xs uppercase tracking-widest text-muted-foreground">Super admin</p><h1 class="text-3xl font-semibold">Control center</h1><p class="text-sm text-muted-foreground"> Review pending profiles, monitor platform health, and onboard the wider Jangid collective. </p></div><div class="flex flex-col items-end gap-2 text-sm"><button type="button" class="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-medium transition hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60"${ssrIncludeBooleanAttr(unref(pending)) ? " disabled" : ""}><span class="${ssrRenderClass([unref(pending) ? "animate-spin text-primary" : "text-muted-foreground", "i-heroicons-arrow-path-20-solid"])}" aria-hidden="true"></span> Refresh data </button><p class="text-xs text-muted-foreground">${ssrInterpolate(lastGeneratedText.value)}</p></div></header>`);
      if (unref(error)) {
        _push(`<div class="rounded-2xl border border-rose-200 bg-rose-50/70 p-6 text-sm text-rose-700 shadow-sm"><div class="flex flex-wrap items-center gap-3"><span class="i-heroicons-exclamation-triangle-20-solid text-rose-500" aria-hidden="true"></span><p>We couldn\u2019t load the latest dashboard data. Check connectivity or try again.</p><button type="button" class="ml-auto inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"> Retry </button></div></div>`);
      } else {
        _push(`<!--[--><div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">`);
        if (unref(pending) && !metrics.value.length) {
          _push(`<!--[-->`);
          ssrRenderList(4, (index) => {
            _push(`<article class="animate-pulse rounded-2xl border border-border bg-background/60 p-5"><div class="h-3 w-24 rounded bg-muted"></div><div class="mt-4 flex items-baseline gap-3"><div class="h-7 w-20 rounded bg-muted"></div><div class="h-4 w-16 rounded bg-muted/80"></div></div><div class="mt-3 h-3 w-32 rounded bg-muted"></div></article>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(metrics.value, (metric) => {
          _push(`<article class="rounded-2xl border border-border bg-background/80 p-5 shadow-sm transition hover:border-primary/40"><p class="text-xs uppercase tracking-wide text-muted-foreground">${ssrInterpolate(metric.label)}</p><div class="mt-3 flex items-baseline gap-2"><span class="text-3xl font-semibold">${ssrInterpolate(metric.value)}</span><span class="${ssrRenderClass([
            "inline-flex items-center gap-1 text-xs font-medium",
            metric.trend === "up" ? "text-emerald-600" : metric.trend === "down" ? "text-rose-600" : "text-muted-foreground"
          ])}">`);
          if (metric.trend !== "neutral") {
            _push(`<span class="${ssrRenderClass([
              "i-heroicons-arrow-trending-up-20-solid",
              metric.trend === "down" ? "rotate-180" : ""
            ])}" aria-hidden="true"></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(` ${ssrInterpolate(metric.delta)}</span></div><p class="mt-2 text-xs text-muted-foreground">Updated ${ssrInterpolate(metric.updatedAgo)}</p></article>`);
        });
        _push(`<!--]--></div><div class="grid gap-6 xl:grid-cols-[2fr,1fr]"><section class="space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm"><header class="flex flex-wrap items-center justify-between gap-3"><div><h2 class="text-lg font-semibold">Profiles awaiting review</h2><p class="text-sm text-muted-foreground">Prioritize approvals to keep creators moving.</p></div>`);
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
        _push(`</header><ul class="divide-y divide-border text-sm">`);
        if (unref(pending) && !pendingProfiles.value.length) {
          _push(`<!--[-->`);
          ssrRenderList(3, (index) => {
            _push(`<li class="animate-pulse py-4"><div class="h-4 w-48 rounded bg-muted"></div><div class="mt-3 h-3 w-32 rounded bg-muted/70"></div></li>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(pendingProfiles.value, (profile) => {
          _push(`<li class="flex flex-wrap items-start justify-between gap-3 py-4"><div class="space-y-1"><div class="flex items-center gap-2"><p class="font-medium">${ssrInterpolate(profile.displayName)}</p><span class="${ssrRenderClass(["inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide", priorityClasses[profile.priority]])}">${ssrInterpolate(priorityLabels[profile.priority])}</span></div><p class="text-xs text-muted-foreground"> Submitted ${ssrInterpolate(profile.submittedAgo)} \u2022 ${ssrInterpolate(profile.category)}</p>`);
          if (profile.contactEmail || profile.phone) {
            _push(`<p class="text-xs text-muted-foreground">`);
            if (profile.contactEmail) {
              _push(`<span>${ssrInterpolate(profile.contactEmail)}</span>`);
            } else {
              _push(`<!---->`);
            }
            if (profile.contactEmail && profile.phone) {
              _push(`<span class="mx-1">\u2022</span>`);
            } else {
              _push(`<!---->`);
            }
            if (profile.phone) {
              _push(`<span>${ssrInterpolate(profile.phone)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex flex-wrap items-center gap-3 text-xs"><button type="button" class="rounded-md border border-border px-3 py-1.5 font-medium transition hover:bg-background"> Request edits </button><button type="button" class="rounded-md bg-primary px-3 py-1.5 font-medium text-white transition hover:bg-primary/90"> Approve </button></div></li>`);
        });
        _push(`<!--]-->`);
        if (!pendingProfiles.value.length && !unref(pending)) {
          _push(`<li class="py-6 text-center text-sm text-muted-foreground"> All caught up! No pending submissions right now. </li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</ul></section><div class="space-y-6"><section class="space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm"><header class="flex items-center justify-between"><h2 class="text-lg font-semibold">Quick actions</h2><span class="text-xs text-muted-foreground">Suggested workflows</span></header><ul class="space-y-3 text-sm"><!--[-->`);
        ssrRenderList(quickActions.value, (action) => {
          _push(`<li class="rounded-xl border border-border/60 bg-background/60 p-4"><div class="flex flex-col gap-3"><div><p class="font-medium text-foreground">${ssrInterpolate(action.label)}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(action.description)}</p></div>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: action.href,
            class: ["inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold shadow-sm focus-visible:outline-none focus-visible:ring-2", quickActionToneClasses[action.tone]]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(action.ctaLabel)} <span class="i-heroicons-arrow-up-right-20-solid" aria-hidden="true"${_scopeId}></span>`);
              } else {
                return [
                  createTextVNode(toDisplayString(action.ctaLabel) + " ", 1),
                  createVNode("span", {
                    class: "i-heroicons-arrow-up-right-20-solid",
                    "aria-hidden": "true"
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></li>`);
        });
        _push(`<!--]-->`);
        if (!quickActions.value.length) {
          _push(`<li class="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground"> Define automation playbooks to surface quick actions here. </li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</ul></section><section class="space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm"><header class="flex items-center justify-between"><h2 class="text-lg font-semibold">Platform signals</h2><span class="text-xs text-muted-foreground">Last 24 hours</span></header><ul class="space-y-3 text-sm text-muted-foreground"><!--[-->`);
        ssrRenderList(signals.value, (signal) => {
          _push(`<li class="flex items-start gap-3"><span class="${ssrRenderClass([
            "i-heroicons-sparkles-20-solid mt-0.5",
            signal.severity === "info" ? "text-sky-500" : signal.severity === "success" ? "text-emerald-500" : "text-amber-500"
          ])}" aria-hidden="true"></span><div><p class="font-medium text-foreground">${ssrInterpolate(signal.title)}</p><p>${ssrInterpolate(signal.message)}</p></div></li>`);
        });
        _push(`<!--]-->`);
        if (!signals.value.length) {
          _push(`<li class="rounded-xl border border-dashed border-border p-6 text-center text-xs"> No alerts raised in the last 24 hours. </li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</ul></section><section class="space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm"><header class="flex items-center justify-between"><h2 class="text-lg font-semibold">System health</h2><span class="text-xs text-muted-foreground">Realtime</span></header><ul class="space-y-3 text-sm"><!--[-->`);
        ssrRenderList(healthChecks.value, (check) => {
          _push(`<li class="flex items-start justify-between gap-3 rounded-xl border border-border/60 bg-background/60 p-4"><div><p class="font-medium text-foreground">${ssrInterpolate(check.label)}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(check.message)}</p><p class="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">Updated ${ssrInterpolate(check.updatedAgo)}</p></div><span class="${ssrRenderClass([
            "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
            check.status === "pass" ? "bg-emerald-100 text-emerald-600" : check.status === "warn" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-600"
          ])}"><span class="${ssrRenderClass([
            "h-2 w-2 rounded-full",
            check.status === "pass" ? "bg-emerald-500" : check.status === "warn" ? "bg-amber-500" : "bg-rose-500"
          ])}"></span> ${ssrInterpolate(check.status === "pass" ? "healthy" : check.status === "warn" ? "attention" : "issue")}</span></li>`);
        });
        _push(`<!--]-->`);
        if (!healthChecks.value.length) {
          _push(`<li class="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground"> Connect monitoring to surface runtime health here. </li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</ul></section></div></div><div class="grid gap-6 xl:grid-cols-[2fr,1fr]"><section class="space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm"><header class="flex flex-wrap items-center justify-between gap-3"><div><h2 class="text-lg font-semibold">Latest signups</h2><p class="text-sm text-muted-foreground">Keep an eye on onboarding momentum and reach out to help unblock teams.</p></div>`);
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
        ssrRenderList(latestSignups.value, (signup) => {
          _push(`<tr class="text-sm"><td class="py-3 pr-6"><p class="font-medium text-foreground">${ssrInterpolate(signup.business)}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(signup.owner)}</p></td><td class="py-3 pr-6"><span class="rounded-full bg-muted px-3 py-1 text-xs font-medium">${ssrInterpolate(signup.category)}</span></td><td class="py-3 pr-6"><span class="${ssrRenderClass([
            "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
            signup.status === "APPROVED" ? "bg-emerald-100 text-emerald-600" : signup.status === "PENDING_REVIEW" ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-600"
          ])}"><span class="${ssrRenderClass([
            "h-2 w-2 rounded-full",
            signup.status === "APPROVED" ? "bg-emerald-500" : signup.status === "PENDING_REVIEW" ? "bg-amber-500" : "bg-slate-400"
          ])}"></span> ${ssrInterpolate(signup.statusLabel)}</span></td><td class="py-3">${ssrInterpolate(signup.joinedAgo)}</td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
        if (!latestSignups.value.length) {
          _push(`<p class="py-6 text-center text-sm text-muted-foreground"> No recent signups. Encourage members to invite friends from the community! </p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></section><section class="space-y-4 rounded-2xl border border-border bg-background/80 p-6 shadow-sm"><header class="flex items-center justify-between"><h2 class="text-lg font-semibold">Recent platform activity</h2><span class="text-xs text-muted-foreground">Live feed</span></header><ol class="space-y-4 text-sm"><!--[-->`);
        ssrRenderList(activityItems.value, (item) => {
          _push(`<li class="flex items-start gap-3"><span class="${ssrRenderClass([
            item.icon || "i-heroicons-sparkles-20-solid",
            "mt-1",
            activitySeverityClasses[item.severity]
          ])}" aria-hidden="true"></span><div class="space-y-1"><p class="font-medium text-foreground">${ssrInterpolate(item.actor)} ${ssrInterpolate(item.action)} <span class="text-muted-foreground">${ssrInterpolate(item.target)}</span></p><p class="text-xs text-muted-foreground">${ssrInterpolate(item.timestampAgo)}</p></div></li>`);
        });
        _push(`<!--]-->`);
        if (!activityItems.value.length) {
          _push(`<li class="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground"> Activity will appear here as your team makes changes across the platform. </li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</ol></section></div><!--]-->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard/superadmin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CdW7TXlN.mjs.map
