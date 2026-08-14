/**
 * BLOCK: Stay in the Loop.
 *
 * The Youth Community's registration of interest, and the general updates
 * signup elsewhere.
 *
 * ⚠️ Front end only. No endpoint is wired, nothing is stored, and the consent
 * wording is pending — so the form acknowledges inline rather than implying a
 * subscription exists. `data-dl-signup` carries the acknowledgement text and
 * is also what binds the behaviour, so an Elementor rebuild sets the same
 * attribute on a form widget and gets the same result.
 *
 * TODO(launch): point this at the real list, and add the consent checkbox and
 * privacy wording D'Life's compliance owner approves.
 */
export default function StayInLoop({
  label = "Stay in the loop",
  title = "Hear about what’s coming up",
  copy = "Occasional updates on events, workshops and new guidance. No selling, and you can stop them at any time.",
  ack = "Thanks — we’ll be in touch with the next update.",
  tone = "sand",
  id = "loop",
}: {
  label?: string;
  title?: string;
  copy?: string;
  ack?: string;
  tone?: "light" | "sand" | "dark";
  id?: string;
}) {
  const mode = tone === "sand" ? " sand" : tone === "dark" ? " dark" : "";
  return (
    <section id={id} className={`dl-band dl-band--read dl-loop${mode}`}>
      <span className="lb rv">{label}</span>
      <h2 className="rv">{title}</h2>
      <p className="dl-lede rv">{copy}</p>
      <form className="dl-loop__form rv" data-dl-signup={ack}>
        <label className="dl-loop__field">
          <span>Email address</span>
          <input type="email" name="email" required placeholder="you@example.com" autoComplete="email" />
        </label>
        <button className="pill" type="submit">
          <span>Keep me posted</span>
        </button>
      </form>
    </section>
  );
}
