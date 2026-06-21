// Compose finished App Store / Play Store screenshots from raw device captures.
//
//   node screenshots/compose.mjs apps/strumbuddy/config.mjs
//
// Reads raw screenshots from <config.raw>, frames each on a brand gradient with
// its caption, and writes store-sized PNGs to <config.output.dir>.
import { chromium } from 'playwright';
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, extname } from 'path';
import { pathToFileURL } from 'url';
import { buildHTML } from './template.mjs';

const configPath = process.argv[2];
if (!configPath) {
  console.error('usage: node screenshots/compose.mjs <config.mjs>');
  process.exit(1);
}
const cfg = (await import(pathToFileURL(resolve(configPath)).href)).default;

const W = cfg.output.width;
const H = cfg.output.height;
const outDir = resolve(cfg.output.dir);
const rawDir = resolve(cfg.raw);
mkdirSync(outDir, { recursive: true });

const mime = (f) => (extname(f).toLowerCase() === '.jpg' || extname(f).toLowerCase() === '.jpeg' ? 'jpeg' : 'png');
const dataUri = (file) => {
  const p = resolve(rawDir, file);
  if (!existsSync(p)) throw new Error(`raw screenshot not found: ${p}`);
  return `data:image/${mime(file)};base64,${readFileSync(p).toString('base64')}`;
};

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });

let n = 0;
for (const screen of cfg.screens) {
  n += 1;
  const idx = String(n).padStart(2, '0');
  try {
    const html = buildHTML({
      width: W, height: H, caption: screen.caption,
      imgDataUri: dataUri(screen.file), theme: cfg.theme,
      captionFontPx: screen.captionFontPx,
    });
    await page.setContent(html, { waitUntil: 'load' });
    const out = `${outDir}/${idx}-${screen.file.replace(/\.(png|jpe?g)$/i, '')}.png`;
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: W, height: H } });
    console.log(`  ✓ ${out}`);
  } catch (e) {
    console.error(`  ✗ ${screen.file}: ${e.message}`);
  }
}

await browser.close();
console.log(`Done. ${n} screen(s) → ${outDir}  (${W}x${H})`);
