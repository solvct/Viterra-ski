# Viterra Ski

A local snapshot of the corrected reference: https://sincere-help-192130.framer.app/.

The six pages use the published site's generated HTML, CSS, typography, images, layout, and Framer animation code. All 24 matching runtime modules are stored in `reference-runtime/`. Original images and fonts use the public Framer CDN and require internet access.

## Preview

```sh
python3 scripts/serve.py
```

Open http://127.0.0.1:4173/ in any browser on this computer. Keep the server running while browsing. The preview supports the source's clean URLs and custom 404 page.

## Pages

- `/` — Viterra home, hero, FAQ, and footer
- `/limiteds` — Limited collection
- `/boards` — Boards collection
- `/coming-soon` — Coming Soon page
- `/test` — Original test page
- `/404` — Original custom error page

The complete inventory and source identifier are in `reference-manifest.json`.

## Editing and backups

Each route has an `index.html`. Add visual adjustments to `site-overrides.css` and local interactions to `site-overrides.js`. The matching compiled site code is in `reference-runtime/`.

The prior reference is preserved in `.backups/knowledgeable-flows-081394.framer.app/`, including its pages and runtime. The first hand-written approximation is preserved in `.backups/previous-recreation/`. Root `styles.css` and `script.js` are older files and are no longer loaded.

To deliberately refresh the snapshot from the corrected published site, run `python3 scripts/mirror_reference.py` with network access. This discovers routes from its sitemap and overwrites mirrored pages/runtime while preserving the local override files.
