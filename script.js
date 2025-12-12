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
    specs: ["60% (61 keys)","Full Aluminum CNC case","PBT dye‑sublimation keycaps","Hot‑swap / magnetic switches","8K Hz Polling rate","0.08ms Ultra Low Latency","256k scanning-rate","Precision 0.001mm","Super stable RT","32K N-Key Scanning-rate","2 Profile RT Button","Functions SOCD / DKS / RT / MT / TGL / Key remapping","Champion Preset","Cherry Profile Keycaps"],
    // NEW: Options for keyboard
    // NEW: Options for mouse colors/versions
      options: [
        { name: "LEVIANTAN Edition", available: true, image: "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/leviatan.jpg" },
        { name: "WOLVES Edition", available: true, image: "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/wolves.jpg" },
      ]
  },
{
    id: "atkrs7",
    title: "ATK RS7",
    short: "ATK RS7 eSports Hall Effect Keyboard",
    price: 70,
    layout: "75",
    available: true,
    images: [
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7/1.png",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7/2.png",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7/3.png",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7/4.png",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7/5.png",
      "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7/6.png",

"https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7/7.png",

"https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7/8.png",
    ],
    specs: ["75% (81 keys)","CNC Top Case", "5 Sided Dye-Sub Keycaps","8K Hz Polling rate","0.3ms Ultra Low Latency","Precision 0.05mm-0.02mm (None-Backlit eSport Edition","RT Range 0.1~3.4mm","4 Padding Layers","ATK V1 Stabilizer","Functions SOCD / DKS / RT / MT / TGL / Key remapping"],
    // NEW: Options for keyboard
    // NEW: Options for mouse colors/versions
      options: [
        { name: "Rainbow (None-Backlit(", available: true, image: "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7/purple.png },
        { name: "Drive To Win (RGB)", available: false, image: "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7/white.png" },
      ]
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
    specs: ["68% (68 keys)","ABS + PC with Aluminum Alloy","ABS Double-Shot Keycaps","Hot‑swap / magnetic switches","8K Hz Polling rate","0.125ms Low Latency","256k scanning-rate","Zero Dead-Zone","Electric Light-Box","Precision 0.01mm","Functions SOCD / DKS / RT / MT / TGL / Key remapping","Wired Connection","Proprietary MCR original height profile"],
    options: null // No options for this product
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
    specs: ["65% (68 keys)","Full Aluminum CNC","Hot‑swap / magnetic switches","16K/8K Hz Polling rate","0.06ms/0.125ms Ultra Low Latency","256k scanning-rate","Zero Dead-Zone","2/4 PCB Layers","Adaptive Dynamic Calibration 2.0","Electric Light-Box","Precision 0.01mm","3 Rapid-Trigger profile support","RT Button profile switch","Multi-Function Knob","Dual Drivers Support","16M ARGB, Music Rhythm 2.0, Aura Sync Lightning","Functions SOCD / DKS / RT / MT / TGL / Key remapping","Wired Connection","Proprietary MCR original height profile"],
    options: null
   }
  ],
  mice: [
    {
      id: "scyroxv8",
      title: "Scyrox V8",
      short: "36-Gram Ultra-Lightweight Wireless Gaming Mouse with 8K Polling Rate",
      price: 60,
      layout: "36g",
      available: false,
      images: [
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/scyroxv8/10.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/scyroxv8/20.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/scyroxv8/30.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/scyroxv8/40.jpg",
      ],
      specs: ["Paw3950 Sensor", "36Gram Weight", "8K Hz Polling-Rate", "MCU Nordic-52840", "Track Speed 750IPS","30k DPI", "Acceleration 50g", "Omron Optical Switches", "Wireless / Wired", "Web-Based Driver", "Yellow Color Available"],
      options: null
    },
    {
      id: "atkf1pro",
      title: "ATK Blazing Sky F1 Pro",
      short: "45-Gram Wireless Gaming Mouse with 8K Polling Rate, PAW3950 Sensor",
      price: 80,
      layout: "45g",
      available: false,
      images: [
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/blazingF1pro/2.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/blazingF1pro/1.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/blazingF1pro/3.jpg",
      ],
      specs: [
        "PAW3950 Optical Sensor",
        "45g ± 2g Ultralight Weight",
        "8K Hz Wireless/Wired Polling Rate",
        "Nordic 52840 MCU",
        "Track Speed 750 IPS",
        "Max DPI 36000",
        "Acceleration 70G",
        "Omron Optical Switches",
        "Wireless (2.4GHz) / Wired / Bluetooth (varies by model)",
        "Ice-feeling Coating",
        "ATK HUB/Web Driver Supported"
      ],
      options: null
    },
    {
      id: "vxer1se",
      title: "VXE R1 SE (Dragonfly R1 SE)",
      short: "51-Gram Lightweight Tri-Mode Wireless Gaming Mouse",
      price: 35,
      layout: "51g",
      available: true,
      images: [
       "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/vxer1se/1.png",
       "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/vxer1se/2.jpg",
       "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/vxer1se/3.jpg",
       "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/vxer1se/4.jpg",
       "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/vxer1se/5.jpg",
       "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/vxer1se/6.jpg",
       "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/vxer1se/7.jpg",
      ],
      specs: [
        "PAW3395 SE Sensor",
        "51g Weight (R1 SE/R1)",
        "Up to 2K Hz Polling Rate (1K Hz standard, 2K on some models)",
        "Nordic/BEKEN Chipset",
        "Track Speed 400 IPS",
        "Max DPI 18000",
        "Acceleration 40G",
        "Huano/IceBerry Switches (Varies)",
        "Tri-Mode: 2.4G Wireless / Bluetooth 5.3 / Wired Type-C",
        "520mAh Battery (R1 SE+ model), 250mAh (R1 SE)",
        "Web-Driver Customization"
      ],
      options: null
    },
    {
      id: "lamzumayax",
      title: "Lamzu Maya X 8K Wireless",
      short: "47-Gram Symmetrical Gaming Mouse with 8K Polling Rate",
      price: 120, // Approximate price
      layout: "47g",
      available: true,
      images: [
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/1.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/2.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/3.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/4.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/5.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/6.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/7.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/8.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/9.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/10.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/11.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/12.jpg",
      ],
      specs: [
        "PixArt 3950 Sensor",
        "47g Weight",
        "8K Hz Polling Rate (8K Dongle Included)",
        "Nordic 52840 MCU",
        "Track Speed 750 IPS",
        "Max DPI 30000",
        "Acceleration 50G",
        "Omron Optical Switches",
        "Symmetrical Shape (Small/Medium Hands)",
        "Wireless (2.4GHz) / Wired (Type-C)",
        "Web-Based Aurora Driver"
      ],
      // NEW: Options for mouse colors/versions
      options: [
        { name: "Purple Shadow", available: true, image: "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/purple.jpg" },
        { name: "Light Pink", available: true, image: "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/pink.jpg" },
        { name: "Charcoal Black", available: false, image: "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/black.jpg" },
        { name: "White", available: false, image: "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/white.jpg" },
        { name: "Cloud Gray", available: false, image: "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/cloud.jpg" },
      ]
    },
  ]
};
const allProducts = [...productData.keyboards, ...productData.mice]; // Combined for detail page lookup

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';
  // Set initial state
if (currentTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  themeToggle.querySelector('.icon').textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'light') {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.querySelector('.icon').textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.querySelector('.icon').textContent = '☀️';
    localStorage.setItem('theme', 'light');
  }
});

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

function whatsappLink(product){
  const base = `https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(/\D/g,'')}`;
  const text = encodeURIComponent(`Hi, I'm interested in ${product.title}. Is it available?`);
  return `${base}?text=${text}`;
}

function purchaseTelegramLink(product, optionName = null) {
    // Prefix text with product details
    let purchaseText = `Hello, I would like to purchase the ${product.title}`;
    if (optionName) {
        purchaseText += ` (${optionName} option)`;
    }
    purchaseText += ` (ID: ${product.id}). Is it still available for $${product.price}?`;
    const text = encodeURIComponent(purchaseText);
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

// MODIFIED: Function to create a product option card. Moves 'Sold out' label inside the image wrap.
function createOptionCard(product, option, onSelect) {
    // Use button for clickable options, div for unclickable ones for semantics
    const optionElement = document.createElement(option.available ? 'button' : 'div');
    // Ensure all options have the base class for styling
    optionElement.className = 'product-option' + (option.available ? '' : ' locked');
    optionElement.type = 'button'; // Explicitly set type for button
    optionElement.tabIndex = option.available ? 0 : -1;
    optionElement.dataset.optionName = option.name; // Use for selection logic

    if (option.available) {
        // The click handler now calls the provided onSelect function
        optionElement.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default button behavior
            onSelect(option);
        });
    } else {
        optionElement.setAttribute('aria-disabled', 'true');
        optionElement.addEventListener('click', (e) => e.preventDefault()); // Just in case
    }

    // Inner HTML is modified to place the 'Sold out' label inside the image wrap.
    optionElement.innerHTML = `
        <div class="option-image-wrap">
            <img src="${option.image}" alt="${product.title} - ${option.name}" loading="lazy">
            ${option.available ? '' : '<span class="option-stock-label">Sold out</span>'}
        </div>
        <div class="option-text">
            <h4 class="option-title">${option.name}</h4>
        </div>
    `;

    return optionElement;
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

// Function to handle scrolling for similar products (keep this one)
function scrollSimilarProducts(direction) {
    const grid = document.getElementById('similarProductsGrid');
    if (!grid) return;

    const cardWidth = grid.querySelector('.card')?.offsetWidth + 20; // Card width + gap
    const scrollAmount = cardWidth * (direction === 'next' ? 1 : -1);
    
    // Smooth scroll behavior
    grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

// REMOVED scrollProductOptions function

function renderSimilarProductsSection(currentProductId) {
    const similarSection = document.getElementById('similarProductsSection');
    const otherProducts = allProducts.filter(p => p.id !== currentProductId);
    const backLinkHTML = '<div style="margin-top:28px;"><a class="back-link" href="index.html">← Back to shop</a></div>';

    if (!similarSection || otherProducts.length === 0) {
        document.querySelector('.product-page').insertAdjacentHTML('beforeend', backLinkHTML);
        return;
    }
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
    otherProducts.forEach(p => {
        grid.appendChild(createProductCard(p));
    });
    similarSection.querySelector('.scroll-nav-btn.left').addEventListener('click', () => scrollSimilarProducts('prev'));
    similarSection.querySelector('.scroll-nav-btn.right').addEventListener('click', () => scrollSimilarProducts('next'));
    similarSection.insertAdjacentHTML('afterend', backLinkHTML);
}

// MODIFIED: Product Detail Rendering Logic (Removed option scroll button elements/listeners)
function renderProductDetail(product){
    const container = document.getElementById('productContainer');
    if(!container) return;

    if(!product){
      container.innerHTML = '<div style="color:var(--muted)">Product not found. <a href="index.html">Back to shop</a></div>';
      return;
    }

    // Store the original images for reference
    const defaultImages = product.images; 
    let selectedOption = null;

    // Helper to update the DOM based on the current selection
    function updateProductDisplay(option) {
        selectedOption = option;

        const titleEl = container.querySelector('#productTitle');
        const purchaseBtn = container.querySelector('#purchaseBtn');
        const imagesContainer = container.querySelector('.product-image');

        // 1. Update Title (e.g., "Lamzu Maya X 8K" + " (Polaris)")
        if (titleEl) {
            if (selectedOption) {
                // Use a span for the option name to apply muted color via CSS
                titleEl.innerHTML = `${product.title} <span class="option-name-display">(${selectedOption.name})</span>`;
            } else {
                titleEl.innerHTML = product.title;
            }
        }

        // 2. Update Images/Carousel
        let newImages = defaultImages;
        if (selectedOption && selectedOption.image) {
            // Use the option image as the first slide, then the rest of the defaults
            // Filter out the option image if it already exists in the default list to prevent duplicates
            newImages = [selectedOption.image, ...defaultImages.filter(img => img !== selectedOption.image)];
        } 

        // Re-render the carousel with the new image set
        imagesContainer.innerHTML = '';
        const carousel = createCarousel(newImages);
        imagesContainer.appendChild(carousel);
        carousel.focus();

        // 3. Update Purchase Link
        if (purchaseBtn) {
            // Check if the overall product is available or if a specific option is selected and available
            const isPurchasable = product.available && (!selectedOption || selectedOption.available);
            
            if (isPurchasable) {
                const optionNameForLink = selectedOption ? selectedOption.name : null;
                const telegramPurchaseHref = purchaseTelegramLink(product, optionNameForLink);
                
                purchaseBtn.href = telegramPurchaseHref;
                
                // Update button text based on selection
                let buttonText = `Purchase : ${product.title}`;
                /*
                if (selectedOption && selectedOption.available) {
                    buttonText = `Purchase : ${product.title} (${selectedOption.name})`;
                }*/
                 purchaseBtn.classList.remove('locked');
                 purchaseBtn.disabled = false;
                 purchaseBtn.textContent = buttonText;

            } else {
                 purchaseBtn.classList.add('locked');
                 purchaseBtn.disabled = true;
                 purchaseBtn.textContent = `Unavailable`;
            }
        }


        // 4. Update active class on option cards
        const optionsGrid = document.getElementById('optionsGrid');
        if(optionsGrid) {
            optionsGrid.querySelectorAll('.product-option').forEach(card => {
                const cardName = card.dataset.optionName;
                if (selectedOption && cardName === selectedOption.name) {
                    card.classList.add('active-option');
                } else {
                    card.classList.remove('active-option');
                }
            });
        }
    }
    
    // Initial HTML structure render
    let actionButtonHTML = '';
    actionButtonHTML = `<a class="btn primary" id="purchaseBtn" href="#" target="_blank" rel="noopener">Purchase via Telegram</a>`;
    if (!product.available) {
        actionButtonHTML = `<span class="stock-label out-of-stock">Unavailable</span>`;
    }

    // NEW LOGIC: Check if options exist to conditionally render the options container
    const hasOptions = product.options && product.options.length > 0;
    
    // MODIFIED: Removed the scroll-nav-btn elements
    const optionsPlaceholderHTML = hasOptions ? `
        <div class="product-options-container">
            <h3>Available Options</h3>
            <div class="options-scroll-container">
                <div class="options-scroll-wrapper">
                    <div id="optionsGrid" class="options-grid horizontal-scroll"></div>
                </div>
            </div>
        </div>
    ` : '';


    container.innerHTML = `
        <div class="product-image"></div>
        <div class="product-info">
            <h1 id="productTitle">${product.title}</h1> <p class="muted">${product.short}</p>
            <div style="margin-top:12px;font-weight:700;color:var(--accent);font-size:1.25rem">$${product.price}</div>
            <ul class="specs">${product.specs.map(s=>`<li>• ${s}</li>`).join('')}</ul>
            <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
                ${actionButtonHTML}
            </div>
            <p style="margin-top:12px;color:var(--muted)">Delivery is available in: <strong>Cambodia</strong>.</p>
        </div>
        ${optionsPlaceholderHTML} `;

    // 2. Render Options and Initial Display
    if (hasOptions) {
        const optionsGrid = document.getElementById('optionsGrid');

        // Logic to handle option click
        const handleOptionClick = (option) => {
            updateProductDisplay(option);
        };

        product.options.forEach(option => {
            optionsGrid.appendChild(createOptionCard(product, option, handleOptionClick));
        });

        // Set the default option selection to the first available option
        const initialOption = product.options.find(o => o.available) || product.options[0];
        if (initialOption && initialOption.available) {
            // Initial render state should reflect the first available selected option
            updateProductDisplay(initialOption);
        } else {
             // If the only options are unavailable, render with null selection
            updateProductDisplay(null);
        }
        
        // Removed scroll button listeners

    } else {
        // If no options at all (hasOptions is false), render with default settings.
        updateProductDisplay(null);
    }

    // 3. Render Similar Products
    renderSimilarProductsSection(product.id);
}

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

  // Force update when image set changes, ensuring the carousel starts at index 0
  index = 0;
  slidesCount = images.length;
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