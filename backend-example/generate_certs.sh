#!/bin/bash
# Generate self-signed SSL certificates for local development

echo "Generating SSL certificates for local development..."

# Generate private key
openssl genrsa -out server.key 2048

# Generate self-signed certificate
openssl req -new -x509 -key server.key -out server.crt -days 365 \
  -subj "/CN=localhost/O=Keeb Cambodia/C=KH"

echo ""
echo "SSL certificates generated:"
echo "  - server.key (private key)"
echo "  - server.crt (certificate)"
echo ""
echo "You can now build and run the server:"
echo "  g++ -std=c++17 -o backend_server server.cpp -lssl -lcrypto -pthread"
echo "  ./backend_server"
