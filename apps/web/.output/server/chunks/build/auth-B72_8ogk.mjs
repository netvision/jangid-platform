import { l as defineStore, a as useRuntimeConfig, b as useNuxtApp } from './server.mjs';
import { ref, computed } from 'vue';
import { $ as $fetch, x as destr, r as klona, y as getRequestHeader, z as isEqual, A as setCookie, B as getCookie, C as deleteCookie } from '../nitro/nitro.mjs';

function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

function useRequestEvent(nuxtApp) {
  var _a;
  nuxtApp || (nuxtApp = useNuxtApp());
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a, _b, _c;
  const opts = { ...CookieDefaults, ..._opts };
  (_a = opts.filter) != null ? _a : opts.filter = (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : (_c = cookies[name]) != null ? _c : (_b = opts.default) == null ? void 0 : _b.call(opts));
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies || (nuxtApp._cookies = {});
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
  const role = computed(() => {
    var _a, _b;
    return (_b = (_a = user.value) == null ? void 0 : _a.role) != null ? _b : null;
  });
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
      if (data == null ? void 0 : data.message) {
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

export { useAuthStore as u };
//# sourceMappingURL=auth-B72_8ogk.mjs.map
