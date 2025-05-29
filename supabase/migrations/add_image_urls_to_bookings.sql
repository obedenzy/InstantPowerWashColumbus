/*
  # Add image_urls column to paintingservicebookings table

  1. Changes
    - Add `image_urls` column (text array) to the `paintingservicebookings` table with a default empty array.
  2. Security
    - Add RLS policy to allow authenticated users to insert into `paintingservicebookings`.
*/

-- Add the new column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'paintingservicebookings' AND column_name = 'image_urls'
  ) THEN
    ALTER TABLE paintingservicebookings ADD COLUMN image_urls text[] DEFAULT ARRAY[]::text[];
  END IF;
END $$;

-- Ensure RLS is enabled for the table (should already be, but good practice)
ALTER TABLE paintingservicebookings ENABLE ROW LEVEL SECURITY;

-- Add RLS policy for INSERT for authenticated users
-- This policy assumes that any authenticated user can create a booking.
-- If bookings should only be tied to the user creating them, a 'USING' clause
-- checking auth.uid() would be needed, but the current table schema doesn't
-- have a user_id column.
CREATE POLICY "Allow authenticated insert on paintingservicebookings"
  ON paintingservicebookings
  FOR INSERT
  TO authenticated
  WITH CHECK (true); -- Allow insert if authenticated

-- Add RLS policy for SELECT for authenticated users (if not already present)
-- This policy allows authenticated users to view any booking.
-- If users should only see their own bookings, the USING clause needs adjustment
-- based on a user_id column. Assuming for now any authenticated user can see.
CREATE POLICY "Allow authenticated select on paintingservicebookings"
  ON paintingservicebookings
  FOR SELECT
  TO authenticated
  USING (true); -- Allow select if authenticated

-- Add RLS policy for DELETE for authenticated users (optional, adjust as needed)
-- CREATE POLICY "Allow authenticated delete on paintingservicebookings"
--   ON paintingservicebookings
--   FOR DELETE
--   TO authenticated
--   USING (true); -- Allow delete if authenticated

-- Add RLS policy for UPDATE for authenticated users (optional, adjust as needed)
-- CREATE POLICY "Allow authenticated update on paintingservicebookings"
--   ON paintingservicebookings
--   FOR UPDATE
--   TO authenticated
--   USING (true); -- Allow update if authenticated
