import { createRouter, createWebHistory } from 'vue-router'
import AjouterAliment from './src/views/AjouterFrigo.vue'
import ListeAliments from './src/views/ListeFrigo.vue'
import Courses from './src/views/ListeCourses.vue'
import AjouterCourse from './src/views/AjouterCourse.vue'
import Congelateur from './src/views/ListeCongelateur.vue'
import AjouterCongelateur from './src/views/AjouterCongelateur.vue'

const routes = [
  { path: '/',  component: ListeAliments },
  { path: '/ajouterfrigo', component: AjouterAliment },
  { path: '/courses', component: Courses },
  { path: '/ajoutercourse', component: AjouterCourse },
  { path: '/congelateur', component: Congelateur },
  { path: '/ajoutercongelateur', component: AjouterCongelateur },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})