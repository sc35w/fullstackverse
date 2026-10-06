#!/usr/bin/env node
// Captures portfolio images from each project's live demo dashboard.
//
// Usage:  npm run dev            (in another terminal)
//         npm run screens        (or: node tools/dashboards/capture_screens.mjs [slug ...])
//
// Writes public/portfolio/<slug>-<n>.webp for every dashboard view n (1-based)
// and <slug>-<n>-sm.webp card thumbnails. Which view is used where is set per
// project in src/lib/portfolio.js (`shots`).
// Needs a Chromium build: set CHROME_PATH, or install one with
// `npx playwright-core install chromium`. Resizing uses Python + Pillow.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { chromium } from 'playwright-core';
import { projects } from '../../src/lib/portfolio.js';

const ROOT = resolve(import.meta.dirname, '../..');
const OUT = join(ROOT, 'public/portfolio');
const BASE = process.env.SITE_URL || 'http://localhost:5173';

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const cache = join(homedir(), '.cache/ms-playwright');
  const dir = existsSync(cache) && readdirSync(cache).find((d) => /^chromium-\d+$/.test(d));
  return dir ? join(cache, dir, 'chrome-linux64/chrome') : undefined;
}

const only = process.argv.slice(2);
const list = only.length ? projects.filter((p) => only.includes(p.slug)) : projects;
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: findChrome(), args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 });
const raw = [];

for (const p of list) {
  await page.goto(`${BASE}/portfolio/${p.slug}`, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: '.site-header,.floating-whatsapp{display:none!important}.reveal{opacity:1!important;transform:none!important}' });
  const shell = page.locator('[data-dashboard]');
  await shell.waitFor();
  await shell.scrollIntoViewIfNeeded();
  const tabs = shell.locator('aside nav button');
  const count = await tabs.count();
  for (let i = 0; i < count; i++) {
    await tabs.nth(i).click();
    await page.waitForTimeout(900);
    const file = join(tmpdir(), `${p.slug}-${i + 1}.png`);
    await shell.screenshot({ path: file });
    raw.push([file, p.slug, i + 1]);
  }
  console.log('captured', p.slug);
}
await browser.close();

// Crop to 16:10 from the top, then write WebP sizes.
execFileSync('python3', ['-c', `
import sys, json
from PIL import Image
for src, slug, n in json.loads(sys.argv[1]):
    im = Image.open(src).convert('RGB')
    h = min(im.height, round(im.width * 10 / 16))
    im = im.crop((0, 0, im.width, h))
    def save(width, path, q):
        im.resize((width, round(h * width / im.width)), Image.LANCZOS).save(path, 'WEBP', quality=q, method=6)
    save(1600, f'${OUT}/{slug}-{n}.webp', 80)
    save(880, f'${OUT}/{slug}-{n}-sm.webp', 78)
`, JSON.stringify(raw)], { stdio: 'inherit' });
// Keep only the views used by the site: hero (full + card size) and feature.
const keep = new Set(projects.flatMap((p) => [`${p.slug}-${p.shots.hero}.webp`, `${p.slug}-${p.shots.hero}-sm.webp`, `${p.slug}-${p.shots.feature}.webp`]));
const removed = readdirSync(OUT).filter((f) => f.endsWith('.webp') && !keep.has(f));
removed.forEach((f) => unlinkSync(join(OUT, f)));
console.log(`wrote ${raw.length} views; kept ${keep.size} images in public/portfolio/ (removed ${removed.length} unused)`);
