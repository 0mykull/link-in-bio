# link-in-bio

minimal editorial-brutalist link-in-bio site built with **astro**, **solidjs**, and **tailwind css v4**.

## prerequisites

- [node.js](https://nodejs.org/) (v18.17.1+ or v20+)
- `npm` and `npx`

## running locally

1. **extract the archive and navigate into the project directory:**

   ```bash
   unzip link-in-bio.zip -d link-in-bio
   cd link-in-bio
   ```

2. **install dependencies:**

   ```bash
   npm install
   ```

3. **start the development server:**

   ```bash
   npm run dev
   ```

   open `http://localhost:4321` in your browser.

## building for production

generate a static production bundle in `dist/`:

```bash
npm run build
```

preview the built static site locally before deploying:

```bash
npm run preview
```

## customizing content

- **bio & socials:** edit `src/data/links.ts`
- **theme & typography:** edit `src/styles/global.css`
- **interactive islands:** edit `src/components/TelemetryBar.tsx`, `src/components/PlayButton.tsx`, and `src/components/AsciiArt.tsx`
