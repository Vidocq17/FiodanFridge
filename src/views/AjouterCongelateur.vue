<script setup>
import { ref, computed, onMounted } from 'vue'
import { addCongelateur, getCongelateur } from '../services/api'
import { useToast } from 'vue-toastification'

const nom = ref('')
const todayDate = new Date().toISOString().split('T')[0]
const date_congelation = ref(todayDate)
const quantite = ref(1)
const etat = ref('Congelé')
const categorie = ref('')
const existingNames = ref([])

const toast = useToast()

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
  date_congelation.value = todayDate
  quantite.value = 1
  etat.value = 'Congelé'
  categorie.value = ''
}

const ajouter = async () => {
  await addCongelateur({
    nom: nom.value,
    date_congelation: date_congelation.value || null,
    quantite: quantite.value,
    etat: etat.value,
    categorie: categorie.value,
  })
  toast.success('Aliment ajouté au congélateur avec succès !')
  resetValues()
}

// Suggestions
onMounted(async () => {
  try {
    const aliments = await getCongelateur()
    existingNames.value = [...new Set(aliments.map((a) => a.nom?.toLowerCase()).filter(Boolean))]
  } catch (error) {
    console.error('Erreur lors du chargement des aliments :', error)
  }
})

const suggestions = computed(() => {
  if (!nom.value) return []
  const input = nom.value.toLowerCase()
  return existingNames.value.filter((n) => n.startsWith(input)).slice(0, 5)
})
</script>

<template>
  <div class="flex justify-center items-center min-h-screen px-4 bg-gray-100">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
      <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">Ajouter au congélateur</h1>
      <form @submit.prevent="ajouter" class="space-y-4">
        <!-- Champ nom + suggestions -->
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input
            v-model="nom"
            type="text"
            required
            placeholder="Nom de l'aliment"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ul
            v-if="suggestions.length"
            class="absolute z-10 bg-white border rounded-md w-full mt-1 shadow"
          >
            <li
              v-for="(sugg, index) in suggestions"
              :key="index"
              @click="nom = sugg"
              class="px-3 py-1 hover:bg-blue-100 cursor-pointer"
            >
              {{ sugg }}
            </li>
          </ul>
        </div>

        <!-- Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date de congélation</label>
          <input
            v-model="date_congelation"
            type="date"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Quantité -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
          <input
            v-model.number="quantite"
            type="number"
            min="1"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- État (readonly) -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">État</label>
          <input
            v-model="etat"
            type="text"
            readonly
            class="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
          />
        </div>

        <!-- Catégorie -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
          <select
            v-model="categorie"
            required
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option disabled value="">-- Choisir une catégorie --</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <!-- Bouton -->
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Ajouter
        </button>
      </form>
    </div>
  </div>
</template>
