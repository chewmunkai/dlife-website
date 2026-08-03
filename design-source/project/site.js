/* D'Life homepage — correction build.
   Quiet reveals, an inline video carousel, and no scroll-jacking anywhere:
   the life-needs rail is a normal snapped scroller, not a pinned timeline. */
(function () {
  var root = document.querySelector(".dlife");
  if (!root) return;

  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(pointer:fine)").matches;
  gsap.registerPlugin(ScrollTrigger);

  var $ = function (s) { return root.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(root.querySelectorAll(s)); };
  var on = function (t, type, fn, opts) { t.addEventListener(type, fn, opts); };

  var showAll = function () {
    $$(".rv, #hero h1 .lw span").forEach(function (el) { el.style.opacity = "1"; el.style.transform = "none"; });
  };

  gsap.context(function () {
    /* ---------- loader → hero ---------- */
    var loader = $("#loader");
    var heroIn = function () {
      if (reduced) return showAll();
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .to("#hero h1 .lw span", { y: 0, duration: 1.1, stagger: 0.12, delay: 0.1 })
        .to("#hero .lb.rv", { opacity: 1, y: 0, duration: 0.7 }, "-=.75")
        .to("#hero p.rv, #hero .acts.rv", { opacity: 1, y: 0, duration: 0.85, stagger: 0.1 }, "-=.55")
        /* fromTo, not from: the plate carries .rv, so the stylesheet has already
           pre-hidden it and `from` would tween opacity 0 → 0. */
        .fromTo("#hero .ph", { scale: 0.94, opacity: 0 },
          { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, 0.2);
    };
    var hideLoader = function () { if (loader) loader.style.setProperty("display", "none"); };
    if (!reduced) {
      gsap.timeline()
        .to("#loader .wm", { y: 0, duration: 0.85, ease: "power4.out", delay: 0.1 })
        .to("#loader .sub", { opacity: 1, duration: 0.55 }, "-=.3")
        .to(loader, { yPercent: -100, duration: 0.95, ease: "power4.inOut", delay: 0.4, onComplete: hideLoader })
        .add(heroIn, "-=.5");
    } else { hideLoader(); heroIn(); }

    if (reduced) { showAll(); return; }

    /* ---------- reveals, paced per section ----------
       Sections that make an argument arrive slower; routing and utility
       sections arrive early and crisp so they never hold the visitor up. */
    var PACE = {
      close: { d: 1.5, start: "top 82%" },
      founder: { d: 1.35, start: "top 84%" },
      dva: { d: 1.3, start: "top 84%" },
      youth: { d: 1.15, start: "top 86%" },
      policy: { d: 1.05, start: "top 86%" },
      stories: { d: 1.0, start: "top 87%" },
      careers: { d: 0.95, start: "top 88%" },
      needs: { d: 0.9, start: "top 90%" },
      trust: { d: 0.85, start: "top 92%" },
      faq: { d: 0.8, start: "top 92%" },
      path: { d: 0.6, start: "top 95%" }
    };
    var DEF = { d: 1.05, start: "top 88%" };
    var LABEL = { d: 0.6, start: "top 94%" };
    var grouped = ".ncard, .vcard, .yc, #trust .c";
    $$(".rv").forEach(function (el) {
      if (el.closest("#hero")) return;
      if (el.matches(grouped)) return;
      var sec = el.closest("section");
      var p = el.matches(".lb") ? LABEL : (PACE[sec ? sec.id : ""] || DEF);
      gsap.to(el, { opacity: 1, y: 0, duration: p.d, ease: "power3.out", scrollTrigger: { trigger: el, start: p.start } });
    });

    /* Side-by-side sets stagger as one group rather than firing on the same line. */
    [["#trust", "#trust .c", 0.07], ["#needs .grid", "#needs .ncard", 0.08],
     ["#youth .grid", "#youth .yc", 0.1]].forEach(function (g) {
      gsap.fromTo(g[1], { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: g[2], ease: "power3.out", scrollTrigger: { trigger: g[0], start: "top 88%" } });
    });

    /* ---------- photographic plates ---------- */
    $$(".ph .prlx").forEach(function (p) {
      gsap.fromTo(p, { yPercent: -6 }, { yPercent: 6, ease: "none",
        scrollTrigger: { trigger: p.closest(".ph"), start: "top bottom", end: "bottom top", scrub: true } });
    });
    $$(".ph img").forEach(function (img) {
      if (img.closest(".prlx")) return;
      gsap.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: img.closest(".ph"), start: "top 92%" } });
    });

    /* ---------- headings wipe up ---------- */
    $$("section h2").forEach(function (h) {
      gsap.fromTo(h, { clipPath: "inset(0 0 106% 0)" },
        { clipPath: "inset(0 0 -12% 0)", duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: h, start: "top 90%" } });
    });

    /* ---------- read progress ----------
       Measured against the document, so no pinned section can desync it. */
    gsap.to("#prog i", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
    gsap.from("#close h2", { scale: 0.96, ease: "none",
      scrollTrigger: { trigger: "#close", start: "top bottom", end: "center 60%", scrub: true } });
  }, root);

  /* ---------- header ---------- */
  var hd = $("#hd");
  on(window, "scroll", function () {
    if (hd) hd.classList.toggle("solid", scrollY > 80 && !root.classList.contains("menu-open"));
  }, { passive: true });

  /* ---------- overlay menu ---------- */
  var menu = $("#menu"), burger = $("#burger"), mlabel = $("#mlabel"), menuOpen = false;
  var setMenu = function (open) {
    if (!menu) return;
    menuOpen = open;
    root.classList.toggle("menu-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    if (burger) burger.setAttribute("aria-expanded", String(open));
    if (mlabel) mlabel.textContent = open ? "Close" : "Menu";
    if (open && hd) hd.classList.remove("solid");
    if (!reduced) {
      if (open) {
        gsap.set(menu, { visibility: "visible" });
        gsap.timeline()
          .to(menu, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut" })
          .fromTo(menu.querySelectorAll(".big a"), { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power3.out" }, "-=.3")
          .fromTo(menu.querySelectorAll(".side"), { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=.45");
      } else {
        gsap.to(menu, { clipPath: "inset(0 0 100% 0)", duration: 0.6, ease: "power4.inOut",
          onComplete: function () { gsap.set(menu, { visibility: "hidden" }); } });
      }
    } else {
      menu.style.visibility = open ? "visible" : "hidden";
      menu.style.clipPath = open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)";
    }
  };
  if (burger) on(burger, "click", function () { setMenu(!menuOpen); });
  on(document, "keydown", function (e) { if (e.key === "Escape" && menuOpen) setMenu(false); });
  $$("#menu a").forEach(function (a) { on(a, "click", function () { setMenu(false); }); });

  /* ---------- in-page anchors ---------- */
  $$('a[href^="#"]').forEach(function (a) {
    on(a, "click", function (e) {
      var href = a.getAttribute("href");
      var t = href && href.length > 1 ? root.querySelector(href) : null;
      if (!t) return;
      e.preventDefault();
      var y = t.getBoundingClientRect().top + scrollY - 70;
      if (!reduced) {
        gsap.to({ v: scrollY }, { v: y, duration: 1.1, ease: "power3.inOut",
          onUpdate: function () { scrollTo(0, this.targets()[0].v); } });
      } else scrollTo(0, y);
    });
  });

  /* ---------- FAQ accordion ---------- */
  $$("#faq .item").forEach(function (item) {
    var btn = item.querySelector(".q"), body = item.querySelector(".a");
    if (!btn || !body) return;
    on(btn, "click", function () {
      var open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      if (!reduced) gsap.to(body, { height: open ? "auto" : 0, duration: 0.5, ease: "power3.inOut" });
      else body.style.height = open ? "auto" : "0";
    });
  });

  /* ---------- featured videos ----------
     One centre card is active and enlarged; playback stays inside that card.
     Enters muted with a visible Muted badge and an Unmute control, rotates
     forward when a film finishes, and never moves the page to do it. */
  (function () {
    var rail = $("#stories .rail"), track = $("#vtrack");
    if (!rail || !track) return;
    var cards = $$("#vtrack .vcard");
    if (!cards.length) return;
    var vids = cards.map(function (c) { return c.querySelector("video"); });
    var dots = $("#stories .dots"), ppBtn = $("#stories .pp"), sound = $("#stories .sound");
    var idx = 0, offset = 0, muted = true, wantPlay = !reduced, visible = false;

    cards.forEach(function (c, i) {
      var d = document.createElement("button");
      d.type = "button";
      d.setAttribute("aria-label", "Show video " + (i + 1) + " of " + cards.length);
      on(d, "click", function () { go(i); });
      dots.appendChild(d);
      on(c.querySelector(".fr"), "click", function () {
        if (i !== idx) return go(i);
        if (wantPlay && !vids[i].paused) pause(); else play();
      });
      /* No source yet (the films are not supplied): stay on the poster and
         keep the Play control visible rather than showing a broken frame. */
      on(vids[i], "error", function () { c.classList.add("no-src"); c.classList.remove("live"); });
      on(vids[i], "ended", function () { if (i === idx) go((idx + 1) % cards.length); });
    });

    function centre() {
      var r = rail.getBoundingClientRect(), c = cards[idx].getBoundingClientRect();
      offset += (r.left + r.width / 2) - (c.left + c.width / 2);
      var max = 0, min = rail.clientWidth - track.scrollWidth;
      offset = Math.max(Math.min(offset, max), Math.min(min, 0));
      track.style.transform = "translateX(" + offset + "px)";
    }
    function paint() {
      cards.forEach(function (c, i) { c.classList.toggle("on", i === idx); });
      Array.prototype.forEach.call(dots.children, function (d, i) {
        d.classList.toggle("on", i === idx);
        d.setAttribute("aria-current", i === idx ? "true" : "false");
      });
      requestAnimationFrame(centre);
      setTimeout(centre, 580);
    }
    function play() {
      var v = vids[idx];
      wantPlay = true;
      v.muted = muted;
      var p = v.play();
      if (p && p.catch) p.catch(function () { cards[idx].classList.remove("live"); });
      cards[idx].classList.add("live");
      setPP(true);
    }
    function pause() { wantPlay = false; vids[idx].pause(); setPP(false); }
    function setPP(playing) {
      ppBtn.setAttribute("aria-label", playing ? "Pause video" : "Play video");
      ppBtn.innerHTML = playing
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"></path></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg>';
    }
    function go(i) {
      vids[idx].pause();
      vids[idx].currentTime = 0;
      cards[idx].classList.remove("live");
      idx = i;
      paint();
      if (wantPlay && visible) play();
    }

    on($("#stories .prev"), "click", function () { go((idx - 1 + cards.length) % cards.length); });
    on($("#stories .next"), "click", function () { go((idx + 1) % cards.length); });
    on(ppBtn, "click", function () { if (wantPlay && !vids[idx].paused) pause(); else play(); });
    on(sound, "click", function () {
      muted = !muted;
      vids.forEach(function (v) { v.muted = muted; });
      sound.setAttribute("aria-pressed", String(muted));
      sound.querySelector("span").textContent = muted ? "Unmute" : "Mute";
      cards.forEach(function (c) {
        var b = c.querySelector(".badge");
        b.lastChild.textContent = muted ? "Muted" : "Sound on";
      });
      if (muted === false && vids[idx].paused) play();
    });
    on(window, "resize", function () { requestAnimationFrame(centre); });

    paint();
    setPP(false);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          visible = e.isIntersecting;
          if (visible && wantPlay) play();
          else if (!visible) { vids[idx].pause(); setPP(false); }
        });
      }, { threshold: 0.4 }).observe($("#stories"));
    }
  })();

  /* ---------- youth signup ----------
     Front end only — no endpoint is wired, and the consent wording is still
     pending, so the form acknowledges inline rather than implying storage. */
  var form = $("#loopform");
  if (form) {
    on(form, "submit", function (e) {
      e.preventDefault();
      var said = document.createElement("p");
      said.className = "said";
      said.setAttribute("role", "status");
      said.textContent = "Thanks — we’ll be in touch with the next Youth Community update.";
      form.replaceWith(said);
    });
  }

  /* ---------- desktop cursor ----------
     Pointer-fine only, and purely decorative: it never replaces or hides the
     focus ring, which keyboard users still get from :focus-visible. */
  var cur = $("#cur");
  if (cur && fine) {
    on(window, "mousemove", function (e) {
      gsap.to(cur, { x: e.clientX, y: e.clientY, duration: 0.3, ease: "power3.out" });
    });
    $$("a, button, input").forEach(function (el) {
      on(el, "mouseenter", function () { gsap.to(cur, { scale: 3, duration: 0.3 }); });
      on(el, "mouseleave", function () { gsap.to(cur, { scale: 1, duration: 0.3 }); });
    });
    if (!reduced) {
      $$(".pill").forEach(function (el) {
        on(el, "mousemove", function (e) {
          var r = el.getBoundingClientRect();
          gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.18,
            y: (e.clientY - r.top - r.height / 2) * 0.24, duration: 0.4, ease: "power3.out" });
        });
        on(el, "mouseleave", function () { gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,.55)" }); });
      });
    }
  } else if (cur) { cur.style.display = "none"; }

  if (document.fonts) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
})();
