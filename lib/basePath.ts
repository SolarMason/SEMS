// Mirrors basePath in next.config.mjs. Next.js auto-prefixes Link/Image,
// but raw HTML (iframe src, anchor href to static files) needs this helper.
export const basePath =
  process.env.NODE_ENV === "production" ? "/SEMS" : "";

export function withBase(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
