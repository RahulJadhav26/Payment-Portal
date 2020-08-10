import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pay from '../views/Pay.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pay',
    name: 'Pay',
    component: Pay
  },
  {
    path: '/success',
    name: 'Pay',
    component: Pay
  },
  {
    path: '/Failed',
    name: '',
    component: Pay
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
