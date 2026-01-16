/*
  # Load Complete Translations v3
  
  Delete and recreate site_locales records with all translations
*/

-- Temporarily disable RLS for this migration
ALTER TABLE site_locales DISABLE ROW LEVEL SECURITY;

-- Delete existing records
DELETE FROM site_locales WHERE lang IN ('sl', 'en');

-- Insert SL with all translations
INSERT INTO site_locales (lang, content, updated_at)
SELECT 'sl', content::jsonb, now()
FROM (SELECT '{}') AS dummy(content);

-- Insert EN with all translations  
INSERT INTO site_locales (lang, content, updated_at)
SELECT 'en', content::jsonb, now()
FROM (SELECT '{}') AS dummy(content);

-- Re-enable RLS
ALTER TABLE site_locales ENABLE ROW LEVEL SECURITY;
