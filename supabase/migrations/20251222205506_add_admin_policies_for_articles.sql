/*
  # Add Admin Policies for Articles and Categories

  ## Purpose
  Enable authenticated users (admin) to manage articles and categories
  in the admin panel by adding missing INSERT, UPDATE, and DELETE policies.

  ## Changes Made

  1. **article_categories Table**
     - Add INSERT policy for authenticated users to create categories
     - Add UPDATE policy for authenticated users to edit categories
     - Add DELETE policy for authenticated users to remove categories

  2. **articles Table**
     - Add INSERT policy for authenticated users to create articles
     - Add UPDATE policy for authenticated users to edit articles
     - Add DELETE policy for authenticated users to remove articles

  ## Security
  - All write operations require authentication
  - Public users can still read data (existing SELECT policies)
  - No special ownership checks since this is admin-managed content
*/

-- Add policies for article_categories
CREATE POLICY "Authenticated users can create categories"
  ON article_categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories"
  ON article_categories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete categories"
  ON article_categories FOR DELETE
  TO authenticated
  USING (true);

-- Add policies for articles
CREATE POLICY "Authenticated users can create articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete articles"
  ON articles FOR DELETE
  TO authenticated
  USING (true);