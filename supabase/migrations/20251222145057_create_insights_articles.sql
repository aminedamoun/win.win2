/*
  # Create Insights & Articles System

  ## Purpose
  This migration creates the database schema for the Win Win Insights blog/news section,
  enabling content management for sales strategies, company updates, and career insights.

  ## New Tables

  ### `article_categories`
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text, unique, not null) - Category name (e.g., "Sales Tips", "Career Growth")
  - `slug` (text, unique, not null) - URL-friendly category identifier
  - `description` (text) - Category description
  - `created_at` (timestamptz) - Creation timestamp

  ### `articles`
  - `id` (uuid, primary key) - Unique article identifier
  - `title` (text, not null) - Article title
  - `slug` (text, unique, not null) - URL-friendly article identifier
  - `excerpt` (text, not null) - Short summary/preview text
  - `content` (text, not null) - Full article content (markdown supported)
  - `category_id` (uuid, foreign key) - Reference to article_categories
  - `featured_image_url` (text) - URL to header/featured image
  - `is_featured` (boolean, default false) - Whether article appears as featured
  - `author` (text, default 'Win Win Team') - Article author name
  - `read_time` (integer, default 5) - Estimated reading time in minutes
  - `published_at` (timestamptz, default now()) - Publication timestamp
  - `created_at` (timestamptz, default now()) - Creation timestamp
  - `updated_at` (timestamptz, default now()) - Last update timestamp
  - `views` (integer, default 0) - View counter

  ## Security
  - Enable RLS on both tables
  - Public read access for published articles
  - No public write access (admin-only via backend)

  ## Indexes
  - Index on published_at for sorting
  - Index on slug for fast lookups
  - Index on category_id for filtering
*/

-- Create article_categories table
CREATE TABLE IF NOT EXISTS article_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category_id uuid REFERENCES article_categories(id) ON DELETE SET NULL,
  featured_image_url text,
  is_featured boolean DEFAULT false,
  author text DEFAULT 'Win Win Team',
  read_time integer DEFAULT 5,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  views integer DEFAULT 0
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category_id ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_is_featured ON articles(is_featured) WHERE is_featured = true;

-- Enable Row Level Security
ALTER TABLE article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for article_categories (public read access)
CREATE POLICY "Anyone can view categories"
  ON article_categories FOR SELECT
  TO public
  USING (true);

-- RLS Policies for articles (public read access)
CREATE POLICY "Anyone can view published articles"
  ON articles FOR SELECT
  TO public
  USING (true);

-- Insert default categories
INSERT INTO article_categories (name, slug, description) VALUES
  ('Sales Tips', 'sales-tips', 'Expert strategies and techniques for successful B2C sales'),
  ('Career Growth', 'career-growth', 'Professional development and career advancement insights'),
  ('Inside Win Win', 'inside-win-win', 'Team stories, culture, and behind-the-scenes'),
  ('Field Sales', 'field-sales', 'Door-to-door sales insights and best practices'),
  ('Call Center', 'call-center', 'Telemarketing strategies and success stories'),
  ('Leadership', 'leadership', 'Management, coaching, and team leadership content'),
  ('Company Updates', 'company-updates', 'Latest news, announcements, and achievements')
ON CONFLICT (slug) DO NOTHING;