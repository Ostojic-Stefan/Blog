<template>
  <div class="container">
      <h3>{{ comment.user.name }}</h3>
      <p>{{ comment.content }}</p>
      <p>{{ createdAt }}</p>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
export default {
    props: ['comment'],

    setup(props) {
      const createdAt = computed(() => {
        return new Date(props.comment.createdAt)
            .toLocaleString('en-GB')
            .split(',')[0];
      });

      return { createdAt };
    }
}
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 20px auto;
    border: 2px solid #aaa;
    border-radius: 5px;
    padding-left: 24px;
}
</style>