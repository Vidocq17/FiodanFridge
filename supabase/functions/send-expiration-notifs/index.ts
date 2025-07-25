// supabase/functions/send-expiration-notifs/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'
import webpush from 'https://esm.sh/web-push'

// Initialisation Supabase avec accès sécurisé
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Clés VAPID
webpush.setVapidDetails(
  'mailto:contact@tonsite.fr',
  Deno.env.get('VITE_VALID_PUBLIC_KEY')!,
  Deno.env.get('VITE_VALID_PRIVATE_KEY')!
)

serve(async (req) => {
  // 1. On récupère tous les aliments qui périment dans les 2 prochains jours
  const { data: aliments, error: errorAliments } = await supabase
    .from('aliment')
    .select('nom, date_peremption')
    .lte('date_peremption', new Date(Date.now() + 2 * 86400000).toISOString()) // dans 2 jours

  if (errorAliments) {
    console.error('Erreur récupération aliments:', errorAliments)
    return new Response('Erreur récupération aliments', { status: 500 })
  }

  // 2. On récupère tous les abonnés (sans auth)
  const { data: subs, error: errorSubs } = await supabase
    .from('push_subscriptions')
    .select('subscription')

  if (errorSubs) {
    console.error('Erreur récupération abonnements:', errorSubs)
    return new Response('Erreur récupération abonnés', { status: 500 })
  }

  // 3. Préparer le message
  const msg = {
    title: '🥶 Attention à ton frigo !',
    body: aliments.length > 0
      ? `Tu as ${aliments.length} aliment(s) qui périment bientôt`
      : `Vérifie tes dates de péremption !`
  }

  // 4. Envoi à tous les abonnés
  for (const s of subs) {
    try {
      await webpush.sendNotification(s.subscription, JSON.stringify(msg))
    } catch (e) {
      console.error('Erreur envoi notif à un abonné:', e)
    }
  }

  return new Response(`Notifications envoyées à ${subs.length} abonné(s) ✅`, { status: 200 })
})
