/*
  # Add Storage Policies for Website Images

  ## Purpose
  Enable authenticated users (admin) to upload, view, update, and delete
  images in the website-images storage bucket.

  ## Changes Made

  1. **Storage Policies for website-images bucket**
     - Allow public to view images (SELECT)
     - Allow authenticated users to upload images (INSERT)
     - Allow authenticated users to update images (UPDATE)
     - Allow authenticated users to delete images (DELETE)

  ## Security
  - Public can read images (since they're used on the public website)
  - Only authenticated users can upload, update, or delete images
*/

-- Allow public to view images in the website-images bucket
CREATE POLICY "Allow public to view website images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'website-images');

-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload website images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'website-images');

-- Allow authenticated users to update images
CREATE POLICY "Allow authenticated users to update website images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'website-images')
WITH CHECK (bucket_id = 'website-images');

-- Allow authenticated users to delete images
CREATE POLICY "Allow authenticated users to delete website images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'website-images');