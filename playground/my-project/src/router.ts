import { createRouter, createWebHistory } from '@baicie/router';
import Home from './views/Home.vue'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/login',
      name: 'portalFakeLogin',
      meta: {
        title: 'login',
        hidden: true,
      },
      component: () => import('./views/Login.vue'),
    }
  ]
})
