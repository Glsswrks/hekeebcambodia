/* ---------- Contact constants ---------- */
const CONTACT_WHATSAPP_NUMBER = "85514975307";
const TELEGRAM_HANDLE = "glsswrksGG";
const DISCORD_HANDLE = "Kokushibo#4764";

/* ---------- Centralized product data (shared across pages) ---------- */
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
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/ATK_EDGE_60_HE_Keyboard.jpg"
    ],
    specs: ["60% (61 keys)","Full Aluminum CNC case","PBT dye‑sublimation keycaps"]
  },
  {
    id: "meelgeek-made68",
    title: "MEELGEEK MADE68 PRO",
    short: "The MADE68 Pro goes beyond a simple keyboard. It's a truly modular experience.",
    price: 140,
    layout: "68",
    available: false,
    images: [
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/made68/1.jpg",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/made68/2.jpg"
    ],
    specs: ["68% (68 keys)","Modular design","Wireless option"]
  }
  // Add more product objects here with unique ids
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
function escapeHtml(str){
  if(!str) return '';
  return String(str).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
function escapeAttr(str){ return escapeHtml(str); }

/* Dedupe helper */
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

/* ---------- Horizontal scroller with robust pointer handling (fast + slow swipes) ---------- */
function enableHorizontalScroller(selector){
  const grid = document.querySelector(selector);
  if(!grid) return;

  // Ensure basic styles
  grid.style.overflowX = grid.style.overflowX || 'auto';
  grid.style.scrollBehavior = grid.style.scrollBehavior || 'smooth';
  grid.classList.remove('dragging');

  // State
  let isDown = false;
  let pointerId = null;
  let startX = 0;
  let startScroll = 0;
  let lastX = 0;
  let lastTime = 0;
  let velocity = 0;
  let momentumId = null;

  // Keep a short sample buffer for velocity (more robust than single delta)
  const samples = [];
  const maxSamples = 6;

  function pushSample(x, t){
    samples.push({x, t});
    if(samples.length > maxSamples) samples.shift();
  }
  function computeVelocityFromSamples(){
    if(samples.length < 2) return 0;
    const first = samples[0];
    const last = samples[samples.length - 1];
    const dx = last.x - first.x;
    const dt = Math.max(1, last.t - first.t);
    return dx / dt; // px per ms
  }

  // Metrics helper: approximate card/page width for snapping
  function getMetrics() {
    const cards = Array.from(grid.querySelectorAll('.card'));
    if (!cards.length) return { cardWidth: grid.clientWidth, pageSize: 1 };
    const gap = parseFloat(getComputedStyle(grid).gap || 18);
    const cardRect = cards[0].getBoundingClientRect();
    const cardWidth = cardRect.width + gap;
    const visible = Math.max(1, Math.floor((grid.clientWidth + gap) / cardWidth));
    const pageSize = visible;
    return { cardWidth, pageSize, visible, gap };
  }

  // Stop any running momentum
  function stopMomentum(){
    if(momentumId){ cancelAnimationFrame(momentumId); momentumId = null; }
  }

  // Pointer down: capture pointer and prepare
  function onPointerDown(e){
    if(e.pointerType === 'mouse' && e.button !== 0) return;

    // prevent native fling/scroll while dragging horizontally
    e.preventDefault();

    isDown = true;
    pointerId = e.pointerId;
    try { grid.setPointerCapture(pointerId); } catch(_) {}

    grid.classList.add('dragging');

    startX = e.clientX;
    startScroll = grid.scrollLeft;
    lastX = startX;
    lastTime = performance.now();
    velocity = 0;
    samples.length = 0;
    pushSample(lastX, lastTime);

    stopMomentum();
  }

  // Pointer move: update scroll and velocity
  function onPointerMove(e){
    if(!isDown || e.pointerId !== pointerId) return;
    e.preventDefault();

    const x = e.clientX;
    const dx = x - startX;
    grid.scrollLeft = startScroll - dx;

    const now = performance.now();
    pushSample(x, now);
    velocity = computeVelocityFromSamples(); // px per ms
    lastX = x;
    lastTime = now;
  }

  // Snap to nearest page or apply momentum on release
  function onPointerUp(e){
    if(!isDown || e.pointerId !== pointerId) return;
    isDown = false;
    try { grid.releasePointerCapture(pointerId); } catch(_) {}
    pointerId = null;
    grid.classList.remove('dragging');

    const now = performance.now();
    pushSample(e.clientX, now);
    const v = computeVelocityFromSamples(); // px per ms
    const velocityPxPerS = v * 1000; // px/s

    const { cardWidth, pageSize } = getMetrics();
    const step = (cardWidth || grid.clientWidth) * pageSize;

    // Momentum threshold: if fast enough, apply momentum
    const momentumThreshold = 350; // px/s (tweakable)
    if(Math.abs(velocityPxPerS) > momentumThreshold){
      // momentum animation using exponential decay
      let momentum = velocityPxPerS; // px/s
      const decay = 0.92;
      const frame = () => {
        const delta = 16/1000;
        grid.scrollLeft -= momentum * delta;
        momentum *= decay;
        const maxScroll = grid.scrollWidth - grid.clientWidth;
        if(Math.abs(momentum) > 10 && grid.scrollLeft > -1 && grid.scrollLeft < maxScroll + 1){
          momentumId = requestAnimationFrame(frame);
        } else {
          momentumId = null;
          snapToNearest(step);
        }
      };
      momentumId = requestAnimationFrame(frame);
      return;
    }

    // For slower drags, decide by distance moved relative to card width
    const dragDx = lastX - startX;
    const dragThreshold = (cardWidth || grid.clientWidth) * 0.18; // 18% threshold
    if (Math.abs(dragDx) > dragThreshold) {
      const dir = dragDx < 0 ? 1 : -1; // negative dx means moved left -> next page
      const currentIndex = Math.round((grid.scrollLeft || 0) / (step || 1));
      const target = Math.max(0, currentIndex + dir);
      grid.scrollTo({ left: Math.round(target * step), behavior: 'smooth' });
    } else {
      snapToNearest(step);
    }
  }

  // Snap helper: snap to nearest page boundary
  function snapToNearest(step){
    if(!step || step <= 0){
      grid.scrollTo({ left: Math.round(grid.scrollLeft), behavior: 'smooth' });
      return;
    }
    const idx = Math.round((grid.scrollLeft || 0) / step);
    const maxIdx = Math.max(0, Math.ceil((grid.scrollWidth - grid.clientWidth) / step));
    const target = Math.min(maxIdx, Math.max(0, idx));
    grid.scrollTo({ left: Math.round(target * step), behavior: 'smooth' });
  }

  // Attach pointer listeners on grid
  grid.addEventListener('pointerdown', onPointerDown);
  grid.addEventListener('pointermove', onPointerMove);
  grid.addEventListener('pointerup', onPointerUp);
  grid.addEventListener('pointercancel', onPointerUp);

  // Wheel support: convert vertical wheel to horizontal scroll when over grid
  grid.addEventListener('wheel', (e) => {
    if(Math.abs(e.deltaY) > Math.abs(e.deltaX)){
      grid.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });

  // Keyboard support: left/right arrows (step equals CSS var or fallback)
  const stepSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--card-step') || '260', 10) || 260;
  grid.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft') grid.scrollBy({ left: -stepSize, behavior: 'smooth' });
    if(e.key === 'ArrowRight') grid.scrollBy({ left: stepSize, behavior: 'smooth' });
  });

  // Make grid focusable
  if(!grid.hasAttribute('tabindex')) grid.setAttribute('tabindex', '0');
}

/* ---------- Scroller dots: cycling active dot with last-page mapping ---------- */
function initScrollerDots(gridSelector, options = {}) {
  const grid = document.querySelector(gridSelector);
  if (!grid) return null;

  const maxDots = typeof options.maxDots === 'number' ? Math.max(1, options.maxDots) : 3;
  const auto = options.auto !== false;
  const interval = typeof options.interval === 'number' ? options.interval : 3000;
  const dotContainerId = options.dotContainerId || 'scrollerDotsContainer';
  const dotClass = options.dotClass || 'scroller-dot';
  const activeClass = options.activeClass || 'active';

  let existing = document.getElementById(dotContainerId);
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.id = dotContainerId;
  container.className = 'scroller-dots';
  grid.parentNode.insertBefore(container, grid.nextSibling);

  let cards = Array.from(grid.querySelectorAll('.card'));
  if (!cards.length) return null;

  function computeVisibleCount() {
    if (!cards.length) return { visible: 1, cardWidth: 0, gap: 0 };
    const cardRect = cards[0].getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(grid).gap || 18);
    const cardWidth = cardRect.width + gap;
    const visible = Math.max(1, Math.floor((grid.clientWidth + gap) / cardWidth));
    return { visible, cardWidth, gap };
  }

  function computePagesWithMetrics() {
    const { visible, cardWidth, gap } = computeVisibleCount();
    const useTwoCardPages = cards.length > 3;
    const pageSize = useTwoCardPages ? Math.max(1, Math.min(2, visible)) : visible;
    const pages = Math.max(1, Math.ceil(cards.length / pageSize));
    return { pages, pageSize, visible, cardWidth, gap };
  }

  function pageToDotIndex(pageIndex, pages) {
    if (pages <= maxDots) return pageIndex;
    if (pageIndex === pages - 1) return maxDots - 1;
    return pageIndex % maxDots;
  }

  function buildDots() {
    container.innerHTML = '';
    cards = Array.from(grid.querySelectorAll('.card'));
    const { pages } = computePagesWithMetrics();
    const dotCount = Math.min(maxDots, pages);
    const dots = [];
    for (let i = 0; i < dotCount; i++) {
      const d = document.createElement('div');
      d.className = dotClass;
      d.dataset.dotIndex = i;
      container.appendChild(d);
      d.addEventListener('click', () => {
        const targetPage = findFirstPageForDot(i, pages);
        if (targetPage != null) {
          scrollToPage(targetPage);
          grid.focus();
          resetAutoAdvance();
        }
      });
      dots.push(d);
    }
    // hide container if only one page
    container.style.display = (pages <= 1) ? 'none' : '';
    return { dots, pages };
  }

  function findFirstPageForDot(dotIndex, pages) {
    for (let p = 0; p < pages; p++) {
      if (pageToDotIndex(p, pages) === dotIndex) return p;
    }
    return 0;
  }

  function scrollToPage(pageIndex) {
    const { pageSize, cardWidth } = computePagesWithMetrics();
    const step = pageSize * (cardWidth || 0);
    const target = Math.round(pageIndex * step);
    grid.scrollTo({ left: target, behavior: 'smooth' });
  }

  function currentPageIndex() {
    const { pageSize, cardWidth } = computePagesWithMetrics();
    const step = pageSize * (cardWidth || 1);
    const idx = Math.round((grid.scrollLeft || 0) / (step || 1));
    const { pages } = computePagesWithMetrics();
    return Math.min(Math.max(0, idx), pages - 1);
  }

  function updateActiveDot() {
    const page = currentPageIndex();
    const { pages } = computePagesWithMetrics();
    const dotIndex = pageToDotIndex(page, pages);
    dots.forEach((dot, i) => dot.classList.toggle(activeClass, i === dotIndex));
  }

  let { dots, pages } = buildDots();

  let raf = null;
   
