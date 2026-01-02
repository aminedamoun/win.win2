/*
  # Migrate Existing Blog Content to Bilingual Format

  1. Purpose
    - Copy existing article content from single-language columns to bilingual columns
    - Existing content is assumed to be in Slovenian (primary language)
    - This ensures all existing articles display properly in the updated blog editor

  2. Changes
    - Update all articles where title_sl is NULL to copy title → title_sl
    - Update all articles where excerpt_sl is NULL to copy excerpt → excerpt_sl
    - Update all articles where content_sl is NULL to copy content → content_sl
    - Keep the original columns for backward compatibility

  3. Notes
    - Only updates rows where the bilingual columns are empty
    - Does not overwrite existing bilingual content
    - After migration, editors can add English translations manually or via AI
*/

-- Migrate title to title_sl
UPDATE articles 
SET title_sl = title 
WHERE title_sl IS NULL AND title IS NOT NULL;

-- Migrate excerpt to excerpt_sl
UPDATE articles 
SET excerpt_sl = excerpt 
WHERE excerpt_sl IS NULL AND excerpt IS NOT NULL;

-- Migrate content to content_sl
UPDATE articles 
SET content_sl = content 
WHERE content_sl IS NULL AND content IS NOT NULL;
