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
      short:
        "ATK EDGE 60HE ULTIMATE Esports Magnetic Keyboard - LEVIATAN Collaboration",
      price: 229,
      layout: "60",
      available: true,
      isNew: false,
      lowStock: false,
      images: [
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/2_27ffe2b5-f717-4c2f-940c-959572442aa1.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/1_f9f267de-73a2-46f0-b918-9d35850c4593.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/ATK_EDGE_60_HE_Keyboard.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/edge60-translucent-keycap-closeup.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/edge60-with-partial-transparent-keycaps.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/edge60-with-transparent-keycaps.jpg",
      ],
      specs: [
        "60% (61 keys)",
        "Full Aluminum CNC case",
        "PBT dye‑sublimation keycaps",
        "Hot‑swap / magnetic switches",
        "8K Hz Polling rate",
        "0.08ms Ultra Low Latency",
        "256k scanning-rate",
        "Precision 0.001mm",
        "Super stable RT",
        "32K N-Key Scanning-rate",
        "2 Profile RT Button",
        "Functions SOCD / DKS / RT / MT / TGL / Key remapping",
        "Champion Preset",
        "Cherry Profile Keycaps",
      ],
      options: [
        {
          name: "LEVIANTAN Edition",
          available: true,
          image:
            "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/leviatan.jpg",
        },
        {
          name: "WOLVES Edition",
          available: false,
          image:
            "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/edge60/wolves.jpg",
        },
      ],
    },
    {
      id: "titan68",
      title: "TITAN68 HE (TITAN NATION)",
      short:
        "TITAN68 HE Peak Performance Esports Magnetic Keyboard - TRUE 8000Hz Polling Rate",
      price: 90,
      layout: "65",
      available: true,
      isNew: false,
      lowStock: false,
      images: [
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/titan68/1.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/titan68/2.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/titan68/3.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/titan68/4.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/titan68/5.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/titan68/6.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/titan68/7.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/titan68/8.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/titan68/9.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/titan68/10.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/titan68/11.jpg",
      ],
      specs: [
        "65% (68 keys)",
        "High-End CNC Aluminum Craftsmanship",
        "Switches: Gateron Magnetic Jade",
        "8K Hz Polling rate",
        "0.125ms Ultra Low Latency",
        "32K Full keys scan-rate",
        "RT Range 0.001 ~ 3.4mm",
        "Multifunction Physical Button (Short press to switch RGB Light, Long press for 3 seconds to switch to RT mode)",
        "Adjustable Rapid-Trigeer Stablizer Algorithm",
        "Functions: SOCD / DKS / RT / MT / TGL / Key remapping / Physical Button (Customizable) / Music Rythm / Emergency Stop",
        "PCB Nano Waterproof Technology",
        "Aluminum Alloy Position Plate",
        "Standard PBT Keycaps (TITAN68HE Standard Version), Five-sided Dye-Sub (Side-Lit) For TITAN68HE PRO Version"
      ],
      options: [
        {
          name: "TITAN68HE PURPLE THEME",
          available: true,
          price: 90,
          image:
            "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/titan68/purple.png",
        },
        {
          name: "TITAN68HE RED THEME",
          available: true,
          price: 110,
          image:
            "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/titan68/red.png",
        },
      ],
    },
    {
      id: "atkrs7",
      title: "ATK RS-7",
      short:
        "ATK RS7 eSports Hall Effect Keyboard, Premium looking 75% keyboard with CNC Top-Case and Aluminum Position Plate",
      price: 70,
      layout: "75",
      available: false,
      isNew: false,
      lowStock: false,
      images: [
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7v1/thumbnail.png",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7v1/1.png",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7v1/2.png",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7v1/3.png",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7v1/4.png",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7v1/5.png",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7v1/6.png",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7v1/7.png",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7v1/8.png",
      ],
      specs: [
        "75% (81 keys)",
        "CNC Top Case",
        "5 Sided Dye-Sub Keycaps",
        "8K Hz Polling rate",
        "0.3ms Ultra Low Latency",
        "Precision 0.05mm-0.02mm (None-Backlit eSport Edition",
        "RT Range 0.1~3.4mm",
        "Resilent GAS Structure",
        "4 Padding Layers",
        "ATK V1 Stabilizer",
        "Functions SOCD / DKS / RT / MT / TGL / Key Remapping",
        "Mahjong-inspired HIFI Sound",
      ],
      options: [
        {
          name: "Rainbow IP, No-Backlit",
          available: true,
          image:
            "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7v1/no_rgb.png",
        },
        {
          name: "Rainbow IP (RGB)",
          available: false,
          image:
            "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/atkrs7v1/rgb.png",
        },
      ],
    },
    {
      id: "made68pro",
      title: "MEELGEEK MADE68 PRO",
      short:
        "The MADE68 Pro goes beyond a simple keyboard. It's a truly modular experience, engineered with wireless freedom and MelGeek HIVE",
      price: 140,
      layout: "68",
      available: false,
      isNew: false,
      lowStock: false,
      images: [
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/made68pro/MelGeek_MADE68_Pro_12.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/made68pro/MelGeek_MADE68_Pro_1.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/made68pro/MelGeek_MADE68_Pro_10.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/made68pro/MelGeek_MADE68_Pro_11.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/made68pro/MelGeek_MADE68_Pro_9.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/made68pro/MelGeek_MADE68_Pro_14.jpg",
      ],
      specs: [
        "68% (68 keys)",
        "ABS + PC with Aluminum Alloy",
        "ABS Double-Shot Keycaps",
        "Hot‑swap / magnetic switches",
        "8K Hz Polling rate",
        "0.125ms Low Latency",
        "256k scanning-rate",
        "Zero Dead-Zone",
        "Electric Light-Box",
        "Precision 0.01mm",
        "Functions SOCD / DKS / RT / MT / TGL / Key remapping",
        "Wired Connection",
        "Proprietary MCR original height profile",
      ],
      options: null,
    },
    {
      id: "storm68",
      title: "NZO STORM68 HE",
      short:
        "NZO STORM68 HE Full Aluminum CNC Shell Hall Effect Keyboard with precision 0.005mm + 256K Scanning Rate",
      price: 75,
      layout: "68",
      available: true,
      isNew: false,
      lowStock: false,
      images: [
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/1.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/22.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/33.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/44.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/55.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/66.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/2.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/3.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/4.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/6.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/7.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/8.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/9.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/11.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/specs.jpg",
      ],
      specs: [
        "68% (68 keys)",
        "Full Aluminum CNC Shell",
        "8k Hz Polling rate",
        "256k single key scan-rate",
        "32k Full key scan-rate",
        "Precision 0.005mm",
        "0.08ms Ultra Low Latency",
        "RT Range 0.005 ~ 3.3mm",
        "Global Travel 0.005mm",
        "16.7 million color ARGB lighting, eSports Grade 500Hz Refresh Rate",
        "Carbon Fiber Position Plate (Cyber-Yellow & Ethernal Blue), Aluminum Alloy (Sharp Silver)",
        "PBT Double Keycaps (Sharp Silver), PC Cyberpunk Theme Keycaps (Cyber-Yellow), Side-Printed Backlit heat (Ethernal Blue)",
        "Functions SOCD / DKS / RT / MT / Key remapping",
        "Web-Driver Supported (NZO GEAR HUB)",
      ],
      options: [
        {
          name: "Cyber-Yellow",
          available: true,
          price: 75,
          image:
            "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/cyberpunk.png",
        },
         {
          name: "Ethernal Blue",
          available: true,
          price: 65,
          image:
            "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/blue.png",
        },
         {
          name: "Sharp Silver",
          available: false,
          image:
            "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/black.png",
        },
      ]
    },
    {
      id: "ace68turbo",
      title: "MCHOSE ACE68 TURBO",
      short:
        "MCHOSE Ace 68 Turbo – World's First 16K Polling Rate HE Aluminum Keyboard",
      price: 140,
      layout: "68",
      available: false,
      isNew: false,
      lowStock: false,
      images: [
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68turbo/Dynamic_RGB_Lightbox_with_Music_Sync_on_Ace_68_Turbo.png",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68turbo/Multi-Function_Control_Knob_and_RT_Button_on_Ace_68_Turbo.png",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68turbo/31.png",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68turbo/22.png",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68turbo/Ace_68_Turbo_65_Hot-Swappable_Rapid_Trigger_Keyboard_1.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/ace68turbo/Ace_68_Turbo_Keyboard_Structure_Layers_Aluminum_Plate_Foam_PCB2.png",
      ],
      specs: [
        "65% (68 keys)",
        "Full Aluminum CNC",
        "Hot‑swap / magnetic switches",
        "16K/8K Hz Polling rate",
        "0.06ms/0.125ms Ultra Low Latency",
        "256k scanning-rate",
        "Zero Dead-Zone",
        "2/4 PCB Layers",
        "Adaptive Dynamic Calibration 2.0",
        "Electric Light-Box",
        "Precision 0.01mm",
        "3 Rapid-Trigger profile support",
        "RT Button profile switch",
        "Multi-Function Knob",
        "Dual Drivers Support",
        "16M ARGB, Music Rhythm 2.0, Aura Sync Lightning",
        "Functions SOCD / DKS / RT / MT / TGL / Key remapping",
        "Wired Connection",
        "Proprietary MCR original height profile",
      ],
      options: null,
    },
  ],
  mice: [
    {
      id: "scyroxv8",
      title: "Scyrox V8",
      short:
        "36-Gram Ultra-Lightweight Wireless Gaming Mouse with 8K Polling Rate",
      price: 60,
      layout: "36g",
      available: false,
      isNew: false,
      lowStock: false,
      images: [
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/scyroxv8/10.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/scyroxv8/20.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/scyroxv8/30.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/scyroxv8/40.jpg",
      ],
      specs: [
        "Paw3950 Sensor",
        "36Gram Weight",
        "8K Hz Polling-Rate",
        "MCU Nordic-52840",
        "Track Speed 750IPS",
        "30k DPI",
        "Acceleration 50g",
        "Omron Optical Switches",
        "Wireless / Wired",
        "Web-Based Driver",
        "Yellow Color Available",
      ],
      options: null,
    },
    {
      id: "atkf1pro",
      title: "ATK Blazing Sky F1 Pro",
      short:
        "45-Gram Wireless Gaming Mouse with 8K Polling Rate, PAW3950 Sensor",
      price: 80,
      layout: "45g",
      available: false,
      isNew: false,
      lowStock: false,
      images: [
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/blazingF1pro/2.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/blazingF1pro/1.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/blazingF1pro/3.jpg",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/blazingF1pro/4.png",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/blazingF1pro/5.png",
        "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/blazingF1pro/6.png",
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
        "ATK HUB/Web Driver Supported",
      ],
      options: null,
    },
    {
      id: "vxer1se",
      title: "VXE R1 SE (Dragonfly R1 SE)",
      short: "51-Gram Lightweight Tri-Mode Wireless Gaming Mouse",
      price: 35,
      layout: "51g",
      available: true,
      isNew: true,
      lowStock: false,
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
        "Web-Driver Customization",
      ],
      options: null,
    },
    {
      id: "lamzumayax",
      title: "Lamzu Maya X 8K Wireless",
      short: "47-Gram Symmetrical Gaming Mouse with 8K Polling Rate",
      price: 120, // Approximate price
      layout: "47g",
      available: true,
      isNew: false,
      lowStock: true,
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
        "Web-Based Aurora Driver",
      ],
      options: [
        {
          name: "Purple Shadow",
          available: true,
          image:
            "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/purple.jpg",
        },
        {
          name: "Light Pink",
          available: true,
          image:
            "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/pink.jpg",
        },
        {
          name: "Charcoal Black",
          available: false,
          image:
            "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/black.jpg",
        },
        {
          name: "White",
          available: false,
          image:
            "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/white.jpg",
        },
        {
          name: "Cloud Gray",
          available: false,
          image:
            "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/cloud.jpg",
        },
      ],
    },
  ],
};
const allProducts = [...productData.keyboards, ...productData.mice];

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("theme") || "dark";
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

  const contactLink = document.getElementById("contactLink");
  const modal = document.getElementById("contactModal");
  const closeBtn = modal.querySelector(".modal-close");

  if (contactLink && modal) {
    contactLink.addEventListener("click", (e) => {
      e.preventDefault();
      modal.setAttribute("aria-hidden", "false");
    });
    closeBtn.addEventListener("click", () => {
      modal.setAttribute("aria-hidden", "true");
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.setAttribute("aria-hidden", "true");
    });
  }
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
    else if (p.lowStock) badgeHTML = `<span class="badge badge-low">Limited Stock</span>`;
  }
  const availClass = p.available ? "availability available" : "availability unavailable";
  const availText = p.available ? "Available" : "Unavailable";
  const href = productLink(p.id);
  const cover = Array.isArray(p.images) && p.images.length ? p.images[0] : "";
  const priceBadgeClass = p.available ? "price-badge in-stock" : "price-badge";

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
        <div class="specs-inline muted">${p.layout} • ${p.specs[0] || ""}</div>
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
  if (!product.available) product.options.forEach((opt) => { opt.available = false; });
  const optionElement = document.createElement(
    product.available ? (option.available ? "button" : "div") : "div"
  );
  optionElement.className = "product-option" + (product.available ? (option.available ? "" : " locked") : " locked");
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

  const priceHTML = (option.price !== undefined) ? `<span class="option-price">$${option.price}</span>` : "";
  optionElement.innerHTML = `
    <div class="option-image-wrap">
      <img src="${option.image}" alt="${option.name}" loading="lazy">
      ${option.available ? "" : '<span class="option-stock-label">OUT OF STOCK</span>'}
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
  let prefix = categoryName;
  if (categoryName === "keyboards") prefix = "keyboard";
  if (categoryName === "mice") prefix = "mouse";

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

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initProductSection("keyboards");
      initProductSection("mice");
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

  const capitalizedName =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

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

// REMOVED scrollProductOptions function

function renderSimilarProductsSection(currentProductId) {
  const similarSection = document.getElementById("similarProductsSection");
  const otherProducts = allProducts.filter((p) => p.id !== currentProductId);
  const backLinkHTML =
    '<div style="margin-top:28px;"><a class="back-link" href="index.html">← Back to shop</a></div>';

  if (!similarSection || otherProducts.length === 0) {
    document
      .querySelector(".product-page")
      .insertAdjacentHTML("beforeend", backLinkHTML);
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

  const grid = document.getElementById("similarProductsGrid");
  otherProducts.forEach((p) => {
    grid.appendChild(createProductCard(p));
  });
  similarSection
    .querySelector(".scroll-nav-btn.left")
    .addEventListener("click", () => scrollSimilarProducts("prev"));
  similarSection
    .querySelector(".scroll-nav-btn.right")
    .addEventListener("click", () => scrollSimilarProducts("next"));
  similarSection.insertAdjacentHTML("afterend", backLinkHTML);
}

// MODIFIED: Product Detail Rendering Logic (Removed option scroll button elements/listeners)
/* ---------- Modified renderProductDetail to fix dynamic pricing ---------- */
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

  // FIXED: This function now handles updating the price in the UI
  function updateProductDisplay(option) {
    selectedOption = option;

    const titleEl = container.querySelector("#productTitle");
    const priceEl = container.querySelector("#productPrice"); // Target price element
    const purchaseBtn = container.querySelector("#purchaseBtn");
    const imagesContainer = container.querySelector(".product-image");

    // 1. Update Title and Option Name
    if (titleEl) {
      if (selectedOption) {
        titleEl.innerHTML = `${product.title} <span class="option-name-display">(${selectedOption.name})</span>`;
      } else {
        titleEl.innerHTML = product.title;
      }
    }

    // 2. FIXED: Update Price based on selected option
    if (priceEl) {
      const currentPrice = (selectedOption && selectedOption.price !== undefined) 
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

    // 4. Update Purchase Link
    if (purchaseBtn) {
      const isPurchasable = product.available && (!selectedOption || selectedOption.available);
      if (isPurchasable) {
        const optionNameForLink = selectedOption ? selectedOption.name : null;
        purchaseBtn.href = purchaseTelegramLink(product, optionNameForLink);
        purchaseBtn.classList.remove("locked");
        purchaseBtn.disabled = false;
        purchaseBtn.textContent = `Purchase via Telegram`;
      } else {
        purchaseBtn.classList.add("locked");
        purchaseBtn.disabled = true;
        purchaseBtn.textContent = `Unavailable`;
      }
    }

    // 5. Update active class on option cards
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
  const actionButtonHTML = product.available 
    ? `<a class="btn primary" id="purchaseBtn" href="#" target="_blank" rel="noopener">Purchase via Telegram</a>`
    : `<span class="stock-label out-of-stock">Unavailable</span>`;

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
            <ul class="specs">${product.specs.map((s) => `<li>• ${s}</li>`).join("")}</ul>
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

    const initialOption = product.options.find((o) => o.available) || product.options[0];
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

  // Force update when image set changes, ensuring the carousel starts at index 0
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
