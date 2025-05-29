/*
  # Remove all RLS policies from paintingservicebookings

  This migration removes all row-level security policies from the
  `paintingservicebookings` table, effectively disabling RLS.

  **WARNING: This is highly insecure and should only be done for testing or development purposes.**

  1. Changes
     - Removes all existing RLS policies from the `paintingservicebookings` table.
     - Does NOT disable RLS itself (the `ENABLE ROW LEVEL SECURITY` setting remains).

  2. Security
     - **This makes the table publicly writable.** Anyone with access to the database
       can insert, update, and delete rows.
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow authenticated users to insert their own bookings" ON public.paintingservicebookings;
DROP POLICY IF EXISTS "Allow service_role to manage all bookings" ON public.paintingservicebookings;
DROP POLICY IF EXISTS "Deny modification for other roles" ON public.paintingservicebookings;

-- Optional: Add a comment to the table for clarity
COMMENT ON TABLE public.paintingservicebookings IS 'WARNING: RLS is enabled but all policies have been removed. This table is publicly writable.';
