/*
  # Create paintservices table and populate pricing rules (v2)

  This migration ensures the `paintservices` table exists with the correct structure
  and contains the defined pricing rules. It uses `IF NOT EXISTS` and `ON CONFLICT DO NOTHING`
  to be safely runnable multiple times. Unit labels for some services are adjusted
  to align with min/max pricing representing a typical job unit.

  1. New Tables (Ensured)
     - `paintservices`
       - `id` (uuid, primary key, default gen_random_uuid()) - Unique identifier for the service.
       - `title` (text, not null, unique) - The display name of the service.
       - `description` (text) - A brief description of the service.
       - `unit_label` (text, not null) - The label for the quantity input.
       - `unit_name` (text, not null) - The unit of measurement for calculation.
       - `base_price` (numeric(10, 2), default 0.00) - The base price per unit or fixed price.
       - `additional_price_per_unit` (numeric(10, 2), default 0.00) - Additional cost per unit.
       - `additional_cost_trigger` (text) - Keyword or condition triggering the additional cost.
       - `fixed_price_threshold` (integer) - For mailboxes, quantity threshold for different fixed price.
       - `fixed_price_above_threshold` (numeric(10, 2)) - Fixed price if quantity is above threshold.
       - `prep_cost` (numeric(10, 2), default 0.00) - Specific additional cost for prep work.
       - `min_price` (numeric(10, 2)) - Minimum estimated price for ONE UNIT of the service.
       - `max_price` (numeric(10, 2)) - Maximum estimated price for ONE UNIT of the service.
       - `avg_price` (numeric(10, 2)) - Average estimated price for ONE UNIT of the service.
       - `created_at` (timestamptz, default now())

  2. Data Population (Ensured)
     - Inserts/Updates service details and pricing rules.

  3. Security (Ensured)
     - Enables Row Level Security (RLS) on the `paintservices` table.
     - Public read access, admin modifications.
*/

-- 1. Create Table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.paintservices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL UNIQUE,
  description text,
  unit_label text NOT NULL,
  unit_name text NOT NULL, -- e.g., 'room', 'linear_foot', 'sq_ft', 'unit', 'mailbox'
  base_price numeric(10, 2) DEFAULT 0.00,
  additional_price_per_unit numeric(10, 2) DEFAULT 0.00,
  additional_cost_trigger text, -- e.g., 'prep', 'staining', 'extra_wall', 'rust_removal'
  fixed_price_threshold integer, -- e.g., 1 for mailboxes
  fixed_price_above_threshold numeric(10, 2), -- e.g., large mailbox price
  prep_cost numeric(10, 2) DEFAULT 0.00, -- Specific prep cost if applicable
  min_price numeric(10, 2), -- Min price for ONE unit
  max_price numeric(10, 2), -- Max price for ONE unit
  avg_price numeric(10, 2), -- Avg price for ONE unit
  created_at timestamptz DEFAULT now()
);

-- Add columns if they don't exist (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='paintservices' AND column_name='fixed_price_threshold') THEN
    ALTER TABLE public.paintservices ADD COLUMN fixed_price_threshold integer;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='paintservices' AND column_name='fixed_price_above_threshold') THEN
    ALTER TABLE public.paintservices ADD COLUMN fixed_price_above_threshold numeric(10, 2);
  END IF;
END $$;


COMMENT ON TABLE public.paintservices IS 'Stores details and pricing rules for offered painting services.';
COMMENT ON COLUMN public.paintservices.unit_label IS 'Display label for the quantity input field.';
COMMENT ON COLUMN public.paintservices.unit_name IS 'Internal unit name for calculation logic.';
COMMENT ON COLUMN public.paintservices.base_price IS 'Base price per unit or fixed price for quantity <= threshold.';
COMMENT ON COLUMN public.paintservices.additional_price_per_unit IS 'Additional cost applied per unit based on trigger.';
COMMENT ON COLUMN public.paintservices.additional_cost_trigger IS 'Condition that triggers the additional_price_per_unit.';
COMMENT ON COLUMN public.paintservices.fixed_price_threshold IS 'Quantity threshold for applying fixed_price_above_threshold.';
COMMENT ON COLUMN public.paintservices.fixed_price_above_threshold IS 'Fixed price applied if quantity > fixed_price_threshold.';
COMMENT ON COLUMN public.paintservices.prep_cost IS 'Flat additional cost for preparation if applicable.';
COMMENT ON COLUMN public.paintservices.min_price IS 'Minimum estimated price for ONE UNIT of the service.';
COMMENT ON COLUMN public.paintservices.max_price IS 'Maximum estimated price for ONE UNIT of the service.';
COMMENT ON COLUMN public.paintservices.avg_price IS 'Average estimated price for ONE UNIT of the service.';


-- 2. Data Population (Based on provided rules)
-- Using ON CONFLICT DO UPDATE to ensure data is current
INSERT INTO public.paintservices (title, description, unit_label, unit_name, base_price, additional_price_per_unit, additional_cost_trigger, prep_cost, min_price, max_price, avg_price)
VALUES
  ('Residential Touch-Up Painting', 'Perfect for single rooms or entire properties.', 'Number of rooms', 'room', 400.00, 100.00, 'extra_wall', 0.00, 400.00, 800.00, 600.00)
ON CONFLICT (title) DO UPDATE SET description=EXCLUDED.description, unit_label=EXCLUDED.unit_label, unit_name=EXCLUDED.unit_name, base_price=EXCLUDED.base_price, additional_price_per_unit=EXCLUDED.additional_price_per_unit, additional_cost_trigger=EXCLUDED.additional_cost_trigger, prep_cost=EXCLUDED.prep_cost, min_price=EXCLUDED.min_price, max_price=EXCLUDED.max_price, avg_price=EXCLUDED.avg_price;

INSERT INTO public.paintservices (title, description, unit_label, unit_name, base_price, fixed_price_threshold, fixed_price_above_threshold, prep_cost, additional_cost_trigger, min_price, max_price, avg_price)
VALUES
  ('Mailbox Painting', 'Refresh your mailbox and enhance curb appeal.', 'Number of mailboxes', 'mailbox', 75.00, 1, 100.00, 25.00, 'rust_removal', 75.00, 125.00, 100.00)
ON CONFLICT (title) DO UPDATE SET description=EXCLUDED.description, unit_label=EXCLUDED.unit_label, unit_name=EXCLUDED.unit_name, base_price=EXCLUDED.base_price, fixed_price_threshold=EXCLUDED.fixed_price_threshold, fixed_price_above_threshold=EXCLUDED.fixed_price_above_threshold, prep_cost=EXCLUDED.prep_cost, additional_cost_trigger=EXCLUDED.additional_cost_trigger, min_price=EXCLUDED.min_price, max_price=EXCLUDED.max_price, avg_price=EXCLUDED.avg_price;

INSERT INTO public.paintservices (title, description, unit_label, unit_name, base_price, additional_price_per_unit, additional_cost_trigger, prep_cost, min_price, max_price, avg_price)
VALUES
  ('Garage Floor Painting', 'Transform your garage with durable epoxy floor coating.', 'Garage size (sq ft)', 'sq_ft', 2.00, 0.50, 'additional_prep', 25.00, 2.00, 3.00, 2.50) -- Assuming min/max per sq ft
ON CONFLICT (title) DO UPDATE SET description=EXCLUDED.description, unit_label=EXCLUDED.unit_label, unit_name=EXCLUDED.unit_name, base_price=EXCLUDED.base_price, additional_price_per_unit=EXCLUDED.additional_price_per_unit, additional_cost_trigger=EXCLUDED.additional_cost_trigger, prep_cost=EXCLUDED.prep_cost, min_price=EXCLUDED.min_price, max_price=EXCLUDED.max_price, avg_price=EXCLUDED.avg_price;

INSERT INTO public.paintservices (title, description, unit_label, unit_name, base_price, additional_price_per_unit, additional_cost_trigger, prep_cost, min_price, max_price, avg_price)
VALUES
  ('Fence Painting', 'Protect and beautify your fence.', 'Number of Fences (approx. 100ft sections)', 'fence_unit', 250.00, 100.00, 'staining_prep', 0.00, 250.00, 500.00, 375.00) -- min/max for one 100ft section
ON CONFLICT (title) DO UPDATE SET description=EXCLUDED.description, unit_label=EXCLUDED.unit_label, unit_name=EXCLUDED.unit_name, base_price=EXCLUDED.base_price, additional_price_per_unit=EXCLUDED.additional_price_per_unit, additional_cost_trigger=EXCLUDED.additional_cost_trigger, prep_cost=EXCLUDED.prep_cost, min_price=EXCLUDED.min_price, max_price=EXCLUDED.max_price, avg_price=EXCLUDED.avg_price;

INSERT INTO public.paintservices (title, description, unit_label, unit_name, base_price, additional_price_per_unit, additional_cost_trigger, prep_cost, min_price, max_price, avg_price)
VALUES
  ('Patio/Deck Painting', 'Revitalize your outdoor living space.', 'Number of Patios/Decks (approx. 200sqft)', 'patio_unit', 350.00, 150.00, 'staining_coating', 0.00, 350.00, 700.00, 500.00) -- min/max for one 200sqft unit
ON CONFLICT (title) DO UPDATE SET description=EXCLUDED.description, unit_label=EXCLUDED.unit_label, unit_name=EXCLUDED.unit_name, base_price=EXCLUDED.base_price, additional_price_per_unit=EXCLUDED.additional_price_per_unit, additional_cost_trigger=EXCLUDED.additional_cost_trigger, prep_cost=EXCLUDED.prep_cost, min_price=EXCLUDED.min_price, max_price=EXCLUDED.max_price, avg_price=EXCLUDED.avg_price;

INSERT INTO public.paintservices (title, description, unit_label, unit_name, base_price, prep_cost, min_price, max_price, avg_price, additional_price_per_unit, additional_cost_trigger)
VALUES
  ('Small Exterior Trim Painting', 'Paint window frames, door frames, or soffits.', 'Number of windows/doors', 'unit', 30.00, 15.00, 30.00, 45.00, 37.50, 0.00, null) -- min/max per unit
ON CONFLICT (title) DO UPDATE SET description=EXCLUDED.description, unit_label=EXCLUDED.unit_label, unit_name=EXCLUDED.unit_name, base_price=EXCLUDED.base_price, prep_cost=EXCLUDED.prep_cost, min_price=EXCLUDED.min_price, max_price=EXCLUDED.max_price, avg_price=EXCLUDED.avg_price, additional_price_per_unit = EXCLUDED.additional_price_per_unit, additional_cost_trigger = EXCLUDED.additional_cost_trigger;


-- 3. Security
ALTER TABLE public.paintservices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON public.paintservices;
CREATE POLICY "Allow public read access"
  ON public.paintservices
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow admin modification" ON public.paintservices;
CREATE POLICY "Allow admin modification"
  ON public.paintservices
  FOR ALL
  USING (auth.role() = 'service_role' OR auth.role() = 'postgres')
  WITH CHECK (auth.role() = 'service_role' OR auth.role() = 'postgres');

DROP POLICY IF EXISTS "Deny modification for other roles" ON public.paintservices;
CREATE POLICY "Deny modification for other roles"
  ON public.paintservices
  FOR ALL
  USING (false);
