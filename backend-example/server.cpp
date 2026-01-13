/**
 * Keeb Cambodia Backend Server
 * 
 * A simple HTTPS server using cpp-httplib that receives data from the frontend.
 * 
 * Build: g++ -std=c++17 -o backend_server server.cpp -lssl -lcrypto -pthread
 * Run: ./backend_server
 * 
 * Requires:
 * - cpp-httplib (https://github.com/yhirose/cpp-httplib)
 * - OpenSSL for HTTPS support
 * - server.key and server.crt files in the same directory
 */

#define CPPHTTPLIB_OPENSSL_SUPPORT
#include "httplib.h"

#include <iostream>
#include <string>
#include <fstream>
#include <ctime>

// Configuration
const int SERVER_PORT = 8443;
const std::string CERT_FILE = "server.crt";
const std::string KEY_FILE = "server.key";

// Helper to get current timestamp
std::string getCurrentTimestamp() {
    time_t now = time(nullptr);
    char buf[100];
    strftime(buf, sizeof(buf), "%Y-%m-%d %H:%M:%S", localtime(&now));
    return std::string(buf);
}

// Helper to log requests to console
void logRequest(const std::string& endpoint, const std::string& method, const std::string& body = "") {
    std::cout << "[" << getCurrentTimestamp() << "] " << method << " " << endpoint;
    if (!body.empty()) {
        std::cout << "\n  Body: " << body.substr(0, 200);
        if (body.length() > 200) std::cout << "...";
    }
    std::cout << std::endl;
}

// Set CORS headers for all responses
void setCorsHeaders(httplib::Response& res) {
    // SECURITY WARNING: Using "*" allows any origin to access this API.
    // For production, replace "*" with your specific GitHub Pages domain:
    // Example: "https://your-username.github.io"
    // This prevents unauthorized sites from making requests to your backend.
    res.set_header("Access-Control-Allow-Origin", "*");
    // Only allow methods that the frontend actually uses
    res.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set_header("Access-Control-Allow-Headers", "Content-Type, Accept");
    res.set_header("Access-Control-Max-Age", "86400");
}

// Save data to a JSON file (simple persistence)
void saveToFile(const std::string& filename, const std::string& data) {
    std::ofstream file(filename, std::ios::app);
    if (file.is_open()) {
        file << data << "\n---\n";
        file.close();
        std::cout << "  Saved to " << filename << std::endl;
    }
}

int main() {
    // Create HTTPS server with SSL certificates
    httplib::SSLServer svr(CERT_FILE.c_str(), KEY_FILE.c_str());
    
    if (!svr.is_valid()) {
        std::cerr << "Error: Failed to create SSL server." << std::endl;
        std::cerr << "Make sure " << CERT_FILE << " and " << KEY_FILE << " exist." << std::endl;
        std::cerr << "\nTo generate certificates:" << std::endl;
        std::cerr << "  openssl genrsa -out server.key 2048" << std::endl;
        std::cerr << "  openssl req -new -x509 -key server.key -out server.crt -days 365 -subj \"/CN=localhost\"" << std::endl;
        return 1;
    }

    // Handle OPTIONS preflight requests for CORS
    svr.Options(".*", [](const httplib::Request& req, httplib::Response& res) {
        setCorsHeaders(res);
        res.status = 204;
    });

    // Health check endpoint
    svr.Get("/api/health", [](const httplib::Request& req, httplib::Response& res) {
        logRequest("/api/health", "GET");
        setCorsHeaders(res);
        res.set_content(R"({"status":"ok","message":"Server is running"})", "application/json");
    });

    // Cart actions (logging cart updates)
    svr.Post("/api/cart", [](const httplib::Request& req, httplib::Response& res) {
        logRequest("/api/cart", "POST", req.body);
        setCorsHeaders(res);
        
        // Save cart action to file
        saveToFile("cart_actions.json", req.body);
        
        res.set_content(R"({"success":true,"message":"Cart action logged"})", "application/json");
    });

    // Checkout endpoint
    svr.Post("/api/checkout", [](const httplib::Request& req, httplib::Response& res) {
        logRequest("/api/checkout", "POST", req.body);
        setCorsHeaders(res);
        
        // Save checkout to file
        saveToFile("checkouts.json", req.body);
        
        // Generate a simple order ID
        std::string orderId = "ORD-" + std::to_string(time(nullptr));
        
        res.set_content(
            R"({"success":true,"message":"Checkout received","orderId":")" + orderId + R"("})",
            "application/json"
        );
    });

    // Pre-order endpoint
    svr.Post("/api/preorder", [](const httplib::Request& req, httplib::Response& res) {
        logRequest("/api/preorder", "POST", req.body);
        setCorsHeaders(res);
        
        // Save pre-order to file
        saveToFile("preorders.json", req.body);
        
        // Generate a pre-order ID
        std::string preorderId = "PRE-" + std::to_string(time(nullptr));
        
        res.set_content(
            R"({"success":true,"message":"Pre-order submitted","preorderId":")" + preorderId + R"("})",
            "application/json"
        );
    });

    // Wishlist sync endpoint
    svr.Post("/api/wishlist", [](const httplib::Request& req, httplib::Response& res) {
        logRequest("/api/wishlist", "POST", req.body);
        setCorsHeaders(res);
        
        // Save wishlist to file
        saveToFile("wishlists.json", req.body);
        
        res.set_content(R"({"success":true,"message":"Wishlist synced"})", "application/json");
    });

    // Newsletter subscription endpoint
    svr.Post("/api/newsletter", [](const httplib::Request& req, httplib::Response& res) {
        logRequest("/api/newsletter", "POST", req.body);
        setCorsHeaders(res);
        
        // Save subscription to file
        saveToFile("newsletter_subscribers.json", req.body);
        
        res.set_content(R"({"success":true,"message":"Subscribed to newsletter"})", "application/json");
    });

    // Contact form endpoint
    svr.Post("/api/contact", [](const httplib::Request& req, httplib::Response& res) {
        logRequest("/api/contact", "POST", req.body);
        setCorsHeaders(res);
        
        // Save contact message to file
        saveToFile("contact_messages.json", req.body);
        
        res.set_content(R"({"success":true,"message":"Message received"})", "application/json");
    });

    // Tracking endpoint
    svr.Get("/api/tracking", [](const httplib::Request& req, httplib::Response& res) {
        std::string trackingId = req.get_param_value("id");
        logRequest("/api/tracking?id=" + trackingId, "GET");
        setCorsHeaders(res);
        
        // Example: Return mock tracking data
        // In production, you would query your database
        if (trackingId.empty()) {
            res.status = 400;
            res.set_content(R"({"success":false,"error":"Missing tracking ID"})", "application/json");
            return;
        }
        
        // Mock tracking response
        std::string response = R"({
            "success": true,
            "tracking": {
                "id": ")" + trackingId + R"(",
                "status": "in_transit",
                "recipient": "John Doe",
                "address": "123 Main St, Phnom Penh",
                "estimatedDelivery": "2026-01-15",
                "products": [
                    {"name": "Custom Keyboard", "quantity": 1}
                ]
            }
        })";
        
        res.set_content(response, "application/json");
    });

    // Start server
    std::cout << "========================================" << std::endl;
    std::cout << "  Keeb Cambodia Backend Server" << std::endl;
    std::cout << "========================================" << std::endl;
    std::cout << "Server starting on https://localhost:" << SERVER_PORT << std::endl;
    std::cout << "\nAvailable endpoints:" << std::endl;
    std::cout << "  GET  /api/health     - Health check" << std::endl;
    std::cout << "  POST /api/cart       - Cart actions" << std::endl;
    std::cout << "  POST /api/checkout   - Checkout" << std::endl;
    std::cout << "  POST /api/preorder   - Pre-orders" << std::endl;
    std::cout << "  POST /api/wishlist   - Wishlist sync" << std::endl;
    std::cout << "  POST /api/newsletter - Newsletter" << std::endl;
    std::cout << "  POST /api/contact    - Contact form" << std::endl;
    std::cout << "  GET  /api/tracking   - Tracking info" << std::endl;
    std::cout << "\nPress Ctrl+C to stop the server." << std::endl;
    std::cout << "========================================" << std::endl;
    
    svr.listen("0.0.0.0", SERVER_PORT);
    
    return 0;
}
