import { readFile } from "node:fs/promises";
import path from "node:path";

/*
 * The design-system stylesheets the inner pages load (components/v2/Shell.tsx, same order), as
 * one file for the studio to inject into its page canvas only. They style bare elements (body,
 * headings, links), so loading them into the editor itself would restyle the editor's panels;
 * inside the canvas iframe they style just the page, as on the live site.
 */
const SHEETS = [
  "styles/ds/tokens/colors.css",
  "styles/ds/tokens/typography.css",
  "styles/ds/tokens/spacing.css",
  "styles/ds/tokens/shape.css",
  "styles/ds/tokens/motion.css",
  "styles/ds/css/base.css",
  "styles/ds/css/actions.css",
  "styles/ds/css/blocks.css",
  "styles/ds/css/chrome.css",
  "styles/ds/pages.css",
  "styles/ds/overrides.css",
  "styles/amendments.css",
  "styles/growth.css",
];

// Built once (the sheets only change with a new build). The static live build leaves it out with
// the rest of /studio.
export async function GET() {
  const parts = await Promise.all(SHEETS.map(async (f) => `/* ${f} */\n${await readFile(path.join(process.cwd(), f), "utf8")}`));
  return new Response(parts.join("\n"), { headers: { "content-type": "text/css; charset=utf-8", "cache-control": "public, max-age=300" } });
}
