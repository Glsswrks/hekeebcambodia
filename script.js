import { keyboards } from "./products/keyboards.js";
import { mice } from "./products/mice.js";
import { keycaps } from "./products/keycaps.js";
import { mousepads } from "./products/mousepads.js";

const CONTACT_WHATSAPP_NUMBER = "85514975307";
const TELEGRAM_HANDLE = "glsswrksGG";
const DISCORD_HANDLE = "Kokushibo#4764";

let currentProductForPreorder = null;
let selectedPreorderOption = null;
let currentProductForComparison = null;
let selectedProductsForComparison = new Set();
let comparisonSession = [];

const productData = {
  keyboards,
  mice,
  keycaps,
  mousepads,
};

const allProducts = [...keyboards, ...mice, ...keycaps, ...mousepads];

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
          <button class="cart-remove-btn" onclick="Cart.removeItem(${index})" aria-label="Remove">&times;</button>
        </div>
      </li>
    `
      )
      .join("");

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
          <button class="cart-remove-btn" onclick="PreOrderList.removeItem(${index})" aria-label="Remove">&times;</button>
        </div>
      </li>
    `
      )
      .join("");

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

// Comparison System
const ComparisonSystem = {
  key: "keeb_comparison_v1",
  maxItems: 4,

  getItems: function () {
    const stored = localStorage.getItem(this.key);
    return stored ? JSON.parse(stored) : [];
  },

  addItem: function (product, option) {
    const items = this.getItems();

    // Check if product already in comparison
    if (items.some((item) => item.id === product.id)) {
      showToast(`❌ ${product.title} is already in comparison`);
      return false;
    }

    // Check if reached max limit
    if (items.length >= this.maxItems) {
      showToast(`❌ Maximum ${this.maxItems} products allowed in comparison`);
      return false;
    }

    // Check category - only compare within same category
    const productCategory = this.getProductCategory(product.id);
    if (items.length > 0) {
      const firstCategory = this.getProductCategory(items[0].id);
      if (firstCategory !== productCategory) {
        showToast(`❌ Can only compare products from the same category`);
        return false;
      }
    }

    const newItem = {
      id: product.id,
      title: product.title,
      price: option ? option.price || product.price : product.price,
      optionName: option ? option.name : null,
      image: option ? option.image : product.images[0] || "",
      category: productCategory,
      specs: product.specs || [],
      layout: product.layout || "",
      short: product.short || "",
      available: product.available || false,
      timestamp: Date.now(),
    };

    items.push(newItem);
    localStorage.setItem(this.key, JSON.stringify(items));
    this.updateUI();
    showToast(`✅ Added ${newItem.title} to comparison`);
    return true;
  },

  removeItem: function (productId) {
    const items = this.getItems();
    const index = items.findIndex((item) => item.id === productId);
    if (index !== -1) {
      items.splice(index, 1);
      localStorage.setItem(this.key, JSON.stringify(items));
      this.updateUI();
      showToast(`Removed from comparison`);
    }
  },

  clear: function () {
    localStorage.removeItem(this.key);
    this.updateUI();
  },

  updateUI: function () {
    const items = this.getItems();
    const badge = document.getElementById("compareBadge");

    // Update Badge
    if (badge) {
      badge.textContent = items.length;
      if (items.length > 0) {
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    }

    // Update comparison button states on product pages
    this.updateComparisonButtons();

    // Re-render comparison modal if open
    if (
      document.getElementById("compareModal")?.getAttribute("aria-hidden") ===
      "false"
    ) {
      renderComparisonTable();
    }
  },

  getProductCategory: function (productId) {
    if (keyboards.some((k) => k.id === productId)) return "keyboards";
    if (mice.some((m) => m.id === productId)) return "mice";
    if (keycaps.some((k) => k.id === productId)) return "keycaps";
    if (mousepads.some((m) => m.id === productId)) return "mousepads";
    return "other";
  },

  updateComparisonButtons: function () {
    const items = this.getItems();
    const compareButtons = document.querySelectorAll(".btn.compare");

    compareButtons.forEach((button) => {
      const productId = button.dataset.productId;
      if (!productId) return;

      // Check if product is in comparison
      const isInComparison = items.some((item) => item.id === productId);

      // Update button state
      if (isInComparison) {
        button.classList.add("added");
        button.innerHTML = "✓ In Comparison";
        button.style.background = "var(--accent)";
      } else {
        button.classList.remove("added");
        button.innerHTML = "🔄 Compare";
        button.style.background = "";
      }

      // Check if reached max limit
      if (items.length >= this.maxItems && !isInComparison) {
        button.classList.add("disabled");
        button.disabled = true;
      } else {
        button.classList.remove("disabled");
        button.disabled = false;
      }
    });
  },

  // New method to compare specific products
  compareProducts: function (products) {
    this.clear();
    products.forEach((product) => {
      const fullProduct = allProducts.find((p) => p.id === product.id);
      if (fullProduct) {
        this.addItem(fullProduct, product.option || null);
      }
    });
  },
};

// Function to render the selection modal
function renderCompareSelectionModal(currentProduct) {
  const modal = document.getElementById("compareSelectionModal");
  const grid = document.getElementById("compareSelectionGrid");
  const title = document.getElementById("currentProductName");
  const confirmBtn = document.getElementById("confirmCompareSelectionBtn");

  if (!modal || !grid) return;

  // Reset selection
  selectedProductsForComparison.clear();
  selectedProductsForComparison.add(currentProduct.id);
  updateSelectionUI();

  // Set current product name
   if (title) {
    title.textContent = currentProduct.title.length > 20 
      ? currentProduct.title.substring(0, 20) + "..." 
      : currentProduct.title;
  }

  // Filter out current product and show ALL products from same category
  const productCategory = ComparisonSystem.getProductCategory(currentProduct.id);
  const sameCategoryProducts = allProducts.filter(p => 
    p.id !== currentProduct.id && 
    ComparisonSystem.getProductCategory(p.id) === productCategory
  );
  
  // Group by category
  const productsByCategory = {
    all: sameCategoryProducts, // Show only same category products
    keyboards: sameCategoryProducts.filter(p => keyboards.some(k => k.id === p.id)),
    mice: sameCategoryProducts.filter(p => mice.some(m => m.id === p.id)),
    keycaps: sameCategoryProducts.filter(p => keycaps.some(k => k.id === p.id)),
    mousepads: sameCategoryProducts.filter(p => mousepads.some(m => m.id === p.id))
  };
  
  // If same category has no products, show all products as fallback
  if (sameCategoryProducts.length === 0) {
    productsByCategory.all = allProducts.filter(p => p.id !== currentProduct.id);
  }

  // Render products grid
  function renderGrid(category = "all") {
    grid.innerHTML = "";
    const products = productsByCategory[category] || [];

    if (products.length === 0) {
      grid.innerHTML = `
        <div class="no-products-message">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M9.172 18.828L12 16M12 16L14.828 18.828M12 16V21M12 3C7.029 3 3 7.029 3 12C3 16.971 7.029 21 12 21C16.971 21 21 16.971 21 12C21 7.029 16.971 3 12 3Z" stroke="var(--muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p>No other products found in this category</p>
        </div>
      `;
      return;
    }

    // Use CSS Grid with responsive columns
    grid.style.gridTemplateColumns = `repeat(auto-fill, minmax(150px, 1fr))`;

    products.forEach(product => {
      const productCard = document.createElement("div");
      productCard.className = "compare-selection-card";
      productCard.dataset.id = product.id;
      
      const isSelected = selectedProductsForComparison.has(product.id);
      const isCurrent = product.id === currentProduct.id;
      
      // Truncate title for mobile
      const displayTitle = product.title.length > 18 
        ? product.title.substring(0, 18) + "..." 
        : product.title;
      
      productCard.innerHTML = `
        <div class="selection-card-top">
          <div class="selection-card-image">
            <img src="${product.images[0] || ''}" alt="${product.title}" loading="lazy">
            ${isCurrent ? '<span class="current-product-badge">Current</span>' : ''}
            ${isSelected ? '<div class="selected-overlay"><span>✓</span></div>' : ''}
          </div>
          <div class="selection-card-checkbox">
            <input type="checkbox" id="select-${product.id}" 
                   ${isSelected ? 'checked' : ''} 
                   ${isCurrent ? 'disabled' : ''}>
          </div>
        </div>
        <div class="selection-card-info">
          <h4 class="selection-card-title" title="${product.title}">${displayTitle}</h4>
          <div class="selection-card-details">
            <span class="selection-card-price">$${product.price}</span>
            <span class="selection-card-status ${product.available ? 'available' : 'unavailable'}">
              ${product.available ? 'In Stock' : 'Pre-order'}
            </span>
          </div>
        </div>
      `;
      
      // Add click event
      if (!isCurrent) {
        productCard.addEventListener("click", (e) => {
          const checkbox = productCard.querySelector('input[type="checkbox"]');
          const newState = !checkbox.checked;
          
          if (newState && selectedProductsForComparison.size >= 4) {
            showToast("Maximum 4 products can be compared");
            return;
          }
          
          checkbox.checked = newState;
          handleProductSelection(product.id, newState);
          
          // Visual feedback
          if (newState) {
            productCard.classList.add('selected');
          } else {
            productCard.classList.remove('selected');
          }
        });
        
        const checkbox = productCard.querySelector('input[type="checkbox"]');
        checkbox.addEventListener("change", (e) => {
          handleProductSelection(product.id, e.target.checked);
        });
      } else {
        productCard.classList.add('current');
      }
      
      if (isSelected) {
        productCard.classList.add('selected');
      }
      
      grid.appendChild(productCard);
    });
  }

 // Handle product selection
  function handleProductSelection(productId, selected) {
    if (selected) {
      if (selectedProductsForComparison.size >= 4) {
        showToast("Maximum 4 products can be compared");
        return false;
      }
      selectedProductsForComparison.add(productId);
    } else {
      selectedProductsForComparison.delete(productId);
    }
    updateSelectionUI();
    return true;
  }
  
  // Update selection UI
  function updateSelectionUI() {
    const count = selectedProductsForComparison.size;
    const selectedCountEl = document.getElementById("selectedCount");
    const selectedProductsCountEl = document.getElementById("selectedProductsCount");
    const confirmBtn = document.getElementById("confirmCompareSelectionBtn");
    
    if (selectedCountEl) selectedCountEl.textContent = count;
    
    // Update confirm button
    if (confirmBtn) {
      confirmBtn.disabled = count < 2;
      confirmBtn.innerHTML = count < 2 
        ? '<span>Select More Products</span><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        : `<span>Compare ${count} Products</span><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    }
    
    // Update selected products count
    if (selectedProductsCountEl) {
      selectedProductsCountEl.textContent = `${count} product${count !== 1 ? 's' : ''}`;
    }
  }
  
  // Initialize with all products from same category
  renderGrid("all");
  
  // Add category tab events
  const tabs = document.querySelectorAll('.compare-category-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderGrid(tab.dataset.category);
    });
  });
  
  // Show modal with animation
  modal.setAttribute("aria-hidden", "false");
  setTimeout(() => {
    modal.classList.add('visible');
  }, 10);
}

// Function to render the comparison table
// Improved renderComparisonTable function
function renderComparisonTable() {
  const container = document.getElementById("compareTableContainer");
  const compareCount = document.getElementById("compareCount");
  const items = ComparisonSystem.getItems();
  
  if (!container) return;
  
  if (items.length < 2) {
    container.innerHTML = `
      <div class="compare-empty-state">
        <div class="empty-icon">🔍</div>
        <h3>Not Enough Products to Compare</h3>
        <p>Select at least 2 products to start comparing features</p>
        <button id="addMoreProductsBtn" class="btn primary small">Browse Products</button>
      </div>
    `;
    
    document.getElementById("addMoreProductsBtn")?.addEventListener("click", () => {
      const compareModal = document.getElementById("compareModal");
      const selectionModal = document.getElementById("compareSelectionModal");
      if (compareModal && selectionModal) {
        compareModal.setAttribute("aria-hidden", "true");
        compareModal.classList.remove('visible');
        
        // Show selection modal with first product
        if (items.length > 0) {
          const firstProduct = allProducts.find(p => p.id === items[0].id);
          if (firstProduct) {
            renderCompareSelectionModal(firstProduct);
          }
        }
      }
    });
    
    if (compareCount) compareCount.textContent = items.length;
    return;
  }
  
  if (compareCount) compareCount.textContent = items.length;
  
  // Determine category for attribute mapping
  const category = items[0].category;
  
  // Create minimalistic table structure
  let tableHTML = `
    <div class="compare-table-minimal">
      <div class="compare-products-row">
        <div class="compare-features-column">
          <div class="feature-header">Features</div>
  `;
  
  // Add common features
  const commonFeatures = [
    { key: 'price', label: 'Price' },
    { key: 'status', label: 'Availability' },
    { key: 'layout', label: 'Layout/Type' },
    { key: 'description', label: 'Description' }
  ];
  
  // Add product columns
  items.forEach((item, index) => {
    tableHTML += `
      <div class="compare-product-column" data-product-id="${item.id}">
        <div class="product-card-minimal">
          <button class="remove-product-btn" data-id="${item.id}" aria-label="Remove from comparison">
            ×
          </button>
          <div class="product-image-minimal">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
          </div>
          <h4 class="product-title-minimal" title="${item.title}">
            ${item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title}
          </h4>
          ${item.optionName ? `<div class="product-option-minimal">${item.optionName}</div>` : ''}
        </div>
      </div>
    `;
  });
  
  tableHTML += `</div>`; // Close compare-products-row
  
  // Add features rows
  commonFeatures.forEach(feature => {
    tableHTML += `
      <div class="compare-feature-row">
        <div class="feature-name">${feature.label}</div>
    `;
    
    items.forEach(item => {
      let value = '';
      switch(feature.key) {
        case 'price':
          value = `<span class="feature-value price">$${item.price}</span>`;
          break;
        case 'status':
          value = `<span class="feature-value status ${item.available ? 'available' : 'unavailable'}">
            ${item.available ? 'In Stock' : 'Pre-order'}
          </span>`;
          break;
        case 'layout':
          value = `<span class="feature-value">${item.layout || '—'}</span>`;
          break;
        case 'description':
          value = `<span class="feature-value description">${item.short || '—'}</span>`;
          break;
        default:
          value = `<span class="feature-value">—</span>`;
      }
      tableHTML += `<div class="feature-value-cell">${value}</div>`;
    });
    
    tableHTML += `</div>`;
  });
  
  // Add specs rows
  const maxSpecs = Math.max(...items.map(item => item.specs?.length || 0));
  for (let i = 0; i < Math.min(maxSpecs, 3); i++) { // Limit to 3 specs rows
    tableHTML += `
      <div class="compare-feature-row">
        <div class="feature-name">Spec ${i + 1}</div>
    `;
    
    items.forEach(item => {
      const spec = item.specs?.[i] || '';
      tableHTML += `
        <div class="feature-value-cell">
          <span class="feature-value">${spec || '—'}</span>
        </div>
      `;
    });
    
    tableHTML += `</div>`;
  }
  
  tableHTML += `</div>`; // Close compare-table-minimal
  
  container.innerHTML = tableHTML;
  
  // Add remove button events
  container.querySelectorAll('.remove-product-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = btn.dataset.id;
      ComparisonSystem.removeItem(productId);
    });
  });
  
  // Add horizontal scroll hint
  if (items.length > 2) {
    container.insertAdjacentHTML('beforeend', 
      '<div class="scroll-hint-mobile">← Scroll to see more →</div>'
    );
  }
}

// Helper functions for comparison
function getComparisonAttributes(category) {
  const baseAttributes = [
    { key: "category", label: "Category", type: "text" },
    { key: "layout", label: "Layout/Type", type: "text" },
    { key: "short", label: "Description", type: "text" },
  ];

  return baseAttributes;
}

function getComparisonValue(item, key) {
  if (key === "category") {
    return item.category.charAt(0).toUpperCase() + item.category.slice(1);
  }
  return item[key] || "N/A";
}

function formatComparisonValue(value, type) {
  if (!value || value === "N/A") return '<span class="na">—</span>';
  return value;
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

  const compareSelectionModal = document.getElementById(
    "compareSelectionModal"
  );
  const closeCompareSelectionBtn = document.getElementById(
    "closeCompareSelectionBtn"
  );
  const cancelCompareSelectionBtn = document.getElementById(
    "cancelCompareSelectionBtn"
  );
  const confirmCompareSelectionBtn = document.getElementById(
    "confirmCompareSelectionBtn"
  );

  const compareModal = document.getElementById("compareModal");
  const closeCompareBtn = document.getElementById("closeCompareBtn");
  const clearAllCompareBtn = document.getElementById("clearAllCompareBtn");
  const printCompareBtn = document.getElementById("printCompareBtn");
  const addMoreCompareBtn = document.getElementById("addMoreCompareBtn");

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

  // Close modals with animation
  const closeModalWithAnimation = (modal) => {
    modal.classList.remove('visible');
    setTimeout(() => {
      modal.setAttribute("aria-hidden", "true");
    }, 300);
  };

  // Comparison Selection Modal logic
  if (compareSelectionModal) {
    const closeSelectionModal = () => {
      closeModalWithAnimation(compareSelectionModal);
      selectedProductsForComparison.clear();
    };

    if (closeCompareSelectionBtn) {
      closeCompareSelectionBtn.addEventListener("click", closeSelectionModal);
    }

    if (cancelCompareSelectionBtn) {
      cancelCompareSelectionBtn.addEventListener("click", closeSelectionModal);
    }

    // Update the confirmCompareSelectionBtn event listener in DOMContentLoaded section:
if (confirmCompareSelectionBtn) {
  confirmCompareSelectionBtn.addEventListener("click", () => {
    // Get selected products
    const selectedProducts = Array.from(selectedProductsForComparison)
      .map(id => {
        const product = allProducts.find(p => p.id === id);
        return product ? {
          id: product.id,
          title: product.title,
          option: null
        } : null;
      })
      .filter(Boolean);
    
    if (selectedProducts.length >= 2) {
      // Clear current comparison and add selected products
      ComparisonSystem.clear();
      selectedProducts.forEach(productData => {
        const product = allProducts.find(p => p.id === productData.id);
        if (product) {
          ComparisonSystem.addItem(product, productData.option);
        }
      });
      
      // Close selection modal
      if (compareSelectionModal) {
        compareSelectionModal.classList.remove('visible');
        setTimeout(() => {
          compareSelectionModal.setAttribute("aria-hidden", "true");
        }, 300);
      }
      
      // Show comparison modal
      if (compareModal) {
        renderComparisonTable();
        compareModal.setAttribute("aria-hidden", "false");
        // Use setTimeout to ensure DOM is updated before showing
        setTimeout(() => {
          compareModal.classList.add('visible');
        }, 50);
      }
    } else {
      showToast("Please select at least 2 products to compare");
    }
  });
}

    compareSelectionModal.addEventListener("click", (e) => {
      if (e.target === compareSelectionModal) {
        closeSelectionModal();
      }
    });
  }

  // Comparison Modal logic
  if (compareModal) {
    const closeComparisonModal = () => {
      compareModal.setAttribute("aria-hidden", "true");
    };

    if (closeCompareBtn) {
      closeCompareBtn.addEventListener("click", closeComparisonModal);
    }

    if (clearAllCompareBtn) {
      clearAllCompareBtn.addEventListener("click", () => {
        if (confirm("Clear all products from comparison?")) {
          ComparisonSystem.clear();
        }
      });
    }

    if (printCompareBtn) {
      printCompareBtn.addEventListener("click", () => {
        window.print();
      });
    }

    if (addMoreCompareBtn) {
      addMoreCompareBtn.addEventListener("click", () => {
        closeComparisonModal();
        // Show selection modal with current comparison items
        const currentItems = ComparisonSystem.getItems();
        if (currentItems.length > 0) {
          const firstProduct = allProducts.find(
            (p) => p.id === currentItems[0].id
          );
          if (firstProduct) {
            renderCompareSelectionModal(firstProduct);
          }
        }
      });
    }

    compareModal.addEventListener("click", (e) => {
      if (e.target === compareModal) {
        closeComparisonModal();
      }
    });
  }

  // Initialize comparison system
  ComparisonSystem.updateUI();
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
  let no_info = `<div class="specs-inline muted">${p.layout} • ${
    p.specs[0] || ""
  }</div>`;
  if (p.no_info !== undefined && p.no_info === true) {
    no_info = `<div class="specs-inline muted">${p.layout}</div>`;
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
      <p class="muted card-desc">${p.short}</p>
      <div class="card-footer">
        ${no_info}
        <div class="availability-wrap">
          <span class="${availClass}">${availText}</span>
        </div>
      </div>
    </div>
  `;
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
    optionElement.addEventListener("click", (e) => e.preventDefault());
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
  const grid = document.getElementById("similarProductsGrid");
  if (!grid) return;

  const cardWidth = grid.querySelector(".card")?.offsetWidth + 20; // Card width + gap
  const scrollAmount = cardWidth * (direction === "next" ? 1 : -1);

  // Smooth scroll behavior
  grid.scrollBy({ left: scrollAmount, behavior: "smooth" });
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

    const compareBtn = container.querySelector("#compareBtn");
    if (compareBtn) {
      compareBtn.addEventListener("click", (e) => {
        e.preventDefault();
        currentProductForComparison = product;
        renderCompareSelectionModal(product);
      });
    }

    // Update comparison button state
    ComparisonSystem.updateComparisonButtons();

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

  // In the renderProductDetail function, update the action button section:
  let actionButtonHTML = "";
  if (product.available) {
    actionButtonHTML = `
    <div class="product-actions-group">
      <button class="btn primary add-to-cart" id="addToCartBtn">Add to Cart</button>
      <button class="btn compact compare" id="compareBtn" data-product-id="${product.id}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-right: 4px;">
          <path d="M8 1V15M1 8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Compare
      </button>
    </div>
  `;
  } else {
    actionButtonHTML = `
    <div class="product-actions-group">
      <button class="btn primary pre-order" id="preOrderBtn">Pre-order</button>
      <button class="btn compact compare" id="compareBtn" data-product-id="${product.id}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-right: 4px;">
          <path d="M8 1V15M1 8H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Compare
      </button>
    </div>
  `;
  }

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

  container.innerHTML = `
        <div class="product-image"></div>
        <div class="product-info">
            <h1 id="productTitle">${product.title}</h1>
            <p class="muted">${product.short}</p>
            <div id="productPrice" style="margin-top:12px;font-weight:700;color:var(--accent);font-size:1.5rem">
                $${product.price}
            </div>
            <ul class="specs">${product.specs
              .map((s) => `<li>• ${s}</li>`)
              .join("")}</ul>
            <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
                ${actionButtonHTML}
            </div>
            <p style="margin-top:12px;color:var(--muted)">Delivery is available in: <strong>Cambodia</strong>.</p>
        </div>
        ${optionsPlaceholderHTML} `;

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
