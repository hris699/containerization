import Vue from 'vue'
import VueRouter from 'vue-router'
// import Signup from "../views/SignUp.vue"
// import LogIn from "../components/LogIn.vue"
import Blog from "../components/BlogPage.vue"
import Dashboard from "../views/DashBoard.vue"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'signup',
    component:  () => import (/* webpackChunkName: "about" */ '../views/SignUp.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import (/* webpackChunkName: "about" */ '../components/LogIn.vue')
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: Blog
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  }
  

]

const router = new VueRouter({
  routes
})

export default router
