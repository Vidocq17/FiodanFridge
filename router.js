import { createRouter, createWebHistory } from 'vue-router'
import AjouterAliment from './src/views/AddAliment.vue'
import ListeAliments from './src/views/ListAliment.vue'
import Courses from './src/views/Courses.vue'
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