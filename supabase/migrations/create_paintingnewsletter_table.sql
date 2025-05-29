/*
      # Create paintingnewsletter Table

      This migration creates the `paintingnewsletter` table to store email addresses
      of users who subscribe to the newsletter.

      1. New Tables
         - `paintingnewsletter`
           - `id` (uuid, primary key, default gen_random_uuid()) - Unique identifier for the subscription.
           - `email` (TEXT, not null, unique) - The email address of the subscriber.
           - `created_at` (TIMESTAMPTZ, default now()) - Timestamp of when the subscription was created.

      2. Constraints
         - `email` column has a UNIQUE constraint to prevent duplicate subscriptions.

      3. Security
         - Enables Row Level Security (RLS) on the `paintingnewsletter` table.
         - Policy "Public can insert their own email": Allows anonymous users (representing public website visitors) to insert their email addresses.
         - Policy "Admin can read/manage newsletter": Allows users with `service_role` (typically backend admins) to perform all operations on the table.

      4. Indexes
         - A unique index is automatically created for the `email` column due to the UNIQUE constraint.
    */

    -- Create Table
    CREATE TABLE IF NOT EXISTS public.paintingnewsletter (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ DEFAULT now()
    );

    COMMENT ON TABLE public.paintingnewsletter IS 'Stores email addresses for newsletter subscriptions.';
    COMMENT ON COLUMN public.paintingnewsletter.email IS 'Subscriber email address, must be unique.';

    -- Enable RLS
    ALTER TABLE public.paintingnewsletter ENABLE ROW LEVEL SECURITY;

    -- Policies
    DROP POLICY IF EXISTS "Public can insert their own email" ON public.paintingnewsletter;
    CREATE POLICY "Public can insert their own email"
      ON public.paintingnewsletter
      FOR INSERT
      TO anon -- anon role is used by default by supabase-js client when no user is logged in
      WITH CHECK (true); -- No specific check needed beyond what the table constraints enforce (like UNIQUE email)

    DROP POLICY IF EXISTS "Admin can read/manage newsletter" ON public.paintingnewsletter;
    CREATE POLICY "Admin can read/manage newsletter"
      ON public.paintingnewsletter
      FOR ALL
      TO service_role -- Or 'authenticated' if admins log in as regular users with special permissions
      USING (true)
      WITH CHECK (true);