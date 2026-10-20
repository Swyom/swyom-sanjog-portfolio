# P. Swyom Sanjog — Portfolio

Personal portfolio built with React 19, Vite, Tailwind CSS v4 and GSAP (ScrollTrigger).
Deployed to GitHub Pages under `/swyom-sanjog-portfolio/`.

## Development

```bash
npm install
npm run dev      # http://localhost:3000/swyom-sanjog-portfolio/
npm run lint     # TypeScript type-check
npm run build    # production build into dist/
npm run deploy   # build + publish dist/ to GitHub Pages
```

## SEO

Already in place: descriptive title/meta description, canonical URL, Open Graph + X/Twitter
share cards (`assets/og-image.jpg`), `ProfilePage`/`Person` structured data (JSON-LD),
`public/sitemap.xml`, a web manifest, a no-JavaScript fallback summary, and display-sized
WebP images for fast loading.

After each `npm run deploy`:

1. In [Google Search Console](https://search.google.com/search-console) (property
   `https://swyom.github.io/swyom-sanjog-portfolio/`, already verified), open **Sitemaps** and
   submit `sitemap.xml`, then use **URL Inspection → Request indexing** on the home page.
2. Update `<lastmod>` in `public/sitemap.xml` and `dateModified` in `index.html` when content changes.
3. Check share previews with the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
   and validate structured data with the [Rich Results Test](https://search.google.com/test/rich-results).
4. Link to the portfolio from your GitHub profile README, LinkedIn "Website" field, X bio and
   DEV.to profile — backlinks from your own profiles are the fastest way to get indexed.

Note: `robots.txt` only works at a domain root, so a project page under `/swyom-sanjog-portfolio/`
can't have one; submit the sitemap through Search Console instead.
