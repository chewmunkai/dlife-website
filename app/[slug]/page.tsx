import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Render } from "@puckeditor/core/rsc";
import type { Config } from "@puckeditor/core";
import SiteShell from "../../components/site/SiteShell";
import { KIT } from "../../components/kit/blocks";
import { KIT_BLOCKS } from "../../content/cms/kit-manifest";
import { getPublished, listPublished } from "../../lib/talous";
import { SITE } from "../../lib/site";
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

export async function generateStaticParams() {
  // Only used by the static export; the server build renders on demand.
  return (await listPublished()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  if (!SLUG.test(params.slug)) return {};
  const page = await getPublished(params.slug);
  if (!page) return {};
  const title = page.seo.title || page.title || params.slug;
  const description = page.seo.description || undefined;
  const url = `${SITE}/${params.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: "D’Life", locale: "en_MY", url, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CmsPage({ params }: { params: { slug: string } }) {
  if (!SLUG.test(params.slug)) notFound();
  const page = await getPublished(params.slug);
  if (!page) notFound();
  return (
    <SiteShell path={`/${params.slug}`}>
      <Render config={config} data={page.content as never} />
    </SiteShell>
  );
}
