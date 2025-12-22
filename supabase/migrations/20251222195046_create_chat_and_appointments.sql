/*
  # Create Chat and Appointments System

  1. New Tables
    - `chat_conversations`
      - `id` (uuid, primary key)
      - `session_id` (text, unique identifier for anonymous users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `metadata` (jsonb, for storing additional info)
    
    - `chat_messages`
      - `id` (uuid, primary key)
      - `conversation_id` (uuid, foreign key to conversations)
      - `role` (text, either 'user' or 'assistant')
      - `content` (text, the message content)
      - `created_at` (timestamptz)
    
    - `appointments`
      - `id` (uuid, primary key)
      - `conversation_id` (uuid, nullable foreign key to conversations)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `preferred_date` (text)
      - `preferred_time` (text)
      - `message` (text)
      - `status` (text, default 'pending')
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Allow public read/write access to chat tables (anonymous users)
    - Allow public insert to appointments
*/

-- Create chat_conversations table
CREATE TABLE IF NOT EXISTS chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES chat_conversations(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES chat_conversations(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  preferred_date text NOT NULL,
  preferred_time text NOT NULL,
  message text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Chat conversations policies - allow public access
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'chat_conversations' 
    AND policyname = 'Allow public read access to conversations'
  ) THEN
    CREATE POLICY "Allow public read access to conversations"
      ON chat_conversations
      FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'chat_conversations' 
    AND policyname = 'Allow public insert to conversations'
  ) THEN
    CREATE POLICY "Allow public insert to conversations"
      ON chat_conversations
      FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

-- Chat messages policies - allow public access
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'chat_messages' 
    AND policyname = 'Allow public read access to messages'
  ) THEN
    CREATE POLICY "Allow public read access to messages"
      ON chat_messages
      FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'chat_messages' 
    AND policyname = 'Allow public insert to messages'
  ) THEN
    CREATE POLICY "Allow public insert to messages"
      ON chat_messages
      FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

-- Appointments policies - allow public insert, authenticated read
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'appointments' 
    AND policyname = 'Allow public insert to appointments'
  ) THEN
    CREATE POLICY "Allow public insert to appointments"
      ON appointments
      FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'appointments' 
    AND policyname = 'Allow authenticated read to appointments'
  ) THEN
    CREATE POLICY "Allow authenticated read to appointments"
      ON appointments
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation_id ON chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_session_id ON chat_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments(created_at DESC);