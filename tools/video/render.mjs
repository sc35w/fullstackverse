// Renders tools/video/robotics-workshop.html to public/videos/robotics-workshop.mp4
// (plus a poster .webp) by calling window.render(t) for every frame and piping
// screenshots to ffmpeg.   Usage: node tools/video/render.mjs [--fps 30]
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const src = path.join(root, 'tools/video/robotics-workshop.html');
const outDir = path.join(root, 'public/videos');
const out = path.join(outDir, 'robotics-workshop.mp4');
const poster = path.join(outDir, 'robotics-workshop-poster.webp');
const fps = Number(process.argv[process.argv.indexOf('--fps') + 1]) || 30;

const chrome = [
  process.env.CHROME_PATH,
  path.join(homedir(), '.cache/ms-playwright/chromium-1243/chrome-linux64/chrome'),
].find((p) => p && existsSync(p));

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: chrome });
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(pathToFileURL(src).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const duration = await page.evaluate(() => window.DURATION);

const ff = spawn('ffmpeg', [
  '-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '22', '-pix_fmt', 'yuv420p',
  '-tune', 'animation', '-movflags', '+faststart', out,
], { stdio: ['pipe', 'inherit', 'inherit'] });

const total = Math.round(duration * fps);
for (let i = 0; i < total; i++) {
  await page.evaluate((t) => window.render(t), i / fps);
  const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
  if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
  if (i % fps === 0) process.stdout.write(`\r${Math.round((i / total) * 100)}%`);
}
ff.stdin.end();
await new Promise((r, j) => ff.on('close', (c) => (c ? j(new Error(`ffmpeg exited ${c}`)) : r())));

// Poster: the title frame once the robot is assembled.
await page.evaluate(() => window.render(4));
await page.screenshot({ path: poster.replace(/\.webp$/, '.png') });
await browser.close();
const cv = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-i', poster.replace(/\.webp$/, '.png'), '-vf', 'scale=1280:-1', '-quality', '82', poster], { stdio: 'inherit' });
await new Promise((r) => cv.on('close', r));
const { rmSync } = await import('node:fs');
rmSync(poster.replace(/\.webp$/, '.png'));
console.log(`\rWrote ${path.relative(root, out)} (${total} frames) and ${path.relative(root, poster)}`);
