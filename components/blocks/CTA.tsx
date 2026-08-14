import type { ReactNode } from "react";
import { link } from "../../lib/asset";

/**
 * BLOCK: contextual CTA.
 *
 * "The action should match the visitor's current thought" — so this takes its
 * wording and its WhatsApp prefill from the page it closes, rather than
 * repeating one generic contact panel down the site.
 *
 * One primary action per section, maximum. The secondary is an outline or a
 * text-and-arrow, never a second copper fill.
 */
export default function ContextualCTA({
  label,
  title,
  copy,
  wa,
  action = "Speak with an Advisor",
  secondary,
  tone = "dark",
  id,
}: {
  label?: string;
  title: ReactNode;
  copy?: ReactNode;
  /** Pre-filled WhatsApp message. See lib/contact.ts — keep these distinct. */
  wa: string;
  action?: string;
  secondary?: { label: string; href: string };
  tone?: "light" | "sand" | "dark";
  id?: string;
}) {
  const mode = tone === "sand" ? " sand" : tone === "dark" ? " dark" : "";
  return (
    <section id={id} className={`dl-band dl-band--wide dl-cta${mode}`}>
      <div className="dl-cta__inner">
        {label && <span className="lb rv">{label}</span>}
        <h2 className="rv">{title}</h2>
        {copy && <p className="dl-lede rv">{copy}</p>}
        <div className="dl-actions rv">
          <a className="pill" data-wa={wa} href="#">
            <span>{action}</span>
          </a>
          {secondary && (
            <a className="pill ghost" href={link(secondary.href)}>
              <span>{secondary.label}</span>
            </a>
          )}
        </div>
        {/* The line that does more work than any other on the site. The tone
            guide holds it up as the standard: pressure removed rather than
            urgency manufactured. */}
        <p className="dl-cta__note rv">Most conversations with us don’t end in a decision, and that’s completely fine.</p>
      </div>
    </section>
  );
}
