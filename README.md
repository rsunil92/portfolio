# UX Designer Portfolio

A simple, LinkedIn-style portfolio page for a UX designer with 8 years of experience.
Plain HTML, CSS and JavaScript — no framework, no build step, no dependencies.

![Static site](https://img.shields.io/badge/stack-HTML%20%2F%20CSS%20%2F%20JS-0a66c2)

## What's in it

- **Profile card** — cover banner, avatar, headline, location, "Open to work" badge and action buttons
- **About** with a strip of headline metrics
- **Experience** — a four-role timeline covering 8 years, with outcome-focused bullets
- **Featured work** — case-study cards
- **Education & certifications**
- **Recommendations** — quote cards
- **Sidebar** — skills with proficiency bars, tools, languages, contact details
- **Light & dark themes** — follows the OS setting, with a manual toggle that is remembered
- **Responsive** down to small phones, and **print-friendly**: "Download CV" opens the print dialog with a clean, one-column CV layout

## Run it

Open `index.html` in a browser. That's it — it works from the filesystem.

To serve it locally instead:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Make it yours

All content lives in one file: **`assets/js/data.js`**. Edit the values there and the page
updates — you don't need to touch the HTML.

```js
window.PORTFOLIO = {
  profile:   { name, headline, location, yearsLabel, ... },
  openTo:    { title, text },          // delete this key to hide the green banner
  about:     ["paragraph", ...],
  metrics:   [{ value, label }, ...],
  experience:[{ role, company, start, end, bullets: [...], skills: [...] }, ...],
  projects:  [{ title, client, year, summary, tags, url, accent }, ...],
  education: [{ title, subtitle, period, note }, ...],
  skills:    [{ name, level }, ...],   // level is 0–100
  tools:     ["Figma", ...],
  quotes:    [{ text, author, role }, ...],
  contact:   [{ label, value, href, icon }, ...]
};
```

Notes:

- **Photo** — replace `assets/img/avatar.svg` with your own image (a square JPG/PNG works;
  update the `src` in `index.html` if the extension changes).
- **Project accents** — `accent` accepts `blue`, `green`, `purple` or `amber`.
- **Contact icons** — `icon` accepts `mail`, `linkedin`, `globe` or `pin`.
- **Colours** — the palette is a set of CSS custom properties at the top of
  `assets/css/styles.css` (`--accent`, `--bg`, `--surface`, …), defined once for light and
  once for dark.

## Sample content

The profile shipped in `data.js` is **fictional placeholder content** — a persona named Maya
Ortega with an invented work history, invented metrics and invented recommendations. Replace
it with your own before publishing.

## Files

```
index.html
assets/
  css/styles.css     layout, theming, print styles
  js/data.js         ← all content
  js/app.js          rendering, theme toggle, scroll-spy
  img/avatar.svg     profile photo placeholder
  img/favicon.svg
```

## Deploying

Any static host works. For GitHub Pages: push this repository, then enable Pages in
**Settings → Pages** with the branch set to your default branch and the folder set to `/ (root)`.
