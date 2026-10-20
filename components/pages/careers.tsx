import Growth from "../v2/Growth";
import { Band, type Tone } from "../v2/blocks";
import { GROWTH } from "../../content/growth";
import { asset } from "../../lib/asset";
import { Rich } from "../home/rich";

/* /careers sections (content/cms/pages/careers.ts). */

/** The four growth rows (content/growth.ts, shared with the homepage) and the earnings note. */
export function CareersGrowth({ tone, label, title, note }: { tone?: string; label?: string; title?: string; note?: string }) {
  return (
    <Band tone={(tone as Tone) || "sand"} label={label || undefined} title={title ? <Rich text={title} /> : undefined}>
      <Growth items={GROWTH} long compact idBase="careers-grow" />
      {note && (
        <p className="assure assure--note">
          <Rich text={note} />
        </p>
      )}
    </Band>
  );
}

export function CareersQualities({
  label,
  title,
  lede,
  photo,
  photoAlt,
  qualities,
}: {
  label?: string;
  title?: string;
  lede?: string;
  photo?: string;
  photoAlt?: string;
  qualities?: { id?: string; name?: string; copy?: string }[];
}) {
  return (
    <section className="two sand two--pair">
      <div>
        <p className="lbl">{label}</p>
        <h2>
          <Rich text={title} />
        </h2>
        <p className="dl-lede" style={{ maxWidth: "40ch" }}>
          {lede}
        </p>
      </div>
      <div className="plate ph" style={{ aspectRatio: "4 / 3" }}>
        {photo && <img src={asset(photo)} alt={photoAlt ?? ""} />}
      </div>
      <div className="traits traits--grid">
        {(qualities ?? []).map((q, i) => (
          <div key={q.id ?? q.name}>
            <b>{String(i + 1).padStart(2, "0")}</b>
            <span>
              {q.name}
              <em>{q.copy}</em>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
