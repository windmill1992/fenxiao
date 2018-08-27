// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Cookies from 'js-cookie'

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

import { setTitle } from './utils/setTitle'

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  setTitle(to.meta.title);
  /* if (!Cookies.get('user') && to.name !== 'login') {  // 判断是否已经登录且前往的页面不是登录页
    next({ name: 'login' });
  } else if (Cookies.get('user') && to.name === 'login') {  // 判断是否已经登录且前往的是登录页
    next({ name: 'index' });
  } else {
    next()
  } */
  next()
})

/* eslint-disable no-new */
new Vue({
  router,
  components: { App },
  render: h => h(App)
}).$mount('#app')
