import { keyboards } from "./products/keyboards.js";
import { mice } from "./products/mice.js";
import { keycaps } from "./products/keycaps.js";
import { mousepads } from "./products/mousepads.js";

const CONTACT_WHATSAPP_NUMBER = "85514975307";
const TELEGRAM_HANDLE = "glsswrksGG";
const DISCORD_HANDLE = "Kokushibo#4764";

let currentProductForPreorder = null;
let selectedPreorderOption = null;
// Track the product/option currently shown in the option preview modal
let currentOptionPreview = null;

// Image modal gallery state for preview navigation
let imageModalGallery = [];
let imageModalIndex = 0;
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
        <div style="margin-top:12px;">
          <button id="preorderNowBtn" class="btn pre-order">Pre-order</button>
        </div>
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

  // Pre-order button inside the preview modal
  const preorderBtn = modal.querySelector("#preorderNowBtn");
  if (preorderBtn) {
    preorderBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (
        currentOptionPreview &&
        currentOptionPreview.product &&
        currentOptionPreview.option
      ) {
        PreOrderList.addItem(
          currentOptionPreview.product,
          currentOptionPreview.option,
          preorderBtn
        );
        closeOptionPreviewModal();
        showToast(
          `Added ${currentOptionPreview.product.title} (${currentOptionPreview.option.name}) to pre-order list`
        );
        return;
      }

      // Fallback: try to locate the parent product by matching option name
      if (currentOptionPreview && currentOptionPreview.option) {
        const optName = currentOptionPreview.option.name;
        const prod = allProducts.find(
          (p) =>
            Array.isArray(p.options) &&
            p.options.some((o) => o.name === optName)
        );
        if (prod) {
          PreOrderList.addItem(prod, currentOptionPreview.option, preorderBtn);
          closeOptionPreviewModal();
          showToast(
            `Added ${prod.title} (${currentOptionPreview.option.name}) to pre-order list`
          );
        }
      }
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

  // store current previewed product/option for the pre-order button
  currentOptionPreview = { product: product, option: option };

  // Ensure preorder button is shown, enabled and has a fresh click handler
  const previewPreorderBtn = m.querySelector("#preorderNowBtn");
  if (previewPreorderBtn) {
    // Replace the button node to remove any stale listeners, then attach a new one
    const freshBtn = previewPreorderBtn.cloneNode(true);
    previewPreorderBtn.parentNode.replaceChild(freshBtn, previewPreorderBtn);
    freshBtn.disabled = false;
    freshBtn.style.display = "";

    freshBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      PreOrderList.addItem(product, option, freshBtn);
      closeOptionPreviewModal();
      showToast(`Added ${product.title} (${option.name}) to pre-order list`);
    });
  }

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
      const previewPreorderBtn = m.querySelector("#preorderNowBtn");
      if (previewPreorderBtn) {
        previewPreorderBtn.disabled = true;
        previewPreorderBtn.style.display = "none";
      }
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

const productData = {
  keyboards,
  mice,
  keycaps,
  mousepads,
};

const allProducts = [...keyboards, ...mice, ...keycaps, ...mousepads];

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
            ? `• ${feats.slice(0, 8).join("<br><br>• ")}`
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
            ? `• ${feats.slice(0, 8).join("<br><br>• ")}`
            : "—";
        },
      },
    ];
  }

  compareEls.body.innerHTML = rows
    .map(
      (row) => `
        <tr>
          <th>${row.label}</th>
          ${selectedProducts.map((p) => `<td>${row.value(p)}</td>`).join("")}
        </tr>
      `
    )
    .join("");
}

function openComparisonResultModal() {
  renderComparisonTable();
  if (compareEls.resultModal) {
    compareEls.resultModal.setAttribute("aria-hidden", "false");
  }
}

function populatePreorderOptions(product) {
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

  product.options.forEach((option, index) => {
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
  if (product.options.length === 1) {
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
    // Create a unique cart item
    const newItem = {
      id: product.id,
      title: product.title,
      price: option ? option.price || product.price : product.price, // Handle option price override
      optionName: option ? option.name : null,
      image: option ? option.image : product.images[0] || "",
      timestamp: Date.now(),
    };

    items.push(newItem);
    localStorage.setItem(this.key, JSON.stringify(items));
    this.updateUI();
    showToast(`Added ${newItem.title} to cart`);

    // Trigger flying animation when source element provided
    if (sourceElement) {
      animateToCart(newItem.image, sourceElement);
    }
  },

  removeItem: function (index) {
    const items = this.getItems();
    items.splice(index, 1);
    localStorage.setItem(this.key, JSON.stringify(items));
    this.updateUI();
  },

  clear: function () {
    localStorage.removeItem(this.key);
    this.updateUI();
  },

  getTotal: function () {
    const items = this.getItems();
    return items.reduce((sum, item) => sum + Number(item.price), 0);
  },

  updateUI: function () {
    const items = this.getItems();
    const badge = document.getElementById("cartBadge");
    const badgeMobile = document.getElementById("cartBadgeMobile");

    // Update Badge (desktop)
    if (badge) {
      badge.textContent = items.length;
      if (items.length > 0) badge.classList.remove("hidden");
      else badge.classList.add("hidden");
    }

    // Update Badge (mobile)
    if (badgeMobile) {
      badgeMobile.textContent = items.length;
      if (items.length > 0) badgeMobile.classList.remove("hidden");
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
    const newItem = {
      id: product.id,
      title: product.title,
      price: option ? option.price || product.price : product.price,
      optionName: option ? option.name : null,
      image: option ? option.image : product.images[0] || "",
      timestamp: Date.now(),
      preorder: true,
    };

    items.push(newItem);
    localStorage.setItem(this.key, JSON.stringify(items));
    this.updateUI();
    showToast(`Added ${newItem.title} to pre-order list`);

    // Trigger flying animation
    if (sourceElement) {
      animateToPreorder(newItem.image, sourceElement);
    }
  },

  removeItem: function (index) {
    const items = this.getItems();
    items.splice(index, 1);
    localStorage.setItem(this.key, JSON.stringify(items));
    this.updateUI();

    // IMPORTANT: Re-render the modal immediately
    renderPreorderModal();
  },

  clear: function () {
    localStorage.removeItem(this.key);
    this.updateUI();
  },

  updateUI: function () {
    const items = this.getItems();
    const badge = document.getElementById("preorderBadge");
    const badgeMobile = document.getElementById("preorderBadgeMobile");

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
      document.getElementById("preorderModal")?.getAttribute("aria-hidden") ===
      "false"
    ) {
      renderPreorderModal();
    }
  },
};

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
        <img src="${
          item.image
        }" alt="thumb" style="width:40px; height:40px; object-fit:cover; border-radius:4px; margin-right:10px;">
        <div class="cart-item-info">
          <span class="cart-item-title">${item.title}</span>
          ${
            item.optionName
              ? `<span class="cart-item-option">${item.optionName}</span>`
              : ""
          }
        </div>
        <div style="display:flex; align-items:center;">
          <span class="cart-item-price">$${item.price}</span>
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

    totalEl.textContent = `$${Cart.getTotal()}`;

    // Generate Checkout Link
    const checkoutTelegramBtn = document.getElementById("checkoutTelegramBtn");
    const checkoutWhatsAppBtn = document.getElementById("checkoutWhatsAppBtn");
    const copyOrderBtn = document.getElementById("copyOrderBtn");
    if (checkoutTelegramBtn || checkoutWhatsAppBtn || copyOrderBtn) {
      let message = "Hello, I would like to place an order:\n\n";
      items.forEach((item, i) => {
        message += `${i + 1}. ${item.title} ${
          item.optionName ? `(${item.optionName})` : ""
        } - $${item.price}\n`;
      });
      message += `\nTotal: $${Cart.getTotal()}`;
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
        <img src="${
          item.image
        }" alt="thumb" style="width:40px; height:40px; object-fit:cover; border-radius:4px; margin-right:10px;">
        <div class="cart-item-info">
          <span class="cart-item-title">${item.title}</span>
          ${
            item.optionName
              ? `<span class="cart-item-option">${item.optionName}</span>`
              : ""
          }
          <span class="preorder-label" style="color:#FF6B6B; font-size:0.8rem; font-weight:600;">PRE-ORDER</span>
        </div>
        <div style="display:flex; align-items:center;">
          <span class="cart-item-price">$${item.price}</span>
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
        message += `${i + 1}. ${item.title} ${
          item.optionName ? `(${item.optionName})` : ""
        } - $${item.price}\n`;
      });

      // Add deposit information
      const total = items.reduce((sum, item) => sum + item.price, 0);
      const deposit = total * 0.5;

      message += `\nTotal: $${total}`;
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
  if (s.pollingRate) list.push(`${s.pollingRate} Polling rate`);
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
  const availClass = p.available
    ? "availability available"
    : "availability unavailable";
  const availText = p.available ? "Available" : "Unavailable";
  const href = productLink(p.id);
  const cover = Array.isArray(p.images) && p.images.length ? p.images[0] : "";
  const priceBadgeClass = p.available ? "price-badge in-stock" : "price-badge";
  const firstSpec = getSpecsList(p)[0] || "";
  let no_info = `<div class="specs-inline muted">${p.layout} • ${firstSpec}</div>`;
  if (p.no_info !== undefined && p.no_info === true) {
    no_info = `<div class="specs-inline muted">${p.layout}</div>`;
  }

  // For mouse products, remove weight and switch text from the inline specs
  if (p.category === "mice") {
    no_info = `<div class="specs-inline muted"></div>`;
  }

  card.innerHTML = `
    <div class="card-image">
      <a class="card-link" href="${href}">
        <img src="${cover}" alt="${p.title}">
      </a>
      ${badgeHTML} <span class="${priceBadgeClass}">$${p.price}</span>
    </div>
    <div class="card-body">
      <h4 class="card-title">
        <a class="card-title-link" href="${href}">${p.title}</a>
      </h4>
      <p class="muted card-desc">
        <a href="${href}" style="text-decoration: none; color: inherit;">${p.short}</a>
      </p>
      <div class="card-footer">
        ${no_info}
        <div class="availability-wrap">
          <span class="${availClass}">${availText}</span>
        </div>
      </div>
    </div>
  `;
  // Attach image click to open lightbox (prevent link navigation when clicking image)
  const cardImg = card.querySelector(".card-image img");
  if (cardImg) {
    cardImg.style.cursor = "zoom-in";
    cardImg.addEventListener("click", (e) => {
      e.preventDefault();
      openImageModal(cardImg.src);
    });
  }
  // If the product is locked, disable navigation and add a visual state
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
          <div style="margin-top:40px;margin-bottom:20px;">
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
          Cart.addItem(product, selectedOption, newBtn);
        });
      } else {
        addToCartBtn.classList.add("locked");
        addToCartBtn.classList.remove("add-to-cart");
        addToCartBtn.disabled = true;
        addToCartBtn.textContent = "Unavailable";
      }
    }

    // 5. Update Pre-order button - ONLY SHOW FOR UNAVAILABLE PRODUCTS
    // In the updateProductDisplay function within renderProductDetail, update the pre-order button section:
    if (preOrderBtn) {
      if (product.available) {
        // If product is available, hide and disable pre-order button
        preOrderBtn.style.display = "none";
        preOrderBtn.disabled = true;
      } else {
        // If product is not available, show and enable pre-order button
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
            populatePreorderOptions(product);

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

  // MODIFIED: Show Add to Cart only for available products, Pre-order only for unavailable products
  let actionButtonHTML = "";
  if (product.available) {
    // Product is available - show only Add to Cart button
    actionButtonHTML = `<button class="btn primary add-to-cart" id="addToCartBtn">Add to Cart</button>`;
  } else {
    // Product is not available - show only Pre-order button
    actionButtonHTML = `<button class="btn primary pre-order" id="preOrderBtn">Pre-order</button>`;
  }

  const compareButtonHTML =
    product.category === "mice" || product.category === "keyboards"
      ? `<button class="btn compare" id="compareBtn">Compare</button>`
      : "";

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
        <div class="product-image"></div>
        <div class="product-info">
            <h1 id="productTitle">${product.title}</h1>
            <p class="muted">${product.short}</p>
            <div id="productPrice" style="margin-top:12px;font-weight:700;color:var(--accent);font-size:1.5rem">
                $${product.price}
            </div>
            ${ratingBlock}
            <ul class="specs">${getSpecsList(product)
              .map((s) => `<li>• ${s}</li>`)
              .join("")}</ul>
            <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
                ${actionButtonHTML}
                ${compareButtonHTML}
            </div>
            <p style="margin-top:12px;color:var(--muted)">Delivery is available in: <strong>Cambodia</strong>.</p>
        </div>
        ${optionsPlaceholderHTML} `;

  const compareBtn = container.querySelector("#compareBtn");
  if (compareBtn) {
    compareBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openCompareSelectionModal(product.id, product.category);
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
        badge.style.display = "none";
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

/* ---------- Page init (UNCHANGED) ---------- */
(function init() {
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
