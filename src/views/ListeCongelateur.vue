<script setup>
import { ref, onMounted, computed } from 'vue'
import { getCongelateur, updateCongelateur, deleteCongelateur } from '../services/api'
import { useToast } from 'vue-toastification'

import ModalCon from '../components/modal/ModalCongelateur.vue'

const aliments = ref([])
const showModal = ref(false)
const alimentEdition = ref(null)
const selectedCategory = ref('')
const toast = useToast()
const searchTerm = ref('')
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

async function fetchAliments() {
  aliments.value = await getCongelateur()
}

onMounted(fetchAliments)

function ouvrirModal(aliment) {
  alimentEdition.value = { ...aliment }
  showModal.value = true
}

async function enregistrerModifications() {
  await updateCongelateur(alimentEdition.value.id, {
    nom: alimentEdition.value.nom,
    quantite: alimentEdition.value.quantite,
    date_congelation: alimentEdition.value.date_congelation,
    categorie: alimentEdition.value.categorie,
  })
  showModal.value = false
  toast.success('Modifications enregistrées avec succès !')
  fetchAliments()
}

async function supprimer(id) {
  await deleteCongelateur(id)
  toast.success('Aliment supprimé avec succès !')
  fetchAliments()
}

const alimentsFiltres = computed(() => {
  return aliments.value.filter((a) => {
    const matchCategorie = !selectedCategory.value || a.categorie === selectedCategory.value
    const matchRecherche = !searchTerm.value || a.nom.toLowerCase().includes(searchTerm.value.toLowerCase())
    return matchCategorie && matchRecherche
  })
})
</script>

<template>
  <div class="min-h-screen p-4 bg-gray-100">
    <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">❄️ Mon congélateur</h1>

    <router-link
      to="/ajoutercongelateur"
      class="block md:hidden max-w-fit mx-auto mb-6 text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow"
    >
      ➕ Ajouter un aliment congelé
    </router-link>

    <!-- Filtre catégorie -->
    <div class="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
      <div class="mb-6 max-w-md ">
        <label class="block text-gray-600 text-sm mb-1">Filtrer par catégorie :</label>
        <select
          v-model="selectedCategory"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Toutes</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
      <div class="mb-6 max-w-md">
        <label class="block text-gray-600 text-sm mb-1">Rechercher un aliment :</label>
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Rechercher par nom..."
          class="w-full max-w-md mb-6 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="aliment in alimentsFiltres"
        :key="aliment.id"
        class="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500"
      >
        <h2 class="text-lg font-semibold text-gray-800">{{ aliment.nom }}</h2>
        <p class="text-sm text-gray-600">Quantité : {{ aliment.quantite }}</p>
        <p class="text-sm text-gray-600">
          Congelé depuis : {{ new Date(aliment.date_congelation).toLocaleDateString() }}
        </p>
        <p class="text-sm text-gray-600">Catégorie : {{ aliment.categorie }}</p>

        <div class="mt-4 flex justify-between gap-2">
          <button
            @click="ouvrirModal(aliment)"
            class="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white text-sm py-2 rounded"
          >
            ✏️ Modifier
          </button>
          <button
            @click="supprimer(aliment.id)"
            class="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded"
          >
            🗑 Supprimer
          </button>
        </div>

        <ModalCon
          v-if="showModal && alimentEdition?.id === aliment.id"
          :show="showModal"
          :aliment="alimentEdition"
          @close="showModal = false"
          @save="enregistrerModifications"
        />
      </div>
    </div>
  </div>
</template>
