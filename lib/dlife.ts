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

// TODO(launch): replace with D'Life's real WhatsApp business number.
// Carried over from the prototype ("replace WA_NUMBER at launch").
const WA_NUMBER = "60123456789";

// Captions swapped into the pathway plate, indexed by option order.
const PATH_CAPS = [
  "Coverage built around the people who depend on you.",
  "Understand the protection you already have.",
  "Retirement and legacy planning, with confidence.",
  "A career built on real guidance.",
  "Empowering youth. Building tomorrow.",
];

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
        .from("#hero .bg", { scale: 1.08, duration: 2.2, ease: "power2.out" }, 0);
    };
    // The prototype removed the loader node outright; hiding it keeps the
    // element under React's control while being visually identical.
    const hideLoader = () => loader && (loader as HTMLElement).style.setProperty("display", "none");
    if (!reduced) {
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
      /* ---------- reveals ---------- */
      $$(".rv").forEach((el) => {
        if (el.closest("#hero")) return;
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 87%" },
        });
      });

      /* ---------- manifesto scrub ---------- */
      const man = $("#man .man");
      if (man) {
        const walk = (node: Node) => {
          Array.from(node.childNodes).forEach((ch) => {
            if (ch.nodeType === Node.TEXT_NODE) {
              const frag = document.createDocumentFragment();
              (ch.textContent || "").split(/(\s+)/).forEach((tok) => {
                if (/^\s*$/.test(tok)) return void frag.appendChild(document.createTextNode(tok));
                const w = document.createElement("span");
                w.className = "w";
                w.textContent = tok;
                frag.appendChild(w);
              });
              node.replaceChild(frag, ch);
            } else if (ch.nodeType === Node.ELEMENT_NODE) walk(ch);
          });
        };
        walk(man);
        gsap.to(man.querySelectorAll(".w"), {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: { trigger: man, start: "top 75%", end: "bottom 40%", scrub: true },
        });
      }

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

      /* ---------- needs: horizontal drag of the rail ---------- */
      const track = $("#ntrack");
      const rail = track?.parentElement;
      if (track && rail && innerWidth > 1080) {
        const dist = () => track.scrollWidth - rail.clientWidth + parseFloat(getComputedStyle(track).paddingLeft);
        gsap.to(track, {
          x: () => -Math.max(0, dist()),
          ease: "none",
          scrollTrigger: {
            trigger: "#needs",
            start: "top top",
            end: () => `+=${Math.max(600, dist())}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }

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
    if (mlabel) mlabel.textContent = open ? "Close" : "Menu";
    if (open) hd?.classList.remove("solid");
    if (!reduced) {
      if (open) {
        gsap.set(menu, { visibility: "visible" });
        gsap
          .timeline()
          .to(menu, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power4.inOut" })
          .fromTo(
            menu.querySelectorAll(".big a"),
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: "power3.out" },
            "-=.3",
          )
          .fromTo(menu.querySelectorAll(".side"), { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=.5");
      } else {
        gsap.to(menu, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.7,
          ease: "power4.inOut",
          onComplete: () => gsap.set(menu, { visibility: "hidden" }),
        });
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

  /* ---------- pathway image swap ---------- */
  const ims = $$("#path .vis .im");
  const cap = $("#pathcap");
  const opts = $$<HTMLAnchorElement>("#path a.opt");
  opts.forEach((opt) => {
    on(opt, "mouseenter", () => {
      const i = Number(opt.dataset.im);
      ims.forEach((im, k) => im.classList.toggle("on", k === i));
      opts.forEach((o) => o.classList.remove("on"));
      opt.classList.add("on");
      if (cap) cap.textContent = PATH_CAPS[i];
    });
  });

  /* ---------- FAQ accordion ---------- */
  $$("#faq .item").forEach((item) => {
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

  /* ---------- youth signup ---------- */
  const toast = $("#toast");
  const loopform = $<HTMLFormElement>("#loopform");
  if (loopform && toast) {
    on(loopform, "submit", (e) => {
      e.preventDefault();
      // TODO(launch): POST to the real mailing-list endpoint. Front-end only
      // for now — the success state is optimistic, nothing is stored.
      toast.textContent = "You’re in the loop. See you at the next event.";
      gsap
        .timeline()
        .to(toast, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .to(toast, { opacity: 0, y: 16, duration: 0.5, delay: 3 });
      loopform.reset();
    });
  }

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
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  return () => {
    teardown.forEach((fn) => fn());
    ctx.revert();
  };
}
