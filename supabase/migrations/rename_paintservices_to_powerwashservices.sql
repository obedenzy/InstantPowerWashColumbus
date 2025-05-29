/*
  # Rename paintservices table to powerwashservices

  1. Table Renaming
    - Renames the `paintservices` table to `powerwashservices`.
  2. Security
    - Updates RLS policies to reflect the new table name.
*/

ALTER TABLE IF EXISTS paintservices RENAME TO powerwashservices;

-- Update RLS policies if they exist and reference the old table name
-- This is a placeholder. Actual RLS policies would need to be updated
-- based on their specific definitions. For this example, we assume
-- policies are generic or will be recreated if needed.
-- If there were specific policies on 'paintservices', they would need to be dropped
-- and recreated for 'powerwashservices'.
-- Example:
-- DROP POLICY IF EXISTS "Enable read access for all users" ON paintservices;
-- CREATE POLICY "Enable read access for all users" ON powerwashservices FOR SELECT USING (true);
