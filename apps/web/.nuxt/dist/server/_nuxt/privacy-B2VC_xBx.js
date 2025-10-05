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
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "prose prose-neutral mx-auto max-w-3xl py-12 dark:prose-invert" }, _attrs))}><h1>Privacy Policy</h1><p>Last updated: October 3, 2025</p><p> We respect your privacy and are committed to safeguarding the data entrusted to us by the Jangid community. This Privacy Policy explains the information we collect, how we use it, and the choices you have to control your data. </p><h2>Information we collect</h2><ul><li><strong>Account details:</strong> name, email address, phone number, and business profile information provided during registration.</li><li><strong>Usage insights:</strong> activity logs, device data, and interactions captured to improve product experience.</li><li><strong>Support conversations:</strong> chat transcripts and emails when you contact us for help.</li></ul><h2>How we use your data</h2><ul><li>Deliver core product functionality, including hosting your microsite and enabling lead capture.</li><li>Communicate important updates, feature releases, and service notifications.</li><li>Analyze anonymized usage patterns to improve performance and reliability.</li></ul><h2>Sharing &amp; disclosure</h2><p> We do not sell or rent your personal information. We may share data with trusted service providers strictly for product operations, analytics, and compliance. All partners are bound by contractual obligations to protect your information. </p><h2>Data retention &amp; security</h2><p> Your data is stored on secure infrastructure with industry-standard encryption. We retain account information for as long as your subscription is active or as required by law. You may request deletion of your account and associated data at any time. </p><h2>Your choices</h2><ul><li>Update your profile or notification preferences from the dashboard.</li><li>Opt out of marketing emails by using the unsubscribe link in our communications.</li><li>Request a data export or deletion by writing to <a href="mailto:privacy@jangid.co.in">privacy@jangid.co.in</a>.</li></ul><h2>Contact</h2><p> For any privacy-related questions, reach out to <a href="mailto:privacy@jangid.co.in">privacy@jangid.co.in</a> or call +91 98200 00000. </p></section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/privacy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const privacy = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  privacy as default
};
//# sourceMappingURL=privacy-B2VC_xBx.js.map
