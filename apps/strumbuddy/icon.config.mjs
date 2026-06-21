// Strumbuddy — app-icon concept generator config.
//   npm run icons:generate apps/strumbuddy/icon.config.mjs
// The shipped icon is the "pick + equalizer waveform" mark on brand coral.
const COMMON =
  'mobile app icon, bold simple iconic design, one large guitar pick (plectrum) ' +
  'as the single centered subject filling most of the frame, the sound wave sits ' +
  'entirely inside the pick outline, flat solid warm coral background, high ' +
  'contrast, clean modern illustration, soft studio lighting, subtle depth, warm ' +
  'coral-orange and cream and honey-wood palette, square 1:1, no rounded corners, ' +
  'no border, no frame, no text, no watermark, no letters, NOT concentric circles, ' +
  'no ripples';

export default {
  outDir: '/tmp/strumbuddy-icon-concepts',
  size: 1024,
  steps: 30,
  concepts: [
    {
      name: 'pick-eq',
      prompt: `A cream guitar pick centered, with an audio equalizer waveform inside it — ` +
        `a row of vertical coral bars of varying heights, ${COMMON}`,
    },
  ],
};
