/*
  # Create powerwashservices table and populate data

  1. New Tables
    - `powerwashservices`
      - `id` (uuid, primary key, default gen_random_uuid())
      - `created_at` (timestamptz, default now())
      - `title` (text, unique, not null)
      - `description` (text)
      - `min_price` (numeric, default 0)
      - `max_price` (numeric, default 0)
      - `base_price` (numeric, default 0)
      - `prep_cost` (numeric, default 0)
      - `additional_price_per_unit` (numeric, default 0)
      - `fixed_price_threshold` (integer)
      - `fixed_price_above_threshold` (numeric)
      - `unit_label` (text)
      - `unit_name` (text)
      - `features` (text[])
      - `image_url` (text)
      - `additional_cost_trigger` (text)

  2. Data Population
    - Inserts initial data for power washing services:
      - House Washing
      - Driveway and Concrete Cleaning
      - Deck and Fence Cleaning
      - Pool Deck and Patio Cleaning

  3. Security
    - Enable RLS on `powerwashservices` table.
    - Add RLS policy for authenticated users to insert data.
    - Add RLS policy for all users to read data.
*/

-- Create the powerwashservices table if it does not exist
CREATE TABLE IF NOT EXISTS powerwashservices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text UNIQUE NOT NULL,
  description text,
  min_price numeric DEFAULT 0,
  max_price numeric DEFAULT 0,
  base_price numeric DEFAULT 0,
  prep_cost numeric DEFAULT 0,
  additional_price_per_unit numeric DEFAULT 0,
  fixed_price_threshold integer,
  fixed_price_above_threshold numeric,
  unit_label text,
  unit_name text,
  features text[],
  image_url text,
  additional_cost_trigger text
);

-- Insert initial data for power washing services
INSERT INTO powerwashservices (title, description, min_price, max_price, base_price, unit_label, unit_name, features, image_url)
VALUES
  ('House Washing', 'This service involves cleaning the exterior surfaces of homes, including siding (vinyl, aluminum, brick), to remove dirt, grime, mildew, and algae. Soft washing techniques, which use lower pressure and specialized cleaning solutions, are often employed to protect delicate surfaces while ensuring a thorough clean. This enhances curb appeal and maintains the home’s exterior.', 200, 550, 0.20, 'per sq ft', 'sq_ft', ARRAY['Soft washing for delicate surfaces', 'Removes dirt, grime, mildew, algae', 'Enhances curb appeal', 'Protects home''s exterior', 'Thorough and safe cleaning'], 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//placeholder.jpg'),
  ('Driveway and Concrete Cleaning', 'This service targets concrete surfaces like driveways, walkways, and patios, removing oil stains, dirt, and algae buildup. High-pressure washing is typically used for durable surfaces, restoring their appearance and improving safety by reducing slippery areas.', 100, 250, 0.15, 'per sq ft', 'sq_ft', ARRAY['Removes oil stains, dirt, algae', 'High-pressure washing for durable surfaces', 'Restores appearance', 'Improves safety (reduces slipperiness)', 'Suitable for driveways, walkways, patios'], 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//placeholder.jpg'),
  ('Deck and Fence Cleaning', 'Cleaning wooden or composite decks and fences to remove dirt, mold, and weathered stains. This service may include soft washing or low-pressure techniques to avoid damaging wood fibers, often followed by sealing or staining options for added protection and aesthetic appeal.', 150, 350, 1.50, 'per linear ft', 'linear_foot', ARRAY['Removes dirt, mold, weathered stains', 'Soft/low-pressure techniques to protect wood', 'Optional sealing/staining for protection', 'Enhances aesthetic appeal', 'Suitable for wooden or composite surfaces'], 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//placeholder.jpg'),
  ('Pool Deck and Patio Cleaning', 'Cleaning pool decks, patios, and surrounding hardscapes (concrete, pavers, or stone) to remove algae, mold, and dirt, ensuring a safe and attractive outdoor space. This service uses pressure washing or soft washing depending on the surface material to prevent damage while restoring vibrancy.', 150, 400, 0.20, 'per sq ft', 'sq_ft', ARRAY['Removes algae, mold, dirt', 'Ensures safe and attractive outdoor space', 'Uses pressure or soft washing based on material', 'Restores vibrancy to hardscapes', 'Suitable for concrete, pavers, stone'], 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//placeholder.jpg')
ON CONFLICT (title) DO UPDATE SET
  description = EXCLUDED.description,
  min_price = EXCLUDED.min_price,
  max_price = EXCLUDED.max_price,
  base_price = EXCLUDED.base_price,
  unit_label = EXCLUDED.unit_label,
  unit_name = EXCLUDED.unit_name,
  features = EXCLUDED.features,
  image_url = EXCLUDED.image_url;

-- Enable Row Level Security (RLS) for the powerwashservices table
ALTER TABLE powerwashservices ENABLE ROW LEVEL SECURITY;

-- Create RLS policy to allow authenticated users to insert new services (e.g., for admin panel)
CREATE POLICY "Authenticated users can insert powerwashservices"
  ON powerwashservices
  FOR INSERT
  TO authenticated
  WITH CHECK (true); -- Or add more specific conditions if needed

-- Create RLS policy to allow all users to read powerwashservices data
CREATE POLICY "All users can read powerwashservices"
  ON powerwashservices
  FOR SELECT
  TO public
  USING (true);
