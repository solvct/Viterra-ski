#!/usr/bin/env python3
"""Serve the mirrored site with clean routes and its original 404 page."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
import argparse
import json

ROOT = Path(__file__).resolve().parents[1]


class SiteHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        route = urlsplit(self.path).path.rstrip("/") or "/"
        manifest = json.loads((ROOT / "reference-manifest.json").read_text())
        if route == "/404":
            self.send_error(404)
            return None
        if route in manifest["routes"]:
            original_path = self.path
            self.path = route.rstrip("/") + "/index.html"
            try:
                return super().send_head()
            finally:
                self.path = original_path
        return super().send_head()

    def send_error(self, code, message=None, explain=None):
        custom_404 = ROOT / "404" / "index.html"
        if code != 404 or not custom_404.exists():
            return super().send_error(code, message, explain)
        body = custom_404.read_bytes()
        self.send_response(404)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=4173)
    args = parser.parse_args()
    server = ThreadingHTTPServer(("127.0.0.1", args.port), partial(SiteHandler, directory=str(ROOT)))
    print(f"Viterra preview: http://127.0.0.1:{args.port}/", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
