<template>
  <div id="app">
    <my-splash v-if="firstShow"></my-splash>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import MySplash from './components/splash';
export default {
  name: 'App',
  data() {
    return {
      firstShow: true,
    }
  },
  mounted() {
    this.$util.getPageStyle();
    window.onresize = () => {
        this.$util.getPageStyle();
    }
    let app = sessionStorage.getItem('appStart');
    if(app == 1){
      this.firstShow = false;
    }else{
      sessionStorage.setItem('appStart', 1);
    }
  },
  components: {
    MySplash,
  }
}
</script>

<style>
@import url(./assets/base.css);
#app {
  font-family: 'PingFang-regular', '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-overflow-scrolling: touch;
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
