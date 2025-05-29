/*
  # Debug RLS and Permissions for servicebookings and paintingservicebookings

  This migration attempts to resolve persistent RLS issues by:
  1. Temporarily disabling and re-enabling RLS on both tables.
  2. Creating very permissive INSERT policies for the 'anon' role.
  3. Granting direct INSERT permission to the 'anon' role on both tables.

  **WARNING: THIS IS HIGHLY INSECURE AND FOR DEBUGGING PURPOSES ONLY.**
  **REMOVE THESE PERMISSIVE GRANTS AND RE-IMPLEMENT PROPER RLS BEFORE PRODUCTION.**

  1. Changes
     - Disables RLS on `servicebookings` and `paintingservicebookings`.
     - Drops any existing policies.
     - Re-enables RLS.
     - Creates a policy allowing 'anon' to INSERT into `servicebookings`.
     - Creates a policy allowing 'anon' to INSERT into `paintingservicebookings`.
     - Grants explicit INSERT permission to 'anon' role on both tables.

  2. Security
     - **This significantly reduces security for debugging purposes.**
*/

-- For servicebookings table
ALTER TABLE public.servicebookings DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow backend to insert future bookings" ON public.servicebookings;
DROP POLICY IF EXISTS "Allow public read access" ON public.servicebookings;
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON public.servicebookings;
-- Add any other policy names you might have created for servicebookings
ALTER TABLE public.servicebookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "TEMP DEBUG: Allow anon to insert into servicebookings"
  ON public.servicebookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

GRANT INSERT ON TABLE public.servicebookings TO anon;
COMMENT ON TABLE public.servicebookings IS 'RLS enabled, TEMP DEBUG policy for anon INSERT. Explicit INSERT grant to anon.';


-- For paintingservicebookings table
ALTER TABLE public.paintingservicebookings DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow authenticated users to insert their own bookings" ON public.paintingservicebookings;
DROP POLICY IF EXISTS "Allow service_role to manage all bookings" ON public.paintingservicebookings;
DROP POLICY IF EXISTS "Deny modification for other roles" ON public.paintingservicebookings;
DROP POLICY IF EXISTS "Allow backend to insert bookings" ON public.paintingservicebookings;
-- Add any other policy names you might have created for paintingservicebookings
ALTER TABLE public.paintingservicebookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "TEMP DEBUG: Allow anon to insert into paintingservicebookings"
  ON public.paintingservicebookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

GRANT INSERT ON TABLE public.paintingservicebookings TO anon;
COMMENT ON TABLE public.paintingservicebookings IS 'RLS enabled, TEMP DEBUG policy for anon INSERT. Explicit INSERT grant to anon.';
