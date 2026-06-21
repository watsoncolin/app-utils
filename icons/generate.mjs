// Config-driven app-icon concept generator (Runware). Generalizes the per-app
// one-off scripts: point it at a config that lists named prompts.
//
//   node icons/generate.mjs apps/strumbuddy/icon.config.mjs
//
// Config shape (default export):
//   { outDir, model?, size?, steps?, concepts: [{ name, prompt }] }
import { pathToFileURL } from 'url';
import { resolve } from 'path';
import { generateToFile } from '../lib/runware.mjs';

const configPath = process.argv[2];
if (!configPath) {
  console.error('usage: node icons/generate.mjs <config.mjs>');
  process.exit(1);
}

const cfg = (await import(pathToFileURL(resolve(configPath)).href)).default;
const { outDir, model, size = 1024, steps = 30, concepts = [] } = cfg;
if (!outDir || !concepts.length) throw new Error('config needs { outDir, concepts:[...] }');

console.log(`Generating ${concepts.length} icon concept(s) → ${outDir}`);
const results = await Promise.allSettled(concepts.map(async ({ name, prompt }) => {
  const path = `${outDir}/${name}.png`;
  const bytes = await generateToFile(path, { prompt, width: size, height: size, model, steps });
  console.log(`  ✓ ${path} (${bytes} bytes)`);
}));
results.forEach((r, i) => {
  if (r.status === 'rejected') console.error(`  ✗ ${concepts[i].name}: ${r.reason?.message ?? r.reason}`);
});
console.log('Done.');
