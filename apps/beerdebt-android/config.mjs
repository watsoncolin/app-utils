// Beer Debt (Android) — Google Play screenshot config.
// Raws come from beer-debt-android: `scripts/screenshots.sh` (Pixel 6 AVD,
// 1080x2400), copied into raw/ as 01..07. Same captions as the iOS set.
// Compose:  npm run shots:compose apps/beerdebt-android/config.mjs
export default {
  app: 'Beer Debt',

  // Play phone screenshots: 9:16, each side 320–3840 px, long side ≤ 2× the short side.
  output: { width: 1080, height: 1920, dir: 'apps/beerdebt-android/output' },
  raw: 'apps/beerdebt-android/raw',

  theme: {
    gradientFrom: '#F7C35A',
    gradientTo: '#D99A1E',
    gradientAngle: 160,
    captionColor: '#14201D',
    bezel: '#0E0E0F',
    island: false,             // Android: no Dynamic Island cut-out
    font: "Roboto, 'Google Sans', -apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  },

  screens: [
    { file: '01.png', caption: 'Drink now.\nRun later.' },          // Home, in debt
    { file: '02.png', caption: 'Procrastinate,\nrun farther.' },    // Beer added
    { file: '03.png', caption: 'Run it off.' },                      // Runs from Health Connect
    { file: '04.png', caption: 'Run first,\ndrink guilt-free.' },   // Home, credit banked
    { file: '05.png', caption: 'Every beer,\nremembered.' },        // Your Debt
    { file: '06.png', caption: 'All paid up.\nCheers!' },           // Debt Free
    { file: '07.png', caption: 'Make your\nown rules.' },           // Settings
  ],
};
