import { b as useNuxtApp, l as defineStore, a as useRuntimeConfig } from "../server.mjs";
import { ref, computed } from "vue";
import { parse } from "/Volumes/Untitled/dev/jangid/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import { getRequestHeader, setCookie, getCookie, deleteCookie } from "/Volumes/Untitled/dev/jangid/node_modules/h3/dist/index.mjs";
import destr from "/Volumes/Untitled/dev/jangid/node_modules/destr/dist/index.mjs";
import { isEqual } from "/Volumes/Untitled/dev/jangid/node_modules/ohash/dist/index.mjs";
import { klona } from "/Volumes/Untitled/dev/jangid/node_modules/klona/dist/index.mjs";
import "/Volumes/Untitled/dev/jangid/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
import { $fetch } from "ofetch";
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.());
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const ACCESS_COOKIE = "jangid_access_token";
const REFRESH_COOKIE = "jangid_refresh_token";
const useAuthStore = defineStore("auth", () => {
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.apiBase;
  const secureCookie = runtimeConfig.public.apiBase.startsWith("https:");
  const accessToken = useCookie(ACCESS_COOKIE, {
    sameSite: "lax",
    secure: secureCookie,
    path: "/"
  });
  const refreshToken = useCookie(REFRESH_COOKIE, {
    sameSite: "lax",
    secure: secureCookie,
    path: "/"
  });
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const isAuthenticated = computed(() => !!user.value && !!accessToken.value);
  const role = computed(() => user.value?.role ?? null);
  async function register(payload) {
    return authenticate(`${baseURL}/auth/register`, payload);
  }
  async function login(credentials) {
    return authenticate(`${baseURL}/auth/login`, credentials);
  }
  async function authenticate(endpoint, body) {
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch(endpoint, {
        method: "POST",
        body,
        headers: buildAuthHeaders()
      });
      setSession(response);
      return response;
    } catch (err) {
      error.value = extractErrorMessage(err);
      throw err;
    } finally {
      loading.value = false;
    }
  }
  async function refresh() {
    if (!refreshToken.value) {
      clearSession();
      return null;
    }
    try {
      const response = await $fetch(`${baseURL}/auth/refresh`, {
        method: "POST",
        body: { refreshToken: refreshToken.value },
        headers: buildAuthHeaders()
      });
      setSession(response);
      return response;
    } catch (err) {
      clearSession();
      throw err;
    }
  }
  async function fetchCurrentUser() {
    if (!accessToken.value) {
      return null;
    }
    try {
      const me = await $fetch(`${baseURL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`
        }
      });
      user.value = me;
      return me;
    } catch (err) {
      if (isTokenExpiredError(err) && refreshToken.value) {
        const refreshed = await refresh().catch(() => null);
        if (refreshed) {
          return user.value;
        }
      }
      clearSession();
      return null;
    }
  }
  async function logout() {
    if (accessToken.value) {
      try {
        await $fetch(`${baseURL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken.value}`
          }
        });
      } catch (err) {
        console.warn("logout failed", err);
      }
    }
    clearSession();
  }
  function setSession(response) {
    accessToken.value = response.accessToken;
    refreshToken.value = response.refreshToken;
    user.value = response.user;
  }
  function clearSession() {
    accessToken.value = null;
    refreshToken.value = null;
    user.value = null;
  }
  function buildAuthHeaders() {
    const headers = {
      "Content-Type": "application/json"
    };
    if (accessToken.value) {
      headers.Authorization = `Bearer ${accessToken.value}`;
    }
    return headers;
  }
  function extractErrorMessage(err) {
    if (err && typeof err === "object" && "data" in err) {
      const data = err.data;
      if (data?.message) {
        return Array.isArray(data.message) ? data.message.join(", ") : data.message;
      }
    }
    if (err instanceof Error) {
      return err.message;
    }
    return "Unexpected error occurred";
  }
  function isTokenExpiredError(err) {
    if (err && typeof err === "object" && "status" in err) {
      const status = err.status;
      return status === 401 || status === 403;
    }
    return false;
  }
  async function restore() {
    if (user.value || !accessToken.value) {
      return user.value;
    }
    return fetchCurrentUser();
  }
  return {
    user,
    loading,
    error,
    isAuthenticated,
    role,
    accessToken,
    refreshToken,
    register,
    login,
    refresh,
    fetchCurrentUser,
    logout,
    restore,
    clearSession
  };
});
export {
  useAuthStore as u
};
//# sourceMappingURL=auth-B72_8ogk.js.map
