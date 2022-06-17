import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/thread/:id',
  //   name: 'Thread',
  //   component: import('../views/Thread/Show')
  // },
  {
    path: '/:username',
    name: 'Profile',
    component: import('../views/Profile/Index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
