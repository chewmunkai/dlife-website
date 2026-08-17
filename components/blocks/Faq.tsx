import { link } from "../../lib/asset";

export type Qa = { q: string; a: string };

/**
 * BLOCK: FAQ.
 *
 * "Keep questions compact, useful and connected to deeper answers or
 * appropriate contact routes" — so every FAQ block carries a route out at the
 * bottom rather than ending on the last answer.
 *
 * The markup is the homepage's approved FAQ, lifted verbatim so the same
 * component serves every page and the styling did not have to be rebuilt.
 *
 * The accordion behaviour binds to `data-dl-accordion`, not to this
 * component's class or id, which is what lets the same JS drive an Elementor
 * widget after the WordPress rebuild: the attribute goes on the container's
 * Advanced → Attributes tab and nothing else has to change.
 */
export default function Faq({
  items,
  id = "faq",
  label = "Helpful answers",
  title,
  tone = "light",
  more,
}: {
  items: ReadonlyArray<Qa>;
  id?: string;
  label?: string;
  title?: React.ReactNode;
  tone?: "light" | "sand" | "dark";
  /** The route out. Defaults to contact when omitted; `null` renders none. */
  more?: { label: string; href: string } | null;
}) {
  const mode = tone === "sand" ? " sand" : tone === "dark" ? " dark" : "";
  const out = more === null ? null : more ?? { label: "Ask us something else", href: "/contact" };

  return (
    <section id={id} className={`dl-faq${mode}`} data-dl-accordion>
      <div className="head">
        <span className="lb rv">{label}</span>
        <h2 className="rv">
          {title ?? (
            <>
              A few common <i>questions</i>
            </>
          )}
        </h2>
      </div>
      <div className="items">
        {items.map((item) => (
          <div className="item" key={item.q}>
            <button className="q" type="button" aria-expanded={false}>
              {item.q}
              <span className="x" />
            </button>
            <div className="a">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
      {out && (
        <a className="more tlink rv" href={link(out.href)}>
          {out.label} <em aria-hidden="true">→</em>
        </a>
      )}
    </section>
  );
}
