<script setup>
import { ref } from 'vue'
import { getAliments, updateAliment, deleteAliment } from '../services/api'

const aliments = ref([])

async function fetchAliments() {
  aliments.value = await getAliments()
}

fetchAliments()

</script>

<template>
  <div class="container">
    <h1>Liste des aliments</h1>
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