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
    available: true,
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
  ],
  mice: [
    {
      id: "scyroxv8",
      title: "Scyrox V8",
      short: "36-Gram Ultra-Lightweight Wireless Gaming Mouse with 8K Polling Rate",
      price: 55,
      layout: "36g",
      available: true,
      images: [
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/scyroxv8/20.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/scyroxv8/10.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/scyroxv8/30.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/scyroxv8/40.jpg",
      ],
      specs: ["Paw3950 Sensor", "36Gram Weight", "8K Hz Polling-Rate", "MCU Nordic-52840", "Track Speed 750IPS","30k DPI", "Acceleration 50g", "Omron Optical Switches", "Wireless / Wired", "Web-Based Driver", "Yellow Color Available"]
    }
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

// MODIFIED: Function for Purchase link with product info
function purchaseTelegramLink(product) {
    // Prefix text with product details as requested
    const text = encodeURIComponent(`Hello, I would like to purchase the ${product.title} (ID: ${product.id}). Is it still available for $${product.price}?`);
    return `https://t.me/${TELEGRAM_HANDLE}?text=${text}`;
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

// NEW: Function to handle horizontal scrolling
function scrollSimilarProducts(direction) {
    const grid = document.getElementById('similarProductsGrid');
    if (!grid) return;

    const cardWidth = grid.querySelector('.card')?.offsetWidth + 20; // Card width + gap
    const scrollAmount = cardWidth * (direction === 'next' ? 1 : -1);
    
    // Smooth scroll behavior
    grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

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

    // 1. Create the Section Title, Wrapper, and Grid structure with NEW buttons
    similarSection.innerHTML = `
        <div style="margin-top:40px;margin-bottom:20px;">
            <h2 style="font-size:1.5rem;">Similar Products</h2>
        </div>
        <div class="horizontal-scroll-container">
            <button class="scroll-nav-btn left" aria-label="Previous similar product">&lt;</button>
            <div class="horizontal-scroll-wrapper">
                <div id="similarProductsGrid" class="grid horizontal-scroll"></div>
            </div>
            <button class="scroll-nav-btn right" aria-label="Next similar product">&gt;</button>
        </div>
    `;

    const grid = document.getElementById('similarProductsGrid');
    
    // 2. Render all other products in the scrollable grid
    otherProducts.forEach(p => {
        grid.appendChild(createProductCard(p));
    });

    // 3. Attach event listeners to the new buttons
    similarSection.querySelector('.scroll-nav-btn.left').addEventListener('click', () => scrollSimilarProducts('prev'));
    similarSection.querySelector('.scroll-nav-btn.right').addEventListener('click', () => scrollSimilarProducts('next'));


    // 4. Insert the back button below the entire Similar Products section
    similarSection.insertAdjacentHTML('afterend', backLinkHTML);
}

function renderProductDetail(product){
  const container = document.getElementById('productContainer');
  if(!container) return;

  if(!product){
    container.innerHTML = '<div style="color:var(--muted)">Product not found. <a href="index.html">Back to shop</a></div>';
    return;
  }

  // Determine button/label to show based on product availability
  let actionButtonHTML;
  if (product.available) {
      const telegramPurchaseHref = purchaseTelegramLink(product);
      // Purchase button for AVAILABLE products
      actionButtonHTML = `<a class="btn primary" id="purchaseBtn" href="${telegramPurchaseHref}" target="_blank" rel="noopener">Purchase via Telegram</a>`;
  } else {
      // NEW: Out of Stock label for UNAVAILABLE products
      actionButtonHTML = `<span class="stock-label out-of-stock">Out of Stock</span>`;
  }

  // 1. Render main product details 
  container.innerHTML = `
    <div class="product-image"></div>
    <div class="product-info">
      <h1>${product.title}</h1>
      <p class="muted">${product.short}</p>
      <div style="margin-top:12px;font-weight:700;color:var(--accent);font-size:1.25rem">$${product.price}</div>
      <ul class="specs">${product.specs.map(s=>`<li>• ${s}</li>`).join('')}</ul>
      <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
        ${actionButtonHTML}
      </div>
      <p style="margin-top:12px;color:var(--muted)">Delivery is available in: <strong>Cambodia</strong>.</p>
    </div>
  `;
  const imageContainer = container.querySelector('.product-image');
  const images = Array.isArray(product.images) && product.images.length ? product.images : [];
  const carousel = createCarousel(images);
  imageContainer.appendChild(carousel);
  
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
