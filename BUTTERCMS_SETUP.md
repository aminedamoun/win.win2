# ButterCMS Blog Integration

Your blog system is now powered by ButterCMS - a headless CMS that requires zero backend setup.

## What's Been Set Up

### Pages
- **/insights** - Main blog listing page with featured posts, categories, and filtering
- **/insights/[slug]** - Individual blog post pages with full content and related articles

### Features
- ✅ Featured posts (first post is automatically featured)
- ✅ Category filtering
- ✅ Rich text content with inline images
- ✅ Featured images from ButterCMS Media Library
- ✅ Author information
- ✅ Read time calculation
- ✅ Related articles by category
- ✅ SEO-friendly structure
- ✅ Fully responsive design

## Using ButterCMS Dashboard

All content is managed through the ButterCMS dashboard at https://buttercms.com/

### Creating a New Post

1. Go to https://buttercms.com/blog/
2. Click "New Post"
3. Fill in:
   - **Title**: Your blog post title
   - **Featured Image**: Upload from your computer or choose from Media Library
   - **Body**: Write your content (supports rich text and inline images)
   - **Summary**: Short excerpt for the listing page
   - **Categories**: Assign categories (create them first if needed)
   - **Author**: Select the author
   - **SEO Title & Meta Description**: For search engine optimization

4. Click "Publish" when ready

### Managing Categories

1. Go to https://buttercms.com/categories/
2. Click "New Category"
3. Enter name and slug
4. Save

### Uploading Images

1. Go to https://buttercms.com/media/
2. Click "Upload Files"
3. Select images from your computer
4. Use these images in your posts

### Managing Authors

1. Go to https://buttercms.com/authors/
2. Click "New Author"
3. Fill in details (name, bio, profile image, etc.)
4. Save

## How Images Work

- **Featured Images**: Set directly in ButterCMS post editor
- **Inline Images**: Added through the rich text editor in ButterCMS
- **All images** come directly from ButterCMS CDN
- You can upload images from your local drive anytime through ButterCMS Media Library

## API Configuration

Your ButterCMS API Read Token is already configured in `.env`:

```
VITE_BUTTER_API_KEY=261afe6fdd0847bfc97a9a4f96ec74c76a7db896
```

This is a read-only token - safe to use in frontend applications.

## Next Steps

1. Go to https://buttercms.com/blog/ and create your first post
2. Add some categories at https://buttercms.com/categories/
3. Upload featured images at https://buttercms.com/media/
4. Your posts will appear automatically on your website

## Technical Details

- **SDK**: `buttercms` npm package
- **Data Fetching**: Client-side using ButterCMS JavaScript SDK
- **Utility File**: `src/utils/buttercms.ts`
- **Blog Pages**: `src/pages/Insights.tsx` and `src/pages/InsightDetail.tsx`

## Support

ButterCMS Documentation: https://buttercms.com/docs/
