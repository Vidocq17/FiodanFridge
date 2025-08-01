<template>
  <nav
    class="bg-gray-100 shadow-md w-full md:w-60 md:h-screen p-4 flex flex-col items-center md:items-start gap-6"
  >
    <!-- Logo -->
    <!-- <div class="flex items-center justify-center w-full mb-4">
      <img :src=Logo alt="Logo" class="w-12 h-12" />
    </div> -->

    <!-- Liens de navigation -->
    <ul class="flex flex-row sm:flex-col gap-4 w-full justify-around">
      <li>
        <router-link to="/" class="flex flex-col md:flex-row gap-3 items-center text-gray-800 hover:text-blue-600 font-medium">
          📦 <span> Mon frigo </span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/ajouterfrigo"
          class="hidden md:block text-gray-800 hover:text-blue-600 font-medium pl-4">
          ➕ Ajouter aliment
        </router-link>
      </li>
      <li>
        <router-link to="/courses" class="flex flex-col md:flex-row gap-3 items-center text-gray-800 hover:text-blue-600 font-medium">
          🛒 <span> Courses </span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/ajoutercourse"
          class="hidden md:block text-gray-800 hover:text-blue-600 font-medium pl-4">
          ➕ Ajouter course
        </router-link>
      </li>
      <li>
        <router-link to="/congelateur" class="flex flex-col md:flex-row gap-3 items-center text-gray-800 hover:text-blue-600 font-medium">
          ❄️ <span> Congélateur </span>
        </router-link>
      </li>
      <li>
        <router-link
          to="/ajoutercongelateur"
          class="hidden md:block text-gray-800 hover:text-blue-600 font-medium pl-4">
          ➕ Ajouter congélateur
        </router-link>
      </li>
    </ul>
  </nav>
</template>
