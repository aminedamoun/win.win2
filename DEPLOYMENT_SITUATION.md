# Current Deployment Situation - Quick Summary

## What We Have
A fully built React website (Win Win employment agency) that works perfectly locally:
- Bilingual (Slovenian/English)
- 18 blog articles
- 4 job postings
- AI chat widget
- Application system
- Admin portal

## The Problem
Need to deploy this Single Page Application (SPA) to GoDaddy hosting with a custom domain.

## What's Already Done
✅ Production build completed (`npm run build`)
✅ All files generated in `/dist` folder (600KB total)
✅ Environment variables baked into the build
✅ `.htaccess` file created for Apache routing
✅ SEO files ready (sitemap.xml, robots.txt)

## What Needs to Happen
Upload the entire contents of the `/dist` folder to GoDaddy's `public_html` directory.

## The Critical File: `.htaccess`
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Don't rewrite files or directories
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Rewrite everything else to index.html for SPA routing
  RewriteRule ^ index.html [L]
</IfModule>
```

**Why this matters:** React handles routing on the client side. Without this file, visiting `/jobs` directly or refreshing the page will show a 404 error. This file tells Apache to serve `index.html` for all routes, letting React take over.

## Files Structure to Upload
```
dist/
├── index.html              ← Main entry point
├── .htaccess              ← CRITICAL - Handles routing
├── assets/
│   ├── index-ix73nhYX.js  ← 552KB JavaScript bundle
│   └── index-DjyVG2vW.css ← 46KB CSS bundle
├── locales-en.json         ← English translations (57KB)
├── locales-sl.json         ← Slovenian translations (59KB)
├── robots.txt
├── sitemap.xml
└── [images].png
```

## Deployment Steps
1. **Login** to GoDaddy cPanel
2. **Open** File Manager
3. **Navigate** to `public_html` folder
4. **Delete** all existing files
5. **Upload** entire contents of `/dist` folder
6. **Verify** `.htaccess` file is uploaded (it's hidden!)
7. **Set permissions:** Files to 644, folders to 755
8. **Test** the website

## Expected Behavior After Upload
- ✅ Home page loads at www.win-win.si
- ✅ Navigation works (clicking links)
- ✅ Page refresh doesn't break (thanks to `.htaccess`)
- ✅ Language switcher toggles between SL/EN
- ✅ Job listings load from Supabase database
- ✅ Blog posts display
- ✅ Application forms work
- ✅ Chat widget appears and responds

## Common Issues & Quick Fixes

### Issue: "404 Not Found" when refreshing page
**Solution:** `.htaccess` file is missing or mod_rewrite is disabled in Apache
- Make sure `.htaccess` is uploaded
- Check with hosting support that mod_rewrite is enabled

### Issue: Blank white screen
**Solution:** JavaScript not loading
- Check browser console (F12) for errors
- Verify all files in `assets/` folder uploaded correctly

### Issue: Images missing
**Solution:** Image files not uploaded
- Make sure all `.png` files from `/dist` are uploaded

## Technical Details

**Build Tool:** Vite 5.4.2
**Framework:** React 18.3.1 + TypeScript
**Styling:** Tailwind CSS
**Backend:** Supabase (PostgreSQL database + Edge Functions)
**Server:** Apache (via GoDaddy cPanel)

**Bundle Sizes:**
- JavaScript: 552KB (153KB gzipped)
- CSS: 46KB (7.4KB gzipped)
- HTML: 3.6KB (1KB gzipped)

**Environment Variables:**
All API keys and configuration are **baked into the JavaScript bundle** during build. No runtime configuration needed on the server.

## Questions for Optimization

1. **Bundle Size:** The JavaScript bundle is 552KB. Should we implement code splitting to reduce initial load time?

2. **Security:** API keys are in the client bundle (standard for SPAs). Supabase uses Row Level Security (RLS) for protection, but should we add additional layers?

3. **SEO:** Currently a client-rendered SPA. Would server-side rendering (SSR) or static site generation (SSG) improve SEO performance?

4. **Caching:** Should we configure cache headers in `.htaccess` for better performance?

5. **CDN:** Would serving static assets from a CDN improve load times for international visitors?

6. **Apache Config:** Are there additional Apache optimizations beyond `.htaccess` we should consider?

## What Makes This Different from Static HTML Sites

**Traditional Website:**
- Each page is a separate HTML file
- Server sends different files for different URLs
- `/about.html`, `/jobs.html`, etc.

**Our React SPA:**
- Only ONE HTML file (`index.html`)
- JavaScript handles all page changes
- ALL routes serve the same `index.html`
- React Router changes content without reloading

**Why `.htaccess` is Essential:**
When someone visits `/jobs`, Apache looks for a file called `jobs` or `jobs.html`. It doesn't exist! The `.htaccess` file tells Apache: "Don't look for that file, just serve index.html instead." Then React takes over and shows the Jobs page.

## Success Criteria
After deployment, these should all work:
- [ ] Visit homepage: www.win-win.si → Loads correctly
- [ ] Click "Jobs": www.win-win.si/jobs → Loads job listings
- [ ] Refresh the Jobs page → Still shows jobs (doesn't 404)
- [ ] Direct link: www.win-win.si/insights/some-article → Loads article
- [ ] Language switch: Toggle EN/SL → Content changes
- [ ] Click "Apply": www.win-win.si/apply → Form loads
- [ ] Submit application → Success message shows
- [ ] Chat widget → Appears in bottom-right corner

---

**Bottom Line:** This is a standard React SPA deployment. The main technical requirement is proper Apache configuration via `.htaccess` to handle client-side routing. Everything else is straightforward file upload.

**Current Status:** ✅ Ready to deploy
**Risk Level:** ⬇️ Low
**Time Estimate:** 15-30 minutes for upload and testing
