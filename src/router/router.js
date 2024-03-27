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
        component: () => import('../components/blocks/GoodDescription.vue'),
        props: true,
      },
      {
        path: 'reviews',
        component: () => import('../components/blocks/GoodReviews.vue'),
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;