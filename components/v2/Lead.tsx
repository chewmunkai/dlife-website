"use client";

import { useState } from "react";
import { CONTACT, WA, waHref } from "../../lib/contact";

/* ============================================================
   The enquiry form.

   ⚠️ UNWIRED, deliberately, and this is the important note on the file.

   The site is a static export: there is no server, so there is no endpoint a
   form can post to. A form that appears to send and silently discards the
   message is worse than no form at all, so on submit this replaces itself with
   an acknowledgement that says plainly that nothing was sent, and hands over
   the two routes that do work today.

   To connect it, someone has to choose a form service (Formspree, Netlify
   Forms, a Google Apps Script endpoint) and add the PDPA consent wording. Both
   are client decisions, and the privacy page still carries a
   [TO BE CONFIRMED] marker where that wording belongs. Until then this is
   honest rather than broken.

   The subject list is the same routing vocabulary as lib/contact.ts' prefills,
   minus Corporate Solutions, which is withheld (2026-08).
   ============================================================ */

const SUBJECTS = [
  "Protection and planning",
  "A policy I already hold",
  "A career at D’Life",
  "Drive Value Associates",
  "The Youth Community",
  "Something else",
];

export default function Lead() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="lead-said" role="status">
        <strong>Nothing has been sent yet.</strong>
        <p>
          This form is not connected to anything, so your message was not stored or delivered. The two routes below
          reach a person straight away, and they are what the rest of the site uses.
        </p>
        <div className="dl-actions">
          <a className="pill" href={waHref(WA.conversation)}>
            <span>Message us on WhatsApp</span>
          </a>
          <a className="pill ghost" href={`mailto:${CONTACT.email}`}>
            <span>Email {CONTACT.email}</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      className="lead"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label className="lead__f">
        <span>Your name</span>
        <input type="text" name="name" autoComplete="name" required />
      </label>

      <div className="lead__row">
        <label className="lead__f">
          <span>Email</span>
          <input type="email" name="email" autoComplete="email" required placeholder="you@example.com" />
        </label>
        <label className="lead__f">
          <span>
            Phone <em>optional</em>
          </span>
          <input type="tel" name="phone" autoComplete="tel" placeholder="012-345 6789" />
        </label>
      </div>

      <label className="lead__f">
        <span>What is it about?</span>
        <select name="subject" defaultValue={SUBJECTS[0]}>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label className="lead__f">
        <span>
          Anything you want us to know <em>optional</em>
        </span>
        <textarea name="message" rows={4} placeholder="A sentence is plenty. We will ask the rest." />
      </label>

      <div className="lead__foot">
        <button className="pill" type="submit">
          <span>Send enquiry</span>
        </button>
        <p className="lead__fine">
          We will only use this to reply to you. Nothing is added to a mailing list.
        </p>
      </div>
    </form>
  );
}
