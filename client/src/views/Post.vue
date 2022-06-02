<template>
  <main v-if="postData" class="center-area">
    <div class="head">
      <h1>{{ postData.title }}</h1>
      <p>Published By: {{ postData.user.name }}</p>
      <p>Created At: {{ postData.createdAt }}</p>
    </div>

    <div v-for="comment in postData.comments" :key="comment">
      <Comment :comment="comment"/>
    </div>

    <form @submit.prevent="addComment">
      <div class="form-control">
        <label for="comment">Add Comment</label>
        <textarea name="content" id="comment" v-model="content" placeholder="add comment text here"></textarea>
      </div>
      <button>Add</button>
    </form>

  </main>

</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router';
import Comment from '../components/Comment.vue';

export default {

components: { Comment },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const content = ref('');
    const postData = ref();

    async function addComment() {
      try {
        const token = localStorage.getItem('token');

       await fetch('http://localhost:3000/api/comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            postId: postData.value.id,
            content: content.value
          })
        });

        getPost();

      } catch (err) {
        console.log(err);
      }
    }

    async function getPost() { 
          try {
              const token = localStorage.getItem('token');

              const res = await fetch(`http://localhost:3000/api/post/${route.params.id}`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              
              const { data } = await res.json();

              const post = data.post;

              console.log(post);

              postData.value = post;

          } catch (err) {
              console.log(err);
          }
    }

    getPost();

    return { postData, addComment, content };

  }

}
</script>

<style scoped>

main .head {
  text-align: center;
}

form {
  max-width: 800px;
  margin: 64px auto;

}

form label {
  font-size: 28px;
}

form textarea {
    width: 520px;
    height: 150px;
    padding: 12px 10px;
    box-sizing: border-box;
    border: none;
    border-bottom: 2px solid #333;
    outline: none;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 24px;
    resize: vertical;
}

form textarea::placeholder {
  color: #aaa;
}

.form-control {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

</style>