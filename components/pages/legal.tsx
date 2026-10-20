import { Fragment, type ReactNode } from "react";
import { Band } from "../v2/blocks";
import { CONTACT } from "../../lib/contact";

/* The legal pages' body (content/cms/pages/legal.ts). */

/* Every gap in a legal draft is a visible [TO BE CONFIRMED …] marker, set loud so an unreviewed
   page reads as unfinished rather than plausibly complete (content/legal.ts). */
const MARKER = /\[TO BE CONFIRMED[^\]]*\]/g;
const isOnlyMarker = (p: string) => /^\[TO BE CONFIRMED[^\]]*\]$/.test(p.trim());

function render(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(MARKER)) {
    const at = m.index ?? 0;
    if (at > last) parts.push(linkEmail(text.slice(last, at), parts.length));
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

/** The contact address is a mailto link wherever it appears. */
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

/** A legal document: headed sections of paragraphs, the draft notice, and its date line. */
export function LegalBody({ notice, sections, updated }: { notice?: boolean; sections?: { id?: string; heading?: string; text?: string }[]; updated?: string }) {
  return (
    <Band read>
      {notice && (
        <div className="dl-notice" role="note">
          <strong>Structural draft, not approved for publication.</strong>
          <p>
            This page covers the ground it has to cover, in the site’s own voice, so a compliance owner and legal
            adviser review a document rather than a blank page. It is not legal advice and must not go live without
            that review. Every gap is marked in the copy below.
          </p>
        </div>
      )}
      <div className="dl-prose" style={{ marginTop: "clamp(26px,3.6vh,42px)" }}>
        {(sections ?? []).map((s, n) => (
          <Fragment key={s.id ?? n}>
            {/* h2: these are the page's top-level sections (overrides.css holds the size). */}
            <h2>{s.heading}</h2>
            {(s.text ?? "")
              .split(/\n{2,}/)
              .map((p) => p.trim())
              .filter(Boolean)
              .map((p, i) =>
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
      {updated && (
        <p className="micro" style={{ marginTop: "clamp(30px,4vh,48px)" }}>
          Last updated: {updated}
        </p>
      )}
    </Band>
  );
}
