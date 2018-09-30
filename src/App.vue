<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
        this.$util.getPageStyle();
        window.onresize = () => {
            this.$util.getPageStyle();
        }
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
