import { getCollection, type CollectionEntry } from 'astro:content';
import { TRACKS } from '../content.config';

export type Project = CollectionEntry<'projects'>;
export type Track = (typeof TRACKS)[number];

export const TRACK_LABELS: Record<Track, string> = {
  production: 'Production',
  design: 'Design',
  'technical-qa': 'Technical & QA',
};

/** True for "TODO…" placeholders (rendered highlighted in dev; production builds refuse them). */
export const isTodo = (value: unknown): value is string => typeof value === 'string' && /^TODO\b/.test(value);

/** Published projects, sorted by `order`. Drafts are visible in `astro dev` only. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', (p) => import.meta.env.DEV || !p.data.draft);
  return all.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export async function getProjectMap(): Promise<Map<string, Project>> {
  return new Map((await getProjects()).map((p) => [p.id, p]));
}

export const projectUrl = (id: string) => `/projects/${id}/`;
