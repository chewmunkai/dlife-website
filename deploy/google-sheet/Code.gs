/**
 * D'Life website forms: each one becomes a row in this Sheet ("Dlife Website"), an email to the
 * team, and a confirmation email to the visitor. The site's three forms post here
 * (lib/forms.ts): the Contact enquiry, the Youth Community sign-up and the homepage sign-up.
 *
 * Lives in the Sheet's Extensions → Apps Script, deployed as a web app (Execute as: Me, Who has
 * access: Anyone). See README.md beside this file. The URL is public, so everything a visitor
 * sends is checked here, not trusted.
 */
const NOTIFY = "dlifesbgroup@gmail.com";
const TAB = "Enquiries";
const HEADERS = ["Received", "Form", "Name", "Email", "Phone", "Subject", "Message", "Page"];
const FORMS = { contact: "Contact enquiry", "youth-signup": "Youth Community sign-up", "home-signup": "Homepage sign-up" };
// Gmail sends 100 emails a day from a script, two per submission (the team's and the visitor's);
// a flood stops here rather than using them up.
const PER_HOUR = 30;

/* What the visitor is sent. Fixed wording, never anything they typed: anyone can put a
   stranger's address in a form, and an email that repeated their text would let them use
   D'Life's Gmail to send it. */
const CONFIRM = {
  contact: {
    subject: "We’ve received your message · D’Life",
    body: [
      "Thank you for getting in touch with D’Life.",
      "",
      "Your message has reached us. We’ll read it, work out who should answer, and come back to you, usually the same working day (Monday to Friday, 9:00am – 5:30pm).",
      "",
      "If it’s urgent, WhatsApp or call us on 016-236 2286 during office hours, or 016-661 6083 after hours.",
    ],
  },
  signup: {
    subject: "You’re on the list · D’Life Youth Community",
    body: [
      "Thank you for signing up for D’Life Youth Community updates.",
      "",
      "We’ll email you about upcoming sessions, workshops and events. Nothing is sold to you, and if you’d rather not hear from us, reply to this email and we’ll take you off the list.",
    ],
  },
};

function doPost(e) {
  let d;
  try {
    d = JSON.parse((e && e.postData && e.postData.contents) || "{}");
  } catch (err) {
    return reply(false, "unreadable");
  }
  // People never see the "website" field and bots fill every field: say yes, keep nothing.
  if (d.website) return reply(true);
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
    sheet().appendRow([new Date(), form, name, email, phone, subject, message, page].map(asText));
  } finally {
    lock.releaseLock();
  }

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

  // The visitor's confirmation. Replies go to D'Life, whichever account sends it.
  const c = d.form === "contact" ? CONFIRM.contact : CONFIRM.signup;
  try {
    MailApp.sendEmail({
      to: email,
      name: "D’Life",
      replyTo: NOTIFY,
      subject: c.subject,
      body: c.body
        .concat([
          "",
          "D’Life Sdn Bhd",
          "https://dlife.com.my",
          "",
          "You’re receiving this because this address was entered on a form at dlife.com.my. If that wasn’t you, you can ignore this email.",
        ])
        .join("\n"),
    });
  } catch (err) {
    console.error("Confirmation not sent: " + err);
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
