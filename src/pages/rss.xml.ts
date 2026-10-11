import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getVisibleBriefs, getVisibleDeepDives, getBriefHref } from '../utils/site-data';
import { getDeepDiveHref } from '../utils/routes';

export async function GET(context: APIContext) {
  const [briefs, deepDives] = await Promise.all([getVisibleBriefs(), getVisibleDeepDives()]);

  const briefItems = briefs.map((entry) => ({
    title: entry.data.title,
    description: entry.data.summary,
    pubDate: entry.data.pubDate,
    link: getBriefHref(entry),
    categories: entry.data.tags
  }));

  const deepDiveItems = deepDives.map((entry) => ({
    title: entry.data.title,
    description: entry.data.summary,
    pubDate: entry.data.pubDate,
    link: getDeepDiveHref(entry.id),
    categories: entry.data.tags
  }));

  const items = [...briefItems, ...deepDiveItems].sort(
    (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
  );

  return rss({
    title: 'Models to Margins',
    description: 'Long-form operating analysis and premium editorial packages on AI in the enterprise.',
    site: context.site ?? 'https://models-to-margins.vinayagrw.workers.dev',
    items,
    customData: `<language>en-us</language>`
  });
}
