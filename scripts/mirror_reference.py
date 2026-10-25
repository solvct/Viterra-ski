#!/usr/bin/env python3
"""Save the published Viterra pages and their matching Framer runtime locally."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
from urllib.error import HTTPError
import html
import json
import re
import shutil
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://sincere-help-192130.framer.app"
ROUTES = ["/", "/limiteds", "/coming-soon", "/boards", "/test", "/404"]
RUNTIME = ROOT / "reference-runtime"


def fetch(url):
    request = Request(url, headers={"User-Agent": "Mozilla/5.0 ViterraLocalMirror"})
    try:
        with urlopen(request, timeout=60) as response:
            return response.read().decode("utf-8")
    except HTTPError as error:
        if error.code == 404 and urlparse(url).path.rstrip("/") == "/404":
            return error.read().decode("utf-8")
        raise


def destination(route):
    return ROOT / route.strip("/") / "index.html"


def rewrite_page(source, route, runtime_base):
    def attribute(match):
        name, quote, value = match.groups()
        if value.startswith(("#", "mailto:", "tel:", "data:", "javascript:")):
            return match.group(0)
        url = urljoin(ORIGIN + route, html.unescape(value))
        parsed = urlparse(url)
        if parsed.netloc == urlparse(ORIGIN).netloc:
            value = parsed.path or "/"
            if parsed.query:
                value += "?" + parsed.query
            if parsed.fragment:
                value += "#" + parsed.fragment
        elif url.startswith(runtime_base):
            value = "/reference-runtime/" + url[len(runtime_base):]
        return f"{name}={quote}{value}{quote}"

    source = re.sub(r'\b(href|src)=([' + "\"'" + r'])(.*?)\2', attribute, source)
    # The source analytics beacon has no bearing on the page's presentation.
    source = re.sub(r'<script\b[^>]*src="https://events\.framer\.com/[^"\n]*"[^>]*></script>', "", source)
    source = source.replace("</head>", '<link rel="stylesheet" href="/site-overrides.css">\n</head>')
    source = source.replace("</body>", '<script src="/site-overrides.js" defer></script>\n</body>')
    return source


def main():
    global ROUTES
    sitemap = ET.fromstring(fetch(ORIGIN + "/sitemap.xml"))
    ROUTES = list(dict.fromkeys(urlparse(node.text).path or "/" for node in sitemap.iter()
                              if node.tag.endswith("}loc") and node.text))
    previous_manifest_path = ROOT / "reference-manifest.json"
    previous = json.loads(previous_manifest_path.read_text()) if previous_manifest_path.exists() else {}
    switching_source = previous.get("source") and previous["source"] != ORIGIN
    source_backup = ROOT / ".backups" / urlparse(previous.get("source", "")).netloc
    if switching_source:
        source_backup.mkdir(parents=True, exist_ok=True)
        for route in previous.get("routes", []):
            src = destination(route)
            if src.exists():
                dst = source_backup / src.relative_to(ROOT)
                dst.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src, dst)
        for name in ("reference-manifest.json", "README.md", "DESIGN.md", "site-overrides.css", "site-overrides.js"):
            if (ROOT / name).exists():
                shutil.copy2(ROOT / name, source_backup / name)

    backup = ROOT / ".backups" / "previous-recreation"
    if not backup.exists():
        for route in ROUTES:
            src = destination(route)
            if src.exists():
                dst = backup / src.relative_to(ROOT)
                dst.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src, dst)
        for name in ("styles.css", "script.js", "DESIGN.md", "README.md"):
            if (ROOT / name).exists():
                shutil.copy2(ROOT / name, backup / name)

    with ThreadPoolExecutor(max_workers=6) as pool:
        pages = dict(zip(ROUTES, pool.map(lambda route: fetch(ORIGIN + route), ROUTES)))

    runtime_match = re.search(r'https://framerusercontent\.com/sites/[^/]+/', pages["/"])
    if not runtime_match:
        raise RuntimeError("Could not identify the source site's runtime directory")
    runtime_base = runtime_match.group(0)
    module_pattern = re.compile(re.escape(runtime_base) + r'[^\s\"\'<>]+?\.mjs')
    pending = {url for page in pages.values() for url in module_pattern.findall(page)}
    downloaded = {}
    while pending:
        batch = sorted(pending - downloaded.keys())
        if not batch:
            break
        with ThreadPoolExecutor(max_workers=6) as pool:
            results = list(pool.map(fetch, batch))
        pending = set()
        for url, content in zip(batch, results):
            downloaded[url] = content
            for match in re.findall(r'[\"\'`]([^\"\'`\s]+\.mjs)[\"\'`]', content):
                dependency = urljoin(url, match)
                if dependency.startswith(runtime_base) and dependency not in downloaded:
                    pending.add(dependency)

    # Once all downloads succeed, archive the previous runtime before replacing it.
    if switching_source and RUNTIME.exists():
        runtime_backup = source_backup / "reference-runtime"
        if not runtime_backup.exists():
            RUNTIME.rename(runtime_backup)
    RUNTIME.mkdir(exist_ok=True)
    for url, content in downloaded.items():
        path = RUNTIME / url[len(runtime_base):]
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content.replace(runtime_base, "/reference-runtime/"))
    for route, source in pages.items():
        path = destination(route)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(rewrite_page(source, route, runtime_base))
    if switching_source:
        for route in set(previous.get("routes", [])) - set(ROUTES):
            path = destination(route)
            if path.exists():
                path.unlink()
            directory = path.parent
            while directory != ROOT and directory.exists() and not any(directory.iterdir()):
                directory.rmdir()
                directory = directory.parent
    (ROOT / "reference-manifest.json").write_text(json.dumps({
        "source": ORIGIN,
        "runtimeSource": runtime_base,
        "routes": ROUTES,
        "runtimeModules": len(downloaded),
        "assets": "Original images and fonts retain their Framer CDN URLs.",
    }, indent=2) + "\n")
    print(f"Mirrored {len(pages)} pages and {len(downloaded)} runtime modules.")


if __name__ == "__main__":
    main()
