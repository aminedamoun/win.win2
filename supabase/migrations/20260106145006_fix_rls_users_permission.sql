/*
  # Fix RLS Permission Issues for Website Content

  This migration fixes the "permission denied for table users" error by:
  
  1. Creating a helper function `is_admin()` that safely checks if the current user is an admin
  2. Updating all RLS policies on website_content to use this function instead of directly querying auth.users
  
  The helper function uses SECURITY DEFINER to run with elevated permissions, allowing it to check
  the auth.users table safely.
*/

-- Create a function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM auth.users
    WHERE id = auth.uid()
    AND (raw_app_meta_data->>'role') = 'admin'
  );
END;
$$;

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can insert website content" ON website_content;
DROP POLICY IF EXISTS "Admins can update website content" ON website_content;
DROP POLICY IF EXISTS "Admins can delete website content" ON website_content;

-- Recreate policies using the helper function
CREATE POLICY "Admins can insert website content"
  ON website_content
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update website content"
  ON website_content
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete website content"
  ON website_content
  FOR DELETE
  TO authenticated
  USING (public.is_admin());