# Win Win Website - Complete Technical Report

**Date:** January 6, 2026
**Project:** Win Win d.o.o. - Employment Agency Website
**Domain:** www.win-win.si (GoDaddy hosting)

---

## 1. PROJECT OVERVIEW

Win Win is a bilingual (Slovenian/English) employment agency website specializing in sales positions, call center roles, and telecommunications jobs across Slovenia. The website serves as both a public-facing career portal and an internal content management system.

### Primary Functions:
- **Job Listings & Applications** - Browse and apply for positions
- **Insights/Blog** - Industry articles and company news
- **AI Chat Widget** - Automated customer support
- **Admin Portal** - Content and job management system
- **Bilingual Support** - Full Slovenian and English translations

---

## 2. TECHNICAL STACK

### Frontend Framework
- **React 18.3.1** with TypeScript
- **Vite 5.4.2** - Build tool and dev server
- **Tailwind CSS 3.4.1** - Styling framework
- **React i18next** - Internationalization (i18n)
- **Lucide React** - Icon library

### Backend Services
- **Supabase** - PostgreSQL database, authentication, storage, and edge functions
- **ButterCMS** (optional) - Headless CMS for blog content
- **OpenAI API** - Powers AI chat functionality
- **Resend API** - Email delivery service

### Infrastructure
- **Build Output:** Static files (HTML, CSS, JS)
- **Production Bundle Size:** ~600KB (JavaScript + CSS)
- **Hosting Target:** GoDaddy cPanel with Apache server
- **Storage:** Supabase storage buckets for resumes and images

---

## 3. PROJECT STRUCTURE

```
project/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx       # Navigation with language switcher
│   │   ├── Footer.tsx       # Footer with links
│   │   ├── ChatWidget.tsx   # AI-powered chat interface
│   │   ├── ArticleCard.tsx  # Blog post preview cards
│   │   ├── CookieConsent.tsx
│   │   ├── SEO.tsx          # Dynamic meta tags
│   │   └── ...
│   ├── pages/               # Route components
│   │   ├── Home.tsx         # Landing page
│   │   ├── About.tsx        # Company information
│   │   ├── Jobs.tsx         # Job listings
│   │   ├── JobDetail.tsx    # Individual job details
│   │   ├── Apply.tsx        # Application form
│   │   ├── Insights.tsx     # Blog listing
│   │   └── InsightDetail.tsx # Individual blog post
│   ├── utils/
│   │   ├── router.tsx       # Client-side routing
│   │   ├── supabase.ts      # Supabase client setup
│   │   ├── buttercms.ts     # ButterCMS integration
│   │   └── contentManager.ts # Content fetching logic
│   ├── data/
│   │   └── jobs.ts          # Static job data (legacy)
│   ├── locales/
│   │   ├── en.json          # English translations
│   │   └── sl.json          # Slovenian translations
│   ├── App.tsx              # Root component
│   └── main.tsx             # Application entry point
├── supabase/
│   ├── migrations/          # 18 database migrations
│   └── functions/           # 3 edge functions
│       ├── ai-chat/
│       ├── submit-application/
│       └── translate-content/
├── public/                  # Static assets
│   ├── locales-*.json       # Public translation files
│   ├── robots.txt
│   ├── sitemap.xml
│   └── *.png                # Images and logos
├── dist/                    # Production build output
│   ├── index.html
│   ├── .htaccess            # Apache routing rules
│   ├── assets/              # Bundled CSS/JS
│   └── ...
├── admin.html               # Standalone admin dashboard
├── blog-editor.html         # Blog post editor
├── content-editor.html      # Content management
├── job-editor.html          # Job posting editor
└── login.html               # Admin authentication

Total TypeScript/TSX Files: 30
```

---

## 4. DATABASE ARCHITECTURE

**Platform:** Supabase (PostgreSQL)
**Total Tables:** 11
**Total Migrations:** 18

### Core Tables:

#### 4.1 Articles (Blog System)
- **Table:** `articles`
- **Rows:** 18 published articles
- **Bilingual Fields:**
  - `title_sl` / `title_en`
  - `excerpt_sl` / `excerpt_en`
  - `content_sl` / `content_en`
- **Key Features:**
  - Category relationships
  - Featured articles
  - View tracking
  - Published status flag
  - SEO-friendly slugs

#### 4.2 Article Categories
- **Table:** `article_categories`
- **Rows:** 7 categories
- **Fields:** name, slug, description

#### 4.3 Jobs
- **Table:** `jobs`
- **Rows:** 4 active jobs
- **Bilingual Fields:**
  - `title_sl` / `title_en`
  - `short_description_sl` / `short_description_en`
  - `full_description_sl` / `full_description_en`
  - `requirements_sl[]` / `requirements_en[]` (arrays)
  - `responsibilities_sl[]` / `responsibilities_en[]`
  - `benefits_sl[]` / `benefits_en[]`
- **Features:** Active status, display ordering

#### 4.4 Job Applications
- **Table:** `job_applications`
- **Rows:** 2 applications
- **Fields:** Contact info, resume URL, status tracking

#### 4.5 Chat System
- **Tables:** `chat_conversations`, `chat_messages`
- **Conversations:** 7 sessions
- **Messages:** 30 total
- **Features:** Session management, conversation history

#### 4.6 Appointments
- **Table:** `appointments`
- **Rows:** 1 appointment
- **Links to:** Chat conversations

#### 4.7 Storage & Media
- **Table:** `website_images`
- **Rows:** 22 tracked images
- **Storage Buckets:**
  - `resumes` - PDF uploads
  - `website-images` - Site media

#### 4.8 Website Content
- **Table:** `website_content`
- **Purpose:** Editable page sections
- **Status:** Currently empty (newly created)

### Security: Row Level Security (RLS)
- **All tables have RLS enabled**
- Public read access for articles, jobs, categories
- Admin-only write access
- Authenticated-only for applications and appointments

---

## 5. SUPABASE EDGE FUNCTIONS

### 5.1 AI Chat Function
**Path:** `supabase/functions/ai-chat/index.ts`
**Purpose:** OpenAI-powered customer support chatbot
**Features:**
- Natural language processing
- Context-aware responses
- Conversation history
- Appointment scheduling integration

### 5.2 Submit Application
**Path:** `supabase/functions/submit-application/index.ts`
**Purpose:** Handle job application submissions
**Features:**
- Resume file upload
- Email notifications (Resend API)
- Database storage
- Form validation

### 5.3 Translate Content
**Path:** `supabase/functions/translate-content/index.ts`
**Purpose:** Automated content translation (OpenAI)
**Use Case:** Admin can write in one language, auto-translate to other

---

## 6. ADMIN SYSTEM

The project includes **standalone HTML admin pages** (not part of the React SPA):

### Admin Pages:
1. **login.html** - Authentication gateway
2. **admin.html** - Main dashboard
3. **blog-editor.html** - Create/edit articles
4. **job-editor.html** - Manage job postings
5. **content-editor.html** - Edit website sections
6. **insights.html** - View analytics (if implemented)

**Authentication:** Uses Supabase Auth
**Access Control:** Admin-only RLS policies

---

## 7. FEATURES INVENTORY

### Public Features:
✅ Bilingual website (SL/EN) with language switcher
✅ Job listing and filtering
✅ Job detail pages with application forms
✅ Blog/Insights section with categories
✅ Resume upload (PDF to Supabase Storage)
✅ AI-powered chat widget
✅ Appointment booking through chat
✅ Cookie consent banner
✅ SEO optimization (meta tags, sitemap, robots.txt)
✅ Responsive design (mobile-first)
✅ Analytics tracking (Google Tag Manager ready)
✅ Page loader animations
✅ Scroll indicators

### Admin Features:
✅ Content management for articles
✅ Job posting management
✅ Bilingual content editing
✅ Auto-translation capability
✅ Application tracking
✅ Image upload and management

---

## 8. ENVIRONMENT VARIABLES

The application requires these environment variables:

```env
# Supabase
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# ButterCMS (Optional)
VITE_BUTTER_API_KEY=your-butter-api-token

# Edge Functions (Server-side only, not in frontend)
RESEND_API_KEY=your-resend-api-key
OPENAI_API_KEY=your-openai-api-key
```

**Important:**
- Frontend variables are prefixed with `VITE_`
- These are **baked into the JavaScript bundle** during build
- Edge functions access server-side variables automatically (pre-configured in Supabase)

---

## 9. CURRENT SITUATION & PROBLEM

### Current Status:
- ✅ Website is **fully built and functional**
- ✅ Production build completed successfully (`npm run build`)
- ✅ All files generated in `/dist` folder
- ✅ Bundle size: 552KB JS + 46KB CSS
- ✅ Tested locally and works perfectly

### The Challenge:
**We need to deploy this Single Page Application (SPA) to GoDaddy hosting with a custom domain.**

### Technical Requirements for Deployment:
1. **Upload all files from `/dist` folder** to GoDaddy cPanel
2. **Configure Apache server** for SPA routing (using `.htaccess` file)
3. **Ensure environment variables are working** (already baked into build)
4. **Set correct file permissions** (644 for files, 755 for directories)

### Files to Upload:
```
dist/
├── index.html               # Main entry point
├── .htaccess                # ⚠️ CRITICAL - Handles routing
├── assets/
│   ├── index-*.js           # JavaScript bundle
│   └── index-*.css          # CSS bundle
├── locales-en.json          # English translations
├── locales-sl.json          # Slovenian translations
├── robots.txt               # SEO
├── sitemap.xml              # SEO
└── *.png                    # Images
```

### The `.htaccess` File (Already Created):
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

**Why this is critical:**
React Router handles all routing on the client side. Without this `.htaccess` file, refreshing the page or directly accessing routes like `/jobs` or `/insights/some-article` will result in 404 errors.

---

## 10. DEPLOYMENT STEPS FOR GODADDY

### Step 1: Access GoDaddy cPanel
1. Login to GoDaddy account
2. Go to "Web Hosting" or "Websites"
3. Open cPanel or File Manager

### Step 2: Navigate to Web Root
- Look for `public_html` folder (or `www`, `htdocs`)
- This is where the website files go

### Step 3: Clear Existing Files
- **Delete all existing files** in `public_html`
- This ensures no conflicts with old files

### Step 4: Upload Files
- Upload **ALL contents** from the `/dist` folder
- Make sure to include:
  - `index.html` ✅
  - `.htaccess` ✅ (hidden file!)
  - `assets/` folder ✅
  - All JSON, XML, and image files ✅

### Step 5: Verify File Permissions
- Files: `644` (read/write for owner, read for others)
- Folders: `755` (read/write/execute for owner, read/execute for others)
- Especially important for `.htaccess`

### Step 6: Test the Website
1. Visit your domain (e.g., www.win-win.si)
2. Test navigation between pages
3. Refresh the page on different routes to test `.htaccess`
4. Test language switching
5. Test the chat widget
6. Try submitting a job application

### Common Issues & Solutions:

**Issue 1: "404 Not Found" on page refresh**
- **Cause:** `.htaccess` file missing or not working
- **Solution:** Verify `.htaccess` is uploaded and mod_rewrite is enabled

**Issue 2: "Blank/White screen"**
- **Cause:** JavaScript bundle not loading
- **Solution:** Check browser console for errors, verify file paths

**Issue 3: "Images not loading"**
- **Cause:** Incorrect file paths or missing files
- **Solution:** Ensure all image files are uploaded

**Issue 4: "Environment variables not working"**
- **Cause:** Trying to access variables at runtime
- **Solution:** Variables are baked into build, no runtime access needed

---

## 11. POST-DEPLOYMENT CHECKLIST

After uploading to GoDaddy:

- [ ] Home page loads correctly
- [ ] Navigation works (About, Jobs, Insights)
- [ ] Language switcher changes content
- [ ] Job listings display from database
- [ ] Blog articles load from database
- [ ] Application form submits successfully
- [ ] Chat widget appears and responds
- [ ] Images display correctly
- [ ] Page refresh doesn't cause 404 errors
- [ ] Mobile responsive design works
- [ ] SEO meta tags are present (View Source)
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`

---

## 12. TECHNICAL DEPENDENCIES

### Frontend Dependencies:
```json
{
  "@supabase/supabase-js": "^2.57.4",
  "buttercms": "^3.0.3",
  "i18next": "^25.7.3",
  "lucide-react": "^0.344.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-i18next": "^16.5.1"
}
```

### Build Tools:
```json
{
  "vite": "^5.4.2",
  "typescript": "^5.5.3",
  "tailwindcss": "^3.4.1",
  "@vitejs/plugin-react": "^4.3.1"
}
```

All dependencies are bundled into the production build - **no runtime installation needed on server**.

---

## 13. PERFORMANCE METRICS

### Build Statistics:
- **Total Build Time:** ~11 seconds
- **JavaScript Bundle:** 552.15 KB (153.29 KB gzipped)
- **CSS Bundle:** 46.22 KB (7.40 KB gzipped)
- **HTML:** 3.64 KB (0.99 KB gzipped)
- **Total Modules:** 1,596 transformed

### Optimization Opportunities:
⚠️ Vite warning: "Some chunks are larger than 500 KB after minification"
- **Recommended:** Implement code splitting with dynamic imports
- **Impact:** Faster initial page load, better performance on slow connections

---

## 14. FUTURE ENHANCEMENT RECOMMENDATIONS

### Performance:
1. Implement dynamic imports for pages (code splitting)
2. Add service worker for offline capability
3. Optimize images with WebP format and lazy loading
4. Consider CDN for static assets

### Features:
1. Add admin analytics dashboard
2. Implement application status tracking for candidates
3. Add email notifications for new applications
4. Create applicant portal for tracking submissions
5. Add social media sharing for blog posts

### SEO:
1. Add structured data (JSON-LD) for job postings
2. Implement Open Graph tags for better social sharing
3. Add breadcrumb navigation
4. Generate dynamic sitemaps

---

## 15. SUPPORT & MAINTENANCE

### Key Files for Troubleshooting:
- **Routing issues:** Check `.htaccess` and `src/utils/router.tsx`
- **Database errors:** Check Supabase migrations in `supabase/migrations/`
- **Translation issues:** Check `src/locales/*.json`
- **API failures:** Check edge functions in `supabase/functions/`
- **Style issues:** Check `src/index.css` and Tailwind config

### Database Backup:
- Supabase provides automatic daily backups
- Manual export available via Supabase Dashboard
- RLS policies protect data integrity

### Monitoring:
- Supabase Dashboard: Database queries, API usage
- Google Analytics: User behavior (if GTM configured)
- Error tracking: Consider adding Sentry or similar

---

## 16. QUESTIONS FOR OPENAI CONSULTATION

### Deployment Strategy:
1. Is uploading the entire `/dist` folder to GoDaddy's `public_html` the correct approach for a React SPA?
2. Are there any Apache-specific configurations beyond `.htaccess` that we should consider?
3. Should we use a subdirectory or root directory for deployment?

### Performance Optimization:
4. How can we reduce the 552KB JavaScript bundle size without losing functionality?
5. What's the best strategy for implementing code splitting in this Vite + React setup?
6. Should we consider using a CDN for the static assets?

### Environment Variables:
7. The environment variables are baked into the build - is this secure for API keys?
8. Should we proxy Supabase calls through edge functions for better security?

### Routing & SEO:
9. Is the current `.htaccess` configuration optimal for SEO and performance?
10. Should we implement server-side rendering (SSR) or is the current SPA approach sufficient?
11. How can we improve the meta tags and structured data for better SEO?

### Architecture:
12. Is the current separation between the React SPA and standalone admin HTML pages a good approach?
13. Should we integrate the admin portal into the main React application?
14. Are there any security concerns with the current authentication setup?

---

## 17. CONTACT & ACCESS

**Project Name:** Win Win d.o.o. Employment Agency
**Target Domain:** www.win-win.si
**Hosting Provider:** GoDaddy (cPanel/Apache)
**Database:** Supabase (cloud-hosted PostgreSQL)
**Build System:** Vite (Static Site Generation)

---

## CONCLUSION

This is a **production-ready, fully-functional bilingual employment website** with:
- 18 live blog articles
- 4 active job postings
- 2 job applications received
- 7 chat conversations logged
- Complete admin management system
- AI-powered features

The website has been built, tested, and is ready for deployment. The main challenge is properly configuring the GoDaddy Apache server to handle React Router's client-side routing.

**Status:** ✅ Ready for deployment
**Blockers:** None - just needs proper file upload and configuration
**Risk Level:** Low - standard SPA deployment process

---

**End of Technical Report**
