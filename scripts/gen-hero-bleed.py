#!/usr/bin/env python3
"""Build the hero plate's left bleed.

The plate's left edge falls across a man's head and shoulders (source x 0-120),
so no wash laid over the photograph can hide that edge without dissolving him.
This makes the edge unnecessary instead: a defocused, subject-free extension of
the photograph's own left column, hung to the LEFT of the plate, which starts at
exactly the picture's colour row for row and falls to nothing over ~95px.

Regenerate whenever public/media/img/hero-team.jpg changes:
    python3 scripts/gen-hero-bleed.py
"""
import os, sys
import numpy as np
from PIL import Image

SRC = sys.argv[1] if len(sys.argv) > 1 else "public/media/img/hero-team.jpg"
DST = sys.argv[2] if len(sys.argv) > 2 else "public/media/img/hero-team-bleed.png"

W, H     = 128, 540   # stretched to the plate's box by CSS; rows map 1:1 onto it
SAMPLE   = 6          # source columns averaged to get the join colour
BLUR_MAX = 76.0       # vertical defocus at the far end, in output rows
BLUR_MIN = 3.0        # a touch at the join, so the smear has no hard rows
CHROMA   = 46.0       # chroma ceiling at the join, falling to 2 at the far end
GAMMA    = 0.55       # alpha shaping fed into a smoothstep

src  = np.asarray(Image.open(SRC).convert("RGB")).astype(np.float64)
edge = src[:, :SAMPLE, :].mean(1)
ys   = np.linspace(0, src.shape[0] - 1, H)
edge = np.stack([np.interp(ys, np.arange(src.shape[0]), edge[:, c]) for c in range(3)], 1)

def vblur(col, r):
    if r < 0.6:
        return col
    k = int(r * 3) | 1
    g = np.exp(-0.5 * ((np.arange(k) - k // 2) / r) ** 2); g /= g.sum()
    return np.stack([np.convolve(np.pad(col[:, c], (k // 2, k // 2), "edge"), g, "valid")[:H]
                     for c in range(3)], 1)

rgb = np.zeros((H, W, 3)); alpha = np.zeros((H, W))
for i in range(W):
    t = i / (W - 1); d = 1 - t                      # t: 0 far, 1 at the join
    col = vblur(edge, BLUR_MIN + BLUR_MAX * d ** 0.75)
    lum = (col * (0.2126, 0.7152, 0.0722)).sum(1)[:, None]
    ch  = col - lum
    cap = CHROMA * (1 - d) ** 0.8 + 2.0             # kills the window's green far out
    ch *= np.minimum(1.0, cap / (np.abs(ch).max(1, keepdims=True) + 1e-6))
    rgb[:, i, :] = lum + ch
    u = np.clip(t ** GAMMA, 0, 1)
    alpha[:, i] = u * u * (3 - 2 * u)               # smoothstep: zero slope at both ends

out = np.concatenate([np.clip(rgb, 0, 255), (alpha * 255)[..., None]], 2).round().astype("uint8")
Image.fromarray(out).save(DST, optimize=True)
print(DST, Image.open(DST).size, os.path.getsize(DST), "bytes")
