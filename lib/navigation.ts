export const routes = {
  public: {
    home: "/",
    invest: "/invest",
    help: "/help",
    legal: "/legal",
    contact: "/contact",
    security: "/security",
    referral: "/referral",
  },
  auth: {
    login: "/login",
    register: "/register",
    dashboard: "/dashboard",
    settings: "/dashboard/settings",
    trades: "/dashboard/trades",
    referralStats: "/dashboard/referral",
  },
  payment: {
    checkout: "/register",
    success: "/register/success",
    failure: "/register/failure",
  },
};

export const getReturnUrl = (defaultPath: string = routes.auth.dashboard) => {
  if (typeof window === "undefined") return defaultPath;
  const params = new URLSearchParams(window.location.search);
  return params.get("returnUrl") || defaultPath;
};

export const addReturnUrl = (path: string, returnUrl?: string) => {
  if (!returnUrl) return path;
  const url = new URL(path, window.location.origin);
  url.searchParams.set("returnUrl", returnUrl);
  return url.pathname + url.search;
};

export const isProtectedRoute = (path: string) => {
  return path.startsWith("/dashboard");
};

export const isPublicOnlyRoute = (path: string) => {
  return [routes.auth.login, routes.auth.register].includes(path);
};
