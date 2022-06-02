<template>
    <main class="center-area container">
    <h1>Create Post</h1>
    <form @submit.prevent="handleSubmit">
        <div class="form-control">
        <label for="title">Title </label>
        <input type="text" id="title" v-model="title" required>
        </div>

        <div class="form-control">
        <label for="body">Body </label>
        <textarea id="body" v-model="body" required></textarea>
        </div>

        <button class="form-control">Create Post</button>

        <div v-if="error" style="color: red">
            {{ error }}
        </div>
    </form>
  </main>
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

<style scoped>

form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

form button {
    padding: 12px 24px;
    color: #fff;
    background: #333;
    font-size: 18px;
    cursor: pointer;
    border-radius: 5px;
}

.form-control input {
    width: 500px;
    height: 25px;
    font-size: 24px;
    padding: 12px 10px;

}

.form-control textarea {
    width: 520px;
    height: 150px;
    padding: 12px 10px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 24px;
    resize: vertical;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.form-control {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 24px;
}
</style>