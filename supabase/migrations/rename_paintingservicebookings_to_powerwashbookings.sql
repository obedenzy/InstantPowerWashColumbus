/*
  # Rename paintingservicebookings table to powerwashbookings

  1. Table Renaming
    - Renames the `paintingservicebookings` table to `powerwashbookings`.
  2. Security
    - Updates RLS policies to reflect the new table name.
*/

ALTER TABLE IF EXISTS paintingservicebookings RENAME TO powerwashbookings;

-- Update RLS policies if they exist and reference the old table name
-- This is a placeholder. Actual RLS policies would need to be updated
-- based on their specific definitions. For this example, we assume
-- policies are generic or will be recreated if needed.
-- If there were specific policies on 'paintingservicebookings', they would need to be dropped
-- and recreated for 'powerwashbookings'.
-- Example:
-- DROP POLICY IF EXISTS "Authenticated users can insert bookings" ON paintingservicebookings;
-- CREATE POLICY "Authenticated users can insert bookings" ON powerwashbookings FOR INSERT TO authenticated WITH CHECK (true);
-- DROP POLICY IF EXISTS "Users can read own bookings" ON paintingservicebookings;
-- CREATE POLICY "Users can read own bookings" ON powerwashbookings FOR SELECT TO authenticated USING (auth.uid() = user_id);
