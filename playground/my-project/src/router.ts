import { createRouter, createWebHistory } from '@baicie/router';

export const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'portalFakeLogin',
      meta: {
        title: 'login',
        hidden: true,
      },
      component: () => import(/* webpackChunkName: "fake-login" */ './components/HelloWorld.vue'),
    },
  ]
})
