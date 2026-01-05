/*
  # Create Website Content Management Table

  1. New Tables
    - `website_content`
      - `id` (uuid, primary key)
      - `page` (text) - Page identifier (e.g., 'home', 'about', 'jobs')
      - `section` (text) - Section key (e.g., 'hero.title', 'hero.description')
      - `language` (text) - Language code ('en' or 'sl')
      - `content` (text) - The actual content text
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - Unique constraint on (page, section, language)
  
  2. Security
    - Enable RLS on `website_content` table
    - Add policy for anyone to read content (public access)
    - Add policy for authenticated users with admin role to insert content
    - Add policy for authenticated users with admin role to update content
    - Add policy for authenticated users with admin role to delete content
  
  3. Indexes
    - Index on (page, language) for faster queries
    - Index on page for filtering by page
*/

CREATE TABLE IF NOT EXISTS website_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  section text NOT NULL,
  language text NOT NULL CHECK (language IN ('en', 'sl')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page, section, language)
);

ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read website content"
  ON website_content
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert website content"
  ON website_content
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admins can update website content"
  ON website_content
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admins can delete website content"
  ON website_content
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

CREATE INDEX IF NOT EXISTS idx_website_content_page_language ON website_content(page, language);
CREATE INDEX IF NOT EXISTS idx_website_content_page ON website_content(page);

CREATE OR REPLACE FUNCTION update_website_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER website_content_updated_at
  BEFORE UPDATE ON website_content
  FOR EACH ROW
  EXECUTE FUNCTION update_website_content_updated_at();