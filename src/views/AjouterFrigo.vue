<script setup>
import { ref } from 'vue'
import { addAliment } from '../services/api'
import Topbar from '../components/Topbar.vue'

const nom = ref('')
const date_peremption = ref('')
const quantite = ref(1)
const etat = ref('')
const etats = ref([
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
])
const categorie = ref('')
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

async function ajouter() {
  try {
    await addAliment({
      nom: nom.value,
      date_peremption: date_peremption.value,
      quantite: quantite.value,
      etat: etat.value,
      categorie: categorie.value,
    })
    alert('Aliment ajouté !')
    nom.value = ''
    date_peremption.value = ''
    quantite.value = 1
    etat.value = ''
    categorie.value = ''
  } catch (error) {
    console.error(error)
    alert("Erreur lors de l'ajout.")
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen px-4 bg-gray-100">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
      <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">Ajouter un aliment</h1>

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
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
          <input
            v-model.number="quantite"
            type="number"
            min="1"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">État</label>
          <select
            v-model="etat"
            required
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option disabled value="">-- Choisir un état --</option>
            <option v-for="etat in etats" :key="etat" :value="etat">
              {{ etat }}
            </option>
          </select>
        </div>

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
