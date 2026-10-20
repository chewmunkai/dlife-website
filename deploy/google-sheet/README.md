# Website forms → Google Sheet + email

The site's three forms (Contact enquiry, Youth Community sign-up, homepage sign-up) post to a
Google Apps Script on D'Life's **"Dlife Website"** Sheet. Each submission becomes a row on its
**Enquiries** tab, an email to `dlifesbgroup@gmail.com` (replying to it answers the visitor), and
a confirmation email to the visitor (replying to that reaches D'Life).

## Setting it up (once)

Do this signed in as the Sheet's owner, ideally D'Life's own Google account: the notification
emails are sent from whoever deploys the script.

1. Open the Sheet → **Extensions → Apps Script**.
2. Replace everything in the editor with `Code.gs` from this folder, then **Save**.
3. **Deploy → New deployment** → the gear beside "Select type" → **Web app**.
   - Description: `Website forms`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. **Deploy**, then **Authorize access** and choose the account. Google warns that it "hasn't
   verified this app": it's your own script, so **Advanced → Go to … (unsafe) → Allow**.
5. Copy the **Web app URL** (it ends in `/exec`) into `SHEET_ENDPOINT` in `lib/forms.ts`.

## Changing the script later

Edit it in Apps Script, then **Deploy → Manage deployments → edit (pencil) → Version: New
version → Deploy**. The URL stays the same, so the site needs no change.

## Limits

- Gmail lets a script send 100 emails a day, and each submission sends two (the team's and the
  visitor's): about 50 submissions a day with emails. The script also stops at 30 an hour, so a
  flood can't use them up. Rows are written before the emails, so a lead is never lost to the
  email limit.
- The visitor's confirmation is fixed wording and never repeats what they typed, because anyone
  can type a stranger's address into a form.
- The URL is public (it's in the website's code). The script checks every field, drops
  submissions from bots that fill the hidden `website` field, and writes text that looks like a
  formula as plain text.
