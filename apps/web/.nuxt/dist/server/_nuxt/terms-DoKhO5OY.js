import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/Volumes/Untitled/dev/jangid/node_modules/hookable/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/unctx/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Volumes/Untitled/dev/jangid/node_modules/radix3/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/defu/dist/defu.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/ufo/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/klona/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "prose prose-neutral mx-auto max-w-3xl py-12 dark:prose-invert" }, _attrs))}><h1>Terms of Service</h1><p>Effective date: October 3, 2025</p><p> These Terms of Service govern your access to and use of the Jangid platform, including the web application, dashboards, and hosted microsites. By creating an account or using our services, you agree to these terms. </p><h2>Account responsibilities</h2><ul><li>Provide accurate profile information and keep your credentials secure.</li><li>Ensure any content published on your microsite complies with applicable laws.</li><li>Notify us immediately if you suspect unauthorized access to your account.</li></ul><h2>Acceptable use</h2><p> You agree not to misuse the platform, including attempting to disrupt service operations, reverse engineer our codebase, or engage in fraudulent or misleading activity. We reserve the right to suspend accounts that violate these terms. </p><h2>Payments &amp; subscriptions</h2><p> Paid plans renew automatically unless cancelled before the renewal date. Applicable taxes are charged based on your billing address. Refunds may be issued at our discretion for unused service periods. </p><h2>Service availability</h2><p> We strive for 99.9% uptime and will communicate maintenance windows in advance. However, the service is provided on an &quot;as-is&quot; basis without warranties of any kind. </p><h2>Limitation of liability</h2><p> To the fullest extent permitted by law, Jangid and its affiliates are not liable for indirect, incidental, or consequential damages arising from the use of the platform. </p><h2>Changes to these terms</h2><p> We may update these terms to reflect new features or legal requirements. Continued use of the platform after updates constitutes acceptance of the revised terms. </p><h2>Contact</h2><p> For questions or concerns, email <a href="mailto:legal@jangid.co.in">legal@jangid.co.in</a> or call +91 98200 00000. </p></section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/terms.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const terms = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  terms as default
};
//# sourceMappingURL=terms-DoKhO5OY.js.map
