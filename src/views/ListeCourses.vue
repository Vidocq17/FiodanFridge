<script setup>
import { ref, computed, onMounted } from 'vue'
import { getCourses, deleteCourse, updateCourse } from '../services/api'
import { useToast } from 'vue-toastification'

import ModalCourses from '../components/modal/ModalCourses.vue'
import ModalFrigoCourse from '../components/modal/ModalCourseToFrigo.vue'

const courses = ref([])
const selectedCategory = ref('')

const toast = useToast()

const searchterm = ref('')

const showModal = ref(false)
const courseEdition = ref(null)
const showAjoutFrigo = ref(false)
const courseSelectionnee = ref(null)

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

async function fetchCourses() {
  courses.value = await getCourses()
}

onMounted(fetchCourses)

async function supprimer(id) {
  await deleteCourse(id)
  toast.success('Course supprimée avec succès !')
  fetchCourses()
}

function ouvrirModal(course) {
  courseEdition.value = { ...course }
  showModal.value = true
}

function toggleFait(course) {
  course.fait = !course.fait
  toast.success(`Course marquée comme ${course.fait ? 'faite' : 'non faite'} !`)
  updateCourse(course.id, { ...course, fait: course.fait })
    .then(fetchCourses)
    .catch((error) => console.error('Error updating course:', error))
}

async function enregistrerModifications() {
  await updateCourse(courseEdition.value.id, {
    nom: courseEdition.value.nom,
    description: courseEdition.value.description,
    categorie: courseEdition.value.categorie,
    fait: courseEdition.value.fait || false,
  })
  showModal.value = false
  toast.success('Modifications enregistrées avec succès !')
  fetchCourses()
}

const filteredCourses = computed(() => {
  let result = [...courses.value]

  if (selectedCategory.value) {
    result = result.filter((c) => c.categorie === selectedCategory.value)
  }
  if (searchterm.value) {
    result = result.filter((c) => c.nom.toLowerCase().includes(searchterm.value.toLowerCase()))
  }
  result.sort((a, b) => Number(a.fait) - Number(b.fait))
  return result
})

function passerAuFrigo(course) {
  courseSelectionnee.value = course
  showAjoutFrigo.value = true
}
</script>

<template>
  <div class="min-h-screen p-4 bg-gray-100">
    <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Liste des courses</h1>

    <router-link
      to="/ajoutercourse"
      class="block md:hidden max-w-fit mx-auto mb-6 text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow"
    >
      ➕ Ajouter une course
    </router-link>

    <!-- Filtres -->
    <div class="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
      <div class="max-w-md">
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
        <label class="block text-gray-600 text-sm mb-1">Rechercher une course :</label>
        <input
          v-model="searchterm"
          type="text"
          placeholder="Rechercher par nom..."
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <!-- Liste -->
    <div class="grid py-4 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="course in filteredCourses"
        :key="course.id"
        class="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500"
      >
        <div class="flex items-center justify-between mb-2">
          <h2 class="text-lg font-semibold text-gray-800">{{ course.nom }}</h2>
          <label class="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              :checked="course.fait"
              @change="toggleFait(course)"
              class="accent-green-600"
            />
            Fait
          </label>
        </div>
        <p class="text-sm text-gray-600 mt-1">{{ course.description }}</p>
        <p class="text-sm text-gray-600">Catégorie : {{ course.categorie }}</p>

        <div class="mt-4 flex justify-between gap-2">
          <button
            @click="ouvrirModal(course)"
            class="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white text-sm py-2 rounded"
          >
            ✏️ Modifier
          </button>
          <button
            @click="supprimer(course.id)"
            class="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded"
          >
            🗑 Supprimer
          </button>
          <button
            @click="passerAuFrigo(course)"
            class="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm py-2 rounded"
          >
            ❄️ Passer au frigo
          </button>
        </div>

        <ModalCourses
          v-if="showModal && courseEdition?.id === course.id"
          :show="showModal"
          :course="courseEdition"
          :categories="categories"
          @close="showModal = false"
          @save="enregistrerModifications"
        />

        <ModalFrigoCourse
          :show="showAjoutFrigo"
          :course="courseSelectionnee"
          @close="showAjoutFrigo = false"
          @saved="fetchCourses"
        />
      </div>
    </div>
  </div>
</template>
