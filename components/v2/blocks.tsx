import { Fragment, type ReactNode } from "react";
import Carousel from "./Carousel";
import { asset, link } from "../../lib/asset";
import { trail, type Route } from "../../lib/routes";
import { Icon, type IconKey } from "./icons";

/* ============================================================
   Block library for the new design.

   The same modules as components/blocks/E2.tsx, but emitting the design
   project's own unprefixed class names (.hero, .bar, .band, .split-shot,
   .rail, .said, .closing …) rather than the repo's `e2-` prefixed ones.

   That prefix is the whole difference between the two files. The `e2-` rules
   live in styles/pages.css nested under `.dlife`; these live in
   styles/ds/pages.css unscoped, straight from the design project. Keeping the
   two separate is what lets both designs render in one build — see
   components/v2/Shell.tsx.

   Nothing here holds copy. Everything is passed in.
   ============================================================ */

export type Tone = "light" | "sand" | "dark" | "ink";
export type Photo = {
  src: string;
  alt: string;
  position?: string;
  /**
   * The frame takes THIS ratio instead of its own, e.g. "4 / 3".
   *
   * Client rule, 6 Sep 2026: a D'Life photograph never has anyone cropped out
   * of it. The design's plates are fixed shapes, so a 4:3 group photo in a
   * 4:5 plate loses 40% of its width — and the people standing at either end
   * with it. Setting this to the file's own ratio makes `object-fit: cover`
   * resolve to an exact fit, so nothing is lost.
   *
   * Only set it on the practice's own photography. Licensed stock is composed
   * to be cropped and the design's proportions are deliberate.
   */
  ratio?: string;
};

/** The frame style a `Photo` asks for, or nothing. */
export const frameOf = (photo?: Photo) => (photo?.ratio ? { aspectRatio: photo.ratio } : undefined);

/** `ink` is a second dark, so a dark page can modulate without a third colour. */
export const mode = (tone: Tone = "light") => (tone === "ink" ? "dark ink" : tone);

const Img = ({ photo }: { photo: Photo }) => (
  <img
    src={asset(photo.src)}
    alt={photo.alt}
    style={photo.position ? { objectPosition: photo.position } : undefined}
  />
);

/** Orientation, not navigation: quiet, and above the label rather than beside it. */
export function Crumbs({ route }: { route: Route }) {
  const path = trail(route);
  return (
    <nav className="dl-crumbs" aria-label="Breadcrumb">
      <ol>
        {path.map((r, i) =>
          i === path.length - 1 ? (
            <li key={r.path}>
              <span aria-current="page">{r.label}</span>
            </li>
          ) : (
            <li key={r.path}>
              <a href={link(r.path)}>{r.label}</a>
              <em>/</em>
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}

/**
 * Page hero: the photograph bleeds off the edge and the copy panel cuts into
 * it. Omit `photo` for the flat variant, which the legal pages use — their
 * subject is not something a photograph could carry honestly.
 */
export function Hero({
  route,
  label,
  title,
  lede,
  photo,
  actions,
  tone = "dark",
  panel = "light",
}: {
  route: Route;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  photo?: Photo;
  actions?: ReactNode;
  tone?: Tone;
  panel?: "light" | "green";
}) {
  return (
    <section className={`hero ${photo ? "" : "hero--noart "}${mode(tone)}`}>
      {photo && (
        <div className="art ph" style={frameOf(photo)}>
          <Img photo={photo} />
        </div>
      )}
      <div className={`card ${panel === "green" ? "card--green dark" : "light"}`}>
        <Crumbs route={route} />
        <p className="lbl">{label}</p>
        <h1>{title}</h1>
        {lede && <p className="dl-lede">{lede}</p>}
        {actions && <div className="dl-actions">{actions}</div>}
      </div>
    </section>
  );
}

/** Sticky intent bar: what a visitor wants settled before committing. */
export function Bar({ facts, statement, action }: { facts: string[]; statement: string; action?: ReactNode }) {
  return (
    /* A03: without an action the third grid column holds nothing, so the
       statement takes the room back rather than leaving a gap where a button
       used to be. See styles/amendments.css §27b. */
    <div className={action ? "bar" : "bar bar--stated"}>
      <div className="facts">
        {facts.map((f) => (
          <span key={f}>{f}</span>
        ))}
      </div>
      <strong>{statement}</strong>
      {action}
    </div>
  );
}

export function Band({
  tone = "light",
  label,
  title,
  lede,
  read = false,
  id,
  className,
  children,
}: {
  tone?: Tone;
  label?: string;
  title?: ReactNode;
  lede?: ReactNode;
  read?: boolean;
  /** In-page anchor target, e.g. the homepage cards' deep links. */
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`band ${mode(tone)}${read ? " band--read" : ""}${className ? ` ${className}` : ""}`}
    >
      {label && <p className="lbl">{label}</p>}
      {title && <h2>{title}</h2>}
      {lede && <p className="dl-lede">{lede}</p>}
      {children}
    </section>
  );
}

/** Editorial opening: one large Lora line, prose beside it. */
export function Open({ lead, children }: { lead: ReactNode; children: ReactNode }) {
  return (
    <div className="open">
      <p className="lead">{lead}</p>
      <div className="dl-prose">{children}</div>
    </div>
  );
}

/* ---- August 2026 amendment blocks. Styles in styles/amendments.css. ---- */

/**
 * The opening rebuilt as the page's typographic moment: first sentence at
 * display scale, the remainder as a Lora subline on a copper rule, prose
 * offset right. Splitting at the first full stop is what turns a written
 * lead into a composed one, and a one-sentence lead simply skips the subline.
 */
export function OpenStatement({ kick, lead, children }: { kick: string; lead: string; children: ReactNode }) {
  const cut = lead.indexOf(". ");
  const head = cut === -1 ? lead : lead.slice(0, cut + 1);
  const rest = cut === -1 ? null : lead.slice(cut + 2);
  return (
    <div className={`dl-open2${rest ? "" : " one"}`}>
      <div className="head">
        <span className="kick">{kick}</span>
        <h2 className="say">{head}</h2>
      </div>
      {/* The subline lives inside the right column, not beside it: as a third
          grid child it wrapped onto a second row and dragged the prose back
          under the statement. */}
      <div className="side dl-prose">
        {rest && <p className="say-rest">{rest}</p>}
        {children}
      </div>
    </div>
  );
}

/**
 * The prompting situations as image-topped cards, three to a row.
 *
 * The photograph gives the visitor something to picture beside a sentence
 * about their own life. It rests desaturated and comes to full colour on
 * hover, with the corner arrow turning — the same gesture as the reference
 * the client supplied, done in CSS so no motion library ships and
 * `prefers-reduced-motion` is honoured (styles/amendments.css §2).
 */
export function Moments({
  title,
  items,
  photos,
  tone = "light",
}: {
  title: ReactNode;
  items: ReadonlyArray<ReactNode>;
  photos?: ReadonlyArray<Photo>;
  tone?: Tone;
}) {
  return (
    <section className={`band moments ${mode(tone)}`}>
      <h2>{title}</h2>
      <div className="rows">
        {items.map((item, i) => {
          const photo = photos?.[i];
          return (
            <article className="mcard" key={i}>
              {photo && (
                <div className="shot">
                  <Img photo={photo} />
                </div>
              )}
              <div className="body">
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>{item}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/**
 * The card grid on its own, for sections that need the pattern without the
 * `.ideas` section head around it. Careers uses it directly.
 */
/**
 * A02: a set that does not fill its row leaves one card stranded beside three
 * empty slots. `railed()` is the test — more cards than a row holds, and not
 * a whole number of rows.
 *
 * ⚠️ Revised 6 Sep 2026. The answer used to be a carousel; the client asked
 * for the other option the brief offered — "3 in a row, the rest put down
 * there and align to middle". So a set that passes this test now renders
 * three across with its remainder centred underneath (`.icards--fill`,
 * styles/amendments.css §27e) rather than as a rail. The Carousel component
 * stays: Stories still uses it, and it is still right for a set of films.
 */
export const railed = (count: number, columns = 4) => count > columns && count % columns !== 0;

/**
 * How a card set lays out. L06 made this explicit rather than derived: the
 * client wants Existing Policy Support's five on a rail and the five-term and
 * five-question sections on the balanced grid, which no single rule about
 * counts can express.
 *
 *   grid — wrapping rows, for a set that tiles cleanly
 *   fill — three across with the remainder centred underneath
 *   rail — four in view, the rest reachable by arrow, drag or keyboard
 */
export type CardLayout = "grid" | "fill" | "rail";

export function IdeaCards({
  items,
  icons,
  columns = 4,
  layout = "grid",
  label = "cards",
}: {
  items: ReadonlyArray<{ term: string; copy: ReactNode }>;
  icons?: ReadonlyArray<IconKey>;
  columns?: 3 | 4;
  layout?: CardLayout;
  /** Names the rail for a screen reader, e.g. "terms". Ignored otherwise. */
  label?: string;
}) {
  const grid = `icards${columns === 3 ? " icards--3" : ""}${layout === "fill" ? " icards--fill" : ""}`;
  const cards = items.map((d, i) => (
    <article className="icard" key={d.term}>
      <span className="no">{String(i + 1).padStart(2, "0")}</span>
      {icons?.[i] && <Icon name={icons[i]} />}
      <div className="foot">
        <h3>{d.term}</h3>
        <p>{d.copy}</p>
      </div>
    </article>
  ));

  if (layout === "rail") {
    return (
      <Carousel label={label} className={grid}>
        {cards}
      </Carousel>
    );
  }
  return <div className={grid}>{cards}</div>;
}

/**
 * The definitions as rounded tinted cards: ordinal, geometric icon, term,
 * one plain-language sentence. Structure follows the reference the client
 * supplied; the tints are brand washes rather than the reference's purple /
 * green / red, and the icons are the system's own outline set.
 */
export function Ideas({
  label,
  title,
  lede,
  items,
  icons,
  layout,
  railLabel = "terms",
}: {
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  items: ReadonlyArray<{ term: string; copy: ReactNode }>;
  icons?: ReadonlyArray<IconKey>;
  /** Omitted, a set that does not tile falls back to the balanced grid. */
  layout?: CardLayout;
  /** Names the rail when the set is one. Say what the cards are. */
  railLabel?: string;
}) {
  return (
    <section className="band light ideas">
      {label && <p className="lbl">{label}</p>}
      <h2>{title}</h2>
      {lede && <p className="dl-lede">{lede}</p>}
      {/* A02/L06: four terms tile. A set that does not gets the balanced grid
          unless the page asks for a rail — Existing Policy Support does. */}
      <IdeaCards
        items={items}
        icons={icons}
        layout={layout ?? (railed(items.length) ? "fill" : "grid")}
        label={railLabel}
      />
    </section>
  );
}

/**
 * The practice's four commitments on the page's one ink panel.
 *
 * Was `.pillars`, four hairlined text columns on a full-width dark band. A
 * full-width dark band stopped meaning "important" once round 2 put the whole
 * site on one ground, so the creed becomes a contained object instead — same
 * highlight grammar as the solution pages' steps panel (styles/amendments.css
 * §11).
 *
 * The ordinals are information, not decoration: the client's heading says
 * these are in the order they matter.
 */
export function Creed({
  label,
  title,
  lede,
  items,
  icons,
}: {
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  items: ReadonlyArray<{ term: string; copy: ReactNode }>;
  icons?: ReadonlyArray<IconKey>;
}) {
  return (
    <section className="band light">
      {label && <p className="lbl">{label}</p>}
      <h2>{title}</h2>
      {lede && <p className="dl-lede">{lede}</p>}
      {/* `dark` flips the section tokens so anything token-driven inside the
          panel resolves against ink rather than the ivory band. */}
      <div className="creed dark">
        {items.map((c, i) => (
          <div className="cm" key={c.term}>
            <span className="no">{String(i + 1).padStart(2, "0")}</span>
            {icons?.[i] && <Icon name={icons[i]} size={34} />}
            <div className="foot">
              <h3>{c.term}</h3>
              <p>{c.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Mission and vision as one contained panel split by a hairline, rather than
 * two bare text columns. The claim is set at display scale; the client's own
 * wording sits under a copper rule beneath it, so the structure separates the
 * promise from the paragraph qualifying it (styles/amendments.css §12).
 */
export function MissionVision({
  label,
  title,
  items,
}: {
  label?: string;
  title?: ReactNode;
  items: ReadonlyArray<{ kind: string; claim: string; copy: ReactNode }>;
}) {
  return (
    <section className="band light">
      {label && <p className="lbl">{label}</p>}
      {title && <h2>{title}</h2>}
      <div className="mv2">
        {items.map((m) => (
          <div key={m.kind}>
            <span className="k">{m.kind}</span>
            <h3>{m.claim}</h3>
            <p>{m.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * A record of figures held on a contained sand panel: the sentence that frames
 * them on the left, the figures as hairlined rows on the right.
 *
 * Sand is the page's third register — ink for the creed, cream for mission and
 * vision, sand here — so the three highlights read as three levels of emphasis
 * rather than three unrelated colours (styles/amendments.css §13).
 */
export function Record({
  label,
  title,
  lede,
  say,
  hint,
  photo,
  figures,
}: {
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  /** The framing sentence. Ignored when `photo` is given. */
  say?: ReactNode;
  /** Small print under the framing sentence, e.g. a verification note. */
  hint?: ReactNode;
  /** Fills the left half instead of the framing sentence. */
  photo?: Photo;
  figures: ReadonlyArray<{ fig: string; copy: ReactNode }>;
}) {
  return (
    <section className="band light">
      {label && <p className="lbl">{label}</p>}
      <h2>{title}</h2>
      {lede && <p className="dl-lede">{lede}</p>}
      <div className="record">
        {photo ? (
          <div className="shot ph" style={frameOf(photo)}>
            <Img photo={photo} />
          </div>
        ) : (
          <div className="say">
            {say && <p>{say}</p>}
            {hint && <p className="hint">{hint}</p>}
          </div>
        )}
        {/* Cells, not rows: see styles/amendments.css §13 on why the numeral
            and its description are siblings in one grid. */}
        <div className="rows">
          {figures.map((f) => (
            <Fragment key={f.fig}>
              <b>{f.fig}</b>
              <span>{f.copy}</span>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * The team as portrait cards.
 *
 * A member without a `photo` renders a marked slot, not stock photography: a
 * stranger's face standing in for a named colleague is the one substitution
 * this design system refuses to make. A member without a `name` renders the
 * field as marked too, so an unfilled roster reads as unfilled rather than as
 * people nobody can identify (styles/amendments.css §14).
 */
export function Roster({
  label,
  title,
  lede,
  notice,
  members,
  children,
}: {
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  notice?: ReactNode;
  members: ReadonlyArray<{ name?: string; role: string; copy?: ReactNode; photo?: Photo }>;
  /** Rendered under the grid, for onward routes that belong with the team. */
  children?: ReactNode;
}) {
  return (
    <section className="band light">
      {label && <p className="lbl">{label}</p>}
      <h2>{title}</h2>
      {lede && <p className="dl-lede">{lede}</p>}
      {notice && (
        <div className="dl-notice" role="note" style={{ marginTop: "clamp(20px,2.8vh,30px)" }}>
          {notice}
        </div>
      )}
      <div className="roster">
        {members.map((m, i) => (
          <article className="mb" key={m.name ?? `${m.role}-${i}`}>
            <div className="ph">
              {m.photo ? (
                <Img photo={m.photo} />
              ) : (
                <div className="slot-empty">
                  {m.name ?? "Portrait"}
                  <em>To follow</em>
                </div>
              )}
            </div>
            {/* Whichever of the two is known leads the card. With a name, the
                role is the small label above it; without one, the role IS the
                card's identity and the missing name is marked in the site's
                own `.tbc` register — printing the role in both places said
                the same thing twice. */}
            <div className="body">
              {m.name ? (
                <>
                  <span className="rl">{m.role}</span>
                  <h3>{m.name}</h3>
                </>
              ) : (
                <h3>{m.role}</h3>
              )}
              {m.copy && <p>{m.copy}</p>}
              {!m.name && <span className="tbc">Name to follow</span>}
            </div>
          </article>
        ))}
      </div>
      {children}
    </section>
  );
}

/**
 * Three pillars on a contained ink panel: ordinal and icon on one line, the
 * domain at display scale, its claim, then the specifics as a list.
 *
 * The list is the point of the redesign. Each pillar's copy arrived as a claim
 * followed by four or five comma-separated specifics inside one sentence, so
 * the list already existed; it just could not be scanned
 * (styles/amendments.css §16).
 */
export function Trio({
  id,
  label,
  title,
  items,
  icons,
}: {
  id?: string;
  label?: string;
  title: ReactNode;
  items: ReadonlyArray<{ title: string; claim: string; items: ReadonlyArray<string> }>;
  icons?: ReadonlyArray<IconKey>;
}) {
  return (
    <section className="band light" id={id}>
      {label && <p className="lbl">{label}</p>}
      <h2>{title}</h2>
      <div className="trio dark">
        {items.map((p, i) => (
          <div className="pl" key={p.title}>
            <div className="top">
              <span className="no">{String(i + 1).padStart(2, "0")}</span>
              {icons?.[i] && <Icon name={icons[i]} size={32} />}
            </div>
            <h3>{p.title}</h3>
            <p className="claim">{p.claim}</p>
            <ul>
              {p.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Audience categories as a subdivided sand panel: category at display scale,
 * the reason beneath it. Replaces a ledger of six long sentences, each of
 * which was a category and a reason run together (styles/amendments.css §17).
 */
export function WhoGrid({
  label,
  title,
  lede,
  items,
  children,
}: {
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  items: ReadonlyArray<{ who: string; why: string }>;
  /** Anything between the lede and the panel, e.g. the count. */
  children?: ReactNode;
}) {
  return (
    <section className="band light">
      {label && <p className="lbl">{label}</p>}
      <h2>{title}</h2>
      {lede && <p className="dl-lede">{lede}</p>}
      {children}
      <div className="whogrid">
        {items.map((w, i) => (
          <div className="w" key={w.who}>
            <span className="no">{String(i + 1).padStart(2, "0")}</span>
            <h3>{w.who}</h3>
            <p>{w.why}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * A card with no fill: a copper keyline and a hairline outline holding open
 * space, at the client's direction. Words left, the form right — nothing here
 * needed to be stacked (styles/amendments.css §18).
 */
export function LoopCard({
  id,
  label,
  title,
  lede,
  children,
}: {
  id?: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="band light" id={id}>
      {/* `dark` flips the section tokens: the card is brown, so the field, its
          label and the ghost outlines all need to resolve against a dark
          ground rather than staying set for the ivory band behind it. */}
      <div className="loop dark">
        <div className="say">
          <p className="lbl">{label}</p>
          <h2>{title}</h2>
          {lede && <p className="dl-lede">{lede}</p>}
        </div>
        <div className="form">{children}</div>
      </div>
    </section>
  );
}

/**
 * Sessions grouped by how often they come round, one tier per row, each row's
 * column count set by its own item count.
 *
 * That is the whole idea: the copy claims frequency is what tells you about
 * the commitment, so the monthly session gets a row to itself and the twelve
 * -times-a-year items share one. As three equal columns the tiers held one,
 * three and four items and the first ran a hole under a single entry
 * (styles/amendments.css §19).
 */
export function YearMap({
  label,
  title,
  lede,
  tiers,
}: {
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  tiers: ReadonlyArray<{
    when: string;
    note: string;
    items: ReadonlyArray<{ name: string; copy: ReactNode }>;
  }>;
}) {
  return (
    <section className="band light">
      {label && <p className="lbl">{label}</p>}
      <h2>{title}</h2>
      {lede && <p className="dl-lede">{lede}</p>}
      <div className="yearmap">
        {tiers.map((t, i) => (
          /* The first tier is the spine and carries the ink treatment: the
             section's argument is that frequency is the signal, so the thing
             that happens every month is the darkest object in it. */
          <div className={`tier${i === 0 ? " tier--spine dark" : ""}`} key={t.when}>
            <div>
              <span className="when">{t.when}</span>
              <span className="note">{t.note}</span>
              <span className="n">
                <b>{String(t.items.length).padStart(2, "0")}</b>
                {t.items.length === 1 ? "session" : "kinds of session"}
              </span>
            </div>
            <div className="items" style={{ ["--n" as string]: t.items.length }}>
              {t.items.map((it) => (
                <div className="it" key={it.name}>
                  <b>{it.name}</b>
                  <span>{it.copy}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * A selection process: the label and the framing sentence on a sticky rail,
 * the three stages beside it on one copper line.
 *
 * Round 8 returned this to the earlier, simpler shape at the client's
 * direction — the narrowing-stack version overstated it. The detail that
 * carries the argument now is the last marker being filled while the first two
 * are rings: only the invitation is an outcome (styles/amendments.css §20).
 */
export function Gate({
  label,
  title,
  aside,
  stages,
}: {
  label?: string;
  title: ReactNode;
  aside?: ReactNode;
  stages: ReadonlyArray<{ k: string; title: string; copy: ReactNode }>;
}) {
  return (
    <section className="spread light">
      <div className="spread__rail">
        {label && <p className="lbl">{label}</p>}
        <h2>{title}</h2>
        {aside && <p className="aside">{aside}</p>}
      </div>
      <div className="spread__body">
        <div className="seq2">
          {stages.map((s) => (
            <div key={s.k}>
              <span className="k">{s.k}</span>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Short commitments set as statements in a 2 x 2, with no rules at all.
 *
 * They were a hairlined numbered ledger sitting directly above the FAQ, which
 * is also a hairlined numbered ledger. Removing every rule is what separates
 * this section from the one under it (styles/amendments.css §21).
 */
export function Holds({ label, title, items }: { label?: string; title: ReactNode; items: ReadonlyArray<string> }) {
  return (
    <section className="band dark ink">
      {label && <p className="lbl">{label}</p>}
      <h2>{title}</h2>
      <div className="holds">
        {items.map((t, i) => (
          <div className="hd" key={t}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            <p>{t}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** The steps carried on a contained ink panel — the band's dark room. */
export function StepsPanel({
  label,
  title,
  lede,
  steps,
}: {
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  steps: ReadonlyArray<{ title: string; copy: ReactNode }>;
}) {
  return (
    <section className="band sand">
      {label && <p className="lbl">{label}</p>}
      <h2>{title}</h2>
      {lede && <p className="dl-lede">{lede}</p>}
      <div className="steps-panel">
        {steps.map((s, i) => (
          <div key={s.title}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            <h3>{s.title}</h3>
            <p>{s.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * The next step as a single premium object: the photograph is the card's own
 * ground, held under a layered scrim so the image reads at the right while
 * the type keeps its contrast at the left.
 */
export const CLOSING_PHOTO: Photo = {
  /* One photograph on every next-step card site-wide, at the client's
     direction: a family at a table, warm, no single subject to date it. The
     card is a repeated moment in the journey, so a repeated image makes it
     recognisable rather than repetitive. */
  src: "/media/img/hero.jpg",
  alt: "A family sharing a meal at home",
  position: "50% 42%",
};

export function ClosingCard({
  label = "Next step",
  title,
  lede,
  actions,
  photo = CLOSING_PHOTO,
  note = "Most conversations with us don’t end in a decision, and that’s completely fine.",
}: {
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  actions: ReactNode;
  photo?: Photo;
  note?: string;
}) {
  return (
    <section className="band light close-host">
      {/* `dark` flips the section tokens so the ghost pill's outline and the
          selection colours resolve against ink; the card's own background
          then wins over the mode's. */}
      <div className="close-card dark">
        {photo && <Img photo={photo} />}
        <p className="lbl">{label}</p>
        <h2>{title}</h2>
        {lede && <p className="dl-lede">{lede}</p>}
        <div className="dl-actions">{actions}</div>
        {note && <p className="note">{note}</p>}
      </div>
    </section>
  );
}

/** Offset photograph pair. One photo renders the wide `--one` variant. */
export function Duo({ a, b }: { a: Photo & { caption?: string }; b?: Photo & { caption?: string } }) {
  return (
    <div className={`duo${b ? "" : " duo--one"}`}>
      <figure>
        <div className="a ph">
          <Img photo={a} />
        </div>
        {a.caption && <figcaption>{a.caption}</figcaption>}
      </figure>
      {b && (
        <figure>
          <div className="b ph">
            <Img photo={b} />
          </div>
          {b.caption && <figcaption>{b.caption}</figcaption>}
        </figure>
      )}
    </div>
  );
}

/** Half-page photograph beside content. */
export function SplitShot({
  photo,
  label,
  title,
  flip = false,
  tone = "dark",
  className,
  id,
  children,
}: {
  photo: Photo;
  label?: string;
  title?: ReactNode;
  flip?: boolean;
  tone?: Tone;
  /** Extra classes, e.g. `lift-host` when a `.lift` panel overlaps this band
   *  from below and needs the extra bottom padding to land in. */
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`split-shot ${mode(tone)}${flip ? " split-shot--flip" : ""}${className ? ` ${className}` : ""}`}
    >
      <div className="shot ph" style={frameOf(photo)}>
        <Img photo={photo} />
      </div>
      <div className="body">
        {label && <p className="lbl">{label}</p>}
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </section>
  );
}

/**
 * Numbered, hairlined ledger rows.
 *
 * `.checks` is a two-column grid whose children are the `<ul>`s, not the
 * `<li>`s — so a two-column ledger has to be split into two lists or it
 * renders as one column beside an empty one. Numbering runs continuously
 * across the split, as the design does: 01–04 then 05–08.
 */
export function Checks({ items, columns = 2 }: { items: ReadonlyArray<ReactNode>; columns?: 1 | 2 }) {
  const lists =
    columns === 1 ? [items] : [items.slice(0, Math.ceil(items.length / 2)), items.slice(Math.ceil(items.length / 2))];

  let n = 0;
  return (
    <div className={`checks${columns === 1 ? " checks--1" : ""}`}>
      {lists.map((list, li) => (
        <ul key={li}>
          {list.map((item, i) => {
            n += 1;
            return (
              <li key={i}>
                <b>{String(n).padStart(2, "0")}</b>
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
}

/** Steps as a timeline on a copper line. */
export function Rail({ steps }: { steps: ReadonlyArray<{ title: string; copy: ReactNode }> }) {
  return (
    <div className={`rail${steps.length === 3 ? " rail--3" : ""}`}>
      {steps.map((s, i) => (
        <div key={s.title}>
          <b>{String(i + 1).padStart(2, "0")}</b>
          <h3>{s.title}</h3>
          <p>{s.copy}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * A preview of the Stories page: real film posters with their runtimes,
 * routing on to the full page. Used where a page needs advisor evidence
 * rather than a pull-quote — the guide runs the career journey through the
 * films, and a poster someone can recognise carries more than a sentence in
 * quotation marks with no name attached to it.
 *
 * Posters only, no players: this is a teaser, and the films themselves are
 * one click away where they play with sound.
 */
export function StoriesPreview({
  label,
  title,
  lede,
  items,
  href,
  cta = "Watch the stories",
}: {
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  /* A11: no `category` — the films are one grouping, not three. */
  items: ReadonlyArray<{ poster: string; focus?: string; title: string; runtime: string }>;
  href: string;
  cta?: string;
}) {
  return (
    <section className="band light spreview">
      <p className="lbl">{label}</p>
      <h2>{title}</h2>
      {lede && <p className="dl-lede">{lede}</p>}
      <div className="reel">
        {items.map((v) => (
          <a className="tile" href={link(href)} key={v.title}>
            <div className="ph">
              <img src={v.poster} alt="" style={v.focus ? { objectPosition: v.focus } : undefined} />
              <span className="play" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </span>
              <span className="run">{v.runtime}</span>
            </div>
            <span className="ttl">{v.title}</span>
          </a>
        ))}
      </div>
      <div className="dl-actions">
        <a className="pill ghost" href={link(href)}>
          <span>{cta}</span>
        </a>
      </div>
    </section>
  );
}

/** Quotation carried on a photograph. Without one, the plain variant. */
export function Said({ photo, quote, cite }: { photo?: Photo; quote: ReactNode; cite?: string }) {
  return (
    /* A04: `cite` is optional now. Without one this is a quote-style section
       divider carrying copy the page already owns — which is the whole point.
       An attribution here would have to be invented, and the brief forbids
       exactly that. With one, nothing about the block changed. */
    <section className={`${photo ? "said ph" : "said said--plain"}${cite ? "" : " said--divider"}`}>
      {photo && <Img photo={photo} />}
      <figure>
        <div className="r" />
        <blockquote>{quote}</blockquote>
        {cite && <figcaption>{cite}</figcaption>}
      </figure>
    </section>
  );
}

/** Closing CTA: a panel laid over a photograph. */
export function Closing({
  photo,
  label = "Next step",
  title,
  lede,
  actions,
  note = "Most conversations with us don’t end in a decision, and that’s completely fine.",
  ground,
}: {
  photo: Photo;
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  actions: ReactNode;
  note?: string;
  ground?: string;
}) {
  return (
    <section className="closing" style={ground ? { background: ground } : undefined}>
      <div className="shot ph">
        <Img photo={photo} />
      </div>
      <div className="panel dark">
        <p className="lbl">{label}</p>
        <h2>{title}</h2>
        {lede && <p className="dl-lede">{lede}</p>}
        <div className="dl-actions">{actions}</div>
        {note && <p className="note">{note}</p>}
      </div>
    </section>
  );
}

/**
 * An event as a card with a photograph on top, following the homepage's Youth
 * Community cards at the client's direction. Without a `photo` it renders the
 * original text-only card, so a session with no photography yet still works
 * (styles/amendments.css §23).
 */
export function Events({
  items,
  href,
  cta = "Ask about dates",
}: {
  items: ReadonlyArray<{ when: string; where: string; title: string; copy: ReactNode; photo?: Photo }>;
  /** Where every card's action goes. No calendar exists, so this asks a person. */
  href: string;
  cta?: string;
}) {
  return (
    <div className="stagger">
      {items.map((e) => (
        <article className={`dl-event${e.photo ? " dl-event--shot" : ""}`} key={e.title}>
          {e.photo && (
            <div className="shot">
              <Img photo={e.photo} />
            </div>
          )}
          <div className={e.photo ? "tx" : undefined}>
            <div className="dl-event__meta">
              <span className="dl-event__when">{e.when}</span>
              <span className="dl-event__where">{e.where}</span>
            </div>
            <h3>{e.title}</h3>
            <p>{e.copy}</p>
            {/* Every caller passes a wa.me URL today, which link() leaves
                alone. Wrapped anyway: the day someone passes a route here, it
                should not be the one link on the page that ignores the base
                path. A17. */}
            <a className="tlink" href={link(href)}>
              {cta} <em aria-hidden="true">→</em>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

/** Definition rows. */
export function Defs({ items }: { items: ReadonlyArray<{ term: string; copy: ReactNode }> }) {
  return (
    <dl className="dl-defs">
      {items.map((d) => (
        <div key={d.term}>
          <dt>{d.term}</dt>
          <dd>{d.copy}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Editorial cards. pages.css overrides the design system's filled card into
 *  a hairline-ruled one, so no variant is needed here. */
export function Cards({
  items,
  columns = 3,
  media = false,
}: {
  items: ReadonlyArray<{
    title: string;
    copy: ReactNode;
    href: string;
    cta?: string;
    photo?: Photo;
    /** Small tracked label above the title. */
    kicker?: string;
  }>;
  columns?: 2 | 3 | 4;
  /** Cards that carry a plate. The plate is the frame, so these drop the
   *  hairline rule the text-only card uses. */
  media?: boolean;
}) {
  return (
    <div
      className={`dl-cards dl-cards--${columns}${media ? " dl-cards--media" : ""}`}
      style={{ marginTop: "clamp(28px,4vh,46px)" }}
    >
      {items.map((c) => (
        <article className="dl-card" key={c.href}>
          {c.photo && (
            <div className="dl-card__ph ph">
              <Img photo={c.photo} />
            </div>
          )}
          <div className="dl-card__body">
            {c.kicker && <span className="dl-card__no">{c.kicker}</span>}
            <h3>{c.title}</h3>
            <p>{c.copy}</p>
            <a className="dl-card__go tlink" href={link(c.href)}>
              {c.cta ?? "Read"} <em aria-hidden="true">→</em>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
