<script setup>
import Sidebar from './components/Sidebar.vue'
import Topbar from './components/Topbar.vue'
</script>


<template>
  <div class="flex flex-col min-h-screen md:flex-row">
    <Topbar />
    <Sidebar />
    <main class="flex-1 p-4 bg-gray-100">
      <router-view />
    </main>
  </div>
</template>
