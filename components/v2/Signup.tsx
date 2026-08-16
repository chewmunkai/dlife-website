"use client";

import { useState } from "react";
import { CONTACT } from "../../lib/contact";

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
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="signup-said">
        Sign-up isn’t connected yet and nothing has been stored. Message us on WhatsApp or email {CONTACT.email} and
        we’ll add you to the list by hand.
      </p>
    );
  }

  return (
    <form
      className="dl-loop__form"
      style={{ justifyContent: align }}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label className="dl-loop__field">
        <span>Email address</span>
        <input type="email" name="email" required placeholder="you@example.com" autoComplete="email" />
      </label>
      <button className="pill" type="submit">
        <span>Keep me posted</span>
      </button>
    </form>
  );
}
