<script setup>
import NotificationRegister from '../views/NotificationRegister.vue';
</script>
<template>
  <nav class="bg-gray-100 shadow-md w-full md:w-60 md:h-screen p-4 flex md:flex-col items-center md:items-start gap-4 md:gap-6">
    <img src="../assets/logo.png" alt="Logo" class="w-12 h-12" />
    <notification-register />

    <ul class="flex flex-wrap md:flex-col gap-4 md:gap-6">
      <li>
        <router-link to="/" class="text-gray-800 hover:text-blue-600 font-medium">📦 Mon frigo</router-link>
      </li>
      <li>
        <router-link to="/ajouteraliment" class="text-gray-800 hover:text-blue-600 font-medium ml-4">➕ Ajouter aliment</router-link>
      </li>
      <li>
        <router-link to="/courses" class="text-gray-800 hover:text-blue-600 font-medium">🛒 Courses</router-link>
      </li>
      <li>
        <router-link to="/ajoutercourse" class="text-gray-800 hover:text-blue-600 font-medium ml-4">➕ Ajouter course</router-link>
      </li>
      <li>
        <router-link to="/congelateur" class="text-gray-800 hover:text-blue-600 font-medium">❄️ Congélateur</router-link>
      </li>
      <li>
        <router-link to="/ajoutercongelateur" class="text-gray-800 hover:text-blue-600 font-medium ml-4">➕ Ajouter congélateur</router-link>
      </li>
    </ul>
  </nav>
</template>
