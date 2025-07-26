<script setup>
import { computed, onMounted, ref } from 'vue'
import { addAliment, getAliments } from '../services/api'
import { useToast } from 'vue-toastification'

import ScanEtiquette from './ScanEtiquette.vue'

const nom = ref('') // ✅ un seul champ cohérent
const date_peremption = ref('')
const quantite = ref(1)
const etat = ref('Frais')
const categorie = ref('')
const existingNames = ref([])
const toast = useToast()
const imagePreview = ref(null)
const loadingOCR = ref(false)

const etats = [
  'À consommer rapidement',
  'Congelé',
  'Cru',
  'Cuit',
  'En Bocal',
  'En conserve',
  'Frais',
  'Fumé',
  'Mariné',
  'Périmé',
  'Autre',
]

const categories = [
  'Boissons',
  'Fruits',
  'Hygiène',
  'Légumes',
  'Légumineuses',
  'Poissons',
  'Produits laitiers',
  'Purée',
  'Salades',
  'Sauce',
  'Viandes',
  'Viennoiserie',
  'Autres',
]

function resetValues() {
  nom.value = ''
  date_peremption.value = ''
  quantite.value = 1
  etat.value = 'Frais'
  categorie.value = ''
}

async function ajouter() {
  try {
    await addAliment({
      nom: nom.value,
      date_peremption: date_peremption.value,
      quantite: quantite.value,
      etat: etat.value,
      categorie: categorie.value,
    })
    toast.success('Aliment ajouté avec succès !')
    resetValues()
  } catch (error) {
    console.error(error)
    toast.error("Erreur lors de l'ajout.")
  }
}

onMounted(async () => {
  try {
    const aliments = await getAliments()
    existingNames.value = [...new Set(aliments.map((a) => a.nom?.toLowerCase()).filter(Boolean))]
  } catch (error) {
    console.error('Erreur lors du chargement des noms existants :', error)
  }
})

const suggestions = computed(() => {
  if (!nom.value) return []
  const lowerInput = nom.value.toLowerCase()
  return existingNames.value.filter((n) => n.startsWith(lowerInput)).slice(0, 5)
})

// OCR : analyser image
async function scanEtiquette(file) {
  loadingOCR.value = true
  toast.info('🔍 Lecture de l’étiquette...')

  try {
    const { data: { text } } = await Tesseract.recognize(
      file,
      'fra+eng',
      { logger: m => console.log(m) }
    )

    const lignes = text.split('\n').map(l => l.trim()).filter(Boolean)
    if (lignes.length) {
      nom.value = lignes[0]
      toast.success(`Nom détecté : "${lignes[0]}"`)
    } else {
      toast.warning('OCR terminé mais rien de lisible.')
    }
  } catch (error) {
    console.error(error)
    toast.error('Erreur OCR.')
  } finally {
    loadingOCR.value = false
  }
}

function handleImageUpload(e) {
  const file = e.target.files[0]
  if (file) {
    imagePreview.value = URL.createObjectURL(file)
    scanEtiquette(file)
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen px-4 bg-gray-100">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
      <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">Ajouter un aliment</h1>

      <!-- Scan étiquette -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Scanner une étiquette</label>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          @change="handleImageUpload"
          class="block w-full text-sm text-gray-500"
        />
        <img
          v-if="imagePreview"
          :src="imagePreview"
          alt="Prévisualisation"
          class="mt-3 rounded shadow w-full"
        />
        <p v-if="loadingOCR" class="text-sm text-blue-600 mt-2">🔄 Analyse de l’image...</p>
      </div>

      <form @submit.prevent="ajouter" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input
            v-model="nom"
            type="text"
            required
            placeholder="Nom de l'aliment"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date de péremption</label>
          <input
            v-model="date_peremption"
            type="date"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
          <input
            v-model.number="quantite"
            type="number"
            min="1"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">État</label>
          <select
            v-model="etat"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option disabled value="">-- Choisir un état --</option>
            <option v-for="e in etats" :key="e" :value="e">{{ e }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
          <select
            v-model="categorie"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option disabled value="">-- Choisir une catégorie --</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Ajouter
        </button>
      </form>
    </div>
  </div>
</template>
