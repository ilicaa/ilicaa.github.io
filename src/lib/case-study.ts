// Splits a project's rendered markdown into the fixed case-study sections by their `##` headings,
// so the template can render them in a fixed order and slot frontmatter blocks (milestones,
// metrics, galleries) into the right place.
import { SECTIONS } from '../content.config';

export type SectionKey = Exclude<(typeof SECTIONS)[number], 'media'>;

export const SECTION_DEFS: { key: SectionKey; title: string; match: RegExp }[] = [
  { key: 'overview', title: 'Overview and goals', match: /overview|goals?\b/i },
  { key: 'role', title: 'My role and contributions', match: /\brole\b|contribution/i },
  { key: 'process', title: 'Process and planning', match: /process|planning/i },
  { key: 'decisions', title: 'Key design decisions', match: /decision/i },
  { key: 'results', title: 'Results', match: /result|outcome|metric/i },
  { key: 'retrospective', title: 'What went wrong / what I’d change', match: /went wrong|retro|change|lesson/i },
];

export interface SplitResult {
  /** Prose before the first `##` heading. */
  lead: string;
  sections: Map<SectionKey, { titleHtml: string; html: string }>;
  warnings: string[];
}

const stripTags = (html: string) => html.replace(/<[^>]+>/g, '').trim();

export function splitSections(html: string): SplitResult {
  const chunks = html.split(/(?=<h2[\s>])/);
  const lead = chunks[0].startsWith('<h2') ? '' : (chunks.shift() ?? '');
  const sections: SplitResult['sections'] = new Map();
  const warnings: string[] = [];
  let previous: SectionKey | undefined;
  let lastIndex = -1;

  for (const chunk of chunks) {
    const m = chunk.match(/^<h2[^>]*>([\s\S]*?)<\/h2>/);
    if (!m) continue;
    const titleHtml = m[1];
    const body = chunk.slice(m[0].length);
    const def = SECTION_DEFS.find((d) => d.match.test(stripTags(titleHtml)));

    if (!def) {
      warnings.push(`Unknown section "## ${stripTags(titleHtml)}" — kept inside the previous section as a sub-heading.`);
      const target = previous && sections.get(previous);
      const demoted = `<h3>${titleHtml}</h3>${body}`;
      if (target) target.html += demoted;
      continue;
    }
    const index = SECTION_DEFS.indexOf(def);
    if (index < lastIndex) warnings.push(`Section "## ${stripTags(titleHtml)}" is out of order; it is shown in the standard order.`);
    lastIndex = Math.max(lastIndex, index);

    const existing = sections.get(def.key);
    if (existing) existing.html += body;
    else sections.set(def.key, { titleHtml, html: body });
    previous = def.key;
  }
  return { lead, sections, warnings };
}

/** Lets wide tables scroll sideways on phones while keeping real table semantics. */
export const wrapTables = (html: string) =>
  html.replace(/<table[\s>][\s\S]*?<\/table>/g, (table) => `<div class="table-scroll" role="region" aria-label="Table" tabindex="0">${table}</div>`);

/** Wraps "TODO…" text in rendered HTML with a visible marker (dev/preview builds only reach this). */
export const highlightTodos = (html: string) =>
  html.replace(/>([^<]*\bTODO\b[^<]*)</g, (_m, text) => `><mark class="todo">${text}</mark><`);
