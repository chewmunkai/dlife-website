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
/* 20 Oct 2026: connected. The endpoint is a Google Apps Script web app on D'Life's "Dlife
   Website" Sheet (deploy/google-sheet/): it adds a row and emails dlifesbgroup@gmail.com. The
   URL is public by design (it's in this bundle); the script checks what it's sent, ignores
   bots that fill the hidden field, and caps how many it takes an hour. */
const SHEET_ENDPOINT = "";

export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || SHEET_ENDPOINT;
export const FORMS_WIRED = FORM_ENDPOINT.length > 0;

export type FormResult = "unsent" | "sent" | "failed";

/** A field people never see and bots fill in; a submission with it filled is dropped. */
export const TRAP_NAME = "website";
export const TRAP_STYLE = { position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" } as const;

export async function submitForm(form: string, answers: Record<string, unknown>): Promise<FormResult> {
  if (!FORMS_WIRED) return "unsent";
  try {
    // Sent as text/plain: Apps Script can't answer a browser's CORS preflight, and a plain-text
    // POST doesn't need one. The script reads the body as JSON.
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        form,
        ...answers,
        source: typeof window === "undefined" ? "" : window.location.pathname,
        at: new Date().toISOString(),
      }),
    });
    // Apps Script answers 200 whatever happened, so "sent" is only what the script itself says.
    if (!res.ok) return "failed";
    const body = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    return body?.ok === true ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
