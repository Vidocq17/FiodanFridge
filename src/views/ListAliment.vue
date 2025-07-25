<script setup>
import { ref } from 'vue'
import { getAliments, updateAliment, deleteAliment } from '../services/api'

const aliments = ref([])

async function fetchAliments() {
  aliments.value = await getAliments()
}

// filtres
function filterAlimentsByCategory(category) {
  return aliments.value.filter(aliment => aliment.categorie === category)
}

const categories = ['fruits', 'légumes', 'produits laitiers', 'viandes', 'poissons', 'pains', 'boissons', 'autres']

fetchAliments()

</script>

<template>
  <div class="container">
    <h1>Liste des aliments</h1>
    <div class="filters">
      <label for="category">Filtrer par catégorie:</label>
      <select id="category" @change="filterAlimentsByCategory">
        <option value="">Toutes</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
    <ul>
      <li v-for="aliment in aliments" :key="aliment.id">
        {{ aliment.nom }} - {{ aliment.date_peremption }} - {{ aliment.quantite }} - {{ aliment.etat }} - {{ aliment.categorie }}
      </li>
        <li v-for="aliment in aliments" :key="aliment.id">
            <button @click="updateAliment(aliment)">Modifier</button>
            <button @click="deleteAliment(aliment.id)">Supprimer</button>
        </li>
    </ul>
  </div>
</template>