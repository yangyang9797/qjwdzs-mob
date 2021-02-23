
const router = [
  {
    path: "/login",
    name: 'login',
    component: () => import('../views/login.vue'),
  },
  {
    path: "/grsb",
    name: 'grsb',
    component: () => import('../views/main/grsb/grsb-index.vue'),
  },
  {
    path: "/getqlrid",
    name: 'getqlrid',
    component: () => import('../views/main/grsb/get-qlrid.vue'),
  },
  {
    path: "/grsbinfo",
    name: 'grsbinfo',
    component: () => import('../views/main/grsb/grsb-info.vue'),
  },
  {
    path: "/loding",
    name: 'loding',
    component: () => import('../views/main/grsb/loding.vue'),
  },
  {
    path: "/qlrdetail/:id",
    name: 'qlrdetail',
    component: () => import('../views/main/grsb/qlr-detail.vue'),
  },
  {
    path: "/wxlogin",
    component: () => import('../views/wxLogin/index.vue'),

  },
  {
    path: "/forget",
    component: () => import('../views/forget/index.vue'),
    children: [
      {
        path: 'stepOne',
        component: () => import('../views/forget/stepOne.vue')
      },
      {
        path: 'stepTwo',
        component: () => import('../views/forget/stepTwo.vue')
      }
    ]
  },
  {
    path: "/register",
    component: () => import('../views/register/index.vue'),
    children: [
      {
        path: 'stepOne',
        component: () => import('../views/register/stepOne.vue')
      },
      {
        path: 'stepTwo',
        component: () => import('../views/register/stepTwo.vue')
      }
    ]
  },
];
export default router
