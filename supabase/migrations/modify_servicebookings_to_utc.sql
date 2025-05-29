/*
  # Modify servicebookings table for UTC Timestamps

  This migration updates the `servicebookings` table to store the exact booking
  start time in UTC, instead of separate date and time components in EST.
  This simplifies time handling and avoids timezone conversion issues on the server.

  1. Changes
     - Drops the existing `unique_booking_slot` constraint.
     - Drops the `booking_date` column.
     - Drops the `book_time` column.
     - Adds a new `booking_start_utc` column (timestamptz, not null).
     - Adds a unique constraint `unique_booking_start_utc` on the new column.
     - Updates RLS policies to reflect the new column structure (though logic remains similar).

  2. Data Migration (Manual Step Recommended)
     - **CRITICAL:** This migration drops columns and will result in data loss if existing bookings need to be preserved.
     - If data preservation is required, a more complex migration involving:
       1. Adding the new `booking_start_utc` column (nullable initially).
       2. Writing a script (outside this migration) to populate `booking_start_utc` based on existing `booking_date` and `book_time` (assuming EST). This requires careful timezone conversion logic.
       3. Making the `booking_start_utc` column NOT NULL.
       4. Adding the unique constraint.
       5. Dropping the old columns and constraint.
     - **This script assumes data loss is acceptable or the table is empty.**

  3. Security
     - Re-applies RLS policies for SELECT and INSERT using the new structure. Public read access is still needed for availability checks. Authenticated insert is maintained.

  4. Indexes
     - Drops the old index `idx_booking_date`.
     - Creates a new index `idx_booking_start_utc` on `booking_start_utc` for efficient range queries.
*/

-- Drop existing constraints and indexes related to old columns
ALTER TABLE public.servicebookings DROP CONSTRAINT IF EXISTS unique_booking_slot;
DROP INDEX IF EXISTS public.idx_booking_date;

-- Add the new UTC timestamp column (make it nullable temporarily if migrating data)
ALTER TABLE public.servicebookings ADD COLUMN IF NOT EXISTS booking_start_utc timestamptz;

-- *** MANUAL DATA MIGRATION STEP WOULD GO HERE IF NEEDED ***
-- Example (conceptual - requires careful timezone handling if run):
-- UPDATE public.servicebookings
-- SET booking_start_utc = make_timestamptz(
--     EXTRACT(YEAR FROM booking_date)::int,
--     EXTRACT(MONTH FROM booking_date)::int,
--     EXTRACT(DAY FROM booking_date)::int,
--     split_part(book_time, ':', 1)::int,
--     split_part(book_time, ':', 2)::int,
--     0,
--     'America/New_York' -- Specify the original timezone
-- )
-- WHERE booking_start_utc IS NULL;


-- Drop the old columns (DATA LOSS WARNING)
ALTER TABLE public.servicebookings DROP COLUMN IF EXISTS booking_date;
ALTER TABLE public.servicebookings DROP COLUMN IF EXISTS book_time;

-- Make the new column NOT NULL (if it wasn't already)
-- Ensure data migration happened first if preserving data
ALTER TABLE public.servicebookings ALTER COLUMN booking_start_utc SET NOT NULL;


-- Add Unique Constraint on the UTC timestamp
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'unique_booking_start_utc' AND conrelid = 'public.servicebookings'::regclass
  ) THEN
    ALTER TABLE public.servicebookings
    ADD CONSTRAINT unique_booking_start_utc UNIQUE (booking_start_utc);
  END IF;
END $$;

-- Update Comments
COMMENT ON COLUMN public.servicebookings.booking_start_utc IS 'Exact start time of the booking in UTC.';

-- Re-apply/Update RLS Policies (adjust if needed)
-- Drop old policies first if they exist and might conflict
DROP POLICY IF EXISTS "Allow public read access" ON public.servicebookings;
DROP POLICY IF EXISTS "Allow authenticated users to insert" ON public.servicebookings;

-- Recreate policies
CREATE POLICY "Allow public read access"
  ON public.servicebookings
  FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to insert"
  ON public.servicebookings
  FOR INSERT
  TO authenticated -- Or specific service role
  WITH CHECK (true);

-- Add Index for faster time range lookups
CREATE INDEX IF NOT EXISTS idx_booking_start_utc ON public.servicebookings(booking_start_utc);
