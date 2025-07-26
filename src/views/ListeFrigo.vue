<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getAliments, updateAliment, deleteAliment, passerAuCongelateur } from '../services/api'
import ModalFrigo from '../components/modal/ModalFrigo.vue'

const aliments = ref([])
const selectedCategory = ref('')
const categories = [
  'Boissons',
  'Fruits',
  'Hygiène',
  'Légumes',
  'Poissons',
  'Produits laitiers',
  'Viandes',
  'Viennoiserie',
  'Autres',
]
const showModal = ref(false)
const alimentEdition = ref(null)

async function fetchAliments() {
  aliments.value = await getAliments()
}
onMounted(fetchAliments)

const alimentsFiltres = computed(() => {
  if (!selectedCategory.value) return aliments.value
  return aliments.value.filter((a) => a.categorie === selectedCategory.value)
})

async function supprimer(id) {
  await deleteAliment(id)
  fetchAliments()
}
async function modifier(id) {
  await updateAliment(id)
  fetchAliments()
}

function ouvrirModal(aliment) {
  alimentEdition.value = { ...aliment } // Crée une copie pour l'édition
  showModal.value = true
}

async function enregistrerModifications() {
  await updateAliment(alimentEdition.value.id, {
    nom: alimentEdition.value.nom,
    categorie: alimentEdition.value.categorie,
    quantite: alimentEdition.value.quantite,
    date_peremption: alimentEdition.value.date_peremption,
  })
  showModal.value = false
  fetchAliments()
}
</script>

<template>
  <div class="p-4 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Mon frigo</h1>

    <router-link
      to="/ajouterfrigo"
      class="block max-w-fit mx-auto mb-6 text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow"
    >
      ➕ Ajouter un aliment
    </router-link>

    <!-- Filtre catégorie -->
    <div class="mb-6 max-w-md mx-auto">
      <label class="block text-gray-600 text-sm mb-1">Filtrer par catégorie :</label>
      <select
        v-model="selectedCategory"
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Toutes</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <!-- Liste des aliments en cartes -->
    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="aliment in alimentsFiltres"
        :key="aliment.id"
        class="bg-white rounded-lg shadow p-4 border-l-4"
        :class="{
          'border-green-500': aliment.categorie.toLowerCase().includes('frais'),
          'border-yellow-400': aliment.categorie.toLowerCase().includes('à consommer'),
          'border-red-500': aliment.categorie.toLowerCase().includes('périmé'),
        }"
      >
        <h2 class="text-lg font-semibold text-gray-800">{{ aliment.nom }}</h2>
        <!-- mettre une majuscule sur la catégorie -->
        <p class="text-sm text-gray-500">
          {{ aliment.categorie.charAt(0).toUpperCase() + aliment.categorie.slice(1) }}
        </p>
        <p class="text-sm text-gray-600 mt-1">Quantité : {{ aliment.quantite }}</p>
        <p class="text-sm text-gray-600">
          Péremption : {{ new Date(aliment.date_peremption).toLocaleDateString() }}
        </p>

        <div class="mt-4 flex justify-between gap-2">
          <!-- Modifier : à implémenter plus tard -->
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
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white text-sm p-2 rounded"
            @click="passerAuCongelateur(aliment)"
          >
            🧊 Congeler
          </button>
        </div>
        <ModalFrigo
          v-if="showModal"
          :show="showModal"
          :aliment="alimentEdition"
          :categories="categories"
          @close="showModal = false"
          @save="enregistrerModifications"
        />
      </div>
    </div>
  </div>
</template>
