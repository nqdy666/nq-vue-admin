<style lang="less">
  @import './demo.less';
</style>
<template>
  <div class="example" :class="{'example-vertical': vertical}">
    <div class="example-demo" ref="example-demo" :style="{width: vertical ? '100%' : '50%'}">
      <div class="example-case">
        <h4 class="title is-4">{{title}}</h4>
        <slot name="demo"></slot>
      </div>
      <header class="example-header">
        <span>说明</span>
      </header>
      <div class="example-desc">
        <slot name="desc"></slot>
      </div>
    </div>
    <div class="example-split"></div>
    <div class="example-code" :style="codeStyle" ref="example-code">
      <div :style="style">
        <slot name="code"></slot>
      </div>
      <div class="example-code-more" v-if="showMore" @click="showCode = !showCode">
        <i type="ios-arrow-down" v-show="!showCode">展开</i>
        <i type="ios-arrow-up" v-show="showCode">缩起</i>
        <button v-show="hideCode && !showCode">显示代码</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'demo',
    props: {
      title: {
        type: String,
        default: ''
      },
      vertical: {
        type: Boolean,
        default: false
      },
      hideCode: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        showCode: false,
        showMore: true,
        demo_height: 0,
        code_height: 0,
        ready: false
      }
    },
    computed: {
      codeStyle () {
        const style = { ...this.codeHeight }
        if (this.vertical) {
          style.width = this.vertical ? '100%' : '50%'
        }
        return style
      },
      codeHeight () {
        const style = {}

        if (this.ready) {
          if (this.showCode || (this.vertical && this.code_height <= this.demo_height)) {
            style.height = `${this.code_height}px`
          } else {
            style.height = `${this.demo_height}px`
          }
        }

        return style
      },
      style () {
        const style = {
          opacity: 1
        }
        if (this.hideCode && !this.showCode) {
          style.opacity = 0
        }
        return style
      }
    },
    mounted () {
      this.$nextTick(() => {
        const demo_height = this.$refs['example-demo'].clientHeight
        const code_height = this.$refs['example-code'].clientHeight + 20

        this.code_height = code_height

        if ((code_height <= demo_height) && !this.hideCode) {
          this.showMore = false
        }

        this.demo_height = this.hideCode ? 30 : demo_height
        this.ready = true
      })
    }
  }
</script>
