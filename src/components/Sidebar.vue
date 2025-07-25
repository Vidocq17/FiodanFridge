<template>
  <nav>
    <img src="../assets/logo.png" alt="Logo" class="logo" width="50" height="50" />
    <ul>
      <li><router-link to="/">📦 Mon frigo</router-link></li>
      <li style="margin-left: 1rem;"><router-link to="/ajouteraliment">➕ Ajouter aliment</router-link></li>
      <li><router-link to="/courses">🛒 Courses</router-link></li>
      <li style="margin-left: 1rem;"><router-link to="/ajoutercourse">➕ Ajouter course</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  background: #f8f9fa;
  padding: 1rem;
  min-width: 180px;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0,0,0,0.05);
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 1rem 0;
}

a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
}

.router-link-active {
  color: #007bff;
}
</style>
