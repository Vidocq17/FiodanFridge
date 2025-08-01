<script setup>
import { ref, watch } from 'vue'
import { addCourse } from '../../services/api'
import { useToast } from 'vue-toastification'

const props = defineProps({
  frigo: Object,
  show: Boolean,
})

const emit = defineEmits(['close', 'saved'])

const toast = useToast()
const showForm = ref(false)

const categories = [
  'Boissons',
  'Fruits',
  'Hygiène',
  'Légumes',
  'Légumineuses',
  'Poissons',
  'Produits laitiers',
  'Purée',
  'Salades',
  'Sauce',
  'Viandes',
  'Viennoiserie',
  'Autres',
]

const form = ref({
  nom: '',
  quantite: 1,
  description: '',
  categorie: '',
})

watch(
  () => props.frigo,
  (newFrigo) => {
    if (newFrigo) {
      form.value.nom = newFrigo.nom || ''
      form.value.quantite = newFrigo.quantite || 1
      form.value.categorie = newFrigo.categorie || 'Autres'
    }
  },
  { immediate: true },
)

async function enregistrerEtSupprimer() {
  try {
    await addCourse({
      nom: form.value.nom,
      quantite: form.value.quantite,
      description: form.value.description || '',
      categorie: form.value.categorie || 'Autres',
    })
    toast.success('Ajouté à la liste de courses !')
    emit('saved')
    emit('close')
  } catch (err) {
    toast.error("Échec de l'ajout")
  }
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">

    <div
      v-if="!showForm"
      class="bg-white p-6 rounded shadow-md w-full max-w-md text-center space-y-4"
    >
      <h2 class="text-lg font-bold">Supprimer cet aliment</h2>
      <p>Souhaitez-vous l’ajouter à votre liste de courses avant ?</p>
      <div class="flex justify-center gap-4">
        <button
          class="bg-blue-600 text-white px-4 py-2 rounded"
          @click="showForm = true"
        >
          Oui, ajouter
        </button>
        <button
          class="bg-gray-400 text-white px-4 py-2 rounded"
          @click="$emit('saved'); $emit('close')"
        >
          Non, supprimer
        </button>
      </div>
    </div>

    <div
      v-else
      class="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
    >
      <h2 class="text-lg font-bold mb-2">Ajouter à la liste de courses</h2>

      <div>
        <label class="block text-sm font-medium">Nom</label>
        <input
          v-model="form.nom"
          type="text"
          class="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label class="block text-sm font-medium">Description</label>
        <input
          v-model="form.description"
          type="text"
          class="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label class="block text-sm font-medium">Quantité</label>
        <input
          v-model.number="form.quantite"
          type="number"
          min="1"
          class="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label class="block text-sm font-medium">Catégorie</label>
        <select
          v-model="form.categorie"
          class="w-full border rounded px-3 py-2"
        >
          <option disabled value="">-- Choisir --</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <div class="flex justify-end gap-2">
        <button class="text-gray-500" @click="$emit('close')">Annuler</button>
        <button class="bg-blue-600 text-white px-4 py-2 rounded" @click="enregistrerEtSupprimer">
          Ajouter & Supprimer
        </button>
      </div>
    </div>
  </div>
</template>
