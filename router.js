import { createRouter, createWebHistory } from 'vue-router'
import AjouterAliment from './src/views/AjouterAliment.vue'
import ListeAliments from './src/views/ListeAliment.vue'
import Courses from './src/views/ListeCourses.vue'
import AjouterCourse from './src/views/AjouterCourse.vue'

const routes = [
  { path: '/',  component: ListeAliments },
  { path: '/ajouteraliment', component: AjouterAliment },
  { path: '/courses', component: Courses },
  { path: '/ajoutercourse', component: AjouterCourse },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})