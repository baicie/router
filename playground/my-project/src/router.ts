import { createRouter, createWebHistory } from '@baicie/router';

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      redirect: 'login',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/login',
      name: 'portalFakeLogin',
      meta: {
        title: 'login',
        hidden: true,
      },
      component: () => import('./views/Login.vue'),
    },
  ]
})
