/*
  # Fix Bilingual Content Language Assignment

  1. Purpose
    - Move existing English content to English columns (not Slovenian)
    - Existing articles were written in English
    - Clear Slovenian columns so they can be translated later

  2. Changes
    - Move title_sl → title_en (existing content is English)
    - Move excerpt_sl → excerpt_en (existing content is English)
    - Move content_sl → content_en (existing content is English)
    - Clear the _sl columns to allow for Slovenian translations

  3. Notes
    - Only affects rows where English columns are empty
    - Prepares articles for Slovenian translation via AI or manual entry
*/

-- Move English content from _sl columns to _en columns
UPDATE articles 
SET 
  title_en = title_sl,
  excerpt_en = excerpt_sl,
  content_en = content_sl,
  title_sl = NULL,
  excerpt_sl = NULL,
  content_sl = NULL
WHERE content_en IS NULL AND content_sl IS NOT NULL;
