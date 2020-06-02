import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '../Layout';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import("../views/Home.vue")
      },
      {
        path: "/collection",
        name: "collection",
        component: () => import("../views/collection.vue")
      },
      {
        path: "/buy",
        name: "buy",
        component: () => import("../views/buy.vue")
      },
      {
        path: "/order",
        name: "order",
        component: () => import("../views/order.vue")
      },
      {
        path: "/orderdetails",
        name: "orderdetails",
        component: () => import("../views/orderdetails.vue")
      },
      {
        path: "/management",
        name: "management",
        component: () => import("../views/management.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
