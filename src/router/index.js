import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/index.vue')
      },
      {
        path: '/',
        name: 'map',
        component: () => import('@/views/map/map2.vue')
      },
      {
        path: '/market',
        name: 'market',
        component: () => import('@/views/market/market.vue')
      },
      {
        path: '/assets',
        name: 'assets',
        component: () => import('@/views/assets/index.vue')
      },
      {
        path: '/assetsDetail',
        name: 'assetsDetail',
        component: () => import('@/views/assets/details.vue')
      }
]

const router = new VueRouter({
  routes
})

export default router
