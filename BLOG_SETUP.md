# Win Win Blog System Setup Guide

This project includes a custom blog system built with plain HTML, CSS, JavaScript, and Supabase backend.

## Features

- **Plain HTML/CSS/JS frontend** - No frameworks, fully editable
- **Supabase backend** - Database, auth, and storage
- **Admin panel** - Create, edit, delete posts with rich content
- **Category system** - Organize posts by category
- **Image support** - Featured images for posts
- **Authentication** - Secure admin access with email/password

## Pages

- `/insights.html` - Public blog listing page
- `/post.html?slug=your-post` - Single post view
- `/admin.html` - Admin panel for managing posts
- `/login.html` - Admin login page

## Database Schema

The system uses two main tables:

### `categories` table
- `id` (uuid) - Primary key
- `name` (text) - Category name
- `slug` (text) - URL-friendly slug
- `created_at` (timestamp)

### `posts` table
- `id` (uuid) - Primary key
- `title` (text) - Post title
- `slug` (text) - URL-friendly slug
- `excerpt` (text) - Short description
- `content` (text) - Full HTML/Markdown content
- `featured_image` (text) - Image URL
- `status` (text) - 'draft' or 'published'
- `category_id` (uuid) - Foreign key to categories
- `author_id` (uuid) - Foreign key to auth.users
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Setup Instructions

### 1. Database Setup ✅

The database tables are already created with proper RLS policies.

### 2. Create Admin User

To access the admin panel, you need to create a user in Supabase:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `owvufovfnngqdhbscoci`
3. Navigate to **Authentication** → **Users**
4. Click **Add user** → **Create new user**
5. Enter an email and password
6. Click **Create user**

Now you can login at `/login.html` with these credentials.

### 3. Set Up Storage Bucket (Optional - for image uploads)

If you want to upload images directly to Supabase Storage:

1. Go to your Supabase Dashboard
2. Navigate to **Storage**
3. Click **New bucket**
4. Create a bucket named: `blog-images`
5. Set it to **Public bucket** (so images are accessible)
6. Click **Create bucket**

#### Storage Policies

After creating the bucket, set up these policies:

**Policy for public read access:**
```sql
-- Anyone can view images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');
```

**Policy for authenticated uploads:**
```sql
-- Authenticated users can upload images
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images');
```

**Policy for authenticated deletes:**
```sql
-- Authenticated users can delete their uploads
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog-images');
```

### 4. Using External Image URLs (Current Setup)

The admin panel currently uses direct image URLs. You can:

- Use stock photos from Pexels, Unsplash, etc.
- Host images on your own CDN
- Use any publicly accessible image URL

Simply paste the full URL into the "Featured Image URL" field in the admin panel.

## How to Use

### Creating Your First Post

1. **Login**: Go to `/login.html` and sign in with your admin credentials
2. **Access Admin**: You'll be redirected to `/admin.html`
3. **Create Category** (optional):
   - Click the "Categories" tab
   - Add a category name (e.g., "Sales Tips")
   - The slug will auto-generate
   - Click "Add Category"

4. **Create Post**:
   - Click the "New Post" tab
   - Fill in the title (slug auto-generates from title)
   - Add an excerpt (short description)
   - Write your content (supports HTML or Markdown)
   - Paste a featured image URL
   - Select a category
   - Choose status: "draft" or "published"
   - Click "Save Post"

5. **View Published Posts**: Visit `/insights.html` to see all published posts

### Editing Posts

1. Go to `/admin.html`
2. Click "Posts" tab to see all your posts
3. Click "Edit" on any post
4. Make your changes
5. Click "Save Post"

### Managing Categories

- Add categories in the "Categories" tab
- Delete categories (posts will be unlinked but not deleted)
- Categories help organize and filter posts

## Security

### Row Level Security (RLS)

All tables have RLS enabled with these policies:

**Categories:**
- Anyone can read categories
- Only authenticated users can create/update/delete

**Posts:**
- Anyone can read published posts
- Authenticated users see all posts (including drafts)
- Only post authors can update/delete their posts

### Authentication

- Admin access requires email/password authentication
- Public pages are accessible to everyone
- No API keys exposed in public pages

## Customization

### Styling

All styles are inline in the HTML files. To customize:

1. Open any HTML file
2. Find the `<style>` section in the `<head>`
3. Modify colors, fonts, layouts as needed

Current color scheme:
- Primary: `#e11d2e` (red)
- Background: `#000000` (black)
- Text: `#ffffff` (white)
- Accent: `#999999` (gray)

### Content

Edit these files directly:

- `/insights.html` - Blog listing page
- `/post.html` - Single post template
- `/admin.html` - Admin panel
- `/login.html` - Login page

## Troubleshooting

### "Post Not Found" Error

- Make sure the post status is "published"
- Check that the slug in the URL matches the post slug
- Verify RLS policies are set correctly

### Cannot Login

- Verify user exists in Supabase Authentication dashboard
- Check that email/password are correct
- Ensure Supabase credentials in HTML files are correct

### Images Not Loading

- Verify the image URL is publicly accessible
- Check that the URL starts with `https://`
- If using Supabase Storage, ensure bucket is public

### Posts Not Appearing

- Check post status is "published" (not "draft")
- Verify RLS policies allow public read access
- Check browser console for errors

## Production Deployment

### Update Supabase Credentials

Before deploying, update these values in ALL HTML files:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

Files to update:
- `/login.html`
- `/admin.html`
- `/insights.html`
- `/post.html`

### SEO Optimization

Each post page automatically sets:
- Page title: `{Post Title} - Win Win Blog`
- Meta description: `{Post Excerpt}`

For better SEO, add Open Graph tags to `/post.html`:

```html
<meta property="og:title" content="{post.title}">
<meta property="og:description" content="{post.excerpt}">
<meta property="og:image" content="{post.featured_image}">
<meta property="og:url" content="https://yourdomain.com/post.html?slug={post.slug}">
```

## Support

For issues or questions:
1. Check Supabase dashboard for errors
2. Review browser console for JavaScript errors
3. Verify database tables and RLS policies are set up correctly

## Next Steps

1. Create your first admin user
2. Add some categories
3. Create your first blog post
4. Customize the design to match your brand
5. Deploy to production

Enjoy your new blog system!