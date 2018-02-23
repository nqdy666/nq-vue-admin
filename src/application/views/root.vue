<template>
  <transition name="fade" mode="out-in" appear>
    <router-view></router-view>
  </transition>
</template>

<script>
  export default {
    methods: {
    },
    mounted () {
    },
    components: {
    }
  }
</script>

<style src="../ui/styles/style.css"></style>
<style src="../styles/app.css"></style>
