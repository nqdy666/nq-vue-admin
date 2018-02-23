<template>
  <date-picker :date="startTime" :option="option" :limit="limit" class="c-datapicker"></date-picker>
</template>

<script>
  import mDatepicker from 'vue-datepicker'
  import moment from 'moment'
  
  export default {
    data () {
      return {
        startTime: {
          time: ''
        }
      }
    },
    created () {
      this.startTime = {
        time: this.startime ? this.dateFormat(this.startTime) : ''
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.emitValue(this.startTime.time)
      })
    },
    computed: {
      option () {
        return {
          type: this.type,
          week: ['一', '二', '三', '四', '五', '六', '日'],
          month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          format: 'YYYY-MM-DD HH:mm',
          placeholder: this.placeholder,
          inputStyle: {
            'display': 'inline-flex',
            'padding-left': '8px',
            'padding-right': '8px',
            'position': 'relative',
            'height': '36px',
            'line-height': '24px',
            'font-size': '14px',
            'border': '1px solid #d3d6db',
            'box-shadow': 'inset 0 1px 2px rgba(17,17,17,.1)',
            'border-radius': '3px',
            'color': '#5F5F5F'
          },
          buttons: {
            ok: '确定',
            cancel: '取消'
          },
          overlayOpacity: 'none', // 0.5 as default
          dismissible: true // as true as default
        }
      },
      limit () {
        return [{
          type: 'fromto',
          from: this.limitFrom ? this.dateFormat(this.limitFrom) : this.limitFrom,
          to: this.limitTo ? this.dateFormat(this.limitTo) : this.limitTo
        }]
      }
    },
    methods: {
      emitValue (val) {
        let time = ''
        if (val) {
          // 服务端最小比1970-01-02 多了一秒，防止最小的数据校验失败
          time = Date.parse(moment(val))
          if (Date.parse(moment('1970-01-02')) === time) {
            time += 1000
          }
        }
        this.$emit('valuechange', time)
      },
      dateFormat (timeStamp) {
        return moment(timeStamp).format(this.format)
      }
    },
    watch: {
      startime (val) {
        this.startTime = {
          time: val ? this.dateFormat(val) : ''
        }
      },
      'startTime.time' (val, oldValue) {
        this.emitValue(val)
      }
    },
    props: {
      type: {
        type: String,
        default () {
          return 'min'
        }
      },
      format: {
        type: String,
        default () {
          return 'YYYY-MM-DD HH:mm'
        }
      },
      startime: {
        type: [String, Number],
        default () {
          return ''
        }
      },
      placeholder: {
        type: String,
        default () {
          return '请选择时间'
        }
      },
      limitFrom: {
        type: [String, Number],
        default () {
          return '1970-01-02'
        }
      },
      limitTo: {
        type: [String, Number],
        default () {
          return '2038-01-01'
        }
      }
    },
    components: {
      'date-picker': mDatepicker
    }
  }
</script>
<style lang="less">
  .c-datapicker {
    input:hover {
      border-color: #aeb1b5 !important;
    }
    input:focus {
      border-color: #1fc8db !important;
      outline: 0;
    }
  }
</style>
