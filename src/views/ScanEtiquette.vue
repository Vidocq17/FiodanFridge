<script setup>
import { ref } from 'vue'
import Tesseract from 'tesseract.js'
import { useToast } from 'vue-toastification'

const imageFile = ref(null)
const imagePreview = ref(null)
const ocrResult = ref('')
const loading = ref(false)
const toast = useToast()

function handleFileUpload(e) {
  const file = e.target.files[0]
  if (file) {
    imageFile.value = file
    imagePreview.value = URL.createObjectURL(file)
    ocrResult.value = ''
    scanImage()
  }
}

async function scanImage() {
  loading.value = true
  toast.info('🔍 Lecture de l’étiquette en cours...')

  try {
    const { data: { text } } = await Tesseract.recognize(
      imageFile.value,
      'fra+eng', // OCR français + anglais
      { logger: m => console.log(m) }
    )
    ocrResult.value = text.trim()
    toast.success('✅ Texte extrait avec succès !')
  } catch (error) {
    console.error(error)
    toast.error("Erreur lors de la reconnaissance.")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-xl mx-auto p-4 bg-white shadow rounded">
    <h2 class="text-xl font-bold mb-4">📷 Scanner une étiquette</h2>

    <input
      type="file"
      accept="image/*"
      capture="environment"
      @change="handleFileUpload"
      class="mb-4"
    />

    <div v-if="imagePreview" class="mb-4">
      <img :src="imagePreview" alt="Preview" class="max-w-full h-auto rounded shadow" />
    </div>

    <div v-if="loading" class="text-blue-600">Traitement en cours...</div>

    <div v-if="ocrResult && !loading" class="bg-gray-100 p-3 rounded border text-sm whitespace-pre-line">
      <strong>📝 Résultat OCR :</strong>
      <br />
      {{ ocrResult }}
    </div>
  </div>
</template>
