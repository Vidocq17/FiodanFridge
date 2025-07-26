<script setup>
import { ref, computed, onMounted } from 'vue'
import { addCourse, getCourses } from '../services/api'
import { useToast } from 'vue-toastification'

const courseName = ref('')
const courseDescription = ref('')
const selectedCategory = ref('')
const toast = useToast()

const courseCategories = [
  'Fruits',
  'Légumes',
  'Produits laitiers',
  'Viandes',
  'Poissons',
  'Pains',
  'Boissons',
  'Autres',
]

const existingCourseNames = ref([])

function resetValues() {
  courseName.value = ''
  courseDescription.value = ''
  selectedCategory.value = ''
}

async function submitCourse() {
  await addCourse({
    nom: courseName.value,
    description: courseDescription.value,
    categorie: selectedCategory.value,
  })
  toast.success('Course ajoutée !')
  resetValues()
}

// Récupérer les noms existants
onMounted(async () => {
  try {
    const allCourses = await getCourses()
    existingCourseNames.value = [...new Set(allCourses.map((c) => c.nom?.toLowerCase()).filter(Boolean))]
  } catch (error) {
    console.error('Erreur lors du chargement des noms de course', error)
  }
})

// Suggestions
const suggestions = computed(() => {
  if (!courseName.value) return []
  const input = courseName.value.toLowerCase()
  return existingCourseNames.value.filter((name) => name.startsWith(input)).slice(0, 5)
})
</script>

<template>
  <div class="flex justify-center items-center min-h-screen px-4 bg-gray-100">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
      <h1 class="text-2xl font-semibold text-center text-gray-800 mb-6">Ajouter une course</h1>

      <form @submit.prevent="submitCourse" class="space-y-4">
        <!-- Champ nom avec suggestions -->
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input
            v-model="courseName"
            type="text"
            required
            placeholder="Nom de la course"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ul
            v-if="suggestions.length"
            class="absolute z-10 bg-white border rounded-md w-full mt-1 shadow"
          >
            <li
              v-for="(sugg, index) in suggestions"
              :key="index"
              @click="courseName = sugg"
              class="px-3 py-1 hover:bg-blue-100 cursor-pointer"
            >
              {{ sugg }}
            </li>
          </ul>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            v-model="courseDescription"
            type="text"
            placeholder="Détails ou quantité"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Catégorie -->
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
