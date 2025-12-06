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
      short: "ATK EDGE 60HE ULTIMATE Esports Magnetic Keyboard - LEVIATAN Collaboration. This description is long to test truncation.",
      price: 229,
      layout: "60",
      available: false,
      images: [
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/2_27ffe2b5-f717-4c2f-940c-959572442aa1.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/ATK_EDGE_60_HE_Keyboard.jpg",
      ],
      specs: ["60% (61 keys)","Full Aluminum CNC case","PBT dye‑sublimation keycaps"]
    },
    {
      id: "made68pro",
      title: "MEELGEEK MADE68 PRO",
      short: "The MADE68 Pro goes beyond a simple keyboard. It's a truly modular experience, engineered with wireless freedom and MelGeek HIVE",
      price: 140,
      layout: "68",
      available: true, 
      images: [
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/made68pro/MelGeek_MADE68_Pro_12.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/made68pro/MelGeek_MADE68_Pro_1.jpg",
      ],
      specs: ["68% (68 keys)","ABS + PC with Aluminum Alloy","ABS Double-Shot Keycaps"]
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
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68turbo/31.png",
      ],
      specs: ["65% (68 keys)","Full Aluminum CNC","Hot‑swap / magnetic switches"]
    },
    // Items 4, 5, 6, 7, 8 (to test the 4 mobile limit and 8 desktop limit)
    { id: "kb4", title: "K-BOARD 4", short: "Fourth keyboard for testing limits.", price: 90, layout: "TKL", available: true, images: ["https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/ATK_EDGE_60_HE_Keyboard.jpg"], specs: ["TKL (87 keys)"] },
    { id: "kb5", title: "K-BOARD 5", short: "Fifth keyboard for testing limits.", price: 100, layout: "65", available: false, images: ["https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/made68pro/MelGeek_MADE68_Pro_1.jpg"], specs: ["65% (68 keys)"] },
    { id: "kb6", title: "K-BOARD 6", short: "Sixth keyboard for testing limits.", price: 110, layout: "75", available: true, images: ["https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68turbo/31.png"], specs: ["75% (84 keys)"] },
    { id: "kb7", title: "K-BOARD 7", short: "Seventh keyboard for testing limits.", price: 120, layout: "Full", available: false, images: ["https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/ATK_EDGE_60_HE_Keyboard.jpg"], specs: ["Full (104 keys)"] },
    { id: "kb8", title: "K-BOARD 8", short: "Eighth keyboard for testing limit appearance.", price: 130, layout: "60", available: true, images: ["https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/made68pro/MelGeek_MADE68_Pro_1.jpg"], specs: ["60% (61 keys)"] },
    { id: "kb9", title: "K-BOARD 9 (Extra)", short: "Ninth keyboard to trigger the More button.", price: 150, layout: "TKL", available: true, images: ["https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68turbo/31.png"], specs: ["TKL (87 keys)"] },
  ],
  // NEW: Example mouse products
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

// NEW: Constants for display limits (2 rows * columns)
const MOBILE_COLUMNS = 2;
const DESKTOP_COLUMNS = 4;
const INITIAL_MOBILE_LIMIT = MOBILE_COLUMNS * 2; // 4 items
const INITIAL_DESKTOP_LIMIT = DESKTOP_COLUMNS * 2; // 8 items

function getInitialLimit() {
  // Mobile breakpoint used in styles.css is 600px
  return window.innerWidth < 600 ? INITIAL_MOBILE_LIMIT : INITIAL_DESKTOP_LIMIT;
}


/* ---------- Index page: render product cards ---------- */
// Takes product list, grid element ID, more button container ID, and category name
function renderIndexCards(list, gridId, moreContainerId, categoryName){
  const grid = document.getElementById(gridId);
  const loadMoreContainer = document.getElementById(moreContainerId);
  if(!grid || !loadMoreContainer) return;

  const limit = getInitialLimit();
  
  grid.innerHTML = '';
  loadMoreContainer.innerHTML = ''; // Clear the button container

  // Determine the list to render (limited view)
  const productsToRender = list.slice(0, limit);

  productsToRender.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'card';

    const availClass = p.available ? 'availability available' : 'availability unavailable';
    const availText = p.available ? 'Available' : 'Unavailable';
    const href = productLink(p.id);
    // Safely get the first image
    const cover = Array.isArray(p.images) && p.images.length ? p.images[0] : '';
    
    // Check availability for in-stock class
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
    grid.appendChild(card);
  });
  
  // Create "More items" button if products remain
  if (list.length > limit) {
    const loadMoreLink = document.createElement('a');
    loadMoreLink.className = 'btn primary';
    loadMoreLink.textContent = 'More items';
    // NEW: Set the link to navigate to a page showing all items in this category
    // Assuming `products.html` handles filtering by category if needed, 
    // but for this example, we'll just link to a generic shop page.
    loadMoreLink.href = `products.html?category=${categoryName}`; 
    loadMoreContainer.appendChild(loadMoreLink);
  }
}

// Function to handle filtering for a specific category
function filterProducts(query, categoryList, gridId, moreContainerId, categoryName) {
    const normalizedQuery = query.toLowerCase().trim();
    const filteredList = categoryList.filter(p =>
        p.title.toLowerCase().includes(normalizedQuery) ||
        p.short.toLowerCase().includes(normalizedQuery) ||
        p.id.toLowerCase().includes(normalizedQuery)
    );
    // When filtering, we always use the initial limit
    renderIndexCards(filteredList, gridId, moreContainerId, categoryName);
}


// NEW: Function to initialize each product section
function initProductSection(categoryName) {
    const productsList = productData[categoryName];
    const gridId = `${categoryName}Grid`;
    const moreContainerId = `${categoryName}MoreContainer`;
    const searchInputId = `${categoryName}Search`;

    const searchInput = document.getElementById(searchInputId);

    // Initial render
    renderIndexCards(productsList, gridId, moreContainerId, categoryName); 

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterProducts(e.target.value, productsList, gridId, moreContainerId, categoryName);
        });
    }
}

// NEW: Function to handle initial rendering and filtering
function initIndexPage() {
    // Initialize Keyboards section
    initProductSection('keyboards');

    // Initialize Mice section
    initProductSection('mice');

    // NOTE: Resize handling is not strictly necessary anymore since the "limit" is 
    // calculated on render based on viewport size, and the button is a simple link.
    // If the window size changes, a manual refresh will correctly apply the new limit.
    // We can skip the resize listener for simplicity, or keep a simpler version:
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            initProductSection('keyboards'); // Re-render to adjust limit if necessary
            initProductSection('mice');
        }, 200); 
    });
}


/* ---------- Carousel (shared, remains the same) ---------- */
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
        <div style="align-self:center;color:var(--muted)">Discord: <strong style="color:#fff">${DISCORD_HANDLE}</strong></div>
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
  if(discordMain) discordMain.textContent = DISCORD_HANDLE;

  const grid = document.getElementById('keyboardGrid'); // Check for the presence of the main grid
  const container = document.getElementById('productContainer');

  if(grid){
    // This is the index page
    initIndexPage(); 
  } else if(container){
    // This is the product detail page (products.html)
    const id = getQueryParam('id');
    // Find product across all categories
    const product = allProducts.find(p => p.id === id); 
    renderProductDetail(product);
  }
})();
