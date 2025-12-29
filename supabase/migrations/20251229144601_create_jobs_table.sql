/*
  # Create Jobs Table for Admin Management

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key) - Unique identifier for the job
      - `title` (text) - Job title (e.g., "Sales Advisor - Field Sales")
      - `type` (text) - Job type category (e.g., "field-sales", "call-center", "team-leader")
      - `location` (text) - Job location(s) (e.g., "Trzin, Kranj, Nationwide")
      - `short_description` (text) - Brief description of the job
      - `salary_range` (text) - Salary information (e.g., "Base + Commission")
      - `is_active` (boolean, default true) - Whether the job posting is currently active
      - `created_at` (timestamptz) - Timestamp when job was created
      - `updated_at` (timestamptz) - Timestamp when job was last updated
      - `display_order` (integer, default 0) - Order for displaying jobs on the website

  2. Security
    - Enable RLS on `jobs` table
    - Add policy for public read access to active jobs
    - Add policy for authenticated admin users to manage jobs

  3. Important Notes
    - The `is_active` field allows jobs to be hidden without deletion
    - The `display_order` field enables custom ordering of job listings
    - Public users can only view active jobs
    - Only authenticated users (admins) can create, update, or delete jobs
*/

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  location text NOT NULL,
  short_description text NOT NULL,
  salary_range text NOT NULL,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active jobs
CREATE POLICY "Anyone can view active jobs"
  ON jobs
  FOR SELECT
  USING (is_active = true);

-- Policy: Authenticated users can view all jobs (including inactive)
CREATE POLICY "Authenticated users can view all jobs"
  ON jobs
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can insert jobs
CREATE POLICY "Authenticated users can create jobs"
  ON jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update jobs
CREATE POLICY "Authenticated users can update jobs"
  ON jobs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete jobs
CREATE POLICY "Authenticated users can delete jobs"
  ON jobs
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_jobs_is_active ON jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_jobs_display_order ON jobs(display_order);

-- Insert existing jobs from the static data
INSERT INTO jobs (title, type, location, short_description, salary_range, display_order) VALUES
  ('Sales Advisor - Field Sales', 'field-sales', 'Trzin, Kranj, Nationwide', 'Present and sell telecommunications services (Internet, TV, Mobile) directly to customers in the field.', 'Base + Commission', 1),
  ('Sales Advisor - Call Center', 'call-center', 'Trzin, Kranj', 'Phone-based sales of telecommunications and ICT solutions to potential and existing customers.', 'Base + Commission', 2),
  ('Sales Team Leader', 'team-leader', 'Trzin, Kranj', 'Lead and coach a team of sales advisors while driving performance and meeting KPIs.', '€2,000+ Base + Bonuses', 3);