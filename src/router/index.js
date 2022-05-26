import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/MyLogin.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/home',
      redirect: '/home/user',
      component: () => import('@/components/MyHome.vue'),
      children: [
        {
          path: 'user',
          component: () => import('@/components/menus/MyUsers.vue'),
        },
        {
          path: 'right',
          component: () => import('@/components/menus/MyRights.vue'),
        },
        {
          path: 'goods',
          component: () => import('@/components/menus/MyGoods.vue'),
        },
        {
          path: 'order',
          component: () => import('@/components/menus/MyOrders.vue'),
        },
        {
          path: 'setting',
          component: () => import('@/components/menus/MySettings.vue'),
        },
        // 显示详情
        {
          path: 'userinfo/:id',
          component: () => import('@/components/user/MyUserDetail.vue'),
          props: true,
        },
      ],
    },
  ],
})

// 路由前置守卫
router.beforeEach(function(to, from, next) {
  // 如果有多个路径，可以使用数组方法indexOf, 返回-1则表示不访问这些路径
  var pathArr = ['/home', '/home/userinfo']
  pathArr.indexOf(to.path)
  if (pathArr.indexOf(to.path) !== -1) {
    // 获取token
    console.log(window.localStorage)
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
  // // 如果只有一个路径
  // if (to.path === '/home') {
  //   // 获取token
  //   console.log(window.localStorage)
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     next()
  //   } else {
  //     next('/login')
  //   }
  // } else {
  //   next()
  // }
})

export default router
