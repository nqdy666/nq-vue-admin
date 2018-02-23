<template>
  <range-datepicker
    :startime="value && value.startime"
    :endtime="value && value.endtime"
    :disabled="attrs && attrs.disabled"
    :start-placeholder="attrs && attrs.startPlaceholder"
    :end-placeholder="attrs && attrs.endPlaceholder"
    :type="extra.type"
    :format="extra.format"
    :time-change-callback="extra && extra.timeChangeCallback"
    @timechange="handleTimeChange">
  </range-datepicker>
</template>

<script>
  import mField from './mField'
  import rangeDatepicker from '../vue-datepicker/RangeDatepicker'

  export default {
    mixins: [mField],
    data () {
      return {}
    },
    methods: {
      getDefaultVal () {
        return {}
      },
      handleTimeChange (val) {
        if (val.startime || val.endtime) {
          this.value = val
        } else {
          this.value = {}
        }
      }
    },
    props: {
      initValue: {
        default () {
          return {}
        }
      }
    },
    components: {
      rangeDatepicker
    }
  }
</script>