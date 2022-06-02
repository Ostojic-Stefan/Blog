<template>
  <nav>
    <router-link :to="{ name: 'Home' }">
      <h1>Home</h1>
    </router-link>
    <div class="links">
      <router-link :to="{ name: 'CreatePost' }">Create Post</router-link>
      <router-link :to="{ name: 'Login' }">Login</router-link>
      <router-link :to="{ name: 'Register' }">Register</router-link>
    </div>
  </nav>
  <router-view/>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
}

nav h1 {
  padding-left: 48px;
}

.links {
  padding-right: 48px;
  display: flex;
  gap: 30px;
}
</style>
