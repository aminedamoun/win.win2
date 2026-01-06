# Copy-Paste This to Ask AI Assistants

---

**QUESTION: I need help deploying my React SPA to GoDaddy. Looking for optimization advice and deployment best practices.**

---

## Project Context

I have a production-ready React 18 Single Page Application (SPA) that needs to be deployed to GoDaddy hosting (Apache server with cPanel). The site is a bilingual employment agency website with a Supabase backend.

### Technical Stack
- **Frontend:** React 18.3.1 + TypeScript + Vite 5.4.2
- **Styling:** Tailwind CSS 3.4.1
- **Backend:** Supabase (PostgreSQL + Edge Functions)
- **Routing:** Client-side routing (custom router implementation)
- **i18n:** React-i18next for Slovenian/English content
- **Hosting:** GoDaddy (Apache + cPanel)

### Build Output
- JavaScript bundle: **552KB** (153KB gzipped)
- CSS bundle: 46KB (7.4KB gzipped)
- Total modules: 1,596 transformed
- Build time: ~11 seconds

### Current `.htaccess` Configuration
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

### Application Features
- 18 blog articles (stored in Supabase)
- 4 job postings with applications
- AI chat widget (OpenAI integration via Edge Function)
- File uploads (resumes to Supabase Storage)
- Bilingual content (SL/EN)
- Admin portal (separate HTML pages)
- SEO optimized (sitemap, robots.txt, meta tags)

### Environment Variables
All API keys (Supabase, OpenAI, ButterCMS) are **baked into the JavaScript bundle** during Vite build with `VITE_` prefix. Edge functions access secrets server-side through Supabase.

---

## My Questions

### 1. Deployment Strategy
Is uploading the `/dist` folder contents directly to GoDaddy's `public_html` the correct approach? Are there better alternatives?

### 2. Bundle Size Optimization
The 552KB JavaScript bundle triggers Vite's warning about chunk size. How should I implement code splitting without restructuring the entire app? Specific strategies for Vite + React?

### 3. Apache Configuration
Is my `.htaccess` configuration optimal for:
- SPA routing?
- SEO crawlability?
- Performance (caching)?
- Security?

What additional directives should I add?

### 4. Security Concerns
Since API keys are in the client bundle:
- Is this secure with Supabase's RLS (Row Level Security)?
- Should I proxy API calls through Edge Functions instead?
- Are there additional security headers I should add?

### 5. SEO Performance
The site is a client-rendered SPA. Will Google properly index the content?
- Should I consider SSR (Server-Side Rendering)?
- Is pre-rendering viable for GoDaddy's Apache setup?
- Any `.htaccess` tricks for better SEO?

### 6. Caching Strategy
What cache headers should I set in `.htaccess` for:
- JavaScript bundles (with hash in filename)
- CSS files
- Images
- index.html (should NOT be cached)

### 7. Performance Optimization
Beyond code splitting, what can I do to improve load times?
- CDN integration possibilities with GoDaddy?
- Image optimization strategies?
- Lazy loading implementation?
- Critical CSS extraction?

### 8. Monitoring & Debugging
After deployment, how should I:
- Monitor performance issues?
- Debug errors in production?
- Track bundle size over time?
- Handle client-side error reporting?

---

## Specific Concerns

1. **First Load Time:** 552KB JavaScript might be slow on mobile/3G. What's acceptable? What's the mitigation strategy?

2. **Route Refresh Issue:** With SPAs, direct URL access or page refresh can cause 404s. My `.htaccess` handles this, but is there a more robust solution?

3. **Bilingual Content:** Translation files are loaded via separate JSON files (57KB each). Should these be code-split or lazy-loaded per language?

4. **Admin Portal:** Currently separate HTML files (not in React app). Good practice or should I integrate them into the SPA?

5. **Database Calls:** Every page load fetches from Supabase. Should I implement caching? Service Workers? Or is direct fetching fine?

---

## What I Need

1. ✅ **Validation:** Is my current approach sound?
2. 🔧 **Optimization:** Practical steps to reduce bundle size
3. ⚡ **Performance:** Apache/.htaccess configurations for speed
4. 🔒 **Security:** Best practices for API key handling
5. 📈 **SEO:** Ensuring Google can crawl and index properly
6. 🚀 **Deployment:** Step-by-step verification checklist

---

## Context: Why GoDaddy?

Client already has GoDaddy hosting with a custom domain. Migration to Vercel/Netlify is not an option. Need to make this work optimally within GoDaddy's Apache environment.

---

**Please provide actionable recommendations with code examples where applicable. I'm looking for production-ready solutions, not just theoretical advice.**

---

## Additional Files Available

I can provide:
- Full `vite.config.ts`
- Complete `package.json`
- Router implementation code
- Database schema
- Edge Function code

Just ask if you need to see any specific implementation details.

---

**Thank you! Looking forward to expert guidance on deploying this React SPA to GoDaddy successfully.**
