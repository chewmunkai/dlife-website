// Fails the build if the CMS photo library (content/cms/manifest.ts) lists a file the site
// doesn't ship. A retired photo left in the library shows up as a broken image in the editor
// and on any page still using it (found 20 Oct 2026: hero-team.jpg, contact-conversation.jpg).
import { readFileSync, existsSync } from "node:fs";

const src = readFileSync(new URL("../content/cms/manifest.ts", import.meta.url), "utf8");
const media = src.slice(src.indexOf("media: ["), src.indexOf("],", src.indexOf("media: [")));
const missing = [...media.matchAll(/src:\s*"([^"]+)"/g)].map((m) => m[1]).filter((p) => !existsSync(new URL(`../public${p}`, import.meta.url)));
if (missing.length) {
  console.error(`CMS photo library lists files that don't exist in public/:\n  ${missing.join("\n  ")}\nRemove them from MANIFEST.media (the CMS swaps pages still using them on the next sync).`);
  process.exit(1);
}
console.log(`CMS photo library: all ${[...media.matchAll(/src:/g)].length} files present.`);
