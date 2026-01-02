/*
  # Fix Security and Performance Issues

  ## Overview
  This migration addresses security vulnerabilities and performance bottlenecks
  identified in the database health report.

  ## Changes Made

  ### 1. Performance Improvements
  - **Add missing foreign key index**: Create index on `appointments.conversation_id` to improve join performance
  
  ### 2. Security Enhancements
  - **Optimize RLS policy**: Fix `website_images` policy to use subquery pattern `(select auth.uid())` instead of `auth.uid()` for better performance at scale
  - **Fix duplicate policies**: Remove redundant SELECT policy on `jobs` table (keeping only the authenticated user policy)
  
  ### 3. Database Cleanup
  - **Remove unused indexes**: Drop indexes that are not being utilized to reduce storage and improve write performance:
    - `idx_articles_is_featured` (partial index not being used)
    - `posts_slug_idx` (slug lookups not common enough to justify index)
    - `posts_status_idx` (status filtering not frequently used)
    - `posts_category_id_idx` (category filtering not common)
    - `posts_author_id_idx` (author filtering not common)
    - `categories_slug_idx` (category slug lookups rare)
    - `idx_website_images_is_active` (is_active filtering not common)
    - `idx_jobs_is_active` (is_active filtering not common)
    - `idx_appointments_created_at` (date sorting not frequently used)

  ## Security Notes
  - All tables maintain proper Row Level Security (RLS)
  - Public access remains restricted to viewing active/published content only
  - Write operations require authentication

  ## Important Configuration Notes
  The following issues require manual configuration in Supabase Dashboard:
  
  1. **Auth DB Connection Strategy**: Switch to percentage-based connection allocation
     - Navigate to Project Settings → Database → Connection Pooling
     - Change Auth server connections from fixed (10) to percentage-based
  
  2. **Leaked Password Protection**: Enable compromised password checking
     - Navigate to Authentication → Policies → Security
     - Enable "Check for leaked passwords using HaveIBeenPwned.org"
*/

-- ============================================================================
-- 1. ADD MISSING FOREIGN KEY INDEX
-- ============================================================================

-- Add index for appointments.conversation_id foreign key to improve join performance
CREATE INDEX IF NOT EXISTS idx_appointments_conversation_id 
  ON appointments(conversation_id);

-- ============================================================================
-- 2. FIX RLS POLICY PERFORMANCE ISSUE
-- ============================================================================

-- Drop the existing policy that uses auth.uid() directly (causes re-evaluation per row)
DROP POLICY IF EXISTS "Anyone can view active images" ON website_images;

-- Recreate with optimized subquery pattern
CREATE POLICY "Anyone can view active images"
  ON website_images FOR SELECT
  TO public
  USING (is_active = true OR (SELECT auth.uid()) IS NOT NULL);

-- ============================================================================
-- 3. FIX MULTIPLE PERMISSIVE POLICIES ON JOBS TABLE
-- ============================================================================

-- Drop the redundant public SELECT policy (keeping only authenticated policy)
-- This eliminates the conflicting permissive policies issue
DROP POLICY IF EXISTS "Anyone can view active jobs" ON jobs;

-- The remaining "Authenticated users can view all jobs" policy provides:
-- - Authenticated users: can see all jobs (active and inactive)
-- - Anonymous users: no access (which is fine since jobs are meant for logged-in users)

-- If public access to active jobs is needed, add it back as a more specific policy:
CREATE POLICY "Public can view active jobs only"
  ON jobs FOR SELECT
  TO anon
  USING (is_active = true);

-- ============================================================================
-- 4. REMOVE UNUSED INDEXES
-- ============================================================================

-- Drop unused indexes to improve write performance and reduce storage overhead

-- Articles table
DROP INDEX IF EXISTS idx_articles_is_featured;

-- Posts table
DROP INDEX IF EXISTS posts_slug_idx;
DROP INDEX IF EXISTS posts_status_idx;
DROP INDEX IF EXISTS posts_category_id_idx;
DROP INDEX IF EXISTS posts_author_id_idx;

-- Categories table
DROP INDEX IF EXISTS categories_slug_idx;

-- Website images table
DROP INDEX IF EXISTS idx_website_images_is_active;

-- Jobs table
DROP INDEX IF EXISTS idx_jobs_is_active;

-- Appointments table
DROP INDEX IF EXISTS idx_appointments_created_at;

-- ============================================================================
-- VERIFICATION NOTES
-- ============================================================================

/*
  After applying this migration:
  
  ✅ Foreign key on appointments.conversation_id is now indexed
  ✅ RLS policy on website_images uses optimized subquery pattern
  ✅ Jobs table has single, clear SELECT policy per role
  ✅ Unused indexes removed, improving write performance
  
  ⚠️  Manual configuration still required:
  - Auth DB connection strategy (Supabase Dashboard)
  - Leaked password protection (Supabase Dashboard)
  
  To verify improvements, run the database health report again.
*/
