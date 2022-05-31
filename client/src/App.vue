<template>
  <nav>
    <router-link :to="{ name: 'Login' }">Login</router-link>
    <router-link :to="{ name: 'Register' }">Register</router-link>
    <router-link :to="{ name: 'CreatePost' }">Create Post</router-link>
  </nav>
  <router-view/>
</template>

<style>

</style>
