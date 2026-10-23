// Content guard: keeps unfinished or inconsistent content from being published.
//
// - `astro build` FAILS if any TODO placeholder remains in content/ (draft projects are skipped),
//   if skills.json / site.json point at a project that doesn't exist, or if images are put in
//   a project's markdown body instead of its frontmatter (where alt text is enforced).
// - `astro dev` only warns, and TODOs render as highlighted boxes on the page.
// - `npm run build:preview` builds anyway (TODOs highlighted), for local previews/Lighthouse only.
//   CI and deploys always use `npm run build`.
//
// Also runnable on its own: `npm run check:content`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TODO_RE = /\bTODO\b/;
const BODY_IMAGE_RE = /!\[[^\]]*\]\([^)]*\)/;
const MAX_MEDIA_BYTES = 5 * 1024 * 1024;

const rel = (root, file) => path.relative(root, file).split(path.sep).join('/');

function splitFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { frontmatter: '', body: src, bodyStartLine: 1 };
  return { frontmatter: m[1], body: src.slice(m[0].length), bodyStartLine: m[0].split('\n').length };
}

function findTodos(root, file, text, lineOffset = 1) {
  return text.split(/\r?\n/).flatMap((line, i) =>
    TODO_RE.test(line) ? [{ file: rel(root, file), line: i + lineOffset, text: line.trim() }] : [],
  );
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
}

/** @param {string} root project root (absolute path) */
export function checkContent(root) {
  const contentDir = path.join(root, 'content');
  const projectsDir = path.join(contentDir, 'projects');
  const errors = [];
  const warnings = [];
  const todos = [];

  // Projects
  const projects = new Map(); // slug -> { draft }
  const projectFiles = fs.existsSync(projectsDir)
    ? fs.readdirSync(projectsDir).filter((f) => f.endsWith('.md'))
    : [];
  for (const name of projectFiles) {
    const file = path.join(projectsDir, name);
    const slug = name.replace(/\.md$/, '');
    const src = fs.readFileSync(file, 'utf8');
    const { frontmatter, body, bodyStartLine } = splitFrontmatter(src);
    const draft = /^draft:\s*true\s*$/m.test(frontmatter);
    projects.set(slug, { draft });
    if (draft) continue;
    todos.push(...findTodos(root, file, src));
    if (BODY_IMAGE_RE.test(body)) {
      const line = body.split(/\r?\n/).findIndex((l) => BODY_IMAGE_RE.test(l)) + bodyStartLine;
      errors.push(
        `${rel(root, file)}:${line} — images go in the frontmatter \`gallery\` (with \`alt\` and \`section\`), not in the markdown body.`,
      );
    }
  }

  // JSON data files
  const readJson = (name) => {
    const file = path.join(contentDir, name);
    if (!fs.existsSync(file)) {
      errors.push(`content/${name} is missing.`);
      return null;
    }
    const src = fs.readFileSync(file, 'utf8');
    todos.push(...findTodos(root, file, src));
    try {
      return JSON.parse(src);
    } catch (e) {
      errors.push(`content/${name} is not valid JSON: ${e.message}`);
      return null;
    }
  };
  const site = readJson('site.json');
  const skills = readJson('skills.json');

  const checkSlug = (slug, where) => {
    const p = projects.get(slug);
    if (!p) errors.push(`${where} links to "${slug}", but content/projects/${slug}.md does not exist.`);
    else if (p.draft) warnings.push(`${where} links to draft project "${slug}"; the link is hidden in production.`);
  };

  if (site?.featured) {
    if (site.featured.length > 3) errors.push(`content/site.json: "featured" lists ${site.featured.length} projects; the maximum is 3.`);
    for (const slug of site.featured) checkSlug(slug, 'content/site.json "featured"');
  }

  if (skills?.groups) {
    for (const [group, items] of Object.entries(skills.groups)) {
      for (const skill of items ?? []) {
        for (const slug of skill.projects ?? []) checkSlug(slug, `content/skills.json (${group} › ${skill.name})`);
      }
    }
  }

  // Media size budget
  for (const file of walk(path.join(contentDir, 'media'))) {
    const { size } = fs.statSync(file);
    if (size > MAX_MEDIA_BYTES) {
      warnings.push(`${rel(root, file)} is ${(size / 1048576).toFixed(1)} MB (limit ~5 MB). Host long videos on YouTube/Vimeo instead.`);
    }
  }

  return { errors, warnings, todos, projects };
}

export function formatTodos(todos) {
  return todos.map((t) => `  ${t.file}:${t.line}  ${t.text}`).join('\n');
}

/** @returns {import('astro').AstroIntegration} */
export default function contentGuard() {
  return {
    name: 'content-guard',
    hooks: {
      'astro:config:setup': ({ command, config, logger }) => {
        const root = fileURLToPath(config.root);
        const { errors, warnings, todos } = checkContent(root);
        for (const w of warnings) logger.warn(w);

        const strict = command === 'build' && process.env.npm_lifecycle_event !== 'build:preview';
        if (todos.length) {
          const msg = `${todos.length} TODO placeholder(s) left in content/:\n${formatTodos(todos)}`;
          if (strict) errors.push(`${msg}\n\nFill them in, or set \`draft: true\` on unfinished projects.`);
          else logger.warn(msg);
        }
        if (errors.length) {
          if (command === 'build') throw new Error(`Content check failed:\n\n${errors.join('\n\n')}`);
          for (const e of errors) logger.error(e);
        }
      },
    },
  };
}

// CLI: `node scripts/content-guard.mjs`
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const { errors, warnings, todos } = checkContent(root);
  for (const w of warnings) console.warn(`warn  ${w}`);
  if (todos.length) console.error(`${todos.length} TODO placeholder(s):\n${formatTodos(todos)}`);
  for (const e of errors) console.error(`error ${e}`);
  if (errors.length || todos.length) process.exit(1);
  console.log('Content check passed.');
}
