import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store/index.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/listview',
    name: 'listview',
    component: () => import('../views/ListView.vue')
  },
  {
    path: '/artPaper',
    name: 'artPaper',
    component: () => import('../views/ArtView.vue')
  },
  {
    path: '/searchView',
    name: 'searchView',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/User',
    name: 'User',

    beforeEnter: (to, from, next) => {
      console.log(store.state.user.account);
      if (store.state.user.isLogin) {
        next()
      } else {
        next("/login")
      }
    },
    component: () => import('../views/User.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
