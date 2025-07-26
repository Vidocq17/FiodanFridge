<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getAliments, updateAliment, deleteAliment, passerAuCongelateur } from '../services/api'
import { useToast } from 'vue-toastification'

import ModalFrigo from '../components/modal/ModalFrigo.vue'

// FAIT - TODO : notifications
// TODO : export calendrier pour chaque evenement ?
// FAIT - TODO : ajouter une fonction pour changer automatiquement l'état d'un aliment en fonction de sa date de péremption
// TODO : QR code scanner
// TODO : liste dans le nom pour aller plus vite
// TODO : ajouter un bouton pour passer un aliment depuis le frigo au congélateur

const aliments = ref([])
const selectedCategory = ref('')
const selectedEtat = ref('')
const showModal = ref(false)
const alimentEdition = ref(null)
const todayDate = new Date().toISOString().split('T')[0]
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

async function fetchAliments() {
  aliments.value = await getAliments()
}
onMounted(fetchAliments)

const alimentsFiltres = computed(() => {
  return aliments.value.filter((a) => {
    const matchCategorie = !selectedCategory.value || a.categorie === selectedCategory.value
    const matchEtat = !selectedEtat.value || a.etat === selectedEtat.value
    const matchRecherche =
      !searchTerm.value || a.nom.toLowerCase().includes(searchTerm.value.toLowerCase())
    return matchCategorie && matchEtat && matchRecherche
  })
})

async function supprimer(id) {
  await deleteAliment(id)
  toast.success('Aliment supprimé avec succès !')
  fetchAliments()
}

function ouvrirModal(aliment) {
  alimentEdition.value = { ...aliment }
  showModal.value = true
}

async function enregistrerModifications() {
  await updateAliment(alimentEdition.value.id, {
    nom: alimentEdition.value.nom,
    categorie: alimentEdition.value.categorie,
    quantite: alimentEdition.value.quantite,
    date_peremption: alimentEdition.value.date_peremption,
    etat: alimentEdition.value.etat,
  })
  showModal.value = false
  toast.success('Modifications enregistrées avec succès !')
  fetchAliments()
}

function getEtatAffichage(aliment) {
  const today = new Date()
  const peremption = new Date(aliment.date_peremption)
  const diff = peremption.getTime() - today.getTime()
  const joursRestants = diff / (1000 * 3600 * 24)

  if (joursRestants < 0) {
    aliment.etat = 'Périmé'
    return {
      message: '☠️ ATTENTION : cet aliment est périmé !',
      color: 'text-red-600 font-bold',
    }
  } else if (joursRestants <= 7) {
    return {
      message: `⏳ À consommer dans ${Math.ceil(joursRestants)} jour(s)`,
      color: 'text-yellow-600 font-semibold',
    }
  } else {
    return {
      message: '✅ Encore bon',
      color: 'text-green-600 font-medium',
    }
  }
}
</script>

<template>
  <div class="p-4 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Mon frigo</h1>

    <router-link
      to="/ajouterfrigo"
      class="block md:hidden max-w-fit mx-auto mb-6 text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow"
    >
      ➕ Ajouter un aliment
    </router-link>

    <!-- searchBar -->
    <div class="max-w-md mx-auto">
      <label class="block text-gray-600 text-sm mb-1">Rechercher un aliment :</label>
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Carotte, yaourt..."
        class="w-full max-w-md mx-auto mb-6 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Filtres -->
    <div class="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
      <div>
        <label class="block text-gray-600 text-sm mb-1">Filtrer par catégorie :</label>
        <select
          v-model="selectedCategory"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Toutes</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <div>
        <label class="block text-gray-600 text-sm mb-1">Filtrer par état :</label>
        <select
          v-model="selectedEtat"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous</option>
          <option v-for="etat in etats" :key="etat" :value="etat">{{ etat }}</option>
        </select>
      </div>
    </div>

    <!-- Liste des aliments -->
    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="aliment in alimentsFiltres"
        :key="aliment.id"
        class="bg-white rounded-lg shadow p-4 border-l-4"
        :class="{
          'border-green-500': aliment.etat === 'Frais',
          'border-yellow-400': aliment.etat === 'À consommer rapidement',
          'border-red-500': aliment.etat === 'Périmé',
        }"
      >
        <h2 class="text-lg font-semibold text-gray-800">{{ aliment.nom }}</h2>
        <p class="text-sm text-gray-500">
          {{ aliment.categorie.charAt(0).toUpperCase() + aliment.categorie.slice(1) }}
        </p>
        <p class="text-sm text-gray-600 mt-1">Quantité : {{ aliment.quantite }}</p>
        <p class="text-sm text-gray-600">État : {{ aliment.etat }}</p>
        <p class="text-sm text-gray-600">
          Péremption : {{ new Date(aliment.date_peremption).toLocaleDateString() }}
        </p>
        <p class="text-sm text-gray-600">
          Ajouté le : {{ new Date(todayDate).toLocaleDateString() }}
        </p>
        <p class="text-sm mt-2" :class="getEtatAffichage(aliment).color">
          {{ getEtatAffichage(aliment).message }}
        </p>

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
          <button
            @click="passerAuCongelateur(aliment)"
            class="bg-blue-500 hover:bg-blue-600 text-white text-sm p-2 rounded"
          >
            🧊 Congeler
          </button>
        </div>

        <!-- Modale -->
        <ModalFrigo
          v-if="showModal && alimentEdition?.id === aliment.id"
          :show="showModal"
          :aliment="alimentEdition"
          :categories="categories"
          :etats="etats"
          @close="showModal = false"
          @save="enregistrerModifications"
        />
      </div>
    </div>
  </div>
</template>
