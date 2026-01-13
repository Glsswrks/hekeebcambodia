# C++ Backend Server Example

This directory contains a sample C++ HTTPS server implementation using [cpp-httplib](https://github.com/yhirose/cpp-httplib) library that works with the Keeb Cambodia frontend.

## Prerequisites

1. **cpp-httplib** - Header-only HTTP/HTTPS library
2. **OpenSSL** - For HTTPS support
3. A C++17 compatible compiler (GCC 7+, Clang 5+, MSVC 2019+)

## Installation

### Installing cpp-httplib

```bash
# Clone the repository
git clone https://github.com/yhirose/cpp-httplib.git

# Or download just the header file
curl -O https://raw.githubusercontent.com/yhirose/cpp-httplib/master/httplib.h
```

### Installing OpenSSL (for HTTPS)

**Ubuntu/Debian:**
```bash
sudo apt-get install libssl-dev
```

**macOS:**
```bash
brew install openssl
```

**Windows:**
Download from https://slproweb.com/products/Win32OpenSSL.html

## Generating SSL Certificates

For local development, you'll need self-signed certificates:

```bash
# Generate a private key
openssl genrsa -out server.key 2048

# Generate a self-signed certificate
openssl req -new -x509 -key server.key -out server.crt -days 365 \
  -subj "/CN=localhost"
```

## Building the Server

```bash
# Compile with GCC
g++ -std=c++17 -o backend_server server.cpp -lssl -lcrypto -pthread

# Or with Clang
clang++ -std=c++17 -o backend_server server.cpp -lssl -lcrypto -pthread
```

## Running the Server

```bash
./backend_server
```

The server will start on `https://localhost:8443`

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check endpoint |
| `/api/cart` | POST | Log cart actions (add/remove/clear) |
| `/api/checkout` | POST | Submit cart checkout |
| `/api/preorder` | POST | Submit pre-order |
| `/api/wishlist` | POST | Sync wishlist data |
| `/api/newsletter` | POST | Newsletter subscription |
| `/api/contact` | POST | Contact form submission |
| `/api/tracking` | GET | Get tracking information |

## CORS Configuration

The server includes CORS headers to allow requests from your GitHub Pages site:

```cpp
res.set_header("Access-Control-Allow-Origin", "*");
res.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
res.set_header("Access-Control-Allow-Headers", "Content-Type, Accept");
```

For production, replace `*` with your actual GitHub Pages domain.

## Frontend Configuration

Update the `api.js` file in the frontend to point to your server:

```javascript
const API_CONFIG = {
  baseUrl: "https://localhost:8443",  // Your C++ server URL
  // ...
};
```

## Troubleshooting

### Self-signed certificate warning
When testing locally, your browser will show a security warning. You can:
1. Add an exception for the certificate
2. Use Chrome with `--ignore-certificate-errors` flag (development only!)
3. Install the certificate in your system's trust store

### CORS errors
Make sure your server is returning the correct CORS headers for all endpoints, including OPTIONS requests (preflight).

### Connection refused
1. Ensure the server is running
2. Check the port number (default: 8443)
3. Verify firewall settings
