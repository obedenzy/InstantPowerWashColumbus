/*
  # Modify database schema to store date and time separately in EST

  This migration modifies the `servicebookings` and `paintingservicebookings` tables
  to store the booking date and time in separate columns, using EST.

  1. Changes to `servicebookings`
     - Drop the existing `unique_booking_start_utc` constraint.
     - Drop the `booking_start_utc` column.
     - Add a new `booking_date` column (date, not null).
     - Add a new `book_time` column (text, not null).
     - Add a unique constraint `unique_booking_slot` on (`booking_date`, `book_time`).

  2. Changes to `paintingservicebookings`
     - Drop the `idx_paintingservicebookings_booking_start_utc` index.
     - Drop the `booking_start_utc` column.
     - Add a new `booking_date_est` column (date, not null).
     - Add a new `book_time_est` column (text, not null).

  3. Data Migration (Manual Step Required)
     - A script is needed to migrate existing data from `booking_start_utc` to the new columns.
       This script is not included in this migration and must be run separately.

  4. Security
     - Re-applies RLS policies for SELECT and INSERT using the new structure.
*/

-- 1. Changes to servicebookings
ALTER TABLE public.servicebookings DROP CONSTRAINT IF EXISTS unique_booking_start_utc;
ALTER TABLE public.servicebookings DROP COLUMN IF EXISTS booking_start_utc;
ALTER TABLE public.servicebookings ADD COLUMN booking_date date NOT NULL;
ALTER TABLE public.servicebookings ADD COLUMN book_time text NOT NULL;

-- Add Unique Constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'unique_booking_slot' AND conrelid = 'public.servicebookings'::regclass
  ) THEN
    ALTER TABLE public.servicebookings
    ADD CONSTRAINT unique_booking_slot UNIQUE (booking_date, book_time);
  END IF;
END $$;

-- 2. Changes to paintingservicebookings
DROP INDEX IF EXISTS public.idx_paintingservicebookings_booking_start_utc;
ALTER TABLE public.paintingservicebookings DROP COLUMN IF EXISTS booking_start_utc;
ALTER TABLE public.paintingservicebookings ADD COLUMN booking_date_est date NOT NULL;
ALTER TABLE public.paintingservicebookings ADD COLUMN book_time_est text NOT NULL;

-- 3. Data Migration (Manual Step Required)
-- This script is not included in this migration and must be run separately.
-- Example (Conceptual - requires careful timezone handling):
-- UPDATE public.servicebookings SET booking_date = (booking_start_utc AT TIME ZONE 'America/New_York')::date, book_time = to_char((booking_start_utc AT TIME ZONE 'America/New_York')::time, 'HH24:MI');
-- UPDATE public.paintingservicebookings SET booking_date_est = (booking_start_utc AT TIME ZONE 'America/New_York')::date, book_time_est = to_char((booking_start_utc AT TIME ZONE 'America/New_York')::time, 'HH24:MI');

-- 4. Security
-- Re-apply RLS policies (adjust if needed)
ALTER TABLE public.servicebookings ENABLE ROW LEVEL SECURITY;

-- Allow public read access (needed for backend availability checks)
DROP POLICY IF EXISTS "Allow public read access" ON public.servicebookings;
CREATE POLICY "Allow public read access"
  ON public.servicebookings
  FOR SELECT
  USING (true);

-- Allow authenticated users (like the backend service role) to insert
-- Adjust 'authenticated' to a more specific role if needed for production security
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON public.servicebookings;
CREATE POLICY "Allow authenticated users to insert"
  ON public.servicebookings
  FOR INSERT
  TO authenticated -- Or replace with a specific service role if you have one
  WITH CHECK (true);

-- Re-apply/Update RLS Policies (adjust if needed)
-- Drop old policies first if they exist and might conflict
DROP POLICY IF EXISTS "Allow authenticated users to insert their own bookings" ON public.paintingservicebookings;
DROP POLICY IF EXISTS "Allow service_role to manage all bookings" ON public.paintingservicebookings;
DROP POLICY IF EXISTS "Deny modification for other roles" ON public.paintingservicebookings;

-- Allow authenticated users to insert their own bookings
-- This assumes you might have user accounts later. For now, the backend will use its service_role.
CREATE POLICY "Allow authenticated users to insert their own bookings"
  ON public.paintingservicebookings
  FOR INSERT
  TO authenticated -- This means any logged-in Supabase user.
  WITH CHECK (true); -- Or more specific checks like auth.uid() = user_id if you add a user_id column

-- Allow service_role (backend) to manage all bookings
CREATE POLICY "Allow service_role to manage all bookings"
  ON public.paintingservicebookings
  FOR ALL -- SELECT, INSERT, UPDATE, DELETE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Deny public read by default (no explicit SELECT policy for 'public' or 'anon')
-- Deny other roles from modifying unless explicitly allowed
CREATE POLICY "Deny modification for other roles"
  ON public.paintingservicebookings
  FOR ALL
  USING (false)
  WITH CHECK (false);
