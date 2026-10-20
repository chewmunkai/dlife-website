// Fails the build if the CMS photo library (content/cms/manifest.ts) lists a file the site
// doesn't ship. A retired photo left in the library shows up as a broken image in the editor
// and on any page still using it (found 20 Oct 2026: hero-team.jpg, contact-conversation.jpg).
import { readFileSync, existsSync } from "node:fs";

const src = readFileSync(new URL("../content/cms/manifest.ts", import.meta.url), "utf8");
const media = src.slice(src.indexOf("media: ["), src.indexOf("],", src.indexOf("media: [")));
let missing = [...media.matchAll(/src:\s*"([^"]+)"/g)].map((m) => m[1]).filter((p) => !existsSync(new URL(`../public${p}`, import.meta.url)));
// The films and posters (content/cms/films.ts adds them to the library from content/videos.ts).
const videos = readFileSync(new URL("../content/videos.ts", import.meta.url), "utf8");
const films = [...videos.matchAll(/asset\("(\/media\/[^"]+)"\)/g)].map((m) => m[1]);
missing.push(...films.filter((p) => !existsSync(new URL(`../public${p}`, import.meta.url))));
if (missing.length) {
  console.error(`CMS photo library lists files that don't exist in public/:\n  ${missing.join("\n  ")}\nRemove them from MANIFEST.media (the CMS swaps pages still using them on the next sync).`);
  process.exit(1);
}
console.log(`CMS photo library: all ${[...media.matchAll(/src:/g)].length} photos and ${films.length} film files present.`);
