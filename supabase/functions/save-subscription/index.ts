import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS })
  }

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: CORS_HEADERS
    })
  }

  try {
    const body = await req.json()
    const { subscription } = body

    if (!subscription) {
      return new Response('Invalid payload', {
        status: 400,
        headers: CORS_HEADERS
      })
    }

    const { error } = await supabase
      .from('push_subscriptions')
      .insert([{ subscription }])

    if (error) {
      console.error('Erreur insertion Supabase :', error)
      return new Response('Erreur enregistrement', {
        status: 500,
        headers: CORS_HEADERS
      })
    }

    return new Response('Subscription enregistrée ✅', {
      status: 200,
      headers: CORS_HEADERS
    })

  } catch (e) {
    console.error('Erreur inattendue :', e)
    return new Response('Erreur interne', {
      status: 500,
      headers: CORS_HEADERS
    })
  }
})
