/* ============================================================
   Where the site's three form surfaces send their answers (L04).

   There are exactly three, and before this file they behaved three different
   ways:

     · Contact (components/v2/Lead.tsx) — said plainly that nothing was sent
     · Youth sign-up (components/v2/Signup.tsx) — said the same
     · the homepage sign-up (lib/dlife.ts) — replaced itself with
       "Thanks — we'll be in touch with the next Youth Community update."
       while storing nothing at all. A simulated success, on the busiest page
       on the site. That is the one thing a form must never do, and it is why
       this file exists rather than three separate decisions.

   All three now ask the same question: is an endpoint configured?

     · no (today)  — say so. Nothing is stored, nothing is sent, and the
       visitor is handed the routes that do reach a person.
     · yes         — POST the answers as JSON and report what actually
       happened. A non-2xx or a network failure is an error, never a success.

   ============================================================
   TO CONNECT THE FORMS — what a client has to supply

   1. NEXT_PUBLIC_FORM_ENDPOINT — a URL that accepts a JSON POST from a
      browser and needs no secret to do it. This bundle is public, so anything
      requiring an API key in the client is disqualified. Known-good options:
      a Google Apps Script web app (free, lands in a Google inbox they already
      have, and can append to a Sheet in the same script), Formspree, Basin,
      or Netlify Forms if the host ever changes.

   2. The destination inbox behind it. Not set here — it belongs to whatever
      the endpoint is, so no address is baked into this repository.

   3. If a Google Sheet is wanted, it is the same Apps Script: one doPost that
      appends a row and sends the mail. There is no separate variable for it.

   4. An acknowledgement email to the visitor is the endpoint's job too, and
      it is a client decision that is still open — the brief records automated
      acknowledgements as undecided. Nothing here sends one.

   5. The PDPA consent wording, which the privacy page still marks
      [TO BE CONFIRMED]. Malaysian PDPA applies to everything these forms
      collect and the notice has content requirements.

   ⚠️ NOTHING in this repository has ever delivered a message. There is no
   evidence of inbox receipt, no Sheet row and no acknowledgement, because
   there is no endpoint — not because one was tested and failed. Delivery
   stays unverified until someone with access runs an authorised end-to-end
   test against a real endpoint.
   ============================================================ */

/** Set at build time. Absent means the honest unavailable path everywhere. */
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

export const FORMS_WIRED = FORM_ENDPOINT.length > 0;

export type FormResult = "unsent" | "sent" | "failed";

/**
 * Post one form's answers. Returns what happened, and never dresses a failure
 * as anything else.
 *
 * `form` names which surface produced it — "contact", "youth-signup",
 * "home-signup" — so whoever reads the inbox does not have to guess, the same
 * way the WhatsApp prefills name their own button.
 */
export async function submitForm(form: string, answers: Record<string, unknown>): Promise<FormResult> {
  if (!FORMS_WIRED) return "unsent";
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        form,
        ...answers,
        source: typeof window === "undefined" ? "" : window.location.pathname,
        at: new Date().toISOString(),
      }),
    });
    return res.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
