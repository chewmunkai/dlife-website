import { readFileSync } from "node:fs";

/* Expected top-level band sequence for each page, transcribed from the Claude
   Design project's own HTML while porting. `main`'s direct children, in order,
   by tag + class. */
const EXPECT = {
  /* Round 7: the lone "not a networking group" statement became an opening
     statement answering "What is DVA"; the purpose pillars, the year map and
     the selection sequence are all contained objects on the one ground now, so
     the sand and spread bands are gone. The standard stays dark — DVA is the
     page the design deliberately keeps darker than the rest. */
  "dva.html": [
    "section.crest dark ink", "section.band light", "section.band light", "section.band light",
    "section.band light", "section.spread light", "section.band dark ink", "section.ask-host light",
    "section.band light close-host",
  ],
  /* August 2026 amendments: open statement, moments, ideas pane, steps
     panel, closing card. */
  "solutions/protecting-your-family.html": [
    "section.hero dark", "div.bar", "section.band light", "section.band moments light",
    "section.band light ideas", "section.band sand", "section.said ph", "section.ask-host light",
    "section.band light close-host",
  ],
  "privacy.html": ["section.hero hero--noart dark", "section.band light band--read", "section.band sand"],
  "terms.html": ["section.hero hero--noart dark", "section.band light band--read", "section.band sand"],
  "disclosures.html": ["section.hero hero--noart dark", "section.band light band--read", "section.band sand"],
  "complaints.html": ["section.hero hero--noart dark", "section.band light band--read", "section.band sand"],
  /* Round 8: the "Corporate solutions" statement band went with the page it
     linked to, which the client asked to hide. */
  "solutions.html": [
    "section.hero dark", "div.bar", "section.band light", "section.band sand",
    "section.ask-host sand", "section.band light close-host",
  ],
  /* Round 7: the four commitments and mission/vision stopped being full-width
     dark and sand bands and became contained panels on the one ground, so both
     read `band light` now; the team section is new before the closing card. */
  "about.html": [
    "section.hero dark", "section.band light", "section.band light", "section.band light",
    "section.band light", "section.band sand", "section.split-shot light", "section.band light",
    "section.band light", "section.band light close-host",
  ],
  "careers.html": [
    "section.hero dark", "div.bar", "section.band light", "section.band light", "section.band sand", "section.band light spreview", "section.two two--flip sand", "section.ask-host light", "section.band light close-host",
  
  ],
  "existing-policy-support.html": [
    "section.hero dark", "div.bar", "section.band light", "section.band light ideas", "section.band light", "section.band light", "section.spread sand", "section.ask-host light", "section.band light close-host",
  
  ],
  /* Round 8: rebuilt as one simple page at the client's direction — company
     info and location beside a form. No FAQ, and no next-step card, which on
     the get-in-touch page was circular. */
  "contact.html": ["section.hero dark", "section.band light"],
  "stories.html": [
    "section.hero dark", "section.band light", "section.band light", "section.band light close-host",
  ],
  /* Round 7: the three pillars became a contained ink panel, "who can join" a
     contained sand panel, and the filled `.lift` panel that overlapped the
     section above it became an unfilled keyline card — so its host band no
     longer needs the extra bottom padding either. */
  "youth-community.html": [
    "section.hero sand", "section.band light", "section.band light",
    "section.band light", "section.band light", "section.split-shot light", "section.band light",
    "section.ask-host light", "section.band light close-host",
  ],
  "resources.html": [
    "section.hero dark", "section.band light", "section.band light", "section.band light close-host",
  
  ],
};

/** Direct children of <main>, as tag.class. Regex is adequate here: the built
 *  markup is machine-generated and main's children are never nested in it. */
function bands(html) {
  const main = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
  const out = [];
  let depth = 0;
  const tagRe = /<(\/?)(section|div|figure|article|nav|p|h2|a|span|ul|dl|button|img|br|em|i|b|input|label|form|svg|path|blockquote|figcaption|address|h1|h3|strong|video|ol|li|dt|dd)\b([^>]*)>/g;
  let m;
  while ((m = tagRe.exec(main))) {
    const [, close, tag, attrs] = m;
    const selfClosing = attrs.endsWith("/") || ["img", "br", "input", "path"].includes(tag);
    if (!close && depth === 0 && ["section", "div", "figure"].includes(tag)) {
      const cls = (attrs.match(/class="([^"]*)"/) || [, ""])[1].trim();
      if (cls) out.push(`${tag}.${cls}`);
    }
    if (selfClosing) continue;
    depth += close ? -1 : 1;
    if (depth < 0) depth = 0;
  }
  return out;
}

const stat = (html, re) => (html.match(re) || []).length;

let fail = 0;
const rows = [];
for (const [file, expected] of Object.entries(EXPECT)) {
  let html;
  try {
    html = readFileSync(`out/${file}`, "utf8");
  } catch {
    rows.push([file, "MISSING", "-", "-", "-"]);
    fail++;
    continue;
  }
  const got = bands(html);
  const same = JSON.stringify(got) === JSON.stringify(expected);
  if (!same) fail++;
  rows.push([
    file,
    same ? "match" : "DIFF",
    `${got.length}/${expected.length}`,
    `ask:${stat(html, /class="ask__row/g)} checks:${stat(html, /<div class="checks/g)} cards:${stat(html, /class="dl-card"/g)}`,
    same ? "" : `\n    expected: ${JSON.stringify(expected)}\n    got:      ${JSON.stringify(got)}`,
  ]);
}

console.log("PAGE".padEnd(44), "RESULT".padEnd(7), "BANDS", " COUNTS");
for (const [f, r, n, c, d] of rows) {
  console.log(f.padEnd(44), r.padEnd(7), n.padEnd(6), c, d);
}
console.log(`\n${rows.length - fail}/${rows.length} pages structurally identical to the design.`);
