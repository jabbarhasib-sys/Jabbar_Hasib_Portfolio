# Jabbar Hasib — Portfolio

Static portfolio site (no build step, no dependencies): HTML, CSS and vanilla JavaScript.
Scroll-driven stages, 3D card tilt, canvas illustrations, light/dark theme, certificate viewer.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` by double-click also works, but a local server matches production.

## Deploy

### GitHub Pages (free)

1. Create a new **public** repo on GitHub, e.g. `portfolio` (or `jabbarhasib-sys.github.io` to get the root URL).
2. From this folder:

   ```bash
   git init
   git add .
   git commit -m "Add portfolio site"
   git branch -M main
   git remote add origin https://github.com/jabbarhasib-sys/portfolio.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
4. After about a minute the site is live at `https://jabbarhasib-sys.github.io/portfolio/`
   (or `https://jabbarhasib-sys.github.io/` if the repo is named `jabbarhasib-sys.github.io`).

All asset paths are relative, so it works under a `/portfolio/` sub-path.

### Vercel or Netlify (alternative)

Import the GitHub repo, framework preset **Other**, no build command, output directory `.` (root). Both give free HTTPS and a custom-domain option.

## Structure

```
index.html            page markup and content
css/style.css         design tokens (light + dark), layout, components
js/main.js            scroll stages, tilt, canvases, theme, loader, certificate viewer
assets/img/           hero, packet and volleyball photos
assets/certs/         certificate images (+ thumbs/ for hackathon cards)
assets/Jabbar_Hasib_Resume.pdf
assets/favicon.svg
```

## Edit content

- **Text, projects, hackathons, achievements:** `index.html`. Search for the section `id` (`#work`, `#hacks`, `#achievements`, `#experience`, `#certs`).
- **Add a certificate:** save the image in `assets/certs/`, add `"key": "assets/certs/key.jpg"` to the `<script id="certs-json">` block, and add a button
  `<button class="gh view lab" type="button" data-cert="key" aria-label="Name certificate">View certificate ↗</button>` where you want it.
- **Colours:** CSS variables at the top of `css/style.css` (`:root` for light, `:root[data-theme=dark]` for dark).
- **Loader length:** `DUR` in the loader block of `js/main.js` (default 2200 ms).
- **Resume:** replace `assets/Jabbar_Hasib_Resume.pdf` (keep the file name).

## After you go live

- In `index.html`, set `og:image` to the full URL, for example
  `https://jabbarhasib-sys.github.io/portfolio/assets/img/hero.jpg`, so link previews show the photo.
- The demo videos link to Google Drive. Open each in a private window and make sure sharing is **Anyone with the link can view**.
- Email and phone number are public on the page and in the resume PDF. Remove them if you prefer less spam.

## Notes

- Fonts (Anton, Inter, Martian Mono) load from Google Fonts.
- Respects `prefers-reduced-motion` and the system colour scheme.
