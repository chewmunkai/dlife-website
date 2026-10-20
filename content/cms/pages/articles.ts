import { HIDE_FIELD, pageDocument } from "../define";
import { ARTICLES, type Article, type Block } from "../../articles";

/*
 * Articles in Talous CMS: one page each, at articles/<slug>. Each document is built from
 * content/articles.ts, which stays the default. The body is one text field in a small,
 * readable format (bodyText / blocksOf below), so an editor writes an article as text.
 */

/** An article body as text: a blank line between blocks, "## " a heading, "- " a list item,
 *  "> " a quote with its source on a last line starting "> — ". */
export const bodyText = (blocks: Block[]) =>
  blocks
    .map((b) => ("h" in b ? `## ${b.h}` : "list" in b ? b.list.map((l) => `- ${l}`).join("\n") : "quote" in b ? `> ${b.quote}\n> — ${b.cite}` : b.p))
    .join("\n\n");

export function blocksOf(text = ""): Block[] {
  return text
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((chunk): Block => {
      const lines = chunk.split("\n").map((l) => l.trim());
      if (lines[0].startsWith("## ")) return { h: lines.join(" ").slice(3).trim() };
      if (lines.every((l) => /^[-•]\s+/.test(l))) return { list: lines.map((l) => l.replace(/^[-•]\s+/, "")) };
      if (lines.every((l) => l.startsWith(">"))) {
        const ls = lines.map((l) => l.replace(/^>\s?/, ""));
        const at = ls.findIndex((l) => /^[—–-]\s/.test(l));
        return { quote: (at < 0 ? ls : ls.slice(0, at)).join(" "), cite: at < 0 ? "" : ls.slice(at).join(" ").replace(/^[—–-]\s+/, "") };
      }
      return { p: lines.join(" ") };
    });
}

export function articleDocument(a: Article) {
  return pageDocument([
    [
      "ArticleMain",
      {
        title: a.title,
        blurb: a.blurb,
        category: a.category,
        date: a.date,
        read: a.read,
        ...(a.photo ? { photo: a.photo.src, photoAlt: a.photo.alt, ...(a.photo.position ? { photoPosition: a.photo.position } : {}) } : {}),
        body: bodyText(a.body),
      },
    ],
    ["ArticleMore", { label: "Keep reading", title: "More from D’Life" }],
    [
      "PageClosing",
      {
        title: "Would rather just ask someone?",
        lede: "Reading is a fine place to start, but most questions are quicker to answer in a conversation.",
        actions: [
          { id: "a1", label: "Ask a question", href: "wa:question", style: "pill" },
          { id: "a2", label: "Back to Articles & Events", href: "/resources", style: "pill ghost" },
        ],
      },
    ],
  ]);
}

/** An article's listing details and body as published: the ArticleMain section over the file's. */
export function articleFrom(a: Article, props: Record<string, unknown> | undefined): Article {
  if (!props) return a;
  const s = (k: string, d: string) => (typeof props[k] === "string" && props[k] ? (props[k] as string) : d);
  const photo = s("photo", "");
  return {
    ...a,
    title: s("title", a.title),
    blurb: s("blurb", a.blurb),
    category: s("category", a.category),
    date: s("date", a.date),
    read: s("read", a.read),
    photo: photo ? { src: photo, alt: s("photoAlt", ""), ...(s("photoPosition", "") ? { position: s("photoPosition", "") } : {}) } : undefined,
    body: blocksOf(s("body", bodyText(a.body))),
  };
}

export const ARTICLE_PAGES = ARTICLES.map((a) => ({ slug: `articles/${a.slug}`, title: a.title, template: "article", document: articleDocument(a) }));

export const ARTICLE_BLOCKS = {
  ArticleMain: {
    label: "Article",
    fields: {
      title: { type: "text", label: "Title", max: 160 },
      blurb: { type: "textarea", label: "One line under the title (also on the article card)", max: 400 },
      category: { type: "text", label: "Category", max: 60 },
      date: { type: "text", label: "Published date", max: 10, pattern: "\\d{4}-\\d{2}-\\d{2}", patternHint: "a date written like 2026-10-12" },
      read: { type: "text", label: "Reading time, e.g. 6 min read", max: 30 },
      photo: { type: "image", label: "Lead photo" },
      photoAlt: { type: "text", label: "Photo description (alt text)", max: 300 },
      photoPosition: { type: "text", label: "Photo focus, e.g. 50% 18% (optional)", max: 20 },
      body: {
        type: "textarea",
        label: "Article text: a blank line between paragraphs; ## starts a heading; - starts a list item; > starts a quote, with its source on a last line starting > —",
        max: 30000,
      },
    },
  },
  ArticleMore: {
    label: "More articles",
    description: "Up to three other articles, newest first.",
    fields: { label: { type: "text", label: "Small label", max: 60 }, title: { type: "text", label: "Heading", max: 120 }, hidden: HIDE_FIELD },
  },
} as const;
