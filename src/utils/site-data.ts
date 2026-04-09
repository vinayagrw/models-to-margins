import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import appVisibilityConfig from '../data/app-visibility.json';
import {
  briefRouteId,
  deepDiveRouteId,
  getBriefDetailHref,
  getDeepDiveHref,
  pageRouteId,
  type ManagedRouteId
} from './routes';

export type BriefEntry = CollectionEntry<'briefs'>;
export type DeepDiveEntry = CollectionEntry<'deep-dives'>;

export interface TopLevelPageDefinition {
  title: string;
  navLabel: string;
  route: string;
  routeId: ManagedRouteId;
  description: string;
  showInNav: boolean;
}

export interface VisibilityCatalogItem {
  group: 'pages' | 'briefs' | 'deep-dives';
  title: string;
  route: string;
  routeId: ManagedRouteId;
  defaultVisible: boolean;
  effectiveVisible: boolean;
}

const hiddenRouteIdSet = new Set<string>(appVisibilityConfig.hiddenRouteIds);

export const topLevelPages: TopLevelPageDefinition[] = [
  {
    title: 'Home',
    navLabel: 'Home',
    route: '/',
    routeId: pageRouteId('/'),
    description: 'Landing page for the publication.',
    showInNav: false
  },
  {
    title: 'Brief',
    navLabel: 'Brief',
    route: '/briefs',
    routeId: pageRouteId('/briefs'),
    description: 'Curated flagship reads and shorter editorial analysis.',
    showInNav: true
  },
  {
    title: 'Deep Dives',
    navLabel: 'Deep Dives',
    route: '/deep-dives',
    routeId: pageRouteId('/deep-dives'),
    description: 'Long-form operating analysis and premium editorial packages.',
    showInNav: true
  }
];

export const primaryNavPages = topLevelPages.filter((page) => page.showInNav);

export function getHiddenRouteIds() {
  return [...appVisibilityConfig.hiddenRouteIds];
}

export function isRouteVisible(routeId: string, defaultVisible = true) {
  return defaultVisible && !hiddenRouteIdSet.has(routeId);
}

export function isPageVisible(route: string) {
  return isRouteVisible(pageRouteId(route));
}

export function getBriefHref(entry: BriefEntry) {
  if (entry.data.briefType === 'interactive' && entry.data.openPath) {
    return entry.data.openPath;
  }

  return getBriefDetailHref(entry.id);
}

export function isBriefVisible(entry: BriefEntry) {
  return isRouteVisible(briefRouteId(entry.id), entry.data.listed);
}

export function isDeepDiveVisible(entry: DeepDiveEntry) {
  return isRouteVisible(deepDiveRouteId(entry.id), entry.data.listed);
}

function sortByPubDateDesc<T extends { data: { pubDate: Date } }>(entries: T[]) {
  return [...entries].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getVisibleBriefs() {
  return sortByPubDateDesc((await getCollection('briefs')).filter(isBriefVisible));
}

export async function getVisibleDeepDives() {
  return sortByPubDateDesc((await getCollection('deep-dives')).filter(isDeepDiveVisible));
}

function buildPageCatalogItem(page: TopLevelPageDefinition): VisibilityCatalogItem {
  return {
    group: 'pages',
    title: page.title,
    route: page.route,
    routeId: page.routeId,
    defaultVisible: true,
    effectiveVisible: isRouteVisible(page.routeId)
  };
}

function buildBriefCatalogItem(entry: BriefEntry): VisibilityCatalogItem {
  return {
    group: 'briefs',
    title: entry.data.title,
    route: getBriefHref(entry),
    routeId: briefRouteId(entry.id),
    defaultVisible: entry.data.listed,
    effectiveVisible: isBriefVisible(entry)
  };
}

function buildDeepDiveCatalogItem(entry: DeepDiveEntry): VisibilityCatalogItem {
  return {
    group: 'deep-dives',
    title: entry.data.title,
    route: getDeepDiveHref(entry.id),
    routeId: deepDiveRouteId(entry.id),
    defaultVisible: entry.data.listed,
    effectiveVisible: isDeepDiveVisible(entry)
  };
}

export async function getVisibilityCatalog() {
  const [briefs, deepDives] = await Promise.all([
    getCollection('briefs'),
    getCollection('deep-dives')
  ]);

  return {
    pages: topLevelPages.map(buildPageCatalogItem),
    briefs: sortByPubDateDesc(briefs).map(buildBriefCatalogItem),
    deepDives: sortByPubDateDesc(deepDives).map(buildDeepDiveCatalogItem)
  };
}
