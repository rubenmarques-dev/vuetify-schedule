import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import Login from "@/views/Login";
import {isLoggedIn} from "@/api/AuthRepository";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/Dashboard'),
    children: [
      // Dashboard
      {
        path: '/',
        name: 'Home',
        component: Home
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/LoginLayout'),
    children: [
      // Dashboard
      {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
          allowAnonymous: true
        }
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {


  if (to.name === 'login' && isLoggedIn()) {
    next({path: '/'})
  } else if (!to.meta.allowAnonymous && !isLoggedIn()) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export default router
