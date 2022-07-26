import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/components/Layout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/user/Login.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: '/',
    redirect: 'home',
    meta: {
      hidden: true
    }
  },
  {
    path: '/',
    component: Layout,
    name: '我的首页',
    children: [
      {
        path: '/home',
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '申领管理',
    children: [
      {
        path: '/apply',
        component: () => import('@/views/apply/ApplyManage.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '采购管理',
    children: [
      {
        path: '/purchase',
        component: () => import('@/views/purchase/PurchaseManage.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '库存管理',
    children: [
      {
        path: '/sku',
        component: () => import('@/views/device/SkuManage.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '资产报废',
    children: [
      {
        path: '/scrap',
        component: () => import('@/views/device/ScrapManage.vue')
      }
    ]
  },
  {
    path: '/audit',
    component: Layout,
    name: '审核管理',
    children: [
      {
        path: 'apply',
        name: '申领审核',
        component: () => import('@/views/audit/AuditApplyManage.vue')
      },
      {
        path: 'purchase',
        name: '采购审核',
        component: () => import('@/views/audit/AuditPurchaseManage.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: '用户管理',
    children: [
      {
        path: '/user',
        component: () => import('@/views/user/UserManage.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
