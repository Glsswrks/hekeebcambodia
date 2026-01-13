/**
 * API Client for communicating with C++ backend server (using cpp-httplib)
 * 
 * This module provides functions to send data from the frontend to your
 * local C++ HTTPS server. Configure the BACKEND_URL to match your server.
 */

// Backend server configuration
// Change this to your local server URL when running the C++ backend
const API_CONFIG = {
  // Default to localhost - change this to your C++ server's URL
  // Example: "https://localhost:8443" or "https://192.168.1.100:8443"
  baseUrl: "https://localhost:8443",
  
  // API endpoints
  endpoints: {
    cart: "/api/cart",
    checkout: "/api/checkout",
    preorder: "/api/preorder",
    wishlist: "/api/wishlist",
    newsletter: "/api/newsletter",
    contact: "/api/contact",
    tracking: "/api/tracking"
  },
  
  // Request timeout in milliseconds
  timeout: 10000
};

/**
 * Backend API Client
 * Handles all communication with the C++ httplib server
 */
const BackendAPI = {
  /**
   * Get the full URL for an endpoint
   * @param {string} endpoint - The endpoint path
   * @returns {string} Full URL
   */
  getUrl: function(endpoint) {
    return API_CONFIG.baseUrl + endpoint;
  },

  /**
   * Set the backend server URL
   * Call this to configure a different backend URL
   * @param {string} url - The backend server URL (e.g., "https://localhost:8443")
   */
  setBaseUrl: function(url) {
    API_CONFIG.baseUrl = url;
    console.log("[API] Backend URL set to:", url);
  },

  /**
   * Make a POST request to the backend
   * @param {string} endpoint - API endpoint path
   * @param {Object} data - Data to send
   * @returns {Promise<Object>} Response data
   */
  post: async function(endpoint, data) {
    const url = this.getUrl(endpoint);
    console.log("[API] POST request to:", url);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("[API] Response received:", result);
      return { success: true, data: result };
      
    } catch (error) {
      console.error("[API] Request failed:", error.message);
      return { 
        success: false, 
        error: error.name === "AbortError" ? "Request timeout" : error.message 
      };
    }
  },

  /**
   * Make a GET request to the backend
   * @param {string} endpoint - API endpoint path
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Response data
   */
  get: async function(endpoint, params = {}) {
    let url = this.getUrl(endpoint);
    
    // Add query parameters if provided
    const queryString = new URLSearchParams(params).toString();
    if (queryString) {
      url += "?" + queryString;
    }
    
    console.log("[API] GET request to:", url);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json"
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("[API] Response received:", result);
      return { success: true, data: result };
      
    } catch (error) {
      console.error("[API] Request failed:", error.message);
      return { 
        success: false, 
        error: error.name === "AbortError" ? "Request timeout" : error.message 
      };
    }
  },

  /**
   * Submit cart checkout to backend
   * @param {Array} cartItems - Array of cart items
   * @param {Object} customerInfo - Customer information
   * @returns {Promise<Object>} Response from backend
   */
  submitCheckout: async function(cartItems, customerInfo = {}) {
    const payload = {
      type: "checkout",
      timestamp: new Date().toISOString(),
      items: cartItems,
      customer: customerInfo,
      total: cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
    };
    
    return await this.post(API_CONFIG.endpoints.checkout, payload);
  },

  /**
   * Submit pre-order to backend
   * @param {Array} preorderItems - Array of pre-order items
   * @param {Object} customerInfo - Customer information
   * @returns {Promise<Object>} Response from backend
   */
  submitPreorder: async function(preorderItems, customerInfo = {}) {
    const payload = {
      type: "preorder",
      timestamp: new Date().toISOString(),
      items: preorderItems,
      customer: customerInfo,
      depositRequired: preorderItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1) * 0.5), 0)
    };
    
    return await this.post(API_CONFIG.endpoints.preorder, payload);
  },

  /**
   * Submit wishlist to backend (for saving/syncing)
   * @param {Array} wishlistItems - Array of wishlist items
   * @returns {Promise<Object>} Response from backend
   */
  syncWishlist: async function(wishlistItems) {
    const payload = {
      type: "wishlist",
      timestamp: new Date().toISOString(),
      items: wishlistItems
    };
    
    return await this.post(API_CONFIG.endpoints.wishlist, payload);
  },

  /**
   * Submit newsletter subscription
   * @param {string} email - Email address
   * @returns {Promise<Object>} Response from backend
   */
  subscribeNewsletter: async function(email) {
    const payload = {
      type: "newsletter",
      timestamp: new Date().toISOString(),
      email: email
    };
    
    return await this.post(API_CONFIG.endpoints.newsletter, payload);
  },

  /**
   * Submit contact form
   * @param {string} email - Contact email
   * @param {string} message - Contact message
   * @returns {Promise<Object>} Response from backend
   */
  submitContact: async function(email, message) {
    const payload = {
      type: "contact",
      timestamp: new Date().toISOString(),
      email: email,
      message: message
    };
    
    return await this.post(API_CONFIG.endpoints.contact, payload);
  },

  /**
   * Get tracking information from backend
   * @param {string} trackingId - The tracking ID
   * @returns {Promise<Object>} Tracking information
   */
  getTracking: async function(trackingId) {
    return await this.get(API_CONFIG.endpoints.tracking, { id: trackingId });
  },

  /**
   * Send cart data to backend (for analytics/logging)
   * @param {Array} cartItems - Current cart items
   * @param {string} action - Action type (add, remove, update, clear)
   * @returns {Promise<Object>} Response from backend
   */
  logCartAction: async function(cartItems, action) {
    const payload = {
      type: "cart_action",
      action: action,
      timestamp: new Date().toISOString(),
      items: cartItems,
      itemCount: cartItems.length
    };
    
    return await this.post(API_CONFIG.endpoints.cart, payload);
  },

  /**
   * Test connection to the backend server
   * @returns {Promise<boolean>} True if server is reachable
   */
  testConnection: async function() {
    try {
      const response = await this.get("/api/health");
      return response.success;
    } catch (error) {
      console.error("[API] Connection test failed:", error);
      return false;
    }
  }
};

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = { BackendAPI, API_CONFIG };
}
