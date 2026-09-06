"use client";

import { useId, useRef, useState } from "react";
import { CONTACT, WA, waHref } from "../../lib/contact";

/* ============================================================
   The enquiry form.

   ⚠️ NOT CONNECTED YET, and that is deliberate. Read this before wiring it.

   The site is a static export: there is no server of our own, so there is no
   endpoint this can post to until someone chooses one. A form that appears to
   send and silently discards the message is worse than no form at all.

   So the form has two modes, and which one it is in depends on exactly one
   thing — whether NEXT_PUBLIC_FORM_ENDPOINT is set at build time:

     · unset (today) — submitting says plainly that nothing was sent, and
       hands over the two routes that do work. No fake success, ever.
     · set — the answers are POSTed there as JSON. A non-2xx reply or a
       network failure shows an error and puts the form back, with everything
       the visitor typed still in it. A failure is never dressed as a success.

   TO CONNECT IT, someone needs to supply:

     1. A form endpoint that accepts a JSON POST and takes no secret in the
        browser. Formspree, Netlify Forms, Basin and a Google Apps Script web
        app all qualify; anything needing an API key does not, because this
        bundle is public. Set it as NEXT_PUBLIC_FORM_ENDPOINT.
     2. The destination inbox behind it.
     3. The PDPA consent wording. The privacy page still carries a
        [TO BE CONFIRMED] marker where it belongs, and Malaysian PDPA applies
        to everything this form collects.

   All three are client decisions. Until they land, this is honest rather than
   broken, and nothing here provisions or pays for a service.

   The subject list is the same routing vocabulary as lib/contact.ts' prefills,
   minus Corporate Solutions, which is withheld (2026-08).
   ============================================================ */

/** A16: "Other" is last and is the one that opens a second field. */
const OTHER = "Other";

const SUBJECTS = [
  "Protection and planning",
  "A policy I already hold",
  "A career at D’Life",
  "Drive Value Associates",
  "The Youth Community",
  OTHER,
];

/** Set at build time. Absent means the honest unavailable path above. */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Answers = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  /** A16: only ever populated when `subject` is "Other". */
  subjectOther: string;
  message: string;
};

const EMPTY: Answers = { name: "", email: "", phone: "", subject: SUBJECTS[0], subjectOther: "", message: "" };

export default function Lead() {
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [state, setState] = useState<"editing" | "sending" | "unsent" | "sent" | "failed">("editing");
  /** The "Please specify" error, shown only after a submit has been refused. */
  const [otherError, setOtherError] = useState(false);
  const otherRef = useRef<HTMLInputElement>(null);

  const uid = useId();
  const otherId = `${uid}-other`;
  const otherErrId = `${uid}-other-error`;

  const isOther = answers.subject === OTHER;
  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => setAnswers((a) => ({ ...a, [k]: v }));

  /* Nothing was sent. Says so, and hands over the routes that do work. */
  if (state === "unsent") {
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

  if (state === "sent") {
    return (
      <div className="lead-said" role="status">
        <strong>Thank you — that reached us.</strong>
        <p>
          We will read it, work out who should answer, and come back to you. Messages sent on a working day usually get
          a reply the same day.
        </p>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* A16: required only when Other is chosen. The browser enforces this too
       (the input carries `required` in that state); this catch is for the
       whitespace-only case the browser accepts and a person would not. */
    if (isOther && !answers.subjectOther.trim()) {
      setOtherError(true);
      otherRef.current?.focus();
      return;
    }
    setOtherError(false);

    if (!ENDPOINT) {
      setState("unsent");
      return;
    }

    setState("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        /* The whole payload, including the specified subject. A16 asks for
           that value to travel with the rest, not to be dropped at the edge. */
        body: JSON.stringify({
          ...answers,
          subjectOther: isOther ? answers.subjectOther.trim() : "",
          /* Which page produced it, the same intent-routing idea the WhatsApp
             prefills use — the team should not have to guess. */
          source: typeof window === "undefined" ? "" : window.location.pathname,
        }),
      });
      setState(res.ok ? "sent" : "failed");
    } catch {
      setState("failed");
    }
  };

  return (
    <form className="lead" onSubmit={onSubmit} noValidate={false}>
      <label className="lead__f">
        <span>Your name</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          required
          value={answers.name}
          onChange={(e) => set("name", e.target.value)}
        />
      </label>

      <div className="lead__row">
        <label className="lead__f">
          <span>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={answers.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </label>
        <label className="lead__f">
          <span>
            Phone <em>optional</em>
          </span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="012-345 6789"
            value={answers.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </label>
      </div>

      <label className="lead__f">
        <span>What is it about?</span>
        <select
          name="subject"
          value={answers.subject}
          onChange={(e) => {
            set("subject", e.target.value);
            /* Leaving Other clears both the answer and its error, so a stale
               "Please specify" cannot travel with a different subject. */
            if (e.target.value !== OTHER) {
              set("subjectOther", "");
              setOtherError(false);
            }
          }}
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      {/* A16: appears only for Other, and is required only then. `hidden`
          rather than a CSS class, so it is out of the accessibility tree and
          out of the tab order when it is not being asked for. */}
      <div className="lead__f" hidden={!isOther}>
        <label htmlFor={otherId}>
          <span>Please specify</span>
        </label>
        <input
          id={otherId}
          ref={otherRef}
          type="text"
          name="subjectOther"
          required={isOther}
          aria-required={isOther}
          aria-invalid={otherError || undefined}
          aria-describedby={otherError ? otherErrId : undefined}
          /* The browser's own required check fires before onSubmit does, so
             without this the native bubble would appear and the inline
             message — the one aria-describedby points at — would not. Both
             paths now light the same error. */
          onInvalid={() => setOtherError(true)}
          placeholder="A few words is enough"
          value={answers.subjectOther}
          onChange={(e) => {
            set("subjectOther", e.target.value);
            if (otherError && e.target.value.trim()) setOtherError(false);
          }}
        />
        {/* Announced when it appears, and tied to the input by id. */}
        <p className="lead__err" id={otherErrId} role="alert" hidden={!otherError}>
          Please tell us what this is about.
        </p>
      </div>

      <label className="lead__f">
        <span>
          Anything you want us to know <em>optional</em>
        </span>
        <textarea
          name="message"
          rows={4}
          placeholder="A sentence is plenty. We will ask the rest."
          value={answers.message}
          onChange={(e) => set("message", e.target.value)}
        />
      </label>

      {/* A failure is stated, and the form comes back with the answers still
          in it. Nothing here ever reports a send that did not happen. */}
      {state === "failed" && (
        <p className="lead__err lead__err--send" role="alert">
          That did not send — something went wrong at our end. Nothing was lost: try again, or reach us on{" "}
          <a href={waHref(WA.conversation)}>WhatsApp</a> or at <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>
      )}

      <div className="lead__foot">
        <button className="pill" type="submit" disabled={state === "sending"}>
          <span>{state === "sending" ? "Sending…" : "Send enquiry"}</span>
        </button>
        <p className="lead__fine">
          We will only use this to reply to you. Nothing is added to a mailing list.
        </p>
      </div>
    </form>
  );
}
