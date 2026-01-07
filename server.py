#!/usr/bin/env python3
"""
Einfacher HTTP-Server mit korrekten MIME-Types für ES6-Module
Für Transparentes Villach
"""

import http.server
import socketserver
from pathlib import Path

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom Handler mit korrekten MIME-Types für JavaScript-Module"""
    
    def end_headers(self):
        # CORS-Header für lokale Entwicklung
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def guess_type(self, path):
        """Überschreibe MIME-Type Detection für .js und .mjs Dateien"""
        mimetype = super().guess_type(path)
        
        # Korrekter MIME-Type für JavaScript-Module
        if path.endswith('.js') or path.endswith('.mjs'):
            return 'application/javascript'
        
        # Korrekter MIME-Type für JSON
        if path.endswith('.json'):
            return 'application/json'
        
        # Korrekter MIME-Type für CSS
        if path.endswith('.css'):
            return 'text/css'
        
        return mimetype

def run_server():
    """Startet den HTTP-Server"""
    Handler = MyHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("=" * 50)
        print("  Transparentes Villach - Development Server")
        print("=" * 50)
        print()
        print(f"Server läuft auf:")
        print(f"  http://localhost:{PORT}")
        print()
        print("Öffnen Sie diese URLs im Browser:")
        print(f"  http://localhost:{PORT}/index.html")
        print(f"  http://localhost:{PORT}/pages/blog.html")
        print(f"  http://localhost:{PORT}/pages/kontakt.html")
        print()
        print("Drücken Sie Ctrl+C zum Beenden")
        print()
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nServer wird beendet...")
            httpd.shutdown()

if __name__ == "__main__":
    run_server()
