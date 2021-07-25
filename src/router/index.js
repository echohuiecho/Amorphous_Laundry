import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Front Layout',
    component: () => import('@/views/customer/Index.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/customer/Home.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/customer/About.vue'),
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/customer/Products.vue'),
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('@/views/customer/Product.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/customer/Cart.vue'),
      },
      {
        path: 'checkout',
        name: 'CheckOut',
        component: () => import('@/views/customer/CheckOut.vue'),
      },
      {
        path: 'order/:id',
        name: 'OrderDynamic',
        component: () => import('@/views/customer/Order.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/admin/Login.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'ProductsAdmin',
        component: () => import('@/views/admin/ProductsAdmin.vue'),
      },
      {
        path: 'orders',
        name: 'OrdersAdmin',
        component: () => import('@/views/admin/OrdersAdmin.vue'),
      },
      {
        path: 'coupons',
        name: 'CouponsAdmin',
        component: () => import('@/views/admin/CouponsAdmin.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});

export default router;
