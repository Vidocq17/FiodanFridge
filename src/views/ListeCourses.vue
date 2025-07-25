<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getCourses, deleteCourse, updateCourse } from '../services/api'
import Topbar from '../components/Topbar.vue'

const courses = ref([])

async function fetchCourses() {
  courses.value = await getCourses()
}

onMounted(fetchCourses)

// Placeholder : à remplacer par une vraie modale ou édition plus tard
async function modifier(course) {
  alert(`Modifier non implémenté pour : ${course.nom}`)
}

async function supprimer(id) {
  await deleteCourse(id)
  fetchCourses()
}
</script>

<template>
  <Topbar />

  <div class="min-h-screen p-4 bg-gray-100">
    <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Liste des courses</h1>

    <router-link
      to="/ajoutercourse"
      class="block max-w-fit mx-auto mb-6 text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow"
    >
      ➕ Ajouter une course
    </router-link>

    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="course in courses"
        :key="course.id"
        class="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500"
      >
        <h2 class="text-lg font-semibold text-gray-800">{{ course.nom }}</h2>
        <p class="text-sm text-gray-600 mt-1">{{ course.description }}</p>

        <div class="mt-4 flex justify-between gap-2">
          <button
            @click="modifier(course)"
            class="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white text-sm py-1 rounded"
          >
            ✏️ Modifier
          </button>
          <button
            @click="supprimer(course.id)"
            class="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-1 rounded"
          >
            🗑 Supprimer
          </button>
          <label class="flex items-center gap-2 text-sm mt-3">
            <input
              type="checkbox"
              :checked="course.fait"
              @change="updateCourse(course.id, { fait: !course.fait })"
              class="accent-green-600"
            />
            Fait
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
