<template>
  <div class="progress-wrap">
    <progress :max="max" :value="value" class="progress is-primary">{{value}}%</progress><span>{{progress}}%</span>
  </div>
</template>
<script>
  import mField from './mField'

  export default{
    mixins: [mField],
    computed: {
      max () {
        return this.render.max || 100
      },
      precision () {
        return this.render.precision || 0
      },
      progress () {
        return parseFloat((this.value / this.max * 100).toFixed(this.precision))
      }
    }
  }
</script>
<style lang="less" scoped>
  .progress-wrap {
    display: flex;
    margin-top: 8px;
    progress {
      margin-bottom: 0;
    }
    span {
      width: 65px;
      margin-left: 2px;
      display: inline-block;
      height: 12px;
      line-height: 12px;
    }
  }
</style>
