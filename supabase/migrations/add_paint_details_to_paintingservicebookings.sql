/*
      # Add Paint Details to paintingservicebookings Table

      This migration adds optional columns to the `paintingservicebookings` table
      to store information about whether the customer has already purchased paint
      and, if so, the selected paint color.

      1. New Columns
         - `paintingservicebookings`
           - `paint_bought` (BOOLEAN, nullable, default null) - Indicates if the customer has bought paint.
           - `paint_color` (TEXT, nullable, default null) - Stores the name and code of the paint color if provided.

      2. Security
         - Existing RLS policies for the `paintingservicebookings` table (specifically for the backend/service role to insert)
           are expected to cover these new nullable columns. No new policies are added specifically for these columns.
           If inserts were restricted to specific columns previously, those policies might need adjustment, but typically
           service roles have broader insert permissions.

      3. Important Notes
         - These columns are optional and can be left NULL if the customer does not provide this information.
    */

    -- Add paint_bought column
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'paintingservicebookings' AND column_name = 'paint_bought'
      ) THEN
        ALTER TABLE public.paintingservicebookings ADD COLUMN paint_bought BOOLEAN DEFAULT NULL;
      END IF;
    END $$;

    COMMENT ON COLUMN public.paintingservicebookings.paint_bought IS 'Indicates if the customer has already purchased paint (true/false) or not specified (null).';

    -- Add paint_color column
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'paintingservicebookings' AND column_name = 'paint_color'
      ) THEN
        ALTER TABLE public.paintingservicebookings ADD COLUMN paint_color TEXT DEFAULT NULL;
      END IF;
    END $$;

    COMMENT ON COLUMN public.paintingservicebookings.paint_color IS 'The name and code of the paint color, if provided by the customer.';