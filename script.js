import { keyboards } from "./products/keyboards.js";
import { mice } from "./products/mice.js";
import { keycaps } from "./products/keycaps.js";
import { mousepads } from "./products/mousepads.js";

const CONTACT_WHATSAPP_NUMBER = "85514975307";
const TELEGRAM_HANDLE = "glsswrksGG";
const DISCORD_HANDLE = "Kokushibo#4764";

let currentProductForPreorder = null;
let selectedPreorderOption = null;

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
}

function openImageModal(src) {
  if (!document.getElementById("imageModal")) initImageModal();
  const m = document.getElementById("imageModal");
  const img = m.querySelector(".image-modal-img");
  img.src = src || "";
  m.setAttribute("aria-hidden", "false");
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
  `;
  document.body.appendChild(modal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeOptionPreviewModal();
  });

  modal.querySelector(".option-preview-close").addEventListener("click", closeOptionPreviewModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeOptionPreviewModal();
  });
}

function openOptionPreviewModal(option, fallbackPrice = null) {
  if (!document.getElementById("optionPreviewModal")) initOptionPreviewModal();
  const m = document.getElementById("optionPreviewModal");
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
  price.textContent = displayPrice !== undefined && displayPrice !== null ? `$${displayPrice}` : "";
  
  m.setAttribute("aria-hidden", "false");
}

function closeOptionPreviewModal() {
  const m = document.getElementById("optionPreviewModal");
  if (!m) return;
  m.setAttribute("aria-hidden", "true");
}

const productData = {
  keyboards,
  mice,
  keycaps,
  mousepads,
};

const allProducts = [...keyboards, ...mice, ...keycaps, ...mousepads];

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

  compareEls.head.innerHTML = `
    <tr>
      <th>Feature</th>
      ${selectedProducts.map((p) => `<th>${p.title}</th>`).join("")}
    </tr>
  `;

  const isMouseComparison = selectedProducts.every((p) => p.category === "mice");

  let rows;
  if (isMouseComparison) {
    rows = [
      {
        label: "Image",
        value: (p) => {
          const cover = Array.isArray(p.images) && p.images.length ? p.images[0] : "";
          return `<img src="${cover}" alt="${p.title}" class="comparison-img">`;
        },
      },
      { label: "Price", value: (p) => `$${p.price}` },
      { label: "Availability", value: (p) => (p.available ? "Available" : "Unavailable") },
      { label: "Category", value: (p) => p.category || "—" },
      { label: "Weight", value: (p) => (p.specs && p.specs.weight) || "—" },
      { label: "Polling Rate", value: (p) => (p.specs && p.specs.pollingRate) || "—" },
      { label: "Latency", value: (p) => (p.specs && p.specs.latency) || "—" },
      { label: "Sensor", value: (p) => (p.specs && p.specs.sensor) || "—" },
      { label: "MCU", value: (p) => (p.specs && p.specs.mcu) || "—" },
      { label: "Switch", value: (p) => (p.specs && p.specs.switch) || "—" },
      { label: "Acceleration", value: (p) => (p.specs && p.specs.acceleration) || "—" },
      { label: "DPI", value: (p) => (p.specs && p.specs.dpi) || "—" },
      { label: "Battery", value: (p) => (p.specs && p.specs.battery) || "—" },
      { label: "Coating", value: (p) => (p.specs && p.specs.coating) || "—" },
      { label: "Connectivity", value: (p) => (p.specs && p.specs.connectivity) || "—" },
      { label: "Highlights", value: (p) => p.short || "—" },
      { label: "Features", value: (p) => {
          const feats = p.specs && Array.isArray(p.specs.features) ? p.specs.features : [];
          return feats.length ? `• ${feats.slice(0, 8).join("<br><br>• ")}` : "—";
        }
      },
    ];
  } else {
    rows = [
      {
        label: "Image",
        value: (p) => {
          const cover = Array.isArray(p.images) && p.images.length ? p.images[0] : "";
          return `<img src="${cover}" alt="${p.title}" class="comparison-img">`;
        },
      },
      { label: "Price", value: (p) => `$${p.price}` },
      { label: "Availability", value: (p) => (p.available ? "Available" : "Unavailable") },
      { label: "Category", value: (p) => p.category || "—" },
      { label: "Layout", value: (p) => p.layout || "—" },
      { label: "Polling Rate", value: (p) => (p.specs && p.specs.pollingRate) || "—" },
      { label: "Latency", value: (p) => (p.specs && p.specs.latency) || "—" },
      { label: "Single Key Scan Rate", value: (p) => (p.specs && p.specs.singleKeyScanRate) || "—" },
      { label: "Full Key Scan Rate", value: (p) => (p.specs && p.specs.fullKeyScanRate) || "—" },
      { label: "RT Range", value: (p) => (p.specs && p.specs.rtRange) || "—" },
      { label: "Highlights", value: (p) => p.short || "—" },
      { label: "Features", value: (p) => {
          const feats = p.specs && Array.isArray(p.specs.features) ? p.specs.features : [];
          return feats.length ? `• ${feats.slice(0, 8).join("<br><br>• ")}` : "—";
        }
      },
    ];
  }

  compareEls.body.innerHTML = rows
    .map(
      (row) => `
        <tr>
          <th>${row.label}</th>
          ${selectedProducts
            .map((p) => `<td>${row.value(p)}</td>`)
            .join("")}
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

  addItem: function (product, option) {
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

    // Update Badge
    if (badge) {
      badge.textContent = items.length;
      if (items.length > 0) badge.classList.remove("hidden");
      else badge.classList.add("hidden");
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

  addItem: function (product, option) {
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
    if (badge) {
      badge.textContent = items.length;
      if (items.length > 0) badge.classList.remove("hidden");
      else badge.classList.add("hidden");
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
    const checkoutBtn = document.getElementById("checkoutTelegramBtn");
    if (checkoutBtn) {
      let message = "Hello, I would like to place an order:\n\n";
      items.forEach((item, i) => {
        message += `${i + 1}. ${item.title} ${
          item.optionName ? `(${item.optionName})` : ""
        } - $${item.price}\n`;
      });
      message += `\nTotal: $${Cart.getTotal()}`;
      message += "\n\nIs this available?";

      checkoutBtn.href = `https://t.me/${TELEGRAM_HANDLE}?text=${encodeURIComponent(
        message
      )}`;
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
  const currentTheme = localStorage.getItem("theme") || "dark";
  const cartToggle = document.getElementById("cartToggle");
  const cartModal = document.getElementById("cartModal");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const clearCartBtn = document.getElementById("clearCartBtn");
  const startShopBtn = document.getElementById("startShoppingBtn");

  // NEW: Pre-order elements
  const preorderLink = document.getElementById("preorderLink");
  const preorderModal = document.getElementById("preorderModal");
  const closePreorderBtn = document.getElementById("closePreorderBtn");
  const clearPreordersBtn = document.getElementById("clearPreordersBtn");
  const preorderInfoBtn = document.getElementById("preorderInfoBtn");

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

  // Set initial state
  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    themeToggle.querySelector(".icon").textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    let theme = document.documentElement.getAttribute("data-theme");
    if (theme === "light") {
      document.documentElement.removeAttribute("data-theme");
      themeToggle.querySelector(".icon").textContent = "🌙";
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      themeToggle.querySelector(".icon").textContent = "☀️";
      localStorage.setItem("theme", "light");
    }
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
            selectedPreorderOption
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
    compareEls.closeSelectBtn.addEventListener("click", closeCompareSelectionModal);
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
    compareEls.closeResultBtn.addEventListener("click", closeComparisonResultModal);
  }
  if (compareEls.resultModal) {
    compareEls.resultModal.addEventListener("click", (e) => {
      if (e.target === compareEls.resultModal) closeComparisonResultModal();
    });
  }

  // Initialize UI
  Cart.updateUI();
  PreOrderList.updateUI();
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
const DESKTOP_COLUMNS = 4;
const INITIAL_MOBILE_LIMIT = MOBILE_COLUMNS * 2; // 4 items
const INITIAL_DESKTOP_LIMIT = DESKTOP_COLUMNS * 2; // 8 items

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
      openOptionPreviewModal(option, product.price);
    });
  }

  const priceHTML =
    option.price !== undefined
      ? `<span class="option-price">$${option.price}</span>`
      : "";
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
function filterIndexProducts(
  query,
  categoryList,
  gridId,
  moreContainerId,
  categoryName
) {
  const normalizedQuery = query.toLowerCase().trim();
  const filteredList = categoryList.filter(
    (p) =>
      p.title.toLowerCase().includes(normalizedQuery) ||
      p.short.toLowerCase().includes(normalizedQuery) ||
      p.id.toLowerCase().includes(normalizedQuery)
  );
  renderIndexCards(filteredList, gridId, moreContainerId, categoryName);
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
  const searchInputId = `${prefix}Search`;

  const searchInput = document.getElementById(searchInputId);

  renderIndexCards(productsList, gridId, moreContainerId, categoryName);

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      filterIndexProducts(
        e.target.value,
        productsList,
        gridId,
        moreContainerId,
        categoryName
      );
    });
  }
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

/* ---------- Category page: render full list (UNCHANGED) ---------- */
function renderCategoryCards(list, gridElement) {
  gridElement.innerHTML = "";
  if (list.length === 0) {
    gridElement.innerHTML =
      '<p class="muted" style="grid-column: 1 / -1; text-align: center; margin-top: 20px;">No products found matching your search in this category.</p>';
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
            <input type="text" id="categorySearch" placeholder="Search all ${categoryName}..." class="search-input">
        </div>
        <div id="categoryGrid" class="grid"></div>
        <div style="margin-top:28px;">
            <a class="back-link" href="index.html">← Back to shop</a>
        </div>
    `;

  const grid = document.getElementById("categoryGrid");
  const searchInput = document.getElementById("categorySearch");

  renderCategoryCards(productsList, grid);

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const filteredList = productsList.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.short.toLowerCase().includes(query) ||
        p.id.toLowerCase().includes(query)
    );
    renderCategoryCards(filteredList, grid);
  });
}

// Function to handle scrolling for similar products (keep this one)
function scrollSimilarProducts(direction) {
  // The actual scrollable container is the wrapper around the grid
  const wrapper = document.querySelector(
    "#similarProductsSection .horizontal-scroll-wrapper"
  );
  if (!wrapper) return;

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
          Cart.addItem(product, selectedOption);
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
            PreOrderList.addItem(product, selectedOption);
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

  const compareButtonHTML = `<button class="btn compare" id="compareBtn">Compare</button>`;

  const optionsPlaceholderHTML = hasOptions
    ? `<div class="product-options-container">
            <h3>Available Options</h3>
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
    img.addEventListener("click", () => openImageModal(src));
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

    if (badge) {
      badge.textContent = items.length;
      if (items.length > 0) {
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
        badge.style.display = "none";
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
