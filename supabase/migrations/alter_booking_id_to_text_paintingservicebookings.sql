ALTER TABLE paintingservicebookings
ALTER COLUMN booking_id TYPE TEXT,
ADD CONSTRAINT unique_booking_id UNIQUE (booking_id);