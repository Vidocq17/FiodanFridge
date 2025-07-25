import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'
import webpush from 'https://esm.sh/web-push@3.6.7'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

const vapidDetails = {
  subject: 'mailto:ton@email.com', // remplace par un vrai email
  publicKey: Deno.env.get('VITE_VALID_PUBLIC_KEY')!,
  privateKey: Deno.env.get('VITE_VALID_PRIVATE_KEY')!,
}

webpush.setVapidDetails(vapidDetails.subject, vapidDetails.publicKey, vapidDetails.privateKey)

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      status: 200,
      headers: CORS_HEADERS,
    })
  }
  try {
    // Récupérer les aliments qui expirent aujourd'hui
    const today = new Date().toISOString().split('T')[0]

    const { data: aliments, error: errorAliments } = await supabase
      .from('aliment')
      .select('*')
      .eq('date_peremption', today)

    if (errorAliments || !aliments.length) {
      console.log('Aucun aliment à notifier ou erreur')
      return new Response('Aucune notification à envoyer', {
        status: 200,
        headers: CORS_HEADERS,
      })
    }

    // Récupérer toutes les subscriptions
    const { data: subscriptions, error } = await supabase.from('push_subscriptions').select('*')

    if (error || !subscriptions.length) {
      return new Response('Pas de destinataires', {
        status: 200,
        headers: CORS_HEADERS,
      })
    }

    // Construire le message
    const alimentsList = aliments.map((a) => a.nom).join(', ')
    const payload = JSON.stringify({
      title: '🧊 Frigo – Attention !',
      body: `Les aliments suivants expirent aujourd'hui : ${alimentsList}`,
    })

    // Envoyer à chaque abonné
    const results = await Promise.allSettled(
      subscriptions.map((row) => webpush.sendNotification(row.subscription, payload)),
    )

    const successCount = results.filter((r) => r.status === 'fulfilled').length
    console.log(`Notifications envoyées avec succès : ${successCount}`)

    return new Response(`Notifications envoyées à ${successCount} utilisateurs ✅`, {
      status: 200,
      headers: CORS_HEADERS,
    })
  } catch (e) {
    console.error('Erreur dans l’envoi des notifications :', e)
    return new Response('Erreur interne', {
      status: 500,
      headers: CORS_HEADERS,
    })
  }
})
