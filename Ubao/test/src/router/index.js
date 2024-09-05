import Vue from 'vue'
import VueRouter from 'vue-router'
import ShopView from '@/views/ShopView.vue'
import CartView from '@/views/CartView.vue'
import MainPage from "@/views/MainPage.vue";
import LoginView  from "@/views/LoginView.vue";
import GoodsDetail from "@/views/GoodsDetail.vue";
import SelectGoods from "@/views/SelectGoods.vue";
Vue.use(VueRouter)

const routes = [
  {
    path: '/shop',
    name: 'ShopView',
    component: ShopView
  },
  {
    path: '/',
    name: 'main',
    component: MainPage
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
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/goodsDetail',
    name: 'goodsDetail',
    component: GoodsDetail
  },
  {
    path: '/selectGoods',
    name: 'selectGoods',
    component: SelectGoods
  },
]

const router = new VueRouter({
  routes
})

export default router
