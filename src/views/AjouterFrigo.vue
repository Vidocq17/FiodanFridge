<script setup>
import { computed, onMounted, ref } from 'vue'
import { addAliment, getAliments } from '../services/api'
import { useToast } from 'vue-toastification'

const nom = ref('') // ✅ un seul champ cohérent
const date_peremption = ref('')
const quantite = ref(1)
const etat = ref('Frais')
const categorie = ref('')
const existingNames = ref([])
const toast = useToast()

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
</script>

<template>
  <div class="flex justify-center items-center min-h-screen px-4 bg-gray-100">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
      <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">Ajouter un aliment</h1>

      <form @submit.prevent="ajouter" class="space-y-4">
        <!-- Champ Nom + Suggestions -->
        <div class="relative">
          <input
            v-model="nom"
            type="text"
            placeholder="Nom de l’aliment"
            required
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ul
            v-if="suggestions.length"
            class="absolute z-10 bg-white border rounded-md w-full mt-1 shadow"
          >
            <li
              v-for="(sugg, i) in suggestions"
              :key="i"
              @click="nom = sugg"
              class="px-3 py-1 hover:bg-blue-100 cursor-pointer"
            >
              {{ sugg }}
            </li>
          </ul>
        </div>

        <!-- Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date de péremption</label>
          <input
            v-model="date_peremption"
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

        <!-- État -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">État</label>
          <select
            v-model="etat"
            required
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option disabled value="">-- Choisir un état --</option>
            <option v-for="etatOption in etats" :key="etatOption" :value="etatOption">
              {{ etatOption }}
            </option>
          </select>
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
