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
        "Standard PBT Keycaps (TITAN68HE Standard Version), Five-sided Dye-Sub (Side-Lit) For TITAN68HE PRO Version",
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
          price: 70,
          image:
            "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/cyberpunk.png",
        },
        {
          name: "Ethernal Blue",
          available: true,
          price: 75,
          image:
            "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/blue.png",
        },
        {
          name: "Sharp Silver",
          available: false,
          image:
            "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/storm68/black.png",
        },
      ],
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
    {
      id: "iqunix-ez63",
      title: "IQUNIX EZ63 8K Magnetic HE",
      short: "IQUNIX EZ63 8KHz Polling Rate Magnetic Switch Gaming Keyboard",
      price: 150,
      layout: "60",
      available: false,
      isNew: false,
      lowStock: false,
      images: [
        "https://cdn.shopify.com/s/files/1/0676/7853/5986/files/ml001.de632f1c_4207f70c-d610-4e2e-b699-1d100cc38f3e.jpg?v=1718718976",
        "https://cdn.shopify.com/s/files/1/0676/7853/5986/files/l004.a6559626_1cbfda67-2cb8-4eea-9c44-21b2c20fbc77.jpg?v=1718718976",
        "https://m.media-amazon.com/images/I/71oXr1eldGL.jpg",
        "https://iqunix.com/cdn/shop/articles/0347.jpg?v=1724826927",
        "https://m.media-amazon.com/images/I/61KjyMs2WxL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71ttPO02TfL._AC_SL1500_.jpg",
      ],
      specs: [
        "60% (64 keys)",
        "8000Hz Polling Rate (0.125ms latency)",
        "Single Key Scan Rate: 16,000Hz",
        "Full Key Scan Rate: 2,000Hz - 4,000Hz (Dynamic)",
        "RT Sensitivity: 0.05mm (Industry-leading precision)",
        "Adjustable Actuation: 0.1mm - 4.0mm (0.05mm steps)",
        "Gateron Star Trail / Jade Pro Magnetic Switches",
        "Full CNC Aluminum Chassis",
        "Esports Gasket Mount Structure",
        "Web-based Driver (No software installation required)",
        "Double-shot PBT Keycaps",
        "Dimensions: 307 x 124.5 x 22mm | Weight: ~1.0kg",
      ],
      options: [
        {
          name: "Black / Star Trail Switches",
          available: true,
          image: "https://m.media-amazon.com/images/I/5191XtHTByL.jpg",
        },
        {
          name: "White / Magnetic Jade Pro",
          available: true,
          image:
            "https://iqunix.com/cdn/shop/files/20250310-095053.jpg?v=1742280303&width=1946",
        },
        {
          name: "Pink / Pink Jade Pro",
          available: true,
          image:
            "https://cdn.mwave.com.au/images/400/iqunix_ez63_pink_rgb_he_mechanical_gaming_keyboard_star_trail_switch_ac81339_62101.jpg",
        },
      ],
    },
    {
      id: "aula-ag60-series",
      title: "AULA AG60 HE Series",
      short: "AULA AG60 Dual-Engine 8K Magnetic Switch Aluminum Keyboard",
      price: 135,
      layout: "60",
      available: false,
      isNew: false,
      lowStock: false,
      images: [
        "https://www.aulastar.com/uploads/allimg/20250826/1-250R61HU1644.jpg",
        "https://www.aulastar.com/uploads/allimg/20250826/1-250R61HU1R2.jpg",
        "https://www.aulastar.com/uploads/allimg/20250826/1-250R61HU2628.jpg",
        "https://www.aulastar.com/uploads/allimg/20250826/1-250R61HU4939.jpg",
        "https://www.aulastar.com/uploads/allimg/20250826/1-250R61HUD64.jpg",
        "https://www.aulastar.com/uploads/allimg/20250826/1-250R61HU5S1.jpg",
        "https://www.aulastar.com/uploads/allimg/20250826/1-250R61HUL44.jpg",
        "https://www.aulastar.com/uploads/allimg/20250826/1-250R61HUSQ.jpg",
        "https://www.aulastar.com/uploads/allimg/20250826/1-250R61HUR53.jpg",
        "https://www.aulastar.com/uploads/allimg/20250826/1-250R61HZ22J.jpg",
      ],
      specs: [
        "60% (61 keys)",
        "8000Hz Polling Rate",
        "0.1ms Ultra-low Latency",
        "Industry-Leading 2304KHz Per-Key Scan Rate",
        "256K Full Key Matrix Scan Rate",
        "RT Precision: 0.001mm (Ultra-high resolution)",
        "Adjustable Zero-Dead-Zone Design",
        "Aether Magnetic Switches",
        "Carbon Fiber Positioning Plate",
        "CNC Anodized Aluminum Case (220-grit)",
        "5-Layer Silent Noise Reduction System",
        "Twin-Star Per-key RGB (130 ARGB LEDs)",
        "Function: SOCD / DKS / RT / MT / TGL / Key Remapping",
        "Up to 4 Profiles Quick Switch Hot-Keys",
      ],
      options: [
        {
          name: "AG60 Max / Warm Silver",
          available: true,
          image:
            "https://www.aulastar.com/uploads/allimg/20250819/1-250Q9152PT54.jpg",
          price: 135,
        },
        {
          name: "AG60 Max / Racing Red",
          available: false,
          image:
            "https://www.aulastar.com/uploads/allimg/20250819/1-250Q9152PKU.jpg",
          price: 150,
        },
      ],
    },
    {
      id: "cidoo-qk61-v2",
      title: "CIDOO QK61 V2",
      short:
        "CIDOO QK61 V2 Tri-Mode VIA Programmable Gasket Mechanical Keyboard",
      price: 40,
      layout: "60",
      available: false,
      isNew: false,
      lowStock: false,
      images: [
        "https://cdn.shopify.com/s/files/1/0691/8337/3602/files/203A3777.jpg?v=1728442680",
        "https://cdn.shopify.com/s/files/1/0691/8337/3602/files/203A3739.jpg?v=1728442680",
        "https://cdn.shopify.com/s/files/1/0691/8337/3602/files/203A3789.jpg?v=1728442680",
        "https://cdn.shopify.com/s/files/1/0691/8337/3602/files/203A3807.jpg?v=1728442680",
        "https://cdn.shopify.com/s/files/1/0691/8337/3602/files/203A3801.jpg?v=1728442680",
        "https://cdn.shopify.com/s/files/1/0691/8337/3602/files/203A3755.jpg?v=1728442680",
        "https://cdn.shopify.com/s/files/1/0691/8337/3602/files/203A3760.jpg?v=1728442680",
      ],
      specs: [
        "60% (61 keys)",
        "Tri-Mode: 2.4G / Bluetooth 5.0 / Wired USB-C",
        "Wired Polling Rate: 1000Hz (3ms Latency)",
        "Scan Rate: 1000Hz (Uniform)",
        "VIA Programmable (QMK Support)",
        "Hot-swappable PCB (3/5-pin compatible)",
        "CIDOO Pearl White Linear Switches (Pre-lubed)",
        "Pre-lubed Plate-mount stabilizers",
        "Gasket Mount with Polycarbonate (PC) Plate",
        "3000mAh Battery Capacity",
        "5-Layer Sound Dampening Foam",
        "Double-shot PBT + Transparent PC Keycaps",
        "South-facing RGB LEDs",
      ],
      options: [
        {
          name: "White Case",
          available: true,
          image:
            "https://cdn.shopify.com/s/files/1/0691/8337/3602/files/203A3739.jpg?v=1728442680",
        },
        {
          name: "Black Case",
          available: false,
          image:
            "https://cdn.shopify.com/s/files/1/0691/8337/3602/files/203A3777.jpg?v=1728442680",
        },
      ],
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
      available: false,
      isNew: false,
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
      available: false,
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
          available: false,
          image:
            "https://raw.githubusercontent.com/Glsswrks/hekeebcambodia/main/images/mayaX/purple.jpg",
        },
        {
          name: "Light Pink",
          available: false,
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
  straps: [
    {
      id: "custom--strap-1",
      title: "Custom Keyboard Straps (Pattern 1)",
      short:
        "Customizable keyboard straps, compatible with all types of keyboards",
      price: 4,
      layout: "Free Styles",
      available: true,
      isNew: false,
      lowStock: false,
      images: [
        "https://media.discordapp.net/attachments/1384747917063225354/1451587237199352011/tb_image_share_1766155661862.png?ex=6946b776&is=694565f6&hm=ed07e9d4c6c48a0ad1b4bcfe3feaf9dc8409bde26fbc906f98f5d0bad3157651&=&format=webp&quality=lossless&width=519&height=693",
      ],
      specs: [
        "Accesories Included",
        "Snap buttons / Press Studs, Screw Posts, D-Rings, Snap Hooks",
      ],
      options: null,
    },
    {
      id: "custom--strap-2",
      title: "Custom Keyboard Straps (Pattern 2)",
      short:
        "Customizable keyboard straps, compatible with all types of keyboards",
      price: 4,
      layout: "Free Styles",
      available: true,
      isNew: false,
      lowStock: false,
      images: [
        "https://media.discordapp.net/attachments/1384747917063225354/1451587237757325413/tb_image_share_1766155666334.png?ex=6946b776&is=694565f6&hm=bc954e0b562e37faef899cbc3f5075fe6c1cabd7da845877f2d341b8e6f67abe&=&format=webp&quality=lossless&width=519&height=693",
      ],
      specs: [
        "Accesories Included",
        "Snap buttons / Press Studs, Screw Posts, D-Rings, Snap Hooks",
      ],
      options: null,
    },
    {
      id: "custom--strap-3",
      title: "Custom Keyboard Straps (Pattern 3)",
      short:
        "Customizable keyboard straps, compatible with all types of keyboards",
      price: 4,
      layout: "Free Styles",
      available: true,
      isNew: false,
      lowStock: false,
      images: [
        "https://media.discordapp.net/attachments/1384747917063225354/1451587238264832151/tb_image_share_1766155674413.png?ex=6946b776&is=694565f6&hm=1d474cb25af1a5a50f1040cdf381635159466ba6767861d636fef89d2fa47441&=&format=webp&quality=lossless&width=519&height=693",
      ],
      specs: [
        "Accesories Included",
        "Snap buttons / Press Studs, Screw Posts, D-Rings, Snap Hooks",
      ],
      options: null,
    },
    {
      id: "custom--strap-4",
      title: "Custom Keyboard Straps (Pattern 4)",
      short:
        "Customizable keyboard straps, compatible with all types of keyboards",
      price: 4,
      layout: "Free Styles",
      available: true,
      isNew: false,
      lowStock: false,
      images: [
        "https://media.discordapp.net/attachments/1384747917063225354/1451587238772346929/tb_image_share_1766155686835.png?ex=6946b776&is=694565f6&hm=7d275bde287863f0c99b25d320c141342560006b5e5709e26ba141a170ec9682&=&format=webp&quality=lossless&width=519&height=693",
      ],
      specs: [
        "Accesories Included",
        "Snap buttons / Press Studs, Screw Posts, D-Rings, Snap Hooks",
      ],
      options: null,
    },
    {
      id: "custom--strap-5",
      title: "Custom Keyboard Straps (Pattern 5)",
      short:
        "Customizable keyboard straps, compatible with all types of keyboards",
      price: 4,
      layout: "Free Styles",
      available: true,
      isNew: false,
      lowStock: false,
      images: [
        "https://media.discordapp.net/attachments/1384747917063225354/1451587239648694495/tb_image_share_1766155693721.png?ex=6946b777&is=694565f7&hm=3bacb6495a1ee0de4b0b120c60d09df221422f661ad8cfec86e821bc4f73244b&=&format=webp&quality=lossless&width=519&height=693",
      ],
      specs: [
        "Accesories Included",
        "Snap buttons / Press Studs, Screw Posts, D-Rings, Snap Hooks",
      ],
      options: null,
    },
    {
      id: "custom--strap-6",
      title: "Custom Keyboard Straps (Pattern 6)",
      short:
        "Customizable keyboard straps, compatible with all types of keyboards",
      price: 4,
      layout: "Free Styles",
      available: true,
      isNew: false,
      lowStock: false,
      images: [
        "https://media.discordapp.net/attachments/1384747917063225354/1451587240068382873/tb_image_share_1766155699713.png?ex=6946b777&is=694565f7&hm=ec32c167bee41dbb02a4bd72127ebc5af69cb37f7349ae011cf6da9ccfe5c0cb&=&format=webp&quality=lossless&width=519&height=693",
      ],
      specs: [
        "Accesories Included",
        "Snap buttons / Press Studs, Screw Posts, D-Rings, Snap Hooks",
      ],
      options: null,
    },
    {
      id: "custom--strap-7",
      title: "Custom Keyboard Straps (Pattern 7)",
      short:
        "Customizable keyboard straps, compatible with all types of keyboards",
      price: 4,
      layout: "Free Styles",
      available: true,
      isNew: false,
      lowStock: false,
      images: [
        "https://media.discordapp.net/attachments/1384747917063225354/1451587240642871549/tb_image_share_1766155707730.png?ex=6946b777&is=694565f7&hm=aa3a9e740ad0f4659bf8046ca4fc876dfb4c3f6653a09ac637e2d8c0b1f1f77d&=&format=webp&quality=lossless&width=519&height=693",
      ],
      specs: [
        "Accesories Included",
        "Snap buttons / Press Studs, Screw Posts, D-Rings, Snap Hooks",
      ],
      options: null,
    },
    {
      id: "custom--strap-8",
      title: "Custom Keyboard Straps (Pattern 8)",
      short:
        "Customizable keyboard straps, compatible with all types of keyboards",
      price: 4,
      layout: "Free Styles",
      available: true,
      isNew: false,
      lowStock: false,
      images: [
        "https://media.discordapp.net/attachments/1384747917063225354/1451587241582526515/tb_image_share_1766155712688.png?ex=6946b777&is=694565f7&hm=ab5293ad8606c55589e3f0bbafa61e0c000a770d078c27413b58591b0f94add4&=&format=webp&quality=lossless&width=519&height=693",
      ],
      specs: [
        "Accesories Included",
        "Snap buttons / Press Studs, Screw Posts, D-Rings, Snap Hooks",
      ],
      options: null,
    },
    {
      id: "custom--strap-9",
      title: "Custom Keyboard Straps (Pattern 9)",
      short:
        "Customizable keyboard straps, compatible with all types of keyboards",
      price: 4,
      layout: "Free Styles",
      available: true,
      isNew: false,
      lowStock: false,
      images: [
        "https://media.discordapp.net/attachments/1384747917063225354/1451587242115207360/tb_image_share_1766155719983.png?ex=6946b777&is=694565f7&hm=667daaa969ede855c7edc9359136e63536acb7fcacb407bffce84bd315d2cfa7&=&format=webp&quality=lossless&width=519&height=693",
      ],
      specs: [
        "Accesories Included",
        "Snap buttons / Press Studs, Screw Posts, D-Rings, Snap Hooks",
      ],
      options: null,
    },
    {
      id: "custom--strap-10",
      title: "Custom Keyboard Straps (Pattern 10)",
      short:
        "Customizable keyboard straps, compatible with all types of keyboards",
      price: 4,
      layout: "Free Styles",
      available: true,
      isNew: false,
      lowStock: false,
      images: [
        "https://media.discordapp.net/attachments/1384747917063225354/1451587242660466738/tb_image_share_1766155726623.png?ex=6946b777&is=694565f7&hm=56b9089579d656e79d08f309e67245e45a21d451cc8648df15f02e4d5ae0964b&=&format=webp&quality=lossless&width=519&height=693",
      ],
      specs: [
        "Accesories Included",
        "Snap buttons / Press Studs, Screw Posts, D-Rings, Snap Hooks",
      ],
      options: null,
    },
    {
      id: "custom--strap-11",
      title: "Custom Keyboard Straps (Pattern 11)",
      short:
        "Customizable keyboard straps, compatible with all types of keyboards",
      price: 4,
      layout: "Free Styles",
      available: true,
      isNew: false,
      lowStock: false,
      images: [
        "https://media.discordapp.net/attachments/1384747917063225354/1451587248754528440/tb_image_share_1766155731689.png?ex=6946b779&is=694565f9&hm=2da1175657f461b0b71534b12c1f68b91e4b37f8b6be47989753b93d5b912f88&=&format=webp&quality=lossless&width=519&height=693",
      ],
      specs: [
        "Accesories Included",
        "Snap buttons / Press Studs, Screw Posts, D-Rings, Snap Hooks",
      ],
      options: null,
    },
    {
      id: "custom--strap-12",
      title: "Custom Keyboard Straps (Pattern 12)",
      short:
        "Customizable keyboard straps, compatible with all types of keyboards",
      price: 4,
      layout: "Free Styles",
      available: true,
      isNew: false,
      lowStock: false,
      images: [
        "https://media.discordapp.net/attachments/1384747917063225354/1451587249522212884/tb_image_share_1766155735603.png?ex=6946b779&is=694565f9&hm=d4abd9b44f6f8df32405887b7dc751f9a2be16e37fffe541789ba1b4bc83bd9e&=&format=webp&quality=lossless&width=519&height=693",
      ],
      specs: [
        "Accesories Included",
        "Snap buttons / Press Studs, Screw Posts, D-Rings, Snap Hooks",
      ],
      options: null,
    },
  ],
  keycaps: [
    {
      id: "cyberpunk-keycap",
      title: "Side-Print Cyberpunk Keycap",
      short:
        "Cyberpunk Themed Keycap compatible with all keyboards that using Cherry Profile",
      price: 25,
      layout: "Cherry Profile",
      available: false,
      no_info: true,
      isNew: false,
      lowStock: false,
      images: [
        "https://titannation.store/cdn/shop/files/keycaps_set_PBT.jpg?v=1728900168",
        "https://titannation.store/cdn/shop/files/172_PC.jpg?v=1727684963&width=1946",
      ],
      specs: [
        "Cherry Profile",
        "Material: PC",
        "Support Full Keyboard Layouts",
        "172 Keys",
      ],
      options: null,
    },
    {
      id: "cyberpunk-keycap-74",
      title: "Custom Cyberpunk Keycap (74 Keys)",
      short:
        "Custom Cyberpunk Themed Keycap compatible with all keyboards that using Original Profile",
      price: 15,
      layout: "Original Profile",
       no_info: true,
      available: false,
      isNew: false,
      lowStock: false,
      images: [
        "https://media.discordapp.net/attachments/1384747917063225354/1451608935948878058/tb_image_share_1766160794768.png?ex=69481d2b&is=6946cbab&hm=be9a2d7725e4e655868a009e4e58c4ad9ef651e99111ed977e4b046dcb656c15&=&format=webp&quality=lossless&width=693&height=693",
      ],
      specs: [
        "Original Profile",
        "Material: PBT",
        "Support Full Keyboard 61/68 Layouts",
        "74 Keys"
      ],
      options: [
        {
          name: "Original Cyberpunk Theme",
          available: false,
          image:
            "https://media.discordapp.net/attachments/1384747917063225354/1451608935948878058/tb_image_share_1766160794768.png?ex=6946cbab&is=69457a2b&hm=56414554b3761dace3b938dc916b6de0bc4f0c3b26f81a8bf53c94504231d761&=&format=webp&quality=lossless&width=693&height=693"
        },
        {
          name: "Dark-Red Cyberpunk Theme",
          available: false,
          image:
            "https://media.discordapp.net/attachments/1384747917063225354/1451608936343011369/tb_image_share_1766160798018.png?ex=69481d2c&is=6946cbac&hm=17a91f76363c8c9dc148091d4ae9e3efbd0c4b4c05ab47fd2322849c5fc70003&=&format=webp&quality=lossless&width=693&height=693",
        },
      ],
    },
    {
      id: "yuki-aim-keycap",
      title: "Yuki Aim Keycap",
      short:
        "Yuki Aim Keycap compatible with all keyboards that using Original - Cherry Profile",
      price: 15,
      layout: "Cherry - Original Profile",
      no_info: true,
      available: false,
      isNew: false,
      lowStock: false,
      images: [
        "https://media.discordapp.net/attachments/1384747917063225354/1452133712430104698/tb_image_share_1766285986918.png?ex=6948b468&is=694762e8&hm=58217e4dd3c08a77cf180263296c037ba02ce0aa056132c470f3f109892172eb&=&format=webp&quality=lossless&width=693&height=693",
        "https://media.discordapp.net/attachments/1384747917063225354/1452133711943569559/tb_image_share_1766285992734.png?ex=6948b468&is=694762e8&hm=53a7981d6095e797ae5640bdc8f02abbc0cd17cab85a739767c1b44f99e6c794&=&format=webp&quality=lossless&width=693&height=693",
        "https://media.discordapp.net/attachments/1384747917063225354/1452133712895545407/tb_image_share_1766285996468.png?ex=6948b468&is=694762e8&hm=e8050ff36a87fcfca0e696f38a34bb4430f98310eb4fca62ac2ace04d4e6c8c9&=&format=webp&quality=lossless&width=693&height=693"
      ],
      specs: [
        "Cherry Original Height Profile",
        "Material: PBT Thermal transfer",
        "Support 61/68 Layout Keyboards",
        "104 Keys"
      ],
      options: null
    },
  ],
  mousepads:[
    {
    id: "pulsar-yui-edition",
    title: "Pulsar Yui Edition Glass Mousepad (Replica)",
    short: "Tempered Glass Mousepad - XXL Size (Aimerz Yui Edition)",
    price: 65,
    layout: "490x430mm",
    no_info: true,
    available: false,
    isNew: false,
    lowStock: false,
    images: [
      "https://www.pulsar.gg/cdn/shop/files/Pulsar-Superglide-Glass-mousepad_XXL_Aimerz_Yui_main.jpg?v=1752193016"
    ],
    specs: [
      "Tempered Glass Surface",
      "Size: 490x430mm",
      "Coating + Full Coverage Primer"
    ],
    options: null
  },
  {
    id: "pulsar-ayane-edition",
    title: "Pulsar Ayane Edition Glass Mousepad (Replica)",
    short: "Tempered Glass Mousepad - XXL Size (Ayane Edition)",
    price: 50,
    layout: "490x430mm",
    no_info: true,
    available: false,
    isNew: false,
    lowStock: false,
    images: [
      "https://www.pulsar.gg/cdn/shop/files/Pulsar_Superglide_Glass_mousepad_XXL_Aimerz_Ayane_main.jpg?v=1712547879"
    ],
    specs: [
      "Tempered Glass Surface",
      "Size: 490x430mm",
      "Full Coverage Primer"
    ],
    options: null
  },
  {
    id: "pulsar-aimerz-edition",
    title: "Pulsar Aimerz Edition Glass Mousepad (Replica)",
    short: "Tempered Glass Mousepad - XXL Size (Aimerz Edition)",
    price: 50,
    layout: "490x430mm",
    no_info: true,
    available: false,
    isNew: false,
    lowStock: false,
    images: [
      "https://www.pulsar.gg/cdn/shop/files/Pulsar_Superglide_Glass_mousepad_XXL_Aimerz_main.jpg?v=1701254311"
    ],
    specs: [
      "Tempered Glass Surface",
      "Size: 490x430mm",
      "Full Coverage Primer"
    ],
    options: null
  },
  {
    id: "pulsar-koharu-edition",
    title: "Pulsar Koharu Edition Glass Mousepad (Replica)",
    short: "Tempered Glass Mousepad - XXL Size (Koharu Edition)",
    price: 50,
    layout: "490x430mm",
    no_info: true,
    available: false,
    isNew: false,
    lowStock: false,
    images: [
      "https://www.pulsar.gg/cdn/shop/files/Pulsar_Superglide_Glass_mousepad_XXL_Aimerz_Koharu_main.jpg?v=1729639565"
    ],
    specs: [
      "Tempered Glass Surface",
      "Size: 490x430mm",
      "Full Coverage Primer"
    ],
    options: null
  },
    {
    id: "titan-gaming-gear-mousepad",
    title: "Titan Gaming Gear XSoft Standard",
    short: "Premium XSoft Fabric Mousepad - Standard Size (Titan Nation)",
    price: 15,
    layout: "450x400mm",
     no_info: true,
    available: false,
    isNew: false,
    lowStock: false,
    images: [
      "https://media.discordapp.net/attachments/1384747917063225354/1451902967295770695/tb_image_share_1766230995951.png?ex=6947dd82&is=69468c02&hm=cec800f002cb830346ea14edafd7f9aea4d301e82941009ba133ebe660160c48&=&format=webp&quality=lossless&width=693&height=693",
      "https://media.discordapp.net/attachments/1384747917063225354/1451964001012547716/tb_image_share_1766245554292.png?ex=6948165a&is=6946c4da&hm=1858631ec46db3c378be77bb1c35dbcddd94f5201ab636de60ffb663b227cfb3&=&format=webp&quality=lossless&width=693&height=693",
      "https://media.discordapp.net/attachments/1384747917063225354/1451964001457275072/tb_image_share_1766245559878.png?ex=6948165a&is=6946c4da&hm=7b4f1372a1fab7b2c052ff9cfbee484f864fb0396153a9d3038b3f86873630ca&=&format=webp&quality=lossless&width=693&height=693",
      "https://media.discordapp.net/attachments/1384747917063225354/1451964001914192096/tb_image_share_1766245564112.png?ex=6948165a&is=6946c4da&hm=87fde99c62a283f01b76e1e1b1234de180d2ba920b92c82519641ecd79bbf01d&=&format=webp&quality=lossless&width=693&height=693",
      "https://media.discordapp.net/attachments/1384747917063225354/1451964002346471618/tb_image_share_1766245569900.png?ex=6948165a&is=6946c4da&hm=406f21197b56616235c9bdaa3eec1ee0452770ffa6c1a611319f1e138a519f78&=&format=webp&quality=lossless&width=693&height=693"
    ],
    specs: [
      "Thickness: 5mm",
      "Size: 450x400mm",
    ],
    options: [
      {
        name: "Orange Edition",
        available: false,
        image:
          "https://media.discordapp.net/attachments/1384747917063225354/1451902967295770695/tb_image_share_1766230995951.png?ex=6947dd82&is=69468c02&hm=cec800f002cb830346ea14edafd7f9aea4d301e82941009ba133ebe660160c48&=&format=webp&quality=lossless&width=693&height=693",
      },
      {
        name: "Black Edition",
        available: false,
        image:
          "https://media.discordapp.net/attachments/1384747917063225354/1451902967715467325/tb_image_share_1766230998852.png?ex=6947dd82&is=69468c02&hm=ce142a952de8e3da9d54fa4d54b936a971e7e4dd01f6d1d9fdc717649d228b85&=&format=webp&quality=lossless&width=693&height=693",
      },
      {
        name: "Red Edition",
        available: false,
        image: "https://media.discordapp.net/attachments/1384747917063225354/1451902966914355241/tb_image_share_1766230992724.png?ex=6947dd82&is=69468c02&hm=ce06ad1e3bae737ab456b8e076613f3c2952c737375c783ece4475fa1ed05ba6&=&format=webp&quality=lossless&width=693&height=693"
      },
      {
        name: "Blue Edition",
        available: false,
        image:
          "https://media.discordapp.net/attachments/1384747917063225354/1451902966507376737/tb_image_share_1766230989688.png?ex=6947dd82&is=69468c02&hm=58b2cae8119e22f9260f0dda2826900d2b3a743eb539324e979b4bc32deeb649&=&format=webp&quality=lossless&width=693&height=693",
      }
    ]
  },
  {
    id: "clone-artisan-mousepad",
    title: "Artisan FX (Clone)",
    short: "Custom Artisan Mousepad Clone - 3mm Thickness",
    price: 9,
    layout: "450x400mm",
    no_info: true,
    available: false,
    isNew: false,
    lowStock: false,
    images: [
      "https://media.discordapp.net/attachments/1384747917063225354/1451902451786449070/tb_image_share_1766230886978.png?ex=6947dd07&is=69468b87&hm=f150f349e6d653a4de20d8c065953420be03d25016e60669a51fe6f6f26c6707&=&format=webp&quality=lossless&width=693&height=693"
    ],
    specs: [
      "Size: 450x400mm",
      "Thickness: 3mm",
    ],
    options: [
      {
        name: "Red Edition",
        available: false,
        image: "https://media.discordapp.net/attachments/1384747917063225354/1451902451786449070/tb_image_share_1766230886978.png?ex=6947dd07&is=69468b87&hm=f150f349e6d653a4de20d8c065953420be03d25016e60669a51fe6f6f26c6707&=&format=webp&quality=lossless&width=693&height=693"
      },
       {
        name: "Orange Edition",
        available: false,
        image: "https://media.discordapp.net/attachments/1384747917063225354/1451902452436697119/tb_image_share_1766230894253.png?ex=6947dd07&is=69468b87&hm=1721ff5db8ded6af5bc9b3a0c306a6af26d20ad95b465003ada635270e598ec3&=&format=webp&quality=lossless&width=693&height=693"
      },
       {
        name: "Black Edition",
        available: false,
        image: "https://media.discordapp.net/attachments/1384747917063225354/1451902452851802354/tb_image_share_1766230881188.png?ex=6947dd07&is=69468b87&hm=30ad306b3f0793721980ff0e1f7e7d15948d2cf422f49ad8b20e80d36d30488d&=&format=webp&quality=lossless&width=693&height=693"
      }
    ]
  },
  ]
};

const allProducts = [
  ...productData.keyboards,
  ...productData.mice,
  ...productData.straps,
  ...productData.keycaps,
  ...productData.mousepads,
];

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
  
  getItems: function() {
    const stored = localStorage.getItem(this.key);
    return stored ? JSON.parse(stored) : [];
  },
  
  addItem: function(product, option) {
    const items = this.getItems();
    const newItem = {
      id: product.id,
      title: product.title,
      price: option ? option.price || product.price : product.price,
      optionName: option ? option.name : null,
      image: option ? option.image : product.images[0] || "",
      timestamp: Date.now(),
      preorder: true
    };
    
    items.push(newItem);
    localStorage.setItem(this.key, JSON.stringify(items));
    this.updateUI();
    showToast(`Added ${newItem.title} to pre-order list`);
  },
  
  removeItem: function(index) {
    const items = this.getItems();
    items.splice(index, 1);
    localStorage.setItem(this.key, JSON.stringify(items));
    this.updateUI();
    
    // IMPORTANT: Re-render the modal immediately
    renderPreorderModal();
  },
  
  clear: function() {
    localStorage.removeItem(this.key);
    this.updateUI();
  },
  
  updateUI: function() {
    const items = this.getItems();
    const badge = document.getElementById("preorderBadge");
    if (badge) {
      badge.textContent = items.length;
      if (items.length > 0) badge.classList.remove("hidden");
      else badge.classList.add("hidden");
    }
    
    // Re-render the modal if it's open
    if (document.getElementById("preorderModal")?.getAttribute("aria-hidden") === "false") {
      renderPreorderModal();
    }
  }
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

// NEW: Helper: Render Pre-order Modal
function renderPreorderModal() {
  const items = PreOrderList.getItems();
  const listEl = document.getElementById("preorderItemsList");
  const emptyState = document.getElementById("preorderEmptyState");
  const content = document.getElementById("preorderContent");
  
  if (!listEl) return;

  if (items.length === 0) {
    emptyState.style.display = "block";
    content.style.display = "none";
  } else {
    emptyState.style.display = "none";
    content.style.display = "block";
    
    listEl.innerHTML = items.map((item, index) => `
      <li class="cart-item">
        <img src="${item.image}" alt="thumb" style="width:40px; height:40px; object-fit:cover; border-radius:4px; margin-right:10px;">
        <div class="cart-item-info">
          <span class="cart-item-title">${item.title}</span>
          ${item.optionName ? `<span class="cart-item-option">${item.optionName}</span>` : ""}
          <span class="preorder-label" style="color:#FF6B6B; font-size:0.8rem; font-weight:600;">PRE-ORDER</span>
        </div>
        <div style="display:flex; align-items:center;">
          <span class="cart-item-price">$${item.price}</span>
          <button class="cart-remove-btn" onclick="PreOrderList.removeItem(${index})" aria-label="Remove">&times;</button>
        </div>
      </li>
    `).join("");
    
    // Generate Telegram message for pre-orders
    const preorderBtn = document.getElementById("preorderTelegramBtn");
    if (preorderBtn) {
      let message = "Hello, I'm interested in pre-ordering these items:\n\n";
      items.forEach((item, i) => {
        message += `${i+1}. ${item.title} ${item.optionName ? `(${item.optionName})` : ""} - $${item.price}\n`;
      });
      message += `\nTotal: $${items.reduce((sum, item) => sum + item.price, 0)}`;
      message += "\n\nCan you let me know:";
      message += "\n• Expected wait time";
      message += "\n• Deposit required (if any)";
      message += "\n• Updates on arrival";
      
      preorderBtn.href = `https://t.me/${TELEGRAM_HANDLE}?text=${encodeURIComponent(message)}`;
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
/*
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
    */

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
      if (e.target === preorderModal) preorderModal.setAttribute("aria-hidden", "true");
    });
    
    if (clearPreordersBtn) {
      clearPreordersBtn.addEventListener("click", () => {
        if (confirm("Clear all pre-orders?")) {
          PreOrderList.clear();
        }
      });
    }
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
  let no_info = `<div class="specs-inline muted">${p.layout} • ${p.specs[0] || ""}</div>`;
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
          PreOrderList.addItem(product, selectedOption);
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
  let actionButtonHTML = '';
  if (product.available) {
    // Product is available - show only Add to Cart button
    actionButtonHTML = `<button class="btn primary add-to-cart" id="addToCartBtn">Add to Cart</button>`;
  } else {
    // Product is not available - show only Pre-order button
    actionButtonHTML = `<button class="btn primary pre-order" id="preOrderBtn">Pre-order</button>`;
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