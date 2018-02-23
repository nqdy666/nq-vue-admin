<template>
  <div class="m-tag-wrapper">
    <span class="tag is-success">
        {{initData[showKey]}}
      <button class="delete is-small" @click="del"></button>
    </span>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      del () {
        this.$emit('del', this.initData)
      }
    },
    props: {
      showKey: {
        type: String,
        default () {
          return 'id'
        }
      },
      initData: {
        type: [Object],
        default () {
          return {}
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .m-tag-wrapper {
    display: inline-block;
    margin-right: 5px;
  }
</style>
