<template>
  <div>
    <div class="ui-filter">
      <span class="filter__item" v-for="(item, index) of quickDateList"
        :class="{cur: index === selectDateIndex}"
        @click="handleQuickDateClick(item)">{{item.txt}}</span>
    </div>
    <daterangepicker
      @update="handleRangeDateChange"
      :start-date-time="pickerRangeDate.startDateTime"
      :end-date-time="pickerRangeDate.endDateTime">
    </daterangepicker>
  </div>
</template>

<script>
  import daterangepicker from './daterangepicker'
  import moment from 'moment'

  export default {
    props: {
      quickDateList: {
        type: Array,
        default () {
          return [
            { days: 30, txt: '最近30天' },
            { months: 3, txt: '最近3个月' },
            { months: 6, txt: '最近6个月' }
          ]
        }
      }
    },
    data () {
      return {
        rangeDate: {
          startDateTime: '',
          endDateTime: ''
        },
        alReadySelectCustomDate: false, // 是否已经选择过自定义的range时间，用来控制是否自定义输入框是否显示“选择日期”
        selectDateIndex: 0
      }
    },
    mounted () {
      this.setRangeDate(this.quickDateList[this.selectDateIndex])
      this.emitValue()
    },
    computed: {
      pickerRangeDate () {
        return this.alReadySelectCustomDate ? this.rangeDate : {}
      }
    },
    methods: {
      handleRangeDateChange (obj) {
        this.alReadySelectCustomDate = true
        this.rangeDate = obj
        this.selectDateIndex = -1
        this.emitValue()
      },
      handleQuickDateClick (item) {
        const index = this.quickDateList.indexOf(item)
        this.selectDateIndex = index
        this.setRangeDate(item)
        this.emitValue()
      },
      setRangeDate (quickDateItem) {
        if (quickDateItem.days) {
          this.rangeDate = {
            startDateTime: moment().subtract(quickDateItem.days, 'days').format('YYYY-MM-DD'),
            endDateTime: moment().format('YYYY-MM-DD')
          }
        } else if (quickDateItem.months) {
          this.rangeDate = {
            startDateTime: moment().subtract(quickDateItem.months, 'months').format('YYYY-MM-DD'),
            endDateTime: moment().format('YYYY-MM-DD')
          }
        }
      },
      emitValue () {
        this.$emit('update', this.rangeDate)
      }
    },
    components: {
      daterangepicker
    }
  }
</script>

<style>
</style>
