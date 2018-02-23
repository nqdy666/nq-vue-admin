<template>
  <transition name="message">
    <div class="fv-message-notice">
      <div class="notification" :class="color">
        <span class="icon" v-if="type === 'loading'"><i class="fa fa-loading"></i></span>
        <span v-html="content"></span>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: {
      duration: {
        type: Number,
        default: 1.5
      },
      type: {
        type: String,
        default () {
          return 'info'
        }
      },
      content: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        required: true
      },
      onClose: {
        type: Function
      },
      transitionName: {
        type: String
      }
    },
    data () {
      return {
        withDesc: false
      }
    },
    computed: {
      color () {
        const colorClass = ({
          'info': 'is-info',
          'success': 'is-success',
          'warning': 'is-warning',
          'error': 'is-danger',
          'loading': 'is-loading'
        })[this.type]
        return colorClass
      }
    },
    methods: {
      clearCloseTimer () {
        if (this.closeTimer) {
          clearTimeout(this.closeTimer)
          this.closeTimer = null
        }
      },
      close () {
        this.clearCloseTimer()
        this.onClose()
        this.$parent.close(this.name)
      }
    },
    mounted () {
      this.clearCloseTimer()

      if (this.duration !== 0) {
        this.closeTimer = setTimeout(() => {
          this.close()
        }, this.duration * 1000)
      }
    },
    beforeDestroy () {
      this.clearCloseTimer()
    }
  }
</script>
<style lang="less">
  .fv-message-notice {
    width: auto;
    vertical-align: middle;
    position: absolute;
    left: 45%;

    .notification {
      padding: 10px 20px;
      box-shadow: 0 1px 8px hsla(0, 0%, 39%, .2);
    }

    .fa-loading {
      display: block;
      transform-origin: right center;
      animation: rotate 800ms infinite linear;
    }
    @keyframes rotate {
      0% {
        transform-origin: center;
        transform: rotate(-360deg);
      }
      100% {
        transform-origin: center;
        transform: rotate(0deg);
      }
    }
  }
  .message-enter-active, .message-leave-active {
    transition: all .3s ease;

  }
  .message-enter, .message-leave-to {
    opacity: 0;
    transform: translateY(-50px);
  }
</style>