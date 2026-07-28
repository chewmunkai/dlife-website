/* D'Life v3 */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer:fine)').matches;
  const hasGsap = typeof gsap !== 'undefined';
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* WhatsApp prefills — replace WA_NUMBER at launch */
  const WA_NUMBER = '60123456789';
  document.querySelectorAll('[data-wa]').forEach(a => {
    a.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(a.dataset.wa);
    a.target = '_blank'; a.rel = 'noopener';
  });

  const showAll = () => document.querySelectorAll('.rv, #hero h1 .lw span').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });

  /* ---------- loader + hero entrance ---------- */
  const loader = document.getElementById('loader');
  const heroIn = () => {
    if (!hasGsap || reduced) { showAll(); return; }
    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .to('#hero h1 .lw span', { y: 0, duration: 1.2, stagger: .14, delay: .1 })
      .to('#hero .lb.rv', { opacity: 1, y: 0, duration: .8 }, '-=.8')
      .to('#hero p.rv, #hero .acts.rv', { opacity: 1, y: 0, duration: .9, stagger: .12 }, '-=.6')
      .from('#hero .bg', { scale: 1.08, duration: 2.2, ease: 'power2.out' }, 0);
  };
  if (hasGsap && !reduced) {
    gsap.timeline()
      .to('#loader .wm', { y: 0, duration: .9, ease: 'power4.out', delay: .1 })
      .to('#loader .sub', { opacity: 1, duration: .6 }, '-=.3')
      .to(loader, { yPercent: -100, duration: 1, ease: 'power4.inOut', delay: .5, onComplete: () => loader.remove() })
      .add(heroIn, '-=.55');
  } else { loader.remove(); heroIn(); }

  if (!hasGsap) { showAll(); }

  /* ---------- header ---------- */
  const hd = document.getElementById('hd');
  addEventListener('scroll', () => hd.classList.toggle('solid', scrollY > 80 && !document.body.classList.contains('menu-open')), { passive: true });

  /* ---------- overlay menu ---------- */
  const menu = document.getElementById('menu');
  const burger = document.getElementById('burger');
  const mlabel = document.getElementById('mlabel');
  let menuOpen = false;
  const setMenu = (open) => {
    menuOpen = open;
    document.body.classList.toggle('menu-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    mlabel.textContent = open ? 'Close' : 'Menu';
    if (open) hd.classList.remove('solid');
    if (hasGsap && !reduced) {
      if (open) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.timeline()
          .to(menu, { clipPath: 'inset(0 0 0% 0)', duration: .8, ease: 'power4.inOut' })
          .fromTo('#menu .big a', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .07, ease: 'power3.out' }, '-=.3')
          .fromTo('#menu .side', { opacity: 0 }, { opacity: 1, duration: .6 }, '-=.5');
      } else {
        gsap.to(menu, { clipPath: 'inset(0 0 100% 0)', duration: .7, ease: 'power4.inOut', onComplete: () => gsap.set(menu, { visibility: 'hidden' }) });
      }
    } else {
      menu.style.visibility = open ? 'visible' : 'hidden';
      menu.style.clipPath = open ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)';
    }
  };
  burger.addEventListener('click', () => setMenu(!menuOpen));
  menu.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', () => setMenu(false)));

  /* ---------- smooth anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      const y = t.getBoundingClientRect().top + scrollY;
      if (hasGsap && !reduced) gsap.to({ v: scrollY }, { v: y, duration: 1.2, ease: 'power3.inOut', onUpdate: function(){ scrollTo(0, this.targets()[0].v); } });
      else scrollTo(0, y);
    });
  });

  /* ---------- pathway image swap ---------- */
  const ims = document.querySelectorAll('#path .vis .im');
  const cap = document.getElementById('pathcap');
  const caps = ['Coverage built around the people who depend on you.', 'Understand the protection you already have.', 'Retirement and legacy planning, with confidence.', 'A career built on real guidance.', 'Empowering youth. Building tomorrow.'];
  document.querySelectorAll('#path a.opt').forEach(opt => {
    opt.addEventListener('mouseenter', () => {
      const i = +opt.dataset.im;
      ims.forEach((im, k) => im.classList.toggle('on', k === i));
      document.querySelectorAll('#path a.opt').forEach(o => o.classList.remove('on'));
      opt.classList.add('on');
      cap.textContent = caps[i];
    });
  });

  if (hasGsap && !reduced) {
    /* ---------- reveals ---------- */
    document.querySelectorAll('.rv').forEach(el => {
      if (el.closest('#hero')) return;
      gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 87%' } });
    });

    /* ---------- manifesto scrub ---------- */
    const man = document.querySelector('#man .man');
    if (man) {
      const walk = (node) => {
        [...node.childNodes].forEach(ch => {
          if (ch.nodeType === 3) {
            const frag = document.createDocumentFragment();
            ch.textContent.split(/(\s+)/).forEach(tok => {
              if (/^\s*$/.test(tok)) { frag.appendChild(document.createTextNode(tok)); return; }
              const w = document.createElement('span'); w.className = 'w'; w.textContent = tok; frag.appendChild(w);
            });
            node.replaceChild(frag, ch);
          } else if (ch.nodeType === 1) walk(ch);
        });
      };
      walk(man);
      gsap.to(man.querySelectorAll('.w'), { opacity: 1, stagger: .06, ease: 'none',
        scrollTrigger: { trigger: man, start: 'top 75%', end: 'bottom 40%', scrub: true } });
    }

    /* ---------- parallax on photo plates ---------- */
    document.querySelectorAll('.ph .prlx').forEach(p => {
      gsap.fromTo(p, { yPercent: -6 }, { yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: p.closest('.ph'), start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    /* ---------- needs: horizontal drag of the rail ---------- */
    const track = document.getElementById('ntrack');
    const rail = track.parentElement;
    if (innerWidth > 1080) {
      const dist = () => track.scrollWidth - rail.clientWidth + parseFloat(getComputedStyle(track).paddingLeft);
      gsap.to(track, { x: () => -Math.max(0, dist()), ease: 'none',
        scrollTrigger: { trigger: '#needs', start: 'top top', end: () => '+=' + Math.max(600, dist()), scrub: 1, pin: true, invalidateOnRefresh: true } });
    }

    /* ---------- closing heading ---------- */
    gsap.from('#close h2', { scale: .95, ease: 'none', scrollTrigger: { trigger: '#close', start: 'top bottom', end: 'center 60%', scrub: true } });
  } else {
    document.querySelectorAll('.rv').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('#faq .item').forEach(item => {
    const btn = item.querySelector('.q'), body = item.querySelector('.a');
    btn.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      if (hasGsap && !reduced) gsap.to(body, { height: open ? 'auto' : 0, duration: .55, ease: 'power3.inOut' });
      else body.style.height = open ? 'auto' : '0';
    });
  });

  /* ---------- youth signup ---------- */
  const toast = document.getElementById('toast');
  document.getElementById('loopform').addEventListener('submit', e => {
    e.preventDefault();
    toast.textContent = 'You\u2019re in the loop. See you at the next event.';
    if (hasGsap) {
      gsap.timeline().to(toast, { opacity: 1, y: 0, duration: .5, ease: 'power3.out' }).to(toast, { opacity: 0, y: 16, duration: .5, delay: 3 });
    } else { toast.style.opacity = 1; setTimeout(() => toast.style.opacity = 0, 3000); }
    e.target.reset();
  });

  /* ---------- cursor + magnetic pills ---------- */
  const cur = document.getElementById('cur');
  if (fine && hasGsap) {
    addEventListener('mousemove', e => gsap.to(cur, { x: e.clientX, y: e.clientY, duration: .3, ease: 'power3.out' }));
    document.querySelectorAll('a, button, .story .ph').forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(cur, { scale: 3.2, duration: .3 }));
      el.addEventListener('mouseleave', () => gsap.to(cur, { scale: 1, duration: .3 }));
    });
    if (!reduced) document.querySelectorAll('.pill').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * .22, y: (e.clientY - r.top - r.height / 2) * .3, duration: .4, ease: 'power3.out' });
      });
      el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.55)' }));
    });
  } else if (cur) cur.remove();
})();
