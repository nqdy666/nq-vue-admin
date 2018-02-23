<template>
  <div class="m-range-datepicker">
    <datepicker :type="type" :format="format" :startime="startime" :placeholder="startPlaceholder" @valuechange="handleStartValueChange" class="m-datepicker"></datepicker>
    <span class="m-split">-</span>
    <datepicker :type="type" :format="format" :startime="endtime" :placeholder="endPlaceholder"  @valuechange="handleEndValueChange" class="m-datepicker"></datepicker>
    <a v-if="!disabled" class="button is-light" @click="clear">清空</a>
  </div>
</template>

<script>
  import datepicker from './Datepicker'

  export default {
    data () {
      return {
        mStarTime: '',
        mEndTime: ''
      }
    },
    created () {
      this.mStarTime = this.startime
      this.mEndTime = this.endtime
    },
    methods: {
      handleStartValueChange (startime) {
        if (startime !== this.mStarTime) {
          this.mStarTime = startime
          if (this.mStarTime && this.mEndTime && (this.mStarTime > this.mEndTime)) {
            this.mEndTime = ''
          }
          this.emitValue()
        }
      },
      handleEndValueChange (endtime) {
        if (endtime !== this.mEndTime) {
          this.mEndTime = endtime
          this.limitTo = endtime
          if (this.mStarTime && this.mEndTime && (this.mStarTime > this.mEndTime)) {
            this.mStarTime = ''
          }
          this.emitValue()
        }
      },
      clear () {
        this.mStarTime = ''
        this.mEndTime = ''
        this.emitValue()
      },
      emitValue () {
        const time = {
          startime: this.mStarTime,
          endtime: this.mEndTime
        }
        this.$emit('timechange', time)
        this.timeChangeCallback(time)
      }
    },
    watch: {
      startime (val) {
        this.mStarTime = val
      },
      endtime (val) {
        this.mEndTime = val
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
      endtime: {
        type: [String, Number],
        default () {
          return ''
        }
      },
      disabled: {
        type: Boolean,
        required: false,
        default () {
          return false
        }
      },
      startPlaceholder: {
        type: String,
        default () {
          return '请选择开始时间'
        }
      },
      endPlaceholder: {
        type: String,
        default () {
          return '请选择结束时间'
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
<style lang="less">
  .m-range-datepicker {
    .m-datepicker {
      vertical-align: middle;
    }
    .m-split {
      vertical-align: middle;
      display: inline-block;
    }
    .is-light {
      vertical-align: middle;
      display: inline-block;
    }
  }
</style>
