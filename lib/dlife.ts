/* ============================================================
   D'Life — "Real Support. Beyond the Policy."
   Motion engine. Port of the design handoff's project/site.js
   (Website v3 publication, correction build) onto the bundled
   GSAP + ScrollTrigger instead of the prototype's CDN tags.

   Quiet reveals and no scroll-jacking anywhere: the life-needs rail is a
   normal snapped scroller rather than a pinned timeline, and the featured
   films play inside their own card rather than in a lightbox.

   Everything is scoped to the page root and torn down on unmount: a
   gsap.context() scopes every selector string to `root` and reverts its
   tweens/ScrollTriggers on revert(), and the plain DOM listeners, observers
   and injected nodes are collected alongside it. That teardown is load-
   bearing — React StrictMode mounts this twice in development.
   ============================================================ */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Reveal pacing per section: sections that make an argument arrive slower;
    routing and utility sections arrive early and crisp so they never hold the
    visitor up. */
type Pace = { d: number; start: string };
const PACE: Record<string, Pace> = {
  close: { d: 1.5, start: "top 82%" }, //    the last word, slowest
  founder: { d: 1.35, start: "top 84%" },
  dva: { d: 1.3, start: "top 84%" }, //      by invitation: unhurried
  youth: { d: 1.15, start: "top 86%" },
  policy: { d: 1.05, start: "top 86%" },
  stories: { d: 1.0, start: "top 87%" },
  careers: { d: 0.95, start: "top 88%" },
  needs: { d: 0.9, start: "top 90%" }, //    a browse, not a read
  trust: { d: 0.85, start: "top 92%" },
  faq: { d: 0.8, start: "top 92%" },
  path: { d: 0.6, start: "top 95%" }, //     a menu: get out of the way
};
const PACE_DEFAULT: Pace = { d: 1.05, start: "top 88%" };
/** The chapter marker is the first thing a section says: earliest line,
    quickest, barely travels — so label and heading become two beats. */
const PACE_LABEL: Pace = { d: 0.6, start: "top 94%" };

/** Sets that sit side by side, staggered as a group further down. Letting the
    generic pass also drive their opacity would put two tweens on one property. */
const GROUPED = ".ncard, .vcard, .yc, #trust .c";

const PLAY_GLYPH =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg>';
const PAUSE_GLYPH =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"></path></svg>';

export function initDLife(root: HTMLElement): () => void {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(pointer:fine)").matches;
  gsap.registerPlugin(ScrollTrigger);

  const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel);
  const $$ = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel));

  /** Listeners, observers and injected nodes to unwind alongside the context. */
  const teardown: Array<() => void> = [];
  const on = (
    target: Window | Document | Element,
    type: string,
    fn: EventListenerOrEventListenerObject,
    opts?: AddEventListenerOptions,
  ) => {
    target.addEventListener(type, fn, opts);
    teardown.push(() => target.removeEventListener(type, fn, opts));
  };

  const showAll = () =>
    $$(".rv, #hero h1 .lw span").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });

  const ctx = gsap.context(() => {
    /* ---------- loader → hero ---------- */
    const loader = $("#loader");
    const heroIn = () => {
      if (reduced) return showAll();
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to("#hero h1 .lw span", { y: 0, duration: 1.1, stagger: 0.12, delay: 0.1 })
        .to("#hero .lb.rv", { opacity: 1, y: 0, duration: 0.7 }, "-=.75")
        .to("#hero p.rv, #hero .acts.rv", { opacity: 1, y: 0, duration: 0.85, stagger: 0.1 }, "-=.55")
        /* fromTo, not from: the plate carries .rv, so the stylesheet has
           already pre-hidden it and `from` would tween opacity 0 → 0. */
        .fromTo(
          "#hero .ph",
          { scale: 0.94, opacity: 0 },
          { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
          0.2,
        );
    };
    // The prototype removed the loader node outright; hiding it keeps the
    // element under React's control while being visually identical.
    const hideLoader = () => loader?.style.setProperty("display", "none");
    if (!reduced) {
      gsap
        .timeline()
        .to("#loader .wm", { y: 0, duration: 0.85, ease: "power4.out", delay: 0.1 })
        .to("#loader .sub", { opacity: 1, duration: 0.55 }, "-=.3")
        .to(loader, { yPercent: -100, duration: 0.95, ease: "power4.inOut", delay: 0.4, onComplete: hideLoader })
        .add(heroIn, "-=.5");
    } else {
      hideLoader();
      heroIn();
    }

    if (reduced) {
      showAll();
      return;
    }

    /* ---------- reveals, paced per section ---------- */
    $$(".rv").forEach((el) => {
      if (el.closest("#hero")) return;
      if (el.matches(GROUPED)) return;
      const p = el.matches(".lb") ? PACE_LABEL : PACE[el.closest("section")?.id ?? ""] ?? PACE_DEFAULT;
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: p.d,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: p.start },
      });
    });

    /* Side-by-side sets stagger as one group rather than firing on one line. */
    (
      [
        ["#trust", "#trust .c", 0.07],
        ["#needs .grid", "#needs .ncard", 0.08],
        ["#youth .grid", "#youth .yc", 0.1],
      ] as Array<[string, string, number]>
    ).forEach(([trigger, targets, stagger]) => {
      gsap.fromTo(
        targets,
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger,
          ease: "power3.out",
          scrollTrigger: { trigger, start: "top 88%" },
        },
      );
    });

    /* ---------- photographic plates ---------- */
    $$(".ph .prlx").forEach((p) => {
      gsap.fromTo(
        p,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: p.closest(".ph"), start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
    /* Plates settle from an over-scan. Skips anything already inside .prlx,
       which is driven by the scrub above. */
    $$<HTMLImageElement>(".ph img").forEach((img) => {
      if (img.closest(".prlx")) return;
      gsap.fromTo(
        img,
        { scale: 1.12 },
        {
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: img.closest(".ph"), start: "top 92%" },
        },
      );
    });

    /* ---------- section headings wipe up ----------
       clipPath only, so this layers cleanly over the .rv opacity/translate
       pass those headings already carry rather than fighting it. */
    $$("section h2").forEach((h) => {
      gsap.fromTo(
        h,
        { clipPath: "inset(0 0 106% 0)" },
        {
          clipPath: "inset(0 0 -12% 0)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: h, start: "top 90%" },
        },
      );
    });

    /* ---------- read progress ----------
       Measured against the document, so no section can desync it. */
    gsap.to("#prog i", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
    gsap.from("#close h2", {
      scale: 0.96,
      ease: "none",
      scrollTrigger: { trigger: "#close", start: "top bottom", end: "center 60%", scrub: true },
    });
  }, root);

  /* ---------- header ---------- */
  const hd = $("#hd");
  on(window, "scroll", () => hd?.classList.toggle("solid", scrollY > 80 && !root.classList.contains("menu-open")), {
    passive: true,
  });

  /* ---------- overlay menu ---------- */
  const menu = $("#menu");
  const burger = $("#burger");
  const mlabel = $("#mlabel");
  let menuOpen = false;
  const setMenu = (open: boolean) => {
    if (!menu) return;
    menuOpen = open;
    // The prototype toggled this on <body>; the stylesheet is scoped to the
    // page root, so the flag lives there instead.
    root.classList.toggle("menu-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    burger?.setAttribute("aria-expanded", String(open));
    if (mlabel) mlabel.textContent = open ? "Close" : "Menu";
    if (open) hd?.classList.remove("solid");
    if (!reduced) {
      if (open) {
        gsap.set(menu, { visibility: "visible" });
        gsap
          .timeline()
          .to(menu, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut" })
          .fromTo(
            menu.querySelectorAll(".big a"),
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power3.out" },
            "-=.3",
          )
          .fromTo(menu.querySelectorAll(".side"), { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=.45");
      } else {
        gsap.to(menu, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.6,
          ease: "power4.inOut",
          onComplete: () => gsap.set(menu, { visibility: "hidden" }),
        });
      }
    } else {
      menu.style.visibility = open ? "visible" : "hidden";
      menu.style.clipPath = open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)";
    }
  };
  if (burger) on(burger, "click", () => setMenu(!menuOpen));
  on(document, "keydown", (e) => {
    if ((e as KeyboardEvent).key === "Escape" && menuOpen) setMenu(false);
  });
  $$("#menu a").forEach((a) => on(a, "click", () => setMenu(false)));

  /* ---------- in-page anchors ----------
     Offset by the fixed header, so a target never lands underneath it. */
  $$<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    on(a, "click", (e) => {
      const href = a.getAttribute("href");
      const t = href && href.length > 1 ? root.querySelector(href) : null;
      if (!t) return;
      e.preventDefault();
      const y = t.getBoundingClientRect().top + scrollY - 70;
      if (!reduced) {
        gsap.to(
          { v: scrollY },
          {
            v: y,
            duration: 1.1,
            ease: "power3.inOut",
            onUpdate() {
              scrollTo(0, (this.targets()[0] as { v: number }).v);
            },
          },
        );
      } else scrollTo(0, y);
    });
  });

  /* ---------- FAQ accordion ---------- */
  $$("#faq .item").forEach((item) => {
    const btn = item.querySelector(".q");
    const body = item.querySelector<HTMLElement>(".a");
    if (!btn || !body) return;
    on(btn, "click", () => {
      const open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      if (!reduced) gsap.to(body, { height: open ? "auto" : 0, duration: 0.5, ease: "power3.inOut" });
      else body.style.height = open ? "auto" : "0";
    });
  });

  /* ---------- featured videos ----------
     One centre card is active and enlarged; playback stays inside that card.
     It enters muted with a visible Muted badge and an Unmute control, rotates
     forward when a film finishes, and never moves the page to do it. */
  const rail = $("#stories .rail");
  const track = $("#vtrack");
  const dots = $("#stories .dots");
  const ppBtn = $("#stories .pp");
  const sound = $("#stories .sound");
  const cards = $$("#vtrack .vcard");
  const vids = cards.map((c) => c.querySelector("video"));

  if (rail && track && dots && ppBtn && sound && cards.length && vids.every(Boolean)) {
    const videos = vids as HTMLVideoElement[];
    /** The dot buttons this instance appended, so teardown removes only its own. */
    const ownDots: HTMLButtonElement[] = [];
    let centreTimer: ReturnType<typeof setTimeout> | undefined;
    let idx = 0;
    let offset = 0;
    let muted = true;
    let wantPlay = !reduced;
    let visible = false;

    const centre = () => {
      const r = rail.getBoundingClientRect();
      const c = cards[idx].getBoundingClientRect();
      offset += r.left + r.width / 2 - (c.left + c.width / 2);
      const min = rail.clientWidth - track.scrollWidth;
      offset = Math.max(Math.min(offset, 0), Math.min(min, 0));
      track.style.transform = `translateX(${offset}px)`;
    };

    const setPP = (playing: boolean) => {
      ppBtn.setAttribute("aria-label", playing ? "Pause video" : "Play video");
      ppBtn.innerHTML = playing ? PAUSE_GLYPH : PLAY_GLYPH;
    };

    const paint = () => {
      cards.forEach((c, i) => c.classList.toggle("on", i === idx));
      Array.from(dots.children).forEach((d, i) => {
        d.classList.toggle("on", i === idx);
        d.setAttribute("aria-current", i === idx ? "true" : "false");
      });
      // Once now, and once after the flex-basis transition has resolved the
      // card's final width. One handle, reused — pushing a fresh clearTimeout
      // onto `teardown` per repaint would grow that array without bound.
      requestAnimationFrame(centre);
      clearTimeout(centreTimer);
      centreTimer = setTimeout(centre, 580);
    };

    const play = () => {
      const v = videos[idx];
      const card = cards[idx];
      wantPlay = true;
      v.muted = muted;
      card.classList.add("live");
      setPP(true);
      /* Autoplay can be refused outright (no user gesture yet, a data-saver
         policy, a background tab). A rejected promise is the only signal for
         that — a media `error` event is a different thing — so the optimistic
         state is unwound here, which drops the poster and its Play control
         back into view and stops the control claiming to be playing. */
      v.play()?.catch(() => {
        card.classList.remove("live");
        if (cards[idx] === card) setPP(false);
      });
    };
    const pause = () => {
      wantPlay = false;
      videos[idx].pause();
      setPP(false);
    };
    const toggle = () => (wantPlay && !videos[idx].paused ? pause() : play());

    const go = (i: number) => {
      videos[idx].pause();
      videos[idx].currentTime = 0;
      cards[idx].classList.remove("live");
      idx = i;
      paint();
      if (wantPlay && visible) play();
    };

    cards.forEach((c, i) => {
      const d = document.createElement("button");
      d.type = "button";
      d.setAttribute("aria-label", `Show video ${i + 1} of ${cards.length}`);
      on(d, "click", () => go(i));
      ownDots.push(d);
      dots.appendChild(d);

      const frame = c.querySelector(".fr");
      if (frame) on(frame, "click", () => (i === idx ? toggle() : go(i)));
      /* No playable source (the films may not be supplied on every host):
         stay on the poster and keep the Play control visible rather than
         showing a dead frame. */
      on(videos[i], "error", () => {
        c.classList.add("no-src");
        c.classList.remove("live");
      });
      on(videos[i], "ended", () => {
        if (i === idx) go((idx + 1) % cards.length);
      });
    });
    /* React owns this subtree; the dots are ours. Remove exactly the nodes this
       instance appended rather than emptying the container — under StrictMode's
       double-mount a stale teardown would otherwise wipe the live instance's
       dots and leave the carousel with no pagination at all. */
    teardown.push(() => {
      ownDots.forEach((b) => b.remove());
      clearTimeout(centreTimer);
    });

    const prev = $("#stories .prev");
    const next = $("#stories .next");
    if (prev) on(prev, "click", () => go((idx - 1 + cards.length) % cards.length));
    if (next) on(next, "click", () => go((idx + 1) % cards.length));
    on(ppBtn, "click", toggle);
    on(sound, "click", () => {
      muted = !muted;
      videos.forEach((v) => (v.muted = muted));
      sound.setAttribute("aria-pressed", String(muted));
      const label = sound.querySelector("span");
      if (label) label.textContent = muted ? "Unmute" : "Mute";
      cards.forEach((c) => {
        const badge = c.querySelector(".badge");
        if (badge?.lastChild) badge.lastChild.textContent = muted ? "Muted" : "Sound on";
      });
      if (!muted && videos[idx].paused) play();
    });
    on(window, "resize", () => requestAnimationFrame(centre));

    paint();
    setPP(false);

    /* Autoplay only while the section is actually on screen, and stop the
       moment it leaves — a film should never keep playing off-screen. */
    const stories = $("#stories");
    if (stories && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            visible = e.isIntersecting;
            if (visible && wantPlay) play();
            else if (!visible) {
              videos[idx].pause();
              setPP(false);
            }
          }),
        { threshold: 0.4 },
      );
      io.observe(stories);
      teardown.push(() => io.disconnect());
    }
  }

  /* ---------- youth signup ----------
     Front end only — no endpoint is wired and the consent wording is still
     pending, so the form acknowledges inline rather than implying storage. */
  const form = $("#loopform");
  if (form) {
    on(form, "submit", (e) => {
      e.preventDefault();
      const said = document.createElement("p");
      said.className = "said";
      said.setAttribute("role", "status");
      said.textContent = "Thanks — we’ll be in touch with the next Youth Community update.";
      form.replaceWith(said);
    });
  }

  /* ---------- desktop cursor ----------
     Pointer-fine only, and purely decorative: it never replaces or hides the
     focus ring, which keyboard users still get from :focus-visible. */
  const cur = $("#cur");
  if (cur && fine) {
    on(window, "mousemove", (e) =>
      gsap.to(cur, { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY, duration: 0.3, ease: "power3.out" }),
    );
    $$("a, button, input").forEach((el) => {
      on(el, "mouseenter", () => gsap.to(cur, { scale: 3, duration: 0.3 }));
      on(el, "mouseleave", () => gsap.to(cur, { scale: 1, duration: 0.3 }));
    });
    /* Magnetic pills. A touch device has no hover state to reward, and the
       offset would only fight the tap target. */
    if (!reduced) {
      $$(".pill").forEach((el) => {
        on(el, "mousemove", (e) => {
          const r = el.getBoundingClientRect();
          const m = e as MouseEvent;
          gsap.to(el, {
            x: (m.clientX - r.left - r.width / 2) * 0.18,
            y: (m.clientY - r.top - r.height / 2) * 0.24,
            duration: 0.4,
            ease: "power3.out",
          });
        });
        on(el, "mouseleave", () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,.55)" }));
      });
    }
  } else if (cur) {
    cur.style.display = "none";
  }

  /* Webfont metrics shift every measured trigger — recalculate once they land. */
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  return () => {
    teardown.forEach((fn) => fn());
    ctx.revert();
  };
}
