<template>
  <div>
    <datepicker :type="type" :format="format" :startime="mStarTime" :placeholder="startPlaceholder" @valuechange="handleStartValueChange"></datepicker>
    <a class="button is-light" @click="clear">清空</a>
  </div>
</template>

<script>
  import datepicker from './Datepicker'

  export default {
    data () {
      return {
        mStarTime: ''
      }
    },
    created () {
      this.mStarTime = this.startime
    },
    methods: {
      handleStartValueChange (startime) {
        if (this.mStarTime !== startime) {
          this.mStarTime = startime
          this.emitValue()
        }
      },
      clear () {
        if (this.mStarTime) {
          this.mStarTime = ''
          this.emitValue()
        }
      },
      emitValue () {
        const time = {
          startime: this.mStarTime
        }
        this.$emit('timechange', time)
        this.timeChangeCallback(time)
      }
    },
    watch: {
      startime (val) {
        this.mStarTime = val
      }
    },
    props: {
      type: {},
      format: {},
      startime: {
        type: [String, Number],
        default () {
          return ''
        }
      },
      startPlaceholder: {
        type: String,
        default () {
          return '请选择发布时间'
        }
      },
      timeChangeCallback: {
        type: Function,
        default () {
          return () => {}
        }
      }
    },
    components: {
      datepicker
    }
  }
</script>
<style>
</style>
