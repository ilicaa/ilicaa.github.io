# ilicaa.github.io

Portfolio of Yusuf Arda Ilıca: Junior Producer and Game Designer.
Live at **https://ilicaa.github.io**.

Built with [Astro](https://astro.build) as a static site, with plain CSS and almost no JavaScript (only the click-to-play video embed and gallery loops use any). All content lives in [`content/`](content/); you shouldn't need to touch `src/` to update the site.

---

## Run it locally

Requires Node.js 22.12 or newer.

```sh
npm install          # first time only
npm run dev          # http://localhost:4321, reloads as you edit
```

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server. TODO placeholders show as striped amber boxes, and draft projects are visible. |
| `npm run build` | Production build into `dist/`. **Fails if any TODO is left** (see below). This is what deploys. |
| `npm run build:preview` | Same build but allows TODOs. For local previews and Lighthouse runs only; never deployed. |
| `npm run preview` | Serves `dist/` locally after a build. |
| `npm run check:content` | Runs only the content checks (fast, no build). |

---

## Where things live

```
content/
  site.json            Name, headline, intro, links, featured projects, "what I can do", About text
  skills.json          Skills page data
  projects/<slug>.md   One file per project = one case-study page at /projects/<slug>/
  media/<slug>/        Images, short loops and PDFs for that project
  projects-notes/      Your private notes. Git-ignored, never published.
public/                Favicon, icons and og-default.png (social preview), copied as-is
src/                   Templates, components, styles (design tokens in src/styles/tokens.css)
scripts/content-guard.mjs   The TODO / consistency checks
```

---

## The TODO rule (why a build might fail)

Anything that starts with `TODO` is a placeholder, whether it's a JSON value, a frontmatter value, or a line in a project's text. For example:

```yaml
pitch: "TODO: one-line pitch"
```

- In `npm run dev` it shows on the page as a striped amber box, and the terminal lists every TODO.
- `npm run build`, and therefore every deploy, **fails** while any TODO remains, and prints each one as `file:line`. Nothing unfinished can go live.
- A project that isn't ready can be hidden instead: add `draft: true` to its frontmatter. Drafts are skipped by the checks, left out of the production site, and still visible in `npm run dev`.

The build also fails if:

- `skills.json` or `site.json` → `featured` names a project slug that doesn't exist;
- more than 3 projects are featured;
- an image has no alt text;
- an image is placed in a project's markdown body instead of its frontmatter (see below);
- `skills.json` has no skills at all.

It warns about any media file over ~5 MB.

---

## Add a project

1. Copy an existing file in `content/projects/`, for example `genai-npc.md`, which has commented examples of every field. Rename it. **The file name is the URL slug:** `my-game.md` becomes `/projects/my-game/`.
2. Create `content/media/my-game/` and put the images there (see *Add media*).
3. Fill in the frontmatter and the text. Then run `npm run dev` and check the page.
4. To feature it on the home page, add the slug to `featured` in `content/site.json` (3 maximum; order = display order).

### Frontmatter reference

```yaml
---
title: My Game
pitch: One sentence: what it is and why it's interesting.
status: Prototype            # Shipped | Prototype | In development | Concept
tracks: [production, design] # production | design | technical-qa (one or more)
tags: [Unity, Systems design]
order: 1                     # position on the Projects page (lower = first)
draft: false                 # true = hidden in production

# Quick facts (shown exactly as written: list only what YOU did)
role: Producer
contributions:
  - Ran weekly sprint planning for a team of 6
  - Wrote and maintained the GDD
credits:                     # optional: who else did what
  - { who: Jane Doe, what: Narrative and original concept }
teamSize: 6
duration: Feb – Jun 2026
tools: [Unity, Notion, Jira]

thumbnail: { src: ../media/my-game/thumb.jpg, alt: "Describe the image" }
hero:
  image: { src: ../media/my-game/hero.jpg, alt: "Describe the image" }
  # or a video instead of an image:
  # video: { provider: youtube, id: "VIDEO_ID", title: "Gameplay trailer" }

# Production evidence (all optional; shown in "Process and planning")
milestones:
  - { name: Vertical slice, date: Mar 2026, done: true }
  - { name: Alpha, date: May 2026, done: false, note: Slipped one week (art pipeline) }
tracking: Two-week sprints on a Jira board; weekly 15-minute stand-up.
risks:
  - { risk: Scope creep, mitigation: Cut list reviewed at every sprint review }

# Pull-out numbers (optional; shown in "Results"). Only real numbers.
metrics:
  - { value: "4", label: playtest rounds, note: 23 players in total }

# Images and loops. `section` places each one: overview | role | process | decisions | results | retrospective | media
gallery:
  - { src: ../media/my-game/roadmap.png, alt: "Roadmap with four milestones", caption: "Roadmap, week 3", section: process }
  - { loop: ../media/my-game/combat.webm, alt: "Player dodging an attack", section: media }

videos:                      # YouTube or Vimeo, loaded only when clicked
  - { provider: youtube, id: "VIDEO_ID", title: "Demo walkthrough" }
documents:                   # downloadable PDFs
  - { file: ../media/my-game/gdd.pdf, label: Game design document }

links:
  demo: https://example.itch.io/my-game
  repo: https://github.com/you/my-game
  # repoPrivate: true        # shows "Private repo — available on request"

seoDescription: Optional custom text for search results; defaults to the pitch.
---
```

### The text (markdown body)

Write the case study under these `##` headings. Any of them can be left out; whatever you include is always shown in this order:

```md
## Overview and goals
## My role and contributions
## Process and planning
## Key design decisions
## Results
## What went wrong / what I'd change
```

- Use `###` for sub-headings, and normal lists, **bold**, links, blockquotes and tables (good for tuning values; tables scroll sideways on phones).
- A section with no text still appears if the frontmatter gives it content. For example, `metrics` alone creates *Results*.
- *Results* never appears unless you write it or add `metrics`.

---

## Add media

Put files in `content/media/<project-slug>/` and reference them from that project's frontmatter **relative to the markdown file**, i.e. `../media/<slug>/file.ext`.

| Type | Use for | Notes |
|---|---|---|
| `.jpg` / `.png` / `.webp` | thumbnail, hero, gallery | Converted to AVIF/WebP in several sizes automatically. Export about 2000 px wide at most. `alt` is required. |
| `.webm` / `.mp4` | short gameplay loops (`loop:` in `gallery`) | Keep under ~5 MB and ~10 s. Muted, plays only when on screen, never autoplays for visitors who prefer reduced motion. `poster:` is optional. |
| `.gif` | avoid if possible | Use a `.webm` loop instead (much smaller). |
| `.pdf` | `documents` | GDDs, one-pagers. Downloaded with a readable file name. |
| YouTube / Vimeo | `videos`, or `hero.video` | Anything long goes here, never in the repo. Uses youtube-nocookie / Vimeo `dnt`, and nothing loads until the visitor clicks. |

Images must be referenced from the **frontmatter** (`thumbnail`, `hero`, `gallery`), not with `![]()` in the body. That's how alt text is enforced and how images are optimized.

Recommended thumbnail ratio: **16:10** (cards crop to it). Without a thumbnail, cards show a typographic placeholder.

---

## Update skills

Edit `content/skills.json`:

```json
{
  "intro": "One short sentence at the top of the page.",
  "groups": {
    "production": [
      { "name": "Roadmaps & milestone tracking", "level": "Daily use", "projects": ["genai-npc", "anima-1"] },
      { "name": "Notion" }
    ],
    "design":    [ { "name": "GDD writing", "projects": ["panic-at-the-server"] } ],
    "technical": [ { "name": "Unity (C#)", "level": "Working knowledge", "projects": ["genai-npc"] } ],
    "qa":        [ { "name": "Bug reporting" } ]
  },
  "languages":      [ { "name": "Turkish", "level": "Native" } ],
  "certifications": [ { "name": "Certificate name", "issuer": "Issuer", "year": "2025", "url": "https://…" } ]
}
```

- `level` is optional and must be exactly `Daily use`, `Working knowledge` or `Familiar`. Anything else fails the build.
- `projects` holds project slugs (file names without `.md`). Each becomes a link to that case study. A slug that doesn't exist fails the build. A link to a `draft` project is hidden in production.
- Skills with project links are highlighted; skills without them render in a quieter style.
- Group order on the page is fixed: Production → Game Design → Technical → QA, then Languages and Certifications.

---

## Update the home / about text

Everything is in `content/site.json`: `headline`, `intro`, `links` (LinkedIn, GitHub), `featured`, `capabilities` (the "What I can do for a team" lists), `about` (paragraphs for the About page), `education`, `lookingFor` and `seoDescription` (the default description in search results and link previews).

`public/og-default.png` is the image shown when a non-project page is shared on LinkedIn, Slack and similar. To change it, replace the file; keep it 1200×630. Project pages use their hero or thumbnail automatically.

---

## Deploy

Deployment is automatic: **every push to `main` builds and publishes the site** through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). If the build fails (for example because a TODO is left), nothing is published and the live site stays as it was. The *Actions* tab on GitHub shows why.

### One-time setup

1. On GitHub, create a **public** repository named exactly **`ilicaa.github.io`** under the `ilicaa` account, with no README or license.
2. In the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Push:
   ```sh
   git remote add origin https://github.com/ilicaa/ilicaa.github.io.git
   git push -u origin main
   ```
4. Watch the run under **Actions**. When it's green, the site is live at https://ilicaa.github.io.

Before pushing, run `npm run build` locally. If it passes, the deploy will pass too.

### Updating

```sh
git add -A
git commit -m "Add <project> case study"
git push
```
