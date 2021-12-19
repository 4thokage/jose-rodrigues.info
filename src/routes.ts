import { lazy } from 'solid-js';
import { RouteDefinition } from 'solid-app-router';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./pages/Home')),
  },
  {
    path: '/about',
    component: lazy(() => import('./pages/About')),
  },
  {
    path: '/projects',
    component: lazy(() => import('./pages/Projects')),
  },
  {
    path: '/*all',
    component: lazy(() => import('./pages/404')),
  },
];
