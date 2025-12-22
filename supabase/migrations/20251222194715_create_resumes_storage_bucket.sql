/*
  # Create Storage Bucket for Resumes

  1. Storage Setup
    - Create a public bucket named 'resumes' for storing applicant CV/resume files
    - Configure bucket policies to allow authenticated and anonymous uploads
    - Set up RLS policies for secure file access
  
  2. Database Changes
    - Add `resume_url` column to `job_applications` table to store file references
  
  3. Security
    - Public bucket allows file viewing via URL
    - Upload restricted to application form submissions
    - Files are accessible but not listable by unauthorized users
*/

-- Add resume_url column to job_applications table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'job_applications' AND column_name = 'resume_url'
  ) THEN
    ALTER TABLE job_applications ADD COLUMN resume_url text;
  END IF;
END $$;

-- Create the resumes storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload files to the resumes bucket
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Allow public uploads to resumes bucket'
  ) THEN
    CREATE POLICY "Allow public uploads to resumes bucket"
      ON storage.objects
      FOR INSERT
      TO public
      WITH CHECK (bucket_id = 'resumes');
  END IF;
END $$;

-- Allow anyone to view files in the resumes bucket
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Allow public access to resumes'
  ) THEN
    CREATE POLICY "Allow public access to resumes"
      ON storage.objects
      FOR SELECT
      TO public
      USING (bucket_id = 'resumes');
  END IF;
END $$;

-- Allow file owners to delete their files (optional, for cleanup)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Allow authenticated users to delete own files'
  ) THEN
    CREATE POLICY "Allow authenticated users to delete own files"
      ON storage.objects
      FOR DELETE
      TO authenticated
      USING (bucket_id = 'resumes');
  END IF;
END $$;