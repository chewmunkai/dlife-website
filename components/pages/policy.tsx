/* /existing-policy-support sections (content/cms/pages/policy.ts). */

export function PolicyPoints({ label, title, points }: { label?: string; title?: string; points?: { id?: string; text?: string }[] }) {
  return (
    <section className="band light">
      <p className="lbl">{label}</p>
      <h2>{title}</h2>
      <div className="points">
        {(points ?? []).map((p, i) => (
          <div className="pt" key={p.id ?? p.text}>
            <span className="n">{String(i + 1).padStart(2, "0")}</span>
            <p>{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PolicySteps({ label, title, aside, steps }: { label?: string; title?: string; aside?: string; steps?: { id?: string; k?: string; title?: string; copy?: string }[] }) {
  return (
    <section className="spread sand">
      <div className="spread__rail">
        <p className="lbl">{label}</p>
        <h2>{title}</h2>
        <p className="aside">{aside}</p>
      </div>
      <div className="spread__body">
        <div className="seq">
          {(steps ?? []).map((s) => (
            <div key={s.id ?? s.title}>
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
