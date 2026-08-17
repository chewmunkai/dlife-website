# Photography credits and licensing

## ⚠️ Read this before adding stock photography

Unsplash serves two different things through one search. Free photos come from
`images.unsplash.com` under the **Unsplash License** and may be used
commercially. **Unsplash+** photos come from `plus.unsplash.com`, require a paid
subscription, and arrive watermarked. The search API returns both, mixed, with
no visible difference in the results.

In August 2026 nineteen Unsplash+ files were added here in error and served on
the live site for one deploy before being removed. **Check the CDN host of any
Unsplash photo before committing it:**

```bash
curl -s https://unsplash.com/napi/photos/<PHOTO_ID> | grep -o 'plus.unsplash.com'
# any output at all means it is Unsplash+ and must not be used
```

## Sourced stock (7 files, free licence, verified)

All seven verified as serving from `images.unsplash.com` under the Unsplash
License: free for commercial use, no permission needed, no attribution
required. Terms: <https://unsplash.com/license>. Credited below for provenance.

| File | Photographer | Source |
|---|---|---|
| `fam-newhome.jpg` | Vitaly Gariev | <https://unsplash.com/photos/couple-happily-moving-into-a-new-home-x8l4lN6-xd0> |
| `fut-education.jpg` | Zoshua Colah | <https://unsplash.com/photos/student-studies-at-a-library-with-books-klbApl9mxr0> |
| `fut-epf.jpg` | Vitaly Gariev | <https://unsplash.com/photos/woman-working-with-documents-at-office-desk-Vvn0OD0IxBM> |
| `inc-askhelp.jpg` | National Cancer Institute | <https://unsplash.com/photos/a-man-woman-and-child-sitting-at-a-table-eating-food-2hOoIAEQfFs> |
| `inc-bills.jpg` | Vitaly Gariev | <https://unsplash.com/photos/man-reading-a-document-in-a-kitchen-8BuTwOlhLr0> |
| `inc-priorities.jpg` | Thought Catalog | <https://unsplash.com/photos/person-holding-pencil-writing-on-notebook-RdmLSJR-tq8> |
| `inc-savings.jpg` | Nick Fewings | <https://unsplash.com/photos/silver-round-coins-on-blue-round-container-SoqG9RWd_FA> |

## Pre-existing images

Everything else in this directory arrived with the project from the client and
the Claude Design export, including the four `need-*-malaysia.jpg` plates.
⚠️ Their licensing has never been documented to us. Confirm D'Life holds rights
to every one of them before launch.

## Still needed

The five Protection & Planning pages have 30 image slots between their heroes
and their moment cards. There are not 30 licence-clear photographs available
here, so some are reused across pages. Closing that gap needs a licensed set
or a shoot, which is a purchase.
