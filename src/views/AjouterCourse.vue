<script setup>
import { ref } from 'vue'
import { addCourse } from '../services/api'

const courseName = ref('')
const courseDescription = ref('')

async function submitCourse() {
  await addCourse({
    nom: courseName.value,
    description: courseDescription.value
  })
    alert('Course ajoutée !')
}
</script>

<template>
    <h1>Ajouter une course</h1>
    <form @submit.prevent="submitCourse">
        <div>
            <label for="nom">Nom de la course:</label>
            <input type="text" id="nom" v-model="courseName" required />
        </div>
        <div>
            <label for="description">Description de la course:</label>
            <input type="text" id="description" v-model="courseDescription" />
        </div>
        <button type="submit">Ajouter</button>
    </form>
</template>