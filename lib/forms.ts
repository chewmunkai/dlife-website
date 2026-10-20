/* ============================================================
   Where the site's three form surfaces send their answers (L04):
     · Contact (components/v2/Lead.tsx)
     · Youth sign-up (components/v2/Signup.tsx)
     · the homepage sign-up (lib/dlife.ts)

   All three post here, to one endpoint, and report only what actually
   happened: a non-2xx, a network failure, or anything but the endpoint's own
   { ok: true } is a failure, never a success. With no endpoint configured
   they say so and hand over the routes that do reach a person.

   Connected 20 Oct 2026 to a Google Apps Script on D'Life's "Dlife Website"
   Sheet (deploy/google-sheet/, with how to change it): each submission is a
   row on its Enquiries tab, an email to dlifesbgroup@gmail.com, and a
   fixed-wording confirmation email to the visitor.

   ⚠️ The consent lines beside the forms are our wording, pending the
   client's confirmation, and the privacy page they link to is still a draft
   with [TO BE CONFIRMED] markers. Malaysian PDPA applies to everything these
   forms collect.
   ============================================================ */

/** Set at build time. Absent means the honest unavailable path everywhere. */
/* The Apps Script web app. Public by design (it's in this bundle): the script checks what it's
   sent, ignores bots that fill the hidden field, and caps how many it takes an hour. */
const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbxPP1ylWDDhhrqNHHt5CkIOkXABuY1hb6fmPtE7pSgzm0mdXGl9di2ZNx6XGdgbHEJTDA/exec";

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
