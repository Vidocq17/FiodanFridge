<script setup>
import { ref, watch } from 'vue'
import { addAliment } from '../../services/api'
import { useToast } from 'vue-toastification'

const props = defineProps({
  course: Object,
  show: Boolean,
})

const emit = defineEmits(['close', 'saved'])

const toast = useToast()

const form = ref({
  nom: props.course?.nom || '',
  date_peremption: '',
  quantite: props.course?.quantite || 1,
})

watch(
  () => props.course,
  (newCourse) => {
    form.value.nom = newCourse?.nom || ''
    form.value.quantite = newCourse?.quantite || 1
  },
  { immediate: true }
)

async function enregistrer() {
  if (!form.value.date_peremption) return toast.error('Date de péremption requise')

  await addAliment({
    nom: props.course?.nom || '',
    quantite: props.course?.quantite || 1,
    date_peremption: form.value.date_peremption,
    categorie: props.course?.categorie || 'Autres',
    etat: 'Frais',
  })

  toast.success('Aliment ajouté au frigo !')
  emit('saved')
  emit('close')
}
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h2 class="text-lg font-bold mb-4">Ajouter au frigo</h2>

      <label class="block mb-2 text-sm font-medium">Nom</label>
      <input
        v-model="form.nom"
        type="text"
        class="w-full border rounded px-3 py-2 mb-4"
      />

      <label class="block mb-2 text-sm font-medium">Date de péremption</label>
      <input
        v-model="form.date_peremption"
        type="date"
        class="w-full border rounded px-3 py-2 mb-4"
      />

      <label class="block mb-2 text-sm font-medium">Quantité</label>
      <input
        v-model.number="form.quantite"
        type="number"
        min="1"
        class="w-full border rounded px-3 py-2 mb-4"
      />

      <div class="flex justify-end gap-2">
        <button class="text-gray-500" @click="$emit('close')">Annuler</button>
        <button class="bg-blue-600 text-white px-4 py-2 rounded" @click="enregistrer">Ajouter</button>
      </div>
    </div>
  </div>
</template>
