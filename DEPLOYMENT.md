# Deployment Guide

Your blog system is ready to deploy. Here are the deployment options:

## Option 1: Vercel (Recommended)

### Quick Deploy

1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite settings
6. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_BUTTER_API_KEY`
7. Click "Deploy"

### Command Line Deploy

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts and add your environment variables when asked.

## Option 2: Netlify

### Quick Deploy

1. Push your code to GitHub
2. Go to https://netlify.com
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_BUTTER_API_KEY`
7. Click "Deploy"

### Command Line Deploy

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## Environment Variables

Make sure to add these environment variables in your deployment platform:

```
VITE_SUPABASE_URL=https://owvufovfnngqdhbscoci.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93dnVmb3Zmbm5ncWRoYnNjb2NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MTEwOTQsImV4cCI6MjA4MTk4NzA5NH0.sDDk9dKx_jHCEArBsyFzOrEMbSfHHnmZmcMD8znP2_I
VITE_BUTTER_API_KEY=261afe6fdd0847bfc97a9a4f96ec74c76a7db896
```

## After Deployment

1. Your site will be live at the URL provided by your deployment platform
2. Visit `/insights` to see your blog
3. Create content in ButterCMS dashboard at https://buttercms.com/blog/
4. Content will appear automatically on your live site

## Custom Domain (Optional)

Both Vercel and Netlify support custom domains:
- Go to your project settings
- Add your custom domain
- Follow the DNS configuration instructions
- Your site will be available at your custom domain

## Continuous Deployment

Once connected to GitHub:
- Every push to your main branch automatically deploys
- Preview deployments are created for pull requests
- No manual deployment needed

## Support

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
