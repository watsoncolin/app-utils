# app-utils

Reusable tooling for shipping mobile apps (iOS App Store + Google Play):

- **Screenshots** — capture raw simulator screenshots and compose high-converting
  store screenshots (device frame + brand gradient + marketing caption) at the
  exact required store sizes.
- **Icons** — generate app-icon concepts from text prompts via Runware.

One repo, many apps: per-app settings live under `apps/<app>/`.

## Setup

```sh
npm install                 # also installs the Playwright Chromium build
cp .env.example .env        # add your RUNWARE_API_KEY (only needed for icons / AI backgrounds)
```

`.env` is gitignored — never commit keys (this repo is public).

## Screenshots

Each app has a config under `apps/<app>/config.mjs` describing the output size,
the brand theme, and one entry per screen (`raw` filename + `caption`).

```sh
# 1. Capture raw screenshots from a simulator (you navigate; it captures each screen)
npm run shots:capture apps/strumbuddy/config.mjs --app /path/to/Strumbuddy.app

# 2. Compose finished store screenshots → apps/strumbuddy/output/
npm run shots:compose apps/strumbuddy/config.mjs
```

- `raw/` holds the source captures (committed). `output/` holds the deliverables
  (gitignored — regenerate any time from `raw/` + config).
- Default output is **6.9" iPhone (1320×2868)**, a required App Store size that
  Apple auto-scales to smaller devices. Change `output` in the config for iPad
  (2064×2752) or Play Store sizes.

### Design notes (why it's built this way)

- **First 3 screenshots decide installs** — ~90% of users never scroll past #3, so
  order strongest value first.
- **Captions: 3–5 words, verb + benefit**, large and high-contrast. They're also
  indexed for App Store search.
- **Never let an image model render caption text** — captions are real text drawn
  by the composer; Runware (if used) only makes backgrounds.

## Icons

```sh
npm run icons:generate apps/strumbuddy/icon.config.mjs   # → outDir/*.png
```

Pick a concept, drop it into the app's `AppIcon.appiconset` as a single opaque
1024×1024 PNG (no alpha), and Xcode derives the rest.

## Layout

```
lib/runware.mjs          shared Runware client (reads .env)
icons/generate.mjs       config-driven icon concept generator
screenshots/capture.mjs  interactive raw capture from a simulator
screenshots/compose.mjs  raw → framed + caption + gradient → store sizes
screenshots/template.mjs the HTML/CSS screenshot template (Playwright renders it)
apps/<app>/config.mjs    per-app screenshot config (theme, screens, captions)
apps/<app>/raw/          source captures
apps/<app>/output/       generated deliverables (gitignored)
```
