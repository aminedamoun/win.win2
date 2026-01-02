/*
  # Migrate Existing Job Data to Bilingual Fields

  1. Purpose
    - Copy existing job data from single-language fields to bilingual fields
    - Ensure backwards compatibility for jobs created before bilingual support

  2. Changes
    - Update existing jobs to populate title_sl and title_en from title field
    - Update existing jobs to populate short_description_sl and short_description_en

  3. Notes
    - Only updates jobs where bilingual fields are null
    - Assumes existing data is in Slovenian and copies to both sl and en fields
    - Admins can then edit English versions through the editor
*/

-- Update jobs table: copy title to bilingual fields if they are null
UPDATE jobs
SET
  title_sl = COALESCE(title_sl, title),
  title_en = COALESCE(title_en, title)
WHERE title IS NOT NULL
  AND (title_sl IS NULL OR title_en IS NULL);

-- Update jobs table: copy short_description to bilingual fields if they are null
UPDATE jobs
SET
  short_description_sl = COALESCE(short_description_sl, short_description),
  short_description_en = COALESCE(short_description_en, short_description)
WHERE short_description IS NOT NULL
  AND (short_description_sl IS NULL OR short_description_en IS NULL);