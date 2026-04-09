export type ManagedRouteId =
  | `page:${string}`
  | `brief:${string}`
  | `deep-dive:${string}`;

export const pageRouteId = (path: string) => `page:${path}` as const;
export const briefRouteId = (id: string) => `brief:${id}` as const;
export const deepDiveRouteId = (id: string) => `deep-dive:${id}` as const;

export const getBriefDetailHref = (id: string) => `/briefs/${id}`;
export const getDeepDiveHref = (id: string) => `/deep-dives/${id}`;
