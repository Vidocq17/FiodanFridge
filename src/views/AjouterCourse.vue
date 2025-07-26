<script setup>
import { ref } from 'vue'
import { addCourse } from '../services/api'
import Topbar from '../components/Topbar.vue'

const courseName = ref('')
const courseDescription = ref('')
const courseCategories = ref([
  'Fruits',
  'Légumes',
  'Produits laitiers',
  'Viandes',
  'Poissons',
  'Pains',
  'Boissons',
  'Autres',
])
const selectedCategory = ref('')

async function submitCourse() {
  await addCourse({
    nom: courseName.value,
    description: courseDescription.value,
    categorie: selectedCategory.value,
  })
  alert('Course ajoutée !') // TODO: mettre un système de notification plus élaboré que l'alert
  courseName.value = ''
  courseDescription.value = ''
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen px-4 bg-gray-100">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
      <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">Ajouter une course</h1>

      <form @submit.prevent="submitCourse" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input
            v-model="courseName"
            type="text"
            required
            placeholder="Nom de la course"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            v-model="courseDescription"
            type="text"
            placeholder="Détails ou quantité"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
          <select
            v-model="selectedCategory"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionner une catégorie</option>
            <option v-for="cat in courseCategories" :key="cat" :value="cat">{{ cat }}</option>
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
