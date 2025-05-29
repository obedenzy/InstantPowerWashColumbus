INSERT INTO paintservices (title, description, unit_label, unit_name, base_price, additional_price_per_unit, additional_cost_trigger, prep_cost, min_price, max_price, avg_price)
VALUES (
    'Kitchen Cabinet Painting',
    'Professional painting for kitchen cabinets.',
    'per door',
    'Door',
    0.00,  -- Placeholder: Base price might be 0 if cost is purely per unit
    0.00,  -- Placeholder: Additional price per unit (if any beyond the base/min/max)
    NULL,  -- Placeholder: Trigger for additional costs (e.g., number of units)
    0.00,  -- Placeholder: Prep cost (if a fixed cost applies)
    65.00,
    85.00,
    75.00  -- Placeholder: Average price within the range
);