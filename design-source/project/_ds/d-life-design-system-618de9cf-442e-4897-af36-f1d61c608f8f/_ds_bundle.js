/* @ds-bundle: {"format":4,"namespace":"DLifeDesignSystem_618de9","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"ICON_PATHS","sourcePath":"components/core/Icon.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"ICON_NAMES","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"QuoteBlock","sourcePath":"components/editorial/QuoteBlock.jsx"},{"name":"Section","sourcePath":"components/editorial/Section.jsx"},{"name":"SectionHeading","sourcePath":"components/editorial/SectionHeading.jsx"},{"name":"WhatsAppFloat","sourcePath":"components/editorial/WhatsAppFloat.jsx"},{"name":"Wordmark","sourcePath":"components/editorial/Wordmark.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"AccordionItem","sourcePath":"components/navigation/Accordion.jsx"},{"name":"Accordion","sourcePath":"components/navigation/Accordion.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"assets/image-slot.js":"fff26d081c8d","components/core/Badge.jsx":"9866b3d23519","components/core/Button.jsx":"f5174c306b3a","components/core/Card.jsx":"34ca40cff579","components/core/Icon.jsx":"7516cef7de36","components/core/IconButton.jsx":"af3d38293e0c","components/core/Tag.jsx":"794553678a11","components/editorial/QuoteBlock.jsx":"0c6a7a3e6c12","components/editorial/Section.jsx":"4f15a9ad9fe0","components/editorial/SectionHeading.jsx":"c4c56dd1dd20","components/editorial/WhatsAppFloat.jsx":"5c029eceaec7","components/editorial/Wordmark.jsx":"d7394e3ef883","components/feedback/Dialog.jsx":"35e49524ee92","components/feedback/Toast.jsx":"0d51350715b9","components/feedback/Tooltip.jsx":"cc37bd6c8963","components/forms/Checkbox.jsx":"5877c15b641b","components/forms/Field.jsx":"3f6570067b65","components/forms/Input.jsx":"3b14cdd219eb","components/forms/Radio.jsx":"e2e0208d1fb9","components/forms/Select.jsx":"4e7cfe3d5e5e","components/forms/Switch.jsx":"db4ab35c8a3b","components/forms/Textarea.jsx":"1d9be07feea1","components/navigation/Accordion.jsx":"797d465ece72","components/navigation/Tabs.jsx":"b2587e68ff34","ui_kits/website-v2/site.js":"c08e3bf58cd6","ui_kits/website-v3/site.js":"0d752bff5af9","ui_kits/website/Careers.jsx":"b64301e40396","ui_kits/website/Contact.jsx":"d4c04c87afa1","ui_kits/website/Footer.jsx":"67781e728cac","ui_kits/website/Home.jsx":"87adf9c51273","ui_kits/website/Nav.jsx":"98410f20e772","ui_kits/website/Youth.jsx":"f11f55c100bf"},"inlinedExternals":[],"unexposedExports":[{"name":"controlStyle","sourcePath":"components/forms/Input.jsx"}]} */

(() => {

const __ds_ns = (window.DLifeDesignSystem_618de9 = window.DLifeDesignSystem_618de9 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever a design needs an image.
 * You control the slot's shape; it sizes to its container by default. When the search_stock_photos tool
 * is available, prefill the slot by default — write the photo's URL into
 * src (with credit/credit-href); the user can still fill or replace it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The sidecar is a SIBLING of the HTML file that uses this component: the
 * read is a document-relative fetch, and the host resolves the bridge's
 * sidecar writes into the previewed file's directory to match (same
 * contract as design_canvas.jsx). Pages in the same directory share one
 * sidecar; keep slot ids distinct across them.
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          Initial framing baseline: cover | contain.   (default 'cover')
 *                cover starts the image filling the frame (overflow cropped);
 *                contain starts it fully visible (letterboxed). Either way the
 *                user can always pan/scale from there — double-click, or the
 *                Edit control, enters reframe mode (drag to move, scroll or
 *                corner-handles to scale; Escape / click-out commits). The
 *                crop persists alongside the image in the sidecar.
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. Prefill it with a real
 *                photo via search_stock_photos when that tool is available
 *                (set credit/credit-href from the result). A user drop
 *                overrides it; clearing the drop reveals src again.
 *   credit       Attribution text shown as a small overlay at the
 *                bottom-left of the filled slot. REQUIRED whenever src
 *                points at any Unsplash host (images.unsplash.com,
 *                plus.unsplash.com, …): an Unsplash src with no credit
 *                renders an error tile INSTEAD of the photo (Unsplash
 *                terms forbid showing their photos unattributed). Use the
 *                exact form 'Photo by {photographer name} on Unsplash' —
 *                the overlay then links the name to credit-href and
 *                'Unsplash' to the Unsplash homepage, and links back to
 *                unsplash.com automatically get the required utm referral
 *                params appended at render time. The credit belongs to
 *                the src image, so it only shows while src is what's
 *                displayed — a user-dropped image hides it.
 *   credit-href  Link for the photographer's name in the credit overlay
 *                (their Unsplash profile URL from the stock-photo search
 *                results). http(s) URLs only — anything else renders the
 *                name as plain text.
 *
 * Sizing: the slot fills its container by default (width/height 100%).
 * Put it in a sized wrapper — absolutely positioned, a grid cell, a fixed
 * frame — and it takes exactly that box. When the parent's height is
 * indefinite (ordinary flow), it falls back to full width at a 3:2 aspect
 * ratio instead of collapsing. In a shrink-to-fit parent (a float,
 * width:max-content, an unsized absolute wrapper), percentages have
 * nothing to resolve against — size the slot or its wrapper explicitly
 * there. For a fixed-size slot, set
 * width/height on the element itself (inline style), which overrides the
 * default. When
 * layering content above a slot (full-bleed layouts), make the overlay
 * click-through — pointer-events: none on scrims/text plates, re-enabled
 * on interactive children — so the slot's hover controls stay reachable.
 * Keep the slot's bottom-left corner visually clear as well: the credit
 * overlay renders there, and a dark fade or text plate covering it hides
 * the attribution Unsplash's terms require — end the fade above that
 * corner, or keep it nearly transparent where the credit sits.
 *
 * Usage:
 *   <div style="position:relative;width:100%;height:100%">      <!-- full-bleed: -->
 *     <image-slot id="bg" shape="rect"></image-slot>            <!-- fills the wrapper -->
 *   </div>
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';

  // Unsplash terms require visible attribution wherever their photos
  // display, and every link back to unsplash.com must carry utm referral
  // params. Two render-time rules enforce that here:
  //  - an Unsplash-src slot with NO credit attribute renders an error
  //    tile INSTEAD of the photo (an uncredited Unsplash photo on screen
  //    is itself the terms violation, so it never renders bare);
  //  - rendered credit links pointing at unsplash.com get the referral
  //    params appended when absent (credit-href values live in page
  //    content that can't be edited after the fact).
  // Keep the utm_source value in sync with UTM_SOURCE in
  // platform/web-agent/unsplash.ts — this file is a project-local
  // artifact and cannot import it (equality is pinned by tests).
  const UNSPLASH_HOMEPAGE_HREF = 'https://unsplash.com/?utm_source=claude_design&utm_medium=referral';
  // Host rule mirrors the hotlink validator that admits Unsplash srcs into
  // pages in the first place (cdn$ in unsplash.ts: apex or any subdomain)
  // — Unsplash+ results serve from plus.unsplash.com, not just images.*,
  // and an admitted-but-uncredited photo must error whatever unsplash
  // host it rides on.
  // Trailing-dot FQDNs (images.unsplash.com.) are the same host to the
  // browser but would miss the regex — strip one dot so the check fails
  // CLOSED (unrecognized-but-real Unsplash srcs must error, not render).
  const isUnsplashHost = u => {
    try {
      return /(^|\.)unsplash\.com$/.test(new URL(u, document.baseURI).hostname.replace(/\.$/, ''));
    } catch {
      return false;
    }
  };
  // Render-time referral normalization for links back to Unsplash:
  // appends utm_source/utm_medium when absent, preserves every existing
  // query param, never overwrites an existing utm_source, and passes
  // non-Unsplash URLs through untouched. Input is an ABSOLUTE validated
  // http(s) URL (the credit render funnel resolves + validates first).
  const withReferral = href => {
    try {
      const u = new URL(href);
      if (!/(^|\.)unsplash\.com$/.test(u.hostname.replace(/\.$/, ''))) {
        return href;
      }
      if (!u.searchParams.has('utm_source')) {
        u.searchParams.set('utm_source', 'claude_design');
      }
      if (!u.searchParams.has('utm_medium')) {
        u.searchParams.set('utm_medium', 'referral');
      }
      return u.toString();
    } catch (e) {
      return href;
    }
  };
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  // Unload-time flush: save()'s serialization defers a mid-RTT re-fire to a
  // .then that never runs in an unloading document, silently dropping a
  // pagehide commit. Post the current slots immediately instead — content
  // is a superset snapshot of any in-flight save's, the write is a
  // whole-file last-writer-wins replace, and postMessage FIFO delivers it
  // to the host after the in-flight one, so a backend-side reorder at
  // worst reproduces the dropped-commit outcome this flush improves on.
  // Guarded on the initial sidecar read: pre-hydration slots can miss
  // other slots' persisted entries, and flushing it would clobber them —
  // that narrow case stays best-effort (the in-memory merge in load()
  // cannot happen in an unloading document anyway).
  function flushNow() {
    if (!loaded) return;
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    try {
      Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {});
    } catch (e) {}
  }
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet =
  // Fill the container by default: slots are usually placed inside a
  // sized wrapper (a hero frame, a grid cell, an inset:0 layer) and are
  // expected to take that box — a fixed intrinsic size would render as
  // a small tile in the corner of a full-bleed wrapper instead.
  // aspect-ratio is the companion fallback that keeps a bare slot
  // visible when the parent's height is indefinite: height:100%
  // resolves to auto there, and the ratio then derives height from
  // width instead of letting the slot collapse to zero height.
  // Explicit width/height on the element override all of this.
  // color:inherit (not a fixed near-black): the placeholder chrome —
  // empty-state icon/caption (currentColor) and the dashed ring — must
  // read on dark decks too, and the slide's own text color is the one
  // color guaranteed to contrast with the slide background. The soft
  // look comes from opacity on those parts, not from a baked-in alpha.
  ':host{display:block;position:relative;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;' + '  width:100%;height:100%;aspect-ratio:3/2}' + '.empty .cap,.empty .sub{opacity:.75}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(127,127,127,.08)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  // popover=manual promotes the spill to the top layer on reframe, so it is
  // not clipped by any overflow:hidden / clip-path / scroll-container
  // ancestor (a plain z-index can't escape overflow clipping). UA popover
  // defaults (inset:0;margin:auto) are reset; _applyView sets viewport px.
  '.spill{position:fixed;margin:0;inset:auto;border:0;padding:0;background:transparent;' + '  overflow:visible;transform:translate(-50%,-50%);z-index:1;cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px}' + '.empty:hover .sub{opacity:1}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed currentColor;' + '  opacity:.35;transition:border-color .12s,opacity .12s}' + ':host([data-over]) .ring{border-color:#c96442;opacity:1}' + ':host([data-filled]) .ring{display:none}' +
  // Controls overlay INSIDE the frame, pinned to the top-right corner, so
  // a full-bleed slot in an overflow:hidden container still shows them
  // (the old below-mask placement got clipped). Credit sits bottom-left,
  // so top-right avoids collision. The blurred pill background keeps them
  // legible over the image.
  // The UA [popover] base rule styles the element in EVERY state (only
  // display:none is gated on :not(:popover-open), and the display:flex
  // below overrides that) — so the UA resets live HERE, like .spill's,
  // or the ordinary hover-state strip renders as a bordered Canvas box
  // centered by margin:auto. inset:auto precedes top/right (shorthand).
  '.ctl{position:absolute;inset:auto;top:8px;right:8px;margin:0;border:0;padding:0;' + '  background:transparent;overflow:visible;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' +
  // While reframing, the spill owns the top layer and would swallow every
  // click on the in-frame controls. Promoting .ctl into the top layer
  // ABOVE the spill (shown after it — later popovers stack higher) keeps
  // Edit-as-toggle and Replace clickable mid-reframe. _applyView pins it
  // to the frame's top-right in viewport px (translateX(-100%)
  // right-aligns against the computed left edge); inset:auto clears the
  // base rule's top/right so the inline left/top position it alone.
  '.ctl:popover-open{position:fixed;inset:auto;transform:translateX(-100%)}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}' +
  // Replacement in flight: after a src swap the browser keeps painting
  // the PREVIOUS image until the new one decodes, so a Replace would
  // flash the old photo and then pop. Hide the stale frame (visibility,
  // not display — _applyView geometry still applies) and spin until the
  // new image reports in (load/error clears data-swapping).
  ':host([data-swapping]) .frame img{visibility:hidden}' + '.loading{position:absolute;inset:0;display:none;align-items:center;' + '  justify-content:center;pointer-events:none}' + ':host([data-swapping]) .loading{display:flex}' + '.loading::after{content:"";width:22px;height:22px;border-radius:50%;' + '  border:2px solid rgba(127,127,127,.25);border-top-color:currentColor;' + '  animation:om-slot-spin .7s linear infinite}' + '@keyframes om-slot-spin{to{transform:rotate(360deg)}}' +
  // Reduced motion: the static two-tone ring still reads as "working".
  '@media (prefers-reduced-motion:reduce){.loading::after{animation:none}}' + '.credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);display:none;' + '  padding:3px 7px;border-radius:5px;background:rgba(0,0,0,.55);color:#fff;' + '  font:10px/1.2 system-ui,-apple-system,sans-serif;text-decoration:none;' + '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;backdrop-filter:blur(6px)}' +
  // The credit is a SPAN holding one or two <a>s (Unsplash's prescribed
  // form links the photographer AND Unsplash) — anchors style inline so
  // the overlay reads as one line of text.
  '.credit a{color:inherit;text-decoration:none}' + '.credit a:hover,.credit a:focus-visible{text-decoration:underline}' + ':host([data-filled][data-credit]) .credit{display:block}' +
  // Exports must ship JUST the image — no hover controls, no credit chip
  // (the host marks <html data-om-exporting> for the capture window; the
  // page-level hide script can't reach shadow DOM, this rule can).
  ':host-context([data-om-exporting]) .ctl,' + ':host-context([data-om-exporting]) .credit{display:none !important}' +
  // Print must ship just the image too: the hover-gated controls can be
  // mid-hover when print() fires, and the credit chip is screen chrome —
  // the same rule the capture window gets, keyed on print media instead
  // of the host's data-om-exporting mark (the print path sets no mark).
  '@media print{.ctl,.credit{display:none !important}}' +
  // No export-window mask rules here on purpose: the export capture
  // releases the replacement mask by REMOVING data-swapping (the
  // shadow-root pass in pages/export/shared.ts HIDE_EXPORT_CHROME_SCRIPT)
  // — attribute removal works in every engine (:host-context is
  // Chromium-only), is scoped by construction to slots actually
  // mid-swap, and hides the spinner through the same gate. A masked img
  // would otherwise be silently dropped from PPTX decks (the capture
  // walk skips visibility:hidden imgs).
  // Attribution error tile: REPLACES the photo when an Unsplash src has
  // no credit attribute — rendering the photo uncredited is the terms
  // violation, so the photo must not appear at all.
  // Calm and neutral on purpose (review feedback): the tile informs the
  // user; the fix instructions are machine-facing (usage docblock, tool
  // description, and the turn-end scan's bounce copy name the attributes
  // for the agent).
  '.attr-error{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  background:#f2f1ef;color:#6e6c66;user-select:none;' + '  font:13px/1.45 system-ui,-apple-system,sans-serif}' + '.attr-error svg{opacity:.55}' + '.attr-error .cap{max-width:92%;font-weight:500;letter-spacing:.01em}' + ':host([data-attribution-error]) .attr-error{display:flex}' + ':host([data-attribution-error]) .ring{display:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  const warnIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>' + '<path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'placeholder', 'src', 'id', 'credit', 'credit-href'];
    }

    /** Duplicate-slide hook (called by deck-stage, see its
     *  _remintDuplicateIds): copy this id's stored image, if any, under a
     *  freshly minted key and return that key — so a duplicated slide's
     *  slot keeps its dropped photo instead of reverting to the
     *  placeholder. 'isFree' is the caller's uniqueness check (document
     *  ids); candidates must ALSO be unused in the sidecar, which can
     *  hold keys from other pages sharing the project root. (An EMPTY
     *  slot on another page leaves no sidecar entry, so its id is not
     *  detectable here — a minted key can collide with it and that slot
     *  would show this photo. Same blast radius as two pages reusing an
     *  id by hand, which the shared sidecar already permits.) Returns null
     *  when no id could be minted (caller strips the id, today's
     *  behavior). */
    static cloneSlot(fromId, isFree) {
      if (typeof fromId !== 'string' || !fromId) return null;
      // Pre-hydration the store can't veto candidates or source the copy
      // — degrade to the strip (today's behavior) rather than mint
      // against keys we can't see yet. Any rendered (= droppable) slot
      // means load() has already settled.
      if (!loaded) return null;
      const stem = fromId.replace(/-\d+$/, '') || fromId;
      for (let n = 2; n < 100; n++) {
        const toId = stem + '-' + n;
        if (toId === fromId) continue;
        if (slots[toId] !== undefined) {
          // Reuse a key holding this exact value (bytes AND crop) if no
          // live element here owns it — a duplicate op the host refused
          // after minting leaves such a key behind, and reusing keeps
          // refused retries from accumulating one orphaned copy per
          // attempt. Full equality (not just bytes) so a byte-identical
          // key another PAGE owns with its own crop is stepped past, not
          // adopted or rewritten. (Entries without .u never match.)
          const prev = getSlot(toId);
          const cur = getSlot(fromId);
          if (!(prev && cur && prev.u && prev.u === cur.u && prev.s === cur.s && prev.x === cur.x && prev.y === cur.y && (typeof isFree !== 'function' || isFree(toId)))) continue;
          return toId;
        }
        if (typeof isFree === 'function' && !isFree(toId)) continue;
        const v = getSlot(fromId);
        if (v) setSlot(toId, Object.assign({}, v));
        return toId;
      }
      return null;
    }
    constructor() {
      super();
      // clonable: rail thumbnails deep-clone slides and carry this shadow
      // along; reuse an already-cloned root so upgrade-after-clone works.
      // (Deliberately NOT serializable — a getHTML consumer would embed
      // multi-MB sidecar data-URLs into serialized page HTML.)
      const root = this.shadowRoot || this.attachShadow({
        mode: 'open',
        clonable: true
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="attr-error" part="attribution-error">' + warnIcon + '    <div class="cap">This photo needs attribution</div></div>' + '  <div class="loading" part="loading"></div>' + '  <div class="ring" part="ring"></div>' + '</div>' +
      // Outside .frame, like .spill/.ctl — the frame's overflow:hidden +
      // border-radius/clip-path would cut the credit off on circle/pill/mask.
      // A SPAN, not an <a>: the prescribed Unsplash credit holds two links
      // (photographer + Unsplash), built per-render in _render().
      '<span class="credit" part="credit"></span>' + '<div class="spill" popover="manual" data-dc-edit-transparent>' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' +
      // data-dc-edit-transparent: the DC editor's edit-mode picker lets
      // clicks through for chrome marked with it (EDIT_TRANSPARENT_SEL)
      // — without it, Replace/Edit clicks in Edit mode are swallowed by
      // element selection and the controls look dead.
      '<div class="ctl" popover="manual" data-dc-edit-transparent><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="edit" title="Reframe image">Edit</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ctl = root.querySelector('.ctl');
      this._credit = root.querySelector('.credit');
      this._attrError = root.querySelector('.attr-error');
      // Credit clicks open the link, not browse/reframe.
      this._credit.addEventListener('click', e => e.stopPropagation());
      this._credit.addEventListener('dblclick', e => e.stopPropagation());
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      // Encode-in-flight marker (the owning _ingest generation): while set,
      // the same-src "nothing in flight" clear in _render must not fire —
      // the stored value still points at the OLD image until the encode
      // lands, so that clear would unmask the stale image mid-replace.
      this._swapGen = 0;
      // Render-owned swap in flight: set when _render assigns a new src,
      // cleared only by the img's own load/error (or the empty branch).
      // img.complete CANNOT stand in for this — setting src only QUEUES
      // the current-request swap (a microtask), so synchronously after an
      // assignment, complete still reports the OLD settled request. The
      // pick path does exactly that: the host sets src, credit, and
      // credit-href back-to-back in one task, and renders #2/#3 would
      // read the stale complete === true and drop the mask one render
      // after it was set.
      this._loadPending = false;
      // See _render's empty branch: a transient attribution-error wipe of a
      // showing image must make the follow-up render a replacement (spinner),
      // not a first fill (blank frame).
      this._hidShowing = false;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        // The hidden controls are opacity-0 but still tabbable — without
        // this gate a keyboard user could drive them on a read-only share
        // link (mirrors the dblclick handler's editable gate).
        if (!this.hasAttribute('data-editable')) return;
        if (act === 'replace') {
          this._exitReframe(true);
          // Host-owned picker (Unsplash modal; it also offers local import).
          this.dispatchEvent(new CustomEvent('image-slot:pick', {
            bubbles: true,
            composed: true,
            detail: {
              id: this.id || null
            }
          }));
        }
        if (act === 'edit') {
          if (!this._reframes()) return;
          if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      // load/error also release the replacement-in-flight mask (via the
      // single discipline in _releaseMask): the swap is only revealed once
      // the new image can actually paint (on error the frame shows its
      // background, same as a fresh slot with a broken src).
      this._img.addEventListener('load', () => {
        this._loadPending = false;
        this._releaseMask(true);
        this._applyView();
      });
      this._img.addEventListener('error', () => {
        this._loadPending = false;
        this._releaseMask(true);
      });
      // Gated only on editable — any filled slot can be repositioned/scaled,
      // regardless of fit. Share links (no writeFile) stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
          const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // The host may inject window.omelette.writeFile AFTER the first render;
      // re-render on hover so the editable-gated controls reliably appear.
      this.addEventListener('pointerenter', this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('pointerenter', this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      // commit=false: a disconnect is not a user intent — committing here
      // would persist whatever half-finished drag a React remount or DOM
      // splice happened to interrupt. Deliberate exits commit on their own
      // paths (Escape/click-out/toggle), and unloads commit via pagehide.
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._signalReframe(true);
      // Best-effort commit when the document unloads mid-reframe (a host
      // navigation racing the enter signal, a manual reload, tab close):
      // the sidecar write rides the host bridge, which outlives this
      // document, so the crop survives even though the mode dies with the
      // DOM. Held on the instance so _exitReframe detaches exactly what
      // was attached.
      this._pagehide = () => {
        this._exitReframe(true);
        flushNow();
      };
      window.addEventListener('pagehide', this._pagehide);
      // Promote spill to the top layer, then keep it pinned over the frame:
      // scroll/resize cover the common cases, and a per-frame rect check
      // catches layout shifts that fire neither (an image above finishing
      // load, streamed DOM pushing the slot down, an ancestor transform
      // change) so the overlay can't detach from the frame.
      try {
        this._spill.showPopover();
      } catch {}
      // After the spill, so the controls stack above it in the top layer.
      try {
        this._ctl.showPopover();
      } catch {}
      this._reposition = () => {
        if (this.hasAttribute('data-reframe')) this._applyView();
      };
      window.addEventListener('scroll', this._reposition, true);
      window.addEventListener('resize', this._reposition);
      this._lastRect = '';
      this._watch = () => {
        if (!this.hasAttribute('data-reframe')) return;
        const r = this.getBoundingClientRect();
        const key = r.left + ',' + r.top + ',' + r.width + ',' + r.height;
        if (key !== this._lastRect) {
          this._lastRect = key;
          this._applyView();
        }
        this._watchId = requestAnimationFrame(this._watch);
      };
      this._watchId = requestAnimationFrame(this._watch);
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (this._reposition) {
        window.removeEventListener('scroll', this._reposition, true);
        window.removeEventListener('resize', this._reposition);
        this._reposition = null;
      }
      if (this._watchId) {
        cancelAnimationFrame(this._watchId);
        this._watchId = 0;
      }
      if (this._pagehide) {
        window.removeEventListener('pagehide', this._pagehide);
        this._pagehide = null;
      }
      try {
        this._spill.hidePopover();
      } catch {}
      try {
        this._ctl.hidePopover();
      } catch {}
      this._ctl.style.left = '';
      this._ctl.style.top = '';
      if (commit) this._commitView();
      this._signalReframe(false);
    }

    // Reframe state lives only in this DOM until commit, invisible to the
    // host's dirty signals — announce enter/exit so the host can hold
    // auto-reloads for exactly the gesture (the guest bundle forwards
    // image-slot:reframe to the host as imageSlotReframe). Dispatched on
    // the element (composed, so it escapes shadow roots) while connected;
    // a disconnected exit (disconnectedCallback) falls back to document so
    // the host still hears it.
    _signalReframe(active) {
      const target = this.isConnected ? this : document;
      target.dispatchEvent(new CustomEvent('image-slot:reframe', {
        bubbles: true,
        composed: true,
        detail: {
          active: active,
          id: this.id || null
        }
      }));
    }

    // Public: host's "Import from computer" calls this to run local browse.
    openFilePicker() {
      this._exitReframe(true);
      this._input.click();
    }

    // A src write is a newer intent for this slot's content — the host
    // pick path (setImageSlotImage) or an agent edit — so it must win
    // over any encode still in flight from an earlier drop: left live,
    // that encode lands later, passes _ingest's gen guard, and its
    // setSlot silently overwrites the pick (the stored value shadows
    // src in _render). Bumping _gen kills the encode before its own
    // _swapGen clear runs, so clear the dead claim here too — otherwise
    // _releaseMask (gated on !_swapGen) never fires and the pick's
    // spinner is stranded. src ONLY: the pick sets credit/credit-href
    // in the same task, and clearing _swapGen on those would let the
    // same-src branch unmask the old image mid-encode.
    attributeChangedCallback(name, oldVal, newVal) {
      if (name === 'src' && oldVal !== newVal) {
        this._gen++;
        this._swapGen = 0;
      }
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      // Replacing a shown image: surface the swap through the encode too,
      // not just the decode — otherwise the old photo sits there with no
      // feedback while the canvas re-encode runs. An empty slot keeps its
      // placeholder (no spinner) until the encode lands, as before.
      // _swapGen guards the mask against re-renders DURING the encode
      // (pointerenter, ResizeObserver, another slot's store write): the
      // stored value still resolves to the old image there, so _render's
      // same-src clear would otherwise unmask it mid-replace.
      if (this.hasAttribute('data-filled')) {
        this.setAttribute('data-swapping', '');
        this._swapGen = gen;
      }
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        // Clear BEFORE setSlot: its synchronous re-render must see no
        // pending encode, so a byte-identical re-upload (same data URL, no
        // load event coming) still clears the mask via the complete branch.
        this._swapGen = 0;
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._swapGen = 0;
        // Reveal the kept old image — unless another replacement (a
        // remote pick's src swap) is still in flight, in which case the
        // mask stays until THAT image settles (its load/error releases).
        this._releaseMask();
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is available on any filled slot — the user can
    // always reposition/scale. `fit` only sets the initial baseline (see
    // _geom): contain starts fully-visible, cover starts frame-filling.
    _reframes() {
      return this.hasAttribute('data-filled');
    }

    // The single release discipline for the replacement-in-flight mask
    // (data-swapping). The mask comes off only when BOTH hold:
    //  - no encode is pending (_swapGen) — mid-encode the stored value
    //    still resolves to the old image, so any reveal paints it;
    //  - the frame img has settled on its current src — an unsettled src
    //    means some replacement is still in flight (e.g. a remote pick),
    //    whoever started it, and revealing would paint the previous
    //    frame. The load/error listeners pass settled=true (the event IS
    //    the settlement signal, per spec complete is true by then);
    //    other callers rely on the complete flag (covers loaded AND
    //    failed).
    // Every release path funnels through here EXCEPT _render's empty
    // branch (the img is being cleared — nothing will ever settle).
    _releaseMask(settled) {
      if (!this._swapGen && !this._loadPending && (settled || this._img.complete)) {
        this.removeAttribute('data-swapping');
      }
    }

    // Baseline geometry, shared by clamp/apply/resize. `base` is the scale at
    // view-scale s=1: cover = fill the frame (overflow on the looser axis),
    // contain = fit fully inside (letterboxed). Zooming a contain image past
    // s where it overflows naturally becomes a crop. Null until the img has
    // loaded (naturalWidth is 0 before that) or when the slot has no layout
    // box — ResizeObserver fires with a 0×0 rect under display:none, and
    // clamping against a degenerate 1×1 frame would silently pull the stored
    // pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
      const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
      return {
        iw,
        ih,
        fw,
        fh,
        base
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      // Top-layer controls: pin to the frame's top-right in viewport px
      // (the same 8px inset as the in-frame layout; unscaled — top-layer UI
      // reads as chrome, not page content). BEFORE the geometry branch:
      // placement needs only the frame rect, and a not-yet-loaded or broken
      // src must not leave the promoted strip floating unpositioned. Gated
      // on the popover actually being open: without the Popover API,
      // showPopover() threw (swallowed in _enterReframe), .ctl stays in
      // its in-frame absolute layout, and viewport-px coordinates would
      // shove it off-frame — and matches(':popover-open') itself throws
      // there (unknown pseudo-class), hence the try/catch.
      if (this.hasAttribute('data-reframe')) {
        let onTop = false;
        try {
          onTop = this._ctl.matches(':popover-open');
        } catch {}
        if (onTop) {
          const r = this.getBoundingClientRect();
          this._ctl.style.left = r.right - 8 + 'px';
          this._ctl.style.top = r.top + 8 + 'px';
        }
      }
      if (!g) {
        // Dimensions not known yet (before img load) — centered fit so there
        // is no flash of an unpositioned image before the geometry lands.
        const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = contain ? 'contain' : 'cover';
        return;
      }
      // Baseline (cover-fill or contain-fit) × view scale. Width/height and
      // left/top are all frame-% — depends only on the frame aspect ratio, so
      // a responsive resize keeps the same crop. The spill layer mirrors the
      // same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      if (this.hasAttribute('data-reframe')) {
        // Top-layer spill: position in viewport px over the frame. The top
        // layer escapes ancestor transforms entirely, so EVERY term must be
        // in viewport units: getBoundingClientRect gives the frame's scaled
        // origin AND size, and the rect/layout ratio rescales the ghost —
        // sizing from layout px alone renders it 1/scale too large under a
        // scaled deck slide. Inner ghost + handles stay box-relative.
        const r = this.getBoundingClientRect();
        const sx = g.fw ? r.width / g.fw : 1;
        const sy = g.fh ? r.height / g.fh : 1;
        this._spill.style.width = g.iw * k * sx + 'px';
        this._spill.style.height = g.ih * k * sy + 'px';
        this._spill.style.left = r.left + (50 + this._view.x) / 100 * r.width + 'px';
        this._spill.style.top = r.top + (50 + this._view.y) / 100 * r.height + 'px';
      }
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      // An Unsplash src with no credit attribute must NOT render — showing
      // the photo uncredited is the Unsplash-terms violation itself. The
      // error tile replaces the photo until the credit is written. A
      // user-dropped image is the user's own content and always renders.
      // Trimmed: credit is agent/user-editable content, and a whitespace-
      // only value must count as missing — otherwise it would suppress the
      // error tile AND render an empty credit box (no text, no links),
      // exactly the unattributed state this gate exists to prevent.
      const credit = (this.getAttribute('credit') || '').trim();
      const attrError = !!(!credit && !this._userUrl && srcAttr && isUnsplashHost(srcAttr));
      this.toggleAttribute('data-attribution-error', attrError);
      if (url && !attrError) {
        const prev = this._img.getAttribute('src');
        if (prev !== url) {
          // Replacing an already-shown image: mark the swap BEFORE setting
          // src so the stale frame is never revealed (see the data-swapping
          // stylesheet rules). First fill (prev empty) keeps the existing
          // placeholder-until-load behavior — no spinner. _hidShowing
          // covers the pick path's transient attribution-error wipe: prev
          // is gone, but an image WAS showing, so this is a replacement.
          if (prev || this._hidShowing) this.setAttribute('data-swapping', '');
          // Mark the swap BEFORE assigning src: complete keeps reporting
          // the old settled request until the browser's
          // update-the-image-data microtask runs, so same-task re-renders
          // (the pick path's credit/credit-href setAttributes) need this
          // flag, not complete, to know a load is in flight.
          this._loadPending = true;
          this._img.src = url;
          this._ghost.src = url;
        } else {
          // Same-src re-render — release if settled, so an ingest-set
          // spinner can't stick after a byte-identical re-upload (same
          // data URL, no further load event ever fires).
          this._releaseMask();
        }
        this._hidShowing = false;
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this.removeAttribute('data-swapping');
        // The src is being removed — no load/error will ever fire for it.
        this._loadPending = false;
        // A transient attribution-error wipe of a showing image happens on
        // the pick path: the host sets src one setAttribute before credit,
        // so render N hides the old image (attrError) and render N+1
        // restores a URL. Remember the wipe so that restore renders as a
        // replacement (spinner), not a first fill (blank frame).
        this._hidShowing = attrError && !!this._img.getAttribute('src');
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        // The error tile owns the blocked-photo state; .empty stays for
        // the genuinely-empty slot.
        this._empty.style.display = attrError ? 'none' : 'flex';
        this.removeAttribute('data-filled');
      }

      // Credit belongs to the author src, so a user drop hides it.
      // textContent + the http(s)-only funnel keep external strings inert.
      const showCredit = !!(url && credit && !this._userUrl && !attrError);
      this._credit.textContent = '';
      if (showCredit) {
        // Validate once (resolved against the document, http(s) only),
        // then append the terms-required utm referral params to links
        // that point back at unsplash.com.
        let href = '';
        const rawHref = this.getAttribute('credit-href') || '';
        if (rawHref) {
          try {
            const u = new URL(rawHref, document.baseURI);
            if (u.protocol === 'http:' || u.protocol === 'https:') {
              href = withReferral(u.href);
            }
          } catch {}
        }
        const mkLink = (text, linkHref) => {
          const a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          a.setAttribute('href', linkHref);
          a.textContent = text;
          return a;
        };
        // Unsplash's prescribed credit is TWO links — the photographer's
        // name to their profile (credit-href) and 'Unsplash' to the
        // homepage. Render that split whenever the text has the canonical
        // shape; other text keeps the legacy single-link rendering.
        const m = /^Photo by (.+) on Unsplash$/.exec(credit);
        if (m) {
          this._credit.appendChild(document.createTextNode('Photo by '));
          this._credit.appendChild(href ? mkLink(m[1], href) : document.createTextNode(m[1]));
          this._credit.appendChild(document.createTextNode(' on '));
          this._credit.appendChild(mkLink('Unsplash', UNSPLASH_HOMEPAGE_HREF));
        } else if (href) {
          this._credit.appendChild(mkLink(credit, href));
        } else {
          this._credit.textContent = credit;
        }
      }
      this.toggleAttribute('data-credit', showCredit);
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/image-slot.js", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const TONES = {
  neutral: {
    background: "var(--surface-card)",
    color: "var(--text-body)",
    border: "var(--divider-warm)"
  },
  copper: {
    background: "rgba(179,107,67,.12)",
    color: "var(--copper-dark)",
    border: "rgba(179,107,67,.28)"
  },
  teal: {
    background: "var(--status-info-bg)",
    color: "var(--teal-primary)",
    border: "rgba(23,74,69,.20)"
  },
  success: {
    background: "var(--status-success-bg)",
    color: "var(--status-success)",
    border: "rgba(63,125,92,.24)"
  },
  warning: {
    background: "var(--status-warning-bg)",
    color: "var(--status-warning)",
    border: "rgba(176,122,36,.24)"
  },
  error: {
    background: "var(--status-error-bg)",
    color: "var(--status-error)",
    border: "rgba(158,59,46,.24)"
  },
  onDark: {
    background: "var(--ivory-12)",
    color: "var(--text-on-dark)",
    border: "var(--border-on-dark)"
  }
};
function Badge({
  children,
  tone = "neutral",
  subtle = false,
  style
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "4px 10px",
      borderRadius: "var(--radius-xs)",
      background: subtle ? "transparent" : t.background,
      color: t.color,
      border: "1px solid " + (subtle ? t.border : "transparent"),
      fontFamily: "var(--font-sans)",
      fontSize: "var(--size-label)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      lineHeight: 1.3,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
/* Lucide (ISC) — geometric outline set, 24x24, 2px stroke, round caps/joins.
   Source SVGs also live in /assets/icons for copy-out into static artifacts. */
const ICON_PATHS = {
  "arrow-left": '<path d="m12 19-7-7 7-7"></path> <path d="M19 12H5"></path>',
  "arrow-right": '<path d="M5 12h14"></path> <path d="m12 5 7 7-7 7"></path>',
  "arrow-up-right": '<path d="M7 7h10v10"></path> <path d="M7 17 17 7"></path>',
  "baby": '<path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"></path> <path d="M15 12h.01"></path> <path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"></path> <path d="M9 12h.01"></path>',
  "badge-check": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path> <path d="m9 12 2 2 4-4"></path>',
  "briefcase-business": '<path d="M12 12h.01"></path> <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path> <path d="M22 13a18.15 18.15 0 0 1-20 0"></path> <rect width="20" height="14" x="2" y="6" rx="2"></rect>',
  "building-2": '<path d="M10 12h4"></path> <path d="M10 8h4"></path> <path d="M14 21v-3a2 2 0 0 0-4 0v3"></path> <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"></path> <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"></path>',
  "calendar-days": '<path d="M8 2v4"></path> <path d="M16 2v4"></path> <rect width="18" height="18" x="3" y="4" rx="2"></rect> <path d="M3 10h18"></path> <path d="M8 14h.01"></path> <path d="M12 14h.01"></path> <path d="M16 14h.01"></path> <path d="M8 18h.01"></path> <path d="M12 18h.01"></path> <path d="M16 18h.01"></path>',
  "check": '<path d="M20 6 9 17l-5-5"></path>',
  "chevron-down": '<path d="m6 9 6 6 6-6"></path>',
  "chevron-left": '<path d="m15 18-6-6 6-6"></path>',
  "chevron-right": '<path d="m9 18 6-6-6-6"></path>',
  "circle-alert": '<circle cx="12" cy="12" r="10"></circle> <line x1="12" x2="12" y1="8" y2="12"></line> <line x1="12" x2="12.01" y1="16" y2="16"></line>',
  "circle-check": '<circle cx="12" cy="12" r="10"></circle> <path d="m9 12 2 2 4-4"></path>',
  "clock": '<circle cx="12" cy="12" r="10"></circle> <path d="M12 6v6l4 2"></path>',
  "compass": '<circle cx="12" cy="12" r="10"></circle> <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"></path>',
  "download": '<path d="M12 15V3"></path> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path> <path d="m7 10 5 5 5-5"></path>',
  "external-link": '<path d="M15 3h6v6"></path> <path d="M10 14 21 3"></path> <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>',
  "file-text": '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path> <path d="M14 2v5a1 1 0 0 0 1 1h5"></path> <path d="M10 9H8"></path> <path d="M16 13H8"></path> <path d="M16 17H8"></path>',
  "globe": '<circle cx="12" cy="12" r="10"></circle> <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path> <path d="M2 12h20"></path>',
  "graduation-cap": '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path> <path d="M22 10v6"></path> <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>',
  "handshake": '<path d="m11 17 2 2a1 1 0 1 0 3-3"></path> <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"></path> <path d="m21 3 1 11h-2"></path> <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path> <path d="M3 4h8"></path>',
  "heart-handshake": '<path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762"></path>',
  "house": '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path> <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>',
  "info": '<circle cx="12" cy="12" r="10"></circle> <path d="M12 16v-4"></path> <path d="M12 8h.01"></path>',
  "leaf": '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path> <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>',
  "lightbulb": '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path> <path d="M9 18h6"></path> <path d="M10 22h4"></path>',
  "mail": '<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path> <rect x="2" y="4" width="20" height="16" rx="2"></rect>',
  "map-pin": '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path> <circle cx="12" cy="10" r="3"></circle>',
  "menu": '<path d="M4 5h16"></path> <path d="M4 12h16"></path> <path d="M4 19h16"></path>',
  "message-circle": '<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>',
  "minus": '<path d="M5 12h14"></path>',
  "phone": '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path>',
  "piggy-bank": '<path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z"></path> <path d="M16 10h.01"></path> <path d="M2 8v1a2 2 0 0 0 2 2h1"></path>',
  "play": '<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path>',
  "plus": '<path d="M5 12h14"></path> <path d="M12 5v14"></path>',
  "quote": '<path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path> <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>',
  "search": '<path d="m21 21-4.34-4.34"></path> <circle cx="11" cy="11" r="8"></circle>',
  "shield-check": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path> <path d="m9 12 2 2 4-4"></path>',
  "star": '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>',
  "trending-up": '<path d="M16 7h6v6"></path> <path d="m22 7-8.5 8.5-5-5L2 17"></path>',
  "umbrella": '<path d="M12 13v7a2 2 0 0 0 4 0"></path> <path d="M12 2v2"></path> <path d="M20.992 13a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-19.923 0A1 1 0 0 0 3 13z"></path>',
  "user-round": '<circle cx="12" cy="8" r="5"></circle> <path d="M20 21a8 8 0 0 0-16 0"></path>',
  "users": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path> <path d="M16 3.128a4 4 0 0 1 0 7.744"></path> <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path> <circle cx="9" cy="7" r="4"></circle>',
  "wallet": '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path> <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>',
  "x": '<path d="M18 6 6 18"></path> <path d="m6 6 12 12"></path>'
};
function Icon({
  name,
  size = 20,
  strokeWidth = 1.75,
  color = "currentColor",
  label,
  style,
  className
}) {
  const inner = ICON_PATHS[name];
  if (!inner) return null;
  return /*#__PURE__*/React.createElement("svg", {
    role: label ? "img" : "presentation",
    "aria-label": label || undefined,
    "aria-hidden": label ? undefined : true,
    className: className,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: "block",
      flex: "none",
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: inner
    }
  });
}
const ICON_NAMES = Object.keys(ICON_PATHS);
Object.assign(__ds_scope, { ICON_PATHS, Icon, ICON_NAMES });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    padding: "9px 16px",
    fontSize: "13px",
    icon: 15,
    gap: "7px"
  },
  md: {
    padding: "13px 24px",
    fontSize: "15px",
    icon: 17,
    gap: "9px"
  },
  lg: {
    padding: "16px 30px",
    fontSize: "16px",
    icon: 18,
    gap: "10px"
  }
};
function paint(variant, state) {
  switch (variant) {
    case "secondary":
      return {
        background: state.hover ? "var(--action-secondary-hover-bg)" : "transparent",
        color: "var(--action-secondary-text)",
        border: "var(--border-width-strong) solid var(--action-secondary-border)"
      };
    case "ghost":
      return {
        background: "transparent",
        color: state.hover ? "var(--text-link-hover)" : "var(--text-accent)",
        border: "var(--border-width-strong) solid transparent",
        padding: 0
      };
    case "onDark":
      return {
        background: state.hover ? "var(--action-on-dark-hover-bg)" : "transparent",
        color: "var(--action-on-dark-text)",
        border: "var(--border-width-strong) solid var(--action-on-dark-border)"
      };
    case "onDarkGhost":
      return {
        background: "transparent",
        color: "var(--text-on-dark)",
        border: "var(--border-width-strong) solid transparent",
        padding: 0
      };
    default:
      return {
        background: state.hover ? "var(--action-primary-hover)" : "var(--action-primary)",
        color: "var(--action-primary-text)",
        border: "var(--border-width-strong) solid transparent"
      };
  }
}
function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  href,
  disabled = false,
  fullWidth = false,
  onClick,
  type = "button",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const skin = paint(variant, {
    hover: hover && !disabled
  });
  const Tag = href ? "a" : "button";
  const base = {
    display: fullWidth ? "flex" : "inline-flex",
    width: fullWidth ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    padding: s.padding,
    fontFamily: "var(--font-sans)",
    fontSize: s.fontSize,
    fontWeight: "var(--weight-medium)",
    letterSpacing: "var(--tracking-button)",
    lineHeight: 1.1,
    borderRadius: "var(--radius-sm)",
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none",
    opacity: disabled ? 0.42 : 1,
    transform: press && !disabled ? "scale(var(--press-scale))" : "none",
    transition: "background-color var(--dur-base) var(--ease-quiet), color var(--dur-base) var(--ease-quiet), border-color var(--dur-base) var(--ease-quiet), transform var(--dur-fast) var(--ease-quiet)",
    ...skin,
    ...style
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
    href: href,
    type: href ? undefined : type,
    disabled: href ? undefined : disabled,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: base
  }), iconLeft ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: s.icon
  }) : null, /*#__PURE__*/React.createElement("span", null, children), iconRight ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.icon,
    style: {
      transform: hover && !disabled ? "translateX(3px)" : "none",
      transition: "transform var(--dur-base) var(--ease-quiet)"
    }
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SURFACES = {
  cream: {
    background: "var(--surface-card)",
    color: "var(--text-body)",
    border: "transparent"
  },
  ivory: {
    background: "var(--surface-page)",
    color: "var(--text-body)",
    border: "var(--divider-warm)"
  },
  white: {
    background: "var(--surface-raised)",
    color: "var(--text-body)",
    border: "var(--border-soft)"
  },
  sand: {
    background: "var(--surface-warm)",
    color: "var(--charcoal)",
    border: "transparent"
  },
  dark: {
    background: "var(--surface-dark)",
    color: "var(--text-on-dark)",
    border: "var(--border-on-dark)"
  },
  outline: {
    background: "transparent",
    color: "var(--text-body)",
    border: "var(--border-hairline)"
  }
};
function Card({
  title,
  eyebrow,
  children,
  icon,
  surface = "cream",
  href,
  footer,
  interactive,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const s = SURFACES[surface] || SURFACES.cream;
  const isLink = !!href || !!interactive;
  const dark = surface === "dark";
  const Tag = href ? "a" : "div";
  return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      padding: "var(--space-6)",
      background: s.background,
      color: s.color,
      border: "1px solid " + s.border,
      borderRadius: "var(--radius-lg)",
      textDecoration: "none",
      boxShadow: isLink && hover ? "var(--shadow-md)" : "var(--shadow-none)",
      transform: isLink && hover ? "translateY(var(--lift-hover))" : "none",
      transition: "transform var(--dur-base) var(--ease-quiet), box-shadow var(--dur-base) var(--ease-quiet)",
      ...style
    }
  }), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 26,
    strokeWidth: 1.5,
    color: dark ? "var(--sand)" : "var(--copper)",
    style: {
      marginBottom: "var(--space-2)"
    }
  }) : null, eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--size-label)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: dark ? "var(--sand)" : "var(--text-eyebrow)"
    }
  }, eyebrow) : null, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "var(--size-h4)",
      fontWeight: "var(--weight-semibold)",
      lineHeight: "var(--lh-heading)",
      color: dark ? "var(--text-on-dark)" : "var(--text-heading)",
      margin: 0
    }
  }, title) : null, children ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--size-body-sm)",
      lineHeight: "var(--lh-body)",
      color: dark ? "var(--text-on-dark-muted)" : "var(--text-muted)"
    }
  }, children) : null, footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: "var(--space-4)"
    }
  }, footer) : null, href ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-up-right",
    size: 18,
    color: dark ? "var(--sand)" : "var(--copper)",
    style: {
      marginTop: "var(--space-2)",
      transform: hover ? "translate(2px,-2px)" : "none",
      transition: "transform var(--dur-base) var(--ease-quiet)"
    }
  }) : null);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    box: 32,
    icon: 16
  },
  md: {
    box: 40,
    icon: 19
  },
  lg: {
    box: 48,
    icon: 22
  }
};
function IconButton({
  icon,
  label,
  variant = "outline",
  size = "md",
  onClick,
  href,
  disabled = false,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const on = hover && !disabled;
  const skins = {
    solid: {
      background: on ? "var(--action-primary-hover)" : "var(--action-primary)",
      color: "var(--action-primary-text)",
      border: "1px solid transparent"
    },
    outline: {
      background: on ? "var(--action-secondary-hover-bg)" : "transparent",
      color: "var(--action-secondary-text)",
      border: "1px solid var(--border-hairline)"
    },
    quiet: {
      background: on ? "var(--action-secondary-hover-bg)" : "transparent",
      color: "var(--text-muted)",
      border: "1px solid transparent"
    },
    onDark: {
      background: on ? "var(--action-on-dark-hover-bg)" : "transparent",
      color: "var(--text-on-dark)",
      border: "1px solid var(--border-on-dark)"
    }
  };
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, _extends({}, rest, {
    href: href,
    "aria-label": label,
    title: label,
    disabled: href ? undefined : disabled,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: s.box,
      height: s.box,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-sm)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.42 : 1,
      transition: "background-color var(--dur-base) var(--ease-quiet), color var(--dur-base) var(--ease-quiet)",
      ...skins[variant],
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.icon
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  icon,
  onRemove,
  selected = false,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const interactive = !!onClick;
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      padding: "7px 14px",
      borderRadius: "var(--radius-pill)",
      background: selected ? "var(--teal-primary)" : hover && interactive ? "var(--surface-card)" : "transparent",
      color: selected ? "var(--text-on-dark)" : "var(--text-body)",
      border: "1px solid " + (selected ? "var(--teal-primary)" : "var(--border-hairline)"),
      fontFamily: "var(--font-sans)",
      fontSize: "var(--size-body-sm)",
      fontWeight: "var(--weight-medium)",
      lineHeight: 1.2,
      cursor: interactive ? "pointer" : "default",
      transition: "background-color var(--dur-base) var(--ease-quiet), border-color var(--dur-base) var(--ease-quiet), color var(--dur-base) var(--ease-quiet)",
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 15
  }) : null, children, onRemove ? /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    "aria-label": "Remove",
    style: {
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer",
      color: "inherit",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 14
  })) : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/editorial/QuoteBlock.jsx
try { (() => {
function QuoteBlock({
  quote,
  name,
  role,
  onDark = false,
  size = "md",
  style
}) {
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-6)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "quote",
    size: 26,
    strokeWidth: 1.4,
    color: onDark ? "var(--sand)" : "var(--bronze)"
  }), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: "var(--font-serif)",
      fontWeight: "var(--weight-medium)",
      fontStyle: "italic",
      fontSize: size === "lg" ? "var(--size-h2)" : "var(--size-h3)",
      lineHeight: 1.34,
      letterSpacing: "var(--tracking-heading)",
      color: onDark ? "var(--text-on-dark)" : "var(--text-heading)",
      maxWidth: "34ch",
      textWrap: "pretty"
    }
  }, quote), name ? /*#__PURE__*/React.createElement("figcaption", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "2px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-body-sm)",
      fontWeight: "var(--weight-medium)",
      color: onDark ? "var(--text-on-dark)" : "var(--text-body)"
    }
  }, name), role ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-caption)",
      color: onDark ? "var(--text-on-dark-muted)" : "var(--text-quiet)"
    }
  }, role) : null) : null);
}
Object.assign(__ds_scope, { QuoteBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/QuoteBlock.jsx", error: String((e && e.message) || e) }); }

// components/editorial/Section.jsx
try { (() => {
const TONES = {
  ivory: {
    background: "var(--surface-page)",
    color: "var(--text-body)"
  },
  cream: {
    background: "var(--surface-card)",
    color: "var(--text-body)"
  },
  sand: {
    background: "var(--surface-warm)",
    color: "var(--charcoal)"
  },
  teal: {
    background: "var(--surface-dark)",
    color: "var(--text-on-dark)"
  },
  green: {
    background: "var(--surface-green)",
    color: "var(--text-on-dark)"
  },
  dark: {
    background: "var(--surface-darkest)",
    color: "var(--text-on-dark)"
  },
  charcoal: {
    background: "var(--charcoal)",
    color: "var(--text-on-dark)"
  }
};
function Section({
  tone = "ivory",
  tight = false,
  full = false,
  narrow = false,
  id,
  children,
  style,
  innerStyle
}) {
  const t = TONES[tone] || TONES.ivory;
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    style: {
      background: t.background,
      color: t.color,
      paddingBlock: tight ? "var(--section-y-tight)" : "var(--section-y)",
      ...style
    }
  }, full ? children : /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: narrow ? "var(--content-narrow)" : "var(--content-max)",
      margin: "0 auto",
      paddingInline: "var(--gutter)",
      ...innerStyle
    }
  }, children));
}
Object.assign(__ds_scope, { Section });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/Section.jsx", error: String((e && e.message) || e) }); }

// components/editorial/SectionHeading.jsx
try { (() => {
function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  onDark = false,
  level = 2,
  size = "h2",
  rule = true,
  style,
  children
}) {
  const H = "h" + level;
  const eyebrowColor = onDark ? "var(--sand)" : "var(--text-eyebrow)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)",
      alignItems: align === "center" ? "center" : "flex-start",
      textAlign: align,
      ...style
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)"
    }
  }, rule ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 28,
      height: "var(--rule-width)",
      background: eyebrowColor,
      display: "inline-block"
    }
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--size-label)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: eyebrowColor
    }
  }, eyebrow)) : null, title ? React.createElement(H, {
    style: {
      fontFamily: "var(--font-serif)",
      fontWeight: "var(--weight-semibold)",
      fontSize: size === "display" ? "var(--size-display)" : size === "h1" ? "var(--size-h1)" : size === "h3" ? "var(--size-h3)" : "var(--size-h2)",
      lineHeight: size === "display" ? "var(--lh-display)" : "var(--lh-heading)",
      letterSpacing: size === "display" ? "var(--tracking-display)" : "var(--tracking-heading)",
      color: onDark ? "var(--text-on-dark)" : "var(--text-heading)",
      margin: 0,
      maxWidth: "20ch"
    }
  }, title) : null, lead ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--size-lead)",
      lineHeight: "var(--lh-lead)",
      color: onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)",
      maxWidth: "var(--measure-body)",
      margin: 0
    }
  }, lead) : null, children);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/editorial/WhatsAppFloat.jsx
try { (() => {
/* The one persistent contact point on a page. Restrained: single pill, bottom-right,
   label appears on hover. Never paired with other floating contact buttons. */
function WhatsAppFloat({
  label = "Talk to an adviser",
  onClick,
  position = "absolute",
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    "aria-label": label,
    style: {
      position,
      right: "var(--space-6)",
      bottom: "var(--space-6)",
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      padding: "12px 16px",
      borderRadius: "var(--radius-pill)",
      background: hover ? "var(--copper-dark)" : "var(--copper)",
      color: "var(--white)",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--size-body-sm)",
      fontWeight: "var(--weight-medium)",
      boxShadow: "var(--shadow-md)",
      transition: "background-color var(--dur-base) var(--ease-quiet)",
      zIndex: 50,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "message-circle",
    size: 19
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      maxWidth: hover ? "16ch" : 0,
      overflow: "hidden",
      whiteSpace: "nowrap",
      opacity: hover ? 1 : 0,
      transition: "max-width var(--dur-base) var(--ease-quiet), opacity var(--dur-base) var(--ease-quiet)"
    }
  }, label));
}
Object.assign(__ds_scope, { WhatsAppFloat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/WhatsAppFloat.jsx", error: String((e && e.message) || e) }); }

// components/editorial/Wordmark.jsx
try { (() => {
/* The wordmark is set in type — no logo files were supplied with the brand notes.
   Lora Semibold, tight tracking, apostrophe kept as a typographic right quote. */
function Wordmark({
  size = 26,
  tone = "dark",
  tagline,
  style
}) {
  const color = tone === "light" ? "var(--text-on-dark)" : "var(--teal-primary)";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      flexDirection: "column",
      gap: "2px",
      lineHeight: 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-grotesk)",
      fontWeight: 700,
      fontSize: size,
      letterSpacing: "-0.02em",
      color
    }
  }, "D\u2019life"), tagline ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: Math.max(9, Math.round(size * 0.34)),
      fontWeight: "var(--weight-medium)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: tone === "light" ? "var(--sand)" : "var(--text-eyebrow)"
    }
  }, tagline) : null);
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/editorial/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function Dialog({
  open = true,
  title,
  eyebrow,
  children,
  footer,
  onClose,
  width = 520,
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--surface-overlay)",
      backdropFilter: "blur(3px)",
      display: "grid",
      placeItems: "center",
      padding: "var(--space-6)",
      zIndex: 60,
      animation: "dl-fade var(--dur-base) var(--ease-quiet) both"
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: width,
      background: "var(--surface-page)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)",
      padding: "var(--space-8)",
      position: "relative",
      animation: "dl-reveal var(--dur-slow) var(--ease-quiet) both",
      ...style
    }
  }, onClose ? /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      position: "absolute",
      top: "var(--space-5)",
      right: "var(--space-5)",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "var(--text-quiet)",
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 19
  })) : null, eyebrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--size-label)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-eyebrow)",
      marginBottom: "var(--space-3)"
    }
  }, eyebrow) : null, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "var(--size-h3)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-heading)",
      margin: "0 0 var(--space-4)",
      lineHeight: "var(--lh-heading)"
    }
  }, title) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--size-body-sm)",
      lineHeight: "var(--lh-body)",
      color: "var(--text-muted)"
    }
  }, children), footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      marginTop: "var(--space-8)"
    }
  }, footer) : null));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
const TONES = {
  success: {
    icon: "circle-check",
    color: "var(--status-success)"
  },
  error: {
    icon: "circle-alert",
    color: "var(--status-error)"
  },
  info: {
    icon: "info",
    color: "var(--teal-primary)"
  }
};
function Toast({
  title,
  message,
  tone = "success",
  onClose,
  style
}) {
  const t = TONES[tone] || TONES.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "var(--space-3)",
      padding: "var(--space-4) var(--space-5)",
      background: "var(--surface-raised)",
      border: "1px solid var(--border-soft)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-md)",
      maxWidth: 400,
      animation: "dl-reveal var(--dur-slow) var(--ease-quiet) both",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: t.icon,
    size: 19,
    color: t.color,
    style: {
      marginTop: "1px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--size-body-sm)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-body)"
    }
  }, title), message ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--size-caption)",
      color: "var(--text-quiet)",
      marginTop: "2px",
      lineHeight: 1.5
    }
  }, message) : null), onClose ? /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      background: "none",
      border: "none",
      padding: 0,
      cursor: "pointer",
      color: "var(--text-quiet)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16
  })) : null);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  children,
  placement = "top",
  style
}) {
  const [show, setShow] = React.useState(false);
  const pos = placement === "bottom" ? {
    top: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)"
  } : {
    bottom: "calc(100% + 8px)",
    left: "50%",
    transform: "translateX(-50%)"
  };
  return /*#__PURE__*/React.createElement("span", {
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    }
  }, children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      ...pos,
      whiteSpace: "nowrap",
      padding: "6px 10px",
      borderRadius: "var(--radius-sm)",
      background: "var(--teal-dark)",
      color: "var(--ivory)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--size-caption)",
      lineHeight: 1.3,
      boxShadow: "var(--shadow-md)",
      opacity: show ? 1 : 0,
      pointerEvents: "none",
      transition: "opacity var(--dur-base) var(--ease-quiet)",
      zIndex: 40
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  disabled,
  style
}) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked === undefined ? inner : checked;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInner(!on);
    if (onChange) onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    onClick: toggle,
    style: {
      display: "flex",
      gap: "var(--space-3)",
      alignItems: description ? "flex-start" : "center",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "checkbox",
    "aria-checked": on,
    style: {
      width: 18,
      height: 18,
      flex: "none",
      marginTop: description ? "2px" : 0,
      display: "grid",
      placeItems: "center",
      borderRadius: "var(--radius-xs)",
      background: on ? "var(--teal-primary)" : "var(--surface-raised)",
      border: "1px solid " + (on ? "var(--teal-primary)" : "var(--border-hairline)"),
      color: "var(--ivory)",
      transition: "background-color var(--dur-fast) var(--ease-quiet), border-color var(--dur-fast) var(--ease-quiet)"
    }
  }, on ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 13,
    strokeWidth: 2.4
  }) : null), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-body-sm)",
      color: "var(--text-body)"
    }
  }, label), description ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--size-caption)",
      color: "var(--text-quiet)",
      marginTop: "2px"
    }
  }, description) : null));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function Field({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)",
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--size-caption)",
      fontWeight: "var(--weight-medium)",
      letterSpacing: "0.02em",
      color: "var(--text-body)"
    }
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--copper)"
    }
  }, " *") : null) : null, children, error ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "var(--size-caption)",
      color: "var(--status-error)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "circle-alert",
    size: 14
  }), " ", error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-caption)",
      color: "var(--text-quiet)"
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function controlStyle({
  focus,
  error,
  onDark,
  disabled
}) {
  return {
    width: "100%",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--size-body-sm)",
    lineHeight: 1.5,
    color: onDark ? "var(--text-on-dark)" : "var(--text-body)",
    background: disabled ? "rgba(47,53,50,.04)" : onDark ? "var(--ivory-12)" : "var(--surface-raised)",
    border: "1px solid " + (error ? "var(--status-error)" : focus ? "var(--teal-primary)" : onDark ? "var(--border-on-dark)" : "var(--border-hairline)"),
    borderRadius: "var(--radius-sm)",
    padding: "12px 14px",
    outline: "none",
    boxShadow: focus ? "0 0 0 3px rgba(23,74,69,.10)" : "none",
    transition: "border-color var(--dur-base) var(--ease-quiet), box-shadow var(--dur-base) var(--ease-quiet)"
  };
}
function Input({
  label,
  hint,
  error,
  required,
  placeholder,
  value,
  defaultValue,
  onChange,
  type = "text",
  icon,
  id,
  disabled,
  onDark,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useMemo(() => "in-" + Math.random().toString(36).slice(2, 7), []);
  const control = /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    id: inputId,
    type: type,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      ...controlStyle({
        focus,
        error,
        onDark,
        disabled
      }),
      paddingLeft: icon ? "40px" : undefined
    }
  }));
  return /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: label,
    hint: hint,
    error: error,
    required: required,
    htmlFor: inputId,
    style: style
  }, icon ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: "13px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--text-quiet)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 17
  })), control) : control);
}
Object.assign(__ds_scope, { controlStyle, Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  description,
  name,
  value,
  checked,
  onChange,
  disabled,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    onClick: () => !disabled && onChange && onChange(value),
    style: {
      display: "flex",
      gap: "var(--space-3)",
      alignItems: description ? "flex-start" : "center",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "radio",
    "aria-checked": !!checked,
    "data-name": name,
    style: {
      width: 18,
      height: 18,
      flex: "none",
      marginTop: description ? "2px" : 0,
      display: "grid",
      placeItems: "center",
      borderRadius: "var(--radius-pill)",
      background: "var(--surface-raised)",
      border: "1px solid " + (checked ? "var(--teal-primary)" : "var(--border-hairline)"),
      transition: "border-color var(--dur-fast) var(--ease-quiet)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: "var(--radius-pill)",
      background: "var(--teal-primary)",
      transform: checked ? "scale(1)" : "scale(0)",
      transition: "transform var(--dur-fast) var(--ease-quiet)"
    }
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-body-sm)",
      color: "var(--text-body)"
    }
  }, label), description ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--size-caption)",
      color: "var(--text-quiet)",
      marginTop: "2px"
    }
  }, description) : null));
}
function RadioGroup({
  name,
  value,
  onChange,
  options = [],
  direction = "column",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    style: {
      display: "flex",
      flexDirection: direction,
      gap: direction === "row" ? "var(--space-6)" : "var(--space-3)",
      ...style
    }
  }, options.map(o => {
    const opt = typeof o === "string" ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement(Radio, {
      key: opt.value,
      name: name,
      value: opt.value,
      label: opt.label,
      description: opt.description,
      checked: value === opt.value,
      onChange: onChange
    });
  }));
}
Object.assign(__ds_scope, { Radio, RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  hint,
  error,
  required,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder,
  id,
  disabled,
  onDark,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useMemo(() => "sel-" + Math.random().toString(36).slice(2, 7), []);
  return /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: label,
    hint: hint,
    error: error,
    required: required,
    htmlFor: inputId,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({}, rest, {
    id: inputId,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      ...__ds_scope.controlStyle({
        focus,
        error,
        onDark,
        disabled
      }),
      appearance: "none",
      paddingRight: "40px",
      cursor: disabled ? "not-allowed" : "pointer"
    }
  }), placeholder ? /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder) : null, options.map(o => {
    const opt = typeof o === "string" ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: "13px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--text-quiet)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 17
  }))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  style
}) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked === undefined ? inner : checked;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInner(!on);
    if (onChange) onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    onClick: toggle,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "switch",
    "aria-checked": on,
    style: {
      width: 40,
      height: 22,
      flex: "none",
      padding: "2px",
      borderRadius: "var(--radius-pill)",
      background: on ? "var(--copper)" : "var(--charcoal-16)",
      transition: "background-color var(--dur-base) var(--ease-quiet)",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: "var(--radius-pill)",
      background: "var(--white)",
      boxShadow: "var(--shadow-xs)",
      transform: on ? "translateX(18px)" : "translateX(0)",
      transition: "transform var(--dur-base) var(--ease-quiet)"
    }
  })), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-body-sm)",
      color: "var(--text-body)"
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Textarea({
  label,
  hint,
  error,
  required,
  placeholder,
  value,
  defaultValue,
  onChange,
  rows = 4,
  id,
  disabled,
  onDark,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useMemo(() => "ta-" + Math.random().toString(36).slice(2, 7), []);
  return /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: label,
    hint: hint,
    error: error,
    required: required,
    htmlFor: inputId,
    style: style
  }, /*#__PURE__*/React.createElement("textarea", _extends({}, rest, {
    id: inputId,
    rows: rows,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      ...__ds_scope.controlStyle({
        focus,
        error,
        onDark,
        disabled
      }),
      resize: "vertical",
      minHeight: rows * 24 + 24
    }
  })));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Accordion.jsx
try { (() => {
function AccordionItem({
  question,
  children,
  open,
  onToggle,
  onDark
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "1px solid " + (onDark ? "var(--border-on-dark)" : "var(--divider-warm)")
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onToggle,
    "aria-expanded": open,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-6)",
      padding: "var(--space-5) 0",
      background: "none",
      border: "none",
      cursor: "pointer",
      textAlign: "left",
      fontFamily: "var(--font-serif)",
      fontSize: "var(--size-h4)",
      fontWeight: "var(--weight-medium)",
      lineHeight: "var(--lh-heading)",
      color: onDark ? "var(--text-on-dark)" : hover || open ? "var(--copper-dark)" : "var(--text-heading)",
      transition: "color var(--dur-base) var(--ease-quiet)"
    }
  }, question, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: 20,
    strokeWidth: 1.5,
    style: {
      transform: open ? "rotate(45deg)" : "none",
      transition: "transform var(--dur-base) var(--ease-quiet)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateRows: open ? "1fr" : "0fr",
      transition: "grid-template-rows var(--dur-base) var(--ease-quiet)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: "var(--space-6)",
      maxWidth: "var(--measure-body)",
      fontSize: "var(--size-body-sm)",
      lineHeight: "var(--lh-body)",
      color: onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)",
      opacity: open ? 1 : 0,
      transition: "opacity var(--dur-base) var(--ease-quiet)"
    }
  }, children))));
}
function Accordion({
  items = [],
  defaultOpen = 0,
  allowMultiple = false,
  onDark = false,
  style
}) {
  const [open, setOpen] = React.useState(defaultOpen === null ? [] : [defaultOpen]);
  const toggle = i => {
    setOpen(cur => {
      if (cur.includes(i)) return cur.filter(x => x !== i);
      return allowMultiple ? [...cur, i] : [i];
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid " + (onDark ? "var(--border-on-dark)" : "var(--divider-warm)"),
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement(AccordionItem, {
    key: i,
    question: it.question,
    open: open.includes(i),
    onToggle: () => toggle(i),
    onDark: onDark
  }, it.answer)));
}
Object.assign(__ds_scope, { AccordionItem, Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  variant = "underline",
  style
}) {
  const first = tabs.length ? typeof tabs[0] === "string" ? tabs[0] : tabs[0].value : null;
  const [inner, setInner] = React.useState(defaultValue || first);
  const active = value === undefined ? inner : value;
  const pick = v => {
    if (value === undefined) setInner(v);
    if (onChange) onChange(v);
  };
  const onDark = variant === "onDark";
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: "flex",
      gap: "var(--space-8)",
      borderBottom: "1px solid " + (onDark ? "var(--border-on-dark)" : "var(--border-hairline)"),
      ...style
    }
  }, tabs.map(t => {
    const tab = typeof t === "string" ? {
      value: t,
      label: t
    } : t;
    const on = tab.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: tab.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => pick(tab.value),
      style: {
        background: "none",
        border: "none",
        padding: "0 0 12px",
        marginBottom: "-1px",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--size-body-sm)",
        fontWeight: on ? "var(--weight-semibold)" : "var(--weight-regular)",
        color: on ? onDark ? "var(--text-on-dark)" : "var(--text-heading)" : onDark ? "var(--text-on-dark-muted)" : "var(--text-muted)",
        borderBottom: "2px solid " + (on ? "var(--copper)" : "transparent"),
        transition: "color var(--dur-base) var(--ease-quiet), border-color var(--dur-base) var(--ease-quiet)"
      }
    }, tab.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website-v2/site.js
try { (() => {
/* D'Life v2 — GSAP choreography */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof gsap !== 'undefined';
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* ---------- marquees ---------- */
  const MQ = 'AIA representative <em>· Kuala Lumpur ·</em> Protection <em>·</em> Retirement <em>·</em> Business continuity <em>·</em> Drive Value Associate <em>· 守護與增值 ·</em> ';
  document.querySelectorAll('.marquee .track').forEach(t => {
    t.innerHTML = ('<span>' + MQ + '</span>').repeat(6);
  });

  /* ---------- preloader ---------- */
  const loader = document.getElementById('loader');
  const pct = document.getElementById('pct');
  const finishLoad = () => {
    if (!hasGsap || reduced) {
      loader.remove();
      heroIn();
      return;
    }
    const tl = gsap.timeline({
      onComplete: () => loader.remove()
    });
    tl.to(loader, {
      yPercent: -100,
      duration: .9,
      ease: 'power4.inOut',
      delay: .15
    });
    heroIn(.35);
  };
  if (hasGsap && !reduced) {
    gsap.to('#loader .wm span', {
      y: 0,
      duration: .9,
      ease: 'power4.out',
      delay: .1
    });
    const cnt = {
      v: 0
    };
    gsap.to(cnt, {
      v: 100,
      duration: 1.1,
      ease: 'power2.inOut',
      delay: .2,
      onUpdate: () => pct.textContent = Math.round(cnt.v),
      onComplete: finishLoad
    });
  } else {
    finishLoad();
  }

  /* ---------- hero entrance ---------- */
  function heroIn(delay = 0) {
    if (!hasGsap || reduced) {
      document.querySelectorAll('#hero h1 .ln span').forEach(s => s.style.transform = 'none');
      return;
    }
    const tl = gsap.timeline({
      delay: delay + .6,
      defaults: {
        ease: 'power4.out'
      }
    });
    tl.to('#hero h1 .ln span', {
      y: 0,
      duration: 1.1,
      stagger: .12
    }).from('#hero .kick', {
      y: 20,
      opacity: 0,
      duration: .7
    }, '-=.7').from('#hero .sub, #hero .cnl', {
      y: 24,
      opacity: 0,
      duration: .8,
      stagger: .1
    }, '-=.6').from('#hero .acts .btn', {
      y: 24,
      opacity: 0,
      duration: .7,
      stagger: .08
    }, '-=.55').from('#hero .r .media', {
      scale: 1.12,
      duration: 1.6,
      ease: 'power3.out'
    }, 0).from('#hero .scroll-cue', {
      opacity: 0,
      duration: .8
    }, '-=.4').to('#hero .card.rv', {
      opacity: 1,
      y: 0,
      duration: .8
    }, '-=.6');
  }
  if (!hasGsap) return; // static fallback: content is fully readable without JS animation

  /* ---------- nav behaviour ---------- */
  const nav = document.getElementById('nav');
  let lastY = 0;
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: self => {
      const y = self.scroll();
      nav.classList.toggle('scrolled', y > 60);
      nav.classList.toggle('hide', y > 500 && y > lastY + 4);
      lastY = y;
    }
  });

  /* ---------- generic reveals ---------- */
  if (!reduced) {
    document.querySelectorAll('.rv').forEach(el => {
      if (el.closest('#hero')) return;
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 86%'
        }
      });
    });

    /* big editorial line: word-by-word ink-in */
    const big = document.getElementById('bigline');
    if (big) {
      const walk = node => {
        [...node.childNodes].forEach(ch => {
          if (ch.nodeType === 3) {
            const frag = document.createDocumentFragment();
            ch.textContent.split(/(\s+)/).forEach(tok => {
              if (/^\s+$/.test(tok) || tok === '') {
                frag.appendChild(document.createTextNode(tok));
                return;
              }
              const w = document.createElement('span');
              w.className = 'w';
              w.textContent = tok;
              frag.appendChild(w);
            });
            node.replaceChild(frag, ch);
          } else if (ch.nodeType === 1) walk(ch);
        });
      };
      walk(big);
      gsap.to(big.querySelectorAll('.w'), {
        opacity: 1,
        stagger: .035,
        ease: 'none',
        scrollTrigger: {
          trigger: big,
          start: 'top 78%',
          end: 'bottom 45%',
          scrub: true
        }
      });
    }

    /* counters */
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = +el.dataset.count,
        prefix = el.dataset.prefix || '',
        suffix = el.dataset.suffix || '';
      const comma = el.dataset.comma;
      const obj = {
        v: 0
      };
      gsap.to(obj, {
        v: target,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%'
        },
        onUpdate: () => {
          let n = Math.round(obj.v);
          el.textContent = prefix + (comma ? n.toLocaleString('en-US') : n) + suffix;
        }
      });
    });

    /* marquee drift */
    document.querySelectorAll('.marquee .track').forEach(t => {
      const w = t.scrollWidth / 6;
      const tween = gsap.to(t, {
        x: -w,
        duration: 26,
        ease: 'none',
        repeat: -1
      });
      t.closest('.marquee').addEventListener('mouseenter', () => gsap.to(tween, {
        timeScale: .25,
        duration: .5
      }));
      t.closest('.marquee').addEventListener('mouseleave', () => gsap.to(tween, {
        timeScale: 1,
        duration: .5
      }));
    });

    /* hero image parallax */
    gsap.to('#hero .r .media', {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
    gsap.to('#founder .media .inner', {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: '#founder .media',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    /* DVA ghost word drift + invite card tilt */
    gsap.fromTo('#dva .bigword', {
      xPercent: 4
    }, {
      xPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: '#dva',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
    const invite = document.getElementById('invite');
    if (invite && matchMedia('(pointer:fine)').matches) {
      invite.addEventListener('mousemove', e => {
        const r = invite.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - .5) * -5;
        const ry = ((e.clientX - r.left) / r.width - .5) * 6;
        gsap.to(invite, {
          rotateX: rx,
          rotateY: ry,
          transformPerspective: 900,
          duration: .5,
          ease: 'power2.out'
        });
      });
      invite.addEventListener('mouseleave', () => gsap.to(invite, {
        rotateX: 0,
        rotateY: 0,
        duration: .7,
        ease: 'power3.out'
      }));
    }

    /* CTA heading scale-in */
    gsap.from('#cta h2', {
      scale: .92,
      ease: 'none',
      scrollTrigger: {
        trigger: '#cta',
        start: 'top bottom',
        end: 'center center',
        scrub: true
      }
    });
  } else {
    document.querySelectorAll('.rv').forEach(el => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
  }

  /* ---------- service rows: floating peek panel ---------- */
  const peek = document.getElementById('svc-peek');
  const peekPh = peek.querySelector('.ph');
  const tones = ['#174A45', '#1D4B3E', '#9C5A37', '#2F3532'];
  if (matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.svc').forEach((row, i) => {
      row.addEventListener('mouseenter', () => {
        peekPh.textContent = row.dataset.peek;
        peek.style.background = tones[i % tones.length];
        gsap.to(peek, {
          opacity: 1,
          scale: 1,
          duration: .4,
          ease: 'power3.out'
        });
      });
      row.addEventListener('mouseleave', () => gsap.to(peek, {
        opacity: 0,
        scale: .9,
        duration: .3
      }));
    });
    addEventListener('mousemove', e => {
      gsap.to(peek, {
        x: e.clientX,
        y: e.clientY,
        duration: .6,
        ease: 'power3.out'
      });
    });
  }
  /* touch: tap toggles the description */
  document.querySelectorAll('.svc').forEach(row => row.addEventListener('click', () => row.classList.toggle('open')));

  /* ---------- custom cursor ---------- */
  const cur = document.getElementById('cur');
  const curtag = document.getElementById('curtag');
  if (matchMedia('(pointer:fine)').matches) {
    addEventListener('mousemove', e => gsap.to(cur, {
      x: e.clientX,
      y: e.clientY,
      duration: .35,
      ease: 'power3.out'
    }));
    document.querySelectorAll('a,button,.svc').forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(cur.querySelector('.dot'), {
        scale: 3.4,
        duration: .3
      }));
      el.addEventListener('mouseleave', () => gsap.to(cur.querySelector('.dot'), {
        scale: 1,
        duration: .3
      }));
    });
  } else cur.remove();

  /* ---------- magnetic buttons ---------- */
  if (matchMedia('(pointer:fine)').matches && !reduced) {
    document.querySelectorAll('.magnet').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - r.left - r.width / 2) * .25,
          y: (e.clientY - r.top - r.height / 2) * .35,
          duration: .4,
          ease: 'power3.out'
        });
      });
      el.addEventListener('mouseleave', () => gsap.to(el, {
        x: 0,
        y: 0,
        duration: .6,
        ease: 'elastic.out(1,.5)'
      }));
    });
  }

  /* ---------- smooth anchor scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      const y = t.getBoundingClientRect().top + scrollY - 70;
      gsap.to({
        v: scrollY
      }, {
        v: y,
        duration: 1.1,
        ease: 'power3.inOut',
        onUpdate: function () {
          scrollTo(0, this.targets()[0].v);
        }
      });
    });
  });

  /* ---------- EN / 中文 ---------- */
  const setLang = lang => {
    document.documentElement.lang = lang === 'cn' ? 'zh' : 'en';
    document.querySelectorAll('[data-en],[data-en-html]').forEach(el => {
      if (el.dataset[lang + 'Html']) el.innerHTML = el.dataset[lang + 'Html'];else if (el.dataset[lang]) el.textContent = el.dataset[lang];
    });
    document.getElementById('lang-en').classList.toggle('on', lang === 'en');
    document.getElementById('lang-cn').classList.toggle('on', lang === 'cn');
    if (hasGsap) ScrollTrigger.refresh();
  };
  document.getElementById('lang-en').addEventListener('click', () => setLang('en'));
  document.getElementById('lang-cn').addEventListener('click', () => setLang('cn'));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website-v2/site.js", error: String((e && e.message) || e) }); }

// ui_kits/website-v3/site.js
try { (() => {
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
    a.target = '_blank';
    a.rel = 'noopener';
  });
  const showAll = () => document.querySelectorAll('.rv, #hero h1 .lw span').forEach(el => {
    el.style.opacity = 1;
    el.style.transform = 'none';
  });

  /* ---------- loader + hero entrance ---------- */
  const loader = document.getElementById('loader');
  const heroIn = () => {
    if (!hasGsap || reduced) {
      showAll();
      return;
    }
    gsap.timeline({
      defaults: {
        ease: 'power4.out'
      }
    }).to('#hero h1 .lw span', {
      y: 0,
      duration: 1.2,
      stagger: .14,
      delay: .1
    }).to('#hero .lb.rv', {
      opacity: 1,
      y: 0,
      duration: .8
    }, '-=.8').to('#hero p.rv, #hero .acts.rv', {
      opacity: 1,
      y: 0,
      duration: .9,
      stagger: .12
    }, '-=.6').from('#hero .bg', {
      scale: 1.08,
      duration: 2.2,
      ease: 'power2.out'
    }, 0);
  };
  if (hasGsap && !reduced) {
    gsap.timeline().to('#loader .wm', {
      y: 0,
      duration: .9,
      ease: 'power4.out',
      delay: .1
    }).to('#loader .sub', {
      opacity: 1,
      duration: .6
    }, '-=.3').to(loader, {
      yPercent: -100,
      duration: 1,
      ease: 'power4.inOut',
      delay: .5,
      onComplete: () => loader.remove()
    }).add(heroIn, '-=.55');
  } else {
    loader.remove();
    heroIn();
  }
  if (!hasGsap) {
    showAll();
  }

  /* ---------- header ---------- */
  const hd = document.getElementById('hd');
  addEventListener('scroll', () => hd.classList.toggle('solid', scrollY > 80 && !document.body.classList.contains('menu-open')), {
    passive: true
  });

  /* ---------- overlay menu ---------- */
  const menu = document.getElementById('menu');
  const burger = document.getElementById('burger');
  const mlabel = document.getElementById('mlabel');
  let menuOpen = false;
  const setMenu = open => {
    menuOpen = open;
    document.body.classList.toggle('menu-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    mlabel.textContent = open ? 'Close' : 'Menu';
    if (open) hd.classList.remove('solid');
    if (hasGsap && !reduced) {
      if (open) {
        gsap.set(menu, {
          visibility: 'visible'
        });
        gsap.timeline().to(menu, {
          clipPath: 'inset(0 0 0% 0)',
          duration: .8,
          ease: 'power4.inOut'
        }).fromTo('#menu .big a', {
          y: 40,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          duration: .7,
          stagger: .07,
          ease: 'power3.out'
        }, '-=.3').fromTo('#menu .side', {
          opacity: 0
        }, {
          opacity: 1,
          duration: .6
        }, '-=.5');
      } else {
        gsap.to(menu, {
          clipPath: 'inset(0 0 100% 0)',
          duration: .7,
          ease: 'power4.inOut',
          onComplete: () => gsap.set(menu, {
            visibility: 'hidden'
          })
        });
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
      if (hasGsap && !reduced) gsap.to({
        v: scrollY
      }, {
        v: y,
        duration: 1.2,
        ease: 'power3.inOut',
        onUpdate: function () {
          scrollTo(0, this.targets()[0].v);
        }
      });else scrollTo(0, y);
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
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 87%'
        }
      });
    });

    /* ---------- manifesto scrub ---------- */
    const man = document.querySelector('#man .man');
    if (man) {
      const walk = node => {
        [...node.childNodes].forEach(ch => {
          if (ch.nodeType === 3) {
            const frag = document.createDocumentFragment();
            ch.textContent.split(/(\s+)/).forEach(tok => {
              if (/^\s*$/.test(tok)) {
                frag.appendChild(document.createTextNode(tok));
                return;
              }
              const w = document.createElement('span');
              w.className = 'w';
              w.textContent = tok;
              frag.appendChild(w);
            });
            node.replaceChild(frag, ch);
          } else if (ch.nodeType === 1) walk(ch);
        });
      };
      walk(man);
      gsap.to(man.querySelectorAll('.w'), {
        opacity: 1,
        stagger: .06,
        ease: 'none',
        scrollTrigger: {
          trigger: man,
          start: 'top 75%',
          end: 'bottom 40%',
          scrub: true
        }
      });
    }

    /* ---------- parallax on photo plates ---------- */
    document.querySelectorAll('.ph .prlx').forEach(p => {
      gsap.fromTo(p, {
        yPercent: -6
      }, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: p.closest('.ph'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    /* ---------- needs: horizontal drag of the rail ---------- */
    const track = document.getElementById('ntrack');
    const rail = track.parentElement;
    if (innerWidth > 1080) {
      const dist = () => track.scrollWidth - rail.clientWidth + parseFloat(getComputedStyle(track).paddingLeft);
      gsap.to(track, {
        x: () => -Math.max(0, dist()),
        ease: 'none',
        scrollTrigger: {
          trigger: '#needs',
          start: 'top top',
          end: () => '+=' + Math.max(600, dist()),
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true
        }
      });
    }

    /* ---------- closing heading ---------- */
    gsap.from('#close h2', {
      scale: .95,
      ease: 'none',
      scrollTrigger: {
        trigger: '#close',
        start: 'top bottom',
        end: 'center 60%',
        scrub: true
      }
    });
  } else {
    document.querySelectorAll('.rv').forEach(el => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('#faq .item').forEach(item => {
    const btn = item.querySelector('.q'),
      body = item.querySelector('.a');
    btn.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      if (hasGsap && !reduced) gsap.to(body, {
        height: open ? 'auto' : 0,
        duration: .55,
        ease: 'power3.inOut'
      });else body.style.height = open ? 'auto' : '0';
    });
  });

  /* ---------- youth signup ---------- */
  const toast = document.getElementById('toast');
  document.getElementById('loopform').addEventListener('submit', e => {
    e.preventDefault();
    toast.textContent = 'You\u2019re in the loop. See you at the next event.';
    if (hasGsap) {
      gsap.timeline().to(toast, {
        opacity: 1,
        y: 0,
        duration: .5,
        ease: 'power3.out'
      }).to(toast, {
        opacity: 0,
        y: 16,
        duration: .5,
        delay: 3
      });
    } else {
      toast.style.opacity = 1;
      setTimeout(() => toast.style.opacity = 0, 3000);
    }
    e.target.reset();
  });

  /* ---------- cursor + magnetic pills ---------- */
  const cur = document.getElementById('cur');
  if (fine && hasGsap) {
    addEventListener('mousemove', e => gsap.to(cur, {
      x: e.clientX,
      y: e.clientY,
      duration: .3,
      ease: 'power3.out'
    }));
    document.querySelectorAll('a, button, .story .ph').forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(cur, {
        scale: 3.2,
        duration: .3
      }));
      el.addEventListener('mouseleave', () => gsap.to(cur, {
        scale: 1,
        duration: .3
      }));
    });
    if (!reduced) document.querySelectorAll('.pill').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - r.left - r.width / 2) * .22,
          y: (e.clientY - r.top - r.height / 2) * .3,
          duration: .4,
          ease: 'power3.out'
        });
      });
      el.addEventListener('mouseleave', () => gsap.to(el, {
        x: 0,
        y: 0,
        duration: .6,
        ease: 'elastic.out(1,.55)'
      }));
    });
  } else if (cur) cur.remove();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website-v3/site.js", error: String((e && e.message) || e) }); }

// ui_kits/website/Careers.jsx
try { (() => {
const {
  Section,
  SectionHeading,
  Card,
  Button,
  Badge,
  Tabs,
  Icon,
  QuoteBlock,
  Accordion
} = window.DLifeDesignSystem_618de9;
const TRACKS = {
  new: {
    label: "New to advising",
    lead: "Twelve months of structured mentorship — licensing support, case observation, then your first reviews with a senior adviser beside you.",
    points: ["Licensing and exam support", "Weekly case clinics", "Shadow 20 client reviews before running one", "Salary support in months 1–6"]
  },
  experienced: {
    label: "Experienced adviser",
    lead: "Bring your book. Keep your clients. Trade the product-push culture for case design, compliance and marketing that actually work.",
    points: ["In-house case design team", "Compliance handled centrally", "Marketing and content support", "Transparent commission split"]
  },
  leadership: {
    label: "Team leadership",
    lead: "Build and mentor a unit while keeping your own client work. DVA is the programme that gets you there.",
    points: ["DVA leadership track", "Recruitment and onboarding support", "Practice management coaching", "Profit share at unit level"]
  }
};
const ROLES = [{
  title: "Financial Adviser (Kuala Lumpur)",
  type: "Full time",
  place: "KL / hybrid",
  status: "Open"
}, {
  title: "Financial Adviser (Penang)",
  type: "Full time",
  place: "Penang",
  status: "Open"
}, {
  title: "Client Service Executive",
  type: "Full time",
  place: "KL office",
  status: "Open"
}, {
  title: "Marketing Executive (Content)",
  type: "Contract",
  place: "Remote, MY",
  status: "Closing soon"
}];
const CAREER_FAQ = [{
  question: "Do I need a licence before applying?",
  answer: "No. If you are new to the industry we support you through the exams and the licensing process."
}, {
  question: "Is this a salaried role?",
  answer: "There is salary support in the first six months while your book builds, then a transparent commission structure."
}, {
  question: "What is DVA?",
  answer: "The D'life adviser development programme — the internal track for advisers moving into case leadership and mentoring. (Programme name taken from the brand notes; expand this copy once the official description is available.)"
}];
function CareersHero({
  onApply
}) {
  return /*#__PURE__*/React.createElement(Section, {
    tone: "teal",
    innerStyle: {
      display: "grid",
      gridTemplateColumns: "1.1fr .9fr",
      gap: "var(--space-16)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    onDark: true,
    level: 1,
    size: "h1",
    eyebrow: "Careers at D\u2019life",
    title: "Learn the craft before you learn the pitch",
    lead: "We hire people who would rather explain a policy properly than close a sale quickly \u2014 and we train them for years, not weeks."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      marginTop: "var(--space-6)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconRight: "arrow-right",
    onClick: onApply
  }, "Apply now"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "onDark",
    href: "#roles"
  }, "See open roles"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "4 / 3",
      borderRadius: "var(--radius-xl)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "dl-careers",
    shape: "rect",
    placeholder: "Team at work \u2014 office, daylight"
  })));
}
function TrackPicker() {
  const [track, setTrack] = React.useState("new");
  const t = TRACKS[track];
  return /*#__PURE__*/React.createElement(Section, {
    tone: "ivory"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Development tracks",
    title: "Three ways in",
    style: {
      marginBottom: "var(--space-8)"
    }
  }), /*#__PURE__*/React.createElement(Tabs, {
    tabs: Object.entries(TRACKS).map(([id, v]) => ({
      value: id,
      label: v.label
    })),
    value: track,
    onChange: setTrack
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: ".9fr 1.1fr",
      gap: "var(--space-16)",
      marginTop: "var(--space-10)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--size-lead)",
      lineHeight: "var(--lh-lead)",
      color: "var(--text-muted)"
    }
  }, t.lead), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-4)"
    }
  }, t.points.map(p => /*#__PURE__*/React.createElement("span", {
    key: p,
    style: {
      display: "flex",
      gap: "var(--space-3)",
      alignItems: "flex-start",
      fontSize: "var(--size-body-sm)",
      color: "var(--text-body)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "circle-check",
    size: 18,
    color: "var(--copper)",
    style: {
      marginTop: "2px"
    }
  }), " ", p)))));
}
function Roles({
  onApply
}) {
  return /*#__PURE__*/React.createElement(Section, {
    tone: "cream",
    id: "roles"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Open roles",
    title: "Where we need people now",
    style: {
      marginBottom: "var(--space-10)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, ROLES.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.title,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-6)",
      padding: "var(--space-6) 0",
      borderTop: i === 0 ? "1px solid var(--divider-warm)" : "none",
      borderBottom: "1px solid var(--divider-warm)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "var(--size-h4)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-heading)"
    }
  }, r.title), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "var(--space-5)",
      fontSize: "var(--size-caption)",
      color: "var(--text-quiet)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: "6px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 14
  }), " ", r.type), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: "6px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 14
  }), " ", r.place))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: r.status === "Open" ? "success" : "warning"
  }, r.status), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    iconRight: "arrow-right",
    onClick: onApply
  }, "Apply"))))));
}
function CareersVoice() {
  return /*#__PURE__*/React.createElement(Section, {
    tone: "ivory",
    innerStyle: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-16)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(QuoteBlock, {
    quote: "I spent two years watching reviews before I ran one. It is the reason clients trust me now.",
    name: "Adviser, third year",
    role: "Kuala Lumpur"
  }), /*#__PURE__*/React.createElement(Accordion, {
    items: CAREER_FAQ,
    defaultOpen: null
  }));
}
function Careers({
  onApply
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(CareersHero, {
    onApply: onApply
  }), /*#__PURE__*/React.createElement(TrackPicker, null), /*#__PURE__*/React.createElement(Roles, {
    onApply: onApply
  }), /*#__PURE__*/React.createElement(CareersVoice, null), /*#__PURE__*/React.createElement(Section, {
    tone: "dark",
    tight: true,
    innerStyle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-10)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    onDark: true,
    size: "h3",
    eyebrow: "Not sure yet?",
    title: "Come and sit in on a case clinic"
  }), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconRight: "arrow-right",
    onClick: onApply
  }, "Request an invitation")));
}
Object.assign(window, {
  Careers,
  TRACKS,
  ROLES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Careers.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Contact.jsx
try { (() => {
const {
  Section,
  SectionHeading,
  Button,
  Input,
  Textarea,
  Select,
  RadioGroup,
  Checkbox,
  Icon,
  Card
} = window.DLifeDesignSystem_618de9;
function ContactDetails() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-darkest)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--space-8)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    onDark: true,
    size: "h3",
    eyebrow: "Direct",
    title: "Reach us however suits you"
  }), [{
    icon: "phone",
    label: "03&ndash;7710 2288",
    note: "Mon&ndash;Fri, 9am&ndash;6pm"
  }, {
    icon: "message-circle",
    label: "WhatsApp an adviser",
    note: "Replies within one working day"
  }, {
    icon: "mail",
    label: "hello@dlife.com.my",
    note: "For documents and reviews"
  }, {
    icon: "map-pin",
    label: "Bangsar, Kuala Lumpur",
    note: "Visits by appointment"
  }].map(r => /*#__PURE__*/React.createElement("div", {
    key: r.label,
    style: {
      display: "flex",
      gap: "var(--space-4)",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.icon,
    size: 20,
    color: "var(--sand)",
    style: {
      marginTop: "2px"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "2px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-body-sm)",
      color: "var(--text-on-dark)"
    },
    dangerouslySetInnerHTML: {
      __html: r.label
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-caption)",
      color: "var(--text-on-dark-muted)"
    },
    dangerouslySetInnerHTML: {
      __html: r.note
    }
  })))));
}
function Contact({
  onSubmitted
}) {
  const [how, setHow] = React.useState("call");
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Section, {
    tone: "ivory",
    innerStyle: {
      display: "grid",
      gridTemplateColumns: "1.15fr .85fr",
      gap: "var(--space-16)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    level: 1,
    size: "h1",
    eyebrow: "Contact",
    title: "Tell us what you already hold",
    lead: "Thirty minutes, no obligation. You leave with a written summary of what your current cover does and does not do."
  }), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onSubmitted();
    },
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Full name",
    placeholder: "e.g. Tan Wei Ming",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Phone",
    icon: "phone",
    placeholder: "012 345 6789",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    icon: "mail",
    style: {
      gridColumn: "span 2"
    }
  }), /*#__PURE__*/React.createElement(Select, {
    label: "What is this about?",
    placeholder: "Choose one",
    style: {
      gridColumn: "span 2"
    },
    options: ["A policy review", "New cover for my family", "Business continuity", "Retirement income", "Careers at D'life", "Something else"]
  }), /*#__PURE__*/React.createElement(Textarea, {
    label: "Anything we should read first?",
    rows: 3,
    placeholder: "A few lines is enough.",
    style: {
      gridColumn: "span 2"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "span 2",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-caption)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-body)"
    }
  }, "How should we reply?"), /*#__PURE__*/React.createElement(RadioGroup, {
    name: "how",
    direction: "row",
    value: how,
    onChange: setHow,
    options: [{
      value: "call",
      label: "A call"
    }, {
      value: "whatsapp",
      label: "WhatsApp"
    }, {
      value: "email",
      label: "Email"
    }]
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Send me the monthly policy-guidance note"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "span 2",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-6)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    size: "lg",
    iconRight: "arrow-right"
  }, "Send request"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-caption)",
      color: "var(--text-quiet)"
    }
  }, "We never share your details with insurers before you agree.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--grid-gap)"
    }
  }, /*#__PURE__*/React.createElement(ContactDetails, null), /*#__PURE__*/React.createElement(Card, {
    surface: "sand",
    icon: "clock",
    eyebrow: "Response time",
    title: "One working day"
  }, "Urgent claim support is same-day \u2014 call the office line and say it is a claim."))));
}
Object.assign(window, {
  Contact
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
const {
  Wordmark,
  Icon,
  IconButton
} = window.DLifeDesignSystem_618de9;
const FOOTER_COLS = [{
  title: "Advice",
  links: ["Protection review", "Savings & goals", "Retirement planning", "Business continuity"]
}, {
  title: "D'life",
  links: ["Our approach", "Founder story", "Careers", "DVA"]
}, {
  title: "Community",
  links: ["Youth community", "Policy guidance notes", "FAQ", "Contact"]
}];
function Footer({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--charcoal)",
      color: "var(--text-on-dark)",
      paddingBlock: "var(--space-20) var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--content-max)",
      margin: "0 auto",
      paddingInline: "var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.4fr repeat(3,1fr)",
      gap: "var(--space-12)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 28,
    tone: "light",
    tagline: "Financial advisory"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--size-body-sm)",
      lineHeight: "var(--lh-body)",
      color: "var(--text-on-dark-muted)",
      maxWidth: "34ch"
    }
  }, "Licensed financial advisers based in Kuala Lumpur, working with families and business owners across Malaysia."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "message-circle",
    label: "WhatsApp",
    variant: "onDark",
    size: "sm"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "mail",
    label: "Email",
    variant: "onDark",
    size: "sm"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "globe",
    label: "Website",
    variant: "onDark",
    size: "sm"
  }))), FOOTER_COLS.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-label)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--sand)"
    }
  }, col.title), col.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => {
      e.preventDefault();
      if (onNavigate) onNavigate("home");
    },
    style: {
      fontSize: "var(--size-body-sm)",
      color: "var(--text-on-dark-muted)",
      borderBottom: "none"
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-16)",
      paddingTop: "var(--space-6)",
      borderTop: "1px solid var(--border-on-dark)",
      display: "flex",
      justifyContent: "space-between",
      gap: "var(--space-6)",
      fontSize: "var(--size-caption)",
      color: "var(--text-on-dark-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 D\u2019life. All rights reserved."), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "inherit",
      borderBottom: "none"
    }
  }, "Privacy"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "inherit",
      borderBottom: "none"
    }
  }, "Terms"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 14
  }), " Kuala Lumpur")))));
}
Object.assign(window, {
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
const {
  Section,
  SectionHeading,
  Card,
  Button,
  IconButton,
  Icon,
  Tag,
  Accordion,
  QuoteBlock,
  Badge
} = window.DLifeDesignSystem_618de9;
const LIFE_STAGES = [{
  id: "family",
  label: "Young family",
  icon: "baby"
}, {
  id: "owner",
  label: "Business owner",
  icon: "briefcase-business"
}, {
  id: "midlife",
  label: "Mid-career",
  icon: "trending-up"
}, {
  id: "retire",
  label: "Near retirement",
  icon: "leaf"
}];
const NEEDS = {
  family: [{
    icon: "umbrella",
    eyebrow: "Protection",
    title: "Cover the years they still need you",
    body: "Income replacement sized to the mortgage, the school fees and the years in between."
  }, {
    icon: "piggy-bank",
    eyebrow: "Savings",
    title: "One account per promise",
    body: "Education, the next home, the family fund — each with a date and a number."
  }, {
    icon: "file-text",
    eyebrow: "Housekeeping",
    title: "Papers your spouse can find",
    body: "A one-page summary of what you hold and who to call."
  }],
  owner: [{
    icon: "handshake",
    eyebrow: "Continuity",
    title: "A business that survives you",
    body: "Buy-sell funding and key-person cover written before it is needed."
  }, {
    icon: "wallet",
    eyebrow: "Separation",
    title: "Company money, family money",
    body: "Draw a line between the two so one bad quarter never reaches the house."
  }, {
    icon: "shield-check",
    eyebrow: "Protection",
    title: "Cover the guarantees you signed",
    body: "Personal guarantees are personal risk. We size cover to the paperwork."
  }],
  midlife: [{
    icon: "trending-up",
    eyebrow: "Review",
    title: "Check what the last decade changed",
    body: "Salary, dependants and debt all moved. Most plans did not."
  }, {
    icon: "graduation-cap",
    eyebrow: "Education",
    title: "Fees that arrive on schedule",
    body: "Work backwards from the intake year, not from what is spare."
  }, {
    icon: "clock",
    eyebrow: "Retirement",
    title: "The twenty-year question",
    body: "How much income, for how long, from which pot."
  }],
  retire: [{
    icon: "leaf",
    eyebrow: "Income",
    title: "Turn savings into a monthly income",
    body: "A withdrawal order that survives a bad market year."
  }, {
    icon: "house",
    eyebrow: "Legacy",
    title: "Pass on the house, not the argument",
    body: "Nomination, trust and will, checked against each other."
  }, {
    icon: "badge-check",
    eyebrow: "Medical",
    title: "Cover that still works at 70",
    body: "Renewal terms and limits read line by line, before you need them."
  }]
};
const STATS = [{
  value: "15 yrs",
  label: "Advising Malaysian families"
}, {
  value: "1,800+",
  label: "Households under review"
}, {
  value: "RM 42m",
  label: "Claims supported to payout"
}, {
  value: "94%",
  label: "Clients who stay past year five"
}];
const GUIDANCE = [{
  question: "What a policy review actually looks at",
  answer: "Sum assured against current commitments, exclusions you may have outgrown, premium terms at renewal, and whether two policies are quietly paying for the same thing."
}, {
  question: "When to keep an older policy",
  answer: "Older medical plans sometimes carry terms no longer sold. We tell you plainly when the right answer is to leave it alone."
}, {
  question: "How we are paid",
  answer: "Commission from the insurer, disclosed in writing before anything is signed. If a plan is not right for you, saying so costs us the sale and keeps the relationship."
}];
const FAQS = [{
  question: "Is the first conversation free?",
  answer: "Yes — about thirty minutes, in person or over a call. You leave with a written summary whether or not you go further."
}, {
  question: "Do I have to switch what I already hold?",
  answer: "Rarely. Most reviews end with two or three adjustments, not a clean sweep."
}, {
  question: "Can you work with my spouse's adviser?",
  answer: "Yes. We are happy to co-ordinate so the household plan reads as one document."
}, {
  question: "How often will I hear from you?",
  answer: "A short note each quarter, a review when your life changes, and a same-day reply when you need one."
}];
function Hero({
  onEnquire
}) {
  return /*#__PURE__*/React.createElement(Section, {
    tone: "ivory",
    innerStyle: {
      display: "grid",
      gridTemplateColumns: "1.05fr .95fr",
      gap: "var(--space-16)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dl-reveal"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    level: 1,
    size: "display",
    eyebrow: "Financial advisory, Kuala Lumpur",
    title: "Protect what you\u2019re building",
    lead: "A conversation first, then a plan you can read in one sitting. We advise Malaysian families and business owners on cover, savings and the years after work."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      marginTop: "var(--space-8)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconRight: "arrow-right",
    onClick: onEnquire
  }, "Book a conversation"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    href: "#approach"
  }, "See how it works")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-6)",
      marginTop: "var(--space-10)",
      flexWrap: "wrap",
      fontSize: "var(--size-caption)",
      color: "var(--text-quiet)"
    }
  }, ["Licensed advisers", "No obligation review", "Written recommendations"].map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15,
    color: "var(--copper)"
  }), " ", t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "4 / 5",
      borderRadius: "var(--radius-xl)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "dl-hero",
    shape: "rect",
    placeholder: "Hero portrait \u2014 adviser with a client, warm daylight"
  })));
}
function Selector({
  stage,
  setStage
}) {
  return /*#__PURE__*/React.createElement(Section, {
    tone: "cream",
    tight: true,
    innerStyle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-10)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "var(--size-h4)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-heading)"
    }
  }, "Where are you right now?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      flexWrap: "wrap"
    }
  }, LIFE_STAGES.map(s => /*#__PURE__*/React.createElement(Tag, {
    key: s.id,
    icon: s.icon,
    selected: stage === s.id,
    onClick: () => setStage(s.id)
  }, s.label))));
}
function TrustStrip() {
  return /*#__PURE__*/React.createElement(Section, {
    tone: "green",
    tight: true,
    innerStyle: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--space-8)"
    }
  }, STATS.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "34px",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-on-dark)",
      lineHeight: 1.1
    }
  }, s.value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-caption)",
      color: "var(--text-on-dark-muted)",
      maxWidth: "22ch"
    }
  }, s.label))));
}
function LifeNeeds({
  stage
}) {
  const label = (LIFE_STAGES.find(s => s.id === stage) || LIFE_STAGES[0]).label.toLowerCase();
  return /*#__PURE__*/React.createElement(Section, {
    tone: "ivory",
    id: "approach"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Life needs",
    title: "Start where you are",
    lead: "What we usually look at first for a " + label + " client."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "var(--grid-gap)",
      marginTop: "var(--space-12)"
    }
  }, NEEDS[stage].map(n => /*#__PURE__*/React.createElement(Card, {
    key: n.title,
    icon: n.icon,
    eyebrow: n.eyebrow,
    title: n.title,
    interactive: true
  }, n.body))));
}
function GuidanceBand() {
  return /*#__PURE__*/React.createElement(Section, {
    tone: "cream",
    innerStyle: {
      display: "grid",
      gridTemplateColumns: ".85fr 1.15fr",
      gap: "var(--space-16)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Policy guidance",
    title: "Plain answers before the paperwork"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    iconRight: "arrow-right",
    style: {
      marginTop: "var(--space-4)"
    }
  }, "Read the guidance notes")), /*#__PURE__*/React.createElement(Accordion, {
    items: GUIDANCE
  }));
}
function FounderSplit() {
  return /*#__PURE__*/React.createElement(Section, {
    tone: "ivory",
    innerStyle: {
      display: "grid",
      gridTemplateColumns: ".9fr 1.1fr",
      gap: "var(--space-16)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "3 / 4",
      borderRadius: "var(--radius-xl)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "dl-founder",
    shape: "rect",
    placeholder: "Founder portrait \u2014 seated, natural light"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "teal",
    subtle: true
  }, "Founder"), /*#__PURE__*/React.createElement(QuoteBlock, {
    size: "lg",
    quote: "We measure ourselves by the claims our clients never have to worry about.",
    name: "Founder, D\u2019life",
    role: "Licensed financial adviser since 2011"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--size-body)",
      lineHeight: "var(--lh-body)",
      color: "var(--text-muted)",
      maxWidth: "var(--measure-body)"
    }
  }, "D\u2019life began with one belief: most people are not underinsured because they are careless, but because nobody explained the trade-offs in language they could hold on to. That is still the whole job.")));
}
function VideoPanel({
  onPlay
}) {
  return /*#__PURE__*/React.createElement(Section, {
    tone: "dark",
    innerStyle: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-16)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "16 / 10",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "dl-video",
    shape: "rect",
    placeholder: "Client film still"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--scrim-bottom)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "var(--space-6)",
      bottom: "var(--space-6)",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "play",
    label: "Play the film",
    variant: "solid",
    size: "lg",
    onClick: onPlay
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ivory)",
      fontSize: "var(--size-body-sm)"
    }
  }, "3 min \xB7 A claim, from call to payout"))), /*#__PURE__*/React.createElement(SectionHeading, {
    onDark: true,
    eyebrow: "Proof, not promises",
    title: "What it looks like when a plan is actually needed",
    lead: "A family walks through the week their claim was filed \u2014 what was in place, what they had to do, and how long the money took."
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "onDark",
    iconRight: "arrow-right",
    style: {
      marginTop: "var(--space-4)"
    }
  }, "More client stories")));
}
function CareersTeaser({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement(Section, {
    tone: "ivory"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: "var(--space-10)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Careers",
    title: "Build an advisory practice, properly",
    lead: "Structured mentorship, a real client base, and no pressure to sell what you would not buy."
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconRight: "arrow-right",
    onClick: () => onNavigate("careers")
  }, "See open roles")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "var(--grid-gap)",
      marginTop: "var(--space-12)"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    surface: "white",
    icon: "users",
    eyebrow: "Year one",
    title: "Mentored from the first meeting"
  }, "You sit in on reviews long before you run them."), /*#__PURE__*/React.createElement(Card, {
    surface: "white",
    icon: "compass",
    eyebrow: "Year two",
    title: "Your own book, our support"
  }, "Case design, compliance and marketing stay in-house."), /*#__PURE__*/React.createElement(Card, {
    surface: "white",
    icon: "lightbulb",
    eyebrow: "Year three",
    title: "Lead a team, keep advising"
  }, "Advisers here grow without leaving the client work behind.")));
}
function DvaTeaser({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement(Section, {
    tone: "green",
    tight: true,
    innerStyle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-10)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    onDark: true,
    eyebrow: "DVA",
    title: "The D\u2019life adviser programme",
    lead: "A structured path for advisers who want the craft, not just the licence.",
    size: "h3"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "onDark",
    size: "lg",
    iconRight: "arrow-right",
    onClick: () => onNavigate("careers")
  }, "Learn about DVA"));
}
function YouthTeaser({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement(Section, {
    tone: "sand"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: "var(--space-10)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Youth community",
    title: "Where the next generation learns money",
    lead: "Free workshops for students and first-jobbers \u2014 budgeting, insurance basics, and the questions to ask before signing anything."
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconRight: "arrow-right",
    onClick: () => onNavigate("youth")
  }, "Join a session")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "var(--grid-gap)",
      marginTop: "var(--space-12)"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    surface: "ivory",
    icon: "graduation-cap",
    eyebrow: "Campus",
    title: "Money basics, no jargon"
  }, "Two hours, four ideas, zero product talk."), /*#__PURE__*/React.createElement(Card, {
    surface: "ivory",
    icon: "users",
    eyebrow: "Mentoring",
    title: "Ask an adviser"
  }, "Monthly open table for first-jobbers."), /*#__PURE__*/React.createElement(Card, {
    surface: "ivory",
    icon: "calendar-days",
    eyebrow: "Next session",
    title: "14 August, Kuala Lumpur"
  }, "Free, 40 seats, register in advance.")));
}
function Faq() {
  return /*#__PURE__*/React.createElement(Section, {
    tone: "ivory",
    narrow: true
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    eyebrow: "FAQ",
    title: "Questions we hear most",
    style: {
      marginBottom: "var(--space-12)"
    }
  }), /*#__PURE__*/React.createElement(Accordion, {
    items: FAQS,
    defaultOpen: null
  }));
}
function ClosingCta({
  onEnquire
}) {
  return /*#__PURE__*/React.createElement(Section, {
    tone: "dark",
    innerStyle: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    onDark: true,
    align: "center",
    size: "h1",
    eyebrow: "Next step",
    title: "Thirty minutes, no obligation",
    lead: "Tell us what you already hold. We will tell you what it covers, in writing."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      flexWrap: "wrap",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconRight: "arrow-right",
    onClick: onEnquire
  }, "Book a conversation"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "onDark",
    iconLeft: "phone"
  }, "03\u20137710 2288")));
}
function Home({
  onEnquire,
  onNavigate,
  onPlay
}) {
  const [stage, setStage] = React.useState("family");
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, {
    onEnquire: onEnquire
  }), /*#__PURE__*/React.createElement(Selector, {
    stage: stage,
    setStage: setStage
  }), /*#__PURE__*/React.createElement(TrustStrip, null), /*#__PURE__*/React.createElement(LifeNeeds, {
    stage: stage
  }), /*#__PURE__*/React.createElement(GuidanceBand, null), /*#__PURE__*/React.createElement(FounderSplit, null), /*#__PURE__*/React.createElement(VideoPanel, {
    onPlay: onPlay
  }), /*#__PURE__*/React.createElement(CareersTeaser, {
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(DvaTeaser, {
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(YouthTeaser, {
    onNavigate: onNavigate
  }), /*#__PURE__*/React.createElement(Faq, null), /*#__PURE__*/React.createElement(ClosingCta, {
    onEnquire: onEnquire
  }));
}
Object.assign(window, {
  Home,
  LIFE_STAGES,
  NEEDS,
  STATS,
  GUIDANCE,
  FAQS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Nav.jsx
try { (() => {
const {
  Wordmark,
  Button,
  IconButton,
  Icon
} = window.DLifeDesignSystem_618de9;
const NAV_LINKS = [{
  id: "home",
  label: "Our approach"
}, {
  id: "careers",
  label: "Careers"
}, {
  id: "youth",
  label: "Youth community"
}, {
  id: "contact",
  label: "Contact"
}];
function Nav({
  route,
  onNavigate,
  onEnquire
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 30,
      background: "rgba(246,241,232,.92)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid var(--border-soft)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--content-max)",
      margin: "0 auto",
      paddingInline: "var(--gutter)",
      height: 76,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate("home");
    },
    style: {
      borderBottom: "none",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 25,
    tagline: "Financial advisory"
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-8)"
    }
  }, NAV_LINKS.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    href: "#" + l.id,
    onClick: e => {
      e.preventDefault();
      onNavigate(l.id);
    },
    style: {
      fontSize: "var(--size-body-sm)",
      fontWeight: route === l.id ? "var(--weight-medium)" : "var(--weight-regular)",
      color: route === l.id ? "var(--text-heading)" : "var(--text-muted)",
      borderBottom: "1px solid " + (route === l.id ? "var(--copper)" : "transparent"),
      paddingBottom: "3px"
    }
  }, l.label)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      fontSize: "var(--size-caption)",
      color: "var(--text-quiet)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 15
  }), " 03\u20137710 2288"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: onEnquire
  }, "Book a conversation")))));
}
Object.assign(window, {
  Nav,
  NAV_LINKS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Youth.jsx
try { (() => {
const {
  Section,
  SectionHeading,
  Card,
  Button,
  Badge,
  Icon,
  Input,
  Select,
  Checkbox,
  QuoteBlock
} = window.DLifeDesignSystem_618de9;
const SESSIONS = [{
  date: "14 Aug",
  title: "Money basics for first-jobbers",
  place: "KL &mdash; Bangsar",
  seats: "40 seats"
}, {
  date: "28 Aug",
  title: "Insurance without the jargon",
  place: "Online",
  seats: "Open"
}, {
  date: "11 Sep",
  title: "Your first RM10,000",
  place: "Penang",
  seats: "24 seats"
}];
function YouthHero() {
  return /*#__PURE__*/React.createElement(Section, {
    tone: "sand",
    innerStyle: {
      display: "grid",
      gridTemplateColumns: "1.05fr .95fr",
      gap: "var(--space-16)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    level: 1,
    size: "h1",
    eyebrow: "D\u2019life youth community",
    title: "Learn money before it costs you",
    lead: "Free, product-free workshops for students and people in their first jobs. Run by advisers, on evenings and weekends."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      marginTop: "var(--space-6)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    iconRight: "arrow-right",
    href: "#register"
  }, "Join a session"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    href: "#sessions"
  }, "See the calendar"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "4 / 3",
      borderRadius: "var(--radius-xl)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "dl-youth",
    shape: "rect",
    placeholder: "Workshop photo \u2014 students around a table"
  })));
}
function Programme() {
  return /*#__PURE__*/React.createElement(Section, {
    tone: "ivory"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "What we cover",
    title: "Four ideas, two hours",
    lead: "No products, no forms, no follow-up call unless you ask for one."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--grid-gap)",
      marginTop: "var(--space-12)"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    icon: "wallet",
    eyebrow: "One",
    title: "Where your money goes"
  }, "Track a month honestly before changing anything."), /*#__PURE__*/React.createElement(Card, {
    icon: "umbrella",
    eyebrow: "Two",
    title: "What insurance is for"
  }, "Cover the disasters, not the inconveniences."), /*#__PURE__*/React.createElement(Card, {
    icon: "piggy-bank",
    eyebrow: "Three",
    title: "Saving with a date"
  }, "Goals need a deadline or they lose to today."), /*#__PURE__*/React.createElement(Card, {
    icon: "file-text",
    eyebrow: "Four",
    title: "Reading the fine print"
  }, "The five clauses worth finding in any policy.")));
}
function Sessions() {
  return /*#__PURE__*/React.createElement(Section, {
    tone: "cream",
    id: "sessions"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Calendar",
    title: "Upcoming sessions",
    style: {
      marginBottom: "var(--space-10)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "var(--grid-gap)"
    }
  }, SESSIONS.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.title,
    style: {
      background: "var(--surface-raised)",
      border: "1px solid var(--border-soft)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--space-6)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "var(--size-h4)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--copper)"
    },
    dangerouslySetInnerHTML: {
      __html: s.date
    }
  }), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, s.seats)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "var(--size-h4)",
      fontWeight: "var(--weight-medium)",
      color: "var(--text-heading)",
      lineHeight: "var(--lh-heading)"
    }
  }, s.title), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      fontSize: "var(--size-caption)",
      color: "var(--text-quiet)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 14
  }), " ", /*#__PURE__*/React.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: s.place
    }
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    iconRight: "arrow-right",
    style: {
      marginTop: "auto",
      paddingTop: "var(--space-3)"
    }
  }, "Register")))));
}
function Register({
  onRegistered
}) {
  return /*#__PURE__*/React.createElement(Section, {
    tone: "ivory",
    id: "register",
    innerStyle: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-16)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Register",
    title: "Save a seat",
    lead: "We will send a reminder two days before. Nothing else."
  }), /*#__PURE__*/React.createElement(QuoteBlock, {
    quote: "I came for the free food and left with a budget that actually works.",
    name: "Nurul, 24",
    role: "August session"
  })), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onRegistered();
    },
    style: {
      background: "var(--surface-card)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--space-8)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    placeholder: "Your name",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    icon: "mail",
    required: true
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Session",
    placeholder: "Choose a session",
    options: SESSIONS.map(s => s.title)
  }), /*#__PURE__*/React.createElement(Checkbox, {
    label: "I am a student",
    description: "Student sessions include a campus certificate."
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    fullWidth: true,
    iconRight: "arrow-right"
  }, "Save my seat")));
}
function Youth({
  onRegistered
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(YouthHero, null), /*#__PURE__*/React.createElement(Programme, null), /*#__PURE__*/React.createElement(Sessions, null), /*#__PURE__*/React.createElement(Register, {
    onRegistered: onRegistered
  }));
}
Object.assign(window, {
  Youth,
  SESSIONS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Youth.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ICON_PATHS = __ds_scope.ICON_PATHS;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.QuoteBlock = __ds_scope.QuoteBlock;

__ds_ns.Section = __ds_scope.Section;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.WhatsAppFloat = __ds_scope.WhatsAppFloat;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.AccordionItem = __ds_scope.AccordionItem;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
