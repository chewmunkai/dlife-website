import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Render } from "@puckeditor/core/rsc";
import type { Config } from "@puckeditor/core";
import SiteShell from "../../components/site/SiteShell";
import { KIT } from "../../components/kit/blocks";
import { KIT_BLOCKS } from "../../content/cms/kit-manifest";
import { getPublished, listPublished } from "../../lib/talous";
import { SITE, isPreview } from "../../lib/site";
import { OG_IMAGE, withCmsSeo } from "../../lib/seo";
import "../../styles/kit.css";

/*
 * Pages built in Talous CMS, served at /<slug>. Routes built in code (folders
 * under app/) always win over this one, and the CMS refuses those slugs, so a
 * CMS page can never shadow a designed page. Rendered on the server with
 * Puck's RSC renderer: no editor code reaches visitors.
 */

// The renderer needs to know which fields are slots (containers), so it turns their nested
// blocks into renderable zones; other fields are plain props and need no declaration.
const slotFields = (type: string) =>
  Object.fromEntries(
    Object.entries((KIT_BLOCKS as Record<string, { fields: Record<string, { type: string }> }>)[type]?.fields ?? {})
      .filter(([, f]) => f.type === "slot")
      .map(([name]) => [name, { type: "slot" }]),
  );

const config = {
  components: Object.fromEntries(Object.entries(KIT).map(([type, render]) => [type, { fields: slotFields(type), render }])),
  root: { render: ({ children }: { children: React.ReactNode }) => <>{children}</> },
} as unknown as Config;

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// Page files may only export what Next.js expects, so this stays private.
const NO_PAGES = "_none";

export async function generateStaticParams() {
  // Only used by the static export; the server build renders on demand. The export refuses a
  // dynamic route with no params at all, which is the normal state before any CMS page is
  // published, so it gets one placeholder that renders the 404 page.
  const pages = (await listPublished()).map((p) => ({ slug: p.slug }));
  return pages.length ? pages : [{ slug: NO_PAGES }];
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  if (!SLUG.test(params.slug)) return {};
  const page = await getPublished(params.slug);
  if (!page) return {};
  const title = page.seo.title || page.title || params.slug;
  const url = `${SITE}/${params.slug}`;
  // The same defaults as the pages built in code (share image, preview noindex), then the
  // page settings from the CMS on top.
  return withCmsSeo(
    {
      title,
      alternates: { canonical: url },
      openGraph: { type: "website", siteName: "D’Life", locale: "en_MY", url, title, images: [OG_IMAGE] },
      twitter: { card: "summary_large_image", title, images: [OG_IMAGE.url] },
      robots: isPreview ? { index: false, follow: true } : { index: true, follow: true },
    },
    page.seo,
  );
}

export default async function CmsPage({ params }: { params: { slug: string } }) {
  if (!SLUG.test(params.slug) || params.slug === NO_PAGES) notFound();
  const page = await getPublished(params.slug);
  // Only pages built from the kit are web pages; library content (the film list…) isn't one.
  if (!page || !page.content.content.every((b) => b.type in KIT)) notFound();
  return (
    <SiteShell path={`/${params.slug}`}>
      <Render config={config} data={page.content as never} />
    </SiteShell>
  );
}
