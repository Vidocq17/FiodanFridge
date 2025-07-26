<script setup>
const publicKey = import.meta.env.VITE_VALID_PUBLIC_KEY
console.log('Clé publique VAPID:', publicKey)

async function registerNotification() {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Notifications non supportées')
    return
  }

  console.log('Demande de permission...')
  const permission = await Notification.requestPermission()
  console.log('Permission:', permission)
  if (permission !== 'granted') {
    console.warn('Permission refusée')
    return
  }

  console.log('Permission accordée. Service Worker en cours...')
  const registration = await navigator.serviceWorker.ready
  console.log('Service Worker prêt')

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  })

  console.log('Subscription obtenue:', JSON.stringify(subscription, null, 2))

  const functionUrl = import.meta.env.VITE_SUBSCRIBE_ENDPOINT
  console.log('Envoi de la subscription à:', functionUrl)

  const response = await fetch(functionUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subscription }),
  })

  if (response.ok) {
    console.log('Subscription envoyée avec succès ✅')
    alert('Notifications activées ✅')
  } else {
    console.error('Erreur envoi subscription', await response.text())
  }
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
  <button
    @click="registerNotification"
    class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
  >
    🔔 Activer les notifications
  </button>
</template>
