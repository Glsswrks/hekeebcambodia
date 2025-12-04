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
    specs: [
      "60% (61 keys)", "Full Aluminum CNC case", "PBT dye-sublimation keycaps",
      "Hot-swap / magnetic switches", "8K Hz Polling rate", "0.08ms Ultra Low Latency",
      "256k scanning-rate", "Precision 0.001mm", "Super stable RT", "32K N-Key Scanning-rate",
      "Functions SOCD / DKS / RT / MT / TGL / Key remapping",
      "Champion Preset", "Cherry Profile Keycaps"
    ]
  },
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
    specs: [
      "60% (61 keys)", "Full Aluminum CNC case", "PBT dye-sublimation keycaps",
      "Hot-swap / magnetic switches", "8K Hz Polling rate", "0.08ms Ultra Low Latency",
      "256k scanning-rate", "Precision 0.001mm", "Super stable RT", "32K N-Key Scanning-rate",
      "Functions SOCD / DKS / RT / MT / TGL / Key remapping",
      "Champion Preset", "Cherry Profile Keycaps"
    ]
  },
  
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
    specs: [
      "60% (61 keys)", "Full Aluminum CNC case", "PBT dye-sublimation keycaps",
      "Hot-swap / magnetic switches", "8K Hz Polling rate", "0.08ms Ultra Low Latency",
      "256k scanning-rate", "Precision 0.001mm", "Super stable RT", "32K N-Key Scanning-rate",
      "Functions SOCD / DKS / RT / MT / TGL / Key remapping",
      "Champion Preset", "Cherry Profile Keycaps"
    ]
  }
];

/* ---------- Contact Modal ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const contactLink = document.getElementById('contactLink');
  const modal = document.getElementById('contactModal');
  const closeBtn = modal?.querySelector('.modal-close');

  if (contactLink && modal) {
    contactLink.addEventListener('click', e => {
      e.preventDefault();
      modal.setAttribute('aria-hidden', 'false');
    });

    closeBtn?.addEventListener('click', () => {
      modal.setAttribute('aria-hidden', 'true');
    });

    modal.addEventListener('click', e => {
      if (e.target === modal) modal.setAttribute('aria-hidden', 'true');
    });
  }
});

/* ---------- Helpers ---------- */
function whatsappLink(product) {
  const base = `https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(/\D/g, '')}`;
  const text = encodeURIComponent(`Hi, I'm interested in ${product.title}. Is it available?`);
  return `${base}?text=${text}`;
}
function telegramLink() { return `https://t.me/${TELEGRAM_HANDLE}`; }
function getQueryParam(name) { return new URLSearchParams(window.location.search).get(name); }

function productLink(id) {
  const { origin, pathname } = window.location;
  const baseDir = pathname.replace(/index\.html$/, '').replace(/\/$/, '');
  return `${origin}${baseDir}/products.html?id=${encodeURIComponent(id)}`;
}

/* ---------- INDEX PAGE: render product cards ---------- */
function renderIndexCards(list) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  grid.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';

    const availClass = p.available ? 'availability available' : 'availability unavailable';
    const availText = p.available ? 'Available' : 'Unavailable';
    const href = productLink(p.id);
    const cover = (Array.isArray(p.images) && p.images.length) ? p.images[0] : '';

    card.innerHTML = `
      <div class="card-image">
        <a class="card-link" href="${href}">
          <img src="${cover}" alt="${p.title}">
        </a>
        <span class="price-badge">$${p.price}</span>
      </div>

      <div class="card-body">
        <h4 class="card-title"><a class="card-title-link" href="${href}">${p.title}</a></h4>
        <p class="muted card-desc">${p.short}</p>

        <div class="card-footer">
          <div class="specs-inline muted">${p.layout} • ${p.specs[0] || ''}</div>
          <span class="${availClass}">${availText}</span>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* ---------- HORIZONTAL DRAG SCROLL (for grid) ---------- */
function enableDragScroll(container) {
  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener("mousedown", e => {
  isDown = true;
  container.classList.add("dragging");
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
  e.preventDefault();
});

container.addEventListener("mouseup", () => {
  isDown = false;
  container.classList.remove("dragging");
});

container.addEventListener("mouseleave", () => {
  isDown = false;
  container.classList.remove("dragging");
});

  container.addEventListener("mouseup", () => (isDown = false));
  container.addEventListener("mouseleave", () => (isDown = false));

  container.addEventListener("mousemove", e => {
    if (!isDown) return;
    const x = e.pageX - container.offsetLeft;
    container.scrollLeft = scrollLeft - (x - startX) * 1.2;
  });

  // Touch
  container.addEventListener("touchstart", e => {
  container.classList.add("dragging");
  startX = e.touches[0].pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
}, { passive: true });

container.addEventListener("touchend", () => {
  container.classList.remove("dragging");
});

  container.addEventListener("touchmove", e => {
    const x = e.touches[0].pageX - container.offsetLeft;
    container.scrollLeft = scrollLeft - (x - startX) * 1.2;
  }, { passive: true });
}

/* ---------- LEFT/RIGHT ARROW CONTROL ---------- */
function setupScrollArrows(grid) {
  const leftBtn = document.querySelector(".scroll-btn.left");
  const rightBtn = document.querySelector(".scroll-btn.right");

  if (!leftBtn || !rightBtn) return;

  leftBtn.addEventListener("click", () => {
    grid.scrollBy({ left: -320, behavior: "smooth" });
  });

  rightBtn.addEventListener("click", () => {
    grid.scrollBy({ left: 320, behavior: "smooth" });
  });
}

/* ---------- PRODUCT PAGE ---------- */
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
    img.alt = `Product image ${i + 1}`;
    img.loading = 'lazy';
    slide.appendChild(img);
    track.appendChild(slide);
  });

  const btnLeft = document.createElement('button');
  btnLeft.className = 'carousel-btn left';
  btnLeft.innerHTML = '&#9664;';
  const btnRight = document.createElement('button');
  btnRight.className = 'carousel-btn right';
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

  function update() {
    const width = wrapper.clientWidth;
    track.style.transform = `translateX(${-index * width}px)`;
    dots.querySelectorAll('.carousel-dot').forEach((dot, i) =>
      dot.classList.toggle('active', i === index)
    );
  }

  btnLeft.addEventListener('click', () => (index = Math.max(0, index - 1), update()));
  btnRight.addEventListener('click', () => (index = Math.min(images.length - 1, index + 1), update()));

  update();
  return wrapper;
}

function renderProductDetail(product) {
  const container = document.getElementById('productContainer');
  if (!container) return;

  if (!product) {
    container.innerHTML = '<div style="color:var(--muted)">Product not found.</div>';
    return;
  }

  container.innerHTML = `
    <div class="product-image"></div>
    <div class="product-info">
      <h1>${product.title}</h1>
      <p class="muted">${product.short}</p>
      <div style="margin-top:12px;font-weight:700;color:var(--accent);font-size:1.25rem">$${product.price}</div>
      <ul class="specs">${product.specs.map(s => `<li>• ${s}</li>`).join('')}</ul>
      <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
        <a class="btn primary" id="whatsappBtn" target="_blank">Inquire on WhatsApp</a>
        <a class="btn" id="telegramBtn" target="_blank">Inquire on Telegram</a>
        <div style="align-self:center;color:var(--muted)">Discord: <strong>${DISCORD_HANDLE}</strong></div>
      </div>
    </div>
  `;

  const imageContainer = container.querySelector('.product-image');
  imageContainer.appendChild(createCarousel(product.images));

  document.getElementById('whatsappBtn').href = whatsappLink(product);
  document.getElementById('telegramBtn').href = telegramLink();
}

/* ---------- INIT ---------- */
(function init() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const grid = document.getElementById('productGrid');
  const container = document.getElementById('productContainer');

  if (grid) {
    renderIndexCards(products);
    enableDragScroll(grid);
    setupScrollArrows(grid);   // << ADD THIS
  }

  if (container) {
    const id = getQueryParam('id');
    const product = products.find(p => p.id === id);
    renderProductDetail(product);
  }
})();
