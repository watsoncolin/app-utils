// Builds the HTML for one App Store / Play Store screenshot:
// a brand-gradient background, a big marketing caption, and the app screenshot
// inside a CSS-drawn device frame (no licensed frame asset needed).

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * @param {{
 *   width:number, height:number, caption:string, imgDataUri:string,
 *   theme:{ gradientFrom:string, gradientTo:string, gradientAngle?:number,
 *           captionColor:string, font:string, bezel:string },
 *   captionFontPx?:number
 * }} o
 */
export function buildHTML(o) {
  const { width: W, height: H, caption, imgDataUri, theme } = o;
  const angle = theme.gradientAngle ?? 160;
  const pad = Math.round(W * 0.08);
  const captionSize = o.captionFontPx ?? Math.round(W * 0.072);
  const phoneW = Math.round(W * 0.74);
  const radius = Math.round(phoneW * 0.13);
  const bezelW = Math.round(phoneW * 0.035);
  const screenRadius = radius - bezelW;
  const shadowY = Math.round(W * 0.025);
  const shadowBlur = Math.round(W * 0.06);
  const islandW = Math.round(phoneW * 0.30);
  const islandH = Math.round(phoneW * 0.075);

  return `<!doctype html><html><head><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:${W}px;height:${H}px}
  .canvas{width:${W}px;height:${H}px;display:flex;flex-direction:column;align-items:center;
    background:linear-gradient(${angle}deg, ${theme.gradientFrom}, ${theme.gradientTo});
    font-family:${theme.font};overflow:hidden}
  .caption{color:${theme.captionColor};font-weight:800;text-align:center;
    font-size:${captionSize}px;line-height:1.06;letter-spacing:-0.02em;
    padding:${pad}px ${pad}px ${Math.round(pad * 0.55)}px;
    max-width:${Math.round(W * 0.88)}px;
    text-shadow:0 2px 12px rgba(0,0,0,0.10)}
  .phone{position:relative;width:${phoneW}px;background:${theme.bezel};
    border-radius:${radius}px;padding:${bezelW}px;
    box-shadow:0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,0.28);
    margin-top:auto;transform:translateY(${Math.round(H * 0.045)}px)}
  .screen{display:block;width:100%;border-radius:${screenRadius}px}
  .island{position:absolute;top:${Math.round(bezelW * 1.6)}px;left:50%;
    transform:translateX(-50%);width:${islandW}px;height:${islandH}px;
    background:#000;border-radius:999px;z-index:2}
  </style></head><body>
    <div class="canvas">
      <div class="caption">${esc(caption).replace(/\n/g, '<br>')}</div>
      <div class="phone"><div class="island"></div>
        <img class="screen" src="${imgDataUri}"></div>
    </div>
  </body></html>`;
}
