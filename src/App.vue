<script setup>
import { ref } from 'vue'
import { addAliment } from './services/api'

import Topbar from './components/Topbar.vue'

const nom = ref('')
const date_peremption = ref('')
const quantite = ref(1)
const etat = ref('')
const categorie = ref('')
const categories = ref(['fruits', 'légumes', 'produits laitiers', 'viandes', 'poissons', 'pains', 'boissons', 'autres'])

async function ajouter() {
  try {
    await addAliment({
      nom: nom.value,
      date_peremption: date_peremption.value,
      quantite: quantite.value,
      etat: etat.value,
      categorie: categorie.value
    })
    alert('Aliment ajouté !')
    // Reset
    nom.value = ''
    date_peremption.value = ''
    quantite.value = 1
    etat.value = ''
    categorie.value = ''
  } catch (error) {
    console.error(error)
    alert("Erreur lors de l'ajout.")
  }
}
</script>

<template>
  <Topbar />
  <div class="container">
    <div class="form-card">
      <h1>Ajouter un aliment</h1>
      <form @submit.prevent="ajouter">
        <label>
          Nom
          <input v-model="nom" type="text" placeholder="Nom de l'aliment" />
        </label>

        <label>
          Date de péremption
          <input v-model="date_peremption" type="date" />
        </label>

        <label>
          Quantité
          <input v-model.number="quantite" type="number" min="1" />
        </label>

        <label>
          État
          <input v-model="etat" type="text" placeholder="Frais, périmé, etc." />
        </label>

        <label>
          Catégorie
          <select v-model="categorie">
            <option disabled value="">-- Choisir une catégorie --</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </label>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  </div>
</template>
