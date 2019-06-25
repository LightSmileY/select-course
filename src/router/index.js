import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/pages/index'
// import Student from '@/pages/student'
// import Teacher from '@/pages/teacher'
// import Admin from '@/pages/admin'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/pages/index')
    },
    {
      path: '/student',
      name: 'Student',
      component: () => import('@/pages/student')
    },
    {
      path: '/teacher',
      name: 'Teacher',
      component: () => import('@/pages/teacher')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/pages/admin')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
