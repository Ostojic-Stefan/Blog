<template>
  <h1>Register</h1>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="email">Name: </label>
      <input type="text" id="name" v-model="name">
    </div>

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
        
        const name = ref('');
        const email = ref('');
        const password = ref('');
        const error = ref('');

        const router = useRouter();

        async function handleSubmit() {
            try {

                const res = await fetch('http://localhost:3000/api/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name.value,
                        email: email.value,
                        password: password.value
                    })
                });

                router.push('/login');

            } catch (err) {
                console.log(err);
            }
        }

        return { name, email, password, error, handleSubmit };

    }
}
</script>

<style>

</style>