<template>
  <div class="home">
    <h1>Home</h1>
    <main>
      <div v-for="post in posts" :key="post.id">
        <router-link :to="{ name: 'Post', params: { id: post.id } }">
          <PostCard :post="post" />
        </router-link>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import PostCard from '../components/PostCard.vue';

export default {
  name: 'HomeView',
  components: { PostCard },
  setup() {

    const posts = ref([]);

    async function getPosts() { 
          try {
              const token = localStorage.getItem('token');

              const res = await fetch('http://localhost:3000/api/post', {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              
              const { data } = await res.json();

              posts.value = data.allPosts;


          } catch (err) {
              console.log(err);
          }
    }

    getPosts();

    return { posts };
  }
}
</script>

<style scoped>
main {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 20px;
  column-gap: 50px;
}
</style>
