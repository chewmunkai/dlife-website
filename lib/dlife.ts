/* ============================================================
   D'Life — "Real Support. Beyond the Policy."
   Motion engine. Port of the design handoff's project/site.js
   (Website v3 publication) onto the bundled GSAP + ScrollTrigger
   instead of the prototype's CDN tags.

   Everything is scoped to the page root and torn down on unmount:
   a gsap.context() scopes every selector string to `root` and
   reverts its tweens/ScrollTriggers on revert(), and the plain DOM
   listeners are collected alongside it.
   ============================================================ */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
/* A16/A17: this file kept its own copy of the number, so changing the one in
   lib/contact.ts would have left every homepage [data-wa] link pointing at the
   old one. There is one number on this site and it lives there — including
   the TODO that says it is still a placeholder. */
import { WA_NUMBER } from "./contact";

export function initDLife(root: HTMLElement): () => void {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(pointer:fine)").matches;
  gsap.registerPlugin(ScrollTrigger);

  const $ = <T extends Element = HTMLElement>(sel: string) => root.querySelector<T>(sel);
  const $$ = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel));

  /** Listeners + observers to unwind on unmount, alongside the gsap context. */
  const teardown: Array<() => void> = [];
  const on = <K extends keyof WindowEventMap>(
    target: Window | Element,
    type: K | string,
    fn: EventListenerOrEventListenerObject,
    opts?: AddEventListenerOptions,
  ) => {
    target.addEventListener(type, fn, opts);
    teardown.push(() => target.removeEventListener(type, fn, opts));
  };

  /* ---------- open at the top ----------
     Browsers restore the previous scroll position on reload, which on a page
     this long drops a visitor back into the middle of a section with the
     reveal animations already spent. A deep link is left alone: only a plain
     reload with no hash is sent back to the top. */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!location.hash) window.scrollTo(0, 0);

  /* ---------- WhatsApp prefills ---------- */
  $$<HTMLAnchorElement>("[data-wa]").forEach((a) => {
    a.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(a.dataset.wa || "")}`;
    a.target = "_blank";
    a.rel = "noopener";
  });

  const showAll = () =>
    $$(".rv, #hero h1 .lw span").forEach((el) => {
      (el as HTMLElement).style.opacity = "1";
      (el as HTMLElement).style.transform = "none";
    });

  /* The pathway image-swap engine that lived here is gone with the panel it
     drove. The selector is now a plain strip of links — no hover-selected
     plate, no caption to swap, nothing for JS to do. */

  const ctx = gsap.context(() => {
    /* ---------- loader + hero entrance ---------- */
    const loader = $("#loader");
    const heroIn = () => {
      if (reduced) return showAll();
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to("#hero h1 .lw span", { y: 0, duration: 1.2, stagger: 0.14, delay: 0.1 })
        .to("#hero .lb.rv", { opacity: 1, y: 0, duration: 0.8 }, "-=.8")
        .to("#hero p.rv, #hero .acts.rv", { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, "-=.6")
        /* The picture, not its container. The hero plate is a grid column now
           rather than a full-bleed backdrop, so scaling .bg would grow the
           column itself and push the copy sideways; the over-scanned .prlx
           inside it is what the crop was drawn to absorb. */
        .from("#hero .bg .prlx", { scale: 1.08, duration: 2.2, ease: "power2.out" }, 0);
    };
    // The prototype removed the loader node outright; hiding it keeps the
    // element under React's control while being visually identical.
    const hideLoader = () => loader && (loader as HTMLElement).style.setProperty("display", "none");
    // Inner pages ship no loader. Without this they would still sit through
    // the curtain's 2.4s before anything revealed, because the hero entrance
    // is sequenced off the end of that timeline.
    if (!loader) {
      heroIn();
    } else if (!reduced) {
      gsap
        .timeline()
        .to("#loader .wm", { y: 0, duration: 0.9, ease: "power4.out", delay: 0.1 })
        .to("#loader .sub", { opacity: 1, duration: 0.6 }, "-=.3")
        .to(loader, { yPercent: -100, duration: 1, ease: "power4.inOut", delay: 0.5, onComplete: hideLoader })
        .add(heroIn, "-=.55");
    } else {
      hideLoader();
      heroIn();
    }

    if (!reduced) {
      /* ---------- reveals, paced per section ----------
         Every .rv on the page previously arrived at the same 1.1s / top 87%,
         which is why a manifesto, a founder story and an FAQ all landed in
         the same voice. Sections that make an argument now arrive late and
         slow; utilities arrive early and crisp. This adds no triggers — it
         reparameterises the loop that already existed, and it is not visible
         as an effect, only as pacing. */
      type Pace = { d: number; start: string };
      const PACE: Record<string, Pace> = {
        close: { d: 1.6, start: "top 80%" }, // the last word, slowest
        man: { d: 1.5, start: "top 82%" }, //   the statement — let it land
        founder: { d: 1.45, start: "top 84%" },
        dva: { d: 1.4, start: "top 84%" }, //   by invitation: unhurried
        youth: { d: 1.25, start: "top 85%" },
        policy: { d: 1.1, start: "top 86%" },
        stories: { d: 1.0, start: "top 87%" },
        trust: { d: 1.0, start: "top 88%" },
        careers: { d: 0.95, start: "top 88%" },
        needs: { d: 0.9, start: "top 90%" }, // a browse, not a read
        path: { d: 0.8, start: "top 92%" }, //  a menu: get out of the way
        faq: { d: 0.8, start: "top 92%" },
      };
      const PACE_DEFAULT: Pace = { d: 1.1, start: "top 87%" };
      /* The chapter marker is the first thing a section says: earliest line,
         quickest, barely travels — so the label and the heading become two
         beats instead of one. */
      const PACE_LABEL: Pace = { d: 0.7, start: "top 94%" };

      /* Groups that sit side by side are animated as staggered sets further
         down; letting the generic pass also drive their opacity would put two
         competing tweens on the same property.

         Scoped to the two homepage sections that own those explicit staggers.
         Unscoped, this was a trap for every page added later: a `.story` card
         anywhere else on the site would be skipped here and picked up by
         nothing, so it would sit at opacity 0 forever. */
      const staggered = ".pillar, .story, .yc";
      $$(".rv").forEach((el) => {
        if (el.closest("#hero")) return;
        if (el.matches(staggered) && el.closest("#stories, #youth")) return;
        const p = el.matches(".lb") ? PACE_LABEL : PACE[el.closest("section")?.id ?? ""] ?? PACE_DEFAULT;
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: p.d,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: p.start },
        });
      });



      /* ---------- parallax on photo plates ---------- */
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

      /* The life-needs rail used to pin #needs and drag a horizontal track
         through it. That was the scroll-jacking the correction report rules
         out; the section is an ordinary grid now and scrolls with the page. */

      /* ---------- hero: drift out under the fold ----------
         The copy lifts and fades while the portrait creeps forward, so leaving
         the hero reads as depth rather than the page simply scrolling away.
         Scale stays modest — this is a photograph, not a gradient, and pushing
         it further would show the softness. */
      gsap.to("#hero .fg", {
        yPercent: -26,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("#hero .bg .prlx", {
        scale: 1.06,
        ease: "none",
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
      });

      /* ---------- section headings: wipe up ----------
         clipPath only, so this layers cleanly over the .rv opacity/translate
         pass those headings already carry rather than fighting it. */
      $$<HTMLElement>("section h2").forEach((h) => {
        gsap.fromTo(
          h,
          { clipPath: "inset(0 0 108% 0)" },
          {
            clipPath: "inset(0 0 -12% 0)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: h, start: "top 88%" },
          },
        );
      });

      /* ---------- plates: settle from an over-scan ----------
         Skips plates that already carry .prlx, which is driven separately. */
      $$<HTMLElement>(".ph img").forEach((img) => {
        if (img.closest(".prlx")) return;
        gsap.fromTo(
          img,
          { scale: 1.16 },
          {
            scale: 1,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: { trigger: img.closest(".ph"), start: "top 92%" },
          },
        );
      });

      /* ---------- trust strip: count the figure up ----------
         Only the purely numeric cell ("27"); the others are words. */
      $$<HTMLElement>("#trust b").forEach((b) => {
        const raw = b.childNodes[0]?.textContent?.trim() ?? "";
        const target = Number(raw);
        if (!raw || Number.isNaN(target)) return;
        const node = b.childNodes[0];
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: b, start: "top 90%" },
          onUpdate: () => {
            node.textContent = String(Math.round(counter.v));
          },
        });
      });

      /* ---------- founder diptych: differential drift ----------
         The two portraits travel at different rates, which is what stops a
         paired crop reading as one flat image. */
      $$<HTMLElement>("#founder .fpair .ph").forEach((p, i) => {
        gsap.fromTo(
          p,
          { yPercent: i === 0 ? 5 : -3 },
          {
            yPercent: i === 0 ? -5 : 3,
            ease: "none",
            scrollTrigger: { trigger: "#founder", start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      /* ---------- story cards: stagger in ---------- */
      gsap.fromTo(
        "#stories .story",
        { y: 46, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          stagger: 0.11,
          ease: "power3.out",
          scrollTrigger: { trigger: "#stories .reel", start: "top 84%" },
        },
      );

      /* ---------- youth cards: stagger in ---------- */
      gsap.fromTo(
        "#youth .yc",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: "#youth .grid", start: "top 86%" },
        },
      );

      /* ---------- read-progress rail ----------
         Measured against the document rather than a trigger element. Nothing
         pins any more, but document-relative is still the right frame: it
         cannot go stale when a section's height changes. */
      gsap.to("#prog i", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });

      /* ---------- closing heading ---------- */
      gsap.from("#close h2", {
        scale: 0.95,
        ease: "none",
        scrollTrigger: { trigger: "#close", start: "top bottom", end: "center 60%", scrub: true },
      });
    } else {
      showAll();
    }
  }, root);

  /* ---------- header ---------- */
  const hd = $("#hd");

  /* The hero's photograph starts on the header's lower edge, so the header's
     height has to be a number the stylesheet can read. The stylesheet carries
     a correct default for the bar as drawn; this measures the bar as rendered,
     which keeps the seam closed if its contents ever change.
     `.solid` comes off first — that state is 20px shorter, and measuring it
     would put the hero plate under a bar that is only that height mid-scroll. */
  const measureHeader = () => {
    if (!hd) return;
    const solid = hd.classList.contains("solid");
    if (solid) hd.classList.remove("solid");
    root.style.setProperty("--dl-hd", `${(hd as HTMLElement).offsetHeight}px`);
    if (solid) hd.classList.add("solid");
  };
  measureHeader();
  on(window, "resize", measureHeader, { passive: true } as AddEventListenerOptions);

  on(window, "scroll", () => hd?.classList.toggle("solid", scrollY > 80 && !root.classList.contains("menu-open")), {
    passive: true,
  });

  /* ---------- magnetic call-to-action pills ----------
     Fine pointers only: a touch device has no hover state to reward, and the
     offset would only fight the tap target. Listeners go through `on` so they
     unwind with the rest on unmount — gsap.context only reverts its own tweens. */
  if (fine && !reduced) {
    $$<HTMLElement>(".pill").forEach((el) => {
      on(el, "pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e as PointerEvent).clientX - (r.left + r.width / 2);
        const dy = (e as PointerEvent).clientY - (r.top + r.height / 2);
        gsap.to(el, { x: dx * 0.26, y: dy * 0.26, duration: 0.5, ease: "power3.out" });
      });
      on(el, "pointerleave", () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.75, ease: "elastic.out(1, 0.45)" });
      });
    });
  }

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
    if (mlabel) mlabel.textContent = open ? "Close" : "Menu";
    if (open) hd?.classList.remove("solid");
    if (!reduced) {
      /* The press itself, answered on the control before the panel has moved:
         the button takes a knock and springs back. CSS carries the :active
         squash while the finger is down; this is the release. */
      if (burger) gsap.fromTo(burger, { scale: 0.9 }, { scale: 1, duration: 0.55, ease: "elastic.out(1, 0.45)" });

      if (open) {
        gsap.set(menu, { visibility: "visible" });
        gsap
          .timeline()
          .to(menu, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power4.inOut" })
          /* Each line wipes up out of its own mask as well as rising, so the
             list assembles rather than simply fading in. clipPath finishes past
             100% to clear Lora's descenders. */
          .fromTo(
            menu.querySelectorAll(".big a"),
            { y: 56, opacity: 0, clipPath: "inset(0 0 100% 0)" },
            {
              y: 0,
              opacity: 1,
              clipPath: "inset(0 0 -14% 0)",
              duration: 0.85,
              stagger: 0.075,
              ease: "power4.out",
            },
            "-=.45",
          )
          /* y is reset here as well as x: the close tween below drops both
             columns by 18px, and a from-state that ignored it would leave the
             side panel 18px low on every reopen. */
          .fromTo(
            menu.querySelectorAll(".side"),
            { opacity: 0, x: 34, y: 0 },
            { opacity: 1, x: 0, y: 0, duration: 0.7, ease: "power3.out" },
            "-=.6",
          );
      } else {
        /* Closing is not the opening reversed: the contents drop away first and
           quickly, then the panel leaves. Running the panel over still-visible
           links reads as the type being cut off. */
        gsap
          .timeline({ onComplete: () => gsap.set(menu, { visibility: "hidden" }) })
          .to(menu.querySelectorAll(".big a, .side"), {
            y: 18,
            opacity: 0,
            duration: 0.3,
            stagger: 0.03,
            ease: "power2.in",
          })
          .to(menu, { clipPath: "inset(0 0 100% 0)", duration: 0.65, ease: "power4.inOut" }, "-=.12");
      }
    } else {
      const m = menu as HTMLElement;
      m.style.visibility = open ? "visible" : "hidden";
      m.style.clipPath = open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)";
    }
  };
  if (burger) on(burger, "click", () => setMenu(!menuOpen));
  $$<HTMLAnchorElement>('#menu a[href^="#"]').forEach((a) => on(a, "click", () => setMenu(false)));

  /* ---------- smooth anchors ---------- */
  $$<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    on(a, "click", (e) => {
      const href = a.getAttribute("href");
      const t = href && href.length > 1 ? root.querySelector(href) : null;
      if (!t) return;
      e.preventDefault();
      const y = t.getBoundingClientRect().top + scrollY;
      if (!reduced) {
        gsap.to(
          { v: scrollY },
          {
            v: y,
            duration: 1.2,
            ease: "power3.inOut",
            onUpdate() {
              scrollTo(0, (this.targets()[0] as { v: number }).v);
            },
          },
        );
      } else scrollTo(0, y);
    });
  });

  /* ---------- FAQ accordion ----------
     Bound by attribute rather than by `#faq`, so any number of accordions can
     appear on any page — and so the same behaviour survives the WordPress
     rebuild, where the container is an Elementor widget with
     `data-dl-accordion` set on its Advanced → Attributes tab rather than a
     section this codebase named. */
  $$("[data-dl-accordion] .item").forEach((item) => {
    const btn = item.querySelector(".q");
    const body = item.querySelector(".a");
    if (!btn || !body) return;
    on(btn, "click", () => {
      const open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      if (!reduced) gsap.to(body, { height: open ? "auto" : 0, duration: 0.55, ease: "power3.inOut" });
      else (body as HTMLElement).style.height = open ? "auto" : "0";
    });
  });

  /* ---------- "Stay in the Loop" signup ----------
     Front end only — no endpoint is wired and the consent wording is still
     pending, so the form acknowledges inline rather than implying storage.
     Attribute-bound like the accordion, and the acknowledgement travels with
     the form in `data-dl-signup` so each instance can answer in its own words. */
  $$("[data-dl-signup]").forEach((form) => {
    on(form, "submit", (e) => {
      e.preventDefault();
      const said = document.createElement("p");
      said.className = "said";
      said.setAttribute("role", "status");
      said.textContent =
        (form as HTMLElement).dataset.dlSignup || "Thanks — we’ll be in touch.";
      form.replaceWith(said);
    });
  });

  /* ---------- cursor + magnetic pills ---------- */
  const cur = $("#cur");
  if (cur && fine) {
    on(window, "mousemove", (e) =>
      gsap.to(cur, { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY, duration: 0.3, ease: "power3.out" }),
    );
    $$("a, button, .story .ph").forEach((el) => {
      on(el, "mouseenter", () => gsap.to(cur, { scale: 3.2, duration: 0.3 }));
      on(el, "mouseleave", () => gsap.to(cur, { scale: 1, duration: 0.3 }));
    });
    if (!reduced) {
      $$(".pill").forEach((el) => {
        on(el, "mousemove", (e) => {
          const r = el.getBoundingClientRect();
          const m = e as MouseEvent;
          gsap.to(el, {
            x: (m.clientX - r.left - r.width / 2) * 0.22,
            y: (m.clientY - r.top - r.height / 2) * 0.3,
            duration: 0.4,
            ease: "power3.out",
          });
        });
        on(el, "mouseleave", () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,.55)" }));
      });
    }
  } else if (cur) {
    (cur as HTMLElement).style.display = "none";
  }

  /* Webfont metrics shift every measured trigger — recalculate once they land. */
  document.fonts?.ready.then(() => {
    measureHeader();
    ScrollTrigger.refresh();
  });

  return () => {
    teardown.forEach((fn) => fn());
    ctx.revert();
  };
}
