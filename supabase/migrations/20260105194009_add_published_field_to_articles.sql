/*
  # Add Published Field to Articles

  1. Changes
    - Add `published` boolean column to `articles` table
    - Default value is `true` to maintain backward compatibility
    - Add index on `published` column for performance
  
  2. Notes
    - Existing articles will be automatically published
    - Admins can unpublish articles to hide them from public view
    - Unpublished articles remain visible in admin panel
*/

-- Add published column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'published'
  ) THEN
    ALTER TABLE articles ADD COLUMN published boolean DEFAULT true NOT NULL;
  END IF;
END $$;

-- Create index for better query performance on published articles
CREATE INDEX IF NOT EXISTS idx_articles_published 
ON articles(published);

-- Create index for commonly queried combinations
CREATE INDEX IF NOT EXISTS idx_articles_published_created 
ON articles(published, created_at DESC);
