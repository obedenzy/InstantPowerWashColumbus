/*
  # Create paintservices table and populate pricing rules

  This migration creates the `paintservices` table to store details about each
  painting service offered, including its pricing structure. It also populates
  the table with the initial pricing rules provided.

  1. New Tables
     - `paintservices`
       - ... (other columns)

  2. Data Population
     - Inserts the initial service details and pricing rules based on the provided information into `paintservices`.
*/

-- 1. Create Table
-- ... (table creation)

-- 2. Data Population (Based on provided rules)
-- Clear existing data to avoid duplicates if script is run multiple times
-- DELETE FROM public.paintservices;

INSERT INTO public.paintservices (title, description, unit_label, unit_name, base_price, additional_price_per_unit, additional_cost_trigger, prep_cost, min_price, max_price, avg_price)
VALUES
  ('Residential Touch-Up Painting', 'Perfect for single rooms or entire properties.', 'Number of rooms', 'room', 400.00, 100.00, 'extra_wall', 0.00, 400.00, 800.00, 600.00)
ON CONFLICT (title) DO NOTHING;

INSERT INTO public.paintservices (title, description, unit_label, unit_name, base_price, fixed_price_threshold, fixed_price_above_threshold, prep_cost, min_price, max_price, avg_price)
VALUES
  ('Mailbox Painting', 'Refresh your mailbox and enhance curb appeal.', 'Number of mailboxes', 'mailbox', 75.00, 1, 100.00, 25.00, 75.00, 125.00, 100.00)
ON CONFLICT (title) DO NOTHING;

INSERT INTO public.paintservices (title, description, unit_label, unit_name, base_price, additional_price_per_unit, additional_cost_trigger, prep_cost, min_price, max_price, avg_price)
VALUES
  ('Garage Floor Painting', 'Transform your garage with durable epoxy floor coating.', 'Garage size (sq ft)', 'sq_ft', 2.00, 0.50, 'additional_prep', 25.00, 800.00, 2000.00, 1400.00)
ON CONFLICT (title) DO NOTHING;

INSERT INTO public.paintservices (title, description, unit_label, unit_name, base_price, additional_price_per_unit, additional_cost_trigger, min_price, max_price, avg_price)
VALUES
  ('Fence Painting', 'Protect and beautify your fence.', 'Fence length (ft)', 'linear_foot', 2.50, 1.00, 'staining_prep', 0.00, 250.00, 500.00, 375.00)
ON CONFLICT (title) DO NOTHING;

INSERT INTO public.paintservices (title, description, unit_label, unit_name, base_price, additional_price_per_unit, additional_cost_trigger, prep_cost, min_price, max_price, avg_price)
VALUES
  ('Patio/Deck Painting', 'Revitalize your outdoor living space.', 'Area (sq ft)', 'sq_ft', 1.75, 0.75, 'staining_coating', 0.00, 350.00, 700.00, 500.00)
ON CONFLICT (title) DO NOTHING;

INSERT INTO public.paintservices (title, description, unit_label, unit_name, base_price, additional_price_per_unit, additional_cost_trigger, prep_cost, min_price, max_price, avg_price)
VALUES
  ('Small Exterior Trim Painting', 'Paint window frames, door frames, or soffits.', 'Number of windows/doors', 'unit', 30.00, 0.00, null, 15.00, 120.00, 250.00, 185.00)
ON CONFLICT (title) DO NOTHING;

-- ... (rest of the migration script)
