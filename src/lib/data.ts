// Typed, validated access to content/site.json and content/skills.json.
// A malformed file fails the build with a readable message.
import { z } from 'astro/zod';
import siteJson from '../../content/site.json';
import skillsJson from '../../content/skills.json';

const todo = z.string().regex(/^TODO\b/);
const url = z.union([z.url(), todo]);

const siteSchema = z.object({
  name: z.string(),
  headline: z.string(),
  intro: z.string(),
  location: z.string(),
  lookingFor: z.object({
    primary: z.array(z.string()).min(1),
    secondary: z.array(z.string()).default([]),
    note: z.string().optional(),
  }),
  email: z.union([z.email(), todo]),
  links: z.object({ linkedin: url, github: url }),
  featured: z.array(z.string()).max(3),
  capabilities: z.object({
    production: z.array(z.string()),
    design: z.array(z.string()),
    technical: z.string().optional(),
  }),
  about: z.array(z.string()),
  education: z.array(z.object({ degree: z.string(), school: z.string(), dates: z.string(), note: z.string().optional() })),
  seoDescription: z.string(),
});

const LEVELS = ['Daily use', 'Working knowledge', 'Familiar'] as const;
const skill = z.object({
  name: z.string().min(1),
  level: z.enum(LEVELS).optional(),
  projects: z.array(z.string()).default([]),
});

const skillsSchema = z.object({
  intro: z.string(),
  groups: z.object({
    production: z.array(skill).default([]),
    design: z.array(skill).default([]),
    technical: z.array(skill).default([]),
    qa: z.array(skill).default([]),
  }),
  languages: z.array(z.object({ name: z.string(), level: z.string().optional() })).default([]),
  certifications: z
    .array(z.object({ name: z.string(), issuer: z.string().optional(), year: z.string().optional(), url: z.url().optional() }))
    .default([]),
});

function parse<T extends z.ZodType>(schema: T, data: unknown, file: string): z.output<T> {
  const result = schema.safeParse(data);
  if (!result.success) throw new Error(`content/${file} is invalid:\n${z.prettifyError(result.error)}`);
  return result.data;
}

export const site = parse(siteSchema, siteJson, 'site.json');
export const skills = parse(skillsSchema, skillsJson, 'skills.json');
export type Skill = z.output<typeof skill>;
