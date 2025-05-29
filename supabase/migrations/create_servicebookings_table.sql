/*
  # Create servicebookings table

  This migration creates the `servicebookings` table to track booked time slots
  for the painting service appointments. It prevents double booking by enforcing
  a unique constraint on the date and time combination.

  1. New Tables
     - `servicebookings`
       - `id` (bigint, primary key, auto-incrementing)
       - `booking_date` (date, not null) - The date of the booking.
       - `book_time` (text, not null) - The time slot booked (e.g., '09:00', '14:00'). Stored as text for easy querying based on generated slots.
       - `created_at` (timestamptz, not null, default now()) - Timestamp of when the booking slot was recorded.

  2. Constraints
     - Adds a unique constraint `unique_booking_slot` on (`booking_date`, `book_time`) to prevent booking the same slot twice.

  3. Security
     - Enables Row Level Security (RLS) on the `servicebookings` table.
     - Adds a policy `Allow public read access` allowing anyone to read the booked slots (necessary for the backend to check availability).
     - Adds a policy `Allow authenticated users to insert` allowing any authenticated user (representing the backend server role) to insert new booked slots. **Note:** For production, you might restrict insert access further, e.g., to a specific service role.

  4. Indexes
     - Creates an index `idx_booking_date` on the `booking_date` column for faster querying of booked slots for a specific date.
*/

-- 1. Create Table
CREATE TABLE IF NOT EXISTS public.servicebookings (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  booking_date date NOT NULL,
  book_time text NOT NULL, -- Storing as text 'HH:mm' for easier matching with generated slots
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Optional: Add comments to the table and columns for clarity
COMMENT ON TABLE public.servicebookings IS 'Stores booked time slots for service appointments.';
COMMENT ON COLUMN public.servicebookings.booking_date IS 'Date of the booked appointment.';
COMMENT ON COLUMN public.servicebookings.book_time IS 'Booked time slot in HH:mm format (e.g., ''09:00'').';

-- 2. Add Unique Constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'unique_booking_slot' AND conrelid = 'public.servicebookings'::regclass
  ) THEN
    ALTER TABLE public.servicebookings
    ADD CONSTRAINT unique_booking_slot UNIQUE (booking_date, book_time);
  END IF;
END $$;


-- 3. Enable RLS and Add Policies
ALTER TABLE public.servicebookings ENABLE ROW LEVEL SECURITY;

-- Allow public read access (needed for backend availability checks)
CREATE POLICY "Allow public read access"
  ON public.servicebookings
  FOR SELECT
  USING (true);

-- Allow authenticated users (like the backend service role) to insert
-- Adjust 'authenticated' to a more specific role if needed for production security
CREATE POLICY "Allow authenticated users to insert"
  ON public.servicebookings
  FOR INSERT
  TO authenticated -- Or replace with a specific service role if you have one
  WITH CHECK (true);

-- Note: Policies for UPDATE and DELETE are omitted as the backend currently only inserts.
-- Add them if update/delete functionality is required later.


-- 4. Add Index for faster date lookups
CREATE INDEX IF NOT EXISTS idx_booking_date ON public.servicebookings(booking_date);
