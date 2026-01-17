// Product data - loaded from JSON files
let keyboards = [];
let mice = [];
let keycaps = [];
let mousepads = [];

// Popup event config - loaded from config.json
let popupConfig = null;

const CONTACT_WHATSAPP_NUMBER = "85514975307";
const TELEGRAM_HANDLE = "glsswrksGG";
const DISCORD_HANDLE = "Kokushibo#4764";

// Backend removed: frontend-only, no external API client

let currentProductForPreorder = null;
let selectedPreorderOption = null;
// Track the product/option currently shown in the option preview modal
let currentOptionPreview = null;

// Cart option modal state
let currentProductForCart = null;
let selectedCartOption = null;

// Image modal gallery state for preview navigation
let imageModalGallery = [];
let imageModalIndex = 0;

// Load products from JSON files
async function loadProductsFromJSON() {
  try {
    const [keyboardsRes, miceRes, keycapsRes, mousepadsRes] = await Promise.all([
      fetch("./products/json/keyboards.json"),
      fetch("./products/json/mice.json"),
      fetch("./products/json/keycaps.json"),
      fetch("./products/json/mousepads.json"),
    ]);

    if (keyboardsRes.ok) {
      const data = await keyboardsRes.json();
      keyboards = data.keyboards || [];
    }
    if (miceRes.ok) {
      const data = await miceRes.json();
      mice = data.mice || [];
    }
    if (keycapsRes.ok) {
      const data = await keycapsRes.json();
      keycaps = data.keycaps || [];
    }
    if (mousepadsRes.ok) {
      const data = await mousepadsRes.json();
      mousepads = data.mousepads || [];
    }

    // Update productData and allProducts after loading
    productData.keyboards = keyboards;
    productData.mice = mice;
    productData.keycaps = keycaps;
    productData.mousepads = mousepads;
    
    // Rebuild allProducts array
    allProducts.length = 0;
    allProducts.push(...keyboards, ...mice, ...keycaps, ...mousepads);

    console.log("Products loaded from JSON:", {
      keyboards: keyboards.length,
      mice: mice.length,
      keycaps: keycaps.length,
      mousepads: mousepads.length,
    });
  } catch (error) {
    console.error("Error loading products from JSON:", error);
  }
}

// Load popup config from config.json
async function loadPopupConfig() {
  try {
    const response = await fetch("./products/json/config.json");
    if (response.ok) {
      const config = await response.json();
      popupConfig = config.popupEvent || null;
      console.log("Popup config loaded:", popupConfig);
    }
  } catch (error) {
    console.error("Error loading popup config:", error);
    popupConfig = null;
  }
}
// Unregister any lingering service workers and clear caches from previous setup
(async function cleanupOldServiceWorker() {
  if ("serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const reg of registrations) {
      await reg.unregister();
      console.log("Unregistered old service worker");
    }
  }
  if ("caches" in window) {
    const cacheNames = await caches.keys();
    for (const name of cacheNames) {
      await caches.delete(name);
      console.log("Deleted cache:", name);
    }
  }
})();

/* Image Lightbox Modal Helpers */
function initImageModal() {
  if (document.getElementById("imageModal")) return;
  const modal = document.createElement("div");
  modal.id = "imageModal";
  modal.className = "modal image-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="modal-content image-modal-content">
      <button class="modal-close image-modal-close" aria-label="Close">&times;</button>
      <img src="" alt="Preview" class="image-modal-img">
    </div>
  `;
  document.body.appendChild(modal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeImageModal();
  });

  modal
    .querySelector(".image-modal-close")
    .addEventListener("click", closeImageModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeImageModal();
  });

  // Touch / pointer swipe support on modal content
  let touchStartX = 0;
  let touchMoving = false;
  const content = modal.querySelector(".image-modal-content");
  if (content) {
    content.addEventListener(
      "touchstart",
      (ev) => {
        if (ev.touches.length !== 1) return;
        // Ignore gestures that start on the close button
        if (ev.target.closest && ev.target.closest(".image-modal-close"))
          return;
        touchStartX = ev.touches[0].clientX;
        touchMoving = true;
      },
      { passive: true }
    );

    content.addEventListener("touchend", (ev) => {
      if (!touchMoving) return;
      touchMoving = false;
      const dx =
        ev.changedTouches && ev.changedTouches[0]
          ? ev.changedTouches[0].clientX - touchStartX
          : 0;
      const threshold = 40; // px
      if (dx > threshold) navigateImageModal(-1);
      else if (dx < -threshold) navigateImageModal(1);
    });

    // Pointer (mouse) drag support for desktop
    let ptrDown = false;
    let ptrStartX = 0;
    content.addEventListener("pointerdown", (ev) => {
      // Ignore pointer interactions that originate from the close button
      if (ev.target.closest && ev.target.closest(".image-modal-close")) return;
      ptrDown = true;
      ptrStartX = ev.clientX;
      content.setPointerCapture?.(ev.pointerId);
    });
    content.addEventListener("pointerup", (ev) => {
      if (!ptrDown) return;
      ptrDown = false;
      const dx = ev.clientX - ptrStartX;
      const threshold = 60;
      if (dx > threshold) navigateImageModal(-1);
      else if (dx < -threshold) navigateImageModal(1);
    });
    content.addEventListener("pointercancel", () => {
      ptrDown = false;
    });
  }
}

// Lock any mousepad products that are glass and hide the mousepads section.
function lockAndHideGlasspadSection() {
  if (!Array.isArray(mousepads)) return;
  mousepads.forEach((p) => {
    const title = (p.title || "").toLowerCase();
    const short = (p.short || "").toLowerCase();
    const specs = Array.isArray(p.specs)
      ? p.specs.join(" ").toLowerCase()
      : p.specs && typeof p.specs === "string"
      ? p.specs.toLowerCase()
      : "";
    if (
      title.includes("glass") ||
      short.includes("glass") ||
      specs.includes("glass") ||
      (p.layout || "").toLowerCase().includes("glass")
    ) {
      p.available = false;
      p.locked = true;
    }
  });

  const anyLocked = mousepads.some((p) => p.locked);
  const section = document.getElementById("mousepads");
  if (section && anyLocked) {
    section.style.display = "none";
    section.classList.add("locked-section");
  }
}

// Unlock mousepads: remove `locked` flags and ensure section is visible again
function unlockMousepadsSection() {
  if (!Array.isArray(mousepads)) return;
  mousepads.forEach((p) => {
    if (p.locked) delete p.locked;
  });

  const section = document.getElementById("mousepads");
  if (section) {
    section.style.display = "";
    section.classList.remove("locked-section");
  }
}

// Immediately attempt to unlock on script load (ensures current dev/testing state restores)
try {
  unlockMousepadsSection();
} catch (e) {
  /* ignore in environments without DOM */
}

function openImageModal(src) {
  // Backwards-compatible single-src opener
  openImageModalWithGallery([src || ""], 0);
}

function openImageModalWithGallery(images, startIndex = 0) {
  if (!document.getElementById("imageModal")) initImageModal();
  const m = document.getElementById("imageModal");
  const img = m.querySelector(".image-modal-img");
  if (!Array.isArray(images)) images = [String(images)];
  imageModalGallery = images.slice();
  imageModalIndex = Math.max(
    0,
    Math.min(startIndex || 0, imageModalGallery.length - 1)
  );
  img.src = imageModalGallery[imageModalIndex] || "";
  m.setAttribute("aria-hidden", "false");
}

function navigateImageModal(delta) {
  const m = document.getElementById("imageModal");
  if (!m || !imageModalGallery || !imageModalGallery.length) return;
  imageModalIndex =
    (imageModalIndex + delta + imageModalGallery.length) %
    imageModalGallery.length;
  const img = m.querySelector(".image-modal-img");
  if (img) img.src = imageModalGallery[imageModalIndex] || "";
}

function closeImageModal() {
  const m = document.getElementById("imageModal");
  if (!m) return;
  m.setAttribute("aria-hidden", "true");
  const img = m.querySelector(".image-modal-img");
  if (img) img.src = "";
}

/* Option Preview Modal for unavailable/locked options */
function initOptionPreviewModal() {
  if (document.getElementById("optionPreviewModal")) return;
  const modal = document.createElement("div");
  modal.id = "optionPreviewModal";
  modal.className = "modal option-preview-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="modal-content option-preview-content">
      <button class="modal-close option-preview-close" aria-label="Close">&times;</button>
      <div class="option-preview-image-wrap">
        <img src="" alt="Option Preview" class="option-preview-img">
      </div>
      <div class="option-preview-info">
        <h3 class="option-preview-title"></h3>
        <div class="option-preview-meta">
          <p class="option-preview-price"></p>
          <span class="option-preview-stock-label">OUT OF STOCK</span>
        </div>
        <p class="option-preview-status">This option is currently unavailable</p>
      </div>
    </div>
    <button class="option-nav option-preview-prev" aria-label="Previous option">&#8249;</button>
    <button class="option-nav option-preview-next" aria-label="Next option">&#8250;</button>
  `;
  document.body.appendChild(modal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeOptionPreviewModal();
  });

  const closeBtn = modal.querySelector(".option-preview-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeOptionPreviewModal();
    });
    // Prevent pointer/touch handlers on the content from reacting when interacting with the close button
    closeBtn.addEventListener("pointerdown", (e) => e.stopPropagation());
    closeBtn.addEventListener("touchstart", (e) => e.stopPropagation(), {
      passive: true,
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeOptionPreviewModal();
  });

  // Add keyboard navigation for left/right when modal open
  document.addEventListener("keydown", (e) => {
    if (
      document
        .getElementById("optionPreviewModal")
        ?.getAttribute("aria-hidden") !== "false"
    )
      return;
    if (e.key === "ArrowLeft") {
      navigateOptionPreview(-1);
    }
    if (e.key === "ArrowRight") {
      navigateOptionPreview(1);
    }
  });

  // Touch / pointer swipe support on modal content
  let touchStartX = 0;
  let touchMoving = false;
  const content = modal.querySelector(".option-preview-content");
  if (content) {
    // Wire up prev/next buttons to navigate options
    const prevBtn = modal.querySelector(".option-preview-prev");
    const nextBtn = modal.querySelector(".option-preview-next");
    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navigateOptionPreview(-1);
      });
      prevBtn.addEventListener("pointerdown", (e) => e.stopPropagation());
      prevBtn.addEventListener("touchstart", (e) => e.stopPropagation(), {
        passive: true,
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navigateOptionPreview(1);
      });
      nextBtn.addEventListener("pointerdown", (e) => e.stopPropagation());
      nextBtn.addEventListener("touchstart", (e) => e.stopPropagation(), {
        passive: true,
      });
    }
    content.addEventListener(
      "touchstart",
      (ev) => {
        if (ev.touches.length !== 1) return;
        // Don't start swipe tracking if touching a button or interactive element
        if (ev.target.closest("button, a, input, [role='button']")) return;
        touchStartX = ev.touches[0].clientX;
        touchMoving = true;
      },
      { passive: true }
    );

    content.addEventListener(
      "touchmove",
      (ev) => {
        if (!touchMoving || ev.touches.length !== 1) return;
        // prevent accidental scroll when swiping horizontally
      },
      { passive: true }
    );

    content.addEventListener("touchend", (ev) => {
      if (!touchMoving) return;
      touchMoving = false;
      const dx =
        ev.changedTouches && ev.changedTouches[0]
          ? ev.changedTouches[0].clientX - touchStartX
          : 0;
      const threshold = 40; // px
      if (dx > threshold) navigateOptionPreview(-1);
      else if (dx < -threshold) navigateOptionPreview(1);
    });

    // Pointer (mouse) drag support
    let ptrDown = false;
    let ptrStartX = 0;
    content.addEventListener("pointerdown", (ev) => {
      // Don't capture pointer if clicking on a button or interactive element
      if (ev.target.closest("button, a, input, [role='button']")) return;
      ptrDown = true;
      ptrStartX = ev.clientX;
      content.setPointerCapture?.(ev.pointerId);
    });
    content.addEventListener("pointerup", (ev) => {
      if (!ptrDown) return;
      ptrDown = false;
      const dx = ev.clientX - ptrStartX;
      const threshold = 60;
      if (dx > threshold) navigateOptionPreview(-1);
      else if (dx < -threshold) navigateOptionPreview(1);
    });
    content.addEventListener("pointercancel", () => {
      ptrDown = false;
    });
  }
}

// Track active close animation to prevent race conditions
let optionPreviewCloseTimeout = null;

function openOptionPreviewModal(option, fallbackPrice = null, product = null) {
  if (!document.getElementById("optionPreviewModal")) initOptionPreviewModal();
  const m = document.getElementById("optionPreviewModal");

  // Cancel any pending close animation
  if (optionPreviewCloseTimeout) {
    clearTimeout(optionPreviewCloseTimeout);
    optionPreviewCloseTimeout = null;
  }
  m.classList.remove("closing");

  const img = m.querySelector(".option-preview-img");
  const title = m.querySelector(".option-preview-title");
  const price = m.querySelector(".option-preview-price");
  const stockLabel = m.querySelector(".option-preview-stock-label");
  const statusText = m.querySelector(".option-preview-status");

  img.src = option.image || "";
  img.alt = option.name || "Option Preview";
  title.textContent = option.name || "";
  const displayPrice =
    option.price !== undefined && option.price !== null
      ? option.price
      : fallbackPrice;
  price.textContent =
    displayPrice !== undefined && displayPrice !== null
      ? `$${displayPrice}`
      : "";

  // Update stock label and status based on availability
  if (option.available) {
    if (stockLabel) {
      stockLabel.textContent = "AVAILABLE";
      stockLabel.classList.remove("out-of-stock");
      stockLabel.classList.add("in-stock");
    }
    if (statusText) statusText.textContent = "This option is currently available.";
  } else {
    if (stockLabel) {
      stockLabel.textContent = "OUT OF STOCK";
      stockLabel.classList.remove("in-stock");
      stockLabel.classList.add("out-of-stock");
    }
    if (statusText) statusText.textContent = "This option is currently unavailable.";
  }

  // store current previewed product/option for navigation
  currentOptionPreview = { product: product, option: option };

  m.setAttribute("aria-hidden", "false");
}

function closeOptionPreviewModal() {
  const m = document.getElementById("optionPreviewModal");
  if (!m) return;

  // Add closing class to trigger exit animation
  m.classList.add("closing");

  // Clear any previous timeout
  if (optionPreviewCloseTimeout) {
    clearTimeout(optionPreviewCloseTimeout);
  }

  // Wait for exit animation to finish before hiding
  optionPreviewCloseTimeout = setTimeout(() => {
    // Only clear if modal is still closing (not reopened)
    if (m.classList.contains("closing")) {
      m.setAttribute("aria-hidden", "true");
      m.classList.remove("closing");

      // clear preview tracking
      currentOptionPreview = null;
    }
    optionPreviewCloseTimeout = null;
  }, 200); // matches CSS animation duration
}

// Navigate option preview by delta (-1 for previous, 1 for next)
function navigateOptionPreview(delta) {
  if (!currentOptionPreview || !currentOptionPreview.product) return;
  const prod = currentOptionPreview.product;
  const opts = Array.isArray(prod.options) ? prod.options : [];
  if (!opts.length) return;
  const current = currentOptionPreview.option;
  let idx = opts.findIndex(
    (o) => o === current || o.name === (current && current.name)
  );
  if (idx === -1) idx = 0;
  let newIdx = idx + delta;
  if (newIdx < 0) newIdx = opts.length - 1;
  if (newIdx >= opts.length) newIdx = 0;
  const nextOpt = opts[newIdx];
  if (nextOpt) {
    openOptionPreviewModal(nextOpt, prod.price, prod);
  }
}

/* ========== Quick Preview Modal ========== */
let quickPreviewSelectedOption = null;

function initQuickPreviewModal() {
  if (document.getElementById("quickPreviewModal")) return;
  
  const modal = document.createElement("div");
  modal.id = "quickPreviewModal";
  modal.className = "quick-preview-modal";
  modal.innerHTML = `
    <div class="quick-preview-content">
      <button class="quick-preview-close" aria-label="Close">&times;</button>
      <div class="quick-preview-image-section">
        <div class="quick-preview-main-image">
          <img src="" alt="Product Image">
        </div>
        <div class="quick-preview-thumbnails"></div>
      </div>
      <div class="quick-preview-info">
        <div class="quick-preview-badge-row"></div>
        <h2 class="quick-preview-title"></h2>
        <div class="quick-preview-price"></div>
        <p class="quick-preview-desc"></p>
        <div class="quick-preview-specs"></div>
        <div class="quick-preview-availability"></div>
        <div class="quick-preview-options"></div>
        <div class="quick-preview-actions">
          <button class="quick-preview-btn quick-preview-btn-primary" id="quickPreviewAddToCart">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            Add To Cart
          </button>
          <button class="quick-preview-btn quick-preview-btn-secondary" id="quickPreviewViewDetails">
            View Full Details
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Close on backdrop click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeQuickPreviewModal();
  });

  // Close button
  modal.querySelector(".quick-preview-close").addEventListener("click", closeQuickPreviewModal);

  // Escape key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeQuickPreviewModal();
    }
  });
}

function openQuickPreviewModal(product) {
  if (!document.getElementById("quickPreviewModal")) initQuickPreviewModal();
  
  const modal = document.getElementById("quickPreviewModal");
  const mainImage = modal.querySelector(".quick-preview-main-image img");
  const thumbnailsContainer = modal.querySelector(".quick-preview-thumbnails");
  const badgeRow = modal.querySelector(".quick-preview-badge-row");
  const titleEl = modal.querySelector(".quick-preview-title");
  const priceEl = modal.querySelector(".quick-preview-price");
  const descEl = modal.querySelector(".quick-preview-desc");
  const specsEl = modal.querySelector(".quick-preview-specs");
  const availabilityEl = modal.querySelector(".quick-preview-availability");
  const optionsEl = modal.querySelector(".quick-preview-options");
  const addToCartBtn = modal.querySelector("#quickPreviewAddToCart");
  const viewDetailsBtn = modal.querySelector("#quickPreviewViewDetails");

  // Reset selected option
  quickPreviewSelectedOption = null;

  // Set main image
  const images = Array.isArray(product.images) ? product.images : [];
  mainImage.src = images[0] || "";

  // Build thumbnails
  thumbnailsContainer.innerHTML = images.slice(0, 6).map((img, idx) => `
    <div class="quick-preview-thumb ${idx === 0 ? 'active' : ''}" data-index="${idx}">
      <img src="${img}" alt="Thumbnail ${idx + 1}">
    </div>
  `).join("");

  // Thumbnail click handlers
  thumbnailsContainer.querySelectorAll(".quick-preview-thumb").forEach(thumb => {
    thumb.addEventListener("click", () => {
      thumbnailsContainer.querySelectorAll(".quick-preview-thumb").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      mainImage.src = images[parseInt(thumb.dataset.index)] || "";
    });
  });

  // Badges
  let badges = [];
  if (product.isNew) badges.push('<span class="quick-preview-badge new">New</span>');
  if (product.lowStock && product.available) badges.push('<span class="quick-preview-badge low-stock">Low Stock</span>');
  if (!product.available) badges.push('<span class="quick-preview-badge out-of-stock">Out of Stock</span>');
  badgeRow.innerHTML = badges.join("");

  // Title and price
  titleEl.textContent = product.title || "";
  priceEl.textContent = `$${product.price || 0}`;

  // Description
  descEl.textContent = product.short || "";

  // Specs - show a few key specs
  const specsList = [];
  if (product.layout) specsList.push(product.layout);
  if (product.specs) {
    if (product.specs.switches) specsList.push(product.specs.switches.split("/")[0].trim());
    if (product.specs.pollingRate) specsList.push(product.specs.pollingRate);
    if (product.specs.connectivity) specsList.push(product.specs.connectivity);
  }
  specsEl.innerHTML = specsList.slice(0, 4).map(spec => 
    `<span class="quick-preview-spec">${spec}</span>`
  ).join("");

  // Availability
  availabilityEl.className = `quick-preview-availability ${product.available ? 'available' : 'unavailable'}`;
  availabilityEl.innerHTML = product.available 
    ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> Available`
    : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg> Unavailable`;

  // Options
  if (product.options && product.options.length > 0) {
    const availableOptions = product.options.filter(opt => opt.available !== false);
    if (availableOptions.length > 0) {
      quickPreviewSelectedOption = availableOptions[0]; // Auto-select first available
    }

    optionsEl.innerHTML = `
      <span class="quick-preview-options-label">Options:</span>
      <div class="quick-preview-options-list">
        ${product.options.map((opt, idx) => `
          <button class="quick-preview-option ${opt.available === false ? 'unavailable' : ''} ${quickPreviewSelectedOption === opt ? 'active' : ''}" 
                  data-option-index="${idx}" 
                  ${opt.available === false ? 'disabled' : ''}>
            ${opt.name.length > 30 ? opt.name.substring(0, 30) + '...' : opt.name}
          </button>
        `).join("")}
      </div>
    `;

    // Option click handlers
    optionsEl.querySelectorAll(".quick-preview-option:not(.unavailable)").forEach(optBtn => {
      optBtn.addEventListener("click", () => {
        optionsEl.querySelectorAll(".quick-preview-option").forEach(b => b.classList.remove("active"));
        optBtn.classList.add("active");
        const optIdx = parseInt(optBtn.dataset.optionIndex);
        quickPreviewSelectedOption = product.options[optIdx];
        
        // Update image if option has one
        if (quickPreviewSelectedOption && quickPreviewSelectedOption.image) {
          mainImage.src = quickPreviewSelectedOption.image;
        }
        
        // Update price if option has different price
        if (quickPreviewSelectedOption && quickPreviewSelectedOption.price) {
          priceEl.textContent = `$${quickPreviewSelectedOption.price}`;
        } else {
          priceEl.textContent = `$${product.price || 0}`;
        }
      });
    });
  } else {
    optionsEl.innerHTML = "";
  }

  // Add to Cart button
  if (product.available) {
    addToCartBtn.disabled = false;
    addToCartBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>
      Add To Cart
    `;
    addToCartBtn.onclick = () => {
      Cart.addItem(product, quickPreviewSelectedOption, addToCartBtn);
      closeQuickPreviewModal();
    };
  } else {
    addToCartBtn.disabled = true;
    addToCartBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
      Unavailable
    `;
    addToCartBtn.onclick = null;
  }

  // View Details button
  viewDetailsBtn.onclick = () => {
    closeQuickPreviewModal();
    window.location.href = productLink(product.id);
  };

  // Show modal
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeQuickPreviewModal() {
  const modal = document.getElementById("quickPreviewModal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
  quickPreviewSelectedOption = null;
}

let productData = {
  keyboards,
  mice,
  keycaps,
  mousepads,
};

let allProducts = [...keyboards, ...mice, ...keycaps, ...mousepads];

/* ========== Global Search Feature ========== */
function initGlobalSearch() {
  const desktopInput = document.getElementById("globalSearchDesktop");
  const desktopResults = document.getElementById("globalSearchResultsDesktop");
  const mobileInput = document.getElementById("globalSearchMobile");
  const mobileResults = document.getElementById("globalSearchResultsMobile");

  // Setup both search inputs
  if (desktopInput && desktopResults) {
    setupSearchInput(desktopInput, desktopResults);
  }
  if (mobileInput && mobileResults) {
    setupSearchInput(mobileInput, mobileResults);
  }

  // Close results when clicking outside
  document.addEventListener("click", (e) => {
    if (
      desktopResults &&
      !desktopInput?.contains(e.target) &&
      !desktopResults.contains(e.target)
    ) {
      desktopResults.classList.remove("active");
    }
    if (
      mobileResults &&
      !mobileInput?.contains(e.target) &&
      !mobileResults.contains(e.target)
    ) {
      mobileResults.classList.remove("active");
    }
  });
}

function setupSearchInput(input, resultsContainer) {
  let debounceTimer;

  input.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim().toLowerCase();

    debounceTimer = setTimeout(() => {
      if (query.length < 2) {
        resultsContainer.classList.remove("active");
        resultsContainer.innerHTML = "";
        return;
      }

      const results = searchAllProducts(query);
      renderSearchResults(results, resultsContainer, query);
    }, 150);
  });

  input.addEventListener("focus", () => {
    const query = input.value.trim().toLowerCase();
    if (query.length >= 2) {
      const results = searchAllProducts(query);
      renderSearchResults(results, resultsContainer, query);
    }
  });

  // Keyboard navigation
  input.addEventListener("keydown", (e) => {
    const items = resultsContainer.querySelectorAll(".search-result-item");
    const activeItem = resultsContainer.querySelector(
      ".search-result-item:focus"
    );

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!activeItem && items.length > 0) {
        items[0].focus();
      } else if (activeItem) {
        const idx = Array.from(items).indexOf(activeItem);
        if (idx < items.length - 1) items[idx + 1].focus();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (activeItem) {
        const idx = Array.from(items).indexOf(activeItem);
        if (idx > 0) items[idx - 1].focus();
        else input.focus();
      }
    } else if (e.key === "Escape") {
      resultsContainer.classList.remove("active");
      input.blur();
    }
  });
}

function searchAllProducts(query) {
  if (!query) return [];

  return allProducts
    .filter((product) => {
      const title = (product.title || "").toLowerCase();
      const short = (product.short || "").toLowerCase();
      return title.includes(query) || short.includes(query);
    })
    .slice(0, 8); // Limit to 8 results
}

function renderSearchResults(results, container, query) {
  if (results.length === 0) {
    container.innerHTML = `<div class="search-no-results">No products found for "${query}"</div>`;
    container.classList.add("active");
    return;
  }

  container.innerHTML = results
    .map((product) => {
      const image =
        Array.isArray(product.images) && product.images.length > 0
          ? product.images[0]
          : "images/614dd4777bf7b3b639bddd71_wootplaceholder.png";
      const href = productLink(product.id);
      const category = product.category || "product";

      return `
      <a href="${href}" class="search-result-item" tabindex="0">
        <img src="${image}" alt="${
        product.title
      }" class="search-result-img" loading="lazy">
        <div class="search-result-info">
          <p class="search-result-title">${highlightMatch(
            product.title,
            query
          )}</p>
          <div class="search-result-meta">
            <span class="search-result-category">${category}</span>
            <span class="search-result-price">$${product.price}</span>
          </div>
        </div>
      </a>
    `;
    })
    .join("");

  container.classList.add("active");
}

function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  return text.replace(regex, "<mark>$1</mark>");
}

// Compare state
const MAX_COMPARE_ITEMS = 3;
let compareSelection = [];
let activeCompareCategory = null;
let compareEls = {
  selectModal: null,
  resultModal: null,
  grid: null,
  count: null,
  openBtn: null,
  clearBtn: null,
  closeSelectBtn: null,
  closeResultBtn: null,
  head: null,
  body: null,
};

function getProductById(productId) {
  return allProducts.find((p) => p.id === productId);
}

function setCompareCategory(category) {
  activeCompareCategory = category || null;
  if (activeCompareCategory) {
    compareSelection = compareSelection.filter((id) => {
      const p = getProductById(id);
      return p && p.category === activeCompareCategory;
    });
  }
  // keep compareSelection limited to the selected category
}

function addToCompareSelection(productId) {
  if (!productId) return;
  const product = getProductById(productId);
  if (!product) return;
  if (activeCompareCategory && product.category !== activeCompareCategory)
    return;
  if (compareSelection.includes(productId)) return;
  if (compareSelection.length >= MAX_COMPARE_ITEMS) {
    compareSelection.shift();
  }
  compareSelection.push(productId);
}

function toggleCompareSelection(productId) {
  const idx = compareSelection.indexOf(productId);
  if (idx >= 0) {
    compareSelection.splice(idx, 1);
  } else {
    addToCompareSelection(productId);
  }
}

function updateCompareSelectionUI() {
  if (compareEls.count) {
    const scope = activeCompareCategory ? ` • ${activeCompareCategory}` : "";
    compareEls.count.textContent = `${compareSelection.length} selected${scope}`;
  }
  if (compareEls.openBtn) {
    compareEls.openBtn.disabled = compareSelection.length < 2;
  }
}

function renderCompareSelectionGrid() {
  if (!compareEls.grid) return;
  compareEls.grid.innerHTML = "";
  const list = activeCompareCategory
    ? allProducts.filter((p) => p.category === activeCompareCategory)
    : allProducts;

  list.forEach((product) => {
    const cover =
      Array.isArray(product.images) && product.images.length
        ? product.images[0]
        : "";
    const item = document.createElement("div");
    const isSelected = compareSelection.includes(product.id);
    item.className = `comparison-item${isSelected ? " selected" : ""}`;
    item.innerHTML = `
      <img src="${cover}" alt="${product.title}">
      <h4>${product.title}</h4>
      <p class="muted">${product.short || ""}</p>
      <div class="compare-meta">
        <span style="font-weight:700;">$${product.price}</span>
        <span class="availability ${
          product.available ? "available" : "unavailable"
        }">${product.available ? "Available" : "Unavailable"}</span>
      </div>
    `;
    item.addEventListener("click", () => {
      toggleCompareSelection(product.id);
      renderCompareSelectionGrid();
      updateCompareSelectionUI();
    });
    compareEls.grid.appendChild(item);
  });
}

function closeCompareSelectionModal() {
  if (compareEls.selectModal) {
    compareEls.selectModal.setAttribute("aria-hidden", "true");
  }
}

function openCompareSelectionModal(defaultProductId = null, category = null) {
  if (category) setCompareCategory(category);
  else if (defaultProductId) {
    const p = getProductById(defaultProductId);
    setCompareCategory(p ? p.category : null);
  }
  addToCompareSelection(defaultProductId);
  renderCompareSelectionGrid();
  updateCompareSelectionUI();
  if (compareEls.selectModal) {
    compareEls.selectModal.setAttribute("aria-hidden", "false");
  }
}

function closeComparisonResultModal() {
  if (compareEls.resultModal) {
    compareEls.resultModal.setAttribute("aria-hidden", "true");
  }
}

function renderComparisonTable() {
  if (!compareEls.head || !compareEls.body) return;
  const selectedProducts = compareSelection
    .map((id) => getProductById(id))
    .filter(Boolean);

  if (selectedProducts.length === 0) {
    compareEls.head.innerHTML = "";
    compareEls.body.innerHTML =
      '<tr><td colspan="4" style="padding:16px;">Select products to compare.</td></tr>';
    return;
  }

  // Helper function to get price display with range if product has options
  const getPriceDisplay = (product) => {
    const basePrice = product.price;
    if (!product.options || product.options.length === 0) {
      return `$${basePrice}`;
    }
    
    // Get all prices from options
    const optionPrices = product.options
      .map(opt => opt.price !== undefined ? opt.price : basePrice)
      .filter(price => price !== undefined);
    
    if (optionPrices.length === 0) {
      return `$${basePrice}`;
    }
    
    const minPrice = Math.min(basePrice, ...optionPrices);
    const maxPrice = Math.max(basePrice, ...optionPrices);
    
    // If all prices are the same, just show single price
    if (minPrice === maxPrice) {
      return `$${basePrice}`;
    }
    
    // Show price range
    return `$${minPrice}-$${maxPrice}`;
  };

  compareEls.head.innerHTML = `
    <tr>
      <th>Feature</th>
      ${selectedProducts.map((p) => `<th>${p.title}</th>`).join("")}
    </tr>
  `;

  const isMouseComparison = selectedProducts.every(
    (p) => p.category === "mice"
  );

  let rows;
  if (isMouseComparison) {
    rows = [
      {
        label: "Image",
        value: (p) => {
          const cover =
            Array.isArray(p.images) && p.images.length ? p.images[0] : "";
          return `<img src="${cover}" alt="${p.title}" class="comparison-img">`;
        },
      },
      { label: "Price", value: (p) => getPriceDisplay(p) },
      {
        label: "Availability",
        value: (p) => (p.available ? "Available" : "Unavailable"),
      },
      { label: "Category", value: (p) => p.category || "—" },
      { label: "Weight", value: (p) => (p.specs && p.specs.weight) || "—" },
      {
        label: "Polling Rate",
        value: (p) => (p.specs && p.specs.pollingRate) || "—",
      },
      { label: "Latency", value: (p) => (p.specs && p.specs.latency) || "—" },
      { label: "Sensor", value: (p) => (p.specs && p.specs.sensor) || "—" },
      { label: "MCU", value: (p) => (p.specs && p.specs.mcu) || "—" },
      { label: "Switch", value: (p) => (p.specs && p.specs.switch) || "—" },
      {
        label: "Acceleration",
        value: (p) => (p.specs && p.specs.acceleration) || "—",
      },
      { label: "DPI", value: (p) => (p.specs && p.specs.dpi) || "—" },
      { label: "Battery", value: (p) => (p.specs && p.specs.battery) || "—" },
      { label: "Coating", value: (p) => (p.specs && p.specs.coating) || "—" },
      {
        label: "Connectivity",
        value: (p) => (p.specs && p.specs.connectivity) || "—",
      },
      { label: "Highlights", value: (p) => p.short || "—" },
      {
        label: "Features",
        value: (p) => {
          const feats =
            p.specs && Array.isArray(p.specs.features) ? p.specs.features : [];
          return feats.length
            ? `• ${feats.join("<br><br>• ")}`
            : "—";
        },
      },
    ];
  } else {
    rows = [
      {
        label: "Image",
        value: (p) => {
          const cover =
            Array.isArray(p.images) && p.images.length ? p.images[0] : "";
          return `<img src="${cover}" alt="${p.title}" class="comparison-img">`;
        },
      },
      { label: "Price", value: (p) => getPriceDisplay(p) },
      {
        label: "Availability",
        value: (p) => (p.available ? "Available" : "Unavailable"),
      },
      { label: "Category", value: (p) => p.category || "—" },
      { label: "Layout", value: (p) => p.layout || "—" },
      {
        label: "Polling Rate",
        value: (p) => (p.specs && p.specs.pollingRate) || "—",
      },
      { label: "Latency", value: (p) => (p.specs && p.specs.latency) || "—" },
      {
        label: "Single Key Scan Rate",
        value: (p) => (p.specs && p.specs.singleKeyScanRate) || "—",
      },
      {
        label: "Full Key Scan Rate",
        value: (p) => (p.specs && p.specs.fullKeyScanRate) || "—",
      },
      { label: "RT Range", value: (p) => (p.specs && p.specs.rtRange) || "—" },
      { label: "Highlights", value: (p) => p.short || "—" },
      {
        label: "Features",
        value: (p) => {
          const feats =
            p.specs && Array.isArray(p.specs.features) ? p.specs.features : [];
          return feats.length
            ? `• ${feats.join("<br><br>• ")}`
            : "—";
        },
      },
    ];
  }

  compareEls.body.innerHTML = rows
    .map((row) => {
      const values = selectedProducts.map((p) => row.value(p));
      // Check if all values are identical (and not just placeholders)
      const allSame =
        values.length > 1 &&
        values.every((v) => v === values[0]) &&
        values[0] !== "—" &&
        !values[0].includes("<img");
      const highlightClass = allSame ? ' class="compare-match"' : "";
      return `
        <tr${highlightClass}>
          <th>${row.label}</th>
          ${values.map((v) => `<td>${v}</td>`).join("")}
        </tr>
      `;
    })
    .join("");
}

function openComparisonResultModal() {
  renderComparisonTable();
  if (compareEls.resultModal) {
    compareEls.resultModal.setAttribute("aria-hidden", "false");
  }
}

// Populate cart option modal with only available options
function populateCartOptions(product) {
  const optionList = document.getElementById("cartOptionList");
  const confirmBtn = document.getElementById("confirmCartOptionBtn");
  const summaryName = document.getElementById("cartSelectedOptionName");
  const modalTitle = document.getElementById("cartModalTitle");

  if (!optionList) return;

  optionList.innerHTML = "";
  selectedCartOption = null;
  if (confirmBtn) confirmBtn.disabled = true;
  if (summaryName) summaryName.textContent = "Please select...";
  if (modalTitle) modalTitle.textContent = product.title;

  // Only show available options
  const availableOptions = product.options.filter((opt) => opt.available);

  availableOptions.forEach((option) => {
    const optionElement = document.createElement("button");
    optionElement.className = "product-option";
    optionElement.type = "button";

    const priceHTML =
      option.price !== undefined
        ? `<span class="option-price">$${option.price}</span>`
        : `<span class="option-price">$${product.price}</span>`;

    optionElement.innerHTML = `
      <div class="option-image-wrap">
        <img src="${option.image}" alt="${option.name}" loading="lazy">
        ${priceHTML}
      </div>
      <div class="option-text">
        <h4 class="option-title">${option.name}</h4>
      </div>
    `;

    optionElement.addEventListener("click", () => {
      optionList
        .querySelectorAll(".product-option")
        .forEach((opt) => opt.classList.remove("active-option"));
      optionElement.classList.add("active-option");

      selectedCartOption = option;
      if (confirmBtn) confirmBtn.disabled = false;
      if (summaryName) summaryName.textContent = option.name;
    });

    optionList.appendChild(optionElement);
  });

  // Auto-select if only one option available
  if (availableOptions.length === 1) {
    optionList.firstElementChild.click();
  }
}

function populatePreorderOptions(product, onlyUnavailable = false) {
  const optionList = document.getElementById("preorderOptionList");
  const confirmBtn = document.getElementById("confirmPreorderOptionBtn");
  const summaryName = document.getElementById("selectedOptionName");
  const modalTitle = document.getElementById("preorderModalTitle");

  if (!optionList) return;

  optionList.innerHTML = "";
  selectedPreorderOption = null;
  confirmBtn.disabled = true;
  summaryName.textContent = "Please select...";

  if (modalTitle) modalTitle.textContent = product.title;

  // Filter options based on the onlyUnavailable flag
  const optionsToShow = onlyUnavailable 
    ? product.options.filter(opt => !opt.available)
    : product.options;

  optionsToShow.forEach((option, index) => {
    const optionElement = document.createElement("button");
    optionElement.className = "product-option";
    optionElement.type = "button";

    optionElement.innerHTML = `
      <div class="option-image-wrap">
        <img src="${option.image}" alt="${option.name}" loading="lazy">
        <span class="option-price-tag">$${option.price || product.price}</span>
      </div>
      <div class="option-text">
        <h4 class="option-title" style="margin:0; font-size:0.95rem;">${
          option.name
        }</h4>
      </div>
    `;

    optionElement.addEventListener("click", () => {
      optionList
        .querySelectorAll(".product-option")
        .forEach((opt) => opt.classList.remove("active-option"));
      optionElement.classList.add("active-option");

      selectedPreorderOption = option;
      confirmBtn.disabled = false;
      summaryName.textContent = option.name;
    });

    optionList.appendChild(optionElement);
  });

  // Auto-select if only one option exists
  if (optionsToShow.length === 1) {
    optionList.firstElementChild.click();
  }
}

const Cart = {
  key: "keeb_cart_v1",

  getItems: function () {
    const stored = localStorage.getItem(this.key);
    return stored ? JSON.parse(stored) : [];
  },

  addItem: function (product, option, sourceElement) {
    const items = this.getItems();
    const price = option ? option.price || product.price : product.price;
    const optionName = option ? option.name : null;

    // Look for existing matching item (same product id + option)
    const idx = items.findIndex(
      (it) => it.id === product.id && (it.optionName || null) === optionName
    );

    if (idx !== -1) {
      // Increment quantity
      items[idx].quantity = (items[idx].quantity || 1) + 1;
    } else {
      const newItem = {
        id: product.id,
        title: product.title,
        price: price,
        optionName: optionName,
        image: option ? option.image : product.images[0] || "",
        timestamp: Date.now(),
        quantity: 1,
      };
      items.push(newItem);
    }

    localStorage.setItem(this.key, JSON.stringify(items));
    this.updateUI();
    const title = product.title + (optionName ? ` (${optionName})` : "");
    showToast(`Added ${title} to cart`);

    // Trigger flying animation when source element provided
    if (sourceElement) {
      animateToCart(option ? option.image : product.images[0] || "", sourceElement);
    }

    // Backend removed: no remote logging
  },

  removeItem: function (index) {
    const items = this.getItems();
    if (items[index]) {
      if ((items[index].quantity || 1) > 1) {
        items[index].quantity = (items[index].quantity || 1) - 1;
      } else {
        items.splice(index, 1);
      }
      localStorage.setItem(this.key, JSON.stringify(items));
      this.updateUI();

      // Backend removed: no remote logging
    }
  },

  clear: function () {
    localStorage.removeItem(this.key);
    this.updateUI();

    // Backend removed: no remote logging
  },

  // Submit checkout to backend
  submitToBackend: async function (customerInfo = {}) {
    const items = this.getItems();
    if (items.length === 0) {
      return { success: false, error: "Cart is empty" };
    }
    
    // Backend removed: checkout to backend is not available
    return { success: false, error: "No backend configured" };
  },

  getTotal: function () {
    const items = this.getItems();
    return items.reduce(
      (sum, item) => sum + Number(item.price) * (item.quantity || 1),
      0
    );
  },

  updateUI: function () {
    const items = this.getItems();
    const badge = document.getElementById("cartBadge");
    const badgeMobile = document.getElementById("cartBadgeMobile");

    // Compute total quantity
    const totalQty = items.reduce((s, it) => s + (it.quantity || 1), 0);

    // Update Badge (desktop)
    if (badge) {
      badge.textContent = totalQty;
      if (totalQty > 0) badge.classList.remove("hidden");
      else badge.classList.add("hidden");
    }

    // Update Badge (mobile)
    if (badgeMobile) {
      badgeMobile.textContent = totalQty;
      if (totalQty > 0) badgeMobile.classList.remove("hidden");
      else badgeMobile.classList.add("hidden");
    }

    // Update Modal Content (if open)
    renderCartModal();
  },
};

// NEW: Pre-Order System
const PreOrderList = {
  key: "keeb_preorders_v1",

  getItems: function () {
    const stored = localStorage.getItem(this.key);
    return stored ? JSON.parse(stored) : [];
  },

  addItem: function (product, option, sourceElement) {
    const items = this.getItems();
    const price = option ? option.price || product.price : product.price;
    const optionName = option ? option.name : null;

    const idx = items.findIndex(
      (it) => it.id === product.id && (it.optionName || null) === optionName
    );

    if (idx !== -1) {
      items[idx].quantity = (items[idx].quantity || 1) + 1;
    } else {
      const newItem = {
        id: product.id,
        title: product.title,
        price: price,
        optionName: optionName,
        image: option ? option.image : product.images[0] || "",
        timestamp: Date.now(),
        quantity: 1,
        preorder: true,
      };
      items.push(newItem);
    }

    localStorage.setItem(this.key, JSON.stringify(items));
    this.updateUI();
    const title = product.title + (optionName ? ` (${optionName})` : "");
    showToast(`Added ${title} to pre-order list`);

    // Trigger flying animation
    if (sourceElement) {
      animateToPreorder(option ? option.image : product.images[0] || "", sourceElement);
    }

    // Backend removed: no remote pre-order sync
  },

  removeItem: function (index) {
    const items = this.getItems();
    if (items[index]) {
      if ((items[index].quantity || 1) > 1) {
        items[index].quantity = (items[index].quantity || 1) - 1;
      } else {
        items.splice(index, 1);
      }
      localStorage.setItem(this.key, JSON.stringify(items));
      this.updateUI();
      // Re-render the modal immediately
      renderPreorderModal();
    }
  },

  clear: function () {
    localStorage.removeItem(this.key);
    this.updateUI();
  },

  // Submit pre-order to backend
  submitToBackend: async function (customerInfo = {}) {
    const items = this.getItems();
    if (items.length === 0) {
      return { success: false, error: "Pre-order list is empty" };
    }
    
    // Backend removed: pre-order submission to backend is not available
    return { success: false, error: "No backend configured" };
  },

  updateUI: function () {
    const items = this.getItems();
    const badge = document.getElementById("preorderBadge");
    const badgeMobile = document.getElementById("preorderBadgeMobile");
    const badgeDesktop = document.getElementById("preorderBadgeDesktop");
    // Compute total quantity across pre-orders
    const totalQty = items.reduce((s, it) => s + (it.quantity || 1), 0);

    // Update badge (desktop nav - removed, now in panel)
    if (badge) {
      badge.textContent = totalQty;
      if (totalQty > 0) badge.classList.remove("hidden");
      else badge.classList.add("hidden");
    }

    // Update badge (mobile)
    if (badgeMobile) {
      badgeMobile.textContent = totalQty;
      if (totalQty > 0) badgeMobile.classList.remove("hidden");
      else badgeMobile.classList.add("hidden");
    }

    // Update badge (desktop panel)
    if (badgeDesktop) {
      badgeDesktop.textContent = totalQty;
      if (totalQty > 0) badgeDesktop.classList.remove("hidden");
      else badgeDesktop.classList.add("hidden");
    }

    // Re-render the modal if it's open
    if (
      document.getElementById("preorderModal")?.getAttribute("aria-hidden") ===
      "false"
    ) {
      renderPreorderModal();
    }
  },
};

// Wishlist System
const Wishlist = {
  key: "keeb_wishlist_v1",

  getItems: function () {
    const stored = localStorage.getItem(this.key);
    return stored ? JSON.parse(stored) : [];
  },

  addItem: function (product, option, sourceElement) {
    const items = this.getItems();
    const price = option ? option.price || product.price : product.price;
    const optionName = option ? option.name : null;

    // Check if item already exists
    const idx = items.findIndex(
      (it) => it.id === product.id && (it.optionName || null) === optionName
    );

    if (idx !== -1) {
      // Already in wishlist
      showToast(`${product.title} is already in your wishlist`);
      return;
    }

    const newItem = {
      id: product.id,
      title: product.title,
      price: price,
      optionName: optionName,
      image: option ? option.image : product.images[0] || "",
      timestamp: Date.now(),
      available: option ? option.available : product.available,
    };
    items.push(newItem);

    localStorage.setItem(this.key, JSON.stringify(items));
    this.updateUI();
    const title = product.title + (optionName ? ` (${optionName})` : "");
    showToast(`Added ${title} to wishlist ❤️`);

    // Trigger flying animation when source element provided
    if (sourceElement) {
      animateToWishlist(option ? option.image : product.images[0] || "", sourceElement);
    }

    // Backend removed: wishlist sync disabled
  },

  removeItem: function (index) {
    const items = this.getItems();
    if (items[index]) {
      items.splice(index, 1);
      localStorage.setItem(this.key, JSON.stringify(items));
      this.updateUI();
      renderWishlistModal();

      // Backend removed: wishlist sync disabled
    }
  },

  isInWishlist: function (productId, optionName = null) {
    const items = this.getItems();
    return items.some(
      (it) => it.id === productId && (it.optionName || null) === optionName
    );
  },

  toggleItem: function (product, option, sourceElement) {
    const optionName = option ? option.name : null;
    if (this.isInWishlist(product.id, optionName)) {
      // Remove from wishlist
      const items = this.getItems();
      const idx = items.findIndex(
        (it) => it.id === product.id && (it.optionName || null) === optionName
      );
      if (idx !== -1) {
        this.removeItem(idx);
        const title = product.title + (optionName ? ` (${optionName})` : "");
        showToast(`Removed ${title} from wishlist`);
      }
    } else {
      this.addItem(product, option, sourceElement);
    }
  },

  clear: function () {
    localStorage.removeItem(this.key);
    this.updateUI();
    renderWishlistModal();

    // Backend removed: wishlist sync disabled
  },

  updateUI: function () {
    const items = this.getItems();
    const badge = document.getElementById("wishlistBadge");
    const badgeMobile = document.getElementById("wishlistBadgeMobile");

    // Update badge (desktop)
    if (badge) {
      badge.textContent = items.length;
      if (items.length > 0) badge.classList.remove("hidden");
      else badge.classList.add("hidden");
    }

    // Update badge (mobile)
    if (badgeMobile) {
      badgeMobile.textContent = items.length;
      if (items.length > 0) badgeMobile.classList.remove("hidden");
      else badgeMobile.classList.add("hidden");
    }

    // Re-render the modal if it's open
    if (
      document.getElementById("wishlistModal")?.getAttribute("aria-hidden") ===
      "false"
    ) {
      renderWishlistModal();
    }

    // Update wishlist buttons on the page
    updateWishlistButtons();
  },
};

// Update wishlist button states on page
function updateWishlistButtons() {
  // Update product detail page wishlist buttons
  document.querySelectorAll("[data-wishlist-product-id]").forEach((btn) => {
    const productId = btn.dataset.wishlistProductId;
    const optionName = btn.dataset.wishlistOptionName || null;
    const isInWishlist = Wishlist.isInWishlist(productId, optionName);
    
    if (isInWishlist) {
      btn.classList.add("in-wishlist");
      btn.innerHTML = btn.innerHTML.replace("Add to Wishlist", "In Wishlist ❤️");
    } else {
      btn.classList.remove("in-wishlist");
      btn.innerHTML = btn.innerHTML.replace("In Wishlist ❤️", "Add to Wishlist");
    }
  });
  
  // Update card hover wishlist buttons
  document.querySelectorAll(".wishlist-btn[data-product-id]").forEach((btn) => {
    const productId = btn.dataset.productId;
    const isInWishlist = Wishlist.isInWishlist(productId);
    const svg = btn.querySelector("svg");
    
    if (svg) {
      if (isInWishlist) {
        svg.setAttribute("fill", "currentColor");
        btn.style.color = "#ef4444";
      } else {
        svg.setAttribute("fill", "none");
        btn.style.color = "";
      }
    }
  });
}

// Animate item flying to wishlist button/hamburger
function animateToWishlist(imageUrl, sourceElement) {
  const isMobile = window.innerWidth <= 768;
  const target = isMobile
    ? document.getElementById("hamburgerBtn")
    : document.getElementById("wishlistToggle");

  if (!target || !sourceElement) return;

  const flyingEl = document.createElement("img");
  flyingEl.src = imageUrl;
  flyingEl.className = "flying-preorder-item";

  const sourceRect = sourceElement.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  flyingEl.style.left = sourceRect.left + sourceRect.width / 2 - 30 + "px";
  flyingEl.style.top = sourceRect.top + sourceRect.height / 2 - 30 + "px";

  const deltaX =
    targetRect.left + targetRect.width / 2 - (sourceRect.left + sourceRect.width / 2);
  const deltaY =
    targetRect.top + targetRect.height / 2 - (sourceRect.top + sourceRect.height / 2);

  flyingEl.style.setProperty("--fly-x", deltaX + "px");
  flyingEl.style.setProperty("--fly-y", deltaY + "px");

  document.body.appendChild(flyingEl);

  target.style.transform = "scale(1.15)";
  setTimeout(() => {
    target.style.transform = "";
  }, 300);

  setTimeout(() => {
    flyingEl.remove();
  }, 800);
}

// Helper: Render Wishlist Modal
function renderWishlistModal() {
  const items = Wishlist.getItems();
  const listEl = document.getElementById("wishlistItemsList");
  const emptyState = document.getElementById("wishlistEmptyState");
  const wishlistContent = document.getElementById("wishlistContent");

  if (!listEl) return;

  if (items.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    if (wishlistContent) wishlistContent.style.display = "none";
  } else {
    if (emptyState) emptyState.style.display = "none";
    if (wishlistContent) wishlistContent.style.display = "block";

    listEl.innerHTML = items
      .map(
        (item, index) => `
      <li class="cart-item wishlist-item">
        <img src="${item.image}" alt="thumb" style="width:40px; height:40px; object-fit:cover; border-radius:4px; margin-right:10px;">
        <div class="cart-item-info">
          <span class="cart-item-title">${item.title}</span>
          ${item.optionName ? `<span class="cart-item-option">${item.optionName}</span>` : ""}
          <span class="wishlist-item-availability ${item.available !== false ? 'available' : 'unavailable'}">
            ${item.available !== false ? '✓ Available' : '✗ Unavailable'}
          </span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="cart-item-price">$${Number(item.price).toFixed(2)}</span>
          ${item.available !== false ? `<button class="btn wishlist-add-cart-btn" data-index="${index}" aria-label="Add to Cart">🛒</button>` : ''}
          <button class="cart-remove-btn" data-index="${index}" aria-label="Remove">×</button>
        </div>
      </li>
    `
      )
      .join("");

    // Attach event listeners for remove buttons
    listEl.querySelectorAll(".cart-remove-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = Number(btn.dataset.index);
        if (!Number.isNaN(idx)) Wishlist.removeItem(idx);
      });
    });

    // Attach event listeners for add to cart buttons
    listEl.querySelectorAll(".wishlist-add-cart-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = Number(btn.dataset.index);
        if (!Number.isNaN(idx)) {
          const item = items[idx];
          const product = allProducts.find((p) => p.id === item.id);
          if (product) {
            let option = null;
            if (item.optionName && product.options) {
              option = product.options.find((o) => o.name === item.optionName);
            }
            Cart.addItem(product, option, btn);
          }
        }
      });
    });
  }
}

// Helper: Toast Notification
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.querySelector("span").textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Animate item flying to preorder button/hamburger
function animateToPreorder(imageUrl, sourceElement) {
  // Determine target based on viewport
  const isMobile = window.innerWidth <= 768;
  const target = isMobile
    ? document.getElementById("hamburgerBtn")
    : document.getElementById("preorderLink");

  if (!target || !sourceElement) return;

  // Create flying element
  const flyingEl = document.createElement("img");
  flyingEl.src = imageUrl;
  flyingEl.className = "flying-preorder-item";

  // Get positions
  const sourceRect = sourceElement.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  // Set initial position
  flyingEl.style.left = sourceRect.left + sourceRect.width / 2 - 30 + "px";
  flyingEl.style.top = sourceRect.top + sourceRect.height / 2 - 30 + "px";

  // Calculate distance to target
  const deltaX =
    targetRect.left +
    targetRect.width / 2 -
    (sourceRect.left + sourceRect.width / 2);
  const deltaY =
    targetRect.top +
    targetRect.height / 2 -
    (sourceRect.top + sourceRect.height / 2);

  // Set CSS variables for animation
  flyingEl.style.setProperty("--fly-x", deltaX + "px");
  flyingEl.style.setProperty("--fly-y", deltaY + "px");

  document.body.appendChild(flyingEl);

  // Add bounce effect to target
  target.style.transform = "scale(1.15)";
  setTimeout(() => {
    target.style.transform = "";
  }, 300);

  // Remove element after animation
  setTimeout(() => {
    flyingEl.remove();
  }, 800);
}

// Animate item flying to cart button/hamburger (used for Add to Cart)
function animateToCart(imageUrl, sourceElement) {
  const isMobile = window.innerWidth <= 768;
  // On mobile, fly into the hamburger button for a single consolidated target
  const target = isMobile
    ? document.getElementById("hamburgerBtn")
    : document.getElementById("cartToggle");

  if (!target || !sourceElement) return;

  const flyingEl = document.createElement("img");
  flyingEl.src = imageUrl;
  flyingEl.className = "flying-preorder-item";

  const sourceRect = sourceElement.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  flyingEl.style.left = sourceRect.left + sourceRect.width / 2 - 30 + "px";
  flyingEl.style.top = sourceRect.top + sourceRect.height / 2 - 30 + "px";

  const deltaX =
    targetRect.left + targetRect.width / 2 - (sourceRect.left + sourceRect.width / 2);
  const deltaY =
    targetRect.top + targetRect.height / 2 - (sourceRect.top + sourceRect.height / 2);

  flyingEl.style.setProperty("--fly-x", deltaX + "px");
  flyingEl.style.setProperty("--fly-y", deltaY + "px");

  document.body.appendChild(flyingEl);

  target.style.transform = "scale(1.15)";
  setTimeout(() => {
    target.style.transform = "";
  }, 300);

  setTimeout(() => {
    flyingEl.remove();
  }, 800);
}

// Helper: Render Cart Modal
function renderCartModal() {
  const items = Cart.getItems();
  const listEl = document.getElementById("cartItemsList");
  const totalEl = document.getElementById("cartTotal");
  const emptyState = document.getElementById("cartEmptyState");
  const cartContent = document.getElementById("cartContent");

  if (!listEl) return;

  if (items.length === 0) {
    emptyState.style.display = "block";
    cartContent.style.display = "none";
  } else {
    emptyState.style.display = "none";
    cartContent.style.display = "block";

    listEl.innerHTML = items
      .map(
        (item, index) => `
      <li class="cart-item">
        <img src="${item.image}" alt="thumb" style="width:40px; height:40px; object-fit:cover; border-radius:4px; margin-right:10px;">
        <div class="cart-item-info">
          <span class="cart-item-title">${item.title}</span>
          ${item.optionName ? `<span class="cart-item-option">${item.optionName}</span>` : ""}
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="cart-item-qty">x${item.quantity || 1}</span>
          <span class="cart-item-price">$${(item.price * (item.quantity || 1)).toFixed(2)}</span>
          <button class="cart-remove-btn" data-index="${index}" aria-label="Remove">&times;</button>
        </div>
      </li>
    `
      )
      .join("");

    // Attach event listeners for remove buttons (module-safe)
    listEl.querySelectorAll(".cart-remove-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = Number(btn.dataset.index);
        if (!Number.isNaN(idx)) Cart.removeItem(idx);
      });
    });

    totalEl.textContent = `$${Cart.getTotal().toFixed(2)}`;

    // Generate Checkout Link
    const checkoutTelegramBtn = document.getElementById("checkoutTelegramBtn");
    const checkoutWhatsAppBtn = document.getElementById("checkoutWhatsAppBtn");
    const copyOrderBtn = document.getElementById("copyOrderBtn");
    if (checkoutTelegramBtn || checkoutWhatsAppBtn || copyOrderBtn) {
      let message = "Hello, I would like to place an order:\n\n";
      items.forEach((item, i) => {
        const qty = item.quantity || 1;
        const lineTotal = (Number(item.price) * qty).toFixed(2);
        message += `${i + 1}. ${item.title} ${item.optionName ? `(${item.optionName})` : ""} x${qty} - $${lineTotal}\n`;
      });
      message += `\nTotal: $${Cart.getTotal().toFixed(2)}`;
      message += "\n\nIs this available?";

      if (checkoutTelegramBtn) {
        checkoutTelegramBtn.href = `https://t.me/${TELEGRAM_HANDLE}?text=${encodeURIComponent(
          message
        )}`;
        checkoutTelegramBtn.dataset.message = message;
      }

      if (checkoutWhatsAppBtn) {
        const phone = CONTACT_WHATSAPP_NUMBER.replace(/\D/g, "");
        checkoutWhatsAppBtn.href = `https://wa.me/${phone}?text=${encodeURIComponent(
          message
        )}`;
        checkoutWhatsAppBtn.dataset.message = message;
      }

      if (copyOrderBtn) {
        copyOrderBtn.addEventListener("click", async () => {
          try {
            await navigator.clipboard.writeText(message);
            showToast("Order copied to clipboard");
          } catch (err) {
            showToast("Could not copy order");
          }
        });
      }
    }
  }
}

// NEW: Helper to toggle pre-order information visibility
function togglePreorderInfo() {
  const infoSection = document.getElementById("preorderInfo");
  const infoBtn = document.getElementById("preorderInfoBtn");

  if (infoSection && infoBtn) {
    if (
      infoSection.style.display === "none" ||
      infoSection.style.display === ""
    ) {
      infoSection.style.display = "block";
      infoBtn.innerHTML = "📋 Hide Pre-order Information";
      infoBtn.style.background = "var(--accent)";
      infoBtn.style.color = "white";
    } else {
      infoSection.style.display = "none";
      infoBtn.innerHTML = "ℹ️ Pre-order Information";
      infoBtn.style.background = "";
      infoBtn.style.color = "";
    }
  }
}

// NEW: Helper: Render Pre-order Modal (updated with info section)
function renderPreorderModal() {
  const items = PreOrderList.getItems();
  const listEl = document.getElementById("preorderItemsList");
  const emptyState = document.getElementById("preorderEmptyState");
  const content = document.getElementById("preorderContent");
  const infoBtn = document.getElementById("preorderInfoBtn");

  if (!listEl) return;

  if (items.length === 0) {
    emptyState.style.display = "block";
    content.style.display = "none";
    // Hide info button when no pre-orders
    if (infoBtn) {
      infoBtn.style.display = "none";
    }
  } else {
    emptyState.style.display = "none";
    content.style.display = "block";

    // Show info button when there are pre-orders
    if (infoBtn) {
      infoBtn.style.display = "block";
      // Reset info section to hidden state
      const infoSection = document.getElementById("preorderInfo");
      if (infoSection) {
        infoSection.style.display = "none";
      }
      // Reset button text
      infoBtn.innerHTML = "ℹ️ Pre-order Information";
      infoBtn.style.background = "";
      infoBtn.style.color = "";
    }

    listEl.innerHTML = items
      .map(
        (item, index) => `
      <li class="cart-item">
        <img src="${item.image}" alt="thumb" style="width:40px; height:40px; object-fit:cover; border-radius:4px; margin-right:10px;">
        <div class="cart-item-info">
          <span class="cart-item-title">${item.title}</span>
          ${item.optionName ? `<span class="cart-item-option">${item.optionName}</span>` : ""}
          <span class="preorder-label" style="color:#FF6B6B; font-size:0.8rem; font-weight:600;">PRE-ORDER</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="cart-item-qty">x${item.quantity || 1}</span>
          <span class="cart-item-price">$${(item.price * (item.quantity || 1)).toFixed(2)}</span>
          <button class="preorder-remove-btn" data-index="${index}" aria-label="Remove">&times;</button>
        </div>
      </li>
    `
      )
      .join("");

    // Attach event listeners for pre-order remove buttons (module-safe)
    listEl.querySelectorAll(".preorder-remove-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = Number(btn.dataset.index);
        if (!Number.isNaN(idx)) PreOrderList.removeItem(idx);
      });
    });

    // Generate Telegram message for pre-orders
    const preorderBtn = document.getElementById("preorderTelegramBtn");
    if (preorderBtn) {
      let message = "Hello, I'm interested in pre-ordering these items:\n\n";
      items.forEach((item, i) => {
        const qty = item.quantity || 1;
        const lineTotal = (Number(item.price) * qty).toFixed(2);
        message += `${i + 1}. ${item.title} ${item.optionName ? `(${item.optionName})` : ""} x${qty} - $${lineTotal}\n`;
      });

      // Add deposit information
      const total = items.reduce((sum, item) => sum + Number(item.price) * (item.quantity || 1), 0);
      const deposit = total * 0.5;

      message += `\nTotal: $${total.toFixed(2)}`;
      message += `\n50% Deposit: $${deposit.toFixed(2)}`;
      message += "\n\nI understand the pre-order terms:";
      message += "\n• 50% deposit required";
      message += "\n• Estimated arrival: 7-16 days";
      message += "\n• Damaged items: 50% refund";
      message += "\n• Balance paid upon delivery";
      message += "\n\nI'd like to proceed with the deposit.";

      preorderBtn.href = `https://t.me/${TELEGRAM_HANDLE}?text=${encodeURIComponent(
        message
      )}`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const themeToggleMobile = document.getElementById("themeToggleMobile");
  const currentTheme = localStorage.getItem("theme") || "dark";
  const cartToggle = document.getElementById("cartToggle");
  const cartToggleMobile = document.getElementById("cartToggleMobile");
  const cartModal = document.getElementById("cartModal");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const clearCartBtn = document.getElementById("clearCartBtn");
  const startShopBtn = document.getElementById("startShoppingBtn");

  // NEW: Pre-order elements
  const preorderLink = document.getElementById("preorderLink");
  const preorderLinkMobile = document.getElementById("preorderLinkMobile");
  const preorderModal = document.getElementById("preorderModal");
  const closePreorderBtn = document.getElementById("closePreorderBtn");
  const clearPreordersBtn = document.getElementById("clearPreordersBtn");
  const preorderInfoBtn = document.getElementById("preorderInfoBtn");

  // Mobile Nav Elements
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");
  const mobileNavOverlay = document.getElementById("mobileNavOverlay");
  const mobileNavClose = document.getElementById("mobileNavClose");

  // Mobile Nav Toggle Functions
  function openMobileNav() {
    hamburgerBtn?.classList.add("active");
    mobileNav?.classList.add("active");
    mobileNavOverlay?.classList.add("active");
    hamburgerBtn?.setAttribute("aria-expanded", "true");
    mobileNav?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    // Subtle scale feedback when opening mobile nav
    if (hamburgerBtn) {
      hamburgerBtn.style.transform = "scale(1.06)";
      setTimeout(() => {
        hamburgerBtn.style.transform = "";
      }, 180);
    }
  }

  function closeMobileNav() {
    hamburgerBtn?.classList.remove("active");
    mobileNav?.classList.remove("active");
    mobileNavOverlay?.classList.remove("active");
    hamburgerBtn?.setAttribute("aria-expanded", "false");
    mobileNav?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Mobile Nav Event Listeners
  hamburgerBtn?.addEventListener("click", () => {
    const isActive = mobileNav?.classList.contains("active");
    if (isActive) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  mobileNavClose?.addEventListener("click", closeMobileNav);
  mobileNavOverlay?.addEventListener("click", closeMobileNav);

  // Close mobile nav on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav?.classList.contains("active")) {
      closeMobileNav();
    }
  });

  // ========== Desktop Side Panel ==========
  const desktopHamburgerBtn = document.getElementById("desktopHamburgerBtn");
  const desktopSidePanel = document.getElementById("desktopSidePanel");
  const desktopPanelOverlay = document.getElementById("desktopPanelOverlay");
  const desktopPanelClose = document.getElementById("desktopPanelClose");

  function openDesktopPanel() {
    desktopHamburgerBtn?.classList.add("active");
    desktopSidePanel?.classList.add("active");
    desktopPanelOverlay?.classList.add("active");
    desktopHamburgerBtn?.setAttribute("aria-expanded", "true");
    desktopSidePanel?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    // Subtle scale feedback
    if (desktopHamburgerBtn) {
      desktopHamburgerBtn.style.transform = "scale(1.06)";
      setTimeout(() => {
        desktopHamburgerBtn.style.transform = "";
      }, 180);
    }
  }

  function closeDesktopPanel() {
    desktopHamburgerBtn?.classList.remove("active");
    desktopSidePanel?.classList.remove("active");
    desktopPanelOverlay?.classList.remove("active");
    desktopHamburgerBtn?.setAttribute("aria-expanded", "false");
    desktopSidePanel?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Desktop Panel Event Listeners
  desktopHamburgerBtn?.addEventListener("click", () => {
    const isActive = desktopSidePanel?.classList.contains("active");
    if (isActive) {
      closeDesktopPanel();
    } else {
      openDesktopPanel();
    }
  });

  desktopPanelClose?.addEventListener("click", closeDesktopPanel);
  desktopPanelOverlay?.addEventListener("click", closeDesktopPanel);

  // Close desktop panel on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && desktopSidePanel?.classList.contains("active")) {
      closeDesktopPanel();
    }
  });

  // Desktop panel item handlers
  const trackerToggleDesktop = document.getElementById("trackerToggleDesktop");
  const preorderLinkDesktop = document.getElementById("preorderLinkDesktop");

  trackerToggleDesktop?.addEventListener("click", (e) => {
    e.preventDefault();
    closeDesktopPanel();
    // Small delay for smooth panel close before modal open
    setTimeout(() => {
      const trackerModal = document.getElementById("trackerModal");
      trackerModal?.setAttribute("aria-hidden", "false");
    }, 150);
  });

  preorderLinkDesktop?.addEventListener("click", (e) => {
    e.preventDefault();
    closeDesktopPanel();
    setTimeout(() => {
      renderPreorderModal();
      const preorderModal = document.getElementById("preorderModal");
      preorderModal?.setAttribute("aria-hidden", "false");
    }, 150);
  });

  // ========== Events & Promos Button (Desktop) ==========
  const eventsPromoDesktop = document.getElementById("eventsPromoDesktop");
  eventsPromoDesktop?.addEventListener("click", (e) => {
    e.preventDefault();
    closeDesktopPanel();
    setTimeout(() => {
      openWelcomePopup();
    }, 150);
  });

  // ========== Events & Promos Button (Mobile) ==========
  const eventsPromoMobile = document.getElementById("eventsPromoMobile");
  eventsPromoMobile?.addEventListener("click", (e) => {
    e.preventDefault();
    closeMobileNav();
    setTimeout(() => {
      openWelcomePopup();
    }, 150);
  });

  // ========== Welcome Popup ==========
  const welcomePopup = document.getElementById("welcomePopup");
  const welcomePopupClose = document.getElementById("welcomePopupClose");
  const welcomePopupForm = document.getElementById("welcomePopupForm");
  const welcomePopupDismiss = document.getElementById("welcomePopupDismiss");

  // Update popup content from config
  function updatePopupFromConfig() {
    if (!popupConfig || !welcomePopup) return;
    
    const popupImage = welcomePopup.querySelector(".popup-brand-image");
    const popupTitle = welcomePopup.querySelector(".welcome-popup-content h2");
    const popupDesc = welcomePopup.querySelector(".welcome-popup-desc");
    const popupOffer = welcomePopup.querySelector(".welcome-popup-offer");
    const popupHighlight = welcomePopup.querySelector(".welcome-popup-offer .highlight");

    if (popupImage && popupConfig.imageUrl) {
      popupImage.src = popupConfig.imageUrl;
    }
    if (popupTitle && popupConfig.title) {
      popupTitle.textContent = popupConfig.title;
    }
    if (popupDesc && popupConfig.description) {
      popupDesc.textContent = popupConfig.description;
    }
    if (popupOffer && popupConfig.offer) {
      // Update offer text while preserving highlight span
      const highlightSpan = popupOffer.querySelector(".highlight");
      if (highlightSpan && popupConfig.highlight) {
        popupOffer.innerHTML = `${popupConfig.offer}<br><span class="highlight">${popupConfig.highlight}</span>`;
      } else {
        popupOffer.textContent = popupConfig.offer;
      }
    }

    // Update social links if provided
    if (popupConfig.socialLinks) {
      const socialContainer = welcomePopup.querySelector(".welcome-popup-social");
      if (socialContainer) {
        const links = socialContainer.querySelectorAll(".popup-social-icon");
        links.forEach(link => {
          const label = link.getAttribute("aria-label")?.toLowerCase();
          if (label && popupConfig.socialLinks[label]) {
            link.href = popupConfig.socialLinks[label];
          }
        });
      }
    }
  }

  function openWelcomePopup() {
    // Check if popup is enabled in config
    if (popupConfig && popupConfig.enabled === false) {
      return;
    }
    updatePopupFromConfig();
    welcomePopup?.classList.add("active");
    welcomePopup?.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeWelcomePopup() {
    welcomePopup?.classList.remove("active");
    welcomePopup?.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    
    // If "No, Thanks" is checked, don't show again this session
    if (welcomePopupDismiss?.checked) {
      sessionStorage.setItem("welcomePopupDismissed", "true");
    }
  }

  // Close popup handlers
  welcomePopupClose?.addEventListener("click", closeWelcomePopup);
  welcomePopup?.addEventListener("click", (e) => {
    if (e.target === welcomePopup) closeWelcomePopup();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && welcomePopup?.classList.contains("active")) {
      closeWelcomePopup();
    }
  });

  // Form submission
  welcomePopupForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("welcomeEmail")?.value;
    if (email) {
      // Frontend-only subscription: save locally and show thank you
      try {
        const subs = JSON.parse(localStorage.getItem("newsletter_subs") || "[]");
        subs.push({ email: email, ts: Date.now() });
        localStorage.setItem("newsletter_subs", JSON.stringify(subs));
      } catch (e) {
        // ignore storage errors
      }
      showToast("Thanks for subscribing!");
      closeWelcomePopup();
      // Mark as subscribed so it won't show again
      localStorage.setItem("welcomePopupSubscribed", "true");
    }
  });

  // Show popup on page load after a delay (only if not dismissed/subscribed and enabled in config)
  window.addEventListener("load", () => {
    // Check if popup should show on load from config
    const shouldShowOnLoad = popupConfig ? popupConfig.showOnLoad !== false : true;
    const showDelay = popupConfig?.showDelay || 1500;
    
    if (!shouldShowOnLoad) return;
    
    setTimeout(() => {
      const isDismissed = sessionStorage.getItem("welcomePopupDismissed");
      const isSubscribed = localStorage.getItem("welcomePopupSubscribed");
      const isEnabled = popupConfig ? popupConfig.enabled !== false : true;
      
      if (!isDismissed && !isSubscribed && welcomePopup && isEnabled) {
        openWelcomePopup();
      }
    }, showDelay);
  });

  // Floating header: toggle glass/transparent state when scrolling
  (function setupFloatingHeader() {
    const headerEl = document.querySelector('.site-header');
    if (!headerEl) return;
    const onScrollHeader = () => {
      if (window.scrollY > 20) headerEl.classList.add('scrolled');
      else headerEl.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScrollHeader, { passive: true });
    // initial state
    onScrollHeader();
  })();

  // Compare elements
  compareEls = {
    selectModal: document.getElementById("compareSelectModal"),
    resultModal: document.getElementById("compareResultModal"),
    grid: document.getElementById("compareSelectionGrid"),
    count: document.getElementById("compareSelectionCount"),
    openBtn: document.getElementById("openCompareResultsBtn"),
    clearBtn: document.getElementById("clearCompareSelectionBtn"),
    closeSelectBtn: document.getElementById("closeCompareSelectBtn"),
    closeResultBtn: document.getElementById("closeCompareResultBtn"),
    head: document.getElementById("compareTableHead"),
    body: document.getElementById("compareTableBody"),
  };

  // Initialize image modal once per page
  initImageModal();

  // Helper function to sync theme icon on both toggles
  function updateThemeIcons(isLight) {
    const icon = isLight ? "☀️" : "🌙";
    const label = isLight ? "Light Mode" : "Dark Mode";
    if (themeToggle) themeToggle.querySelector(".icon").textContent = icon;
    if (themeToggleMobile) {
      themeToggleMobile.querySelector(".icon").textContent = icon;
      const labelEl = themeToggleMobile.querySelector(".theme-label");
      if (labelEl) labelEl.textContent = label;
    }
  }

  // Set initial state
  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    updateThemeIcons(true);
  }

  // Theme toggle handler for both buttons
  function handleThemeToggle() {
    let theme = document.documentElement.getAttribute("data-theme");
    if (theme === "light") {
      document.documentElement.removeAttribute("data-theme");
      updateThemeIcons(false);
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      updateThemeIcons(true);
      localStorage.setItem("theme", "light");
    }
  }

  themeToggle?.addEventListener("click", handleThemeToggle);
  themeToggleMobile?.addEventListener("click", handleThemeToggle);

  // Mobile cart toggle - close nav and trigger cart modal
  cartToggleMobile?.addEventListener("click", (e) => {
    e.preventDefault();
    closeMobileNav();
    cartModal?.setAttribute("aria-hidden", "false");
  });

  // Mobile pre-order link - close nav and trigger preorder modal
  preorderLinkMobile?.addEventListener("click", (e) => {
    e.preventDefault();
    closeMobileNav();
    renderPreorderModal();
    preorderModal?.setAttribute("aria-hidden", "false");
  });

  // Mobile wishlist toggle - close nav and trigger wishlist modal
  const wishlistToggleMobile = document.getElementById("wishlistToggleMobile");
  const wishlistModal = document.getElementById("wishlistModal");
  wishlistToggleMobile?.addEventListener("click", (e) => {
    e.preventDefault();
    closeMobileNav();
    renderWishlistModal();
    wishlistModal?.setAttribute("aria-hidden", "false");
  });

  // ========== Delivery Tracker System ==========
  const trackerModal = document.getElementById("trackerModal");
  const trackerToggle = document.getElementById("trackerToggle");
  const trackerToggleMobile = document.getElementById("trackerToggleMobile");
  const closeTrackerBtn = document.getElementById("closeTrackerBtn");
  const trackerSearchInput = document.getElementById("trackerSearchInput");
  const trackerSearchBtn = document.getElementById("trackerSearchBtn");
  const trackerEmptyState = document.getElementById("trackerEmptyState");
  const trackerResult = document.getElementById("trackerResult");
  const trackerNotFound = document.getElementById("trackerNotFound");

  // Tracker data storage
  let trackerData = null;

  // Load tracker data from JSON
  async function loadTrackerData() {
    if (trackerData) return trackerData;
    try {
      const response = await fetch("./tracker/tracker.json");
      if (!response.ok) throw new Error("Failed to load tracker data");
      trackerData = await response.json();
      return trackerData;
    } catch (error) {
      console.error("Error loading tracker data:", error);
      return { tracker: [] };
    }
  }

  // Search for tracking info
  async function searchTracking(trackingId) {
    const data = await loadTrackerData();
    const normalizedId = trackingId.trim().toUpperCase();
    return data.tracker.find(
      (item) => item.tracking_id.toUpperCase() === normalizedId
    );
  }

  // Get progress percentage based on status
  function getProgressPercent(status) {
    switch (status) {
      case "out_for_delivery":
        return 0;
      case "in_transit":
        return 50;
      case "delivered":
        return 100;
      default:
        return 0;
    }
  }

  // Get status step number
  function getStatusStep(status) {
    switch (status) {
      case "out_for_delivery":
        return 1;
      case "in_transit":
        return 2;
      case "delivered":
        return 3;
      default:
        return 0;
    }
  }

  // Format date
  function formatTrackerDate(dateStr) {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // Get status badge text
  function getStatusBadgeText(status) {
    switch (status) {
      case "out_for_delivery":
        return "Out for Delivery";
      case "in_transit":
        return "In Transit";
      case "delivered":
        return "Delivered";
      default:
        return "Unknown";
    }
  }

  // Get product image from allProducts based on product name and option
  function getProductImage(productName, optionName) {
    // Find product by title (case-insensitive partial match)
    const product = allProducts.find(p => 
      p.title.toLowerCase().includes(productName.toLowerCase()) ||
      productName.toLowerCase().includes(p.title.toLowerCase())
    );
    
    if (!product) return null;
    
    // If there's an option, try to find matching option image
    if (optionName && product.options) {
      const matchedOption = product.options.find(opt => 
        opt.name.toLowerCase().includes(optionName.toLowerCase()) ||
        optionName.toLowerCase().includes(opt.name.toLowerCase())
      );
      if (matchedOption?.image) {
        return matchedOption.image;
      }
    }
    
    // Fallback to product's first image
    return product.images?.[0] || null;
  }

  // Render tracking result
  function renderTrackerResult(tracking) {
    if (!tracking) {
      trackerEmptyState.style.display = "none";
      trackerResult.style.display = "none";
      trackerNotFound.style.display = "block";
      return;
    }

    trackerEmptyState.style.display = "none";
    trackerNotFound.style.display = "none";
    trackerResult.style.display = "block";

    // Update tracking ID
    const trackerId = trackerResult.querySelector(".tracker-id");
    if (trackerId) trackerId.textContent = tracking.tracking_id;

    // Update status badge
    const statusBadge = trackerResult.querySelector(".tracker-status-badge");
    if (statusBadge) {
      statusBadge.textContent = getStatusBadgeText(tracking.delivery_status);
      statusBadge.className = `tracker-status-badge ${tracking.delivery_status.replace(/_/g, "-")}`;
    }

    // Update progress bar
    const progressFill = trackerResult.querySelector(".tracker-progress-fill");
    const progressPercent = getProgressPercent(tracking.delivery_status);
    if (progressFill) {
      progressFill.style.width = `${progressPercent}%`;
    }

    // Update progress dots
    const currentStep = getStatusStep(tracking.delivery_status);
    const dots = trackerResult.querySelectorAll(".tracker-dot");
    dots.forEach((dot) => {
      const step = parseInt(dot.dataset.step);
      dot.classList.remove("active", "current");
      if (step < currentStep) {
        dot.classList.add("active");
      } else if (step === currentStep) {
        if (tracking.delivery_status === "delivered") {
          dot.classList.add("active");
        } else {
          dot.classList.add("current");
        }
      }
    });

    // Update details
    const recipient = trackerResult.querySelector(".tracker-recipient");
    const address = trackerResult.querySelector(".tracker-address");
    const orderDate = trackerResult.querySelector(".tracker-order-date");
    const estDelivery = trackerResult.querySelector(".tracker-est-delivery");

    if (recipient) recipient.textContent = tracking.client_name || "N/A";
    if (address) address.textContent = tracking.client_address || "N/A";
    if (orderDate) orderDate.textContent = formatTrackerDate(tracking.order_date);
    if (estDelivery) {
      if (tracking.delivery_status === "delivered" && tracking.delivered_date) {
        estDelivery.textContent = `Delivered on ${formatTrackerDate(tracking.delivered_date)}`;
        estDelivery.style.color = "#10b981";
      } else {
        estDelivery.textContent = formatTrackerDate(tracking.estimated_delivery);
        estDelivery.style.color = "";
      }
    }

    // Update products list
    const productsList = trackerResult.querySelector(".tracker-products-list");
    if (productsList && tracking.products_ordered) {
      let productsHTML = tracking.products_ordered
        .map(
          (item) => {
            const displayName = item.option || item.name;
            const baseName = item.option ? item.name : null;
            const price = item.price ? `$${item.price}` : '';
            
            // Auto-fetch image from allProducts
            const imageUrl = getProductImage(item.name, item.option);
            
            return `
        <li class="tracker-product-card">
          ${imageUrl ? `<img src="${imageUrl}" alt="${item.name}" class="tracker-product-img" loading="lazy" onerror="this.style.display='none'">` : ''}
          <div class="tracker-product-info">
            <div class="tracker-product-name">${displayName}</div>
            ${baseName ? `<div class="tracker-product-base">${baseName}</div>` : ''}
          </div>
          <div class="tracker-product-meta">
            ${price ? `<span class="tracker-product-price">${price}</span>` : ''}
            <span class="tracker-product-qty">x${item.quantity || 1}</span>
          </div>
        </li>
      `;
          }
        )
        .join("");
      
      // Add total price
      if (tracking.total_price) {
        productsHTML += `
          <div class="tracker-order-total">
            <span class="tracker-total-label">Total</span>
            <span class="tracker-total-amount">$${tracking.total_price}</span>
          </div>
        `;
      }
      
      productsList.innerHTML = productsHTML;
    }
  }

  // Handle search
  async function handleTrackerSearch() {
    const trackingId = trackerSearchInput?.value.trim();
    if (!trackingId) {
      showToast("Please enter a tracking ID");
      return;
    }

    trackerSearchBtn.disabled = true;
    trackerSearchBtn.textContent = "Searching...";

    try {
      const result = await searchTracking(trackingId);
      renderTrackerResult(result);
    } catch (error) {
      console.error("Tracker search error:", error);
      trackerEmptyState.style.display = "none";
      trackerResult.style.display = "none";
      trackerNotFound.style.display = "block";
    } finally {
      trackerSearchBtn.disabled = false;
      trackerSearchBtn.textContent = "Track";
    }
  }

  // Reset tracker modal state
  function resetTrackerModal() {
    if (trackerSearchInput) trackerSearchInput.value = "";
    if (trackerEmptyState) trackerEmptyState.style.display = "block";
    if (trackerResult) trackerResult.style.display = "none";
    if (trackerNotFound) trackerNotFound.style.display = "none";
  }

  // Open tracker modal
  function openTrackerModal() {
    resetTrackerModal();
    trackerModal?.setAttribute("aria-hidden", "false");
    // Focus on input after a small delay for animation
    setTimeout(() => trackerSearchInput?.focus(), 100);
  }

  // Close tracker modal
  function closeTrackerModal() {
    trackerModal?.setAttribute("aria-hidden", "true");
  }

  // Event listeners for tracker
  trackerToggle?.addEventListener("click", (e) => {
    e.preventDefault();
    openTrackerModal();
  });

  trackerToggleMobile?.addEventListener("click", (e) => {
    e.preventDefault();
    closeMobileNav();
    openTrackerModal();
  });

  closeTrackerBtn?.addEventListener("click", closeTrackerModal);

  trackerModal?.addEventListener("click", (e) => {
    if (e.target === trackerModal) closeTrackerModal();
  });

  trackerSearchBtn?.addEventListener("click", handleTrackerSearch);

  trackerSearchInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleTrackerSearch();
    }
  });

  // Close tracker modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && trackerModal?.getAttribute("aria-hidden") === "false") {
      closeTrackerModal();
    }
  });

  // Pre-load tracker data in background
  loadTrackerData();

  const preorderOptionModal = document.getElementById("preorderOptionModal");
  const closePreorderOptionBtn = document.getElementById(
    "closePreorderOptionBtn"
  );
  const cancelPreorderOptionBtn = document.getElementById(
    "cancelPreorderOptionBtn"
  );
  const confirmPreorderOptionBtn = document.getElementById(
    "confirmPreorderOptionBtn"
  );

  if (preorderOptionModal) {
    // Close modal functions
    const closePreorderOptionModal = () => {
      preorderOptionModal.setAttribute("aria-hidden", "true");
      currentProductForPreorder = null;
      selectedPreorderOption = null;
    };

    if (closePreorderOptionBtn) {
      closePreorderOptionBtn.addEventListener(
        "click",
        closePreorderOptionModal
      );
    }

    if (cancelPreorderOptionBtn) {
      cancelPreorderOptionBtn.addEventListener(
        "click",
        closePreorderOptionModal
      );
    }

    // Confirm button - add to pre-orders
    if (confirmPreorderOptionBtn) {
      confirmPreorderOptionBtn.addEventListener("click", () => {
        if (currentProductForPreorder && selectedPreorderOption) {
          PreOrderList.addItem(
            currentProductForPreorder,
            selectedPreorderOption,
            confirmPreorderOptionBtn
          );
          closePreorderOptionModal();
          showToast(
            `Added ${currentProductForPreorder.title} (${selectedPreorderOption.name}) to pre-orders`
          );
        }
      });
    }

    // Close modal when clicking outside
    preorderOptionModal.addEventListener("click", (e) => {
      if (e.target === preorderOptionModal) {
        closePreorderOptionModal();
      }
    });
  }

  // Cart Option Modal setup
  const cartOptionModal = document.getElementById("cartOptionModal");
  const closeCartOptionBtn = document.getElementById("closeCartOptionBtn");
  const cancelCartOptionBtn = document.getElementById("cancelCartOptionBtn");
  const confirmCartOptionBtn = document.getElementById("confirmCartOptionBtn");

  if (cartOptionModal) {
    const closeCartOptionModal = () => {
      cartOptionModal.setAttribute("aria-hidden", "true");
      currentProductForCart = null;
      selectedCartOption = null;
    };

    if (closeCartOptionBtn) {
      closeCartOptionBtn.addEventListener("click", closeCartOptionModal);
    }

    if (cancelCartOptionBtn) {
      cancelCartOptionBtn.addEventListener("click", closeCartOptionModal);
    }

    // Confirm button - add to cart
    if (confirmCartOptionBtn) {
      confirmCartOptionBtn.addEventListener("click", () => {
        if (currentProductForCart && selectedCartOption) {
          Cart.addItem(
            currentProductForCart,
            selectedCartOption,
            confirmCartOptionBtn
          );
          closeCartOptionModal();
          showToast(
            `Added ${currentProductForCart.title} (${selectedCartOption.name}) to cart`
          );
        }
      });
    }

    // Close modal when clicking outside
    cartOptionModal.addEventListener("click", (e) => {
      if (e.target === cartOptionModal) {
        closeCartOptionModal();
      }
    });
  }

  if (cartToggle && cartModal) {
    cartToggle.addEventListener("click", (e) => {
      e.preventDefault();
      Cart.updateUI(); // Refresh data before showing
      cartModal.setAttribute("aria-hidden", "false");
    });

    // Close logic
    const closeCart = () => cartModal.setAttribute("aria-hidden", "true");
    if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
    if (startShopBtn) startShopBtn.addEventListener("click", closeCart);

    cartModal.addEventListener("click", (e) => {
      if (e.target === cartModal) closeCart();
    });

    // Clear Cart logic
    if (clearCartBtn) {
      clearCartBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to empty your cart?")) {
          Cart.clear();
        }
      });
    }
  }

  // NEW: Pre-order modal logic
  if (preorderLink && preorderModal) {
    preorderLink.addEventListener("click", (e) => {
      e.preventDefault();
      renderPreorderModal();
      preorderModal.setAttribute("aria-hidden", "false");
    });
  }

  // Pre-order modal close and clear handlers (independent of preorderLink)
  if (preorderModal) {
    if (closePreorderBtn) {
      closePreorderBtn.addEventListener("click", () => {
        preorderModal.setAttribute("aria-hidden", "true");
      });
    }

    preorderModal.addEventListener("click", (e) => {
      if (e.target === preorderModal)
        preorderModal.setAttribute("aria-hidden", "true");
    });

    if (clearPreordersBtn) {
      clearPreordersBtn.addEventListener("click", () => {
        if (confirm("Clear all pre-orders?")) {
          PreOrderList.clear();
        }
      });
    }
  }

  // NEW: Add event listener for pre-order info button
  if (preorderInfoBtn) {
    preorderInfoBtn.addEventListener("click", (e) => {
      e.preventDefault();
      togglePreorderInfo();
    });
  }

  // Wishlist modal logic
  const wishlistToggle = document.getElementById("wishlistToggle");
  const closeWishlistBtn = document.getElementById("closeWishlistBtn");
  const clearWishlistBtn = document.getElementById("clearWishlistBtn");
  const browseProductsBtn = document.getElementById("browseProductsBtn");
  const addAllWishlistToCartBtn = document.getElementById("addAllWishlistToCartBtn");

  if (wishlistToggle && wishlistModal) {
    wishlistToggle.addEventListener("click", (e) => {
      e.preventDefault();
      Wishlist.updateUI();
      renderWishlistModal();
      wishlistModal.setAttribute("aria-hidden", "false");
    });

    // Close logic
    const closeWishlist = () => wishlistModal.setAttribute("aria-hidden", "true");
    if (closeWishlistBtn) closeWishlistBtn.addEventListener("click", closeWishlist);
    if (browseProductsBtn) browseProductsBtn.addEventListener("click", closeWishlist);

    wishlistModal.addEventListener("click", (e) => {
      if (e.target === wishlistModal) closeWishlist();
    });

    // Clear Wishlist logic
    if (clearWishlistBtn) {
      clearWishlistBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear your wishlist?")) {
          Wishlist.clear();
        }
      });
    }

    // Add all available items to cart
    if (addAllWishlistToCartBtn) {
      addAllWishlistToCartBtn.addEventListener("click", () => {
        const items = Wishlist.getItems();
        const availableItems = items.filter((item) => item.available !== false);
        
        if (availableItems.length === 0) {
          showToast("No available items to add to cart");
          return;
        }

        availableItems.forEach((item) => {
          const product = allProducts.find((p) => p.id === item.id);
          if (product) {
            let option = null;
            if (item.optionName && product.options) {
              option = product.options.find((o) => o.name === item.optionName);
            }
            Cart.addItem(product, option, null);
          }
        });
        
        showToast(`Added ${availableItems.length} item(s) to cart`);
      });
    }
  }

  // Compare modal logic
  if (compareEls.closeSelectBtn) {
    compareEls.closeSelectBtn.addEventListener(
      "click",
      closeCompareSelectionModal
    );
  }
  if (compareEls.selectModal) {
    compareEls.selectModal.addEventListener("click", (e) => {
      if (e.target === compareEls.selectModal) closeCompareSelectionModal();
    });
  }
  if (compareEls.clearBtn) {
    compareEls.clearBtn.addEventListener("click", (e) => {
      e.preventDefault();
      compareSelection = [];
      renderCompareSelectionGrid();
      updateCompareSelectionUI();
    });
  }
  if (compareEls.openBtn) {
    compareEls.openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openComparisonResultModal();
    });
  }
  if (compareEls.closeResultBtn) {
    compareEls.closeResultBtn.addEventListener(
      "click",
      closeComparisonResultModal
    );
  }
  if (compareEls.resultModal) {
    compareEls.resultModal.addEventListener("click", (e) => {
      if (e.target === compareEls.resultModal) closeComparisonResultModal();
    });
  }

  // Initialize UI
  Cart.updateUI();
  PreOrderList.updateUI();
  Wishlist.updateUI();
  // Wire hero button to show combined all-products listing
  const showAllBtn = document.getElementById("showAllBtn");
  if (showAllBtn) {
    showAllBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showAllProductsListing();
    });
  }
  // Service worker and prefetching have been removed.
});

function whatsappLink(product) {
  const base = `https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(/\D/g, "")}`;
  const text = encodeURIComponent(
    `Hi, I'm interested in ${product.title}. Is it available?`
  );
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

function telegramLink() {
  return `https://t.me/${TELEGRAM_HANDLE}`;
}
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}
/* Simplified product link */
function productLink(id) {
  return `products.html?id=${encodeURIComponent(id)}`;
}

// Constants for display limits for the index page
const MOBILE_COLUMNS = 2;
const DESKTOP_COLUMNS = 5;
const INITIAL_MOBILE_LIMIT = MOBILE_COLUMNS * 2; // 4 items
const INITIAL_DESKTOP_LIMIT = DESKTOP_COLUMNS * 2; // 10 items

function getInitialLimit() {
  return window.innerWidth < 600 ? INITIAL_MOBILE_LIMIT : INITIAL_DESKTOP_LIMIT;
}

// Normalize specs: support legacy array and new object container formats
function getSpecsList(product) {
  if (!product) return [];
  const s = product.specs;
  if (!s) return [];
  if (Array.isArray(s)) return s;

  const list = [];
  if (s.layout) list.push(s.layout);
  if (s.case) list.push(s.case);
  if (s.keycaps) list.push(s.keycaps);
  if (s.switches) list.push(s.switches);
  if (s.pollingRate) list.push(`${s.pollingRate} Polling-Rate`);
  if (s.latency) list.push(`${s.latency} Latency`);
  if (s.singleKeyScanRate)
    list.push(`Single Key Scan Rate: ${s.singleKeyScanRate}`);
  if (s.fullKeyScanRate) list.push(`Full Key Scan Rate: ${s.fullKeyScanRate}`);
  if (s.precision) list.push(`Precision ${s.precision}`);
  if (s.rtRange) list.push(`RT Range ${s.rtRange}`);
  if (s.sensor) list.push(s.sensor);
  if (s.weight) list.push(`Weight: ${s.weight}`);
  if (s.dpi) list.push(`Max DPI: ${s.dpi}`);
  if (s.trackingSpeed) list.push(`Track Speed ${s.trackingSpeed}`);
  if (s.mcu) list.push(s.mcu);
  if (s.acceleration) list.push(`Acceleration: ${s.acceleration}`);
  if (s.switch) list.push(s.switch);
  if (s.battery) list.push(`Battery: ${s.battery}`);
  if (s.batter) list.push(`Battery: ${s.batter}`);
  if (s.coating) list.push(`Coating: ${s.coating}`);
  if (s.connectivity) list.push(s.connectivity);
  if (s.features && Array.isArray(s.features)) list.push(...s.features);
  if (s.dimensions) list.push(s.dimensions);
  return list;
}

/* ---------- Mouse Specs Info Box ---------- */
function getMiceSpecsGrid(product) {
  const s = product.specs || {};
  
  const keySpecs = [
    { label: "Polling Rate", value: s.pollingRate },
    { label: "Switch", value: s.switch },
    { label: "Sensor", value: s.sensor },
    { label: "MCU", value: s.mcu },
    { label: "DPI", value: s.dpi },
    { label: "Track Speed", value: s.trackingSpeed },
    { label: "Weight", value: s.weight },
    { label: "Acceleration", value: s.acceleration },
  ];

  const specsItems = keySpecs
    .filter(spec => spec.value)
    .map(spec => `<div class="specs-info-item"><span class="specs-info-label">${spec.label}:</span> <span class="specs-info-value">${spec.value}</span></div>`)
    .join('');

  return `
    <div class="product-specs-info-box">
      <div class="specs-info-header">Key Specifications</div>
      <div class="specs-info-content">
        ${specsItems}
      </div>
    </div>
  `;
}

/* ---------- Keyboard Specs Info Box ---------- */
function getKeyboardSpecsGrid(product) {
  const s = product.specs || {};
  
  const keySpecs = [
    { label: "Polling Rate", value: s.pollingRate },
    { label: "Scanning-Rate", value: s.singleKeyScanRate },
    { label: "Latency", value: s.latency },
    { label: "Precision", value: s.precision },
    { label: "RT Range", value: s.rtRange },
    { label: "Functions", value: s.functions },
  ];

  const specsItems = keySpecs
    .filter(spec => spec.value)
    .map(spec => `<div class="specs-info-item"><span class="specs-info-label">${spec.label}:</span> <span class="specs-info-value">${spec.value}</span></div>`)
    .join('');

  return `
    <div class="product-specs-info-box">
      <div class="specs-info-header">Key Specifications</div>
      <div class="specs-info-content">
        ${specsItems}
      </div>
    </div>
  `;
}

/* ---------- Other Products Specs Info Box ---------- */
function getOtherProductSpecsBox(product) {
  const specsList = getSpecsList(product);
  
  if (!specsList || specsList.length === 0) {
    return '';
  }

  const specsItems = specsList
    .map(spec => `<div class="specs-info-item"><span class="specs-info-value">${spec}</span></div>`)
    .join('');

  return `
    <div class="product-specs-info-box">
      <div class="specs-info-header">Specifications</div>
      <div class="specs-info-content">
        ${specsItems}
      </div>
    </div>
  `;
}

/* ---------- Product cards ---------- */
function createProductCard(p) {
  const card = document.createElement("div");
  card.className = "card";
  let badgeHTML = "";
  if (p.available) {
    if (p.isNew) badgeHTML = `<span class="badge badge-new">New Arrival</span>`;
    else if (p.lowStock)
      badgeHTML = `<span class="badge badge-low">Limited Stock</span>`;
  }
  // Show locked badge when product is explicitly locked
  if (p.locked) {
    badgeHTML += `<span class="badge badge-locked">Locked</span>`;
  }

  const href = productLink(p.id);
  // Ensure default image is valid
  const defaultImage = Array.isArray(p.images) && p.images.length ? p.images[0] : "";
  const priceBadgeClass = p.available ? "price-badge in-stock" : "price-badge";

  // Determine if add to cart should be locked
  const addToCartLocked = !p.available;

  card.innerHTML = `
    <div class="card-image">
      <a class="card-link" href="${href}">
        <img src="${defaultImage}" alt="${p.title}" class="main-img">
      </a>
      ${badgeHTML}
      <div class="card-image-overlay">
        <button class="card-overlay-btn quick-view-btn" title="Quick View" data-product-id="${p.id}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
        </button>
        <button class="card-overlay-btn wishlist-btn" title="Add to Wishlist" data-product-id="${p.id}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
      </div>
      <button class="card-add-to-cart${addToCartLocked ? ' locked' : ''}" data-product-id="${p.id}" ${addToCartLocked ? 'disabled' : ''}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        ${addToCartLocked ? 'Unavailable' : 'Add To Cart'}
      </button>
    </div>
    <div class="card-body">
      <h4 class="card-title">
        <a class="card-title-link" href="${href}">${p.title}</a>
      </h4>
      <p class="muted card-desc">
        <a href="${href}" style="text-decoration: none; color: inherit;">${p.short}</a>
      </p>
      <div class="card-footer-row">
        <div class="card-options">
          <!-- Options will be injected here -->
        </div>
        <div class="card-price-container">
           <span class="${priceBadgeClass}">$${p.price}</span>
        </div>
      </div>
    </div>
  `;

  // --- Logic for Options Dots ---
  const optionsContainer = card.querySelector(".card-options");
  const mainImg = card.querySelector(".main-img");

  if (p.options && p.options.length > 0) {
    // Limit to 2 dots max, show counter if more exist
    const limit = 2;
    const hasMore = p.options.length > limit;
    const renderLimit = hasMore ? limit : p.options.length;

    p.options.slice(0, renderLimit).forEach((opt, index) => {
      if (!opt.image) return;

      const dot = document.createElement("div");
      dot.className = "option-dot";
      dot.setAttribute("role", "button");
      dot.setAttribute("aria-label", `Select option ${opt.name}`);
      dot.title = opt.name;
      
      const img = document.createElement("img");
      img.src = opt.image;
      img.alt = opt.name;
      
      dot.appendChild(img);
      optionsContainer.appendChild(dot);

      // Click event for swapping main image
      dot.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Check if this dot is already active
        const isActive = dot.classList.contains("active");

        // Remove active class from all dots
        const allDots = optionsContainer.querySelectorAll(".option-dot");
        allDots.forEach(d => d.classList.remove("active"));

        if (isActive) {
          // If already active, un-click (revert to default)
          mainImg.src = defaultImage;
        } else {
          // Activate this dot and swap image
          dot.classList.add("active");
          mainImg.src = opt.image;
        }
      });
    });

    // Add counter dot if limited
    if (hasMore) {
      const remaining = p.options.length - renderLimit;
      const counter = document.createElement("div");
      counter.className = "option-more-count";
      counter.textContent = `+${remaining}`;
      counter.title = `${remaining} more options available`;
      optionsContainer.appendChild(counter);
    }

  } else {
    // No options case: Quick View button
    optionsContainer.innerHTML = `
      <button class="btn-slim-quick-view" title="Quick View" data-product-id="${p.id}">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        Quick View
      </button>
    `;
    
    // Attach event to this new slim button
    const slimBtn = optionsContainer.querySelector(".btn-slim-quick-view");
    if (slimBtn) {
      slimBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openQuickPreviewModal(p);
      });
    }
  }

  // --- End Option Logic ---

  // Attach image click to open lightbox
  if (mainImg) {
    mainImg.style.cursor = "zoom-in";
    mainImg.addEventListener("click", (e) => {
      e.preventDefault();
      openImageModal(mainImg.src);
    });
  }
  
  // Quick View button event
  const quickViewBtn = card.querySelector(".quick-view-btn");
  if (quickViewBtn) {
    quickViewBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openQuickPreviewModal(p);
    });
  }
  
  // Add to Cart button event
  const addToCartBtn = card.querySelector(".card-add-to-cart");
  if (addToCartBtn && p.available) {
    addToCartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Attempt to pick selected option if logic supported later, 
      // for now defaulting to first available as before
      let firstAvailableOption = null;
      if (p.options && Array.isArray(p.options)) {
        firstAvailableOption = p.options.find(opt => opt.available !== false);
      }
      
      Cart.addItem(p, firstAvailableOption, addToCartBtn);
    });
  }
  
  // Wishlist button event
  const wishlistBtn = card.querySelector(".wishlist-btn");
  if (wishlistBtn) {
    if (Wishlist.isInWishlist(p.id)) {
      const svg = wishlistBtn.querySelector("svg");
      if (svg) {
        svg.setAttribute("fill", "currentColor");
        wishlistBtn.style.color = "#ef4444";
      }
    }
    
    wishlistBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      Wishlist.toggleItem(p, null, wishlistBtn);
      const svg = wishlistBtn.querySelector("svg");
      if (Wishlist.isInWishlist(p.id)) {
        svg.setAttribute("fill", "currentColor");
        wishlistBtn.style.color = "#ef4444";
      } else {
        svg.setAttribute("fill", "none");
        wishlistBtn.style.color = "";
      }
    });
  }
  
  if (p.locked) {
    const link = card.querySelector(".card-link");
    if (link) {
      link.removeAttribute("href");
      link.classList.add("locked-link");
      link.addEventListener("click", (ev) => ev.preventDefault());
    }
    card.classList.add("locked");
  }
  return card;
}

/* ---------- Option cards ---------- */
function createOptionCard(product, option, onSelect) {
  if (!product.available)
    product.options.forEach((opt) => {
      opt.available = false;
    });
  const optionElement = document.createElement(
    product.available ? (option.available ? "button" : "div") : "div"
  );
  optionElement.className =
    "product-option" +
    (product.available ? (option.available ? "" : " locked") : " locked");
  optionElement.type = "button";
  optionElement.tabIndex = option.available ? 0 : -1;
  optionElement.dataset.optionName = option.name;

  if (product.available && option.available) {
    optionElement.addEventListener("click", (e) => {
      e.preventDefault();
      onSelect(option);
    });
  } else {
    optionElement.setAttribute("aria-disabled", "true");
    optionElement.style.cursor = "pointer";
    optionElement.addEventListener("click", (e) => {
      e.preventDefault();
      openOptionPreviewModal(option, product.price, product);
    });
  }

  const priceHTML =
    option.price !== undefined
      ? `<span class="option-price">$${option.price}</span>`
      : `<span class="option-price">$${product.price}</span>`;

  optionElement.innerHTML = `
    <div class="option-image-wrap">
      <img src="${option.image}" alt="${option.name}" loading="lazy">
      ${
        option.available
          ? ""
          : '<span class="option-stock-label">OUT OF STOCK</span>'
      }
      ${priceHTML} 
    </div>
    <div class="option-text">
      <h4 class="option-title">${option.name}</h4>
    </div>
  `;

  return optionElement;
}

/* ---------- Index page: render product cards (LIMITED VIEW) ---------- */
function renderIndexCards(list, gridId, moreContainerId, categoryName) {
  const grid = document.getElementById(gridId);
  const loadMoreContainer = document.getElementById(moreContainerId);
  if (!grid || !loadMoreContainer) return;

  const limit = getInitialLimit();

  grid.innerHTML = "";
  loadMoreContainer.innerHTML = "";

  const productsToRender = list.slice(0, limit);

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="no-results-card" style="grid-column: 1 / -1;">
        <div class="no-results-illustration" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H9l-6 3V7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>The selection products currently not in stock</h3>
        <p class="muted">Try changing filters or clear them to see more items.</p>
        <div class="no-results-actions">
          <a href="index.html" class="btn">Show all items</a>
        </div>
      </div>
    `;
    return;
  }

  productsToRender.forEach((p) => {
    grid.appendChild(createProductCard(p));
  });

  if (list.length > limit) {
    const loadMoreLink = document.createElement("a");
    loadMoreLink.className = "btn primary";
    loadMoreLink.textContent = "More items";
    loadMoreLink.href = `category.html?category=${categoryName}`;
    loadMoreContainer.appendChild(loadMoreLink);
  }
}

function initProductSection(categoryName) {
  const productsList = productData[categoryName];
  if (!productsList) return; // Guard clause if category doesn't exist

  const prefixMap = {
    keyboards: "keyboard",
    mice: "mouse",
    straps: "strap",
    keycaps: "keycap",
    mousepads: "mousepad",
  };

  const prefix = prefixMap[categoryName] || categoryName.slice(0, -1); // Remove 's' as fallback

  const gridId = `${prefix}Grid`;
  const moreContainerId = `${prefix}MoreContainer`;

  // Render initial set
  renderIndexCards(productsList, gridId, moreContainerId, categoryName);
}

function initIndexPage() {
  initProductSection("keyboards");
  initProductSection("mice");
  initProductSection("straps");
  initProductSection("keycaps");
  initProductSection("mousepads");

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initProductSection("keyboards");
      initProductSection("mice");
      initProductSection("straps");
      initProductSection("keycaps");
      initProductSection("mousepads");
    }, 200);
  });
}

/* ---------- Combined All-Products Listing (Available / Unavailable) ---------- */
function showAllProductsListing() {
  const listing = document.getElementById("allProductsListing");
  if (!listing) return;

  const otherSections = document.querySelectorAll(
    "section.products:not(#allProductsListing)"
  );

  listing.innerHTML = `
    <div class="section-head">
      <h2>All Products</h2>
    </div>
    <div style="margin-top:16px;">
      <h3>Available Products</h3>
      <div id="allAvailableGrid" class="grid"></div>
    </div>
    <div style="margin-top:28px;">
      <h3>Unavailable Products</h3>
      <div id="allUnavailableGrid" class="grid"></div>
    </div>
    <div style="margin-top:20px;"><a href="#" id="closeAllProducts" class="back-link">← Back to shop</a></div>
  `;

  // Hide the normal product sections and show this listing
  otherSections.forEach((s) => (s.style.display = "none"));
  listing.style.display = "block";

  const available = allProducts.filter((p) => p.available);
  const unavailable = allProducts.filter((p) => !p.available);

  renderCategoryCards(available, document.getElementById("allAvailableGrid"));
  renderCategoryCards(
    unavailable,
    document.getElementById("allUnavailableGrid")
  );

  const closeBtn = document.getElementById("closeAllProducts");
  if (closeBtn) {
    closeBtn.addEventListener("click", (ev) => {
      ev.preventDefault();
      listing.style.display = "none";
      otherSections.forEach((s) => (s.style.display = ""));
      // return focus to top
      window.scrollTo({ top: 0, behavior: "smooth" });
      // clear hash
      try {
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      } catch (e) {}
    });
  }

  listing.scrollIntoView({ behavior: "smooth" });
}

/* ---------- Category page: render full list (UNCHANGED) ---------- */
function renderCategoryCards(list, gridElement) {
  gridElement.innerHTML = "";
  if (list.length === 0) {
    gridElement.innerHTML = `
      <div class="no-results-card" style="grid-column: 1 / -1;">
        <div class="no-results-illustration" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H9l-6 3V7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>The selection products currently not in stock</h3>
        <p class="muted">Try changing filters or clear them to see more items.</p>
        <div class="no-results-actions">
          <a href="index.html" class="btn">Show all items</a>
        </div>
      </div>
    `;
    return;
  }
  list.forEach((p) => {
    gridElement.appendChild(createProductCard(p));
  });
}
function initCategoryPage() {
  const categoryName = getQueryParam("category");
  const productsList = productData[categoryName];
  const container = document.getElementById("categoryContainer");

  if (!container || !productsList) {
    if (container) {
      container.innerHTML = `<div class="container" style="padding-top: 40px;"><h1 style="color:var(--muted)">Category not found.</h1><p><a href="index.html" class="btn">← Back to shop</a></p></div>`;
    }
    return;
  }

  // Category title mapping
  const categoryTitles = {
    keyboards: "Keyboards",
    mice: "Mice",
    straps: "Custom Keyboard Straps",
    keycaps: "Keycaps",
    mousepads: "Mousepads",
  };

  const capitalizedName =
    categoryTitles[categoryName] ||
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  container.innerHTML = `
        <div class="section-head">
            <h2 id="categoryTitle">${capitalizedName}</h2>
        </div>
        <div id="categoryGrid" class="grid"></div>
        <div style="margin-top:28px;">
            <a class="back-link" href="index.html">← Back to shop</a>
        </div>
    `;

  const grid = document.getElementById("categoryGrid");
  const searchInput = document.getElementById("categorySearch");

  renderCategoryCards(productsList, grid);
  // Populate and wire category filter
  const categoryFilter = document.getElementById("categoryFilter");
  if (categoryFilter) {
    if (categoryName === "keyboards") {
      // single grouped dropdown for keyboards on category page
      categoryFilter.innerHTML = `
        <option value="">All filters</option>
        <optgroup label="Price">
          <option value="price:lt50">Under $50</option>
          <option value="price:50-100">$50 - $100</option>
          <option value="price:100-200">$100 - $200</option>
          <option value="price:gt200">Over $200</option>
        </optgroup>
        <optgroup label="Rating">
          <option value="rating:9">9+ / Excellent</option>
          <option value="rating:8">8+ / Very Good</option>
          <option value="rating:7">7+ / Good</option>
        </optgroup>
        <optgroup label="Availability">
          <option value="avail:available">Available</option>
          <option value="avail:unavailable">Unavailable</option>
        </optgroup>
      `;

      const applyCategoryKeyboardFilter = () => {
        const q = searchInput ? searchInput.value || "" : "";
        const val = categoryFilter.value;
        let filtered = productsList.filter((p) => {
          const matchesQuery =
            !q ||
            p.title.toLowerCase().includes(q.toLowerCase()) ||
            (p.short || "").toLowerCase().includes(q.toLowerCase());
          return matchesQuery;
        });
        if (val) {
          if (val.startsWith("price:")) {
            const range = val.split(":")[1];
            filtered = filtered.filter((p) => {
              const price = Number(p.price) || 0;
              if (range === "lt50") return price < 50;
              if (range === "50-100") return price >= 50 && price <= 100;
              if (range === "100-200") return price > 100 && price <= 200;
              if (range === "gt200") return price > 200;
              return true;
            });
          } else if (val.startsWith("rating:")) {
            const r = Number(val.split(":")[1]) || 0;
            filtered = filtered.filter(
              (p) => (Number(p.sellerRating) || 0) >= r
            );
          } else if (val.startsWith("avail:")) {
            const a = val.split(":")[1];
            filtered = filtered.filter((p) =>
              a === "available" ? !!p.available : !p.available
            );
          }
        }
        renderCategoryCards(filtered, grid);
      };

      categoryFilter.addEventListener("change", applyCategoryKeyboardFilter);
    } else if (categoryName === "mice") {
      categoryFilter.innerHTML = `
        <option value="">All filters</option>
        <optgroup label="Price">
          <option value="price:lt20">Under $20</option>
          <option value="price:20-50">$20 - $50</option>
          <option value="price:50-100">$50 - $100</option>
          <option value="price:gt100">Over $100</option>
        </optgroup>
        <optgroup label="Rating">
          <option value="rating:9">9+ / Excellent</option>
          <option value="rating:8">8+ / Very Good</option>
          <option value="rating:7">7+ / Good</option>
        </optgroup>
        <!-- Weight filter removed per request -->
      `;

      const applyCategoryMiceFilter = () => {
        const q = searchInput ? searchInput.value || "" : "";
        const val = categoryFilter.value;
        let filtered = productsList.filter((p) => {
          const matchesQuery =
            !q ||
            p.title.toLowerCase().includes(q.toLowerCase()) ||
            (p.short || "").toLowerCase().includes(q.toLowerCase());
          return matchesQuery;
        });
        if (val) {
          if (val.startsWith("price:")) {
            const range = val.split(":")[1];
            filtered = filtered.filter((p) => {
              const price = Number(p.price) || 0;
              if (range === "lt20") return price < 20;
              if (range === "20-50") return price >= 20 && price <= 50;
              if (range === "50-100") return price >= 50 && price <= 100;
              if (range === "gt100") return price > 100;
              return true;
            });
          } else if (val.startsWith("rating:")) {
            const r = Number(val.split(":")[1]) || 0;
            filtered = filtered.filter(
              (p) => (Number(p.sellerRating) || 0) >= r
            );
          }
        }
        renderCategoryCards(filtered, grid);
      };

      categoryFilter.addEventListener("change", applyCategoryMiceFilter);
    } else {
      populateFilterSelect(categoryName, categoryFilter);
      categoryFilter.addEventListener("change", () => {
        const q = searchInput ? searchInput.value : "";
        const val = categoryFilter.value;
        const filtered = productsList.filter((p) => {
          const matchesQuery =
            !q ||
            p.title.toLowerCase().includes(q.toLowerCase()) ||
            (p.short || "").toLowerCase().includes(q.toLowerCase());
          if (!val) return matchesQuery;
          const v = getFilterValueFromProduct(p, categoryName);
          return matchesQuery && String(v) === String(val);
        });
        renderCategoryCards(filtered, grid);
      });
    }
  }

  // wire search input to combine with filter
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const val = categoryFilter ? categoryFilter.value : "";
      const filteredList = productsList.filter((p) => {
        const matchesQuery =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.short.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q);
        if (!val) return matchesQuery;
        const v = getFilterValueFromProduct(p, categoryName);
        return matchesQuery && String(v) === String(val);
      });
      renderCategoryCards(filteredList, grid);
    });
  }
}

// Function to handle scrolling for similar products (keep this one)
function scrollSimilarProducts(direction) {
  // The actual scrollable container is the wrapper around the grid
  const wrapper = document.querySelector(".horizontal-scroll-wrapper");
  if (!wrapper) {
    console.error("Scroll wrapper not found");
    return;
  }

  const card = wrapper.querySelector(".card");
  const gap = 20; // same gap as CSS
  const cardWidth = (card ? card.offsetWidth : 240) + gap; // fallback
  const scrollAmount = cardWidth * (direction === "next" ? 1 : -1);

  // Smooth scroll behavior on the wrapper
  wrapper.scrollBy({ left: scrollAmount, behavior: "smooth" });
}

// Helper function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// MODIFIED: renderSimilarProductsSection with randomization and excludes straps
function renderSimilarProductsSection(currentProductId) {
  const similarSection = document.getElementById("similarProductsSection");

  // Filter out the current product AND exclude strap products
  const otherProducts = allProducts.filter((p) => {
    // Exclude current product
    if (p.id === currentProductId) return false;

    // Exclude strap products (they have ids starting with "custom--strap-")
    if (p.id.startsWith("custom--strap-")) return false;

    return true;
  });

  // If we have enough products (at least 4), shuffle and show 6
  if (otherProducts.length >= 4) {
    // Shuffle the other products array to get random order
    const shuffledProducts = shuffleArray(otherProducts);

    // Take only a limited number (e.g., 6) to show
    const productsToShow = shuffledProducts.slice(0, 15);

    const backLinkHTML =
      '<div style="margin-top:28px;"><a class="back-link" href="index.html">← Back to shop</a></div>';

    if (!similarSection || productsToShow.length === 0) {
      document
        .querySelector(".product-page")
        .insertAdjacentHTML("beforeend", backLinkHTML);
      return;
    }

    similarSection.innerHTML = `
          <div style="margin-top:0;margin-bottom:20px;">
              <h2 style="font-size:1.5rem;">You May Also Like</h2>
          </div>
          <div class="horizontal-scroll-container">
              <button class="scroll-nav-btn left" aria-label="Previous similar product">&lt;</button>
              <div class="horizontal-scroll-wrapper">
                  <div id="similarProductsGrid" class="grid horizontal-scroll"></div>
              </div>
              <button class="scroll-nav-btn right" aria-label="Next similar product">&gt;</button>
          </div>
      `;

    const grid = document.getElementById("similarProductsGrid");
    productsToShow.forEach((p) => {
      grid.appendChild(createProductCard(p));
    });

    similarSection
      .querySelector(".scroll-nav-btn.left")
      .addEventListener("click", () => scrollSimilarProducts("prev"));
    similarSection
      .querySelector(".scroll-nav-btn.right")
      .addEventListener("click", () => scrollSimilarProducts("next"));

    similarSection.insertAdjacentHTML("afterend", backLinkHTML);
  } else {
    // If we don't have enough non-strap products, just show the back link
    document
      .querySelector(".product-page")
      .insertAdjacentHTML("beforeend", backLinkHTML);
  }
}

/* ---------- Modified renderProductDetail to conditionally show pre-order button ---------- */
function renderProductDetail(product) {
  const container = document.getElementById("productContainer");
  if (!container) return;

  if (!product) {
    container.innerHTML =
      '<div style="color:var(--muted)">Product not found. <a href="index.html">Back to shop</a></div>';
    return;
  }

  const defaultImages = product.images;
  let selectedOption = null;

  function updateProductDisplay(option) {
    selectedOption = option;

    const titleEl = container.querySelector("#productTitle");
    const priceEl = container.querySelector("#productPrice");
    const addToCartBtn = container.querySelector("#addToCartBtn");
    const preOrderBtn = container.querySelector("#preOrderBtn");
    const imagesContainer = container.querySelector(".product-image");

    // 1. Update Title and Option Name
    if (titleEl) {
      if (selectedOption) {
        titleEl.innerHTML = `${product.title} <span class="option-name-display">(${selectedOption.name})</span>`;
      } else {
        titleEl.innerHTML = product.title;
      }
    }

    // 2. Update Price based on selected option
    if (priceEl) {
      const currentPrice =
        selectedOption && selectedOption.price !== undefined
          ? selectedOption.price
          : product.price;
      priceEl.textContent = `$${currentPrice}`;
    }

    // 3. Update Images
    let newImages = defaultImages;
    if (product.available) {
      if (selectedOption && selectedOption.image) {
        newImages = [
          selectedOption.image,
          ...defaultImages.filter((img) => img !== selectedOption.image),
        ];
      }
    }
    imagesContainer.innerHTML = "";
    const carousel = createCarousel(newImages);
    imagesContainer.appendChild(carousel);

    // 4. Update Add to Cart button
    if (addToCartBtn) {
      const isPurchasable =
        product.available && (!selectedOption || selectedOption.available);

      if (isPurchasable) {
        addToCartBtn.classList.remove("locked");
        addToCartBtn.classList.add("add-to-cart");
        addToCartBtn.disabled = false;
        addToCartBtn.textContent = "Add to Cart";

        // Remove any existing listeners and add new one
        const newBtn = addToCartBtn.cloneNode(true);
        addToCartBtn.parentNode.replaceChild(newBtn, addToCartBtn);

        newBtn.addEventListener("click", (e) => {
          e.preventDefault();
          
          // If an option is already selected, add it directly
          if (selectedOption) {
            Cart.addItem(product, selectedOption, newBtn);
            return;
          }
          
          // Check available options
          const availableOptions = product.options
            ? product.options.filter((opt) => opt.available)
            : [];
          
          if (availableOptions.length === 0) {
            // No options, add product directly
            Cart.addItem(product, null, newBtn);
          } else if (availableOptions.length === 1) {
            // Only one available option, add directly
            Cart.addItem(product, availableOptions[0], newBtn);
          } else {
            // Multiple available options, show selection modal
            currentProductForCart = product;
            selectedCartOption = null;
            populateCartOptions(product);
            
            const cartOptionModal = document.getElementById("cartOptionModal");
            if (cartOptionModal) {
              cartOptionModal.setAttribute("aria-hidden", "false");
            }
          }
        });
      } else {
        addToCartBtn.classList.add("locked");
        addToCartBtn.classList.remove("add-to-cart");
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = "Unavailable";
      }
    }

    // 5. Update Pre-order button - handle both unavailable products and mixed availability
    if (preOrderBtn) {
      // Check if product has mixed availability
      const hasMixedAvailability = product.available && product.options && product.options.length > 0 &&
        product.options.some(opt => opt.available) && product.options.some(opt => !opt.available);

      if (product.available && !hasMixedAvailability) {
        // If product is fully available with no mixed availability, hide pre-order button
        preOrderBtn.style.display = "none";
        preOrderBtn.disabled = true;
      } else {
        // Show and enable pre-order button for unavailable products or mixed availability
        preOrderBtn.style.display = "inline-block";
        preOrderBtn.classList.remove("locked");
        preOrderBtn.disabled = false;

        // Remove any existing listeners and add new one
        const newPreBtn = preOrderBtn.cloneNode(true);
        preOrderBtn.parentNode.replaceChild(newPreBtn, preOrderBtn);

        newPreBtn.addEventListener("click", (e) => {
          e.preventDefault();

          // If product has options, show option selection modal
          if (product.options && product.options.length > 0) {
            currentProductForPreorder = product;
            selectedPreorderOption = null;
            // For mixed availability, only show unavailable options
            populatePreorderOptions(product, hasMixedAvailability);

            // Show the option selection modal
            const preorderOptionModal = document.getElementById(
              "preorderOptionModal"
            );
            if (preorderOptionModal) {
              preorderOptionModal.setAttribute("aria-hidden", "false");
            }
          } else {
            // If no options, directly add to pre-order list
            PreOrderList.addItem(product, selectedOption, newPreBtn);
          }
        });
      }
    }

    // 6. Update active class on option cards
    const optionsGrid = document.getElementById("optionsGrid");
    if (optionsGrid) {
      optionsGrid.querySelectorAll(".product-option").forEach((card) => {
        if (selectedOption && card.dataset.optionName === selectedOption.name) {
          card.classList.add("active-option");
        } else {
          card.classList.remove("active-option");
        }
      });
    }
  }

  // Initial render setup
  const hasOptions = product.options && product.options.length > 0;

  // Check if product has mixed availability (some options available, some not)
  let hasMixedAvailability = false;
  if (hasOptions && product.available) {
    const availableCount = product.options.filter(opt => opt.available).length;
    const unavailableCount = product.options.length - availableCount;
    hasMixedAvailability = availableCount > 0 && unavailableCount > 0;
  }

  // MODIFIED: Show Add to Cart for available products, add Pre-Order button for mixed availability
  let actionButtonHTML = "";
  if (product.available) {
    // Product is available - show Add to Cart button
    actionButtonHTML = `<button class="btn primary add-to-cart" id="addToCartBtn">Add to Cart</button>`;
    // If has mixed availability, also show Pre-Order button for unavailable options
    if (hasMixedAvailability) {
      actionButtonHTML += `<button class="btn primary pre-order" id="preOrderBtn" style="margin-left:10px;">Pre-Order</button>`;
    }
  } else {
    // Product is not available - show only Pre-order button
    actionButtonHTML = `<button class="btn primary pre-order" id="preOrderBtn">Pre-order</button>`;
  }

  const compareButtonHTML =
    product.category === "mice" || product.category === "keyboards"
      ? `<button class="btn compare" id="compareBtn">Compare</button>`
      : "";

  // Wishlist button - available for all products
  const wishlistBtnClass = Wishlist.isInWishlist(product.id) ? "in-wishlist" : "";
  const wishlistBtnText = Wishlist.isInWishlist(product.id) ? "In Wishlist ❤️" : "Add to Wishlist";
  const wishlistButtonHTML = `<button class="btn wishlist ${wishlistBtnClass}" id="wishlistBtn" data-wishlist-product-id="${product.id}">${wishlistBtnText}</button>`;

  const optionsPlaceholderHTML = hasOptions
    ? `<div class="product-options-container">
            <h3>Available Options:</h3>
            <div class="options-scroll-container">
                <div class="options-scroll-wrapper">
                    <div id="optionsGrid" class="options-grid horizontal-scroll"></div>
                </div>
            </div>
        </div>`
    : "";

  // Seller rating block: always render; show filled stars when rating exists, otherwise grey empty stars
  const hasRating =
    product.sellerRating !== undefined &&
    product.sellerRating !== null &&
    !Number.isNaN(Number(product.sellerRating));
  const score = hasRating ? Number(product.sellerRating) : 0;
  const ratingBlock = `
    <div class="seller-rating glass">
      <div class="rating-label">Seller Review:</div>
      <div style="display:flex; align-items:center; gap:8px;">
        <div class="star-rating ${
          hasRating ? "" : "no-rating"
        }" data-score="${score}">
          <span class="star-bg">★★★★★</span>
          <span class="star-fill" style="width:${
            hasRating ? (score / 10) * 100 : 0
          }%">★★★★★</span>
        </div>
        <div class="rating-score">(${
          hasRating ? score + "/10)" : "No review)"
        }</div>
      </div>
    </div>
  `;

  container.innerHTML = `
        <div class="product-top-section">
          <div class="product-image"></div>
          <div class="product-info">
              <h1 id="productTitle">${product.title}</h1>
              <p class="muted">${product.short}</p>
              <div id="productPrice" style="margin-top:12px;font-weight:700;color:var(--accent);font-size:1.5rem">
                  $${product.price}
              </div>
              ${ratingBlock}
              <div class="product-buttons-container">
                <div class="compare-wishlist-row">
                  ${compareButtonHTML}
                  ${wishlistButtonHTML}
                </div>
                <div class="product-specs-section">
                  ${product.category === "mice" 
                    ? getMiceSpecsGrid(product) 
                    : product.category === "keyboards"
                    ? getKeyboardSpecsGrid(product)
                    : getOtherProductSpecsBox(product)}
                </div>
                <div class="action-btn-row">
                    ${actionButtonHTML}
                </div>
              </div>
              <p style="margin-top:12px;color:var(--muted)">Delivery is available in: <strong>Cambodia</strong>.</p>
          </div>
        </div>
        ${optionsPlaceholderHTML}
      `;

  const compareBtn = container.querySelector("#compareBtn");
  if (compareBtn) {
    compareBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openCompareSelectionModal(product.id, product.category);
    });
  }

  // Wire up wishlist button
  const wishlistBtn = container.querySelector("#wishlistBtn");
  if (wishlistBtn) {
    wishlistBtn.addEventListener("click", (e) => {
      e.preventDefault();
      Wishlist.toggleItem(product, null, wishlistBtn);
      // Update button state
      if (Wishlist.isInWishlist(product.id)) {
        wishlistBtn.classList.add("in-wishlist");
        wishlistBtn.textContent = "In Wishlist ❤️";
      } else {
        wishlistBtn.classList.remove("in-wishlist");
        wishlistBtn.textContent = "Add to Wishlist";
      }
    });
  }

  // Wire up the options grid
  if (hasOptions) {
    const optionsGrid = document.getElementById("optionsGrid");
    product.options.forEach((option) => {
      optionsGrid.appendChild(
        createOptionCard(product, option, (opt) => updateProductDisplay(opt))
      );
    });

    const initialOption =
      product.options.find((o) => o.available) || product.options[0];
    updateProductDisplay(initialOption);
  } else {
    updateProductDisplay(null);
  }

  renderSimilarProductsSection(product.id);
}

function createCarousel(images) {
  const wrapper = document.createElement("div");
  wrapper.className = "carousel";
  const track = document.createElement("div");
  track.className = "carousel-track";

  images.forEach((src, i) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Product image ${i + 1}`;
    img.loading = "lazy";
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => openImageModalWithGallery(images, i));
    slide.appendChild(img);
    track.appendChild(slide);
  });

  const btnLeft = document.createElement("button");
  btnLeft.className = "carousel-btn left";
  btnLeft.setAttribute("aria-label", "Previous image");
  btnLeft.innerHTML = "&#9664;";
  const btnRight = document.createElement("button");
  btnRight.className = "carousel-btn right";
  btnRight.setAttribute("aria-label", "Next image");
  btnRight.innerHTML = "&#9654;";

  // Defensive: ensure pointer/touch events on these buttons aren't swallowed by other handlers
  btnLeft.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
  });
  btnRight.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
  });
  btnLeft.addEventListener(
    "touchstart",
    (e) => {
      e.stopPropagation();
    },
    { passive: true }
  );
  btnRight.addEventListener(
    "touchstart",
    (e) => {
      e.stopPropagation();
    },
    { passive: true }
  );

  const dots = document.createElement("div");
  dots.className = "carousel-dots";
  images.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "carousel-dot";
    if (i === 0) d.classList.add("active");
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
    const allDots = dots.querySelectorAll(".carousel-dot");
    allDots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }

  function prev() {
    index = Math.max(0, index - 1);
    update();
  }
  function next() {
    index = Math.min(slidesCount - 1, index + 1);
    update();
  }

  btnLeft.addEventListener("click", prev);
  btnRight.addEventListener("click", next);

  dots.addEventListener("click", (e) => {
    const dot = e.target.closest(".carousel-dot");
    if (!dot) return;
    index = Number(dot.dataset.index);
    update();
  });

  const ro = new ResizeObserver(() => update());
  ro.observe(wrapper);

  track.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length !== 1) return;
      isDragging = true;
      startX = e.touches[0].clientX;
      track.style.transition = "none";
    },
    { passive: true }
  );

  track.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - startX;
      track.style.transform = `translateX(${currentTranslate + dx}px)`;
    },
    { passive: true }
  );

  track.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = "";
    const dx =
      e.changedTouches && e.changedTouches[0]
        ? e.changedTouches[0].clientX - startX
        : 0;
    const width = wrapper.clientWidth;
    if (dx > width * 0.2) index = Math.max(0, index - 1);
    else if (dx < -width * 0.2) index = Math.min(slidesCount - 1, index + 1);
    update();
  });

  let mouseDown = false;
  let mouseStartX = 0;
  track.addEventListener("mousedown", (e) => {
    mouseDown = true;
    mouseStartX = e.clientX;
    track.style.transition = "none";
    e.preventDefault();
  });
  window.addEventListener("mousemove", (e) => {
    if (!mouseDown) return;
    const dx = e.clientX - mouseStartX;
    track.style.transform = `translateX(${currentTranslate + dx}px)`;
  });
  window.addEventListener("mouseup", (e) => {
    if (!mouseDown) return;
    mouseDown = false;
    track.style.transition = "";
    const dx = e.clientX - mouseStartX;
    const width = wrapper.clientWidth;
    if (dx > width * 0.2) index = Math.max(0, index - 1);
    else if (dx < -width * 0.2) index = Math.min(slidesCount - 1, index + 1);
    update();
  });

  wrapper.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });
  wrapper.tabIndex = 0;
  index = 0;
  slidesCount = images.length;
  update();

  const slideImgs = track.querySelectorAll("img");
  slideImgs.forEach((img) => {
    img.addEventListener("load", update);
    img.addEventListener("error", update);
  });

  return wrapper;
}

function syncCartBadge() {
  if (typeof Cart !== "undefined") {
    const items = Cart.getItems();
    const badge = document.getElementById("cartBadge");
    const badgeMobile = document.getElementById("cartBadgeMobile");

    // Desktop badge
    if (badge) {
      badge.textContent = items.length;
      if (items.length > 0) {
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    }

    // Mobile badge
    if (badgeMobile) {
      badgeMobile.textContent = items.length;
      if (items.length > 0) {
        badgeMobile.classList.remove("hidden");
      } else {
        badgeMobile.classList.add("hidden");
      }
    }
  }

  // Also sync preorder badges
  if (typeof PreOrderList !== "undefined") {
    const items = PreOrderList.getItems();
    const badge = document.getElementById("preorderBadge");
    const badgeMobile = document.getElementById("preorderBadgeMobile");
    const badgeDesktop = document.getElementById("preorderBadgeDesktop");

    if (badge) {
      badge.textContent = items.length;
      if (items.length > 0) {
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    }

    if (badgeMobile) {
      badgeMobile.textContent = items.length;
      if (items.length > 0) {
        badgeMobile.classList.remove("hidden");
      } else {
        badgeMobile.classList.add("hidden");
      }
    }

    if (badgeDesktop) {
      badgeDesktop.textContent = items.length;
      if (items.length > 0) {
        badgeDesktop.classList.remove("hidden");
      } else {
        badgeDesktop.classList.add("hidden");
      }
    }
  }

  // Also sync wishlist badges
  if (typeof Wishlist !== "undefined") {
    const items = Wishlist.getItems();
    const badge = document.getElementById("wishlistBadge");
    const badgeMobile = document.getElementById("wishlistBadgeMobile");

    if (badge) {
      badge.textContent = items.length;
      if (items.length > 0) {
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    }

    if (badgeMobile) {
      badgeMobile.textContent = items.length;
      if (items.length > 0) {
        badgeMobile.classList.remove("hidden");
      } else {
        badgeMobile.classList.add("hidden");
      }
    }
  }
}

// Ensure this is called when the DOM is fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", syncCartBadge);
} else {
  syncCartBadge();
}

/* ---------- Page init ---------- */
(async function init() {
  // Load products from JSON files and popup config first
  await Promise.all([loadProductsFromJSON(), loadPopupConfig()]);

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  // Contact links initialization (for modal)

  const whatsappMain = document.getElementById("whatsappMain");
  const telegramMain = document.getElementById("telegramMain");
  const discordMain = document.getElementById("discordMain");
  if (whatsappMain)
    whatsappMain.href = `https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(
      /\D/g,
      ""
    )}`;
  if (telegramMain) telegramMain.href = `https://t.me/${TELEGRAM_HANDLE}`;
  if (discordMain) discordMain.textContent = DISCORD_HANDLE;


  // Check for the containers to determine which page we are on
  const indexGrid = document.getElementById("keyboardGrid");
  const detailContainer = document.getElementById("productContainer");
  const categoryContainer = document.getElementById("categoryContainer");

  // Initialize global search on all pages
  initGlobalSearch();

  if (indexGrid) {
    // 1. This is the index page
    initIndexPage();
  } else if (categoryContainer) {
    // 2. This is the new category listing page (category.html)
    initCategoryPage();
  } else if (detailContainer) {
    // 3. This is the product detail page (products.html)
    const id = getQueryParam("id");
    const product = allProducts.find((p) => p.id === id);
    renderProductDetail(product);
  }
})();
