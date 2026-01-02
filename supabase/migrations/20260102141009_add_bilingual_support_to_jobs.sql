/*
  # Add Bilingual Support to Jobs and Articles

  1. Changes to `jobs` table
    - Add columns for Slovenian and English versions of content
    - Keep existing columns for backward compatibility
    
  2. Changes to `articles` table
    - Add columns for Slovenian and English versions of content
    
  3. New columns added:
    - `title_sl` (Slovenian title)
    - `title_en` (English title)
    - `short_description_sl` (Slovenian short description)
    - `short_description_en` (English short description)
    - `full_description_sl` (Slovenian full description)
    - `full_description_en` (English full description)
    - Similar fields for articles
    
  4. Notes
    - Original columns remain for backward compatibility
    - Default language can be set at application level
*/

-- Add bilingual columns to jobs table
DO $$
BEGIN
  -- Job titles
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'jobs' AND column_name = 'title_sl'
  ) THEN
    ALTER TABLE jobs ADD COLUMN title_sl text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'jobs' AND column_name = 'title_en'
  ) THEN
    ALTER TABLE jobs ADD COLUMN title_en text;
  END IF;

  -- Short descriptions
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'jobs' AND column_name = 'short_description_sl'
  ) THEN
    ALTER TABLE jobs ADD COLUMN short_description_sl text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'jobs' AND column_name = 'short_description_en'
  ) THEN
    ALTER TABLE jobs ADD COLUMN short_description_en text;
  END IF;

  -- Full descriptions
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'jobs' AND column_name = 'full_description_sl'
  ) THEN
    ALTER TABLE jobs ADD COLUMN full_description_sl text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'jobs' AND column_name = 'full_description_en'
  ) THEN
    ALTER TABLE jobs ADD COLUMN full_description_en text;
  END IF;

  -- Requirements
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'jobs' AND column_name = 'requirements_sl'
  ) THEN
    ALTER TABLE jobs ADD COLUMN requirements_sl text[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'jobs' AND column_name = 'requirements_en'
  ) THEN
    ALTER TABLE jobs ADD COLUMN requirements_en text[];
  END IF;

  -- Responsibilities
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'jobs' AND column_name = 'responsibilities_sl'
  ) THEN
    ALTER TABLE jobs ADD COLUMN responsibilities_sl text[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'jobs' AND column_name = 'responsibilities_en'
  ) THEN
    ALTER TABLE jobs ADD COLUMN responsibilities_en text[];
  END IF;

  -- Benefits
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'jobs' AND column_name = 'benefits_sl'
  ) THEN
    ALTER TABLE jobs ADD COLUMN benefits_sl text[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'jobs' AND column_name = 'benefits_en'
  ) THEN
    ALTER TABLE jobs ADD COLUMN benefits_en text[];
  END IF;
END $$;

-- Add bilingual columns to articles table
DO $$
BEGIN
  -- Article titles
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'title_sl'
  ) THEN
    ALTER TABLE articles ADD COLUMN title_sl text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'title_en'
  ) THEN
    ALTER TABLE articles ADD COLUMN title_en text;
  END IF;

  -- Excerpts
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'excerpt_sl'
  ) THEN
    ALTER TABLE articles ADD COLUMN excerpt_sl text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'excerpt_en'
  ) THEN
    ALTER TABLE articles ADD COLUMN excerpt_en text;
  END IF;

  -- Content
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'content_sl'
  ) THEN
    ALTER TABLE articles ADD COLUMN content_sl text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'content_en'
  ) THEN
    ALTER TABLE articles ADD COLUMN content_en text;
  END IF;
END $$;
