-- Add settings columns to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS display_name TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS notification_email BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS notification_analysis_complete BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS notification_weekly_report BOOLEAN DEFAULT false;