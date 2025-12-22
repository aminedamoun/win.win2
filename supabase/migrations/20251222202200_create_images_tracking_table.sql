/*
  # Create Image Tracking System

  ## Purpose
  Enable comprehensive image management in the admin panel including
  URL tracking and categorization of all images used across the website.

  ## New Tables

  ### `website_images`
  - `id` (uuid, primary key) - Unique image identifier
  - `name` (text, not null) - Human-readable image name
  - `url` (text, not null) - Image URL (external or storage)
  - `category` (text, default 'general') - Image category (hero, blog, team, logo, etc.)
  - `usage_location` (text) - Where the image is used (e.g., 'home-hero', 'about-team')
  - `alt_text` (text, default '') - Alt text for accessibility
  - `width` (integer) - Image width in pixels
  - `height` (integer) - Image height in pixels
  - `file_size` (integer) - File size in bytes
  - `storage_path` (text) - Path if stored in Supabase Storage
  - `is_active` (boolean, default true) - Whether image is currently in use
  - `created_at` (timestamptz, default now()) - Upload/creation timestamp
  - `updated_at` (timestamptz, default now()) - Last update timestamp

  ## Security
  - Enable RLS on website_images table
  - Authenticated users can manage images
  - Public can view active images

  ## Indexes
  - Index on category for filtering
  - Index on usage_location for quick lookups
*/

-- Create website_images table
CREATE TABLE IF NOT EXISTS website_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text NOT NULL,
  category text DEFAULT 'general',
  usage_location text,
  alt_text text DEFAULT '',
  width integer,
  height integer,
  file_size integer,
  storage_path text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_website_images_category ON website_images(category);
CREATE INDEX IF NOT EXISTS idx_website_images_usage_location ON website_images(usage_location);
CREATE INDEX IF NOT EXISTS idx_website_images_is_active ON website_images(is_active);

-- Enable Row Level Security
ALTER TABLE website_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies for website_images
CREATE POLICY "Anyone can view active images"
  ON website_images FOR SELECT
  TO public
  USING (is_active = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert images"
  ON website_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update images"
  ON website_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete images"
  ON website_images FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger for website_images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_website_images_updated_at'
  ) THEN
    CREATE TRIGGER update_website_images_updated_at
      BEFORE UPDATE ON website_images
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Insert existing images from the website for tracking
INSERT INTO website_images (name, url, category, usage_location, alt_text) VALUES
  ('Home Hero Background', 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920', 'hero', 'home-hero', 'Business professionals in meeting'),
  ('About Hero Background', 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1920', 'hero', 'about-hero', 'Team collaboration'),
  ('Insights Hero Background', 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920', 'hero', 'insights-hero', 'Sales team discussion'),
  ('Blog: Trust in Sales', 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1200', 'blog', 'article-trust-sales', 'Business handshake'),
  ('Blog: First 90 Days', 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200', 'blog', 'article-first-90-days', 'New team member'),
  ('Blog: Field Sales', 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200', 'blog', 'article-field-sales', 'Field sales representative'),
  ('Blog: Call Center', 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1200', 'blog', 'article-call-center', 'Call center operations'),
  ('Blog: Rejection', 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1200', 'blog', 'article-rejection', 'Mental resilience')
ON CONFLICT DO NOTHING;
