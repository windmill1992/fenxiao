// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Cookie from 'js-cookie';

import NProgress from 'muse-ui-progress';
import Progress from 'muse-ui/lib/Progress';
import Helpers from 'muse-ui/lib/Helpers';
import 'muse-ui-progress/dist/muse-ui-progress.css';

Vue.use(NProgress);
Vue.use(Progress);
Vue.use(Helpers);

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

import { util } from './utils/base';
Vue.prototype.$util = util;

import { setTitle } from './utils/setTitle';

router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = to.meta.title;
  setTitle(to.meta.title);
  if(to.query.token && to.query.tokenHeader) {
    Cookie.set(to.query.tokenHeader, to.query.token);
  }
  next()
})

router.afterEach(() => {
  NProgress.done();
})

/* eslint-disable no-new */
new Vue({
  router,
  components: { App },
  render: h => h(App)
}).$mount('#app')
