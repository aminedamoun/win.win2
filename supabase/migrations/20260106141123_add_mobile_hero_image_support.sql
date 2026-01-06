/*
  # Add Mobile Hero Image Support

  1. Changes
    - Creates a storage bucket for website images if not exists
    - Adds storage policies for public access to website images
    - Sets up infrastructure for managing separate mobile and desktop hero images

  2. Security
    - Public read access for website images bucket
    - Authenticated users can upload/update images
*/

-- Create storage bucket for website images if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-images', 'website-images', true)
ON CONFLICT (id) DO NOTHING;

-- Enable public read access to website images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public read access for website images'
  ) THEN
    CREATE POLICY "Public read access for website images"
      ON storage.objects FOR SELECT
      TO public
      USING (bucket_id = 'website-images');
  END IF;
END $$;

-- Allow authenticated users to upload images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can upload website images'
  ) THEN
    CREATE POLICY "Authenticated users can upload website images"
      ON storage.objects FOR INSERT
      TO authenticated
      WITH CHECK (bucket_id = 'website-images');
  END IF;
END $$;

-- Allow authenticated users to update images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can update website images'
  ) THEN
    CREATE POLICY "Authenticated users can update website images"
      ON storage.objects FOR UPDATE
      TO authenticated
      USING (bucket_id = 'website-images');
  END IF;
END $$;

-- Allow authenticated users to delete images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can delete website images'
  ) THEN
    CREATE POLICY "Authenticated users can delete website images"
      ON storage.objects FOR DELETE
      TO authenticated
      USING (bucket_id = 'website-images');
  END IF;
END $$;
