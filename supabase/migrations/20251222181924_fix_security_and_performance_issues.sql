/*
  # Fix Security and Performance Issues

  ## Changes Made

  1. **Performance Optimization**
     - Add missing index on `posts.author_id` foreign key for better query performance
     - Update RLS policies to use `(select auth.uid())` instead of `auth.uid()` to avoid re-evaluation per row
     - Fix function search_path for security

  2. **RLS Policy Updates**
     - Recreate all `posts` table policies with optimized auth function calls
     - This significantly improves query performance at scale

  3. **Function Security**
     - Set proper search_path on `update_updated_at_column` function

  ## Important Notes
  - The existing unused indexes are intentionally kept as they will be used once data exists
  - These optimizations prevent performance degradation as the database grows
*/

-- Add missing index on author_id foreign key
CREATE INDEX IF NOT EXISTS posts_author_id_idx ON posts(author_id);

-- Drop existing RLS policies on posts table
DROP POLICY IF EXISTS "Anyone can view published posts" ON posts;
DROP POLICY IF EXISTS "Authenticated users can create posts" ON posts;
DROP POLICY IF EXISTS "Authors can update their own posts" ON posts;
DROP POLICY IF EXISTS "Authors can delete their own posts" ON posts;

-- Recreate RLS policies with optimized auth function calls
CREATE POLICY "Anyone can view published posts"
  ON posts FOR SELECT
  USING (status = 'published' OR (select auth.uid()) = author_id);

CREATE POLICY "Authenticated users can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = author_id);

CREATE POLICY "Authors can update their own posts"
  ON posts FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = author_id)
  WITH CHECK ((select auth.uid()) = author_id);

CREATE POLICY "Authors can delete their own posts"
  ON posts FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = author_id);

-- Fix function search_path for security
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp;
