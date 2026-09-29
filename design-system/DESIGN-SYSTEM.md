# Kipple site design system

Exact specification of the Kipple site as built in `style.css` and `index.html`. Every value is copied from
those files. Nothing here is inferred. `tokens.json` holds the same values in the W3C design-tokens format
(importable into Figma through the Tokens Studio plugin). rem values assume the browser default 16px root.

If this file and `style.css` disagree, `style.css` wins, and this file is wrong.

## 1. What the site is

A one-page static site for Kipple, a self-hosted RSS reader. Plain HTML, CSS and a small script. No build
step, no framework, no third-party requests. Hosted on GitHub Pages at kipple.cc.

Look, in the author's terms: it should look good, read like a plain-spoken README, and share its color schemes
with the app. Left-aligned, asymmetric, small corner radius, no gradients (except the Airmail stripe), no
emoji, no card grid, no accent bars on cards, nothing centered.

## 2. Fonts

All self-hosted from `fonts/`, copied from `@fontsource`. All SIL Open Font License. `font-display: swap`.

| Role | Family | Files | Weights | Fallback stack |
|---|---|---|---|---|
| Text and UI | Atkinson Hyperlegible Next | `atkinson-hyperlegible-next-latin-400-normal.woff2`, `-600-`, `-700-` | 400, 600, 700 | `"Atkinson Hyperlegible", system-ui, sans-serif` |
| Code, data, labels | JetBrains Mono (variable) | `jetbrains-mono-latin-wght-normal.woff2` | 100 to 800 | `ui-monospace, "SF Mono", Menlo, monospace` |
| Wordmark and the word "kipple" in the definition | Vollkorn (variable) | `vollkorn-latin-wght-normal.woff2` | 400 to 900 (600 used) | `Georgia, serif` |

Latin subset only. Preload: `atkinson-hyperlegible-next-latin-400-normal.woff2`.

## 3. Type scale (px at 16px root)

| Use | Family | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|---|
| Body | Atkinson | 17px (1.0625rem) | 400 | 1.6 | normal |
| H1 (hero) | Atkinson | `clamp(2.4rem, 5vw, 3.6rem)` = 38.4px to 57.6px | 700 | 1.15 | -0.025em |
| H2 (section titles) | Atkinson | 24px (1.5rem) | 700 | 1.15 | -0.01em |
| Wordmark | Vollkorn | 28px (1.75rem) | 600 | inherits 1.6 | -0.01em |
| Nav links | Atkinson | 15.2px (0.95rem) | 400 | 1.6 | normal |
| Scheme buttons | Atkinson | 13px (0.8125rem) | 400 | 1.6 | normal |
| Button labels (`.btn`) | Atkinson | inherits 17px | 600 | 1.6 | normal |
| Unread count (panel) | JetBrains Mono | `clamp(2.6rem, 6vw, 4.25rem)` = 41.6px to 68px | 700 | 1 | -0.04em |
| Unread label (panel) | Atkinson | 14px (0.875rem) | 400 | 1.6 | normal |
| Feed row name | Atkinson | 15.2px (0.95rem) | 400 | 1.6 | normal |
| Feed row count | JetBrains Mono | 15.2px (inherits from row) | 400, or 700 when `.hot` | 1.6 | normal |
| Definition text | Atkinson | 15.2px (0.95rem) | 400 | 1.6 | normal |
| Definition term "kipple" | Vollkorn | 18.4px (1.15rem) | 600 | 1.6 | normal |
| Definition IPA | JetBrains Mono | 13px (0.8125rem) | 400 | 1.6 | normal |
| Fact label (`dt`) | JetBrains Mono | 13px (0.8125rem) | 400 | 1.6 | normal |
| Fact text (`dd`) | Atkinson | 17px | 400 | 1.6 | normal |
| Anti-feature list | Atkinson | 18.4px (1.15rem) | 400 | 1.6 | normal |
| Anti-feature mark (the cross) | JetBrains Mono | 13px (0.8125rem) | 400 | 1.6 | normal |
| Code block | JetBrains Mono | 14px (0.875rem) | 400 | 1.7 | normal |
| Text after code block | Atkinson | 15.2px (0.95rem) | 400 | 1.6 | normal |
| Status version tag | JetBrains Mono | 14.4px (0.9rem) | 400 | 1.6 | normal |
| Footer | Atkinson | 14px (0.875rem) | 400 | 1.6 | normal |

Headings use `text-wrap: balance`. Numeric columns use `font-variant-numeric: tabular-nums` (unread count and
feed row counts).

## 4. Colors

Seven roles per scheme. Color schemes are applied with the attribute `data-scheme` on `<html>`.

| Role (CSS variable) | Used for |
|---|---|
| `--bg` | Page background |
| `--surface` | Sample panel and code block background |
| `--ink` | Body text, headings, wordmark, nav links |
| `--muted` | Secondary text: labels, definition, footer, scheme button text, feed counts (not hot) |
| `--line` | All 1px borders and dividers |
| `--accent` | Links, primary button fill, active scheme button fill, unread count, hot feed counts, focus ring |
| `--on-accent` | Text on an accent fill |

| Scheme | kind | bg | surface | ink | muted | line | accent | on-accent |
|---|---|---|---|---|---|---|---|---|
| Paper | light | `#ffffff` | `#f2f5f9` | `#16181d` | `#566070` | `#d8dde5` | `#1a5fb4` | `#ffffff` |
| Airmail | light | `#e2ecf5` | `#d2e0ee` | `#10202f` | `#465b70` | `#b6c9db` | `#1c5490` | `#ffffff` |
| Newsprint | light | `#e6e5e1` | `#dbdad5` | `#1f1f1d` | `#4d4d49` | `#c4c3bd` | `#2c5d8f` | `#ffffff` |
| Directory | light | `#dcead6` | `#cfe2c8` | `#1f2d1b` | `#3e5237` | `#b8cfae` | `#1f6b3a` | `#ffffff` |
| Parchment | light | `#f4ecd8` | `#ece2c8` | `#4a3b28` | `#6b5a42` | `#d9cba8` | `#8a4b14` | `#fff8ea` |
| Midnight | dark | `#000000` | `#0e0e10` | `#f0f0f0` | `#8f8f96` | `#222226` | `#6db0ff` | `#06192e` |

**Airmail edge.** Only Airmail has a decorated header edge: the header's bottom border is 7px tall and uses
`repeating-linear-gradient(135deg, #c8372d 0 14px, #e2ecf5 14px 22px, #1c5490 22px 36px, #e2ecf5 36px 44px)`
(red, gap, blue, gap). Every other scheme uses a 1px solid `--line` border.

**Source of the values.** Newsprint, Directory, Parchment and Midnight `bg`, `ink` (text), `muted` (text2),
`line` (border), `accent` and `surface` are the app's own values from `web/src/theme/schemes.json`. Paper and
Airmail in this site are *site-specific* and do not match the app: the app's Paper `surface` is `#f6f6f4`
(this site uses `#f2f5f9`), its `text` is `#1b1b1a` (site `#16181d`), `text2` is `#5c5c58` (site `#566070`) and
`border` is `#dcdcd8` (site `#d8dde5`). The Airmail values `surface`, `ink`, `muted` and `line` were chosen for
the site and were not taken from the app. If parity with the app matters, decide which wins.

### Default scheme selection

- No choice stored: follow the system. Light system = Paper. Dark system = Midnight
  (`@media (prefers-color-scheme: dark)` on `:root:not([data-scheme])`).
- A choice sets `data-scheme` on `<html>` and overrides the system.
- The "Auto" button clears the attribute and the stored choice.

## 5. Layout

- Content column: `max-width: 68rem` (1088px), centered with `margin-inline: auto`, with `padding-inline:
  1.25rem` (20px) on both sides at every width.
- Single breakpoint: `max-width: 52rem` (832px). At or below it every two-column grid becomes one column.
- `box-sizing: border-box` on everything.
- Body: margin 0, `--bg` background, `--ink` text, Atkinson 17px, line height 1.6.

### Page order (top to bottom)

1. Header
2. Hero
3. "What it looks like" (section, id `screens`)
4. "Why another RSS reader" (section)
5. "How it works" (section)
6. "Anti-features" (section)
7. "Bring your own client" (section)
8. "Build it" (section, id `install`)
9. "Where it stands" (section)
10. Footer

## 6. Components

### Header (`.top`)
- Border bottom: `var(--edge-h)` (1px, or 7px on Airmail), `border-image: var(--edge) 1`.
- Inner `.wrap`: flex, wrap, `align-items: center`, gap 0.75rem (12px) row and 1.5rem (24px) column,
  `padding-block: 1rem` (16px).
- Wordmark (`.mark`): the lowercase word "kipple", Vollkorn 28px 600, `--ink`, no underline, `margin-right:
  auto` (pushes the rest right).
- Nav (`.nav`): flex, gap 1.25rem (20px), 15.2px. Links `--ink`, no underline, `--accent` on hover.
  Items: Install (`#install`), Changelog, GitHub.
- Scheme switcher (`.schemes`): flex, wrap, gap 0.25rem (4px). Buttons, in order: Auto, Paper, Airmail,
  Newsprint, Directory, Parchment, Midnight.
  - Button: font 13px inherited family, `--muted` text, transparent background, `1px solid --line` border,
    radius 3px, padding 0.2rem 0.55rem (3.2px 8.8px), pointer cursor.
  - Pressed (`aria-pressed="true"`): `--on-accent` text, `--accent` background and border.

### Hero (`.hero`)
- Padding block: 3.5rem (56px) top, 4rem (64px) bottom. Mobile (at or below 832px): 2.25rem (36px) top, 2.5rem
  (40px) bottom.
- Grid: two columns `minmax(0, 5fr) minmax(0, 6fr)`, gap 3rem (48px), `align-items: start`. Mobile: one column,
  gap 2rem (32px).
- Left column: H1, lede, buttons, definition. Right column: the sample panel.
- H1 has no margin.
- Lede (`.lede`): margin-top 1.25rem (20px), max width 32rem (512px).
- Buttons row (`.cta`): flex, wrap, gap 0.75rem (12px), margin-top 1.75rem (28px).
  - `.btn`: weight 600, no underline, padding 0.65rem 1.1rem (10.4px 17.6px), radius 3px, `1px solid
    --accent`.
  - `.btn.primary`: `--accent` background, `--on-accent` text.
  - `.btn.plain`: `--accent` text, transparent background.
- Definition (`.defn`): margin-top 2.5rem (40px), padding-top 1rem (16px), `1px solid --line` top border,
  max width 30rem (480px), 15.2px, `--muted`.

### Sample panel (`.panel`)
A static drawing of the reader's feed list. Border `1px solid --line`, radius 4px, `--surface` background,
`overflow: hidden`.
- Head: flex, `justify-content: space-between`, `align-items: baseline`, gap 1rem (16px), padding 1.1rem 1.25rem
  0.9rem (17.6px 20px 14.4px), `1px solid --line` bottom border. Contains the big count (`--accent`) and a
  right-aligned label (14px, `--muted`).
- List (`.feeds`): no bullets, no margin, no padding. Each row: flex, `justify-content: space-between`, gap 1rem,
  padding 0.55rem 1.25rem (8.8px 20px), `1px solid --line` bottom border (none on the last row), 15.2px.
  Row count is JetBrains Mono, tabular numerals, `--muted`. The first two rows have class `hot`: count is
  `--accent` and weight 700.
- There is no caption or footnote under the panel.

### Content sections (`.sect`)
- Top border `1px solid --line`, padding-block 3rem (48px) (2.25rem or 36px on mobile).
- Grid: two columns `minmax(0, 5fr) minmax(0, 7fr)`, gap 1.5rem (24px) row and 3rem (48px) column,
  `align-items: start`. Mobile: one column, gap 2rem.
- Left cell holds the H2 (and optionally one muted paragraph). Right cell holds the content.
- A paragraph directly after an H2: margin-top 0.75rem (12px), `--muted`, max width 26rem (416px).
- Story text (`.story`) and client text (`.clients`): grid, gap 1rem, max width 36rem (576px), paragraphs with
  no margin.

### Screenshots (`.shots`)
Uses the content-section grid. Left cell: the H2 "What it looks like". Right cell: a note paragraph (`.shots-note`,
`--muted`, max width 32rem, aligned to the bottom of the row on desktop). Then two full-width rows.
- Row 1 (`figure.shot.wide`): `screenshots/desktop-paper.webp`, 1800 x 1125, full column width.
- Row 2 (`.shot-row`): grid with columns `minmax(0, 2fr) minmax(0, 0.6fr) minmax(0, 0.6fr)`, gap 1.5rem (24px),
  `align-items: start`. Cells: `desktop-midnight.webp` (1800 x 1125), `phone-paper-reader.webp` (585 x 1266),
  `phone-midnight-list.webp` (585 x 1266).
- Every image: `display: block`, width 100%, height auto, `1px solid --line` border, radius 4px, no shadow, no
  device frame. Each has descriptive alt text and explicit width and height attributes.
- At or below 832px: `.shot-row` becomes two columns with gap 1rem (16px), and the first figure (the dark desktop
  shot) spans both columns, so the two phones sit side by side beneath it.
- Note copy: `The web app in Paper and Midnight, on desktop and on a phone. The sample feeds are public ones, including the Wikimedia Commons picture of the day. Photo credits and licenses are on Commons.`

### Fact list (`dl.facts`)
- Grid, gap 1.1rem (17.6px), no margin.
- Each row: grid with columns `7.5rem` (120px) and `minmax(0, 1fr)`, gap 0.5rem (8px) row and 1rem (16px)
  column. Mobile: one column, gap 0.1rem (1.6px).
- Label (`dt`): JetBrains Mono 13px, `--muted`, padding-top 0.2rem (3.2px). Text (`dd`): no margin.
- Rows, in order: refresh, retention, sync, themes, fonts, stats.

### Anti-feature list (`ul.plain`)
- No bullets, no margin or padding, grid gap 0.35rem (5.6px), 18.4px.
- Each item has a cross mark before it: the character U+2715, JetBrains Mono 13px, `--muted`, 0.75rem (12px) of
  space after it.
- Items: No AI / No notifications / No social / No monitoring or telemetry*
- Footnote under the list uses the "text after code block" style (15.2px, `--muted`, margin-top 1rem).

### Code block (`pre`)
- Padding 1rem 1.15rem (16px 18.4px), `--surface` background, `1px solid --line` border, radius 3px,
  `overflow-x: auto`, JetBrains Mono 14px, line height 1.7. Comment lines (`.c`) are `--muted`.
- Inline `code` in text uses JetBrains Mono at the surrounding size. In the text after a code block, `code` is
  `--ink`.

### Footer
- Top border `1px solid --line`, padding-block 2rem (32px) 3rem (48px), 14px, `--muted`.
- Inner `.wrap`: flex, wrap, gap 0.5rem (8px) row and 2rem (32px) column, `justify-content: space-between`.
- Left: license sentence. Right: Source, History, wptk.org links separated by a middle dot.

### Links and focus
- Links: `--accent`, `text-underline-offset: 0.18em`; on hover `text-decoration-thickness: 2px`.
- Keyboard focus: `outline: 2px solid --accent; outline-offset: 3px`.

### Motion
Only `.btn` and `.nav a` transition `background-color` and `color`, 120ms, and only when the user has not asked
for reduced motion. No other animation.

## 7. Behavior

- Scheme switcher script (`theme.js`, about 30 lines, no dependencies). On load it reads `localStorage` key
  `kipple-scheme`. A saved value sets `data-scheme` on `<html>`. Clicking a button sets or clears it and writes
  or removes the key. Every read and write is wrapped in try/catch, and the page works with storage unavailable.
- Buttons expose state with `aria-pressed`.
- Anchor `#install` scrolls to the Build it section.

## 8. Content (exact copy as of this commit)

- Title: `Kipple, a self-hosted RSS reader`
- Description: `Self-hosted RSS reader that syncs with any RSS client that speaks the Google Reader API. One container, one port, SQLite.`
- H1: `Self-hosted RSS reader.`
- Lede: `Kipple syncs with the RSS apps you already use, keeps everything in SQLite, and runs as one container on one port. It's built to look good while you read.`
- Buttons: `View on GitHub` (primary, https://github.com/WPTK/Kipple), `Build it` (plain, `#install`)
- Definition: `kipple /ˈkɪpəl/ n. Philip K. Dick's word for the useless things that pile up when nobody is looking. Your unread count, mostly.`
- Sample panel: big count `420`, label `unread across 6 feeds`. Feeds and counts: Unsung 187, 512 Pixels 101, Storied
  Colors 69, Electrek 42, McSweeney's 13, Saturday Down South 8. The counts total 420. Rows 1 and 2 are `hot`.
- Section headings: What it looks like / Why another RSS reader / How it works / Anti-features / Bring your own client / Build it /
  Where it stands.
- Footer: `The Kipple app is licensed under the Blue Oak Model License 1.0.0. This site is in the public domain under the Unlicense.` (each license name is a link), then links Source, History, wptk.org.
- `index.html` is the canonical copy for every sentence. Do not paraphrase it when rebuilding.

## 9. Copy rules

- Plain and specific. Short sentences. State what it does, with real numbers and paths.
- No em dashes, no colon-as-connector, no "not X but Y", no marketing adjectives, no emoji.
- Do not name other RSS readers or apps anywhere.
- No real names or hostnames. Copyright line reads "Kipple contributors".
- The site says a published Docker image is planned but not out yet. Change that line when an image ships.

## 10. Assets and links

- Fonts: `fonts/` (five files, section 2).
- Links: https://github.com/WPTK/Kipple (source, changelog at `blob/main/CHANGELOG.md`, license at
  `blob/main/LICENSE`, deploy notes at `blob/main/docs/deploy.md`), https://github.com/WPTK/kipple-history,
  https://wptk.org.
- `screenshots/`: four WebP files listed in the Screenshots component. Captured from a throwaway instance of the app
  by the app repo's `web/scripts/site-shots.mjs` (run at every release, `docs/RELEASING.md` step 12), after
  `KIPPLE_SEED_SET=site npm run seed`, which seeds Wikimedia Picture of the Day, Wikipedia Featured Article, NASA
  Image of the Day, Go Blog and Hacker News in a folder named "Less noise". Last captured 2026-09-29 at app commit
  `46da6a6` (`v0.3.0-beta.3`). Desktop: a 1440 x 900 viewport at 1.25x, giving 1800 x 1125 directly. Phone: 390 x 844
  at 1.5x, giving 585 x 1266. The list uses the device's default layout (Editorial). Light is the app's Paper scheme.
  Dark is the app following a dark system setting, which gives Midnight. Article shown: the Wikimedia Commons picture
  of the day for September 29 (the ceiling painting in the Vatican Museums). The WebP files are encoded by the browser
  at quality 0.85. `og.png` is re-rendered by the same script from `design-system/social-preview.html`.
- The hero sample panel (unread count 420) is HTML and CSS, not a screenshot.
- Favicon: `favicon.svg`, `favicon.ico` (16, 32 and 48 px), `apple-touch-icon.png` (180 x 180).
  The mark is the lowercase letter "k" from Vollkorn at weight 600, converted to a vector outline (no live text),
  filling a 64 x 64 viewBox 44 units tall and centered. No background shape, no rounding, no gradient. Fill is
  `#1a5fb4` in light and `#6db0ff` when the system is dark (SVG only, through `prefers-color-scheme`). The ICO is
  transparent. The apple-touch icon is `#1a5fb4` on `#ffffff`.
- Social preview: `og.png`, 1280 x 640. Source is `design-system/social-preview.html`. White (`#ffffff`)
  background. The word "kipple" in Vollkorn 600 at 168px, `#16181d`, left 80px, top 92px. The line "Self-hosted RSS reader."
  in Atkinson Hyperlegible Next 700 at 58px, line height 1.12, letter spacing -0.025em, `#16181d`, in a 440px column at
  left 84px, top 300px. "kipple.cc" in JetBrains Mono at 26px, `#1a5fb4`, left 84px, 76px from the bottom. The
  `desktop-paper.webp` screenshot at 900px wide, left 600px, top 96px, `1px solid #d8dde5`, radius 4px, cut off by the right
  and bottom edges. Referenced by `og:image` at `https://kipple.cc/og.png`. GitHub's own social preview is a separate
  upload in the repo settings (Settings, General, Social preview) and must be set by hand.
- Licenses: the Kipple app is Blue Oak Model License 1.0.0. This site is the Unlicense (public domain). Fonts: SIL Open Font License.

## 11. Known gaps

- Only the default Paper scheme was looked at in a browser by the assistant that wrote this file. The author has
  looked at the other schemes in a browser and found them good.
- Paper and Airmail differ from the app's schemes (section 4).
- The screenshots use public sample feeds, not a real reading list, and show whatever those feeds published on the day
  they were captured.
- The GitHub repo social preview image has to be uploaded by hand.
