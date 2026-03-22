
-- Make the media bucket private
UPDATE storage.buckets SET public = false WHERE id = 'media';
