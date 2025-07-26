<script setup>
import Sidebar from './components/Sidebar.vue'
import Topbar from './components/Topbar.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <Topbar />

    <div class="flex flex-col md:flex-row flex-1 overflow-hidden">
      <aside class="w-full md:w-64 bg-white shadow-md z-10">
        <Sidebar />
      </aside>

      <main class="flex-1 overflow-auto p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>
