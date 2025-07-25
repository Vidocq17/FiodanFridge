import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://cfekvupaqtumlystlumc.supabase.co'
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZWt2dXBhcXR1bWx5c3RsdW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNzQwOTcsImV4cCI6MjA2ODk1MDA5N30.HAAvi1-BZyfJnh1XUDJQnaDJ6KgSlodPuu6AUsDLT0Y'

// Public Key:
// BDSixfuNmJ2qy6_9f-on9jfaz2bFqNwI3wc_x3ld2WAMiy2KhLs4lTPc6yjKKXUwp26XjxpDu1zHPfZyzXebZnQ
// Private Key:
// WFm_o4PG-slXR3zF2VMAbDTbP-jFjHWptNJaY5qZ514

const VAPID_PUBLIC_KEY ='BDSixfuNmJ2qy6_9f-on9jfaz2bFqNwI3wc_x3ld2WAMiy2KhLs4lTPc6yjKKXUwp26XjxpDu1zHPfZyzXebZnQ'
const VAPID_PRIVATE_KEY = 'WFm_o4PG-slXR3zF2VMAbDTbP-jFjHWptNJaY5qZ514'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
