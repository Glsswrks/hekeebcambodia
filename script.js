/* ---------- Contact constants ---------- */
const CONTACT_WHATSAPP_NUMBER = "85514975307"; // update if needed
const TELEGRAM_HANDLE = "glsswrksGG";          // update if needed
const DISCORD_HANDLE = "Kokushibo#4764";

/* ---------- Centralized product data (shared across pages) ----------
   Add more products here. Ensure each product has a unique id if possible.
*/
const products = [
  {
    id: "atk-edge60he",
    title: "ATK EDGE60 HE ULTIMATE",
    short: "ATK EDGE 60HE ULTIMATE Esports Magnetic Keyboard - LEVIATAN Collaboration",
    price: 229,
    layout: "60",
    available: false,
    images: [
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/2_27ffe2b5-f717-4c2f-940c-959572442aa1.jpg",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/1_f9f267de-73a2-46f0-b918-9d35850c4593.jpg",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/ATK_EDGE_60_HE_Keyboard.jpg",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/edge60-translucent-keycap-closeup.jpg",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/edge60-with-partial-transparent-keycaps.jpg",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/edge60-with-transparent-keycaps.jpg"
    ],
    specs: ["60% (61 keys)","Full Aluminum CNC case","PBT dye‑sublimation keycaps","Hot‑swap / magnetic switches","8K Hz Polling rate","0.08ms Ultra Low Latency","256k scanning-rate","Precision 0.001mm","Super stable RT","32K N-Key Scanning-rate","2 Profile RT Button","Functions SOCD / DKS / RT / MT / TGL / Key remapping","Champion Preset","Cherry Profile Keycaps"]
  },
   {
      
    id: "made68pro",
    title: "MEELGEEK MADE68 PRO",
    short: "The MADE68 Pro goes beyond a simple keyboard. It's a truly modular experience, engineered with wireless freedom and MelGeek HIVE",
    price: 140,
    layout: "68",
    available: false,
    images: [
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/made68pro/MelGeek_MADE68_Pro_12.jpg",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/made68pro/MelGeek_MADE68_Pro_1.jpg",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/made68pro/MelGeek_MADE68_Pro_10.jpg",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/made68pro/MelGeek_MADE68_Pro_11.jpg",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/made68pro/MelGeek_MADE68_Pro_9.jpg",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/made68pro/MelGeek_MADE68_Pro_14.jpg"
    ],
    specs: ["68% (68 keys)","ABS + PC with Aluminum Alloy","ABS Double-Shot Keycaps","Hot‑swap / magnetic switches","8K Hz Polling rate","0.125ms Low Latency","256k scanning-rate","Zero Dead-Zone","Electric Light-Box","Precision 0.01mm","Functions SOCD / DKS / RT / MT / TGL / Key remapping","Wired Connection","Proprietary MCR original height profile"]
   },
   {
      
    id: "ace68turbo",
    title: "MCHOSE ACE68 TURBO",
    short: "MCHOSE Ace 68 Turbo – World's First 16K Polling Rate HE Aluminum Keyboard",
    price: 140,
    layout: "68",
    available: false,
    images: [
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68turbo/Dynamic_RGB_Lightbox_with_Music_Sync_on_Ace_68_Turbo.png",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68turbo/Multi-Function_Control_Knob_and_RT_Button_on_Ace_68_Turbo.png",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68turbo/31.png",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68turbo/22.png",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68turbo/Ace_68_Turbo_65_Hot-Swappable_Rapid_Trigger_Keyboard_1.jpg",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68turbo/Ace_68_Turbo_Keyboard_Structure_Layers_Aluminum_Plate_Foam_PCB2.png"
    ],
    specs: ["65% (68 keys)","Full Aluminum CNC","Hot‑swap / magnetic switches","16K/8K Hz Polling rate","0.06ms/0.125ms Ultra Low Latency","16k scanning-rate","Zero Dead-Zone","2/4 PCB Layers","Adaptive Dynamic Calibration 2.0","Electric Light-Box","Precision 0.01mm","3 Rapid-Trigger profile support","RT Button profile switch","Multi-Function Knob","Dual Drivers Support","16M ARGB, Music Rhythm 2.0, Aura Sync Lightning","Functions SOCD / DKS / RT / MT / TGL / Key remapping","Wired Connection","Proprietary MCR original height profile"]
   }
  // Add more product objects here
];

/* ---------- Helpers ---------- */
function getQueryParam(name){ return new URLSearchParams(window.location.search).get(name); }
function normalizePhone(num){ return String(num || '').replace(/\D/g,''); }
function whatsappLink(product){
  const base = `https://wa.me/${normalizePhone(CONTACT_WHATSAPP_NUMBER)}`;
  const title = product && product.title ? product.title : 'your product';
  const text = encodeURIComponent(`Hi, I'm interested in ${title}. Is it available?`);
  return `${base}?text=${text}`;
}
function telegramLink(){ return `https://t.me/${TELEGRAM_HANDLE}`; }
function productLink(id){
  const url = new URL('products.html', window.location.href);
  url.searchParams.set('id', id);
  return url.toString();
}

/* Dedupe helper: keeps first occurrence and renames duplicates so they still render */
function dedupeProducts(list){
  const map = new Map();
  const out = [];
  list.forEach((p) => {
    if(!p || !p.id) return;
    if(!map.has(p.id)){
      map.set(p.id, p);
      out.push(p);
    } else {
      let idx = 2;
      let newId = `${p.id}-${idx}`;
      while(map.has(newId)){
        idx++;
        newId = `${p.id}-${idx}`;
      }
      const copy = Object.assign({}, p, { id: newId });
      map.set(newId, copy);
      out.push(copy);
    }
  });
  const lookup = new Map(out.map(p => [p.id, p]));
  return { list: out, lookup };
}

/* Small escaping helpers */
function escapeHtml(str){
  if(!str) return '';
  return String(str).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
function escapeAttr(str){ return escapeHtml(str); }

/* ---------- Modal logic (contact) ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const contactLink = document.getElementById('contactLink');
  const modal = document.getElementById('contactModal');
  if(contactLink && modal){
    const closeBtn = modal.querySelector('.modal-close');

    contactLink.addEventListener('click', (e) => {
      e.preventDefault();
      modal.setAttribute('aria-hidden','false');
      closeBtn?.focus();
    });

    if(closeBtn){
      closeBtn.addEventListener('click', () => {
        modal.setAttribute('aria-hidden','true');
        contactLink.focus();
      });
    }

    modal.addEventListener('click', (e) => {
      if(e.target === modal) {
        modal.setAttribute('aria-hidden','true');
        contactLink.focus();
      }
    });

    window.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false'){
        modal.setAttribute('aria-hidden','true');
        contactLink.focus();
      }
    });
  }
});

/* ---------- Index page: render product cards ---------- */
function renderIndexCards(list){
  const grid = document.getElementById('productGrid');
  if(!grid) return;
  grid.innerHTML = '';

  const { list: normalized } = dedupeProducts(list);

  normalized.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'card';

    const availClass = p.available ? 'availability available' : 'availability unavailable';
    const availText = p.available ? 'Available' : 'Unavailable';
    const href = productLink(p.id);
    const cover = Array.isArray(p.images) && p.images.length ? p.images[0] : '';
    const firstSpec = Array.isArray(p.specs) && p.specs.length ? p.specs[0] : '';

    card.innerHTML = `
      <div class="card-image">
        <a class="card-link" href="${href}" aria-label="View ${escapeHtml(p.title || 'product')}">
          <img src="${escapeAttr(cover)}" alt="${escapeAttr(p.title || 'Product')}" loading="lazy">
        </a>
        <span class="price-badge">$${Number(p.price || 0)}</span>
      </div>
      <div class="card-body">
        <h4 class="card-title">
          <a class="card-title-link" href="${href}">${escapeHtml(p.title || '')}</a>
        </h4>
        <p class="muted card-desc">${escapeHtml(p.short || '')}</p>
        <div class="card-footer">
          <div class="specs-inline muted">${escapeHtml(p.layout || '')} • ${escapeHtml(firstSpec)}</div>
          <div class="availability-wrap">
            <span class="${availClass}">${availText}</span>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ---------- Carousel (shared) ---------- */
function createCarousel(images) {
  const wrapper = document.createElement('div');
  wrapper.className = 'carousel';
  const track = document.createElement('div');
  track.className = 'carousel-track';

  images.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Product image ${i+1}`;
    img.loading = 'lazy';
    slide.appendChild(img);
    track.appendChild(slide);
  });

  const btnLeft = document.createElement('button');
  btnLeft.className = 'carousel-btn left';
  btnLeft.setAttribute('aria-label','Previous image');
  btnLeft.innerHTML = '&#9664;';
  const btnRight = document.createElement('button');
  btnRight.className = 'carousel-btn right';
  btnRight.setAttribute('aria-label','Next image');
  btnRight.innerHTML = '&#9654;';

  const dots = document.createElement('div');
  dots.className = 'carousel-dots';
  images.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'carousel-dot';
    if (i === 0) d.classList.add('active');
    d.dataset.index = i;
    dots.appendChild(d);
  });

  wrapper.appendChild(track);
  wrapper.appendChild(btnLeft);
  wrapper.appendChild(btnRight);
  wrapper.appendChild(dots);

  let index = 0;
  let slidesCount = images.length;
  let currentTranslate = 0;
  let isDragging = false;
  let startX = 0;

  function update() {
    const width = wrapper.clientWidth || wrapper.getBoundingClientRect().width || 1;
    currentTranslate = -index * width;
    track.style.transform = `translateX(${currentTranslate}px)`;
    const allDots = dots.querySelectorAll('.carousel-dot');
    allDots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }
  function prev() { index = Math.max(0, index - 1); update(); }
  function next() { index = Math.min(slidesCount - 1, index + 1); update(); }

  btnLeft.addEventListener('click', prev);
  btnRight.addEventListener('click', next);

  dots.addEventListener('click', (e) => {
    const dot = e.target.closest('.carousel-dot');
    if (!dot) return;
    index = Number(dot.dataset.index);
    update();
  });

  const ro = new ResizeObserver(() => update());
  ro.observe(wrapper);

  track.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    isDragging = true;
    startX = e.touches[0].clientX;
    track.style.transition = 'none';
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - startX;
    track.style.transform = `translateX(${currentTranslate + dx}px)`;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = '';
    const dx = (e.changedTouches && e.changedTouches[0]) ? (e.changedTouches[0].clientX - startX) : 0;
    const width = wrapper.clientWidth || 1;
    if (dx > width * 0.2) index = Math.max(0, index - 1);
    else if (dx < -width * 0.2) index = Math.min(slidesCount - 1, index + 1);
    update();
  });

  let mouseDown = false;
  let mouseStartX = 0;
  track.addEventListener('mousedown', (e) => {
    mouseDown = true;
    mouseStartX = e.clientX;
    track.style.transition = 'none';
    e.preventDefault();
  });
  window.addEventListener('mousemove', (e) => {
    if (!mouseDown) return;
    const dx = e.clientX - mouseStartX;
    track.style.transform = `translateX(${currentTranslate + dx}px)`;
  });
  window.addEventListener('mouseup', (e) => {
    if (!mouseDown) return;
    mouseDown = false;
    track.style.transition = '';
    const dx = e.clientX - mouseStartX;
    const width = wrapper.clientWidth || 1;
    if (dx > width * 0.2) index = Math.max(0, index - 1);
    else if (dx < -width * 0.2) index = Math.min(slidesCount - 1, index + 1);
    update();
  });

  wrapper.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
  wrapper.tabIndex = 0;

  update();

  const slideImgs = track.querySelectorAll('img');
  slideImgs.forEach(img => {
    img.addEventListener('load', update);
    img.addEventListener('error', update);
  });

  return wrapper;
}

/* ---------- Product page: render detail ---------- */
function renderProductDetail(product){
  const container = document.getElementById('productContainer');
  if(!container) return;

  if(!product){
    container.innerHTML = '<div style="color:var(--muted)">Product not found. <a href="index.html">Back to shop</a></div>';
    return;
  }

  container.innerHTML = `
    <div class="product-image"></div>
    <div class="product-info">
      <h1>${escapeHtml(product.title || '')}</h1>
      <p class="muted">${escapeHtml(product.short || '')}</p>
      <div style="margin-top:12px;font-weight:700;color:var(--accent);font-size:1.25rem">$${Number(product.price || 0)}</div>
      <ul class="specs">${(Array.isArray(product.specs) ? product.specs : []).map(s=>`<li>• ${escapeHtml(s)}</li>`).join('')}</ul>
      <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
        <a class="btn primary" id="whatsappBtn" href="#" target="_blank" rel="noopener">Inquire on WhatsApp</a>
        <a class="btn" id="telegramBtn" href="#" target="_blank" rel="noopener">Inquire on Telegram</a>
        <div style="align-self:center;color:var(--muted)">Discord: <strong style="color:#fff">${escapeHtml(DISCORD_HANDLE)}</strong></div>
      </div>
      <p style="margin-top:12px;color:var(--muted)">Delivery is available in: <strong>Cambodia</strong>. Delivery fees apply.</p>
    </div>
  `;

  const imageContainer = container.querySelector('.product-image');
  const images = Array.isArray(product.images) && product.images.length ? product.images : [];
  const carousel = createCarousel(images);
  imageContainer.appendChild(carousel);

  const whatsappBtn = document.getElementById('whatsappBtn');
  const telegramBtn = document.getElementById('telegramBtn');
  if(whatsappBtn) whatsappBtn.href = whatsappLink(product);
  if(telegramBtn) telegramBtn.href = telegramLink();

  try { carousel.focus(); } catch(e){}
}

/* ---------- Horizontal scroller with pointer events + safe momentum ---------- */
function enableHorizontalScroller(selector){
  const grid = document.querySelector(selector);
  if(!grid) return;

  grid.style.overflowX = grid.style.overflowX || 'auto';
  grid.style.scrollBehavior = grid.style.scrollBehavior || 'smooth';
  grid.classList.remove('dragging');

  let isPointerDown = false;
  let startX = 0;
  let startScroll = 0;
  let lastX = 0;
  let lastTime = 0;
  let velocity = 0;
  let momentumId = null;

  function onPointerDown(e){
    if(e.pointerType === 'mouse' && e.button !== 0) return;
    isPointerDown = true;
    try { grid.setPointerCapture?.(e.pointerId); } catch(_) {}
    grid.classList.add('dragging');

    startX = e.clientX;
    startScroll = grid.scrollLeft;
    lastX = startX;
    lastTime = Date.now();
    velocity = 0;

    if(momentumId) { cancelAnimationFrame(momentumId); momentumId = null; }
  }

  function onPointerMove(e){
    if(!isPointerDown) return;
    const x = e.clientX;
    const dx = x - startX;
    grid.scrollLeft = startScroll - dx;

    const now = Date.now();
    const dt = Math.max(1, now - lastTime);
    velocity = (x - lastX) / dt;
    lastX = x;
    lastTime = now;
  }

  function onPointerUp(e){
    if(!isPointerDown) return;
    isPointerDown = false;
    try { grid.releasePointerCapture?.(e.pointerId); } catch(_) {}
    grid.classList.remove('dragging');

    let momentum = velocity * 1000;
    const decay = 0.92;
    const minMomentum = 0.5;

    function step(){
      const delta = 16/1000;
      grid.scrollLeft -= momentum * delta;
      momentum *= decay;
      if(Math.abs(momentum) > minMomentum){
        momentumId = requestAnimationFrame(step);
      } else {
        momentumId = null;
      }
    }
    if(Math.abs(momentum) > 1){
      momentumId = requestAnimationFrame(step);
    }
  }

  grid.addEventListener('pointerdown', onPointerDown, { passive: true });
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerup', onPointerUp, { passive: true });
  window.addEventListener('pointercancel', onPointerUp, { passive: true });

  grid.addEventListener('wheel', (e) => {
    if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){
      grid.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });

  const step = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-step') || '260', 10) || 260;
  grid.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft') grid.scrollBy({ left: -step, behavior: 'smooth' });
    if(e.key === 'ArrowRight') grid.scrollBy({ left: step, behavior: 'smooth' });
  });

  if(!grid.hasAttribute('tabindex')) grid.setAttribute('tabindex', '0');
}

/* ---------- Scroller dots: create and sync with horizontal grid ---------- */
/* ---------- Scroller dots: cycling active dot with last-page mapping ---------- */
function initScrollerDots(gridSelector, options = {}) {
  const grid = document.querySelector(gridSelector);
  if (!grid) return null;

  // Options and defaults
  const maxDots = typeof options.maxDots === 'number' ? Math.max(1, options.maxDots) : 3;
  const auto = options.auto !== false; // default true
  const interval = typeof options.interval === 'number' ? options.interval : 3000;
  const dotContainerId = options.dotContainerId || 'scrollerDotsContainer';
  const dotClass = options.dotClass || 'scroller-dot';
  const activeClass = options.activeClass || 'active';

  // Remove existing container if present
  let existing = document.getElementById(dotContainerId);
  if (existing) existing.remove();

  // Create container and append after grid
  const container = document.createElement('div');
  container.id = dotContainerId;
  container.className = 'scroller-dots';
  grid.parentNode.insertBefore(container, grid.nextSibling);

  // Collect cards
  let cards = Array.from(grid.querySelectorAll('.card'));
  if (!cards.length) return null;

  // Compute visible count and metrics
  function computeVisibleCount() {
    if (!cards.length) return { visible: 1, cardWidth: 0, gap: 0 };
    const cardRect = cards[0].getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(grid).gap || 18);
    const cardWidth = cardRect.width + gap;
    const visible = Math.max(1, Math.floor((grid.clientWidth + gap) / cardWidth));
    return { visible, cardWidth, gap };
  }

  // Compute pages and pageSize (use 2-card pages when >3 products if desired)
  function computePagesWithMetrics() {
    const { visible, cardWidth, gap } = computeVisibleCount();
    // If more than 3 products, prefer pageSize = 2 (but not larger than visible)
    const useTwoCardPages = cards.length > 3;
    const pageSize = useTwoCardPages ? Math.max(1, Math.min(2, visible)) : visible;
    const pages = Math.max(1, Math.ceil(cards.length / pageSize));
    return { pages, pageSize, visible, cardWidth, gap };
  }

  // Map page -> dot index with cycling and last-page special case
  function pageToDotIndex(pageIndex, pages) {
    if (pages <= maxDots) return pageIndex; // direct mapping if pages <= dots
    if (pageIndex === pages - 1) return maxDots - 1; // last page maps to last dot
    return pageIndex % maxDots; // cycle otherwise
  }

  // Build dots based on pages (max maxDots)
  function buildDots() {
    container.innerHTML = '';
    cards = Array.from(grid.querySelectorAll('.card'));
    const { pages } = computePagesWithMetrics();

    // Determine number of dots to render (never more than maxDots)
    const dotCount = Math.min(maxDots, pages);
    const dots = [];
    for (let i = 0; i < dotCount; i++) {
      const d = document.createElement('div');
      d.className = dotClass;
      d.dataset.dotIndex = i;
      container.appendChild(d);
      d.addEventListener('click', () => {
        // On click, scroll to the first page that maps to this dot index.
        const targetPage = findFirstPageForDot(i, pages);
        if (targetPage != null) {
          scrollToPage(targetPage);
          grid.focus();
          resetAutoAdvance();
        }
      });
      dots.push(d);
    }
    return { dots, pages };
  }

  // Find the first page index that maps to a given dot index
  function findFirstPageForDot(dotIndex, pages) {
    for (let p = 0; p < pages; p++) {
      if (pageToDotIndex(p, pages) === dotIndex) return p;
    }
    return 0;
  }

  // Scroll to page index (0-based)
  function scrollToPage(pageIndex) {
    const { pageSize, cardWidth } = computePagesWithMetrics();
    const step = pageSize * (cardWidth || 0);
    const target = Math.round(pageIndex * step);
    grid.scrollTo({ left: target, behavior: 'smooth' });
  }

  // Determine current page index based on scrollLeft
  function currentPageIndex() {
    const { pageSize, cardWidth } = computePagesWithMetrics();
    const step = pageSize * (cardWidth || 1);
    const idx = Math.round((grid.scrollLeft || 0) / (step || 1));
    const { pages } = computePagesWithMetrics();
    return Math.min(Math.max(0, idx), pages - 1);
  }

  // Update active dot using page->dot mapping
  function updateActiveDot() {
    const page = currentPageIndex();
    const { pages } = computePagesWithMetrics();
    const dotIndex = pageToDotIndex(page, pages);
    dots.forEach((dot, i) => dot.classList.toggle(activeClass, i === dotIndex));
  }

  // Build initial dots
  let { dots, pages } = buildDots();

  // Scroll handler (throttled via rAF)
  let raf = null;
  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      updateActiveDot();
    });
  }
  grid.addEventListener('scroll', onScroll, { passive: true });

  // Auto-advance logic (looping)
  let autoId = null;
  let paused = false;

  function startAutoAdvance() {
    if (!auto || autoId) return;
    autoId = setInterval(() => {
      if (paused) return;
      const { pages } = computePagesWithMetrics();
      const cur = currentPageIndex();
      const next = (cur + 1) % pages;
      scrollToPage(next);
    }, interval);
  }

  function stopAutoAdvance() {
    if (autoId) { clearInterval(autoId); autoId = null; }
  }

  function resetAutoAdvance() {
    stopAutoAdvance();
    setTimeout(() => startAutoAdvance(), interval);
  }

  // Pause/resume on user interaction
  function onPointerDownPause() { paused = true; stopAutoAdvance(); }
  function onPointerUpResume() { paused = false; resetAutoAdvance(); }

  grid.addEventListener('pointerdown', onPointerDownPause, { passive: true });
  window.addEventListener('pointerup', onPointerUpResume, { passive: true });
  grid.addEventListener('mouseenter', () => { paused = true; }, { passive: true });
  grid.addEventListener('mouseleave', () => { paused = false; resetAutoAdvance(); }, { passive: true });
  grid.addEventListener('focusin', () => { paused = true; }, { passive: true });
  grid.addEventListener('focusout', () => { paused = false; resetAutoAdvance(); }, { passive: true });

  // Keyboard navigation pauses auto-advance
  grid.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      paused = true;
      resetAutoAdvance();
    }
  });

  // Rebuild dots on resize or when cards change
  let resizeId = null;
  function onResize() {
    if (resizeId) cancelAnimationFrame(resizeId);
    resizeId = requestAnimationFrame(() => {
      resizeId = null;
      const built = buildDots();
      dots = built.dots;
      pages = built.pages;
      updateActiveDot();
    });
  }
  window.addEventListener('resize', onResize);

  // Initialize and start auto-advance
  updateActiveDot();
  startAutoAdvance();

  // Return API
  return {
    destroy() {
      stopAutoAdvance();
      grid.removeEventListener('scroll', onScroll);
      grid.removeEventListener('pointerdown', onPointerDownPause);
      window.removeEventListener('pointerup', onPointerUpResume);
      grid.removeEventListener('mouseenter', () => { paused = true; });
      grid.removeEventListener('mouseleave', () => { paused = false; resetAutoAdvance(); });
      grid.removeEventListener('focusin', () => { paused = true; });
      grid.removeEventListener('focusout', () => { paused = false; resetAutoAdvance(); });
      window.removeEventListener('resize', onResize);
      container.remove();
    },
    refresh() {
      const built = buildDots();
      dots = built.dots;
      pages = built.pages;
      updateActiveDot();
    }
  };
}

/* new added */
/* ---------- Scroller side shadows: show when overflow exists ---------- */
function initScrollerShadows(gridSelector, containerSelector) {
  const grid = document.querySelector(gridSelector);
  const container = containerSelector ? document.querySelector(containerSelector) : (grid ? grid.parentElement : null);
  if (!grid || !container) return null;

  // Ensure container is positioned for absolute overlays
  if (getComputedStyle(container).position === 'static') {
    container.style.position = 'relative';
  }

  // Remove existing shadows if present
  const existingLeft = container.querySelector('.scroller-shadow.left');
  const existingRight = container.querySelector('.scroller-shadow.right');
  existingLeft?.remove();
  existingRight?.remove();

  // Create shadow elements
  const left = document.createElement('div');
  left.className = 'scroller-shadow left';
  const right = document.createElement('div');
  right.className = 'scroller-shadow right';
  container.appendChild(left);
  container.appendChild(right);

  // Update visibility based on scroll position
  function updateShadows() {
    const maxScroll = grid.scrollWidth - grid.clientWidth;
    if (maxScroll <= 0) {
      left.classList.remove('visible');
      right.classList.remove('visible');
      return;
    }
    // show left if not at start
    if (grid.scrollLeft > 8) left.classList.add('visible'); else left.classList.remove('visible');
    // show right if not at end (allow small epsilon)
    if (grid.scrollLeft < maxScroll - 8) right.classList.add('visible'); else right.classList.remove('visible');
  }

  // Throttle with requestAnimationFrame
  let raf = null;
  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = null;
      updateShadows();
    });
  }

  grid.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  // initialize
  updateShadows();

  // return API for cleanup or manual refresh
  return {
    destroy() {
      grid.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      left.remove();
      right.remove();
    },
    refresh() { updateShadows(); }
  };
}

/* ---------- Page init ---------- */
(function init(){
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const whatsappMain = document.getElementById('whatsappMain');
  const telegramMain = document.getElementById('telegramMain');
  const discordMain = document.getElementById('discordMain');
  if(whatsappMain) whatsappMain.href = `https://wa.me/${normalizePhone(CONTACT_WHATSAPP_NUMBER)}`;
  if(telegramMain) telegramMain.href = `https://t.me/${TELEGRAM_HANDLE}`;
  if(discordMain) discordMain.textContent = DISCORD_HANDLE;

  const grid = document.getElementById('productGrid');
  const container = document.getElementById('productContainer');

  const { list: normalized, lookup } = dedupeProducts(products);

  if (grid) {
  renderIndexCards(normalized);
  enableHorizontalScroller('#productGrid');
  initScrollerDots('#productGrid');
  // add this line to enable side shadows
  initScrollerShadows('#productGrid', '.products');
} else if(container){
    const id = getQueryParam('id');
    const product = lookup.get(id) || normalized.find(p => p.id === id);
    renderProductDetail(product);
  }
})();
