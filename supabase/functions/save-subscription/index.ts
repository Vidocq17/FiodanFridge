import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const { subscription } = await req.json()

  if (!subscription) {
    return new Response('Invalid payload', { status: 400 })
  }

  const { error } = await supabase
    .from('push_subscriptions')
    .insert([{ subscription }])

  if (error) {
    console.error('Erreur insertion subscription :', error)
    return new Response('Erreur enregistrement', { status: 500 })
  }

  return new Response('Subscription enregistrée ✅', { status: 200 })
})
