/* ---------- Contact constants ---------- */
const CONTACT_WHATSAPP_NUMBER = "85514975307"; 
const TELEGRAM_HANDLE = "glsswrksGG";         
const DISCORD_HANDLE = "Kokushibo#4764";

/* ---------- Centralized product data (shared across pages) ---------- */

// NEW: Use categories for better organization
const productData = {
  keyboards: [
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

    id: "ace68esport",
    title: "MCHOSE ACE68 E-SPORT",
    short: "MCHOSE ACE68 E-SPORT EDITION - 0.1ms Ultra-Low Latency for Competitive Gaming",
    price: 45,
    layout: "65",
    available: false,
    images: [
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68/ace681",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68/ace682",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68/ace683",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68/ace684",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68/ace680",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68/ace68driver"
    ],
    specs: ["65% (68 keys)","Aluminum Alloy Plate + Silicone Sandwich Pad + Silicone Gasket","8K Hz Polling rate","0.125ms Ultra Low Latency","128k scanning-rate","0 Dead-Zone","Precision 0.05mm - 3.4mm","Adaptive Dynamic Calibration 2.0","Features: Music Rhythms 2.0｜Custom GIF Effects","Function: SOCD, RS, DKS, MT, TGL, Key macros","On-Board Memory Support","South-facing RGB LED Lights","2-level Adjustable Feet"]
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
   },
   {
    id: "m1wv3",
    title: "MONSGEEK M1W V3 PURPLE",
    short: "Full Aluminum Mechanical Keyboard",
    price: 65,
    layout: "75",
    available: false,
    images: [
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/m1wv3/613vuV6lGLL.jpg",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/m1wv3/71HsR-bBRxL.jpg",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/m1wv3/81gDC8uMc2L.jpg",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/m1wv3/81NdG0MIsZL.jpg",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/m1wv3/61UTTwPtyCL.jpg",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/m1wv3/61fUWnxOIrL.jpg"
      // https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/m1wv3/613vuV6lGLL.jpg
    ],
    specs: ["75% (82 keys)","Full Aluminum CNC","Hot‑swap mechanical switches 3/5 pins","Tri-mode connection Wired / 2.4Ghz Dongle / Bluetooth","Battery 6000 mAh","PBT double-shot gradient shine-through keycaps (south-facing)","South-facing RGB lighting, fully customizable (multiple lighting modes, full-color spectrum) ","N-Key Rollover supported","1K Polling-Rate in Wired / 2.4Ghz Dongles"]
   },
  ],
  mice: [
    {
      id: "mouse-vxe-r1",
      title: "VXE R1 SE Wireless Mouse",
      short: "Ultralight 50g mouse with 3395 sensor and 1K Hz polling.",
      price: 35,
      layout: "50g",
      available: true,
      images: [
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mice/r1-se-white.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mice/r1-se-black.jpg",
      ],
      specs: ["50g Weight", "3395 Sensor", "1000 Hz", "Wireless 2.4G/BT"]
    },
    {
      id: "mouse-zaopin-z2",
      title: "Zaopin Z2 Pro Mouse",
      short: "Premium 4K Hz wireless gaming mouse.",
      price: 70,
      layout: "65g",
      available: false,
      images: [
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mice/zaopin-z2-white.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mice/zaopin-z2-black.jpg",
      ],
      specs: ["65g Weight", "4000 Hz", "Wired/Wireless"]
    },
    {
        id: "mouse-test3",
        title: "Test Mouse 3",
        short: "A test mouse for the list limit. Should be visible on mobile.",
        price: 20,
        layout: "80g",
        available: true,
        images: ["https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mice/r1-se-white.jpg"],
        specs: ["80g Weight", "3395 Sensor", "1000 Hz"]
    },
    {
        id: "mouse-test4",
        title: "Test Mouse 4",
        short: "A test mouse for the list limit. Should be visible on mobile.",
        price: 25,
        layout: "70g",
        available: true,
        images: ["https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mice/r1-se-black.jpg"],
        specs: ["70g Weight", "3395 Sensor", "1000 Hz"]
    },
    {
        id: "mouse-test5",
        title: "Test Mouse 5 (Extra)",
        short: "This mouse should trigger the More button on mobile.",
        price: 30,
        layout: "90g",
        available: false,
        images: ["https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mice/zaopin-z2-white.jpg"],
        specs: ["90g Weight", "3395 Sensor", "1000 Hz"]
    },
  ]
};

const allProducts = [...productData.keyboards, ...productData.mice]; // Combined for detail page lookup

/* function for contact dialogue*/
// Modal logic (unchanged)
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

/* Simplified product link */
function productLink(id){
  return `products.html?id=${encodeURIComponent(id)}`;
}

// Constants for display limits for the index page
const MOBILE_COLUMNS = 2;
const DESKTOP_COLUMNS = 4;
const INITIAL_MOBILE_LIMIT = MOBILE_COLUMNS * 2; // 4 items
const INITIAL_DESKTOP_LIMIT = DESKTOP_COLUMNS * 2; // 8 items

function getInitialLimit() {
  return window.innerWidth < 600 ? INITIAL_MOBILE_LIMIT : INITIAL_DESKTOP_LIMIT;
}

/**
 * Reusable function to create the HTML structure for a single product card.
 * @param {Object} p - The product object.
 * @returns {HTMLElement} The created card div element.
 */
function createProductCard(p) {
    const card = document.createElement('div');
    card.className = 'card';

    const availClass = p.available ? 'availability available' : 'availability unavailable';
    const availText = p.available ? 'Available' : 'Unavailable';
    const href = productLink(p.id);
    const cover = Array.isArray(p.images) && p.images.length ? p.images[0] : '';
    const priceBadgeClass = p.available ? 'price-badge in-stock' : 'price-badge'; 

    card.innerHTML = `
      <div class="card-image">
        <a class="card-link" href="${href}" aria-label="View ${p.title}">
          <img src="${cover}" alt="${p.title}">
        </a>
        <span class="${priceBadgeClass}">$${p.price}</span>
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


/* ---------- Index page: render product cards (LIMITED VIEW) ---------- */
function renderIndexCards(list, gridId, moreContainerId, categoryName){
  const grid = document.getElementById(gridId);
  const loadMoreContainer = document.getElementById(moreContainerId);
  if(!grid || !loadMoreContainer) return;

  const limit = getInitialLimit();
  
  grid.innerHTML = '';
  loadMoreContainer.innerHTML = ''; 

  const productsToRender = list.slice(0, limit);

  productsToRender.forEach(p=>{
    grid.appendChild(createProductCard(p));
  });
  
  if (list.length > limit) {
    const loadMoreLink = document.createElement('a');
    loadMoreLink.className = 'btn primary';
    loadMoreLink.textContent = 'More items';
    loadMoreLink.href = `category.html?category=${categoryName}`; 
    loadMoreContainer.appendChild(loadMoreLink);
  }
}

function filterIndexProducts(query, categoryList, gridId, moreContainerId, categoryName) {
    const normalizedQuery = query.toLowerCase().trim();
    const filteredList = categoryList.filter(p =>
        p.title.toLowerCase().includes(normalizedQuery) ||
        p.short.toLowerCase().includes(normalizedQuery) ||
        p.id.toLowerCase().includes(normalizedQuery)
    );
    renderIndexCards(filteredList, gridId, moreContainerId, categoryName);
}

function initProductSection(categoryName) {
    const productsList = productData[categoryName];
    let prefix = categoryName;
    if (categoryName === 'keyboards') prefix = 'keyboard';
    if (categoryName === 'mice') prefix = 'mouse';
    
    const gridId = `${prefix}Grid`; 
    const moreContainerId = `${prefix}MoreContainer`;
    const searchInputId = `${prefix}Search`; 

    const searchInput = document.getElementById(searchInputId);

    renderIndexCards(productsList, gridId, moreContainerId, categoryName); 

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterIndexProducts(e.target.value, productsList, gridId, moreContainerId, categoryName);
        });
    }
}

function initIndexPage() {
    initProductSection('keyboards');
    initProductSection('mice');

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            initProductSection('keyboards'); 
            initProductSection('mice');
        }, 200); 
    });
}


/* ---------- Category page: render full list (UNCHANGED) ---------- */
function renderCategoryCards(list, gridElement) {
    gridElement.innerHTML = '';
    if (list.length === 0) {
        gridElement.innerHTML = '<p class="muted" style="grid-column: 1 / -1; text-align: center; margin-top: 20px;">No products found matching your search in this category.</p>';
        return;
    }
    list.forEach(p => {
        gridElement.appendChild(createProductCard(p));
    });
}


function initCategoryPage() {
    const categoryName = getQueryParam('category');
    const productsList = productData[categoryName]; 
    const container = document.getElementById('categoryContainer');

    if (!container || !productsList) {
        if (container) {
             container.innerHTML = `<div class="container" style="padding-top: 40px;"><h1 style="color:var(--muted)">Category not found.</h1><p><a href="index.html" class="btn">← Back to shop</a></p></div>`;
        }
        return;
    }
    
    const capitalizedName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

    container.innerHTML = `
        <div class="section-head">
            <h2 id="categoryTitle">${capitalizedName} Category</h2>
            <input type="text" id="categorySearch" placeholder="Search all ${categoryName}..." class="search-input">
        </div>
        <div id="categoryGrid" class="grid"></div>
        <div style="margin-top:28px;">
            <a class="back-link" href="index.html">← Back to shop</a>
        </div>
    `;

    const grid = document.getElementById('categoryGrid');
    const searchInput = document.getElementById('categorySearch');
    
    renderCategoryCards(productsList, grid); 

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const filteredList = productsList.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.short.toLowerCase().includes(query) ||
            p.id.toLowerCase().includes(query)
        );
        renderCategoryCards(filteredList, grid);
    });
}


/* ---------- Product page: Horizontal Scroll Logic (NEW) ---------- */

/**
 * Renders all other products in a horizontal, swipeable grid.
 * @param {string} currentProductId - The ID of the product currently being viewed.
 */
function renderSimilarProductsSection(currentProductId) {
    const similarSection = document.getElementById('similarProductsSection');
    // Get ALL other products
    const otherProducts = allProducts.filter(p => p.id !== currentProductId);
    // Back link HTML to be inserted after the section
    const backLinkHTML = '<div style="margin-top:28px;"><a class="back-link" href="index.html">← Back to shop</a></div>';

    if (!similarSection || otherProducts.length === 0) {
        // If no similar products, just insert the back button at the end of the main content.
        document.querySelector('.product-page').insertAdjacentHTML('beforeend', backLinkHTML);
        return;
    }

    // 1. Create the Section Title and Scroll Grid structure
    similarSection.innerHTML = `
        <div style="margin-top:40px;margin-bottom:20px;">
            <h2 style="font-size:1.5rem;">Similar Products</h2>
        </div>
        <div class="horizontal-scroll-wrapper">
            <div id="similarProductsGrid" class="grid horizontal-scroll"></div>
        </div>
    `;

    const grid = document.getElementById('similarProductsGrid');
    
    // 2. Render all other products in the scrollable grid
    otherProducts.forEach(p => {
        grid.appendChild(createProductCard(p));
    });

    // 3. Insert the back button below the entire Similar Products section
    similarSection.insertAdjacentHTML('afterend', backLinkHTML);
}


/* ---------- Product page: render detail (UPDATED) ---------- */

function renderProductDetail(product){
  const container = document.getElementById('productContainer');
  if(!container) return;

  if(!product){
    container.innerHTML = '<div style="color:var(--muted)">Product not found. <a href="index.html">Back to shop</a></div>';
    return;
  }

  // 1. Render main product details (Removed Discord label)
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
  
  // 2. Render all similar products in the swipeable carousel section
  renderSimilarProductsSection(product.id);
}

/* ---------- Carousel (shared, remains the same) ---------- */
function createCarousel(images) {
// ... (The code for createCarousel remains the same as it is only used for product images) ...
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


/* ---------- Page init (UNCHANGED) ---------- */
(function init(){
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact links initialization (for modal)
  const whatsappMain = document.getElementById('whatsappMain');
  const telegramMain = document.getElementById('telegramMain');
  const discordMain = document.getElementById('discordMain');
  if(whatsappMain) whatsappMain.href = `https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(/\D/g,'')}`;
  if(telegramMain) telegramMain.href = `https://t.me/${TELEGRAM_HANDLE}`;
  if(discordMain) discordMain.textContent = DISCORD_HANDLE;

  // Check for the containers to determine which page we are on
  const indexGrid = document.getElementById('keyboardGrid'); 
  const detailContainer = document.getElementById('productContainer');
  const categoryContainer = document.getElementById('categoryContainer'); 

  if(indexGrid){
    // 1. This is the index page
    initIndexPage(); 
  } else if(categoryContainer) { 
    // 2. This is the new category listing page (category.html)
    initCategoryPage();
  } else if(detailContainer){
    // 3. This is the product detail page (products.html)
    const id = getQueryParam('id');
    const product = allProducts.find(p => p.id === id); 
    renderProductDetail(product);
  }
})();
