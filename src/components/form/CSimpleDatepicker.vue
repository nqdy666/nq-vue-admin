<template>
  <simple-datepicker
    :startime="value"
    :start-placeholder="attrs && attrs.placeholder"
    :type="extra.type"
    :format="extra.format"
    :time-change-callback="extra && extra.timeChangeCallback"
    @timechange="handleTimeChange">
  </simple-datepicker>
</template>

<script>
  import mField from './mField'
  import simpleDatepicker from '../vue-datepicker/SimpleDatepicker'

  export default {
    mixins: [mField],
    data () {
      return {}
    },
    methods: {
      getDefaultVal () {
        return ''
      },
      handleTimeChange (val) {
        if (val.startime) {
          this.value = val.startime
        } else {
          this.value = ''
        }
      }
    },
    props: {
      initValue: {
        default () {
          return ''
        }
      }
    },
    components: {
      simpleDatepicker
    }
  }
</script>