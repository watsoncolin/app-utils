// Interactive raw-screenshot capture from an iOS simulator.
//
//   node screenshots/capture.mjs apps/strumbuddy/config.mjs [--app /path/Foo.app]
//
// Boots a 6.9" simulator (config.capture.device, default "iPhone 16 Pro Max"),
// optionally installs/launches the app, then walks the configured screens: you
// navigate the app, press Enter, and it saves raw/<file> for each.
import { execSync } from 'child_process';
import { resolve } from 'path';
import { mkdirSync } from 'fs';
import { pathToFileURL } from 'url';
import readline from 'readline';

const configPath = process.argv[2];
if (!configPath) {
  console.error('usage: node screenshots/capture.mjs <config.mjs> [--app <path.app>]');
  process.exit(1);
}
const appFlag = process.argv.indexOf('--app');
const appPath = appFlag > -1 ? process.argv[appFlag + 1] : null;

const cfg = (await import(pathToFileURL(resolve(configPath)).href)).default;
const rawDir = resolve(cfg.raw);
mkdirSync(rawDir, { recursive: true });

const sh = (c) => execSync(c, { encoding: 'utf8' }).trim();
const deviceName = cfg.capture?.device ?? 'iPhone 16 Pro Max';
const bundleId = cfg.capture?.bundleId;

// Find (or report) a simulator UDID for the requested device name, preferring booted.
function findUdid() {
  const json = JSON.parse(sh('xcrun simctl list devices available --json'));
  let candidates = [];
  for (const runtime of Object.keys(json.devices)) {
    for (const d of json.devices[runtime]) {
      if (d.name === deviceName) candidates.push(d);
    }
  }
  if (!candidates.length) {
    throw new Error(`No "${deviceName}" simulator found. Create one in Xcode > Settings > Components, or set capture.device in the config.`);
  }
  const booted = candidates.find((d) => d.state === 'Booted');
  return (booted ?? candidates[0]).udid;
}

const udid = findUdid();
console.log(`Using simulator ${deviceName} (${udid})`);
try { sh(`xcrun simctl bootstatus ${udid} -b`); } catch { /* already booted */ }
execSync('open -a Simulator');

if (appPath) {
  console.log(`Installing ${appPath}`);
  sh(`xcrun simctl install ${udid} "${appPath}"`);
  if (bundleId) sh(`xcrun simctl launch ${udid} ${bundleId}`);
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((r) => rl.question(q, r));

for (const screen of cfg.screens) {
  await ask(`\n▶ Navigate to: "${screen.caption}"  (${screen.file})\n  Press Enter to capture…`);
  const out = `${rawDir}/${screen.file}`;
  sh(`xcrun simctl io ${udid} screenshot "${out}"`);
  console.log(`  ✓ saved ${out}`);
}
rl.close();
console.log(`\nDone. Now run:  npm run shots:compose ${configPath}`);
