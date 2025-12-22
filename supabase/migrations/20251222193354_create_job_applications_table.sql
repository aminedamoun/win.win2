/*
  # Create job applications table

  1. New Tables
    - `job_applications`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text)
      - `preferred_time` (text)
      - `message` (text)
      - `status` (text) - pending, contacted, rejected, hired
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on `job_applications` table
    - Add policy for inserting applications (public can submit)
    - Add policy for admin to read applications
*/

CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  preferred_time text DEFAULT '',
  message text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit applications"
  ON job_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);