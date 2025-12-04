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
    specs: ["60% (61 keys)","Full Aluminum CNC case","PBT dye‑sublimation keycaps","Hot‑swap / magnetic switches","8K Hz Polling rate","0.08ms Ultra Low Latency","256k scanning-rate","Precision 0.001mm","Super stable RT","32K N-Key Scanning-rate","Functions SOCD / DKS / RT / MT / TGL / Key remapping","Champion Preset","Cherry Profile Keycaps"]
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
function initScrollerDots(gridSelector, options = {}) {
  const grid = document.querySelector(gridSelector);
  if (!grid) return null;

  const dotContainerId = options.dotContainerId || 'scrollerDotsContainer';
  const dotClass = options.dotClass || 'scroller-dot';
  const activeClass = options.activeClass || 'active';

  let existing = document.getElementById(dotContainerId);
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.id = dotContainerId;
  container.className = 'scroller-dots';
  grid.parentNode.insertBefore(container, grid.nextSibling);

  const cards = Array.from(grid.querySelectorAll('.card'));
  if (!cards.length) return null;

  const dots = cards.map((card, i) => {
    const d = document.createElement('div');
    d.className = dotClass;
    d.dataset.index = i;
    container.appendChild(d);
    d.addEventListener('click', () => {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      grid.focus();
    });
    return d;
  });

  const ioOptions = {
    root: grid,
    rootMargin: '0px',
    threshold: [0.5]
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const idx = cards.indexOf(entry.target);
      if (idx === -1) return;
      if (entry.intersectionRatio >= 0.5) {
        dots.forEach((dot, i) => dot.classList.toggle(activeClass, i === idx));
      }
    });
  }, ioOptions);

  cards.forEach(c => observer.observe(c));

  let rafId = null;
  function onScroll() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      const gridRect = grid.getBoundingClientRect();
      const gridCenter = gridRect.left + gridRect.width / 2;
      let closestIndex = 0;
      let closestDist = Infinity;
      cards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const cardCenter = r.left + r.width / 2;
        const dist = Math.abs(cardCenter - gridCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });
      dots.forEach((dot, i) => dot.classList.toggle(activeClass, i === closestIndex));
    });
  }

  grid.addEventListener('scroll', onScroll, { passive: true });

  grid.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      const active = container.querySelector(`.${dotClass}.${activeClass}`);
      const idx = active ? Number(active.dataset.index) : 0;
      const target = Math.max(0, idx - 1);
      cards[target].scrollIntoView({ behavior: 'smooth', inline: 'start' });
    } else if (e.key === 'ArrowRight') {
      const active = container.querySelector(`.${dotClass}.${activeClass}`);
      const idx = active ? Number(active.dataset.index) : 0;
      const target = Math.min(cards.length - 1, idx + 1);
      cards[target].scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }
  });

  if (!grid.hasAttribute('tabindex')) grid.setAttribute('tabindex', '0');

  onScroll();

  return {
    destroy() {
      observer.disconnect();
      grid.removeEventListener('scroll', onScroll);
      container.remove();
    },
    refresh() {
      const newCards = Array.from(grid.querySelectorAll('.card'));
      if (newCards.length !== cards.length) {
        this.destroy();
        initScrollerDots(gridSelector, options);
      } else {
        onScroll();
      }
    }
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

  if(grid){
    renderIndexCards(normalized);
    // enable horizontal scroller and dots after rendering
    enableHorizontalScroller('#productGrid');
    initScrollerDots('#productGrid');
  } else if(container){
    const id = getQueryParam('id');
    const product = lookup.get(id) || normalized.find(p => p.id === id);
    renderProductDetail(product);
  }
})();
