import Lead from "../v2/Lead";
import { CONTACT, HOURS, SEGAMAT, WA, WA_DISPLAY, telHref, waHref } from "../../lib/contact";

/* /contact sections (content/cms/pages/contact.ts). The addresses, numbers and hours come from
   lib/contact.ts, which the footer and the structured data share, so they're edited there once. */

export function ContactReach({
  label,
  heading,
  lede,
  kualaLumpur,
  segamat,
  whatsapp,
  telephone,
  telephoneNote,
  afterHours,
  afterHoursNote,
  email,
  hours,
  formLabel,
  formHeading,
  consent,
}: Record<string, string | undefined>) {
  return (
    <section className="band light">
      <div className="reach">
        <div className="reach__info">
          <p className="lbl">{label}</p>
          <h2>{heading}</h2>
          <p className="dl-lede">{lede}</p>

          <dl className="reach__list">
            <div>
              <dt>{kualaLumpur}</dt>
              <dd>
                <address>
                  {CONTACT.street}
                  <br />
                  {CONTACT.street2}
                  <br />
                  {CONTACT.postcode} {CONTACT.city}
                </address>
              </dd>
            </div>
            <div>
              <dt>{segamat}</dt>
              <dd>
                <address>
                  {SEGAMAT.street}
                  <br />
                  {SEGAMAT.street2}
                  <br />
                  {SEGAMAT.postcode} {SEGAMAT.city}, {SEGAMAT.region}
                </address>
              </dd>
            </div>
            <div>
              <dt>{whatsapp}</dt>
              <dd>
                <a href={waHref(WA.conversation)}>{WA_DISPLAY}</a>
              </dd>
            </div>
            <div>
              <dt>{telephone}</dt>
              <dd>
                <a href={telHref(CONTACT.phone)}>{CONTACT.phone}</a>
                {/* When each number answers, from lib/contact.ts (the footer reads the same). */}
                <em>
                  {HOURS.days}, {HOURS.office}.{telephoneNote ? ` ${telephoneNote}` : ""}
                </em>
              </dd>
            </div>
            <div>
              <dt>{afterHours}</dt>
              <dd>
                <a href={telHref(CONTACT.phoneAfterHours)}>{CONTACT.phoneAfterHours}</a>
                <em>
                  {HOURS.after}.{afterHoursNote ? ` ${afterHoursNote}` : ""}
                </em>
              </dd>
            </div>
            <div>
              <dt>{email}</dt>
              <dd>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </dd>
            </div>
            <div>
              <dt>{hours}</dt>
              <dd>
                {HOURS.days}, {HOURS.office}
              </dd>
            </div>
          </dl>
        </div>

        <div className="reach__form">
          <p className="lbl">{formLabel}</p>
          <h2>{formHeading}</h2>
          <Lead consent={consent} />
        </div>
      </div>
    </section>
  );
}
