/*
  # Remove all RLS policies from servicebookings and paintingservicebookings

  This migration removes all row-level security policies from both
  `servicebookings` and `paintingservicebookings` tables.

  **WARNING: THIS IS HIGHLY INSECURE AND FOR DEBUGGING PURPOSES ONLY.**
  **RE-IMPLEMENT APPROPRIATE RLS POLICIES BEFORE PRODUCTION.**

  1. Changes
     - Removes all existing RLS policies from `servicebookings`.
     - Removes all existing RLS policies from `paintingservicebookings`.
     - Does NOT disable RLS itself (the `ENABLE ROW LEVEL SECURITY` setting remains).

  2. Security
     - **This makes both tables publicly writable and readable.**
*/

-- Drop all policies from servicebookings
DROP POLICY IF EXISTS "Allow public read access" ON public.servicebookings;
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON public.servicebookings;
DROP POLICY IF EXISTS "Allow backend to insert future bookings" ON public.servicebookings;
-- Add any other policy names you might have created for servicebookings

-- Drop all policies from paintingservicebookings
DROP POLICY IF EXISTS "Allow authenticated users to insert their own bookings" ON public.paintingservicebookings;
DROP POLICY IF EXISTS "Allow service_role to manage all bookings" ON public.paintingservicebookings;
DROP POLICY IF EXISTS "Deny modification for other roles" ON public.paintingservicebookings;
DROP POLICY IF EXISTS "Allow backend to insert bookings" ON public.paintingservicebookings;
-- Add any other policy names you might have created for paintingservicebookings

COMMENT ON TABLE public.servicebookings IS 'WARNING: RLS is enabled but all policies have been removed. This table is publicly accessible.';
COMMENT ON TABLE public.paintingservicebookings IS 'WARNING: RLS is enabled but all policies have been removed. This table is publicly accessible.';
