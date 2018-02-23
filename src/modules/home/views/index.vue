<template>
  <div class="home">
    <section class="app-main">
      <nav-bar></nav-bar>
      <left-side :menu="menu" class="left-side"></left-side>
      <div class="app-content">
        <router-view></router-view>
        <footer-bar></footer-bar>
      </div>
    </section>
  </div>
</template>
<script>
  import { menu } from '../config/hmenu'
  import navBar from '../components/navBar'
  import leftSide from '../components/leftSide'
  import footerBar from '../components/footerBar'

  export default {
    data () {
      return {
        menu
      }
    },
    components: {
      navBar,
      leftSide,
      footerBar
    }
  }
</script>
<style lang="less">
  .home {
    height: 100%;
    min-width: 1024px;
    position: relative;
  }
  .app-navbar {
    min-width: 100%;
    box-shadow: 0 2px 3px hsla(0,0%,7%,.1),0 0 0 1px hsla(0,0%,7%,.1);
  }
  .left-side {
    height: 100%;
    position: absolute;
    top: 52px;
    padding: 10px 0 50px 0;
    z-index: 1;
  }
  .app-main {
    height: 100%;
    transform: translateZ(0);
  }
  .app-content {
    height: 100%;
    position: absolute;
    overflow: auto;
    top: 60px;
    padding: 10px 15px 80px 200px;
    width: 100%;
  }
  h4.title {
    position: relative;
  }
  h4 a.button {
    position: absolute;
    left: 0;
    bottom: -52px;
    z-index: 2;
  }
</style>
