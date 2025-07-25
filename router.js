import { createRouter, createWebHistory } from 'vue-router'
import AjouterAliment from './src/views/AddAliment.vue'
import ListeAliments from './src/views/ListAliment.vue'
import Courses from './src/views/Courses.vue'

const routes = [
  { path: '/', redirect: '/liste' },
  { path: '/ajouter', component: AjouterAliment },
  { path: '/liste', component: ListeAliments },
  { path: '/courses', component: Courses },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})