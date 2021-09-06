import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'
import Menu from '../views/Menu.vue'
import MenuItem from '../views/MenuItem.vue'
import Basket from '../views/Basket.vue'
import Payment from '../views/Payment.vue'
import Stores from '../views/Stores-and-Delivery.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu,
  },
  {
    path: '/menu/:id',
    name: 'MenuItem',
    component: MenuItem,
  },
  {
    path: '/basket',
    name: 'basket',
    component: Basket,
  },
  {
    path: '/basket/payment',
    name: 'Payment',
    component: Payment,
  },
  {
    path:'/stores-and-delivery',
    name:'stores-and-delivery',
    component: Stores,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
