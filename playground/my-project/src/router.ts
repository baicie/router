import {createRouter} from '@baicie/router';

export const router = createRouter({
  history,
  routes:[
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
