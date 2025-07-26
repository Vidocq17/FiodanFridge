<script setup>
defineProps({
  show: Boolean,
  course: Object,
  categories: Array,
})
const emit = defineEmits(['close', 'save'])
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">Modifier la course</h2>

      <label class="block mb-2 text-sm text-gray-700">Nom</label>
      <input v-model="course.nom" class="w-full border px-3 py-2 rounded mb-3" />

      <label class="block mb-2 text-sm text-gray-700">Description</label>
      <input v-model="course.description" class="w-full border px-3 py-2 rounded mb-3" />

      <label class="block mb-2 text-sm text-gray-700">Catégorie</label>
      <select v-model="course.categorie" class="w-full border px-3 py-2 rounded mb-4">
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>

      <div class="flex justify-end gap-2">
        <button @click="$emit('close')" class="px-4 py-2 rounded bg-gray-300">Annuler</button>
        <button @click="$emit('save')" class="px-4 py-2 rounded bg-blue-600 text-white">
          Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>
