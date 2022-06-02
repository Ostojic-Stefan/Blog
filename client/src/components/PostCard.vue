<template>
  <div class="card">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
      <p>{{ createdAt }}</p>
      <p>{{ post.user.name }}</p>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
export default {
    props: ['post'],

    setup(props) {
      
      const createdAt = computed(() => {
        return new Date(props.post.createdAt).toLocaleString('en-GB');
      });

      return { createdAt };

    }
}
</script>

<style scoped>
  .card {
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.10);
    padding: 10px 20px;
    background-color: #fff;
    cursor: pointer;
    color: #333;
  }

  .card:hover {
    background-color: #eee;
  }

</style>