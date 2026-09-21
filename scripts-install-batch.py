#!/usr/bin/env python3
"""Install the 9 generated photographs.

ChatGPT saves with its own filenames, so this maps the 9 NEWEST images in
~/Downloads to their slots by modification time — which is the order they were
generated in: A1, A2, A3, A4, B1, B2, B3, B4, B5.

Run:  python3 scripts-install-batch.py --dry-run     (check the mapping first)
      python3 scripts-install-batch.py
"""
import os, sys, glob
from PIL import Image, ImageOps

TOP = "public/media/img"
GEN = "public/media/img/services/generated"

ORDER = [
    ("A1", f"{TOP}/policy-homepage-review.jpg",   "Homepage - Existing policyholders"),
    ("A2", f"{TOP}/eps-hero-clarity.jpg",         "Existing Policy Support hero"),
    ("A3", f"{TOP}/article-policy-schedule.jpg",  "Articles thumbnail + Resources"),
    ("A4", f"{TOP}/contact-conversation.jpg",     "Contact hero"),
    ("B1", f"{GEN}/income-03-one-income.jpg",     "Protecting your income 03"),
    ("B2", f"{GEN}/income-04-what-comes-first.jpg","Protecting your income 04"),
    ("B3", f"{GEN}/income-05-asking.jpg",         "Protecting your income 05"),
    ("B4", f"{GEN}/future-01-is-epf-enough.jpg",  "Planning for your future 01"),
    ("B5", f"{GEN}/future-03-inflation.jpg",      "Planning for your future 03"),
]

dry = "--dry-run" in sys.argv
dl = os.path.expanduser("~/Downloads")
cands = []
for ext in ("png", "webp", "jpg", "jpeg"):
    cands += glob.glob(os.path.join(dl, f"*.{ext}"))
# keep only 1536x1024 landscape images, newest 9, oldest-first (= generation order)
sized = []
for p in cands:
    try:
        with Image.open(p) as im:
            if im.size == (1536, 1024):
                sized.append((os.path.getmtime(p), p))
    except Exception:
        pass
sized.sort()
sized = sized[-9:]

if len(sized) != 9:
    print(f"Found {len(sized)} images at 1536x1024 in ~/Downloads, expected 9.")
    for _, p in sized:
        print("   ", os.path.basename(p))
    sys.exit(1)

print(f"{'TAG':4} {'SOURCE':44} -> DESTINATION")
for (tag, dest, where), (_, src) in zip(ORDER, sized):
    print(f"{tag:4} {os.path.basename(src)[:43]:44} -> {dest}")
    if not dry:
        im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
        assert im.size == (1536, 1024), f"{src} is {im.size}"
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        im.save(dest, "JPEG", quality=82, progressive=True, optimize=True, subsampling=0)
        print(f"     wrote {os.path.getsize(dest)/1024:.0f} KB  ({where})")

print("\nDRY RUN — nothing written. Drop --dry-run to install." if dry else "\nInstalled. Next: wire the references, then measure every frame at 375/1280/1440.")
