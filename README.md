# kipple-website

The public site for [Kipple](https://github.com/WPTK/Kipple), a self-hosted RSS reader. Plain HTML, CSS and a
little JavaScript. There is no build step and no dependencies.

## Files

- `index.html` is the page.
- `style.css` holds the design tokens (color schemes) and all layout.
- `theme.js` is the color scheme switcher. With no choice stored, the page follows the system: Paper by day,
  Midnight by night.
- `fonts/` holds the self-hosted fonts (Atkinson Hyperlegible Next, JetBrains Mono, Vollkorn), copied from
  `@fontsource`. All are SIL Open Font License. The site makes no third-party requests.

## Design brief

- The color values come from the app's `web/src/theme/schemes.json`: Paper, Airmail, Newsprint, Directory,
  Parchment and Midnight. Keep them in sync by hand when the app's schemes change.
- Left-aligned and asymmetric, small corner radius, no gradients, no emoji, no card grid.
- Copy is plain and specific. No em dashes, no marketing adjectives.
- No real names or hostnames anywhere. Copyright is "Kipple contributors".

## Preview

```
python -m http.server 7099 --bind 127.0.0.1
```

Then open `http://127.0.0.1:7099/`. Opening `index.html` straight from disk can drop the stylesheet in some
viewers, so use the server.

## Hosting

GitHub Pages from the `main` branch, root folder, with `kipple.cc` as the custom domain (add a `CNAME` file
containing `kipple.cc` when the DNS is ready).
