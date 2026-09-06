import { FOOTER_NAV, LEGAL_NAV } from "../../lib/routes";
import { ADDRESS_LINE, CONTACT, WA } from "../../lib/contact";
import { link } from "../../lib/asset";
import Logo from "./Logo";

/**
 * Charcoal footer, on every page.
 *
 * On the homepage this follows the deep-green closing CTA — the one adjacent
 * dark pair the section rhythm permits. The closing band owns the page's last
 * primary action, so nothing here is a copper `.pill`: this band is utility,
 * not conversion.
 */
export function SiteFooter() {
  return (
    <footer id="ft" className="dark charcoal">
      <div className="mast rv">
        <div>
          <div className="wm">
            <Logo reversed />
          </div>
          <p className="tag">Real support, beyond the policy.</p>
        </div>
        {/* "Since 1999" comes from the client's own logo lockup, and
            2026−1999 = 27 corroborates the trust strip. Still governed by the
            open question: 27 years for Sharon personally, or the organisation. */}
        <span className="est">
          Est. 1999
          <br />
          Malaysia
        </span>
      </div>

      <div className="mid">
        <div className="reach rv">
          <h2 className="lede">
            Talk to a person, <i>not a form.</i>
          </h2>
          <ul className="chan">
            <li>
              <span className="k">WhatsApp</span>
              {/* aria-label contains the visible string, so WCAG 2.5.3
                  (label in name) holds while the name still says which
                  channel this opens. */}
              <a className="go" data-wa={WA.footer} href="#" aria-label={`Message D’Life on WhatsApp at ${CONTACT.phone}`}>
                <span>{CONTACT.phone}</span>
                <em aria-hidden="true">→</em>
              </a>
              <p className="hint">
                Monday to Friday, 9am–6pm. Most messages get a reply the same day, and no one will chase you afterwards.
              </p>
            </li>
            <li>
              <span className="k">Email</span>
              <a className="go" href={`mailto:${CONTACT.email}`}>
                <span>{CONTACT.email}</span>
                <em aria-hidden="true">→</em>
              </a>
              <p className="hint">For anything that needs a longer answer, or a document attached.</p>
            </li>
            <li>
              <span className="k">Office</span>
              {/* Confirmed by the client, 6 Sep 2026. */}
              <address>{ADDRESS_LINE}</address>
              <p className="hint">
                Visits by appointment.{" "}
                <a data-wa={WA.visit} href="#">
                  Message us to arrange a time
                </a>
                .
              </p>
            </li>
            <li>
              {/* Social feeds the website, not the other way round. The exits
                  are grouped once, quietly, at the end of the contact list
                  rather than scattered as icons.
                  ⚠️ TODO(launch): real profile URLs. */}
              <span className="k">Elsewhere</span>
              <div className="soc">
                <a href="#">Instagram</a>
                <a href="#">Facebook</a>
                <a href="#">YouTube</a>
              </div>
            </li>
          </ul>
        </div>

        <nav className="dirs rv" aria-label="Site directory">
          {FOOTER_NAV.map((group) => (
            <div key={group.heading}>
              <h3 className="k">{group.heading}</h3>
              <ul>
                {group.links.map((l) => (
                  <li key={l.href + l.label}>
                    <a href={link(l.href)}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* This is a financial advisory; trust is the product. Deliberately no
          .rv on this band or the one below — they are the last elements on the
          page, and a missed scroll trigger must never leave a legal notice
          stuck at opacity 0.

          The Licensing slot that sat beside this notice is gone at the
          client's request: it was a marked placeholder for the open question
          (is D'Life a licensed agency in its own right, or a team under a
          larger insurer?), and that question is still open. Nothing is
          invented in its place — the answer, when it lands, comes back here as
          real copy. */}
      <div className="fine">
        <p className="note">
          D’Life Sdn Bhd is a financial advisory and insurance agency operating in Malaysia. Anything you read here
          is general information, not personal advice. It does not take your circumstances into account. A
          recommendation only follows a conversation, a needs assessment and the relevant product disclosure documents.
        </p>
      </div>

      <div className="base">
        <span>© 2026 D’Life Sdn Bhd. All rights reserved.</span>
        <div className="lx">
          {LEGAL_NAV.map((l) => (
            <a href={link(l.href)} key={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <a className="top" href="#top">
          Back to top <em aria-hidden="true">↑</em>
        </a>
      </div>
    </footer>
  );
}

export default SiteFooter;
