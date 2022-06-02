import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import CreatePost from '../views/CreatePost.vue';
import Post from '../views/Post.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: Post
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
