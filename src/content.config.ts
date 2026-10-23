import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Any string starting with "TODO" is a placeholder: shown highlighted in dev, blocked in production builds. */
export const todo = z.string().regex(/^TODO\b/, 'Placeholders must start with "TODO"');

export const STATUSES = ['Shipped', 'Prototype', 'In development', 'Concept'] as const;
export const TRACKS = ['production', 'design', 'technical-qa'] as const;
/** Case-study sections, in render order. `media` is the gallery at the end of the page. */
export const SECTIONS = ['overview', 'role', 'process', 'decisions', 'results', 'retrospective', 'media'] as const;

const video = z.object({
  provider: z.enum(['youtube', 'vimeo']),
  id: z.string().min(1),
  title: z.string().min(1, { error: 'Every video needs a title (used as its accessible name).' }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/projects' }),
  schema: ({ image }) => {
    const pic = z.object({
      src: image(),
      alt: z.string().trim().min(1, { error: 'Every image needs alt text.' }),
    });
    return z.object({
      title: z.string().min(1),
      pitch: z.string().min(1),
      status: z.union([z.enum(STATUSES), todo]),
      tracks: z.array(z.enum(TRACKS)).min(1),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      /** Sort order on the projects index (lower first). */
      order: z.number().default(100),

      // Quick facts — shown exactly as written.
      role: z.string().min(1),
      contributions: z.array(z.string().min(1)).min(1, { error: 'List at least one contribution (or a TODO).' }),
      /** Teammates' credits, so the page is explicit about who did what. */
      credits: z.array(z.object({ who: z.string(), what: z.string() })).default([]),
      teamSize: z.union([z.number().int().positive(), todo]).optional(),
      duration: z.string().optional(),
      tools: z.array(z.string()).default([]),

      thumbnail: pic.optional(),
      hero: z
        .object({ image: pic.optional(), video: video.optional() })
        .refine((h) => h.image || h.video, { error: 'hero needs an `image` or a `video`.' })
        .optional(),

      // Case-study blocks (each optional; a section renders only if it has content).
      milestones: z
        .array(z.object({ name: z.string(), date: z.string().optional(), note: z.string().optional(), done: z.boolean().optional() }))
        .default([]),
      tracking: z.string().optional(),
      risks: z.array(z.object({ risk: z.string(), mitigation: z.string() })).default([]),
      metrics: z.array(z.object({ value: z.string(), label: z.string(), note: z.string().optional() })).default([]),
      gallery: z
        .array(
          z.union([
            pic.extend({ caption: z.string().optional(), section: z.enum(SECTIONS).default('media') }),
            z.object({
              loop: z.string().regex(/\.(webm|mp4)$/i, { error: 'Loops must be .webm or .mp4 files.' }),
              poster: image().optional(),
              alt: z.string().trim().min(1, { error: 'Every loop needs alt text.' }),
              caption: z.string().optional(),
              section: z.enum(SECTIONS).default('media'),
            }),
          ]),
        )
        .default([]),
      videos: z.array(video).default([]),
      documents: z.array(z.object({ file: z.string().regex(/\.pdf$/i), label: z.string() })).default([]),
      links: z
        .object({
          demo: z.url().optional(),
          repo: z.url().optional(),
          repoPrivate: z.boolean().optional(),
          other: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
        })
        .default({ other: [] }),

      seoDescription: z.string().optional(),
    });
  },
});

export const collections = { projects };
