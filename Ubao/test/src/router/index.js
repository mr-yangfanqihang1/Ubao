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

router.beforeEach((to, from, next) => {
  if (to.path === '/main' || to.path === '/' ||to.path === '/login'  ) {
    next();
  } else {
    let token = localStorage.getItem('token');

    if (token === 'null' || token === '') {
      alert('请先登录')
      next('/login');
    } else {
      next();
    }
  }
});


export default router

//解决爆红问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}



// replace
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace= function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
