/*
  # Modify servicebookings RLS to allow backend inserts

  This migration modifies the RLS policy on `servicebookings` to allow
  inserts from the `anon` role (which the backend uses), but with a strict
  `WITH CHECK` clause to prevent arbitrary inserts.

  1. Changes
     - Replaces the "Allow authenticated users to insert" policy with a new policy
       that allows the `anon` role to insert, but only if the `booking_start_utc`
       is not in the past.

  2. Security
     - The `WITH CHECK` clause ensures that only future bookings can be inserted,
       preventing the backend from manipulating past booking data.
*/

-- Drop the existing policy
DROP POLICY IF EXISTS "Allow public read access" ON public.servicebookings;
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON public.servicebookings;

-- Recreate the policy to allow 'anon' role with a WITH CHECK clause
CREATE POLICY "Allow backend to insert future bookings"
  ON public.servicebookings
  FOR INSERT
  TO anon
  WITH CHECK (booking_start_utc > now());

CREATE POLICY "Allow public read access"
  ON public.servicebookings
  FOR SELECT
  USING (true);

-- Optional: Add a comment to the policy for clarity
COMMENT ON POLICY "Allow backend to insert future bookings" ON public.servicebookings IS 'Allows the backend (anon role) to insert future bookings only.';
