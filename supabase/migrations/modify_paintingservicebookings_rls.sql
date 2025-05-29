/*
  # Modify paintingservicebookings RLS to allow backend inserts

  This migration modifies the RLS policy on `paintingservicebookings` to allow
  inserts from the `anon` role (which the backend uses), but only if the `auth.uid()` is NULL.

  1. Changes
     - Replaces the "Allow service_role to manage all bookings" policy with a new policy
       that allows the `anon` role to insert, but only if the `auth.uid()` is NULL.

  2. Security
     - The `WITH CHECK` clause is used to ensure that only inserts where `auth.uid()` is NULL are allowed.
*/

-- Drop the existing policy
DROP POLICY IF EXISTS "Allow service_role to manage all bookings" ON public.paintingservicebookings;

-- Recreate the policy to allow 'anon' role with a USING clause
CREATE POLICY "Allow backend to insert bookings"
  ON public.paintingservicebookings
  FOR INSERT
  TO anon
  WITH CHECK (auth.uid() IS NULL);

-- Optional: Add a comment to the policy for clarity
COMMENT ON POLICY "Allow backend to insert bookings" ON public.paintingservicebookings IS 'Allows the backend (anon role) to insert bookings.';
