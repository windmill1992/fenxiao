import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: resolve =>  require(['../view/index.vue'], resolve),
      meta: {
        title: '分销系统'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: resolve =>  require(['../view/index.vue'], resolve),
      meta: {
        title: '分销系统'
      }
    },
    {
      path: '/404',
      name: 'notFound',
      component: resolve =>  require(['../404.vue'], resolve),
      meta: {
        title: '页面未找到'
      }
    },
    {
      path: '*',
      name: 'any',
      component: resolve =>  require(['../404.vue'], resolve),
      meta: {
        title: '页面未找到'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: resolve =>  require(['../view/login.vue'], resolve),
      meta: {
        title: '登录'
      }
    },
    /* {
      path: '*',
      name: 'any',
      component: resolve =>  require(['../404.vue'], resolve),
      meta: {
        title: '页面未找到'
      }
    }, */
  ]
})
