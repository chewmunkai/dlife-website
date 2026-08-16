import SiteShell from "../site/SiteShell";
import JsonLd from "../site/JsonLd";
import { E2Hero, E2Band } from "../blocks/E2";
import RelatedContent from "../blocks/Related";
import { LEGAL } from "../../content/legal";
import { ROUTES } from "../../lib/routes";
import { breadcrumbLd } from "../../lib/seo";

/**
 * One template, four legal pages — direction E2 ("layered depth").
 *
 * The hero is the flat variant: these pages have no photograph, and the
 * subject is not something a photograph could carry honestly.
 *
 * ⚠️ Every one of these is a draft pending review by D'Life's compliance owner
 * and legal adviser. The banner below says so on the page itself rather than
 * only in a code comment — an unreviewed legal page that looks finished is the
 * failure mode worth designing against.
 *
 * The `[TO BE CONFIRMED — …]` markers in the copy are rendered in the accent
 * colour so they are impossible to miss on a read-through. Remove the banner
 * only when every marker is gone.
 */
export default function LegalPage({ slug }: { slug: keyof typeof LEGAL }) {
  const c = LEGAL[slug];
  const route = ROUTES[c.key];

  return (
    <SiteShell path={route.path}>
      <E2Hero route={route} label={c.label} title={c.h1} lede={c.lede} />

      <E2Band read>
        <div className="dl-notice rv" role="note">
          <strong>Draft — pending legal and compliance review.</strong>
          <p>
            This page is a working draft prepared for D’Life’s review. Passages marked{" "}
            <em>[TO BE CONFIRMED]</em> are deliberately unfinished: they require information or wording that only
            D’Life and its adviser can supply. Do not treat this page as the final published position.
          </p>
        </div>

        {c.sections.map((s) => (
          <section className="dl-legal__section rv" key={s.heading}>
            <h2>{s.heading}</h2>
            {s.paras.map((p, i) => (
              <p key={i} className={p.startsWith("[TO BE CONFIRMED") ? "dl-tbc" : undefined}>
                {p}
              </p>
            ))}
          </section>
        ))}
      </E2Band>

      <RelatedContent keys={c.related} heading="Other legal pages" tone="sand" />

      <JsonLd data={breadcrumbLd(route)} />
    </SiteShell>
  );
}
