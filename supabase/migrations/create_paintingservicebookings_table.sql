/*
  # Create paintingservicebookings table

  This migration creates the `paintingservicebookings` table to store the
  full details of each painting service booking.

  1. New Tables
     - `paintingservicebookings`
       - `id` (uuid, primary key, default gen_random_uuid()) - Unique identifier for the booking.
       - `booking_start_utc` (timestamptz, not null) - The exact start time of the booking in UTC. This should match an entry in `servicebookings`.
       - `first_name` (text, not null) - Customer's first name.
       - `email` (text, not null) - Customer's email address.
       - `phone` (text) - Customer's phone number (optional).
       - `project_address` (text, not null) - Address of the painting project.
       - `project_description` (text) - Description of the project (optional).
       - `selected_services_details` (jsonb) - JSON array of selected services, including title, quantity, price range, and estimated price for each.
       - `total_min_estimated_price` (numeric(10, 2)) - The minimum of the total estimated price range for the booking.
       - `total_max_estimated_price` (numeric(10, 2)) - The maximum of the total estimated price range for the booking.
       - `created_at` (timestamptz, not null, default now()) - Timestamp of when the booking was created.

  2. Foreign Keys
     - Potentially a foreign key to `servicebookings(booking_start_utc)` if strict referential integrity is desired,
       though this can make direct inserts into `servicebookings` more complex if that table is purely for slot blocking.
       For this iteration, we'll keep them separate but ensure `booking_start_utc` is populated.

  3. Security
     - Enables Row Level Security (RLS) on the `paintingservicebookings` table.
     - Adds a policy `Allow authenticated users to insert their own bookings`.
     - Adds a policy `Allow service_role to manage all bookings` (for admin/backend operations).
     - Public read access is denied by default.
*/

-- 1. Create Table
CREATE TABLE IF NOT EXISTS public.paintingservicebookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_start_utc timestamptz NOT NULL,
  first_name text NOT NULL,
  email text NOT NULL,
  phone text,
  project_address text NOT NULL,
  project_description text,
  selected_services_details jsonb,
  total_min_estimated_price numeric(10, 2),
  total_max_estimated_price numeric(10, 2),
  created_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.paintingservicebookings IS 'Stores full details for each painting service booking.';
COMMENT ON COLUMN public.paintingservicebookings.booking_start_utc IS 'Corresponds to the booked slot in servicebookings.';
COMMENT ON COLUMN public.paintingservicebookings.selected_services_details IS 'JSON array of objects, each representing a selected service with its details.';
COMMENT ON COLUMN public.paintingservicebookings.total_min_estimated_price IS 'Overall minimum estimated price for the booking.';
COMMENT ON COLUMN public.paintingservicebookings.total_max_estimated_price IS 'Overall maximum estimated price for the booking.';

-- Optional: Add an index on booking_start_utc for faster lookups if needed
CREATE INDEX IF NOT EXISTS idx_paintingservicebookings_booking_start_utc ON public.paintingservicebookings(booking_start_utc);
CREATE INDEX IF NOT EXISTS idx_paintingservicebookings_email ON public.paintingservicebookings(email);


-- 3. Enable RLS and Add Policies
ALTER TABLE public.paintingservicebookings ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert their own bookings
-- This assumes you might have user accounts later. For now, the backend will use its service_role.
DROP POLICY IF EXISTS "Allow authenticated users to insert their own bookings" ON public.paintingservicebookings;
CREATE POLICY "Allow authenticated users to insert their own bookings"
  ON public.paintingservicebookings
  FOR INSERT
  TO authenticated -- This means any logged-in Supabase user.
  WITH CHECK (true); -- Or more specific checks like auth.uid() = user_id if you add a user_id column

-- Allow service_role (backend) to manage all bookings
DROP POLICY IF EXISTS "Allow service_role to manage all bookings" ON public.paintingservicebookings;
CREATE POLICY "Allow service_role to manage all bookings"
  ON public.paintingservicebookings
  FOR ALL -- SELECT, INSERT, UPDATE, DELETE
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Deny public read by default (no explicit SELECT policy for 'public' or 'anon')
-- Deny other roles from modifying unless explicitly allowed
DROP POLICY IF EXISTS "Deny modification for other roles" ON public.paintingservicebookings;
CREATE POLICY "Deny modification for other roles"
  ON public.paintingservicebookings
  FOR ALL
  USING (false)
  WITH CHECK (false);
