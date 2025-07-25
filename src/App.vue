<script setup>
import Sidebar from './components/Sidebar.vue'
import Topbar from './components/Topbar.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <!-- Topbar toujours en haut -->
    <Topbar />

    <!-- Contenu principal -->
    <div class="flex flex-col md:flex-row flex-1 overflow-hidden">
      <!-- Sidebar : colonne à gauche sur desktop, en haut sur mobile -->
      <aside class="w-full md:w-64 bg-white shadow-md z-10">
        <Sidebar />
      </aside>

      <!-- Zone centrale : router-view -->
      <main class="flex-1 overflow-auto p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>
