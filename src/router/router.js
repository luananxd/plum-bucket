import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../pages/HomePage.vue'),
  },
  {
    path: '/:category',
    component: () => import('../pages/StorePage.vue'),
  },
  {
    path: '/:category/:goodId',
    component: () => import('../pages/GoodPage.vue'),
    children: [
      {
        path: 'description',
        component: () => import('../components/containers/GoodDescription.vue'),
        props: true,
      },
      {
        path: 'reviews',
        component: () => import('../components/containers/GoodReviews.vue'),
        props: true,
      },
    ],
  },
  {
    path: '/cart',
    component: () => import('../pages/CartPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;