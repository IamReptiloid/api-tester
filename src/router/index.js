import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/page/Home';
import Workspaces from '@/page/Workspaces';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/workspaces',
    component: Workspaces
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
