// Strumbuddy — App Store screenshot config.
// Capture:  npm run shots:capture apps/strumbuddy/config.mjs --app <Strumbuddy.app>
// Compose:  npm run shots:compose apps/strumbuddy/config.mjs
export default {
  app: 'Strumbuddy',

  // 6.9" iPhone — a required App Store size (iPhone 16 Pro Max native = 1320x2868).
  output: { width: 1320, height: 2868, dir: 'apps/strumbuddy/output' },
  raw: 'apps/strumbuddy/raw',

  capture: { device: 'iPhone 16 Pro Max', bundleId: 'me.colinwatson.strumbuddy' },

  theme: {
    gradientFrom: '#F4A463',   // light coral
    gradientTo: '#D8733E',     // brand accent coral
    gradientAngle: 160,
    captionColor: '#FFFFFF',
    bezel: '#0E0E0F',
    font: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },

  // Strongest value first — ~90% of users never scroll past #3.
  screens: [
    { file: '01.png', caption: 'Your guitar coach\nthat listens' },
    { file: '02.png', caption: 'Feedback on\nevery string' },
    { file: '03.png', caption: 'Know what to\npractice next' },
    { file: '04.png', caption: 'Five minutes a day' },
    { file: '05.png', caption: 'Tune in seconds' },
    { file: '06.png', caption: 'Watch every\nskill grow' },
  ],
};
