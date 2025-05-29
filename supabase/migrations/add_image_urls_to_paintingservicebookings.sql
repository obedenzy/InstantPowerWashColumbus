/*
  # Add image_urls column to paintingservicebookings

  1. Changes
    - Add `image_urls` column (text array) to the `paintingservicebookings` table to store URLs of uploaded project images.
*/

DO $$
BEGIN
  -- Check if the column already exists to prevent errors on re-running
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'paintingservicebookings' AND column_name = 'image_urls'
  ) THEN
    -- Add the new column
    ALTER TABLE paintingservicebookings
    ADD COLUMN image_urls text[];
  END IF;
END $$;

-- Note: RLS policies for this table might need review if image_urls should be protected.
-- Assuming existing RLS allows the server (using service role key) to update this column.