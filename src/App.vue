<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import $ from 'jquery'
import { util } from './utils/base';
export default {
  name: 'App',
  mounted() {
        util.getPageStyle();
        window.onresize = () => {
            util.getPageStyle();
        }
    }
}
</script>

<style>
@import url(./assets/base.css);
#app {
  font-family: 'Pingfang-regular', '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>
