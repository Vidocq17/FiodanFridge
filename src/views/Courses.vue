<script setup>
import { ref } from 'vue'
import { getCourses, deleteCourse, updateCourse } from '@/services/api';

const courses = ref([]);

async function fetchCourses() {
  courses.value = await getCourses();
}

fetchCourses();

</script>

<template>
  <div class="container">
    <h1>Liste des courses</h1>
    <ul class="course-list">
      <li v-for="course in courses" :key="course.id">
        {{ course.nom }} - {{ course.description }}
        <li v-for="course in courses" :key="course.id">
      </li>
        <button @click="updateCourse(course)">Modifier</button>
        <button @click="deleteCourse(course.id)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>