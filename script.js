/* ---------- Contact constants ---------- */
const CONTACT_WHATSAPP_NUMBER = "85514975307"; // update if needed
const TELEGRAM_HANDLE = "glsswrksGG";          // update if needed
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
    specs: ["65% (68 keys)","Full Aluminum CNC","Hot‑swap / magnetic switches","16K/8K Hz Polling rate","0.06ms/0.125ms Ultra Low Latency","256k scanning-rate","Zero Dead-Zone","2/4 PCB Layers","Adaptive Dynamic Calibration 2.0","Electric Light-Box","Precision 0.01mm","3 Rapid-Trigger profile support","RT Button profile switch","Multi-Function Knob","Dual Drivers Support","16M ARGB, Music Rhythm 2.0, Aura Sync Lightning","Functions SOCD / DKS / RT / MT / TGL / Key remapping","Wired Connection","Proprietary MCR original height profile"]
   }
  // Add more product objects here
];
/* function for contact dialogue*/
// Modal logic
document.addEventListener('DOMContentLoaded', () => {
  const contactLink = document.getElementById('contactLink');
  const modal = document.getElementById('contactModal');
  const closeBtn = modal.querySelector('.modal-close');

  if(contactLink && modal){
    contactLink.addEventListener('click', (e) => {
      e.preventDefault();
      modal.setAttribute('aria-hidden','false');
    });
    closeBtn.addEventListener('click', () => {
      modal.setAttribute('aria-hidden','true');
    });
    modal.addEventListener('click', (e) => {
      if(e.target === modal) modal.setAttribute('aria-hidden','true');
    });
  }
});
/* ---------- Helpers ---------- */
function whatsappLink(product){
  const base = `https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(/\D/g,'')}`;
  const text = encodeURIComponent(`Hi, I'm interested in ${product.title}. Is it available?`);
  return `${base}?text=${text}`;
}
function telegramLink(){ return `https://t.me/${TELEGRAM_HANDLE}`; }
function getQueryParam(name){ return new URLSearchParams(window.location.search).get(name); }

/* Robust product link for GitHub Pages subpath (FIXED) */
function productLink(id){
  // Using a path relative to the current file location (products.html)
  return `products.html?id=${encodeURIComponent(id)}`;
}

/* ------------------- NEW: ADAPTIVE SHADOW LOGIC ------------------- */
/**
 * Uses a canvas to sample the average color from an image element.
 * @param {HTMLImageElement} img 
 * @returns {{r: number, g: number, b: number}}
 */
function getColor(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Sample the image by scaling it down to 10x10 for quick averaging
    const size = 10;
    canvas.width = size;
    canvas.height = size;
    
    try {
        ctx.drawImage(img, 0, 0, size, size);
        const data = ctx.getImageData(0, 0, size, size).data;
        
        let r = 0, g = 0, b = 0;
        let count = 0;
        
        // Sum all color components
        for (let i = 0; i < data.length; i += 4) {
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            count++;
        }
        
        // Calculate the average color
        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);
        
        return { r, g, b };
    } catch (e) {
        // Fallback for CORS or image loading error (returns dark grey/black)
        return { r: 15, g: 17, b: 20 };
    }
}

/**
 * Applies a box shadow to the hero image based on its dominant color.
 */
function applyAdaptiveShadow() {
    const img = document.getElementById('heroImage');
    
    if (!img) return;
    
    const setShadow = () => {
        // Remove event listener to prevent duplicate execution
        img.removeEventListener('load', setShadow);
        
        const color = getColor(img);
        
        // Create a shadow color with 35% opacity
        const shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.35)`;
        
        // Apply a box shadow: 0px offset, 12px blur, 40px spread, color
        const shadowStyle = `0 12px 40px 12px ${shadowColor}`;
        
        // Apply the new shadow
        img.style.boxShadow = shadowStyle;
    };
    
    // Wait for the image to load, or apply immediately if it's already complete (from cache)
    if (img.complete && img.naturalHeight !== 0) {
        setShadow();
    } else {
        img.addEventListener('load', setShadow);
    }
}
/* ------------------- END: ADAPTIVE SHADOW LOGIC ------------------- */


/* ------------------- SEARCH LOGIC (from previous step) ------------------- */
function filterProducts(query) {
  if (!query) return [];
  const lowerCaseQuery = query.toLowerCase();
  return products.filter(p => 
    p.title.toLowerCase().includes(lowerCaseQuery) ||
    p.short.toLowerCase().includes(lowerCaseQuery) ||
    p.layout.toLowerCase().includes(lowerCaseQuery) ||
    p.specs.some(spec => spec.toLowerCase().includes(lowerCaseQuery))
  );
}

function renderSearchResults(results) {
  const resultsBox = document.getElementById('searchResults');
  if (!resultsBox) return;

  resultsBox.innerHTML = '';

  if (results.length === 0) {
    resultsBox.classList.remove('active');
    return;
  }
  
  results.forEach(p => {
    const item = document.createElement('a');
    item.className = 'search-result-item';
    item.href = productLink(p.id);
    item.ariaLabel = `View ${p.title}`;
    
    const cover = Array.isArray(p.images) && p.images.length ? p.images[0] : '';

    item.innerHTML = `
      <img src="${cover}" alt="${p.title}" class="search-result-img">
      <div class="search-result-details">
        <div class="search-result-title">${p.title}</div>
        <div class="search-result-layout">${p.layout} Layout</div>
      </div>
      <div class="search-result-price">$${p.price}</div>
    `;
    resultsBox.appendChild(item);
  });
  
  resultsBox.classList.add('active');
}

function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  const resultsBox = document.getElementById('searchResults');
  
  if (!searchInput || !resultsBox) return;

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    const results = filterProducts(query);
    renderSearchResults(results);
  });

  // Hide results when clicking outside the input/results box
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !resultsBox.contains(e.target)) {
      resultsBox.classList.remove('active');
    }
  });
  
  // Show results again if the input is focused and has content
  searchInput.addEventListener('focus', () => {
    if(searchInput.value.trim().length > 0 && resultsBox.childElementCount > 0){
      resultsBox.classList.add('active');
    }
  });
}
/* ------------------- END SEARCH LOGIC ------------------- */


/* ---------- Reusable card creator for 'More Items' section ---------- */
function createCard(p){
  const card = document.createElement('div');
  card.className = 'card';
  const availClass = p.available ? 'availability available' : 'availability unavailable';
  const availText = p.available ? 'Available' : 'Unavailable';
  const href = productLink(p.id);
  const cover = Array.isArray(p.images) && p.images.length ? p.images[0] : '';

  card.innerHTML = `
    <div class="card-image">
      <a class="card-link" href="${href}" aria-label="View ${p.title}">
        <img src="${cover}" alt="${p.title}">
      </a>
      <span class="price-badge">$${p.price}</span>
    </div>
    <div class="card-body">
      <h4 class="card-title">
        <a class="card-title-link" href="${href}">${p.title}</a>
      </h4>
      <p class="muted card-desc">${p.short}</p>
      <div class="card-footer">
        <div class="specs-inline muted">${p.layout} • ${p.specs[0] || ''}</div>
        <div class="availability-wrap">
          <span class="${availClass}">${availText}</span>
        </div>
      </div>
    </div>
  `;
  return card;
}

/* ---------- Render the horizontal list of other products ---------- */
function renderMoreProducts(currentProductId) {
  // Get all products except the current one
  const relevantProducts = products.filter(p => p.id !== currentProductId);
  
  if (relevantProducts.length === 0) return null;

  const section = document.createElement('section');
  section.className = 'more-products-section';
  section.innerHTML = `
    <div class="container products-section" style="padding-top: 0;">
      <h2 class="section-head" style="margin-top: 40px; margin-bottom: 0;">More Keyboards</h2>
    </div>
    <div class="horizontal-scroll-wrapper">
      <div class="grid" id="moreProductGrid">
        </div>
    </div>
  `;
  
  const grid = section.querySelector('#moreProductGrid');
  relevantProducts.forEach(p => {
    grid.appendChild(createCard(p));
  });

  return section;
}

/* ---------- Index page: render product cards ---------- */
function renderIndexCards(list){
  const grid = document.getElementById('productGrid');
  if(!grid) return;
  grid.innerHTML = '';
  list.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'card'; 

    const availClass = p.available ? 'availability available' : 'availability unavailable';
    const availText = p.available ? 'Available' : 'Unavailable';
    const href = productLink(p.id);
    const cover = Array.isArray(p.images) && p.images.length ? p.images[0] : '';

    card.innerHTML = `
      <div class="card-image">
        <a class="card-link" href="${href}" aria-label="View ${p.title}">
          <img src="${cover}" alt="${p.title}">
        </a>
        <span class="price-badge">$${p.price}</span>
      </div>
      <div class="card-body">
        <h4 class="card-title">
          <a class="card-title-link" href="${href}">${p.title}</a>
        </h4>
        <p class="muted card-desc">${p.short}</p>
        <div class="card-footer">
          <div class="specs-inline muted">${p.layout} • ${p.specs[0] || ''}</div>
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
    const width = wrapper.clientWidth || wrapper.getBoundingClientRect().width;
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
    const width = wrapper.clientWidth;
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
    const width = wrapper.clientWidth;
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
      <h1>${product.title}</h1>
      <p class="muted">${product.short}</p>
      <div style="margin-top:12px;font-weight:700;color:var(--accent);font-size:1.25rem">$${product.price}</div>
      <ul class="specs">${product.specs.map(s=>`<li>• ${s}</li>`).join('')}</ul>
      <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
        <a class="btn primary" id="whatsappBtn" href="#" target="_blank" rel="noopener">Inquire on WhatsApp</a>
        <a class="btn" id="telegramBtn" href="#" target="_blank" rel="noopener">Inquire on Telegram</a>
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

  carousel.focus();

  // NEW: Inject the "More Keyboards" section
  const moreProductsSection = renderMoreProducts(product.id);
  if (moreProductsSection) {
    const mainElement = document.querySelector('.product-page');
    const backLinkContainer = mainElement.querySelector('div[style*="margin-top:28px;"]');
    
    // Insert the new section before the "back to shop" link container
    if (backLinkContainer) {
        mainElement.insertBefore(moreProductsSection, backLinkContainer);
    } else {
        mainElement.appendChild(moreProductsSection);
    }
  }
}

/* ---------- Page init ---------- */
(function init(){
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const whatsappMain = document.getElementById('whatsappMain');
  const telegramMain = document.getElementById('telegramMain');
  const discordMain = document.getElementById('discordMain');
  if(whatsappMain) whatsappMain.href = `https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(/\D/g,'')}`;
  if(telegramMain) telegramMain.href = `https://t.me/${TELEGRAM_HANDLE}`;

  const grid = document.getElementById('productGrid');
  const container = document.getElementById('productContainer');

  if(grid){
    renderIndexCards(products);
  } else if(container){
    const id = getQueryParam('id');
    const product = products.find(p => p.id === id);
    renderProductDetail(product);
  }
  
  // Initialize the search functionality
  setupSearch();

  // NEW: Initialize adaptive shadow on the hero image (only runs on index.html)
  applyAdaptiveShadow();

})();
