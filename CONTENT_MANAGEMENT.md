# Website Content Management System

This system allows you to edit website content through an admin interface, with changes stored in the database.

## How It Works

### 1. Admin Interface

Navigate to `/content-editor.html` (accessible from the Admin dashboard) to manage website content.

#### Steps to Edit Content:

1. **Select a Page**: Choose from Home, About, or Jobs
2. **Select a Language**: Choose English or Slovenian
3. **Click "Load Content"**: This loads all sections for that page
4. **Edit Content**: Modify any text in the form fields
5. **Click "Save All Changes"**: Saves all modifications to the database

### 2. Database Structure

Content is stored in the `website_content` table:

```sql
- id: unique identifier
- page: page name (e.g., 'home', 'about', 'jobs')
- section: section key (e.g., 'hero.title', 'hero.description')
- language: language code ('en' or 'sl')
- content: the actual text content
- created_at, updated_at: timestamps
```

### 3. Content Priority

The system uses a fallback mechanism:

1. **First**: Check database for custom content
2. **Fallback**: Use default content from translation files (`src/locales/*.json`)

This means:
- If content is in the database, it will be displayed
- If not in database, the default translation file content is used
- You can override any section without losing the original

### 4. Integrating with React Components (Optional Advanced Usage)

To use database content in your React components, you can use the `contentManager` utility:

```typescript
import { initializePageContent, getContent } from '../utils/contentManager';
import { useEffect, useState } from 'react';

// In your component
useEffect(() => {
  initializePageContent('home');
}, []);

// Get content with fallback
const title = getContent('home', 'hero.title', 'Default Title');
```

However, the current implementation uses the standard i18n translation system, which works perfectly without modification. The content editor allows you to override these translations in the database.

## Features

### Current Features

- ✅ Edit all website text content page by page
- ✅ Support for multiple languages (English & Slovenian)
- ✅ Automatic save to database
- ✅ Fallback to default translations
- ✅ Admin authentication required
- ✅ Simple, intuitive interface

### Section Management

The system automatically detects all sections from your translation files and allows you to edit them. Sections are identified by their key path (e.g., `hero.title`, `about.vision.description`).

### Content Types Supported

- Short text (input fields)
- Long text (textarea for content > 100 characters)
- Arrays (displayed as JSON strings)

## Security

- Only authenticated users with admin role can access the content editor
- Row Level Security (RLS) policies ensure data protection
- Public read access for displaying content
- Admin-only write access for modifications

## Maintenance

### Clearing Cache

If content updates don't appear immediately, the cache can be cleared by:

1. Reloading the page
2. Using the `clearContentCache()` function from the contentManager utility

### Adding New Pages

To add support for new pages:

1. Add the page translations to `src/locales/en.json` and `src/locales/sl.json`
2. Add the page option to the dropdown in `content-editor.html`:

```html
<option value="newpage">New Page</option>
```

That's it! The system will automatically detect all sections.

## Best Practices

1. **Test changes**: Always preview changes on the live site after saving
2. **Keep backups**: The original translations in JSON files serve as backups
3. **Be consistent**: Use consistent naming and formatting across languages
4. **Avoid HTML**: Try to keep HTML tags minimal in content (use for formatting only)
5. **Document changes**: Keep track of major content changes

## Troubleshooting

### Content not updating?

- Ensure you clicked "Save All Changes"
- Check browser console for errors
- Verify you're logged in as admin
- Try clearing browser cache

### Can't access content editor?

- Ensure you're logged in
- Verify your account has admin role
- Check console for authentication errors

### Changes not appearing on website?

- The website currently uses the i18n translation system
- Database overrides need to be integrated into each page component
- Use the `contentManager` utility functions for full integration

## Future Enhancements

Potential features for future development:

- [ ] Rich text editor for formatted content
- [ ] Preview changes before saving
- [ ] Revision history
- [ ] Bulk import/export
- [ ] Search functionality
- [ ] Content scheduling
- [ ] Multi-user editing with conflict detection
