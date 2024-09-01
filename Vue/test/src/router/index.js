import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TableView from '../views/TableView.vue'
import ElementView from '@/views/ElementView.vue'
import CartView from '@/views/CartView.vue'
import MainPage from "@/views/MainPage.vue";
import TestView from "@/views/TestView.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '/dept',
    name: 'TableView',
    component: TableView
  },
  {
    path: '/emp',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'element',
    component: ElementView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/main',
    name: 'main',
    component: MainPage
  },
  {
    path: '/test',
    name: 'test',
    component: TestView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
