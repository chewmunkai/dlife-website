/**
 * D'Life website forms: each one becomes a row in this Sheet ("Dlife Website") and an email to
 * the team (dlifesbgroup@gmail.com). The site's three forms post here (lib/forms.ts): the
 * Contact enquiry, the Youth Community sign-up and the homepage sign-up.
 *
 * Lives in the Sheet's Extensions → Apps Script, deployed as a web app (Execute as: Me, Who has
 * access: Anyone). See README.md beside this file. The URL is public, so everything a visitor
 * sends is checked here, not trusted.
 */
const NOTIFY = "dlifesbgroup@gmail.com";
const TAB = "Enquiries";
const HEADERS = ["Received", "Form", "Name", "Email", "Phone", "Subject", "Message", "Page"];
const FORMS = { contact: "Contact enquiry", "youth-signup": "Youth Community sign-up", "home-signup": "Homepage sign-up" };
// Gmail sends 100 emails a day from a script; a flood stops here rather than using them up.
const PER_HOUR = 60;

function doPost(e) {
  let d;
  try {
    d = JSON.parse((e && e.postData && e.postData.contents) || "{}");
  } catch (err) {
    return reply(false, "unreadable");
  }
  // People never see the "website" field and bots fill every field. Such a submission is still
  // kept, marked, in case a browser filled it for a real person; nobody is emailed about it.
  const suspect = !!d.website;
  const form = FORMS[d.form];
  const email = clip(d.email, 200).trim();
  if (!form || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(false, "invalid");
  if (!underLimit()) return reply(false, "busy");

  const name = clip(d.name, 200).trim();
  const phone = clip(d.phone, 40).trim();
  const subject = clip(d.subject, 120) + (d.subjectOther ? ": " + clip(d.subjectOther, 120) : "");
  const message = clip(d.message, 5000);
  const page = clip(d.source, 200);

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    sheet().appendRow([new Date(), suspect ? form + " (possible spam)" : form, name, email, phone, subject, message, page].map(asText));
  } finally {
    lock.releaseLock();
  }

  if (suspect) return reply(true);

  // The row is the record and the email is the nudge: a failed email (the daily quota) loses nothing.
  try {
    MailApp.sendEmail({
      to: NOTIFY,
      replyTo: email,
      subject: form + (name ? " from " + name : "") + " · D’Life website",
      body: [
        "A new " + form.toLowerCase() + " from the website.",
        "",
        "Name: " + (name || "-"),
        "Email: " + email,
        "Phone: " + (phone || "-"),
        "Subject: " + (subject || "-"),
        "",
        message || "(no message)",
        "",
        "Sent from " + (page || "the website") + ". Reply to this email to answer them.",
        "Every enquiry: " + SpreadsheetApp.getActive().getUrl(),
      ].join("\n"),
    });
  } catch (err) {
    console.error("Email to the team not sent: " + err);
  }

  return reply(true);
}

function doGet() {
  return reply(true, "D’Life website forms. Forms post here; there is nothing to see.");
}

/** The Enquiries tab, made (with its headings) the first time. */
function sheet() {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName(TAB);
  if (!sh) {
    const first = ss.getSheets()[0];
    sh = first.getLastRow() === 0 && first.getName() === "Sheet1" ? first.setName(TAB) : ss.insertSheet(TAB);
  }
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sh;
}

/** Text as typed, never a formula: a cell starting with = + - or @ would run in Sheets. */
function asText(v) {
  return typeof v === "string" && /^[=+\-@\t\r]/.test(v) ? "'" + v : v;
}

function clip(v, n) {
  return String(v == null ? "" : v).slice(0, n);
}

function underLimit() {
  const cache = CacheService.getScriptCache();
  const key = "n" + Math.floor(Date.now() / 3600000);
  const n = Number(cache.get(key) || 0);
  if (n >= PER_HOUR) return false;
  cache.put(key, String(n + 1), 3700);
  return true;
}

function reply(ok, note) {
  return ContentService.createTextOutput(JSON.stringify(note ? { ok: ok, note: note } : { ok: ok })).setMimeType(ContentService.MimeType.JSON);
}
