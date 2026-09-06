"use client";

import { useState } from "react";
import { CONTACT } from "../../lib/contact";
import { submitForm, type FormResult } from "../../lib/forms";

/* ============================================================
   Stay in the loop — deliberately unwired.

   There is no form endpoint anywhere on this site. A form that silently does
   nothing is worse than no form, so on submit this replaces itself with a
   plain acknowledgement that says nothing was stored and hands over the two
   routes that do work. Same behaviour as the design bundle's menu.js.

   ⚠️ Do not wire this to a list until the consent wording is approved —
   PDPA sets content requirements for the notice, and the privacy page still
   carries a [TO BE CONFIRMED] marker where that wording belongs.
   ============================================================ */

export default function Signup({ align = "flex-start" }: { align?: "flex-start" | "center" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"editing" | "sending" | FormResult>("editing");

  /* L04: three states, and none of them lies. */
  if (state === "unsent") {
    return (
      <p className="signup-said" role="status">
        Sign-up isn’t connected yet and nothing has been stored. Message us on WhatsApp or email {CONTACT.email} and
        we’ll add you to the list by hand.
      </p>
    );
  }
  if (state === "sent") {
    return (
      <p className="signup-said" role="status">
        Thank you — you’re on the list. We’ll be in touch with the next Youth Community update.
      </p>
    );
  }

  return (
    <form
      className="dl-loop__form"
      style={{ justifyContent: align }}
      onSubmit={async (e) => {
        e.preventDefault();
        setState("sending");
        setState(await submitForm("youth-signup", { email }));
      }}
    >
      <label className="dl-loop__field">
        <span>Email address</span>
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
      </label>
      <button className="pill" type="submit" disabled={state === "sending"}>
        <span>{state === "sending" ? "Sending…" : "Keep me posted"}</span>
      </button>
      {state === "failed" && (
        <p className="signup-said" role="alert">
          That didn’t send. Nothing was stored — try again, or email {CONTACT.email} and we’ll add you by hand.
        </p>
      )}
    </form>
  );
}
