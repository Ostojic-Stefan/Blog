<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="title">Title: </label>
      <input type="text" id="title" v-model="title">
    </div>

    <div>
      <label for="body">Body: </label>
      <input type="text" id="body" v-model="body">
    </div>

    <button>Create Post</button>

    <div v-if="error" style="color: red">
        {{ error }}
    </div>

  </form>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
export default {
    setup() {

        const title = ref('');
        const body = ref('');
        const error = ref('');

        const router = useRouter();

        async function handleSubmit() { 
            try {
                const token = localStorage.getItem('token');

                const res = await fetch('http://localhost:3000/api/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title: title.value,
                        body: body.value
                    })
                });

                if (!res.ok) {
                    error.value = res.statusText;
                } else {
                    router.push('/');
                    error.value = '';
                }

            } catch (err) {
                console.log(err);
            }
        }

        return { title, body, error, handleSubmit };

    }
}
</script>

<style>

</style>