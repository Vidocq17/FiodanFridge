<script setup>
import { ref } from 'vue'
import { addCongelateur } from '../services/api'

const nom = ref('')
const todayDate = new Date().toISOString().split('T')[0]
const date_congelation = ref(todayDate) // Default to today
const quantite = ref(1)
const etat = ref('')
const etats = ref(['congelé, LOL', 'autre, bah non du coup'])
const categorie = ref('')
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

const ajouter = async () => {
  await addCongelateur({
    nom: nom.value,
    date_congelation: date_congelation.value || null,
    quantite: quantite.value,
    etat: etat.value,
    categorie: categorie.value,
  })
  alert('Ajouté au congélateur !')
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen px-4 bg-gray-100">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
      <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">Ajouter au congélateur</h1>
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
          <label class="block text-sm font-medium text-gray-700 mb-1">Date de congélation</label>
          <input
            v-model="date_congelation"
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
