import { Fragment, type ReactNode } from "react";
import Shell from "./Shell";
import JsonLd from "../site/JsonLd";
import { Hero, Band, Cards } from "./blocks";
import { LEGAL } from "../../content/legal";
import { ROUTES } from "../../lib/routes";
import { CONTACT } from "../../lib/contact";
import { breadcrumbLd } from "../../lib/seo";

/**
 * One template, four legal pages — the new design.
 *
 * The hero is the flat variant: these pages have no photograph, and the
 * subject is not something a photograph could carry honestly.
 *
 * ⚠️ Every one of these is a draft pending review by D'Life's compliance owner
 * and legal adviser. The banner says so on the page itself rather than only in
 * a code comment — an unreviewed legal page that looks finished is the failure
 * mode worth designing against.
 *
 * The `[TO BE CONFIRMED — …]` markers in content/legal.ts render as `.tbc`,
 * which pages.css sets loud: copper on a wash, with an underline. A paragraph
 * that is *only* a marker becomes a `.dl-notice` block instead, matching the
 * design, so the largest gaps read as gaps rather than as sentences.
 * Remove the banner only when every marker is gone.
 */

/* The date the copy was last revised, not the build date. A "last updated"
   stamp that moves every deploy tells a reader nothing about the document,
   and on a legal page it actively misleads. Bump this when the copy changes. */
const DRAFTED = "2026-08-16";

const MARKER = /\[TO BE CONFIRMED[^\]]*\]/g;

/** Inline the loud markers and the support address, keeping content/legal.ts
 *  as plain strings rather than markup. */
function render(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(MARKER)) {
    const at = m.index ?? 0;
    if (at > last) parts.push(linkEmail(text.slice(last, at), parts.length));
    // The design prints the marker with a colon; the site's copy rules bar the
    // em dash the source file uses.
    parts.push(
      <span className="tbc" key={`t${at}`}>
        {m[0].replace("— ", ": ").replace("—", ":")}
      </span>,
    );
    last = at + m[0].length;
  }
  if (last < text.length) parts.push(linkEmail(text.slice(last), parts.length));
  return parts.length ? parts : text;
}

function linkEmail(chunk: string, key: number): ReactNode {
  const i = chunk.indexOf(CONTACT.email);
  if (i === -1) return <Fragment key={`c${key}`}>{chunk}</Fragment>;
  return (
    <Fragment key={`c${key}`}>
      {chunk.slice(0, i)}
      <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
      {chunk.slice(i + CONTACT.email.length)}
    </Fragment>
  );
}

const isOnlyMarker = (p: string) => /^\[TO BE CONFIRMED[^\]]*\]$/.test(p.trim());

export default function LegalPage({ slug }: { slug: keyof typeof LEGAL }) {
  const c = LEGAL[slug];
  const route = ROUTES[c.key];

  return (
    <Shell>
      <Hero route={route} label={c.label} title={c.h1} lede={c.lede} />

      <Band read>
        <div className="dl-notice" role="note">
          <strong>Structural draft, not approved for publication.</strong>
          <p>
            This page covers the ground it has to cover, in the site’s own voice, so a compliance owner and legal
            adviser review a document rather than a blank page. It is not legal advice and must not go live without
            that review. Every gap is marked in the copy below.
          </p>
        </div>

        <div className="dl-prose" style={{ marginTop: "clamp(26px,3.6vh,42px)" }}>
          {c.sections.map((s) => (
            <Fragment key={s.heading}>
              <h3>{s.heading}</h3>
              {s.paras.map((p, i) =>
                isOnlyMarker(p) ? (
                  <div className="dl-notice" key={i}>
                    <p>{render(p)}</p>
                  </div>
                ) : (
                  <p key={i}>{render(p)}</p>
                ),
              )}
            </Fragment>
          ))}
        </div>

        <p className="micro" style={{ marginTop: "clamp(30px,4vh,48px)" }}>
          Last updated: draft, {DRAFTED}
        </p>
      </Band>

      <Band tone="sand" label="Also in this section" title="Related legal pages">
        <Cards
          items={c.related.map((k) => ({
            title: ROUTES[k].label,
            copy: ROUTES[k].teaser,
            href: ROUTES[k].path,
          }))}
        />
      </Band>

      <JsonLd data={breadcrumbLd(route)} />
    </Shell>
  );
}
