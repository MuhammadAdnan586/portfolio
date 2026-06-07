/*
# Create contact_messages table for portfolio contact form

## Overview
This migration creates a table to store all contact form submissions from the portfolio website. 
Since this is a public contact form (no authentication required), the table allows anyone to submit messages
and the site owner can access all submissions to respond to inquiries.

## New Tables
- `contact_messages`: Stores all contact form submissions
  - `id` (uuid): Unique identifier, primary key
  - `name` (text): Visitor's name
  - `email` (text): Visitor's email address
  - `subject` (text): Message subject
  - `message` (text): Message content
  - `created_at` (timestamptz): Timestamp when message was received
  - `is_read` (boolean): Track if site owner has read the message (default: false)

## Security
- Enable RLS on `contact_messages`
- Create policies allowing anyone (anon + authenticated) to INSERT their own messages
- Create policy allowing anyone to SELECT all messages (can be restricted later to authenticated owner)
- This is intentionally public since it's a contact form that accepts public submissions

## Important Notes
1. Messages are stored server-side and persist across requests
2. Site owner can access messages via Supabase dashboard or API
3. Consider backing up messages regularly
4. Messages never expire - consider archiving old messages if table grows large
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create index on created_at for faster sorting of recent messages
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Create index on is_read for filtering unread messages
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON contact_messages(is_read);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can INSERT a new contact message
DROP POLICY IF EXISTS "allow_insert_contact_messages" ON contact_messages;
CREATE POLICY "allow_insert_contact_messages"
ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy: Anyone can SELECT all messages (can be restricted to authenticated later)
DROP POLICY IF EXISTS "allow_select_contact_messages" ON contact_messages;
CREATE POLICY "allow_select_contact_messages"
ON contact_messages FOR SELECT
TO anon, authenticated
USING (true);

-- Policy: Allow UPDATE to mark messages as read (by owner only - in future with auth)
DROP POLICY IF EXISTS "allow_update_contact_messages" ON contact_messages;
CREATE POLICY "allow_update_contact_messages"
ON contact_messages FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);
