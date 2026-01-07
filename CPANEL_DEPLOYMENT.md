# cPanel Deployment Instructions

Your application is built and ready for deployment to cPanel.

## Files Ready for Deployment

All necessary files are in the `dist/` folder and ready to upload.

## Deployment Steps

### 1. Access Your cPanel File Manager

1. Log in to your cPanel account
2. Navigate to **File Manager**
3. Go to the `public_html` directory

### 2. Upload Files

**Option A: Using File Manager**
1. Select all files in your local `dist/` folder
2. Drag and drop them into `public_html/` (or use the Upload button)
3. Make sure the following structure is maintained:

```
public_html/
├── index.html
├── admin.html
├── content-editor.html
├── blog-editor.html
├── job-editor.html
├── login.html
├── post.html
├── insights.html
├── js/
│   └── supabaseClient.js
├── assets/
│   ├── index-*.css
│   └── index-*.js
├── locales-en.json
├── locales-sl.json
├── .htaccess
├── _redirects
└── (all other files)
```

**Option B: Using FTP Client (FileZilla, Cyberduck, etc.)**
1. Connect to your FTP server with your credentials
2. Navigate to `public_html/`
3. Upload all contents from the `dist/` folder
4. Ensure all subdirectories (js/, assets/) are uploaded

### 3. Verify Deployment

After uploading, visit your website:
- **Main Site**: `https://yourdomain.com`
- **Admin Panel**: `https://yourdomain.com/admin.html`
- **Login**: `https://yourdomain.com/login.html`
- **Content Editor**: `https://yourdomain.com/content-editor.html`

### 4. Post-Deployment Checklist

- [ ] Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- [ ] Test login functionality at `/login.html`
- [ ] Verify admin panel loads at `/admin.html`
- [ ] Check content editor works at `/content-editor.html`
- [ ] Test job listings page
- [ ] Verify blog/insights page
- [ ] Check language switcher (English/Slovenian)
- [ ] Test responsive design on mobile

### 5. Important Files

**Do not delete these files:**
- `.htaccess` - Handles URL rewrites and routing
- `js/supabaseClient.js` - Database connection configuration
- All files in `assets/` folder - Contains CSS and JavaScript

### 6. Updating Content

After deployment, you can manage content through:
- **Admin Panel**: `yourdomain.com/admin.html`
- **Content Editor**: `yourdomain.com/content-editor.html`
- **Blog Editor**: `yourdomain.com/blog-editor.html`

### 7. Troubleshooting

**If admin pages show "getSession" error:**
- Verify `/js/supabaseClient.js` exists
- Check browser console for errors
- Clear browser cache completely

**If pages show 404 errors:**
- Verify `.htaccess` file is uploaded
- Check file permissions (644 for files, 755 for folders)
- Ensure all HTML files are in the root of `public_html/`

**If images don't load:**
- Check that all image files are uploaded
- Verify file paths in the database match uploaded files

### 8. Automated Deployment (Optional)

For future updates, you can set up GitHub Actions:
1. Push your code to GitHub
2. Add FTP credentials as GitHub Secrets:
   - `FTP_SERVER`
   - `FTP_USERNAME`
   - `FTP_PASSWORD`
   - `FTP_SERVER_DIR`
3. Future pushes will auto-deploy to cPanel

## Support

If you encounter issues:
1. Check browser console for JavaScript errors
2. Verify all files uploaded correctly
3. Ensure Supabase credentials are correct
4. Test database connection from admin panel
