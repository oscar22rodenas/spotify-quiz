import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/index.astro')
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../pages/quiz.astro')
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('../pages/results.astro')
    }
  ]
});

export default router;