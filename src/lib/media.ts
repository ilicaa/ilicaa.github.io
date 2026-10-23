// Resolves non-image media (loops, PDFs) referenced from project frontmatter, e.g.
// `../media/genai-npc/clip.webm` (relative to content/projects/<slug>.md), to built URLs.
import path from 'node:path';

const files = import.meta.glob<string>('/content/media/**/*.{webm,mp4,pdf}', {
  query: '?url',
  import: 'default',
  eager: true,
});

export function mediaUrl(relativePath: string, projectId: string): string {
  const key = path.posix.normalize(path.posix.join('/content/projects', relativePath));
  const url = files[key];
  if (!url) {
    throw new Error(
      `content/projects/${projectId}.md references "${relativePath}", but ${key.slice(1)} does not exist. ` +
        `Paths are relative to the markdown file, e.g. "../media/${projectId}/file.pdf".`,
    );
  }
  return url;
}
