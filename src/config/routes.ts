export const routes = {
  home: "/",
  forOperators: "/for-operators",
  forInvestors: "/for-investors",
  security: "/security",
  pricing: "/pricing",
  caseStudies: "/case-studies",
  waitlist: "/waitlist",
  investors: "/investors",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
} as const;

export type RouteKey = keyof typeof routes;
