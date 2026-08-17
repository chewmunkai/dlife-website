import { readFileSync } from "node:fs";

/* Expected top-level band sequence for each page, transcribed from the Claude
   Design project's own HTML while porting. `main`'s direct children, in order,
   by tag + class. */
const EXPECT = {
  "dva.html": [
    "section.crest dark ink", "section.bleed light", "section.band sand", "section.said ph",
    "section.band light", "section.band sand", "section.spread light", "section.band dark ink",
    "section.ask-host light", "section.band light close-host",
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
  "solutions.html": [
    "section.hero dark", "div.bar", "section.band light", "section.band sand", "section.stmt light",
    "section.ask-host sand", "section.band light close-host",
  ],
  "about.html": [
    "section.hero dark", "section.band light", "section.band dark", "section.band sand",
    "section.band light", "section.band sand", "section.split-shot light", "section.band light",
    "section.band light close-host",
  ],
  "careers.html": [
    "section.hero dark", "div.bar", "section.band light", "section.band light", "section.band sand",
    "section.said ph", "section.two two--flip sand", "section.ask-host light", "section.band light close-host",
  ],
  "existing-policy-support.html": [
    "section.hero dark", "div.bar", "section.band light", "section.band sand", "section.bleed light",
    "section.band light", "section.spread sand", "figure.said said--plain dark",
    "section.ask-host light", "section.band light close-host",
  ],
  "contact.html": [
    "section.hero dark", "section.band light", "section.band sand", "section.band light band--read",
    "section.ask-host light", "section.band light close-host",
  ],
  "stories.html": ["section.hero dark", "section.band light", "section.band sand", "section.band light close-host"],
  "youth-community.html": [
    "section.hero sand", "section.band light", "section.trip dark",
    "section.band sand", "section.band light", "section.split-shot light lift-host", "section.lift",
    "section.ask-host light", "section.band light close-host",
  ],
  "resources.html": [
    "section.hero dark", "section.band light", "section.band sand", "section.band light band--read",
    "section.band sand band--read", "section.band light close-host",
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
