<script setup>
import { supabase } from '../supabaseClient'
const publicKey = import.meta.env.VITE_VALID_PUBLIC_KEY

async function registerNotification() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    alert('Navigateur non compatible avec les notifications')
    return
  }

  const permission = await Notification.requestPermission()
  if (permission !== 'granted') {
    alert('Notifications refusées')
    return
  }

  const registration = await navigator.serviceWorker.ready
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey)
  })

  const user = supabase.auth.getUser ? (await supabase.auth.getUser()).data.user : null
  if (!user) {
    alert('Utilisateur non connecté')
    return
  }

  await fetch('https://cfekvupaqtumlystlumc.functions.supabase.co/save-subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subscription,
      user_id: user.id
    })
  })

  alert('Notifications activées ✅')
}

// utils
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)))
}
</script>

<template>
  <button @click="registerNotification"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow">
    🔔 Activer les notifications
  </button>
</template>
