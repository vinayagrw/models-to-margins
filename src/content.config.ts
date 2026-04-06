import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const sharedSchema = {
  title: z.string(),
  summary: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  featured: z.boolean().default(false),
  listed: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
  audience: z.string().optional(),
  readTime: z.string().optional()
};

const briefs = defineCollection({
  loader: glob({ base: './src/content/briefs', pattern: '**/*.md' }),
  schema: z.object({
    ...sharedSchema,
    industry: z.string(),
    lens: z.array(z.string()).default([]),
    briefType: z.enum(['article', 'interactive']).default('article'),
    embedPath: z.string().optional(),
    openPath: z.string().optional(),
    supportingVisualPath: z.string().optional(),
    supportingVisualLabel: z.string().optional()
  })
});

const deepDives = defineCollection({
  loader: glob({ base: './src/content/deep-dives', pattern: '**/*.md' }),
  schema: z.object({
    ...sharedSchema,
    geography: z.string(),
    horizon: z.string().optional()
  })
});

const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.md' }),
  schema: z.object({
    ...sharedSchema,
    signalType: z.string()
  })
});

const visuals = defineCollection({
  loader: glob({ base: './src/content/visuals', pattern: '**/*.md' }),
  schema: z.object({
    ...sharedSchema,
    embedPath: z.string(),
    openPath: z.string(),
    visualType: z.string(),
    status: z.enum(['live', 'draft']).default('live')
  })
});

export const collections = {
  briefs,
  'deep-dives': deepDives,
  notes,
  visuals
};
