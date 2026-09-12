// Beer Debt — App Store screenshot config.
// Raws come from the app repo: `scripts/screenshots.sh <iPhone 16 Pro Max udid> <dir>`
// (seeded demo ledgers, DEBUG -debugScreen launch arg), then copy into raw/ as 01..07.
// Compose:  npm run shots:compose apps/beerdebt/config.mjs
export default {
  app: 'Beer Debt',

  // 6.9" iPhone — the required App Store size; raws are native 1320x2868.
  output: { width: 1320, height: 2868, dir: 'apps/beerdebt/output' },
  raw: 'apps/beerdebt/raw',

  capture: { device: 'iPhone 16 Pro Max', bundleId: 'me.colinwatson.beerdebt' },

  theme: {
    gradientFrom: '#F7C35A',   // beer gold, light
    gradientTo: '#D99A1E',     // beer gold, deep (the + Beer button)
    gradientAngle: 160,
    captionColor: '#14201D',   // forest ink — dark on gold reads at thumbnail size
    bezel: '#0E0E0F',
    font: "-apple-system, 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  },

  // Strongest value first — ~90% of users never scroll past #3.
  screens: [
    { file: '01.png', caption: 'Every beer\ncosts a mile' },      // Home, in debt
    { file: '02.png', caption: 'Ignore it\nand it grows' },       // Beer added — interest projection
    { file: '03.png', caption: 'Runs pay\nthe tab' },             // Runs from Apple Health
    { file: '04.png', caption: 'Run extra,\nbank beers' },        // Home, credit
    { file: '05.png', caption: 'Oldest beer\npays first' },       // The Ledger
    { file: '06.png', caption: 'Clear the tab' },                 // Debt Free
    { file: '07.png', caption: 'Tune the rules' },                // Settings
  ],
};
