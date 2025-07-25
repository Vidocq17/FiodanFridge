import { createClient } from '@supabase/supabase-js'

// const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
// const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://cfekvupaqtumlystlumc.supabase.co'
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZWt2dXBhcXR1bWx5c3RsdW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNzQwOTcsImV4cCI6MjA2ODk1MDA5N30.HAAvi1-BZyfJnh1XUDJQnaDJ6KgSlodPuu6AUsDLT0Y'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
