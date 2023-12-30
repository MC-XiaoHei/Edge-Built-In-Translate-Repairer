import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '/popup', component: () => import('pages/PopupPage.vue')}
    ],
  }
];

export default routes;
