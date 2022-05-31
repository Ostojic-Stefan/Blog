<template>
  <h1>Log in</h1>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="email">Email: </label>
      <input type="email" id="email" v-model="email">
    </div>

    <div>
      <label for="password">Password: </label>
      <input type="password" id="password" name="email" v-model="password">
    </div>
    <button>Log in</button>

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

    const email = ref('');
    const password = ref('');
    const error = ref('');

    const router = useRouter();

    async function handleSubmit() {
      try {
        const res = await fetch('http://localhost:3000/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value
          })
        });

        const data = await res.json();

        console.log(data);

        if (data.status !== 'success') {
          error.value = data.message;
        } else {
          error.value = ""
          localStorage.setItem('token', data.data.token);
          router.push('/');
        }

      } catch (err) {
        console.log(err);
      }
    }

    return { email, password, error, handleSubmit };

  }
}
</script>

<style>

</style>